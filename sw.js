/* SOS StaySafe service worker: lets pages that were opened before work without internet.
   Kept on the device: the pages, site.css, site.js, assistant.json and the small images (about 1 MB).
   Never kept: videos, animated GIFs, anything from another website (SOS SpeakUp, Genially),
   and anything typed into the site. Nothing is sent anywhere.
   When any file changes, change VERSION (also in build_v2.py) so phones fetch the new files. */
const VERSION = '2026-11-25';
const CACHE = 'staysafe-' + VERSION;
const PRECACHE = [
    "./",
    "index.html",
    "your-rights.html",
    "preventing-abuse.html",
    "reporting-abuse.html",
    "cyber-safeguarding.html",
    "fairness-integrity.html",
    "privacy-policy.html",
    "offline.html",
    "site.css?v=2026-11-25",
    "site.js?v=2026-11-25",
    "assistant.json",
    "manifest.webmanifest",
    "Images/abuse-type-emotional.jpg",
    "Images/abuse-type-financial.jpg",
    "Images/abuse-type-neglect.jpg",
    "Images/abuse-type-physical.jpg",
    "Images/abuse-type-privacy-violations.jpg",
    "Images/abuse-type-sexual.jpg",
    "Images/apple-touch-icon.png",
    "Images/favicon.png",
    "Images/header-background.jpg",
    "Images/home-preventing-abuse-background.jpg",
    "Images/home-reporting-abuse-background.jpg",
    "Images/home-your-rights-background.jpg",
    "Images/icon-192.png",
    "Images/icon-512.png",
    "Images/icon-maskable-512.png",
    "Images/report-concern-banner.jpg",
    "Images/sos-logo-blue.png",
    "Images/sos-logo-white.png"
];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE).then(function (cache) { return cache.addAll(PRECACHE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.startsWith('staysafe-') && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (event) {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;   // SpeakUp, Genially and all other sites: straight to the network
  if (request.mode === 'navigate') {
    // Pages: newest version from the network; without internet, the saved copy or the offline page.
    event.respondWith(fetch(request).then(function (response) {
      if (response.ok && PRECACHE.indexOf(url.pathname.split('/').pop() || './') > -1) {
        const copy = response.clone();
        caches.open(CACHE).then(function (cache) { cache.put(url.pathname, copy); });
      }
      return response;
    }).catch(function () {
      return caches.match(url.pathname, { cacheName: CACHE }).then(function (saved) { return saved || caches.match('offline.html', { cacheName: CACHE }); });
    }));
    return;
  }
  // Styles, script, assistant answers and small images: the saved copy. Videos and GIFs are not saved.
  event.respondWith(caches.match(request, { cacheName: CACHE }).then(function (saved) { return saved || fetch(request); }));
});
