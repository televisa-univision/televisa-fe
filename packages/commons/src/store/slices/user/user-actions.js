import {
  favHoroscopesEnabledSelector,
  personalizedWidgetKeySelector,
} from '../../selectors/favorite-selectors';
import { getCurrentBrowserUrl } from '../../selectors/page-selectors';
import { ANON_USER_TOKEN_KEY } from '../../../constants/personalization';
import features from '../../../config/features';
import { accessTokenSelector } from '../../selectors/user-selectors';
import LocalStorage from '../../../utils/helpers/LocalStorage';
import { HOROSCOPES } from '../../../constants/personalizationType';
import {
  LOADING,
  SUCCESS,
} from '../../../constants/status';
import * as userSlice from './user-slice';
import * as reactionsSlice from '../reactions/reactions-slice';

/**
 * Sets an object for an anonymous user in the redux store
 * @returns {Object}
 */
export function fetchAnonUser() {
  return async (dispatch, getState) => {
    const state = getState();
    const accessToken = accessTokenSelector(state);
    if (
      features.content.isAnonUserCreationEnabled(state)
    && !accessToken
    ) {
      dispatch(userSlice.fetchAnonUser());
    }
  };
}

/**
 * Reset current anonymous user information and create the user again
 * @returns {Function}
 */
export function restartAnonymousUser () {
  return (dispatch, getState) => {
    LocalStorage.remove(ANON_USER_TOKEN_KEY);
    dispatch(userSlice.resetUserState());
    fetchAnonUser()(dispatch, getState);
  };
}

/**
 * Fetch favorite horoscopes of the current user
 * @param {string} personalizationType type of personalization
 * @returns {Function}
 */
export function fetchFavoriteHoroscopes () {
  return async (dispatch, getState) => {
    const state = getState();
    const { user } = state;
    const { requestingUrl: prevRequestingUrl } = user?.horoscopes;
    const requestingUrl = getCurrentBrowserUrl(state);
    const widgetKey = personalizedWidgetKeySelector(state, { personalizationType: HOROSCOPES });

    if (widgetKey && requestingUrl !== prevRequestingUrl) {
      // Reset horoscopes if page changes and we have a valid widgetKey
      dispatch(userSlice.setUserState({ horoscopes: userSlice.initialState.horoscopes }));
    }

    if (
      !favHoroscopesEnabledSelector(state)
      || !requestingUrl
      || !widgetKey
      || [SUCCESS, LOADING].includes(user?.horoscopes?.status)
    ) return;

    // restartAction parameter is used by User middleware
    dispatch(userSlice.fetchFavoriteHoroscopes({
      widgetKey,
      requestingUrl,
      /** This property is required and needed. Is used in redux/middlewares/user.js .
       * We had to pass the restartAnonymousUser action as argument in order to
       * be able to invoke that action in the middleware. We could not import the action
       * directly in the middleware because we was creating really bad circular references.
       * To avoid this usage all references to utils/helpers/index inside the user redux entry
       * has to point the the package Utilities that will be added soon the the project.
      */
      restartAction: restartAnonymousUser,
    }));
  };
}

/**
 * Toggle favorite horoscopes of a user
 * If the new favorite Id already exist it will be removed from favorites
 * If the new favorite Id does not exist yet it will be added as new favorite
 * @param {string} signId horoscope sign id
 * @param {string} isRemove defines if remove or add the signId
 * @returns {Function}
 */
export function updateFavoriteHoroscopes (signId) {
  return async (dispatch, getState) => {
    const state = getState();
    const { user } = state;
    const {
      favorites,
      requestingUrl,
      status,
    } = user?.horoscopes;
    const favorite = favorites.find(fav => fav.id === signId);
    if (
      status !== SUCCESS
      || favorite?.status === LOADING
    ) return;

    dispatch(userSlice.updateFavoriteHoroscopes({
      id: signId,
      isRemove: !!favorite,
      requestingUrl,
      /** This property is required and needed. Is used in redux/middlewares/user.js .
       * We had to pass the restartAnonymousUser action as argument in order to
       * be able to invoke that action in the middleware. We could not import the action
       * directly in the middleware because we was creating really bad circular references.
       * To avoid this usage all references to utils/helpers/index inside the user redux entry
       * has to point the the package Utilities that will be added soon the the project.
      */
      restartAction: restartAnonymousUser,
    }));
  };
}

/**
 * Adds a user reaction of a content
 * @param {Object} config - configuration
 * @property {string} config.contentId - content id that will get its reaction written
 * @property {string} config.reaction - reaction that will be written
 * @returns {Function}
 */
export function addUserReaction({ contentId, reaction }) {
  return (dispatch) => {
    dispatch(reactionsSlice.incrementCount({ contentId, reaction }));
    dispatch(userSlice.setUserReaction({ contentId, reaction }));
    dispatch(userSlice.writeReaction({ contentId, reaction }));
  };
}

/**
 * Removes a user reaction of a content
 * @param {Object} config - configuration
 * @property {string} config.contentId - content id that will get its reaction written
 * @returns {Function}
 */
export function removeUserReaction({ contentId }) {
  return (dispatch, getState) => {
    const state = getState();
    const reaction = state?.user?.reactions?.byId[contentId]?.reaction;
    dispatch(reactionsSlice.decrementCount({ contentId, reaction }));
    dispatch(userSlice.unsetUserReaction({ contentId }));
    dispatch(userSlice.removeUserReaction({ contentId, reaction }));
  };
}
