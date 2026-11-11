// NanoShahar — virtual Toshkent
const CFG = window.NS_CONFIG;
const $ = (s) => document.querySelector(s);

// ---------- i18n ----------
const T = {
  uz: {
    claim_btn: "Uyimni olish — bepul", buy_btn: "Joy sotib olish",
    residents: (n) => `${n.toLocaleString('ru')} aholi · Toshkent`,
    claim_title: "Bepul uy ol", claim_text: "Instagram nikingni yoz — uying shu zahoti xaritada paydo bo'ladi.",
    nick: "Instagram nik", district: "Tuman", any_district: "Istalgan tuman", color: "Tom rangi",
    claim_go: "Uyimni olish", claiming: "Uy qurilmoqda…",
    bad_nick: "Nik faqat lotin harflari, raqamlar, nuqta va _ dan iborat bo'lsin",
    nick_taken: "Bu nikda uy allaqachon bor — qidiruv orqali toping",
    no_plots: "Bu tumanda bo'sh joy qolmadi, boshqasini tanlang",
    err: "Xatolik. Qayta urinib ko'ring",
    done_title: "Tabriklaymiz! 🎉", done_text: (d) => `Sening uying ${d} tumanida. Skrinshot qil va storiesda @${CFG.CONTACT_INSTAGRAM} ni belgila!`,
    share: "Do'stlarga yuborish", show_house: "Uyimni ko'rsat",
    search_title: "Uyni qidirish", search_go: "Topish", not_found: "Bunday nikda uy topilmadi",
    plot: "Joy", zone: "Hudud", status: "Holati", free: "Bo'sh", taken: "Band", floors: "Qavatlar",
    zone_center: "Markaz", zone_middle: "O'rta halqa", zone_mahalla: "Mahalla",
    buy_this: "Shu joyni sotib olish", add_floors: "Qavat qo'shish", visit: "Saytga o'tish",
    pick_plot: "Xaritadan bo'sh joyni bosing", landmark: "Diqqatga sazovor joy — sotilmaydi",
    buy_title: "Joy sotib olish", buy_more_title: "Qavat qo'shish",
    buy_text: "Qancha ko'p qavat — shuncha uzoqdan ko'rinadi.",
    name: "Nomi (brend yoki nik)", contact: "Telefon yoki Instagram", link: "Havola (ixtiyoriy)",
    how_many: "Qavatlar soni", total: "Jami",
    tier_street: "Faqat yaqindan ko'rinadi", tier_district: "Tuman darajasida ko'rinadi", tier_legend: "Butun shahar ko'radi — AFSONA",
    order_go: "Buyurtma berish", ordering: "Yuborilmoqda…",
    need_name: "Nom va kontaktni yozing",
    order_title: "Buyurtma qabul qilindi", order_pay: (id, sum) => `Buyurtma <b>#${id}</b>. <b>${sum}</b> so'mni kartaga o'tkazing:`,
    order_after: `Chekni Instagram Direct'da @${CFG.CONTACT_INSTAGRAM} ga yuboring va buyurtma raqamini yozing. Tasdiqlangandan so'ng bino xaritada paydo bo'ladi.`,
    sum: "so'm", demo: "Demo rejim — ma'lumotlar faqat shu brauzerda",
    zoom_in_more: "Yaqinroq keling, joyni tanlash uchun",
  },
  ru: {
    claim_btn: "Получить дом — бесплатно", buy_btn: "Купить место",
    residents: (n) => `${n.toLocaleString('ru')} жителей · Ташкент`,
    claim_title: "Бесплатный дом", claim_text: "Напиши свой Instagram-ник — дом сразу появится на карте.",
    nick: "Instagram-ник", district: "Район", any_district: "Любой район", color: "Цвет крыши",
    claim_go: "Получить дом", claiming: "Строим дом…",
    bad_nick: "Ник — только латиница, цифры, точка и _",
    nick_taken: "На этот ник дом уже есть — найди его через поиск",
    no_plots: "В этом районе нет свободных мест, выбери другой",
    err: "Ошибка. Попробуй ещё раз",
    done_title: "Поздравляем! 🎉", done_text: (d) => `Твой дом в районе ${d}. Сделай скриншот и отметь @${CFG.CONTACT_INSTAGRAM} в сторис!`,
    share: "Отправить друзьям", show_house: "Показать мой дом",
    search_title: "Найти дом", search_go: "Найти", not_found: "Дом с таким ником не найден",
    plot: "Участок", zone: "Зона", status: "Статус", free: "Свободен", taken: "Занят", floors: "Этажей",
    zone_center: "Центр", zone_middle: "Средний пояс", zone_mahalla: "Махалля",
    buy_this: "Купить этот участок", add_floors: "Достроить этажи", visit: "Перейти на сайт",
    pick_plot: "Нажми на свободный участок на карте", landmark: "Достопримечательность — не продаётся",
    buy_title: "Купить место", buy_more_title: "Достроить этажи",
    buy_text: "Чем больше этажей — тем издалека видно здание.",
    name: "Название (бренд или ник)", contact: "Телефон или Instagram", link: "Ссылка (необязательно)",
    how_many: "Сколько этажей", total: "Итого",
    tier_street: "Видно только вблизи", tier_district: "Видно на уровне района", tier_legend: "Видно на весь город — ЛЕГЕНДА",
    order_go: "Оформить заказ", ordering: "Отправляем…",
    need_name: "Укажи название и контакт",
    order_title: "Заказ принят", order_pay: (id, sum) => `Заказ <b>#${id}</b>. Переведи <b>${sum}</b> сум на карту:`,
    order_after: `Отправь чек в Direct @${CFG.CONTACT_INSTAGRAM} с номером заказа. После подтверждения здание появится на карте.`,
    sum: "сум", demo: "Демо-режим — данные только в этом браузере",
    zoom_in_more: "Приблизь карту, чтобы выбрать участок",
  },
};
let LANG = localStorage.getItem('ns_lang') || 'uz';
const t = (k, ...a) => { const v = T[LANG][k]; return typeof v === 'function' ? v(...a) : v; };
function applyLang() {
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-t]').forEach((el) => (el.textContent = t(el.dataset.t)));
  $('#btnLang').textContent = LANG === 'uz' ? 'RU' : 'UZ';
  updateStats();
}
const fmt = (n) => Math.round(n).toLocaleString('ru').replace(/,/g, ' ');
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------- data layer ----------
const ROOFS = ['#C8553D', '#2F6FB0', '#3A9A8C', '#D9A441', '#8A5BA8', '#2E2A24'];
let DB;
async function initDB() {
  if (CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY) {
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.45.4');
    const sb = createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY);
    DB = {
      demo: false,
      async load() {
        const all = []; let from = 0;
        for (;;) {
          const { data, error } = await sb.from('places').select('id,plot,kind,nick,name,floors,color,link,logo_url').range(from, from + 999);
          if (error) throw error;
          all.push(...data); if (data.length < 1000) break; from += 1000;
        }
        return all;
      },
      async claim(nick, plot, color) {
        const { data, error } = await sb.rpc('claim_house', { p_nick: nick, p_plot: plot, p_color: color });
        if (error) return { error: error.message };
        return { place: data };
      },
      async order(o) {
        const { data, error } = await sb.rpc('create_order', {
          p_plot: o.plot, p_place: o.place_id ?? null, p_floors: o.floors, p_name: o.name,
          p_contact: o.contact, p_color: o.color, p_link: o.link || null, p_amount: o.amount,
        });
        if (error) return { error: error.message };
        return { id: data };
      },
      subscribe(cb) {
        sb.channel('places').on('postgres_changes', { event: '*', schema: 'public', table: 'places' }, (p) => cb(p.new)).subscribe();
      },
    };
  } else {
    const get = () => JSON.parse(localStorage.getItem('ns_demo') || '[]');
    const set = (v) => localStorage.setItem('ns_demo', JSON.stringify(v));
    DB = {
      demo: true,
      async load() { return get(); },
      async claim(nick, plot, color) {
        const a = get();
        if (a.some((p) => p.nick === nick && p.kind === 'free')) return { error: 'NICK_TAKEN' };
        if (a.some((p) => p.plot === plot)) return { error: 'PLOT_TAKEN' };
        const place = { id: Date.now(), plot, kind: 'free', nick, name: null, floors: 1, color, link: null };
        a.push(place); set(a); return { place };
      },
      async order(o) { return { id: Math.floor(Math.random() * 9000 + 1000) }; },
      subscribe() {},
    };
  }
}

