const CACHE='atlas-mobile-final-2';
const CORE=['manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).catch(()=>{}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);
 const fresh=e.request.mode==='navigate'||u.pathname.includes('/assets/')||u.pathname.endsWith('.html')||u.pathname.endsWith('.js')||u.pathname.endsWith('.css')||e.request.headers.has('range');
 if(fresh){e.respondWith(fetch(e.request,{cache:'no-store'}));return;}
 e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
