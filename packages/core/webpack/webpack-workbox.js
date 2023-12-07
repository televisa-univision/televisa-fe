import { InjectManifest } from 'workbox-webpack-plugin';

export default {
  injectManifestPlugin: (swSrc) => {
    const include = [];

    // Add the globalWidgets and enhancements
    // cache the rest of common chunks on user regular cache
    include.push(...[
      /globalWidgets/,
      /sportsWidgets/,
      /fmgVideoSdk/,
      /promotable/,
      /liveblogLead/,
      /articleEnhancements/,
      /slideshowWrapper/,
    ]);
    return new InjectManifest({
      swSrc,
      swDest: './service-worker.js',
      include,
    });
  },
};
