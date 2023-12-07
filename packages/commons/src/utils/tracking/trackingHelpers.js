// eslint-disable-next-line import/no-cycle
import sanitizeHtml from '@univision/fe-utilities/helpers/html/sanitizeHtml';
import truncateString from '@univision/fe-utilities/helpers/string/truncateString';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import toDeburr from '@univision/fe-utilities/helpers/string/toDeburr';
import { USER_ID } from '../../constants/personalization';
import localStorage from '../helpers/LocalStorage';

import {
  cloneDeep,
} from '../helpers';

import * as contentTypes from '../../constants/contentTypes.json';

// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';
// eslint-disable-next-line import/no-cycle
import {
  isSpa,
  getFeatureFlag,
  getNavigationCount,
} from '../../store/storeHelpers';
// eslint-disable-next-line import/no-cycle
import { userSelector, horoscopesCardDataSelector } from '../../store/selectors/user-selectors';
// eslint-disable-next-line import/no-cycle
import features from '../../config/features';
import mvpdProviders from './mvpdProvidersData.json';
import {
  ANONYMOUS_USER,
  AUTHENTICATED_USER,
  MVPD_SUB_USER,
  PHASED_RELEASE,
  PHASED_RELEASE_BASELINE,
} from '../../constants/tracking';
import SessionStorage from '../helpers/SessionStorage';
import { HOROSCOPES } from '../../constants/personalizationType';
// eslint-disable-next-line import/no-cycle
import { pageUIDSelector } from '../../store/selectors/page-selectors';

/**
 * Sets the page's tracking data to be used in GTM
 * for pages that don't include tracking data from api
 * ie: status 404, 500 error pages
 * @param {number} pageData for current page
 * @returns {Object} data with custom tracking
 */
export function getCustomTrackingForPage(pageData) {
  let settings = null;

  // error page tracking
  const statusCode = getKey(pageData, 'statusCode');
  const errorTypes = [404, 500];
  if (errorTypes.includes(statusCode)) {
    const errorContentType = 'errorpage';
    const errorTitle = 'Page not found - Pagina no encontrada';
    const errorTypeMessages = {
      404: 'page does not exist',
      500: 'internal server error',
    };
    settings = {
      content_type: errorContentType,
      error_type: getKey(errorTypeMessages, `${statusCode}`),
      title: errorTitle,
    };
  }
  return settings;
}

/**
 * Returns the user type depending whether the user is logged in or not
 * @param {boolean} isUserAnonymous flag to know if current user is anonymous
 * @param {boolean} isMvpdLoggedIn flat to know if current user is logged in
 * @returns {string}
 */
export function getUserType({ isUserAnonymous, isMvpdLoggedIn }) {
  if (!isUserAnonymous) return AUTHENTICATED_USER;
  if (isUserAnonymous && isMvpdLoggedIn) return MVPD_SUB_USER;

  return ANONYMOUS_USER;
}

/**
 * Retrieves MVPD session data
 * @returns {Object}
 */
export function getMvpdData() {
  return SessionStorage.getObject('mvpdData') || {};
}

/**
 * Returns user data from the Store
 * @returns {Object}
 */
export function getUserData() {
  const state = Store.getState();
  if (!features.content?.isAnonUserCreationEnabled(state)) return {};
  const userStored = localStorage.getObject(USER_ID)?.univision_user_id;
  const {
    sub: userId,
    anonymous: isUserAnonymous,
  } = userSelector(state);
  const {
    loggedIn: isMvpdLoggedIn,
  } = getMvpdData();

  if (!userId && !userStored) return {};

  return {
    userId: userId || userStored,
    userType: getUserType({ isUserAnonymous, isMvpdLoggedIn }),
  };
}

/**
 * Checks if current page is part of the personalized content
 * @returns {boolean}
 */
export function isPersonalizedContent() {
  const state = Store.getState();
  const currentPageUID = pageUIDSelector(state);
  const horoscopeFavorites = horoscopesCardDataSelector(state) || [];

  return currentPageUID
    && isValidArray(horoscopeFavorites)
    && horoscopeFavorites.map(item => item.uid).includes(currentPageUID);
}

/**
 * Get Utag data for page
 * @param {Object} trackingData of the page
 * @returns {Object}
 */
export function getUtagData(trackingData = {}) {
  const utagData = cloneDeep(trackingData || {});
  let mvpdName = '';
  const { providerId: mvpdId } = getMvpdData();

  utagData.spa = process.env.APP_VERSION ? `v${process.env.APP_VERSION}` : `${isSpa(Store)}`;
  utagData.spa_page_count = getNavigationCount(Store) + 1;
  if (mvpdId) {
    // Uses the providers data cached from http://syndicator.univision.com/mvpd-api
    // The JSON is simplified to only use the providerId and displayName.
    /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
    mvpdName = mvpdProviders
      .filter(provider => provider.providerId === mvpdId)
      .map(provider => provider.displayName)[0];
  }
  // Anonoymous/Logged in user
  // Will add the necessary data when this feature is enabled
  const userData = getUserData();
  if (isValidObject(userData)) {
    const { userId, userType } = userData;
    utagData.user_id = userId;
    utagData.user_type = userType;
  }

  // For phased released or AB test through Akamai like: Phased Release:video_preview_disabled
  let testGroup = `${PHASED_RELEASE}:`;

  // for the rest of the release groups
  const testValue = getFeatureFlag(Store, PHASED_RELEASE);
  if (testValue) {
    testGroup += testValue;
  } else {
    testGroup += PHASED_RELEASE_BASELINE;
  }
  utagData.test_group = testGroup;
  utagData.mvpdproviderid = mvpdName || 'false';

  // validation tracking for list Item
  const state = Store.getState();

  if (utagData.article_type === contentTypes.VIEW_LIST) {
    const { sponsor, uid, body } = state.page?.data;
    let listNumber = 0;
    let title = '';
    let listType = '';

    if (body && isValidArray(body)) {
      const contentTypeVideo = body.map(item => item.objectData?.media?.type).includes('video');

      body.map((chunk, index) => {
        const { objectData } = chunk;
        const isListEnhancement = hasKey(chunk, 'objectData.type') && objectData.type === 'listitem';

        if (index === 0 && chunk?.type === contentTypes.LIST_TYPE_TEXT) {
          title = toDeburr(truncateString(sanitizeHtml(chunk.value)), { lowercase: true });
        }
        if (isListEnhancement) {
          listNumber += 1;
          listType = contentTypeVideo ? 'list_item with video' : objectData.media?.type;
        }
        return null;
      });
    }

    utagData.list_id = uid;
    utagData.list_title = title;
    utagData.list_type = listType;
    utagData.list_count = listNumber;
    utagData.list_sponsor = sponsor?.name;
    utagData.content_type = utagData.article_type;
  }

  return utagData;
}

/**
   * Gets the personalization category depending on the personalization type
   * @param {string} personalizationType - personalization type
   * @returns {string}
   */
export function getPersonalizationCategory(personalizationType) {
  switch (personalizationType) {
    case HOROSCOPES:
      return 'horoscopos';

    default:
      return 'generic';
  }
}