// ---------- city ----------
let C, W, H, cols, rows, cell;
let isPlot, zoneOf, distOf, blocked;
const places = new Map(); // plot -> place
const byNick = new Map();
let layer, layerCtx, layerImg;
const paths = {};
const LANDMARKS = [
  ['Amir Temur xiyoboni', 69.27988, 41.31122, 2], ['Tashkent City', 69.24785, 41.31710, 2, 'l'],
  ['Chorsu', 69.23573, 41.32620, 1, 'l'], ['Hazrati Imom', 69.2403, 41.3381, 1, 'l'], ['Teleminora', 69.28478, 41.34567, 1],
  ['Magic City', 69.24467, 41.30331, 1, 'l'], ['Mustaqillik maydoni', 69.2715, 41.3130, 0], ['Minor masjidi', 69.2735, 41.3262, 0],
  ['Navoiy teatri', 69.27131, 41.30927, 0], ['Aeroport', 69.2812, 41.2579, 1],
];
let LM = [];
const ZC = { center: [242, 193, 78], middle: [247, 221, 168], mahalla: [251, 245, 232] };

function decodePlots(b64) {
  const bin = atob(b64); const n = cols * rows; const a = new Uint8Array(n);
  for (let i = 0; i < n; i++) a[i] = (bin.charCodeAt(i >> 3) >> (i & 7)) & 1;
  return a;
}
function toPath(list, close) {
  const p = new Path2D();
  for (const f of list) { p.moveTo(f[0], f[1]); for (let i = 2; i < f.length; i += 2) p.lineTo(f[i], f[i + 1]); if (close) p.closePath(); }
  return p;
}
const W2 = (lon, lat) => [(lon - C.lon0) * C.mx, (C.lat0 - lat) * C.my];

