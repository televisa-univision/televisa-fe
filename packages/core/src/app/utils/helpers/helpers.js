import Store from '@univision/fe-commons/dist/store/store';
import {
  getHeaderConf,
  getPageData,
  getRequestParams,
  isSectionPage,
  isSpa,
} from '@univision/fe-commons/dist/store/storeHelpers';
import {
  cloneDeep,
  hasKey,
  getKey,
  isValidArray,
  toAbsoluteUrl,
} from '@univision/fe-commons/dist/utils/helpers';
import {
  sitesSelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { shouldSkipSpa, fetchSpaState } from '@univision/fe-commons/dist/utils/helpers/spa';

import globalNavLinks from '@univision/fe-components-base/dist/components/Navigation/GlobalNav/data/links';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import commonWords from './commonWords.json';

/**
 * Get the values to share
 * @param {Object} sharingOptions social media options
 * @param {Object} slideData data
 * @returns {Object} new sharing values
 */
export function getSharingValues (sharingOptions, slideData = {}) {
  // Deep clone of original object
  const clonedObject = cloneDeep(sharingOptions);
  const {
    facebook = {},
    twitter = {},
    whatsapp = {},
    mail = {},
  } = clonedObject;
  // Replace urls
  if (slideData.shortUrl) {
    const { shortUrl } = slideData;
    // Update mail body
    if (hasKey(mail, 'body')) {
      mail.body = mail.body.replace(shortUrl.split('#')[0], shortUrl);
    }
    // Update social media urls
    facebook.redirectUrl = shortUrl;
    facebook.url = shortUrl;
    twitter.url = shortUrl;
    whatsapp.url = shortUrl;
  }
  return clonedObject;
}

/**
 * Clean search query
 * @param {string} query - query to clean
 * @returns {string}
 */
export function cleanSearchQuery(query) {
  if (typeof query !== 'string') {
    return '';
  }
  const common = [...commonWords.es, ...commonWords.en];
  const regExpClean = new RegExp(`\\b${common.join('\\b|\\b')}\\b`, 'gi');

  return query.replace(regExpClean, '').replace(/\s+/gm, ' ').trim();
}

/**
 * Pre fetch the content of the header and the first meaningful widget.
 * The first meaningful widget is the first one with contents.
 * The headers links to prefetch are the ones for the global nav and
 * the first 5 links in the sub nav.
 * @returns {Array|null} fetched URLs.
 */
export function prefetchContent() {
  const preFetchedLinks = [];
  if (!isSpa(Store)) {
    return null;
  }
  const sites = sitesSelector(Store.getState());
  try {
    const { data, navData } = getPageData(Store);
    const widgets = data && data.widgets;
    const nonFullyMeaningfulWidgets = [
      'AllBannerMovingBanner',
      'LFHighImpactWidget',
      'AllCarouselHighImpact',
      'AllCarouselIconPromo',
    ];
    /**
     * Convert the uri to a relative one, fetch the content and add the uri to
     * {@code preFetchedLinks}
     * @param {string} contentUri Content uri
     */
    const fetchUri = (contentUri) => {
      if (!shouldSkipSpa({ url: contentUri })) {
        const requestParams = {
          ...getRequestParams(Store),
          headers: {
            'X-Why': 'Prefetch',
          },
        };
        fetchSpaState({
          contentUri,
          requestParams,
        });
        preFetchedLinks.push(contentUri);
      }
    };

    // Widgets
    if (isValidArray(widgets) && data.type === contentTypes.SECTION) {
      for (let i = 0; i < widgets.length; i += 1) {
        if (isValidArray(widgets[i].contents)) {
          for (let j = 0; j < widgets[i].contents.length; j += 1) {
            if (widgets[i].contents[j]?.type !== 'externallink') {
              fetchUri(widgets[i].contents[j].uri);
            }
          }
          if (nonFullyMeaningfulWidgets.indexOf(widgets[i].type) === -1) {
            break;
          }
        }
      }
    }

    // Global nav links
    if (isValidArray(globalNavLinks)) {
      for (let i = 0; i < globalNavLinks.length; i += 1) {
        fetchUri(toAbsoluteUrl(globalNavLinks[i].uri, sites[globalNavLinks[i].site]));
      }
    }

    // New Headers
    const { links: newHeaderLinks } = getHeaderConf(Store);
    if (isValidArray(newHeaderLinks)) {
      if (isSectionPage(Store)) {
        for (let i = 0; i < newHeaderLinks.length; i += 1) {
          fetchUri(newHeaderLinks[i].link);
        }
      }
    } else {
      // Legacy header
      const subNavLinks = getKey(navData, 'links.primary');
      if (isValidArray(subNavLinks)) {
        for (let i = 0; i < Math.min(5, subNavLinks.length); i += 1) {
          fetchUri(subNavLinks[i].link);
        }
      }
    }
  } catch (e) {
    clientLogging(
      new Error(`prefetchContent method error - ${e.message}`),
      'prefetchContent method error'
    );
  }

  return preFetchedLinks;
}
