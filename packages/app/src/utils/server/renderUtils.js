import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { AppRegistry } from 'react-native-web';
import { ServerStyleSheet } from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import consoleLogger from '@univision/fe-utilities/utils/consola';

const PATH_REGEX = /^.*[\\/]/;
const LAYER_PATH = '/opt/css';

/**
 * Build css href link to get the external css resource
 * @private
 * @param {string} assetPrefix to build the path
 * @param {string} file css resource name
 * @param {string} _devOnlyInvalidateCacheQueryString invalidator string
 * @returns {string}
 */
function buildCssHrefLink(assetPrefix, file, _devOnlyInvalidateCacheQueryString) {
  return `${assetPrefix}/_next/${encodeURI(file)}${_devOnlyInvalidateCacheQueryString}`;
}

/**
 * Returns the css content from the file passed
 * @public
 * @param {string} file name for the css file
 * @returns {string}
 */
export function getCssContent(file) {
  try {
    return readFileSync(join(LAYER_PATH, file.replace(PATH_REGEX, '')), 'utf-8');
  } catch (error) {
    consoleLogger.error(`[nextjs]: error reading file ${file}, ${error}`);

    return '';
  }
}

/**
 * Returns link elements generated from the file passed as prop
 * @public
 * @param {Object} options passed to build link element
 * @returns {Array}
 */
export function getLinkElements({
  crossOrigin,
  file,
  assetPrefix,
  devOnlyCacheBusterQueryString,
  nonce,
}) {
  return [
    <link
      key={`${file}-preload`}
      nonce={nonce}
      rel="preload"
      href={`${buildCssHrefLink(assetPrefix, file, devOnlyCacheBusterQueryString)}`}
      as="style"
      crossOrigin={crossOrigin || process.crossOrigin}
    />,
    <link
      key={file}
      nonce={nonce}
      rel="stylesheet"
      href={`${buildCssHrefLink(assetPrefix, file, devOnlyCacheBusterQueryString)}`}
      crossOrigin={crossOrigin || process.crossOrigin}
    />,
  ];
}

/**
 * Get css style/link elements for the page
 * @public
 * @param {Array} cssFiles css assets
 * @param {Object} options used for configure the styles
 * @returns {Array}
 */
export function getCssElements(cssFiles, {
  assetPrefix,
  devOnlyCacheBusterQueryString,
  nonce,
  crossOrigin,
  enhancedHeader,
}) {
  if (!isValidArray(cssFiles)) return null;

  const cssElements = [];
  // avoid inline css locally and for other pages like robots and archivo
  if (process.env.SERVERLESS && enhancedHeader) {
    cssFiles.forEach((file) => {
      // read css file from layer
      const cssContent = getCssContent(file);

      if (cssContent) {
        cssElements.push(
          <style
            key={file}
            nonce={nonce}
            data-href={`${buildCssHrefLink(assetPrefix, file, devOnlyCacheBusterQueryString)}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: cssContent,
            }}
          />,
        );
      } else {
        // use link with css stored in the bucket
        cssElements.push(
          ...getLinkElements({
            file, assetPrefix, devOnlyCacheBusterQueryString, nonce, crossOrigin,
          }),
        );
      }
    });
  } else {
    cssFiles.forEach((file) => {
      cssElements.push(
        ...getLinkElements({
          file, assetPrefix, devOnlyCacheBusterQueryString, nonce, crossOrigin,
        }),
      );
    });
  }

  return cssElements;
}

/**
 * Collect react-native-web SSR css styles
 * @public
 * @param {Node} MainComponent - react/next.js entry app component.
 * @param {Object} ctx - context from next.js document
 * @returns {Node} react node style element with inline css styles
 */
export function getCssReactNativeWeb(MainComponent) {
  const appName = 'WebApp';
  // Register the app on react-native-web
  AppRegistry.registerComponent(appName, () => MainComponent);

  const { getStyleElement } = AppRegistry.getApplication(appName);
  // to collect styles before first render
  return getStyleElement();
}

/**
 * Collect styled-components SSR css styles
 * @public
 * @param {Node} DocumentComponent - next.js page document component for
 * get initial props with enhanced app/context.
 * with 'renderPage' callback to get App/Page and collect styles.
 * @param {Object} ctx - context from next.js document
 * @returns {{initialPropsEnhanced: Object, styledComponentsStyles: Node}}
 * initialProps enhanced with collect styled and react node style element
 * with inline css styles collected.
 */
export async function getCssStyledComponents(DocumentComponent, ctx) {
  const sheet = new ServerStyleSheet();
  let styledComponentsCss;
  let initialPropsEnhanced;
  try {
    const originalRenderPage = ctx.renderPage;

    // extend renderPage to add enhanceApp and collect page styles
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
    });
    // get Document/Page props with enhanced content
    initialPropsEnhanced = await DocumentComponent.getInitialProps(ctx);
    styledComponentsCss = sheet.getStyleElement();
  } finally {
    sheet.seal();
  }
  return { initialPropsEnhanced, styledComponentsCss };
}

/**
 * Helper to remove duplicated bundles based on:
 * https://github.com/vercel/next.js/blob/canary/packages/next/pages/_document.tsx#L28
 * @param {array} bundles - Bundles list
 * @returns {array}
 */
export function dedupeBunbles(bundles) {
  const files = new Set();
  const kept = [];
  if (isValidArray(bundles)) {
    for (let i = 0; i < bundles.length; i += 1) {
      const bundle = bundles[i];
      if (!files.has(bundle.file)) {
        files.add(bundle.file);
        kept.push(bundle);
      }
    }
  }
  return kept;
}

/**
 * Extracts the pageState value from __NEXT_DATA__ props.
 * We will ideally get it from pageProps.initialState node, but
 * some pages will send it directly to pageProps
 * @param {Object} nextData - __NEXT_DATA__ value
 * @returns {Object}
 */
export function getPageStateFromNextData(nextData) {
  if (!isValidObject(nextData)) {
    return {};
  }

  const nextDataPageProps = nextData?.props?.pageProps || {};

  return nextDataPageProps?.initialState?.page
    || nextDataPageProps?.page
    || {};
}