async function loadCity() {
  C = await (await fetch('data/city.json')).json();
  cols = C.cols; rows = C.rows; cell = C.cell; W = cols * cell; H = rows * cell;
  isPlot = decodePlots(C.plots);
  for (const k of ['r1', 'r2', 'r3', 'water', 'river', 'rail']) paths[k] = toPath(C[k], false);
  for (const k of ['green', 'waterA']) paths[k] = toPath(C[k], true);
  paths.city = toPath(C.city, true);
  paths.dist = toPath(C.dist.flatMap((d) => d.r), true);
  // district raster
  const dc = document.createElement('canvas'); dc.width = cols; dc.height = rows;
  const dx = dc.getContext('2d'); dx.setTransform(1 / cell, 0, 0, 1 / cell, 0, 0);
  C.dist.forEach((d, i) => { dx.fillStyle = `rgb(${i + 1},0,0)`; dx.fill(toPath(d.r, true)); });
  const di = dx.getImageData(0, 0, cols, rows).data;
  distOf = new Uint8Array(cols * rows);
  for (let i = 0; i < cols * rows; i++) distOf[i] = di[i * 4 + 3] > 200 ? di[i * 4] : 0;
  // no plots on big roads, railways and canals
  const rc = document.createElement('canvas'); rc.width = cols; rc.height = rows;
  const rx = rc.getContext('2d'); rx.setTransform(1 / cell, 0, 0, 1 / cell, 0, 0); rx.strokeStyle = '#000'; rx.lineCap = 'round';
  rx.lineWidth = 34; rx.stroke(paths.r1); rx.lineWidth = 24; rx.stroke(paths.r2); rx.lineWidth = 18; rx.stroke(paths.rail); rx.stroke(paths.water); rx.lineWidth = 40; rx.stroke(paths.river);
  const ri = rx.getImageData(0, 0, cols, rows).data;
  for (let i = 0; i < cols * rows; i++) if (ri[i * 4 + 3] > 90) isPlot[i] = 0;
  C.dist.forEach((d) => { // label anchor = centroid of district cells
    let sx = 0, sy = 0, n = 0;
    const id = C.dist.indexOf(d) + 1;
    for (let i = 0; i < cols * rows; i += 3) if (distOf[i] === id) { sx += i % cols; sy += (i / cols) | 0; n++; }
    d.cx = (sx / n + 0.5) * cell; d.cy = (sy / n + 0.5) * cell;
  });
  LM = LANDMARKS.map(([n, lo, la, lvl, side]) => { const [x, y] = W2(lo, la); return { n, x, y, lvl, side: side || 'r' }; });
  const AT = LM[0], TC = LM[1];
  zoneOf = new Uint8Array(cols * rows); blocked = new Uint8Array(cols * rows);
  for (let i = 0; i < cols * rows; i++) {
    if (!isPlot[i]) continue;
    const x = (i % cols + 0.5) * cell, y = ((i / cols | 0) + 0.5) * cell;
    const d = Math.min(Math.hypot(x - AT.x, y - AT.y), Math.hypot(x - TC.x, y - TC.y) * 1.1);
    zoneOf[i] = d < 1500 ? 0 : d < 4000 ? 1 : 2;
    for (const l of LM) if (Math.hypot(x - l.x, y - l.y) < 110) blocked[i] = 1;
  }
  layer = document.createElement('canvas'); layer.width = cols; layer.height = rows;
  layerCtx = layer.getContext('2d'); layerImg = layerCtx.createImageData(cols, rows);
  for (let i = 0; i < cols * rows; i++) if (isPlot[i]) setLayerPx(i);
  layerCtx.putImageData(layerImg, 0, 0);
}
const zoneName = (i) => ['center', 'middle', 'mahalla'][zoneOf[i]];
function hex2rgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
function setLayerPx(i) {
  const p = places.get(i);
  const c = p ? hex2rgb(p.color || '#C8553D') : blocked[i] ? [225, 217, 200] : ZC[zoneName(i)];
  const o = i * 4; layerImg.data[o] = c[0]; layerImg.data[o + 1] = c[1]; layerImg.data[o + 2] = c[2]; layerImg.data[o + 3] = 255;
}
function addPlace(p, redrawLayer = true) {
  if (!p || p.plot == null) return;
  const old = places.get(p.plot);
  places.set(p.plot, { ...old, ...p });
  if (p.nick && p.kind === 'free') byNick.set(p.nick.toLowerCase(), p.plot);
  setLayerPx(p.plot);
  if (redrawLayer) { layerCtx.putImageData(layerImg, 0, 0); updateStats(); draw(); }
}
function updateStats() { const el = $('#stats'); if (el && C) el.textContent = t('residents', places.size); }

// ---------- view ----------
const cv = $('#map'); const ctx = cv.getContext('2d');
let dpr = 1, vw = 0, vh = 0;
const view = { s: 0.01, x: 0, y: 0 };
let minS = 0.005; const maxS = 2.2;
let selected = null; let pickMode = false;
function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2); vw = innerWidth; vh = innerHeight;
  cv.width = vw * dpr; cv.height = vh * dpr; draw();
}
function fitCity() {
  // bounds of city polygon
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const r of C.city) for (let i = 0; i < r.length; i += 2) { x0 = Math.min(x0, r[i]); x1 = Math.max(x1, r[i]); y0 = Math.min(y0, r[i + 1]); y1 = Math.max(y1, r[i + 1]); }
  const padTop = 80, padBot = 90;
  const s = Math.min(vw / (x1 - x0), (vh - padTop - padBot) / (y1 - y0)) * 0.98;
  minS = s * 0.7;
  return { s, x: (x0 + x1) / 2 - vw / 2 / s, y: (y0 + y1) / 2 - (vh + padTop - padBot) / 2 / s };
}
const sx = (x) => (x - view.x) * view.s, sy = (y) => (y - view.y) * view.s;
const wx = (px) => px / view.s + view.x, wy = (py) => py / view.s + view.y;
function zoomAt(px, py, f) {
  const ns = Math.max(minS, Math.min(maxS, view.s * f));
  const mx = wx(px), my = wy(py); view.s = ns; view.x = mx - px / ns; view.y = my - py / ns; draw();
}
let anim = null;
function flyTo(x, y, s, ms = 900) {
  cancelAnimationFrame(anim);
  const a = { ...view }; const b = { s, x: x - vw / 2 / s, y: y - (vh / 2 - 40) / s }; const t0 = performance.now();
  const step = (now) => {
    let k = Math.min(1, (now - t0) / ms); k = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    const ls = Math.exp(Math.log(a.s) + (Math.log(b.s) - Math.log(a.s)) * k);
    const cxw = (a.x + vw / 2 / a.s) + ((b.x + vw / 2 / b.s) - (a.x + vw / 2 / a.s)) * k;
    const cyw = (a.y + vh / 2 / a.s) + ((b.y + vh / 2 / b.s) - (a.y + vh / 2 / a.s)) * k;
    view.s = ls; view.x = cxw - vw / 2 / ls; view.y = cyw - vh / 2 / ls; draw();
    if (k < 1) anim = requestAnimationFrame(step);
  };
  anim = requestAnimationFrame(step);
}

