// Service Worker — Calculadora ICMS Frete ANTT 2026
// Resolve ANTT Nº 6.076/2026 — Elaborado por Wilson Shibata

const CACHE = 'icms-frete-v1';
const ASSETS = [
  './CALCULADORA_ICMS.html',
  './manifest.json',
  './icon.svg'
];

// Instala e faz cache dos arquivos na primeira carga
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Ativa e remove caches antigos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Serve do cache — funciona 100% offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => cached))
  );
});
