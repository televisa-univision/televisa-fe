/**
 * Authorization Code Propagation(ACP) flow for silent SSO.
 * This is a custom authorization flow based in OAuth Authentication Code flow
 * with the purpose of authenticating all Apps configured to use this flow.
 * The authentication will happen silently for the all the univision registered Apps.
 * When the user interacts with any of those Apps after signing in, the user credentials
 * will be already in the Local Storage of the app.
 *
 * After a user provides their credentials to log in in univision.com by example,
 * before redirect back the user to univision.com we share those credentials
 * using redirects. The ACP flow will navigate between every
 * univisionApp/sso-acp-flow route injecting the credentials.
 *
 * This script should be usable in any Web App. It will let us
 * include new applications to this kind of flow. Those applications should be
 * properly configured in the Auth-Service.
 *
 * This script expects to read some arguments from the URL query params where it
 * is running:
 * @argument {String} code authorization code can be used to exchange it for the tokens
 * @argument {String} redirectUri uri of the application that initially invocated the
 * authentication flow
 *
 * Using those arguments the script request the tokens for this app.
 * Store those tokens in the local storage.
 * Store the authorization code to avoid use it twice.
 * Replace the browser url with a continuation URL redirecting to the next client in the flow
 */
import LocalStorage from '@univision/fe-utilities/storage/localStorage';
import { SSO_ACP_STORAGE_KEYS } from '../../../../server/constants/sso';
/**
  * Perform the request to exchange the auth code
  * by the tokens
  * @param {Object} queryParams query parameters
  * @property {string} params.redirectUri
  * @property {string} params.code
  *
  * @returns {Object} result
  * @property {string} result.accessToken
  * @property {string} result.refreshToken
  * @property {string} result.idToken
  * @property {string} result.continuation
  */
const requestTokens = async ({
  redirectUri,
  code,
  flow,
}) => {
  const query = `
  query getTokens($code: String!) {
    getTokens (code: $code) {
      accessToken,
      refreshToken,
      idToken,
      continuationUri
    }
  }
  `;
  const variables = { code, flow, redirectUri };
  // eslint-disable-next-line no-underscore-dangle
  return fetch(window.__INITIAL_STATE__.graphql, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then(async (response) => {
      let errorMessage = response.statusText;
      try {
        const res = await response.json();
        if (response.ok) {
          const { errors, data } = res;
          if (errors && errors.length > 0) {
            errorMessage = JSON.stringify(errors);
          } else {
            return data.getTokens;
          }
        }
      } catch (e) {
        errorMessage = e.message;
      }
      throw new Error(errorMessage);
    });
};
/**
 * Verify if the provided auth code was already
 * used before for the exchange of tokens
 * @param {string} currentAuthCode actual auth code provided in the query params
 * @returns {boolean}
 */
const authCodeAlreadyUsed = (currentAuthCode) => {
  const authCode = window.localStorage.getItem(SSO_ACP_STORAGE_KEYS.AUTH_CODE);
  return currentAuthCode === authCode;
};
/**
 * Determines if the url query parameters are valid
 * @param {Object} queryParams query parameters
 * @property {string} params.redirectUri
 * @property {string} params.code
 * @returns {Object}
 */
const areValidQueryParams = ({
  code,
  redirectUri,
}) => {
  const areParamsValid = ![code, redirectUri].some(param => !param);
  return areParamsValid;
};
/**
 * Redirect to the redirectUri in case it is not provided
 * redirect to univision.com
 * @param {string} redirectUri redirect uri query param
 */
const redirect = (redirectUri) => {
  window.location.replace(redirectUri || 'https://univision.com');
};
/**
 * Retrieve the query parameters of the current url
 * @param {string} searchPath url search path
 * @returns {Object}
 */
const getQueryParams = (searchPath) => {
  const urlSearchParams = new URLSearchParams(searchPath);
  return {
    redirectUri: urlSearchParams.get('redirectUri'),
    code: urlSearchParams.get('code'),
  };
};
/**
 * Initiate the ACP(Authorization Code Propagation) flow in the client side
 * Extract query parameters
 * Request tokens using the Authorization Code
 * Store tokens and authorization code in the Local Storage
 * Navigates to the continuation URL
 */
const initiateAcpClientFlow = async () => {
  const searchPath = window.location.search;
  if (!searchPath) {
    redirect();
    return;
  }
  const queryParams = getQueryParams(searchPath.substring(1));
  const { redirectUri, code } = queryParams;
  if (!areValidQueryParams(queryParams) || authCodeAlreadyUsed(code)) {
    redirect(redirectUri);
    return;
  }
  try {
    const {
      accessToken,
      refreshToken,
      idToken,
      continuationUri,
    } = await requestTokens(queryParams);
    LocalStorage.set(SSO_ACP_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    LocalStorage.set(SSO_ACP_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    LocalStorage.set(SSO_ACP_STORAGE_KEYS.ID_TOKEN, idToken);
    LocalStorage.set(SSO_ACP_STORAGE_KEYS.AUTH_CODE, code);
    redirect(continuationUri);
  } catch (e) {
    redirect(redirectUri);
  }
};

export default initiateAcpClientFlow;

/**
 * Initialize the SSO ACP logic
 */
const init = () => {
  // eslint-disable-next-line babel/no-unused-expressions
  global?.window.addEventListener('load', initiateAcpClientFlow);
};

init();
