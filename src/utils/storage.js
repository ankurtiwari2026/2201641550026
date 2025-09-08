import { nanoid } from "nanoid";

const KEY = "shortly_urls";

function normalizeUrl(url) {
  if (!/^https?:\/\//i.test(url)) return "http://" + url;
  return url;
}

export function loadUrls() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
export function saveUrls(urls) {
  localStorage.setItem(KEY, JSON.stringify(urls));
}

export function createShort(originalUrl, alias) {
  const url = normalizeUrl(originalUrl);
  const urls = loadUrls();
  let code = alias ? alias.trim() : nanoid(7);

  // uniqueness check
  if (urls.some((u) => u.code === code)) {
    if (alias) throw new Error("Alias already taken");
    do {
      code = nanoid(7);
    } while (urls.some((u) => u.code === code));
  }

  const base = window.location.origin + window.location.pathname + "#/s/";
  const item = {
    id: Date.now(),
    code,
    originalUrl: url,
    createdAt: new Date().toISOString(),
    clicks: 0,
    visits: [], // { ts, referrer, ua }
    shortUrl: base + code,
  };
  urls.unshift(item);
  saveUrls(urls);
  return item;
}

export function findByCode(code) {
  return loadUrls().find((u) => u.code === code);
}

export function recordVisit(code) {
  const urls = loadUrls();
  const idx = urls.findIndex((u) => u.code === code);
  if (idx === -1) return null;
  const item = urls[idx];
  item.clicks = (item.clicks || 0) + 1;
  item.visits = item.visits || [];
  item.visits.push({
    ts: new Date().toISOString(),
    referrer: document.referrer || null,
    ua: navigator.userAgent,
  });
  urls[idx] = item;
  saveUrls(urls);
  return item;
}

export function deleteShort(id) {
  const urls = loadUrls().filter((u) => u.id !== id);
  saveUrls(urls);
}
export function clearAll() {
  localStorage.removeItem(KEY);
}