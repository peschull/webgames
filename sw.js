const CACHE_NAME = 'suendenbock-v1.0.0';
const urlsToCache = [
  './',
  'index.html',
  'style.css',
  'animations.css',
  'script.js',
  'questions.json',
  'manifest.json',
  'assets/fig_suendenbock.svg',
  'assets/fig_klimakleber.svg',
  'assets/fig_milliardaer.svg',
  'assets/fig_fluechtling.svg',
  'assets/fig_konzernchef.svg',
  'assets/fig_gewerkschafterin.svg',
  'assets/fig_pensionistin.svg',
  'assets/icon_richtig.svg',
  'assets/icon_falsch.svg',
  'assets/icon_fakten.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});
