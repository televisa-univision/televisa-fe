/* eslint-disable no-undef, no-underscore-dangle, no-restricted-globals */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');

workbox.core.skipWaiting();
workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
workbox.precaching.cleanupOutdatedCaches();

const cacheSettings = {
  // Cache for the HTML pages
  runtime: {
    name: 'runtime-cache',
    maxEntries: 50,
    maxAge: {
      seconds: 30 * 60, // 30 minutes
    },
    purgeOnQuotaError: true,
  },
  webApi: {
    name: 'web-api-cache',
    maxEntries: 50,
    maxAge: {
      seconds: 30 * 60, // 30 minutes
    },
    purgeOnQuotaError: true,
  },
  webAppState: {
    name: 'web-app-state',
    maxEntries: 50,
    maxAge: {
      seconds: 30 * 60, // 30 minutes
    },
    purgeOnQuotaError: true,
  },
};

/**
 *  Creates a Workbox plugin that expires cache entries
 *  after a given number of days
 *  @param {int} maxEntries - max entries to cache
 *  @param {Object} maxAge - max age settings
 *  @param {number} maxAge.days - max days
 *  @param {number} maxAge.seconds - max seconds
 *  @returns {function}
 */
const timeoutPlugin = (maxEntries, { days, seconds }) => {
  return new workbox.expiration.Plugin({
    maxEntries,
    maxAgeSeconds: seconds || (days * 24 * 60 * 60),
  });
};

// Radio content
const radioContentRegex = /\/radio/;
// web-api
const webApiRegex = new RegExp('.+/web-api');
// web-app-state
const webAppStateRegex = new RegExp('/proxy/api/cached/web-app-state');

// web-app-state cache for SPA
workbox.routing.registerRoute(
  new RegExp(webAppStateRegex),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: cacheSettings.webAppState.name,
    plugins: [
      timeoutPlugin(cacheSettings.webAppState.maxEntries, cacheSettings.webAppState.maxAge),
    ],
  })
);

// web-api cache for SPA
workbox.routing.registerRoute(
  new RegExp(webApiRegex),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: cacheSettings.webApi.name,
    plugins: [
      timeoutPlugin(cacheSettings.webApi.maxEntries, cacheSettings.webApi.maxAge),
    ],
  })
);

// Radio content
workbox.routing.registerRoute(
  new RegExp(radioContentRegex),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: `${cacheSettings.runtime.name}-radio`,
    plugins: [
      timeoutPlugin(cacheSettings.runtime.maxEntries, cacheSettings.runtime.maxAge),
    ],
  })
);
