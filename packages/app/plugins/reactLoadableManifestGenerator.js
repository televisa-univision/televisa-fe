const chunkGroupNameExcluded = [
  'icons/',
];
const chunkGroupOriginExcluded = [
  '.',
  './requestNode',
  '../logging/serverLogger',
];

/**
 * Helper to override default react loadable plugin
 * https://github.com/vercel/next.js/blob/canary/packages/next/build/webpack/plugins/react-loadable-plugin.ts
 * to generate smaller manifest filtering:
 * - icons
 * - server chunks like requestNode and serverLogger
 * - commons chunk
 * - framework chunk
 * - empty ids
 * @param {Object} compiler - Webpack compiler conf
 * @param {Object} compilation - Webpack compilation result
 * @returns {{}}
 */
function buildManifest(compiler, compilation) {
  let manifest = {};

  compilation.chunkGroups.forEach((chunkGroup) => {
    const chunkGroupExcludeRegex = new RegExp(chunkGroupNameExcluded.join('|'));
    if (chunkGroup.isInitial() || chunkGroupExcludeRegex.test(chunkGroup.options.name)) {
      return;
    }

    chunkGroup.origins.forEach((chunkGroupOrigin) => {
      const { request } = chunkGroupOrigin;
      if (chunkGroupOriginExcluded.includes(request)) return;

      chunkGroup.chunks.forEach((chunk) => {
        chunk.files.forEach((file) => {
          // filtering commons and framework: this chunks are added by next
          // on the server independently of dynamic so no need to have them here
          if (file.match(/(commons|framework)\./)
            || !(
              (file.endsWith('.js') || file.endsWith('.css'))
              && file.match(/^static\/(chunks|css)\//)
            )
          ) {
            return;
          }
          // eslint-disable-next-line no-restricted-syntax
          for (const module of chunk.modulesIterable) {
            const { id } = module;

            if (!manifest[request]) {
              manifest[request] = [];
            }

            // remove empty module ids
            if (!id
              || manifest[request].some((item) => {
                return item.id === id && item.file === file;
              })
            ) {
              // eslint-disable-next-line
              continue;
            }

            manifest[request].push({
              id,
              file,
            });
          }
        });
      });
    });
  });

  manifest = Object.keys(manifest)
    .sort()
    // eslint-disable-next-line
    .reduce((a, c) => ((a[c] = manifest[c]), a), {})

  return manifest;
}

/**
 * Hook for webpack plugin
 */
class ReactLoadableManifestGenerator {
  /**
   * Class constructor
   * @param {Object} opts - Plugin options
   * @param {string} opts.fileName - Generated json file name
   * @param {regex} opts.chunksName - Regex to allow filtering
   * chunk only use for SSR, so naming convention is needed to
   * map those for example: /ssr-cpm/ for webpackChunkName: "liveblog-lazy-ssr-cpm"
   */
  constructor(opts) {
    this.fileName = opts.fileName;
  }

  /**
   * Webpack plugin boilerplate
   * @param {Object} compiler - Webpack compiler
   */
  apply(compiler) {
    compiler.hooks.emit.tap('ReactLoadableManifest', (compilation) => {
      const manifest = buildManifest(compiler, compilation);
      const json = JSON.stringify(manifest, null, 0);
      // eslint-disable-next-line
      compilation.assets[this.fileName] = {
        source() {
          return json;
        },
        size() {
          return json.length;
        },
      };

      return compilation.assets;
    });
  }
}

module.exports = ReactLoadableManifestGenerator;