// ---------- drawing ----------
let pending = false;
function draw() { if (!pending && C) { pending = true; requestAnimationFrame(render); } }
const logos = new Map();
function logo(url) {
  if (!url) return null;
  if (!logos.has(url)) { const im = new Image(); im.crossOrigin = 'anonymous'; im.onload = draw; im.src = url; logos.set(url, im); }
  const im = logos.get(url); return im.complete && im.naturalWidth ? im : null;
}
let hits = [];
function tierOf(f) { return f >= CFG.TIER_LEGEND ? 3 : f >= CFG.TIER_DISTRICT ? 2 : f >= 2 ? 1 : 0; }
function shade(hex, k) { const [r, g, b] = hex2rgb(hex); const f = (v) => Math.max(0, Math.min(255, Math.round(v * k))); return `rgb(${f(r)},${f(g)},${f(b)})`; }

function render() {
  pending = false;
  const s = view.s, cp = cell * s;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = '#E3DCCB'; ctx.fillRect(0, 0, vw, vh);
  ctx.setTransform(dpr * s, 0, 0, dpr * s, -view.x * s * dpr, -view.y * s * dpr);
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.fillStyle = '#F1EADA'; ctx.fill(paths.city);
  ctx.fillStyle = '#A9CF86'; ctx.fill(paths.green);
  ctx.fillStyle = '#86C0DF'; ctx.fill(paths.waterA);
  ctx.strokeStyle = '#86C0DF';
  ctx.lineWidth = Math.max(28, 2.2 / s); ctx.stroke(paths.river);
  ctx.lineWidth = Math.max(12, 1.2 / s); ctx.stroke(paths.water);

  // plots
  const c0 = Math.max(0, Math.floor(view.x / cell)), c1 = Math.min(cols - 1, Math.floor(wx(vw) / cell));
  const r0 = Math.max(0, Math.floor(view.y / cell)), r1 = Math.min(rows - 1, Math.floor(wy(vh) / cell));
  if (cp < 7) {
    ctx.imageSmoothingEnabled = false;
    ctx.globalAlpha = cp < 2 ? 0.85 : 1;
    ctx.drawImage(layer, 0, 0, W, H);
    ctx.globalAlpha = 1;
  } else {
    const ins = cell * 0.12, sz = cell - ins * 2;
    for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) {
      const i = r * cols + c; if (!isPlot[i]) continue;
      const x = c * cell + ins, y = r * cell + ins; const p = places.get(i);
      if (p && (p.floors || 1) >= 2) { ctx.fillStyle = '#D8CFBD'; ctx.fillRect(x, y, sz, sz); continue; }
      if (p) {
        if (cp >= 16) { // house icon
          const col = p.color || '#C8553D';
          ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(x + sz * 0.16, y + sz * 0.42, sz * 0.8, sz * 0.58);
          ctx.fillStyle = '#FFFFFF'; ctx.fillRect(x + sz * 0.1, y + sz * 0.38, sz * 0.8, sz * 0.58);
          ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y + sz * 0.45); ctx.lineTo(x + sz / 2, y + sz * 0.02); ctx.lineTo(x + sz, y + sz * 0.45); ctx.closePath(); ctx.fill();
          ctx.fillStyle = shade(col, 0.6); ctx.fillRect(x + sz * 0.42, y + sz * 0.68, sz * 0.16, sz * 0.28);
        } else { ctx.fillStyle = p.color || '#C8553D'; ctx.fillRect(x, y, sz, sz); }
      } else {
        const z = ZC[zoneName(i)]; ctx.fillStyle = blocked[i] ? '#E1D9C8' : `rgb(${z[0]},${z[1]},${z[2]})`;
        ctx.fillRect(x, y, sz, sz);
        if (cp > 20) { ctx.strokeStyle = 'rgba(160,130,80,.25)'; ctx.lineWidth = 1 / s; ctx.strokeRect(x, y, sz, sz); }
      }
    }
  }
  // roads
  if (s > 0.05) { ctx.strokeStyle = '#A39A89'; ctx.lineWidth = Math.max(4, 1 / s); ctx.setLineDash([6 / s, 5 / s]); ctx.stroke(paths.rail); ctx.setLineDash([]); }
  if (s > 0.12) { ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = Math.max(9, 1.2 / s); ctx.stroke(paths.r3); }
  if (s > 0.035) { ctx.strokeStyle = '#D6CBB3'; ctx.lineWidth = Math.max(16, 2.6 / s); ctx.stroke(paths.r2); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = Math.max(12, 1.6 / s); ctx.stroke(paths.r2); }
  ctx.strokeStyle = '#CFC2A6'; ctx.lineWidth = Math.max(24, 3.6 / s); ctx.stroke(paths.r1);
  ctx.strokeStyle = '#FFF8E8'; ctx.lineWidth = Math.max(18, 2.4 / s); ctx.stroke(paths.r1);
  // borders
  ctx.strokeStyle = 'rgba(31,78,140,.55)'; ctx.lineWidth = 1.3 / s; ctx.setLineDash([6 / s, 5 / s]); ctx.stroke(paths.dist); ctx.setLineDash([]);
  ctx.strokeStyle = '#1F4E8C'; ctx.lineWidth = 2.5 / s; ctx.stroke(paths.city);

  // ---- screen space ----
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  hits = [];
  const occ = [];
  // landmarks
  const lmLvl = s > 0.12 ? 0 : s > 0.035 ? 1 : 2;
  for (const l of LM) {
    if (l.lvl < lmLvl) continue;
    const x = sx(l.x), y = sy(l.y); if (x < -100 || x > vw + 100 || y < -30 || y > vh + 30) continue;
    const r = l.lvl === 2 ? 8 : 6;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fillStyle = '#E4572E'; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = '#fff'; ctx.stroke();
    const pb = l.side === 'l' ? pill(l.n, x - r - 4, y, 'right', '#fff', '#1E1A14', l.lvl === 2 ? 12 : 11) : pill(l.n, x + r + 4, y, 'left', '#fff', '#1E1A14', l.lvl === 2 ? 12 : 11);
    occ.push(pb);
    hits.push({ x0: x - 10, y0: y - 10, x1: x + 10, y1: y + 10, lm: l });
  }
  if (s < 0.09) {
    ctx.font = '600 11px Unbounded, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (const d of C.dist) {
      const x = sx(d.cx), y = sy(d.cy); if (x < -80 || x > vw + 80 || y < -20 || y > vh + 20) continue;
      const txt = d.n.toUpperCase(); const w = ctx.measureText(txt).width;
      const box = { x0: x - w / 2 - 3, y0: y - 9, x1: x + w / 2 + 3, y1: y + 9 };
      if (occ.some((o) => box.x0 < o.x1 && box.x1 > o.x0 && box.y0 < o.y1 && box.y1 > o.y0)) continue;
      occ.push(box);
      ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(241,234,218,.9)'; ctx.strokeText(txt, x, y);
      ctx.fillStyle = '#163A69'; ctx.fillText(txt, x, y);
    }
  }
  // buildings (floors >= 2)
  const bl = [];
  for (const [i, p] of places) {
    const f = p.floors || 1; if (f < 2) continue;
    const tier = tierOf(f);
    const vis = tier === 3 || (tier === 2 && s >= 0.04) || s >= 0.15;
    if (!vis) continue;
    const x = sx((i % cols + 0.5) * cell), y = sy(((i / cols) | 0) * cell + cell * 0.9);
    if (x < -150 || x > vw + 150 || y < -40 || y > vh + 400) continue;
    bl.push({ i, p, f, tier, x, y });
  }
  bl.sort((a, b) => a.y - b.y);
  for (const b of bl) drawTower(b, s, cp);
  // nick labels
  if (cp >= 26) {
    ctx.font = '600 10px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) {
      const i = r * cols + c; const p = places.get(i); if (!p || (p.floors || 1) >= 2 || !p.nick) continue;
      const x = sx((c + 0.5) * cell), y = sy((r + 1) * cell) + 1;
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.strokeText('@' + p.nick, x, y); ctx.fillStyle = '#1E1A14'; ctx.fillText('@' + p.nick, x, y);
    }
  }
  // selection
  if (selected != null) {
    const x = sx((selected % cols) * cell), y = sy(((selected / cols) | 0) * cell), z = Math.max(cp, 10);
    ctx.strokeStyle = '#E4572E'; ctx.lineWidth = 3; ctx.strokeRect(x - (z - cp) / 2 - 2, y - (z - cp) / 2 - 2, z + 4, z + 4);
  }
}
function pill(txt, x, y, align, bg, fg, size = 11, border) {
  ctx.font = `700 ${size}px Inter, sans-serif`; const w = ctx.measureText(txt).width + 12, h = size + 9;
  const x0 = align === 'left' ? x : align === 'center' ? x - w / 2 : x - w;
  ctx.fillStyle = bg; roundRect(x0, y - h / 2, w, h, 6); ctx.fill();
  if (border) { ctx.strokeStyle = border; ctx.lineWidth = 1.5; ctx.stroke(); }
  ctx.fillStyle = fg; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(txt, x0 + 6, y + 0.5);
  return { x0, y0: y - h / 2, x1: x0 + w, y1: y + h / 2 };
}
function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function drawTower(b, s, cp) {
  const { p, f, tier, x, y } = b;
  const col = p.color || '#1F4E8C';
  const bw = tier === 3 ? Math.max(16, Math.min(cp * 0.85, 70)) : Math.max(10, Math.min(cp * 0.8, 60));
  const k = Math.max(tier === 3 ? 0.9 : 0.7, Math.min(s * 4, 3.2));
  const h = Math.min(f * k + 6, tier === 3 ? 260 : 180);
  const d = bw * 0.35;
  const x0 = x - bw / 2, y0 = y - h;
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(x + d / 2, y, bw * 0.75, bw * 0.22, 0, 0, 7); ctx.fill();
  ctx.fillStyle = shade(col, 0.62); ctx.beginPath(); ctx.moveTo(x0 + bw, y0); ctx.lineTo(x0 + bw + d, y0 - d); ctx.lineTo(x0 + bw + d, y - d); ctx.lineTo(x0 + bw, y); ctx.closePath(); ctx.fill();
  ctx.fillStyle = shade(col, 1.25); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + d, y0 - d); ctx.lineTo(x0 + bw + d, y0 - d); ctx.lineTo(x0 + bw, y0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = col; ctx.fillRect(x0, y0, bw, h);
  if (h > 26 && bw > 12) { // windows
    ctx.fillStyle = 'rgba(255,255,255,.28)';
    const rowsN = Math.min(Math.floor(h / 7), 60);
    for (let r = 1; r < rowsN; r++) { const yy = y0 + r * (h / rowsN); ctx.fillRect(x0 + bw * 0.15, yy, bw * 0.7, Math.max(1, h / rowsN * 0.35)); }
  }
  const im = logo(p.logo_url);
  if (im && bw >= 14) { const ls = bw * 0.8; ctx.fillStyle = '#fff'; ctx.fillRect(x0 + bw * 0.1, y0 + 4, ls, ls); ctx.drawImage(im, x0 + bw * 0.1 + 1, y0 + 5, ls - 2, ls - 2); }
  const showLabel = tier === 3 || (tier === 2 && s >= 0.04) || s >= 0.3;
  let box = { x0: x0, y0: y0 - d, x1: x0 + bw + d, y1: y };
  if (showLabel) {
    const name = p.name || (p.nick ? '@' + p.nick : '');
    if (name) {
      const pb = pill(name, x + d / 2, y0 - d - 12, 'center', tier === 3 ? '#1F4E8C' : '#fff', tier === 3 ? '#fff' : '#1E1A14', tier === 3 ? 12 : 11, tier === 3 ? null : '#1F4E8C');
      box = { x0: Math.min(box.x0, pb.x0), y0: pb.y0, x1: Math.max(box.x1, pb.x1), y1: y };
    }
  }
  hits.push({ ...box, plot: b.i });
}

