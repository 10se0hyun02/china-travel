import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // GitHub Pages 서브경로 배포 (https://10se0hyun02.github.io/china-travel/)
  base: '/china-travel/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // 명세서 5번: App Shell + 지도/바우처 webp까지 전부 프리캐싱 (Zero-Data)
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,webp}'],
        // 고덕지도 캡처 이미지가 클 수 있어 프리캐시 한도 상향
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
      manifest: {
        name: 'SHANGHAI TRAVEL',
        short_name: 'SHANGHAI',
        description: '오프라인에서도 완벽 구동되는 커플 여행 가이드',
        lang: 'ko',
        display: 'standalone',
        theme_color: '#fb7185',
        background_color: '#fff1f2',
        icons: [
          { src: 'icons/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
});
