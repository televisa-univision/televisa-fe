// eslint-disable require-jsdoc
import { Head } from 'next/document';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import {
  getCssElements,
  dedupeBunbles,
} from '../../../utils/server/renderUtils';

/**
 * Custom head for _document Univision WebApp sites
 * @extends {@link next/document/Head}
 */
class DocumentHead extends Head {
  /**
   * Includes additional styles for ssr like css modules
   * overriding: https://github.com/vercel/next.js/blob/canary/packages/next/pages/_document.tsx#L160
   * @param {Object} files - Built files
   * @returns {Object}
   */
  getCssLinks(files) {
    const {
      assetPrefix,
      devOnlyCacheBusterQueryString,
      dynamicImports,
      __NEXT_DATA__,
    } = this.context;
    const { allFiles } = files;
    const { nonce, crossOrigin } = this.props;
    const cssFiles = isValidArray(allFiles) ? allFiles.filter(f => /\.css$/.test(f)) : [];
    const sharedFiles = new Set(files.sharedFiles);
    // Adding css files of dynamic modules found on initial render
    if (isValidArray(dynamicImports)) {
      let dynamicCssFiles = dedupeBunbles(
        dynamicImports.filter(f => f.file.endsWith('.css')),
      ).map(f => f.file);
      if (dynamicCssFiles.length) {
        const existing = new Set(cssFiles);
        dynamicCssFiles = dynamicCssFiles.filter(
          f => !(existing.has(f) || sharedFiles.has(f)),
        );
        cssFiles.push(...dynamicCssFiles);
      }
    }

    // make sure app.global.css is imported/included before the rest
    const sortedCss = cssFiles.sort((a, b) => b.indexOf('_app'));
    const enhancedHeader = getKey(__NEXT_DATA__, 'props.pageProps.initialState.page.enhancedHeader', false);

    return getCssElements(sortedCss, {
      assetPrefix,
      devOnlyCacheBusterQueryString,
      nonce,
      crossOrigin,
      enhancedHeader,
    });
  }

  /**
   * Overriding main class to void preload on dynamic chunks
   * https://github.com/vercel/next.js/blob/canary/packages/next/pages/_document.tsx#L215
   * @returns {null}
   */
  // eslint-disable-next-line class-methods-use-this, require-jsdoc
  getPreloadDynamicChunks() {
    return null;
  }

  /**
   * Overriding main class to void preload on main chunks
   * https://github.com/vercel/next.js/blob/e8c3190255e8023fd44a2b1518724cfbb38a3de9/packages/next/pages/_document.tsx#L166
   * @returns {null}
   */
  // eslint-disable-next-line class-methods-use-this, require-jsdoc
  getPreloadMainLinks() {
    return null;
  }
}

export default DocumentHead;
