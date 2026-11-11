import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';
const CFG = window.NS_CONFIG;
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (n) => Math.round(n).toLocaleString('ru');
if (!CFG.SUPABASE_URL) { document.body.innerHTML = '<main><h1>Сначала подключи Supabase в config.js</h1></main>'; throw 0; }
const sb = createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY);

$('#send').onclick = async () => {
  const email = $('#email').value.trim();
  const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: location.href.split('#')[0] } });
  $('#lmsg').textContent = error ? 'Ошибка: ' + error.message : 'Готово! Открой письмо и нажми ссылку.';
};
$('#out').onclick = async () => { await sb.auth.signOut(); location.reload(); };

sb.auth.onAuthStateChange((_e, session) => show(session));
show((await sb.auth.getSession()).data.session);
function show(session) {
  if (!session) return;
  $('#login').classList.add('hide'); $('#app').classList.remove('hide');
  $('#who').textContent = session.user.email;
  loadOrders();
}

async function loadOrders() {
  const { data, error } = await sb.from('orders').select('*').eq('status', 'pending').order('id', { ascending: false });
  const box = $('#orders');
  if (error) { box.innerHTML = `<p class="muted">Нет доступа: ${esc(error.message)}. Проверь, что твоя почта есть в таблице admins.</p>`; return; }
  if (!data.length) { box.innerHTML = '<p class="muted">Новых заказов нет.</p>'; return; }
  box.innerHTML = data.map((o) => `<div class="card">
    <div class="row" style="justify-content:space-between"><b>#${o.id} · ${esc(o.name)}</b><b>${fmt(o.amount)} сум</b></div>
    <div class="muted">+${o.floors} этажей · участок ${o.plot}${o.place_id ? ' · достройка' : ' · новое здание'} · ${esc(o.contact)} ${o.link ? '· ' + esc(o.link) : ''}</div>
    <div class="muted">${new Date(o.created_at).toLocaleString('ru')}</div>
    <div class="row" style="margin-top:8px"><button class="ok" data-a="${o.id}">Оплачено — построить</button><button class="no" data-r="${o.id}">Отклонить</button></div>
  </div>`).join('');
  box.querySelectorAll('[data-a]').forEach((b) => (b.onclick = async () => {
    b.disabled = true; const { error } = await sb.rpc('approve_order', { p_id: +b.dataset.a });
    if (error) alert(error.message); loadOrders();
  }));
  box.querySelectorAll('[data-r]').forEach((b) => (b.onclick = async () => {
    if (!confirm('Отклонить заказ?')) return;
    await sb.from('orders').update({ status: 'rejected' }).eq('id', +b.dataset.r); loadOrders();
  }));
}

// ---- bulk add ----
let plotsInfo;
async function freeMahallaPlots() {
  if (!plotsInfo) {
    const C = await (await fetch('data/city.json')).json();
    const bin = atob(C.plots); const n = C.cols * C.rows; const W2 = (lo, la) => [(lo - C.lon0) * C.mx, (C.lat0 - la) * C.my];
    const AT = W2(69.27988, 41.31122), TC = W2(69.24785, 41.31710);
    const list = [];
    for (let i = 0; i < n; i++) {
      if (!((bin.charCodeAt(i >> 3) >> (i & 7)) & 1)) continue;
      const x = (i % C.cols + 0.5) * C.cell, y = ((i / C.cols | 0) + 0.5) * C.cell;
      const d = Math.min(Math.hypot(x - AT[0], y - AT[1]), Math.hypot(x - TC[0], y - TC[1]) * 1.1);
      if (d >= 4000) list.push(i);
    }
    plotsInfo = list;
  }
  return plotsInfo;
}
$('#bulkGo').onclick = async () => {
  const nicks = [...new Set($('#bulk').value.split(/[\s,]+/).map((s) => s.trim().replace(/^@/, '').toLowerCase()).filter((s) => /^[a-z0-9._]{1,30}$/.test(s)))];
  if (!nicks.length) return;
  const msg = $('#bulkMsg'); const btn = $('#bulkGo'); btn.disabled = true;
  const list = await freeMahallaPlots();
  const taken = new Set(); let from = 0;
  for (;;) { const { data } = await sb.from('places').select('plot').range(from, from + 999); data.forEach((p) => taken.add(p.plot)); if (data.length < 1000) break; from += 1000; }
  const colors = ['#C8553D', '#2F6FB0', '#3A9A8C', '#D9A441', '#8A5BA8'];
  let ok = 0, skip = 0;
  for (const nick of nicks) {
    let done = false;
    for (let a = 0; a < 5 && !done; a++) {
      const plot = list[Math.floor(Math.random() * list.length)]; if (taken.has(plot)) continue;
      const { error } = await sb.rpc('claim_house', { p_nick: nick, p_plot: plot, p_color: colors[Math.floor(Math.random() * 5)] });
      if (!error) { ok++; taken.add(plot); done = true; } else if (/NICK_TAKEN/.test(error.message)) { skip++; done = true; } else taken.add(plot);
    }
    msg.textContent = `Добавлено ${ok}, уже были ${skip} из ${nicks.length}…`;
  }
  msg.textContent = `Готово: добавлено ${ok}, уже были ${skip}.`; btn.disabled = false; $('#bulk').value = '';
};

// ---- edit ----
$('#qGo').onclick = async () => {
  const q = $('#q').value.trim().replace(/^@/, '');
  const { data } = await sb.from('places').select('*').or(`nick.ilike.%${q.replace(/[%,()]/g, '')}%,name.ilike.%${q.replace(/[%,()]/g, '')}%`).limit(20);
  $('#found').innerHTML = (data || []).map((p) => `<div class="card" data-id="${p.id}">
    <b>${esc(p.name || '@' + p.nick)}</b> <span class="muted">· участок ${p.plot} · ${p.kind === 'free' ? 'бесплатный' : 'платный'}</span>
    <div class="grid" style="margin-top:8px">
      <div><label>Название</label><input data-f="name" value="${esc(p.name)}"></div>
      <div><label>Этажей</label><input data-f="floors" type="number" min="1" value="${p.floors}"></div>
      <div><label>Цвет</label><input data-f="color" value="${esc(p.color)}"></div>
      <div><label>Ссылка</label><input data-f="link" value="${esc(p.link)}"></div>
      <div style="grid-column:1/-1"><label>Логотип (ссылка на картинку)</label><input data-f="logo_url" value="${esc(p.logo_url)}"></div>
    </div>
    <div class="row" style="margin-top:8px"><button data-save>Сохранить</button><button class="no" data-del>Удалить</button></div>
  </div>`).join('') || '<p class="muted">Ничего не найдено</p>';
  $('#found').querySelectorAll('[data-id]').forEach((card) => {
    const id = +card.dataset.id;
    card.querySelector('[data-save]').onclick = async () => {
      const upd = {}; card.querySelectorAll('[data-f]').forEach((i) => (upd[i.dataset.f] = i.value.trim() || null));
      upd.floors = Math.max(1, +upd.floors || 1);
      const { error } = await sb.from('places').update(upd).eq('id', id); alert(error ? error.message : 'Сохранено');
    };
    card.querySelector('[data-del]').onclick = async () => {
      if (!confirm('Удалить с карты?')) return;
      const { error } = await sb.from('places').delete().eq('id', id); if (error) alert(error.message); else card.remove();
    };
  });
};
