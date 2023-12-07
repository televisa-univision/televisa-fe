/* eslint-disable import/no-extraneous-dependencies */
// TODO: This eslint rule will be disabled when the SSO feature get enabled by default
import createUser from '@univision/fe-graphql-services/dist/requests/mutations/createUser';
import consoleLogger from '@univision/fe-utilities/utils/consola';
import { ANON_USER_TOKEN_KEY } from '../../constants/personalization';
import { userTokenQueryStringSelector } from '../../store/selectors/auth-selectors';
import authFeatures from '../../config/features/auth';
import LocalStorage from '../helpers/LocalStorage';
// eslint-disable-next-line import/no-cycle
import { getInstance } from '../helpers/SsoIFrameLocalStorage';
// eslint-disable-next-line import/no-cycle
import { fetchGraphQL } from '../api/graphql';

let isLogsEnabled = false;
/**
 * Logs to the console when the ssoLogsEnabled feature flag is enabled
 * @param {string} message message to log
 */
const ssoLog = (message) => {
  if (isLogsEnabled) {
    consoleLogger.log(message);
  }
};

/**
 * Resolves the user Access Token taking in consideration
 * every possible case where we have a token.
 * The user access token can:
 *  1 - Doesn't exist
 *  ( New user should be created )
 *
 *  2 - Exist in the current site Local Storage
 * ( Share token with SSO IFrame Local Storage for usage of other apps )
 *
 *  3 - Exist in the SSO IFrame Local Storage
 * ( Share token with current Local Storage for usage of current app )
 *
 *  4 - Exist in both places
 * ( Merge users invoking GraphQL endpoint. The Access Token stored in the SSO IFrame
 * will continue existing after the merge and should be taken as the new app
 * Access Token. For that reason should overrides the one existing in the Local Storage.
 * This mechanism avoid infinite merging process while the user navigates to different
 * apps )
 *
 *  5 - Exist in the current URL query parameter 'uvnUserToken'
 * ( This use case is for giving support to native applications using WebViews in order
 *  to open Univision web apps using the existing token inside the native app. This
 *  token is stored in both Storages to keep the user auth inside the web view while
 *  he navigates in the app )
 *
 * @param {Object} state redux state
 * @returns {string} accessToken
 */
const ssoAnonUserToken = async (state) => {
  isLogsEnabled = authFeatures.ssoLogsEnabled(state);
  const ssoIFrameLocalStorage = getInstance();
  if (!ssoIFrameLocalStorage) {
    ssoLog('SSO AUTH: SsoIFrameLocalStorage should be initialized.');
    throw new Error('SsoIFrameLocalStorage should be initialized.');
  }

  ssoLog('SSO AUTH: Reading tokens');
  const queryParamToken = userTokenQueryStringSelector(state);
  const localToken = LocalStorage.getObject(ANON_USER_TOKEN_KEY)?.accessToken;
  const data = await ssoIFrameLocalStorage.getItemObject(ANON_USER_TOKEN_KEY);
  const iframeToken = data?.accessToken;
  ssoLog(`SSO AUTH: \n localToken:${localToken} \n iframeToken: ${iframeToken} \n queryParamToken:${queryParamToken}`);

  let accessToken;
  if (queryParamToken) {
    ssoLog('SSO AUTH: queryParamToken');
    accessToken = queryParamToken;

    if (queryParamToken !== iframeToken) {
      ssoLog('SSO AUTH: Set token in both storages');
      LocalStorage.setObject(ANON_USER_TOKEN_KEY, { accessToken });
      ssoIFrameLocalStorage.setItemObject(ANON_USER_TOKEN_KEY, { accessToken });
    }
  } else if (!localToken && !iframeToken) {
    ssoLog('SSO AUTH: !localToken && !iframeToken');
    const response = await fetchGraphQL({
      query: createUser,
      serverUri: state.page?.config?.graphql,
    });
    accessToken = response?.createUser?.accessToken;
    ssoLog(`SSO AUTH: GraphQL Token: ${accessToken}`);

    ssoLog('SSO AUTH: Set token in both storages');
    // Persist Token in both Storages
    LocalStorage.setObject(ANON_USER_TOKEN_KEY, { accessToken });
    ssoIFrameLocalStorage.setItemObject(ANON_USER_TOKEN_KEY, { accessToken });
  } else if (localToken && !iframeToken) {
    ssoLog('SSO AUTH: localToken && !iframeToken');
    accessToken = localToken;

    // Persist Token in iFrame Storage
    ssoLog('SSO AUTH: Set token in IFrame Storage');
    ssoIFrameLocalStorage.setItemObject(ANON_USER_TOKEN_KEY, { accessToken });
  } else if (!localToken && iframeToken) {
    ssoLog('SSO AUTH: !localToken && iframeToken');
    accessToken = iframeToken;

    // Persist Token in Local Storage
    ssoLog('SSO AUTH: Set token in Local Storage');
    LocalStorage.setObject(ANON_USER_TOKEN_KEY, { accessToken });
  } else { //  localToken && iframeToken
    ssoLog('SSO AUTH: localToken && iframeToken');
    accessToken = localToken;

    // if (localToken !== iframeToken) {
    //   // TODO: In this case we have to invoke the merge users graphql endpoint
    //   // by now we will not handle this case because is pending the BE implementation.
    //   // graphql request to merge users;
    //   accessToken = iframeToken
    //   LocalStorage.setObject(ANON_USER_TOKEN_KEY, { accessToken });
    // }
  }

  ssoLog(`SSO AUTH: Result Access Token: ${accessToken}`);
  return accessToken;
};

export default ssoAnonUserToken;
