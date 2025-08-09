import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import legacy from '@vitejs/plugin-legacy'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import viteCompression from 'vite-plugin-compression'
import { resolve } from 'path'

const isProduction = process.env.VITE_NODE_ENV === 'production'

export default defineConfig({
  base: '/',
  server: { port: 2208, host: true },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: isProduction ? false : 'inline',
    cssCodeSplit: true,
    reportCompressedSize: false,
    minify: 'terser',
    target: 'esnext',
    manifest: true,
    chunkSizeWarningLimit: 2048,
    terserOptions: { compress: { drop_console: isProduction, drop_debugger: isProduction }, format: { comments: false }, module: true },
    commonjsOptions: { ignoreDynamicRequires: true },
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html') },
      output: {
        manualChunks(id: string) {
          // Vendor chunking
          if (id.includes('node_modules')) {
            const packageName: string = id.split('node_modules/')[1].split('/')[0]
            return `vendor/${packageName.replace('@', '')}`
          }

          // Project directory chunking
          // if (id.includes('src/') && !id.includes('service/axios') && !id.includes('api/') && !id.includes('components/Tools')) {
          //   const pathSegments: string[] = id.split('src/')[1].split('/')
          //   const isFile: boolean = pathSegments[pathSegments.length - 1].includes('.')
          //   const directories: string[] = isFile ? pathSegments.slice(0, -1) : pathSegments
          //   return directories.slice(0, 2).join('_')
          // }
        },
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
        entryFileNames: 'entries/[name]-[hash].js',
      },
    },
    assetsInlineLimit: 4096,
  },
  publicDir: 'public',
  plugins: [
    tailwindcss(),
    react({ jsxImportSource: '@emotion/react' }),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      useCredentials: true,
      filename: 'sw.ts',
      injectRegister: false,
      includeAssets: ['logo.png', 'logo2.png', 'robots.txt'],
      injectManifest: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
        dontCacheBustURLsMatching: /\.(webp|png|jpg|svg|woff2|css|js)$/,
      },
      manifest: {
        short_name: 'Magazin Baza',
        name: 'Magazin Baza - Management System',
        description: 'Magazin Baza is a Management System for Flakon.uz site.',
        id: 'magazin-baza',
        start_url: '.',
        background_color: '#ffffff',
        display_override: ['standalone', 'minimal-ui'],
        display: 'standalone',
        scope: '/',
        theme_color: '#0284C7',
        icons: [
          { src: 'logo2.png', sizes: '16x16', type: 'image/png', purpose: 'any maskable' },
          { src: 'logo2.png', sizes: '24x24', type: 'image/png', purpose: 'any maskable' },
          { src: 'logo2.png', sizes: '32x32', type: 'image/png', purpose: 'any maskable' },
          { src: 'logo2.png', sizes: '64x64', type: 'image/png', purpose: 'any maskable' },
          { src: 'logo2.png', type: 'image/png', sizes: '72x72', purpose: 'any maskable' },
          { src: 'logo2.png', type: 'image/png', sizes: '96x96', purpose: 'any maskable' },
          { src: 'logo2.png', type: 'image/png', sizes: '128x128', purpose: 'any maskable' },
          { src: 'logo2.png', type: 'image/png', sizes: '144x144', purpose: 'any maskable' },
          { src: 'logo2.png', type: 'image/png', sizes: '152x152', purpose: 'any maskable' },
          { src: 'logo2.png', type: 'image/png', sizes: '192x192', purpose: 'any maskable' },
          { src: 'logo2.png', type: 'image/png', sizes: '384x384', purpose: 'any maskable' },
          { src: 'logo2.png', type: 'image/png', sizes: '512x512', purpose: 'any maskable' },
        ],
        shortcuts: [
          {
            name: 'Profile settings',
            short_name: 'Profile settings',
            description: 'Go to Profile settings',
            url: '/user/settings',
            icons: [
              { src: 'userSettings.svg', sizes: '16x16' },
              { src: 'userSettings.svg', sizes: '24x24' },
              { src: 'userSettings.svg', sizes: '32x32' },
              { src: 'userSettings.svg', sizes: '64x64' },
              { src: 'userSettings.svg', sizes: '72x72' },
              { src: 'userSettings.svg', sizes: '96x96' },
              { src: 'userSettings.svg', sizes: '128x128' },
              { src: 'userSettings.svg', sizes: '144x144' },
              { src: 'userSettings.svg', sizes: '152x152' },
              { src: 'userSettings.svg', sizes: '192x192' },
              { src: 'userSettings.svg', sizes: '384x384' },
              { src: 'userSettings.svg', sizes: '512x512' },
            ],
          },
          {
            name: 'Product Add',
            short_name: 'Product Add',
            description: 'Product add page',
            url: '/products/add',
            icons: [
              { src: 'plus.svg', sizes: '64x64 32x32 24x24 16x16' },
              { src: 'plus.svg', sizes: '72x72' },
              { src: 'plus.svg', sizes: '96x96' },
              { src: 'plus.svg', sizes: '128x128' },
              { src: 'plus.svg', sizes: '144x144' },
              { src: 'plus.svg', sizes: '152x152' },
              { src: 'plus.svg', sizes: '192x192' },
              { src: 'plus.svg', sizes: '384x384' },
              { src: 'plus.svg', sizes: '512x512' },
            ],
          },
        ],
        prefer_related_applications: false,
        related_applications: [{ platform: 'webapp', url: 'https://magazin-baza.uz/manifest.json', id: 'magazin-baza' }],
        dir: 'ltr',
        lang: 'en',
      },
    }),
    tsconfigPaths(),
    legacy({ targets: ['defaults', 'not IE 11'], modernPolyfills: true, renderLegacyChunks: true, polyfills: ['es.promise.finally', 'es/map', 'es/set'] }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br', threshold: 1024 }),
  ],
  optimizeDeps: {
    entries: ['index.html'],
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@emotion/react',
      'axios',
      '@reduxjs/toolkit',
      'react-hot-toast',
      'react-redux',
      'tailwind-merge',
      'react-select',
      'react-select-async-paginate',
      'i18next',
      'react-i18next',
    ],
    exclude: [],
    esbuildOptions: { target: 'esnext', supported: { 'top-level-await': true } },
  },
  esbuild: { jsxInject: `import React from 'react';`, loader: 'tsx' },
  json: { stringify: true },
  define: { global: 'window', 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) },
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
})