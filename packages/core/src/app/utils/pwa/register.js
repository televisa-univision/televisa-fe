/* eslint-disable no-console */
import Features from '@univision/fe-commons/dist/config/features';
import { prefetchContent } from '../helpers/helpers';

/**
 * Register and setup a service worker
 */
export default async function register() {
  if (!global.window) {
    return;
  }
  global.window.addEventListener('load', () => {
    prefetchContent();
  });
  if (Features.pwa.shouldRegisterSW() && 'serviceWorker' in global.navigator) {
    const { Workbox } = await import(/* webpackChunkName: "workboxWindow" */ 'workbox-window');

    const swConfig = {
      file: 'service-worker',
      scope: '/',
    };
    const wb = new Workbox(`/${swConfig.file}.js?v=${process.env.BUILD_TIME}`, {
      scope: swConfig.scope,
    });

    wb.register()
      .catch((error) => {
        console.error('Error during service worker registration: ', error);
      });

    wb.addEventListener('installed', (event) => {
      if (!event.isUpdate) {
        console.log('A new service worker has installed (for the first time).');
      } else {
        console.log('A new service worker has installed (updating a previous one).');
      }
    });
  }
}
