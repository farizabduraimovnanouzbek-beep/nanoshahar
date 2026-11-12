// ===== НАСТРОЙКИ САЙТА — меняй здесь =====
window.NS_CONFIG = {
  // Supabase (Project Settings → API). Пусто = демо-режим (данные только в этом браузере)
  SUPABASE_URL: "https://vdnkrvzkjjselvdaeqpu.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_lQR80TYoFw1E69W1HX9Byw_RWLVjbOc",

  // Куда переводить деньги за участки/этажи (пока нет Click/Payme)
  PAY_CARD: "[НОМЕР КАРТЫ]",
  PAY_CARD_OWNER: "[ИМЯ НА КАРТЕ]",
  // Куда присылать чек
  CONTACT_INSTAGRAM: "nanouzbek",

  // Цена одного этажа (сум):
  // в центре (до 1,5 км от сквера Амира Темура / Tashkent City) — PRICE_CENTER,
  // дальше цена падает вдвое каждые PRICE_HALF_KM километров, но не ниже PRICE_MIN.
  // Рядом с Чорсу, Хазрати Имамом, телебашней и Magic City — дороже на LANDMARK_BONUS.
  PRICE_CENTER: 299000,
  PRICE_HALF_KM: 2.5,
  PRICE_MIN: 15000,
  LANDMARK_BONUS: 1.2,

  // Сколько этажей нужно, чтобы здание было видно издалека
  TIER_DISTRICT: 15, // видно при приближении к району
  TIER_LEGEND: 50,   // видно всегда, даже на весь город
};
