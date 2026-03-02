const CACHE_NAME = 'in-out-cache-v2'; // Incrementa v1 in v2 quando fai modifiche grosse

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Forza l'installazione immediata
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // Prende il controllo delle pagine immediatamente
});

self.addEventListener('fetch', (event) => {
  // Strategia: Network First (prova il server, se fallisce usa la cache)
  // Ottimo per app finanziarie dove i dati devono essere freschi
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
