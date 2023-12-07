import React from 'react';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import toAbsoluteUrl from '@univision/fe-utilities/helpers/url/toAbsoluteUrl';
import toRelativeUrl from '@univision/fe-utilities/helpers/url/toRelativeUrl';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import isValidString from '@univision/fe-utilities/helpers/common/isValidString';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import { ES } from '@univision/fe-utilities/localization/languages';

import univisionLogo from '../../assets/images/univisionlogo.jpg';
import tudnLogo from '../../assets/images/tudnlogo.png';
import modifierTags from './modifierTags';
import conf from './metaTagsConf.json';

/**
 * Helper for seo html tags and metadata process
 */
const seoTags = {
  /**
   * Gets og:image meta tag with the correspoding url
   * @param {bool} hasValidOgImage if the og:image is valid
   * @param {Object} options provided to the helper
   * @param {Object} option.data page state data
   * @param {Object} option.isTudn site
   * @returns {JSX}
   */
  getOpenGraphImage(hasValidOgImage, { data, isTudn = false }) {
    let ogImageUrl = isTudn ? tudnLogo : univisionLogo;
    if (hasValidOgImage) {
      ogImageUrl = data?.sharing?.options?.facebook?.imageUrl
        || data?.metaTagData?.openGraph?.imageUrl
        || ogImageUrl;
    }
    return <meta property="og:image" content={ogImageUrl} />;
  },
  /**
   * Get all meta tags based on {@link metaTagsConf.json}
   * @param {Object} pageState - page initial state data from API
   * @returns {JSX}
   */
  metas(pageState) {
    const pageData = pageState?.data;

    if (!pageData || !Array.isArray(conf)) {
      return null;
    }
    const customMetas = this.customMetas(pageState);
    const sharingOptions = pageData?.sharing?.options ?? {};

    const config = pageData?.sectionType === 'radiostation'
      ? [
        ...conf,
        {
          contentKey: 'metaTagData.openGraph.imageUrl',
          property: 'og:image',
        }]
      : conf;

    return config.map((metaData, idx) => {
      const meta = modifierTags(modifierTags.METAS, pageState, metaData);
      let keyContent = getKey(pageData, meta.contentKey);
      const keyId = `${meta.name || meta.property}-${idx}`;

      if (!keyContent && meta?.fallbackContentKey) {
        keyContent = getKey(pageData, meta.fallbackContentKey);
      }

      if (meta.name === 'author') {
        let author = 'Univision';

        if (keyContent) {
          author = keyContent;
        } else if (pageData.primaryTopic) {
          author = `Univision ${pageData.primaryTopic}`;
        }

        return (
          <meta
            name="author"
            content={author}
            key={keyId}
          />
        );
      }

      if (meta.name === 'robots') {
        const robotsContent = isValidArray(keyContent)
          ? keyContent
          : meta.content;

        return (
          <meta
            name="robots"
            content={robotsContent}
            key={keyId}
          />
        );
      }

      if (customMetas[meta.property]) {
        return (
          <meta
            key={keyId}
            property={meta.property}
            content={customMetas[meta.property]}
          />
        );
      }

      if (meta.content || keyContent?.length) {
        const metaProps = meta?.property
          ? { property: meta.property }
          : { name: meta.name };

        if (metaProps?.property === 'og:title' && sharingOptions?.facebook?.title) {
          return (
            <meta
              {...metaProps}
              key={keyId}
              content={sharingOptions.facebook.title}
            />
          );
        }

        if (metaProps?.property === 'og:description' && sharingOptions?.facebook?.description) {
          return (
            <meta
              {...metaProps}
              key={keyId}
              content={sharingOptions.facebook.description}
            />
          );
        }

        if (metaProps?.name === 'twitter:title' && sharingOptions?.twitter?.title) {
          return (
            <meta
              {...metaProps}
              key={keyId}
              content={sharingOptions.twitter.title}
            />
          );
        }

        if (metaProps?.name === 'twitter:description' && sharingOptions?.twitter?.description) {
          return (
            <meta
              {...metaProps}
              key={keyId}
              content={sharingOptions.twitter.description}
            />
          );
        }

        if (metaProps?.name === 'twitter:image' && sharingOptions?.twitter?.imageUrl) {
          return (
            <meta
              {...metaProps}
              key={keyId}
              content={sharingOptions.twitter.imageUrl}
            />
          );
        }

        return (
          <meta
            {...metaProps}
            key={keyId}
            content={meta.content ? meta.content : keyContent}
          />
        );
      }
      return null;
    });
  },

  /**
   * Get title tag from seo data or fallback page title by default
   * title based on {@link modifierTags} has more relevance
   * @param {Object} pageState - page initial state data from API
   * @returns {JSX}
   */
  title(pageState) {
    const pageData = pageState?.data || {};
    const defaultTitle = pageData.seo?.title || pageData.title;
    const title = modifierTags(modifierTags.TITLE, pageState, defaultTitle);

    return <title>{title}</title>;
  },

  /**
   * Get canonical URL fro seo data, {@link modifierTags} or fallback page URI
   * @param {Object} pageState - page initial state data from API
   * @returns {JSX}
   */
  canonical(pageState) {
    const pageData = pageState?.data || {};
    const defaultUrl = pageData?.seo?.canonicalUrl || toAbsoluteUrl(pageData?.uri, pageData.domain);
    const canonicalUrl = modifierTags(modifierTags.CANONICAL, pageState, defaultUrl);

    return <link rel="canonical" href={canonicalUrl} />;
  },

  /**
   * Get custom tags from {@link modifierTags} based on content type
   * @param {Object} pageState - page initial state data from API
   * @returns {Object}
   */
  customMetas(pageState) {
    const customTags = modifierTags(modifierTags.CUSTOM, pageState) || {};
    return customTags;
  },

  /**
   * Get language Link from data page for tudn only
   * @param {Object} pageState - page initial state data from API
   * @param {string} lang - language for tak
   * @returns {JSX}
   */
  language(pageState, lang = 'us') {
    const langData = modifierTags(modifierTags.LANGUAGE, pageState, lang);
    return isValidObject(langData) ? <link rel="alternate" {...langData} /> : null;
  },

  /**
   * Gets alternate section links
   * @param {Object} pageState - page initial state data from API
   * @returns {JSX}
   */
  alternateSection(pageState) {
    const alternateData = modifierTags(modifierTags.ALTERNATE_SECTION, pageState);
    return isValidArray(alternateData)
      // eslint-disable-next-line react/no-array-index-key
      ? alternateData.map((data, idx) => (<link rel="alternate" {...data} key={`${data?.hrefLang}-${idx}`} />))
      : null;
  },

  /**
   * Get link amp url for discovery
   * https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/discovery
   * @param {Object} pageState - Page initial data
   * @returns {null|*}
   */
  ampHtmlLink(pageState) {
    const supportedTypes = ['article'];
    const contentType = getKey(pageState, 'data.type');
    const contentUrl = pageState?.data?.seo?.canonicalUrl || pageState?.data?.uri;
    if (
      supportedTypes.includes(contentType)
      && pageState.data.enableForGoogleAmp
      && isValidString(contentUrl)
    ) {
      const cleanUri = toRelativeUrl(contentUrl);
      const urlObj = new URL(contentUrl);
      const domain = `${urlObj.protocol}//${urlObj.hostname}`;
      return (
        <link
          rel="amphtml"
          href={toAbsoluteUrl(`/amp${cleanUri}`, domain)}
        />
      );
    }
    return null;
  },
  /**
   * Get lang attribute value for the html tag
   * @param {Object} pageState - page initial data
   * @returns {JSX}
   */
  htmlLang(pageState) {
    return pageState?.data?.seo?.language || ES;
  },
};

export default seoTags;
