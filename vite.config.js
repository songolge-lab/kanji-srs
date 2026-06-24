import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      manifest: {
        name: 'Stacks',
        short_name: 'Stacks',
        description: 'Kişisel kelime ve kanji flashcard / aralıklı tekrar uygulaması',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#f3eee2',
        theme_color: '#1c1a17',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        navigateFallback: 'index.html',
        // kuromoji sözlüğü ~17MB — precache yerine ilk kullanımda cache'le.
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
        runtimeCaching: [
          {
            // Offline furigana parser sözlük dosyaları (değişmez → CacheFirst)
            urlPattern: /\/dict\/.*\.dat\.gz$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'kuromoji-dict',
              expiration: { maxEntries: 20 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: { cacheName: 'pages' },
          },
          {
            urlPattern: /\.(js|css|png|jpg|svg|ico|woff2?)$/,
            handler: 'NetworkFirst',
            options: { cacheName: 'assets' },
          },
        ],
      },
    }),
  ],
});
