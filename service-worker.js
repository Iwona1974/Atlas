const CACHE='atlas-native-media-final';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
// Celowo bez obsługi fetch: audio i wideo trafiają bezpośrednio do serwera,
// dzięki czemu przeglądarka może używać żądań Range potrzebnych do przewijania.
