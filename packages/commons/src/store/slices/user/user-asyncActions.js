/* eslint-disable import/no-extraneous-dependencies */
import { createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

import localStorage from '@univision/fe-utilities/storage/localStorage';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import isClientSide from '@univision/fe-utilities/helpers/common/isClientSide';
import createUser from '@univision/fe-graphql-services/dist/requests/mutations/createUser';
import getFavoriteHoroscopes from '@univision/fe-graphql-services/dist/requests/queries/getFavoriteHoroscopes';
import addFavoriteHoroscopeSign from '@univision/fe-graphql-services/dist/requests/mutations/addFavoriteHoroscopeSign';
import removeFavoriteHoroscopeSign from '@univision/fe-graphql-services/dist/requests/mutations/removeFavoriteHoroscopeSign';
import addReaction from '@univision/fe-graphql-services/dist/requests/mutations/addReaction';
import removeReaction from '@univision/fe-graphql-services/dist/requests/mutations/removeReaction';

import fetch from '../../../utils/fetch';
import * as helpers from '../../../utils/api/graphql/helpers';
import { ANON_USER_TOKEN_KEY } from '../../../constants/personalization';
import { clientLevelLogging } from '../../../utils/logging/clientLogging';
import { loggingLevels } from '../../../utils/logging/loggingLevels';
import {
  FAVORITE_HOROSCOPES_ERROR,
  REACTIONS_SERVICE_ERROR,
  USER_LOCATION_ERROR,
} from '../../../constants/messages';
import { LOADING } from '../../../constants/status';
import ssoAnonUserToken from '../../../utils/user';
import authFeatures from '../../../config/features/auth';
import { fetchGraphQL, fetchAuthGraphQL } from '../../../utils/api/graphql';

const name = 'user';

/**
 * Check if should cancel user location request before the payload creator is called
 * @param {Object} arg first parameter that was passed to the action when it was dispatched
 * @param {Object} thunkApi parameters passed to a Redux thunk function
 * @returns {boolean} false if the execution should be canceled
 */
const getUserLocationCondition = (arg, { getState }) => {
  const { user: { location } } = getState();
  // We don't need call location on SSR
  // and prevent duplicate calls
  if (location.status === LOADING || !isClientSide()) {
    return false;
  }
  return true;
};

/**
 * Sets an object for an anonymous user in the redux store
 * @param {Object} arg first parameter that was passed to the action when it was dispatched
 * @param {Object} thunkApi parameters passed to a Redux thunk function
 * @returns {Object}
 */
const getUserLocationCreator = async (arg, { getState }) => {
  try {
    const { page, user: { location } } = getState();

    // fetch user location one time per session
    // return user location from store if already exist
    if (isValidObject(location?.data)) {
      return location.data;
    }

    const prefix = page.config.syndicator.uri;
    const uri = `${prefix}/proxy/uncached/user-loc`;
    const response = await fetch(uri);

    // Return an empty object instead of undefined.
    return response?.pinfo.Location || {};
  } catch (err) {
    const level = err?.status > 408 ? loggingLevels.error : loggingLevels.warn;

    clientLevelLogging({
      error: new Error(`${USER_LOCATION_ERROR} getUserLocationRejected - ${err.message}`),
      info: `${USER_LOCATION_ERROR} getUserLocationRejected`,
      level,
    });
    throw err;
  }
};

/**
 * Sets an object for an anonymous user in the redux store
 * @param {Object} arg arguments to be used in the request
 * @param {Object} thunkApi utilities object
 * @returns {Object}
 */
export const fetchAnonUserCreator = async (arg, { getState }) => {
  try {
    const state = getState();
    const isSsoEnabled = authFeatures.isSsoEnabled(state);

    let accessToken;
    if (isSsoEnabled) {
      accessToken = await ssoAnonUserToken(state);
    } else {
      // TODO: This is the legacy code and will be removed after the SSO  feature get approved
      accessToken = localStorage.getObject(ANON_USER_TOKEN_KEY)?.accessToken;

      if (!accessToken) {
        const response = await fetchGraphQL({
          query: createUser,
          serverUri: state.page?.config?.graphql,
        });
        accessToken = response?.createUser?.accessToken;
        localStorage.setObject(ANON_USER_TOKEN_KEY, { accessToken });
      }
    }

    return {
      accessToken,
      sub: jwtDecode(accessToken).sub, // jwtDecode operation can raise InvalidTokenError
    };
  } catch (err) {
    const level = err?.status > 408 ? loggingLevels.error : loggingLevels.warn;

    clientLevelLogging({
      error: new Error(`${FAVORITE_HOROSCOPES_ERROR} fetchAnonUserRejected - ${err.message}`),
      info: `${FAVORITE_HOROSCOPES_ERROR} fetchAnonUserRejected`,
      level,
    });
    throw err;
  }
};

/**
 * Fetch favorite horoscopes of the current user
 * @param {Object} arg arguments to be used in the request
 * @property {string} arg.widgetKey
 * @param {Object} thunkApi utilities object
 * @returns {Object}
 */
export const fetchFavoriteHoroscopesCreator = async ({
  requestingUrl,
  widgetKey,
}, { getState }) => {
  try {
    const state = getState();
    const response = await fetchAuthGraphQL({
      query: getFavoriteHoroscopes,
      variables: { requestingUrl },
      token: state?.user?.accessToken,
      serverUri: state?.page?.config?.graphql,
    });
    const data = response?.getUser?.favorites?.horoscopes;
    const { items, ids } = helpers.parseHoroscopesResponse({
      ids: data.signIds,
      items: data.daily,
    });

    return {
      ids, widgetKey, items,
    };
  } catch (err) {
    const level = err?.status > 408 ? loggingLevels.error : loggingLevels.warn;

    clientLevelLogging({
      error: new Error(`${FAVORITE_HOROSCOPES_ERROR} fetchFavoriteHoroscopesRejected - ${err.message}`),
      info: `${FAVORITE_HOROSCOPES_ERROR} fetchAnonUserRejected`,
      level,
    });
    throw err;
  }
};

/**
 * Fetch favorite horoscopes of the current user
 * @param {Object} arg arguments to be used in the request
 * @param {Object} thunkApi utilities object
 * @returns {Object}
 */
export const updateFavoriteHoroscopesCreator = async ({
  id,
  isRemove,
  requestingUrl,
}, { getState }) => {
  try {
    const state = getState();
    const response = await fetchAuthGraphQL({
      token: state?.user?.accessToken,
      query: isRemove ? removeFavoriteHoroscopeSign : addFavoriteHoroscopeSign,
      variables: { signId: id, isRemove, requestingUrl },
      serverUri: state.page?.config?.graphql,
    });
    const data = isRemove
      ? response?.removeFavoriteHoroscopeSign
      : response?.addFavoriteHoroscopeSign;
    const { items } = helpers.parseHoroscopesResponse(data);

    return items;
  } catch (error) {
    const level = error?.status > 408 ? loggingLevels.error : loggingLevels.warn;

    clientLevelLogging({
      error: new Error(`${FAVORITE_HOROSCOPES_ERROR} fetchFavoriteHoroscopesRejected - ${error.message}`),
      info: `${FAVORITE_HOROSCOPES_ERROR} fetchFavoriteHoroscopesRejected`,
      level,
    });
    throw error;
  }
};

/**
 * Write a reaction given the contentId for the current user
 * @param {Object} arg arguments to be used in the request
 * @param {Object} thunkAPI utilities object
 * @returns {Object}
 */
export const writeReactionCreator = async ({ contentId, reaction }, { getState }) => {
  try {
    const state = getState();
    // In case of failure, the next command will throw an error and send a promise rejection
    await fetchAuthGraphQL({
      query: addReaction, // TODO: use removeReaction if we are removing
      variables: { contentId, reaction },
      token: state?.user?.accessToken,
      serverUri: state?.page?.config?.graphql,
    });
    return { contentId, reaction };
  } catch (err) {
    const level = err?.status > 408 ? loggingLevels.error : loggingLevels.warn;

    clientLevelLogging({
      error: new Error(`${REACTIONS_SERVICE_ERROR} writeReaction rejected, ${err.message}`),
      info: `${REACTIONS_SERVICE_ERROR} writeReaction rejected`,
      level,
    });
    throw err;
  }
};

/**
 * Remove reaction given the contentId for the current user
 * @param {Object} arg arguments to be used in the request
 * @param {Object} thunkAPI utilities object
 * @returns {Object}
 */
export const removeReactionCreator = async ({ contentId }, { getState }) => {
  try {
    const state = getState();
    // In case of failure, the next command will throw an error and send a promise rejection
    await fetchAuthGraphQL({
      query: removeReaction,
      variables: { contentId },
      token: state?.user?.accessToken,
      serverUri: state?.page?.config?.graphql,
    });
    return { contentId };
  } catch (err) {
    const level = err?.status > 408 ? loggingLevels.error : loggingLevels.warn;

    clientLevelLogging({
      error: new Error(`${REACTIONS_SERVICE_ERROR} removeReaction rejected - ${err.message}`),
      info: `${REACTIONS_SERVICE_ERROR} removeReaction rejected`,
      level,
    });
    throw err;
  }
};

// Import from slice instead from here
export const getUserLocation = createAsyncThunk(
  `${name}/getUserLocation`,
  getUserLocationCreator,
  {
    condition: getUserLocationCondition,
  }
);

export const fetchAnonUser = createAsyncThunk(
  `${name}/fetchAnonUser`,
  fetchAnonUserCreator
);

export const fetchFavoriteHoroscopes = createAsyncThunk(
  `${name}/fetchFavoriteHoroscopes`,
  fetchFavoriteHoroscopesCreator
);

export const updateFavoriteHoroscopes = createAsyncThunk(
  `${name}/updateFavoriteHoroscopes`,
  updateFavoriteHoroscopesCreator
);

export const writeReaction = createAsyncThunk(
  `${name}/writeReaction`,
  writeReactionCreator
);

export const removeUserReaction = createAsyncThunk(
  `${name}/removeReaction`,
  removeReactionCreator
);
