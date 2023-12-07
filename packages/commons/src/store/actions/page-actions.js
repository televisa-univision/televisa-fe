import { forceCheck } from 'react-lazyload';
import { batch } from 'react-redux';
import dfpManager from '../../utils/ads/dfpManager';
import {
  getKey,
  isValidFunction,
  isValidObject,
  toAbsoluteUrl,
} from '../../utils/helpers';
import { fetchSpaState, getRequestParamsForSpa } from '../../utils/helpers/spa';
import * as types from './action-types';
import clientLogging from '../../utils/logging/clientLogging';
import { setSearchData } from './search/search-actions';
import { setHeaderConf, setHamburgerClosed } from './header/header-actions';

/**
 * Action to set a flag to indicate the Ad Skin has been removed on the page
 * @returns {Object}
 */
export function removeAdSkin() {
  return {
    type: types.REMOVE_AD_SKIN,
    hasAdSkin: false,
  };
}

/**
 * Destroy Ad Skin
 * @param {function} dispatch - Store dispatcher
 */
export function destroyAdSkin(dispatch) {
  if (global.window && isValidFunction(window.uvnDestroyAdSkin)) {
    window.uvnDestroyAdSkin();
    dispatch(removeAdSkin());
  }
}

/**
 * Page data action
 * @param {Object} data from page api, env, theme
 * @returns {Object}
 */
export default function setPageData(data) {
  return {
    type: types.SET_PAGE_DATA,
    data,
  };
}

/**
 * Trigger the hooks to execute before a SPA transition.
 * - Send additional paga data to the reducer to make validations
 * - Send pipState query param
 * @returns {{type: *}}
 */
export function triggerBeforeSpaTransition() {
  return (dispatch, getState) => {
    const state = getState();
    return dispatch({
      type: types.TRIGGER_BEFORE_SPA_TRANSITION,
      data: getKey(state, 'page.data'),
    });
  };
}

/**
 * Action to wrap the fetchContent utility, updating page data if fulfilled
 * @param {string} contentUri Content URI
 * @param {Object} options extra options
 * @param {Object} options.meta additional metadata for the action
 * @param {boolean} options.resetAds flag to indicate if we should reset the ads
 * @returns {Object}
 */
export function fetchPageData(contentUri, {
  meta,
  resetAds,
} = {}) {
  return (dispatch, getState) => {
    const state = getState();
    const requestParams = getKey(state, 'page.requestParams', {});
    /**
     * Redirect to MPA if there is an error on SPA fetch.
     * @param {boolean} skipLog True to skip log.
     */
    const handleError = ({ skipLog }) => {
      if (meta && meta.initiator === 'spa') {
        if (!skipLog) {
          clientLogging(new Error(`[SPA] Invalid webapp state for page ${contentUri}. Redirecting.`));
        }
        window.location = toAbsoluteUrl(contentUri, getKey(state, 'page.domain', 'https://www.univision.com'));
      }
    };
    return dispatch({
      type: types.FETCH_PAGE_DATA,
      payload: fetchSpaState({ contentUri: encodeURI(contentUri), requestParams })
        .then(async (webAppState) => {
          const error = getKey(webAppState, 'error');
          if (error) {
            handleError({ skipLog: true, message: error?.message });
            return webAppState;
          }
          if (resetAds) {
            // Let's reset the ads once we get the API response and before we update the page.
            destroyAdSkin(dispatch);
            dfpManager.destroyAds({ fullReset: true });
            forceCheck();
          }
          // Update the Store with the SSR initial state
          if (webAppState && isValidObject(webAppState.page)) {
            batch(() => {
              dispatch(setPageData({
                ...webAppState.page,
                requestParams: getRequestParamsForSpa({ contentUri, requestParams }),
              }));
              dispatch(setHeaderConf(webAppState.headerConf));
              dispatch(setSearchData(webAppState.search));
              dispatch(setHamburgerClosed());
              dispatch(triggerBeforeSpaTransition());
            });
          } else {
            handleError({ skipLog: false });
          }
          return {
            data: getKey(webAppState, 'page.data', null),
          };
        })
        .catch(handleError),
      meta,
    });
  };
}

/**
 * set theme data action
 * @param {Object} theme theme
 * @returns {Object}
 */
export function setThemeData(theme) {
  return {
    type: types.SET_THEME_DATA,
    theme,
  };
}

/**
 * Action to set the react-loadable components that should be pre-loaded.
 * @param {Object} loadableComponents that should be pre-loaded
 * @returns {Object}
 */
export function setPreLoadableComponents(loadableComponents) {
  return {
    type: types.SET_PRE_LOADABLE_COMPONENTS,
    loadableComponents,
  };
}

/**
 * Action to set env
 * @param {boolean} isAMP from server
 * @returns {Object}
 */
export function setAmp(isAMP) {
  return {
    type: types.SET_AMP,
    isAMP,
  };
}

/**
 * Action to set widget extra data
 * @param {string} id of the widget
 * @param {Object} data extra to be added
 * @param {Object} settings change the widget settings
 * @returns {Object}
 */
export function setWidgetExtraData(id, data, settings) {
  const actionData = {
    type: types.SET_WIDGET_EXTRA_DATA,
    id,
  };
  const contentId = getKey(settings, 'contentId');

  if (contentId) {
    actionData.contentId = contentId;
    actionData.data = data;
  }
  if (settings) {
    actionData.settings = settings;
  } else {
    actionData.data = data;
  }
  return actionData;
}

/**
 * Action to append widgets to the page data
 * @param {array} widgets to be used on the page
 * @returns {Object}
 */
export function addWidgets(widgets) {
  return {
    type: types.ADD_WIDGETS,
    widgets,
  };
}

/**
 * Action to set a flag to indicate if there is a Ad Skin on the page
 * @param {boolean} hasAdSkin Has ad skin
 * @returns {Object}
 */
export function setAdSkin(hasAdSkin) {
  return {
    type: types.SET_AD_SKIN,
    hasAdSkin,
  };
}

/**
 * Add a brandable show
 * @param {Object} data from component
 * @param {string} pageCategory current page category
 * @returns {Object}
 */
export function extendBrandableShow(data, pageCategory) {
  return {
    type: types.EXTEND_BRANDABLE_SHOW,
    data,
    pageCategory,
  };
}

/**
 * Action to set the current header section title
 * @param {Object} navData header data
 * @returns {Object}
 */
export function setHeaderData(navData) {
  return {
    type: types.SET_HEADER_DATA,
    navData,
  };
}

/**
 * Action to set breakPoint values
 * @param {Object} data BreakPoint data
 * @returns {Object}
 */
export function setCurrentBreakPoint(data) {
  return {
    type: types.SET_BREAKPOINT_VALUES,
    data,
  };
}

/**
 * Action to reset nextjs SPA on page transition
 * @param {string} historyAction history api action [PUSH|POP]
 * @returns {function(...[*]=)}
 */
export function resetNextSpa(historyAction) {
  return (dispatch, getState) => {
    const pageData = getKey(getState(), 'page');

    batch(() => {
      destroyAdSkin(dispatch);
      dfpManager.destroyAds({ fullReset: true });
      // Setting loading status to remove content and use placeholder in page transition
      dispatch(setPageData({
        ...pageData,
        loading: true,
        error: null,
        historyAction,
      }));
      dispatch(setHamburgerClosed());
    });
  };
}

/**
 * Action to set current language value
 * @param {string} language value
 * @returns {Object}
 */
export function setCurrentLanguage(language) {
  return {
    type: types.SET_CURRENT_LANGUAGE,
    language,
  };
}