// ---------- input ----------
const ptrs = new Map(); let gesture = null; let downInfo = null;
cv.addEventListener('pointerdown', (e) => {
  cv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  cancelAnimationFrame(anim);
  if (ptrs.size === 1) downInfo = { x: e.clientX, y: e.clientY, t: performance.now(), moved: false };
  else downInfo && (downInfo.moved = true);
  gesture = snapshot(); cv.classList.add('drag');
});
function snapshot() {
  const ps = [...ptrs.values()];
  if (ps.length === 1) return { mode: 'pan', x: ps[0].x, y: ps[0].y, vx: view.x, vy: view.y };
  const [a, b] = ps; const cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2;
  return { mode: 'pinch', d: Math.hypot(a.x - b.x, a.y - b.y), s: view.s, wxm: wx(cx), wym: wy(cy) };
}
cv.addEventListener('pointermove', (e) => {
  if (!ptrs.has(e.pointerId)) return;
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (downInfo && Math.hypot(e.clientX - downInfo.x, e.clientY - downInfo.y) > 8) downInfo.moved = true;
  const ps = [...ptrs.values()];
  if (gesture.mode === 'pan' && ps.length === 1) {
    view.x = gesture.vx - (ps[0].x - gesture.x) / view.s; view.y = gesture.vy - (ps[0].y - gesture.y) / view.s; draw();
  } else if (gesture.mode === 'pinch' && ps.length >= 2) {
    const [a, b] = ps; const cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2;
    const ns = Math.max(minS, Math.min(maxS, gesture.s * Math.hypot(a.x - b.x, a.y - b.y) / gesture.d));
    view.s = ns; view.x = gesture.wxm - cx / ns; view.y = gesture.wym - cy / ns; draw();
  }
});
let lastTap = 0;
function up(e) {
  if (!ptrs.has(e.pointerId)) return;
  ptrs.delete(e.pointerId);
  if (ptrs.size > 0) { gesture = snapshot(); return; }
  cv.classList.remove('drag');
  if (downInfo && !downInfo.moved && performance.now() - downInfo.t < 400) {
    const now = performance.now();
    if (now - lastTap < 300) { zoomAt(e.clientX, e.clientY, 2.2); lastTap = 0; }
    else { lastTap = now; tap(e.clientX, e.clientY); }
  }
  downInfo = null;
}
cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
cv.addEventListener('wheel', (e) => { e.preventDefault(); zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.0018)); }, { passive: false });
$('#zIn').onclick = () => zoomAt(vw / 2, vh / 2, 1.8);
$('#zOut').onclick = () => zoomAt(vw / 2, vh / 2, 1 / 1.8);
$('#zHome').onclick = () => { const f = fitCity(); flyTo(f.x + vw / 2 / f.s, f.y + (vh / 2 - 40) / f.s, f.s); };

