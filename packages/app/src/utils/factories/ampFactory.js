/* eslint-disable no-underscore-dangle */
import React from 'react';
import { renderToString } from 'react-dom/server';
import sanitizeHtml from 'sanitize-html';
import {
  hasKey,
} from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
// eslint-disable-next-line no-restricted-imports
import Store from '@univision/fe-commons/dist/store/store';
import { getQueryString } from '@univision/fe-commons/dist/store/storeHelpers';

import { appConfig } from '../../config';
// https://github.com/ampproject/amphtml/blob/master/spec/amp-tag-addendum.md
import ampAllowedTags from './ampAllowedTags.json';

const ampFactory = {
  /**
   * Remove invalid properties from tags on the HTML
   * @param {string} originalContent Original HTML
   * @returns {string}
   */
  cleanInvalidPropertiesHtml(originalContent) {
    const properties = ['onclick', 'onmousedown', 'oldtitle'];
    const pattern = '="[^"]+"';
    return originalContent.replace(new RegExp(`(${properties.join(`${pattern}|`) + pattern})|${properties.join('|')}`, 'gi'), '');
  },

  /**
   * Removes invalid tags on the HTML
   * @param {string} originalContent Original HTML
   * @returns {string}
   */
  cleanHtml(originalContent) {
    const htmlWithoutInvalidProperties = this.cleanInvalidPropertiesHtml(originalContent);
    const html = htmlWithoutInvalidProperties.replace(/rel="canonical"/gi, 'rel="external"');

    return this.embedToAmp({ html }, -1);
  },

  /**
   * Returns true if the article chunk represents a RawHtml.
   * @param {Object} chunk Article chunk
   * @returns {*|boolean}
   */
  isRawHtml(chunk) {
    return hasKey(chunk, 'objectData.type') && chunk.objectData.type === 'rawhtml';
  },

  /**
   * Merges contiguous RawHtml to render a single amp-iframe.
   * @param {Array} bodyArray Article chunks
   * @returns {Array}
   */
  mergeRawHtmls(bodyArray) {
    let articleChunks = [];
    if (Array.isArray(bodyArray)) {
      let nextChunk;
      const self = this;
      articleChunks = bodyArray.slice(0, bodyArray.length);
      articleChunks.forEach((currentChunk, index) => {
        nextChunk = bodyArray[index + 1];
        if (self.isRawHtml(currentChunk) && self.isRawHtml(nextChunk)) {
          articleChunks[index].skip = true;
          nextChunk.objectData.html = `${currentChunk.objectData.html} ${
            nextChunk.objectData.html
          }`;
        }
      });
    }

    return articleChunks;
  },

  /**
   * Transform an RawHtml or ExternalContent to an AMP component
   * @param {Object} objectData RawHtml or ExternalContent data
   * @returns {*}
   */
  embedToAmp(objectData) {
    if (!objectData || (!objectData.html && !objectData._url)) {
      return null;
    }

    const intagramEmbedRegexp = /class="instagram-media"/i;
    const instagramRegexp = /https:\/\/www.instagram.com\/(p|reel)\/([\s\S]*?)\//i;

    const twitterEmbedRegexp = /class="twitter-tweet"/i;
    const twitterPostRegexp = /https:\/\/twitter.com\/(\w*)\/status\/(\w*)/i;

    const iframeSrcRegexp = /<iframe[\s\S]*?src="([\s\S]*?)"/i;
    const facebookUrlRegexp = /https:\/\/(www\.)?facebook.com\/(\w*)/i;
    const placeholder = <div placeholder="">{localization.get('loading')} ...</div>;

    let ampHtml = null;

    if (intagramEmbedRegexp.test(objectData.html)) {
      const match = instagramRegexp.exec(objectData._url);
      if (match) {
        ampHtml = (
          <amp-instagram
            data-shortcode={match[1]}
            data-default-framing
            width="1"
            height="1"
            layout="responsive"
          >
            {placeholder}
          </amp-instagram>
        );
      }
    } else if (
      twitterEmbedRegexp.test(objectData.html)
      || twitterPostRegexp.test(objectData._url)
    ) {
      // Twitter as HTML or external content
      const match = twitterPostRegexp.exec(objectData.html)
      || twitterPostRegexp.exec(objectData._url);
      if (match) {
        ampHtml = (
          <amp-twitter data-tweetid={match[2]} width="1" height="1" layout="responsive">
            {placeholder}
          </amp-twitter>
        );
      }
    } else if (facebookUrlRegexp.test(objectData._url)) {
      ampHtml = (
        <amp-facebook width="1" height="1" layout="responsive" data-href={objectData._url}>
          {placeholder}
        </amp-facebook>
      );
    } else if (iframeSrcRegexp.test(objectData.html)) {
      let href = iframeSrcRegexp.exec(objectData.html)[1];
      if (href.startsWith('http:')) {
        href = href.replace('http:', 'https:');
      }
      ampHtml = (
        <amp-iframe
          sandbox="allow-scripts allow-same-origin"
          height="1"
          width="1"
          layout="responsive"
          allowfullscreen=""
          frameborder="0"
          src={href}
        >
          {placeholder}
        </amp-iframe>
      );
    } else if (hasKey(objectData, 'lazyLoadUrl')) {
      const queryString = `&${getQueryString(Store)}`; // TODO: use selector
      const src = `${appConfig.api.endpoints.ampIframe}${
        objectData._url
      }?${queryString}`;
      ampHtml = (
        <amp-iframe
          sandbox="allow-scripts allow-same-origin allow-popups"
          height="1"
          width="1"
          layout="responsive"
          allowfullscreen=""
          frameborder="0"
          resizable=""
          src={src}
        >
          {placeholder}
          <div overflow="">{localization.get('readMore')}</div>
        </amp-iframe>
      );
    }

    if (ampHtml !== null) {
      ampHtml = renderToString(ampHtml);
    } else {
      // We don't know what kind of HTML comes from web-api,
      // we need to sanitize it.
      ampHtml = sanitizeHtml(objectData.html, {
        allowedTags: ampAllowedTags,
        allowedAttributes: false, // Allow any attribute
      });
    }

    return ampHtml;
  },
};

export default ampFactory;
