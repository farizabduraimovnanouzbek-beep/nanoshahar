-- NanoShahar — схема базы. Выполнить один раз в Supabase → SQL Editor.
-- ВАЖНО: в самом низу замени YOUR_EMAIL@gmail.com на свою почту (для входа в админку).

create table if not exists public.places (
  id bigserial primary key,
  plot integer not null unique check (plot >= 0 and plot < 437266),
  kind text not null check (kind in ('free','paid')),
  nick text check (nick is null or nick ~ '^[a-z0-9._]{1,30}$'),
  name text check (name is null or length(name) <= 40),
  floors integer not null default 1 check (floors between 1 and 100000),
  color text not null default '#C8553D' check (color ~ '^#[0-9A-Fa-f]{6}$'),
  link text check (link is null or length(link) <= 200),
  logo_url text check (logo_url is null or length(logo_url) <= 500),
  created_at timestamptz not null default now()
);
create unique index if not exists places_free_nick on public.places (nick) where kind = 'free';

create table if not exists public.orders (
  id bigserial primary key,
  plot integer not null check (plot >= 0 and plot < 437266),
  place_id bigint references public.places(id) on delete set null,
  floors integer not null check (floors between 1 and 1000),
  name text not null check (length(name) between 1 and 40),
  contact text not null check (length(contact) between 1 and 60),
  color text check (color is null or color ~ '^#[0-9A-Fa-f]{6}$'),
  link text check (link is null or length(link) <= 200),
  amount bigint not null check (amount >= 0),
  status text not null default 'pending' check (status in ('pending','paid','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.admins (email text primary key);

alter table public.places enable row level security;
alter table public.orders enable row level security;
alter table public.admins enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where email = auth.jwt() ->> 'email');
$$;

drop policy if exists places_read on public.places;
create policy places_read on public.places for select using (true);
drop policy if exists places_admin on public.places;
create policy places_admin on public.places for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists orders_admin on public.orders;
create policy orders_admin on public.orders for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists admins_read on public.admins;
create policy admins_read on public.admins for select using (public.is_admin());

-- Бесплатный дом по нику
create or replace function public.claim_house(p_nick text, p_plot integer, p_color text)
returns public.places language plpgsql security definer set search_path = public as $$
declare r public.places; n text := lower(trim(both '@' from coalesce(p_nick,'')));
begin
  if n !~ '^[a-z0-9._]{1,30}$' then raise exception 'BAD_NICK'; end if;
  if exists (select 1 from public.places where kind = 'free' and nick = n) then raise exception 'NICK_TAKEN'; end if;
  if exists (select 1 from public.places where plot = p_plot) then raise exception 'PLOT_TAKEN'; end if;
  if (select count(*) from public.places where kind = 'free' and created_at > now() - interval '1 minute') > 600 then
    raise exception 'BUSY';
  end if;
  insert into public.places (plot, kind, nick, floors, color)
  values (p_plot, 'free', n, 1, case when p_color ~ '^#[0-9A-Fa-f]{6}$' then p_color else '#C8553D' end)
  returning * into r;
  return r;
exception when unique_violation then
  if exists (select 1 from public.places where kind = 'free' and nick = n) then raise exception 'NICK_TAKEN'; end if;
  raise exception 'PLOT_TAKEN';
end $$;

-- Заказ участка / этажей (оплата подтверждается вручную в админке)
create or replace function public.create_order(p_plot integer, p_place bigint, p_floors integer, p_name text,
  p_contact text, p_color text, p_link text, p_amount bigint)
returns bigint language plpgsql security definer set search_path = public as $$
declare oid bigint;
begin
  if (select count(*) from public.orders where created_at > now() - interval '1 minute') > 60 then raise exception 'BUSY'; end if;
  insert into public.orders (plot, place_id, floors, name, contact, color, link, amount)
  values (p_plot, p_place, p_floors, left(trim(p_name),40), left(trim(p_contact),60),
          case when p_color ~ '^#[0-9A-Fa-f]{6}$' then p_color else null end, nullif(left(trim(coalesce(p_link,'')),200),''), p_amount)
  returning id into oid;
  return oid;
end $$;

-- Подтверждение оплаты (только админ)
create or replace function public.approve_order(p_id bigint)
returns void language plpgsql security definer set search_path = public as $$
declare o public.orders; pl public.places;
begin
  if not public.is_admin() then raise exception 'NOT_ADMIN'; end if;
  select * into o from public.orders where id = p_id for update;
  if o.id is null or o.status <> 'pending' then raise exception 'BAD_ORDER'; end if;
  if o.place_id is not null then
    update public.places set floors = floors + o.floors where id = o.place_id;
  else
    select * into pl from public.places where plot = o.plot;
    if pl.id is null then
      insert into public.places (plot, kind, name, floors, color, link)
      values (o.plot, 'paid', o.name, 1 + o.floors, coalesce(o.color,'#1F4E8C'), o.link);
    else
      update public.places set floors = floors + o.floors where id = pl.id;
    end if;
  end if;
  update public.orders set status = 'paid' where id = p_id;
end $$;

revoke all on function public.approve_order(bigint) from anon;
grant execute on function public.claim_house(text, integer, text) to anon, authenticated;
grant execute on function public.create_order(integer, bigint, integer, text, text, text, text, bigint) to anon, authenticated;
grant execute on function public.approve_order(bigint) to authenticated;
grant select on public.places to anon, authenticated;

-- Живое обновление карты
do $$ begin
  alter publication supabase_realtime add table public.places;
exception when others then null; end $$;

-- Админ (твоя почта для входа в админку)
insert into public.admins (email) values ('YOUR_EMAIL@gmail.com') on conflict do nothing;