function tap(px, py) {
  for (let k = hits.length - 1; k >= 0; k--) {
    const h = hits[k];
    if (px >= h.x0 && px <= h.x1 && py >= h.y0 && py <= h.y1) {
      if (h.lm) { toast(`${h.lm.n} — ${t('landmark')}`); return; }
      selectPlot(h.plot); return;
    }
  }
  const c = Math.floor(wx(px) / cell), r = Math.floor(wy(py) / cell);
  if (c < 0 || r < 0 || c >= cols || r >= rows) return;
  let i = r * cols + c;
  if (!isPlot[i]) { // snap to nearest plot within 1 cell when zoomed out
    let best = -1, bd = 1e9; const rad = cell * view.s < 8 ? 3 : 1;
    for (let dr = -rad; dr <= rad; dr++) for (let dc = -rad; dc <= rad; dc++) { const j = (r + dr) * cols + c + dc; if (j >= 0 && j < cols * rows && isPlot[j] && dr * dr + dc * dc < bd) { bd = dr * dr + dc * dc; best = j; } }
    if (best < 0) { selected = null; draw(); return; } i = best;
  }
  if (cell * view.s < 6) { toast(t('zoom_in_more')); flyTo((i % cols + 0.5) * cell, ((i / cols | 0) + 0.5) * cell, Math.max(view.s * 3, 0.2), 600); return; }
  selectPlot(i);
}

// ---------- UI ----------
let toastT;
function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2600); }
function openSheet(html, onMount) {
  $('#sheetBody').innerHTML = html; $('#sheet').classList.add('show'); $('#backdrop').classList.add('show');
  onMount && onMount($('#sheetBody'));
}
function closeSheet() { $('#sheet').classList.remove('show'); $('#backdrop').classList.remove('show'); }
$('#sheetClose').onclick = closeSheet; $('#backdrop').onclick = closeSheet;
$('#btnLang').onclick = () => { LANG = LANG === 'uz' ? 'ru' : 'uz'; localStorage.setItem('ns_lang', LANG); applyLang(); };
const distName = (i) => (distOf[i] ? C.dist[distOf[i] - 1].n : 'Toshkent');

