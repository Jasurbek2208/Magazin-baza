/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope & { __WB_MANIFEST: any }

import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, createHandlerBoundToURL, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

// Force activation of new service worker
self?.addEventListener('install', () => self?.skipWaiting())
clientsClaim()

const isLoginRoute: boolean = self?.location?.pathname === '/login'

if (!isLoginRoute) {
  // Precache files from manifest (injected by VitePWA)
  precacheAndRoute(self.__WB_MANIFEST)
  cleanupOutdatedCaches()

  // Processing navigation requests for SPA (we return index.html)
  const handler = createHandlerBoundToURL('/index.html')
  const navigationRoute = new NavigationRoute(handler)
  registerRoute(navigationRoute)

  // Cache strategies for different resource types
  const VERSION: number = Number(import.meta.env.VITE_SW_BASE_CAHE_VERSION || 1)
  const CACHE_NAMES = {
    ASSETS: `magazin-baza-uz-static-assets-cache-v${VERSION}`,
    IMAGES: `magazin-baza-uz-images-cache-v${VERSION}`,
    ICONIFY_API: `magazin-baza-uz-iconify-api-cache-v${Number(import.meta.env.VITE_SW_ICONIFY_API_CAHE_VERSION || 1)}`,
    FONT: `magazin-baza-uz-font-cache-v${VERSION}`,
    API: `magazin-baza-uz-api-cache-v${VERSION}`,
    NAVIGATION: `magazin-baza-uz-navigation-cache-v${VERSION}`,
    LOCALE_LANGUAGES: `magazin-baza-uz-locale-languages-cache-v${VERSION}`,
  }

  // Register cache strategies
  registerRoute(
    ({ request }) => ['script', 'style', 'document']?.includes(request.destination),
    new StaleWhileRevalidate({
      cacheName: CACHE_NAMES?.ASSETS,
      plugins: [new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 3 })], // 3 days
    }),
  )

  // Caching images with cache-first strategy
  registerRoute(
    ({ request }) => request?.destination === 'image',
    new CacheFirst({
      cacheName: CACHE_NAMES?.IMAGES,
      plugins: [new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 10 })], // 10 days
    }),
  )

  // Iconify API requests - CacheFirst
  registerRoute(
    ({ url }) => ['api.iconify.design', 'api.simplesvg.com', 'api.unisvg.com']?.some((domain: string) => url?.origin?.includes(domain)),
    new CacheFirst({
      cacheName: CACHE_NAMES?.ICONIFY_API,
      plugins: [new ExpirationPlugin({ maxEntries: 400, maxAgeSeconds: 60 * 60 * 24 * 30 * 2 })], // 2 month
    }),
  )

  // Font caching
  registerRoute(
    /\.(?:woff|woff2|ttf|eot)$/i,
    new CacheFirst({
      cacheName: CACHE_NAMES?.FONT,
      plugins: [new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 * 2 })], // 2 month
    }),
  )

  // API caching (example)
  registerRoute(
    ({ url }) => url?.href?.startsWith('https://api.flakon.uz/api/'),
    new NetworkFirst({
      cacheName: CACHE_NAMES?.API,
      plugins: [new ExpirationPlugin({ maxEntries: 5, maxAgeSeconds: 60 })], // 1 minute cache
    }),
  )

  // Locale Languages caching
  registerRoute(
    ({ url, request }) =>
      url?.origin === 'https://magazin-baza-uz' &&
      url?.pathname?.includes('/src/Locale/') &&
      ['En', 'Ru', 'Uz']?.includes(url?.pathname?.split('/src/Locale/')[1]?.split('/')[0]) &&
      request?.destination === 'script',
    new CacheFirst({
      cacheName: CACHE_NAMES?.LOCALE_LANGUAGES,
      plugins: [new ExpirationPlugin({ maxEntries: 600, maxAgeSeconds: 60 * 60 * 24 * 10 })], // 10 days
    }),
  )

  // Caching strategy for navigation queries
  registerRoute(
    ({ request }) => request?.mode === 'navigate',
    new NetworkFirst({
      cacheName: CACHE_NAMES?.NAVIGATION,
      plugins: [new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 })], // 1 day
    }),
  )

  // Cleanup old caches
  async function cleanupOldCaches(): Promise<void> {
    const cacheNames: string[] = await caches?.keys()
    const expectedCaches: string[] = Object.values(CACHE_NAMES)
    await Promise.all(cacheNames?.filter((name) => name?.startsWith('magazin-baza-uz-') && !expectedCaches?.includes(name))?.map((name) => caches?.delete(name)))
  }

  // Activate event - claim clients and cleanup
  self?.addEventListener('activate', (event) =>
    event?.waitUntil(
      Promise.all([
        self?.clients?.claim(),
        cleanupOutdatedCaches(), // Remove outdated Workbox caches
        cleanupOldCaches(), // Explicitly delete caches not matching the current version
      ]),
    ),
  )

  // Message handling for updates
  self?.addEventListener('message', (event) => {
    if (event?.data && event?.data?.type === 'SKIP_WAITING') {
      self?.skipWaiting()?.then(() => self?.clients?.matchAll()?.then((clients) => clients?.forEach((client) => client?.postMessage({ type: 'RELOAD_APP' }))))
    }
  })
}