import React from 'react';
import Document, {
  Html,
  Main,
  NextScript,
} from 'next/document';

import seoTags from '@univision/fe-commons/dist/utils/seo/seoTags';

import DocumentHead from '../components/base/DocumentHead';
import {
  getCssReactNativeWeb,
  getCssStyledComponents,
  getPageStateFromNextData,
} from '../utils/server/renderUtils';

/**
 * Custom document for Webapp Univision sites
 * to inject custom styles or scripts
 */
class WebAppDocument extends Document {
  /**
   * Collect additional styles or custom bahavior in the document in SSR
   * @param {Object} ctx - context object from next.js with one addition:
   * renderPage: {function} - a callback that executes the actual
   * React rendering logic (synchronously).
   * @returns {Object}
   */
  static async getInitialProps(ctx) {
    const {
      initialPropsEnhanced: initialProps,
      styledComponentsCss,
    } = await getCssStyledComponents(Document, ctx);
    const reactNativeWebCss = getCssReactNativeWeb(Main);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {reactNativeWebCss}
          {styledComponentsCss}
        </>
      ),
    };
  }

  /**
   * Gets html lang attribute value
   * @returns {string}
   */
  getLangAttribute() {
    return seoTags.htmlLang(
      // eslint-disable-next-line no-underscore-dangle
      getPageStateFromNextData(this.props.__NEXT_DATA__),
    );
  }

  /**
   * Next.js document
   * @returns {JSX}
   */
  render() {
    return (
      <Html lang={this.getLangAttribute()}>
        <DocumentHead />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default WebAppDocument;