function selectPlot(i) {
  selected = i; draw();
  const p = places.get(i); const z = zoneName(i);
  let html = `<h2>${p ? esc(p.name || '@' + p.nick) : t('plot') + ' #' + i}</h2>
    <div class="row"><span>${t('district')}</span><b>${esc(distName(i))}</b></div>
    <div class="row"><span>${t('zone')}</span><b>${t('zone_' + z)}</b></div>`;
  if (blocked[i]) { openSheet(html + `<p>${t('landmark')}</p>`); return; }
  if (p) {
    html += `<div class="row"><span>${t('floors')}</span><b>${p.floors || 1}</b></div>
      ${p.link ? `<a class="ghost" style="display:flex;align-items:center;justify-content:center;text-decoration:none" href="${esc(safeUrl(p.link))}" target="_blank" rel="noopener nofollow">${t('visit')}</a>` : ''}
      <button class="secondary" id="more">${t('add_floors')}</button>`;
    openSheet(html, (el) => { el.querySelector('#more').onclick = () => buyForm(i, p); });
  } else {
    html += `<div class="row"><span>${t('status')}</span><b style="color:#2E7D32">${t('free')}</b></div>
      <button class="secondary" id="buy">${t('buy_this')}</button>`;
    openSheet(html, (el) => { el.querySelector('#buy').onclick = () => buyForm(i, null); });
  }
}
function safeUrl(u) { try { const x = new URL(/^https?:\/\//.test(u) ? u : 'https://' + u); return /^https?:$/.test(x.protocol) ? x.href : '#'; } catch { return '#'; } }

function swatchesHtml(cur) { return `<div class="swatches">${ROOFS.map((c) => `<button type="button" class="sw ${c === cur ? 'on' : ''}" style="background:${c}" data-c="${c}" aria-label="${c}"></button>`).join('')}</div>`; }
function bindSwatches(el, cb) { el.querySelectorAll('.sw').forEach((b) => (b.onclick = () => { el.querySelectorAll('.sw').forEach((x) => x.classList.remove('on')); b.classList.add('on'); cb(b.dataset.c); })); }

function claimForm() {
  let color = ROOFS[Math.floor(Math.random() * 5)];
  const opts = C.dist.map((d, k) => `<option value="${k + 1}">${esc(d.n)}</option>`).join('');
  openSheet(`<h2>${t('claim_title')}</h2><p>${t('claim_text')}</p>
    <div class="field"><label for="nk">${t('nick')}</label><div class="at"><span>@</span><input id="nk" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="30" placeholder="nanouzbek"></div></div>
    <div class="field"><label for="ds">${t('district')}</label><select id="ds"><option value="0">${t('any_district')}</option>${opts}</select></div>
    <div class="field"><label>${t('color')}</label>${swatchesHtml(color)}</div>
    <div class="err" id="er"></div>
    <button class="primary" id="go">${t('claim_go')}</button>`, (el) => {
    bindSwatches(el, (c) => (color = c));
    const go = el.querySelector('#go');
    go.onclick = async () => {
      const nick = el.querySelector('#nk').value.trim().replace(/^@/, '').toLowerCase();
      const er = el.querySelector('#er'); er.textContent = '';
      if (!/^[a-z0-9._]{1,30}$/.test(nick)) { er.textContent = t('bad_nick'); return; }
      if (byNick.has(nick)) { er.textContent = t('nick_taken'); return; }
      go.disabled = true; go.textContent = t('claiming');
      const dsel = +el.querySelector('#ds').value;
      let res;
      for (let attempt = 0; attempt < 6; attempt++) {
        const plot = randomFreePlot(dsel); if (plot < 0) { res = { error: 'NO_PLOTS' }; break; }
        res = await DB.claim(nick, plot, color);
        if (!res.error || !/PLOT_TAKEN|duplicate key.*plot/i.test(res.error)) break;
        addPlace({ plot, floors: 1, color: '#999' }, false);
      }
      go.disabled = false; go.textContent = t('claim_go');
      if (res.error) { er.textContent = /NICK/i.test(res.error) ? t('nick_taken') : /NO_PLOTS/.test(res.error) ? t('no_plots') : /BAD_NICK/.test(res.error) ? t('bad_nick') : t('err'); return; }
      addPlace(res.place); done(res.place);
    };
  });
}
function randomFreePlot(d) {
  const cand = [];
  for (let i = 0; i < cols * rows; i++) if (isPlot[i] && zoneOf[i] === 2 && !blocked[i] && !places.has(i) && distOf[i] && (!d || distOf[i] === d)) cand.push(i);
  return cand.length ? cand[Math.floor(Math.random() * cand.length)] : -1;
}
function done(p) {
  const i = p.plot; const url = `${location.origin}${location.pathname}?u=${encodeURIComponent(p.nick)}`;
  flyTo((i % cols + 0.5) * cell, ((i / cols | 0) + 0.5) * cell, 0.6, 1400);
  selected = i;
  openSheet(`<h2>${t('done_title')}</h2><p>${t('done_text', esc(distName(i)))}</p>
    <button class="primary" id="sh">${t('share')}</button>`, (el) => {
    el.querySelector('#sh').onclick = async () => {
      if (navigator.share) { try { await navigator.share({ title: 'NanoShahar', text: `@${p.nick} — Toshkentdagi uyim`, url }); } catch {} }
      else { navigator.clipboard?.writeText(url); toast(url); }
    };
  });
}
function searchForm() {
  openSheet(`<h2>${t('search_title')}</h2>
    <div class="field"><div class="at"><span>@</span><input id="q" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="nanouzbek"></div></div>
    <div class="err" id="er"></div><button class="secondary" id="go">${t('search_go')}</button>`, (el) => {
    const go = () => {
      const q = el.querySelector('#q').value.trim().replace(/^@/, '').toLowerCase();
      if (!findNick(q)) el.querySelector('#er').textContent = t('not_found'); else closeSheet();
    };
    el.querySelector('#go').onclick = go; el.querySelector('#q').onkeydown = (e) => e.key === 'Enter' && go();
  });
}
function findNick(q) {
  let i = byNick.get(q);
  if (i == null) for (const [k, p] of places) if ((p.name || '').toLowerCase() === q) { i = k; break; }
  if (i == null) return false;
  selected = i; flyTo((i % cols + 0.5) * cell, ((i / cols | 0) + 0.5) * cell, 0.6, 1400); return true;
}
function buyForm(i, place) {
  const z = zoneName(i); const price = CFG.FLOOR_PRICE[z];
  const base = place ? place.floors || 1 : 0;
  let floors = 5, color = place?.color || '#1F4E8C';
  const presets = [5, 15, 50, 100];
  openSheet(`<h2>${place ? t('buy_more_title') : t('buy_title')}</h2><p>${t('buy_text')}</p>
    <div class="row"><span>${t('district')} · ${t('zone')}</span><b>${esc(distName(i))} · ${t('zone_' + z)}</b></div>
    ${place ? '' : `<div class="field"><label for="nm">${t('name')}</label><input id="nm" maxlength="40"></div>`}
    <div class="field"><label for="ct">${t('contact')}</label><input id="ct" maxlength="60" inputmode="text"></div>
    ${place ? '' : `<div class="field"><label for="ln">${t('link')}</label><input id="ln" maxlength="120" placeholder="instagram.com/..."></div>`}
    <div class="field"><label>${t('how_many')}</label>
      <div class="chips">${presets.map((n) => `<button type="button" class="chip ${n === floors ? 'on' : ''}" data-n="${n}">+${n}</button>`).join('')}
      <input id="fl" type="number" min="1" max="500" value="${floors}" style="width:90px;height:40px"></div></div>
    ${place ? '' : `<div class="field"><label>${t('color')}</label>${swatchesHtml(color)}</div>`}
    <div class="note"><span class="tag" id="tier"></span><div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:8px"><span>${t('total')}</span><span class="price" id="pr"></span></div></div>
    <div class="err" id="er"></div>
    <button class="primary" id="go">${t('order_go')}</button>`, (el) => {
    const upd = () => {
      const tot = base + floors; const tr = tierOf(tot);
      el.querySelector('#tier').textContent = `${tot} ${t('floors').toLowerCase()} · ` + (tr === 3 ? t('tier_legend') : tr === 2 ? t('tier_district') : t('tier_street'));
      el.querySelector('#pr').textContent = `${fmt(floors * price)} ${t('sum')}`;
      el.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', +c.dataset.n === floors));
    };
    el.querySelectorAll('.chip').forEach((c) => (c.onclick = () => { floors = +c.dataset.n; el.querySelector('#fl').value = floors; upd(); }));
    el.querySelector('#fl').oninput = (e) => { floors = Math.max(1, Math.min(500, +e.target.value || 1)); upd(); };
    if (!place) bindSwatches(el, (c) => (color = c));
    upd();
    const go = el.querySelector('#go');
    go.onclick = async () => {
      const name = place ? place.name || place.nick : el.querySelector('#nm').value.trim();
      const contact = el.querySelector('#ct').value.trim();
      if (!name || !contact) { el.querySelector('#er').textContent = t('need_name'); return; }
      go.disabled = true; go.textContent = t('ordering');
      const amount = floors * price;
      const res = await DB.order({ plot: i, place_id: place?.id, floors, name, contact, color, link: place ? null : el.querySelector('#ln').value.trim(), amount });
      go.disabled = false; go.textContent = t('order_go');
      if (res.error) { el.querySelector('#er').textContent = t('err'); return; }
      openSheet(`<h2>${t('order_title')}</h2><div class="pay">${t('order_pay', res.id, fmt(amount))}<br><code>${esc(CFG.PAY_CARD)}</code><br>${esc(CFG.PAY_CARD_OWNER)}</div><p>${t('order_after')}</p>`);
    };
  });
}

$('#btnClaim').onclick = () => claimForm();
$('#btnSearch').onclick = () => searchForm();
$('#btnBuy').onclick = () => { closeSheet(); pickMode = true; toast(t('pick_plot')); if (view.s < 0.12) flyTo(LM[0].x, LM[0].y, 0.25, 900); };

// ---------- boot ----------
(async function boot() {
  const ld = document.createElement('div'); ld.className = 'loading'; ld.textContent = 'NANOSHAHAR'; document.body.appendChild(ld);
  await Promise.all([loadCity(), initDB()]);
  resize(); Object.assign(view, fitCity()); applyLang();
  try { (await DB.load()).forEach((p) => addPlace(p, false)); } catch (e) { console.error(e); toast(t('err')); }
  layerCtx.putImageData(layerImg, 0, 0); updateStats(); draw();
  DB.subscribe((p) => p && addPlace(p));
  if (DB.demo) toast(t('demo'));
  ld.style.opacity = 0; setTimeout(() => ld.remove(), 400);
  const u = new URLSearchParams(location.search).get('u');
  if (u) setTimeout(() => findNick(u.toLowerCase()), 500);
})();
addEventListener('resize', resize);
