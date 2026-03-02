// public/sw.js

const CACHE_NAME = 'in-out-cache-v1.1.8'; // <--- Cambia questo

self.addEventListener('install', (event) => {
  // Forza il Service Worker appena scaricato a diventare attivo subito
  self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
  // Elimina le vecchie cache per liberare spazio
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Cancellazione vecchia cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});
