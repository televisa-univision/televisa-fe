import { createSelector } from 'reselect';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import { USER_ID } from '../../constants/personalization';
import localStorage from '../../utils/helpers/LocalStorage';

/**
 * Get state data from the store
 * @private
 * @param {Object} state store instance or state data
 * @returns {Object} state data
 */
const getState = (state) => {
  if (!isValidObject(state)) {
    return state;
  }
  return isValidFunction(state.getState) ? state.getState() : state;
};

/**
 * Get input selector to get state data based on key path
 * @private
 * @param {string} keyPath - state key path to get value
 * @param {*} fallbackValue - value if the key return undefined/null
 * @returns {Function} input selector
 */
const getStateKey = (keyPath, fallbackValue) => {
  return state => getKey(getState(state), keyPath, fallbackValue);
};

/**
 * Get user object from store
 * @param {Object} state redux state
 * @returns {Object} current user
 */
export const userSelector = createSelector(getState, state => getKey(state, 'user', {}));

/**
 * Get user object from store
 * @param {Object} state redux state
 * @returns {Object} current user
 */
export const userLocationSelector = createSelector(getStateKey('user.location.data'), locationData => locationData);

/**
 * Get user access token from store
 * @param {Object} state redux state
 * @returns {Object} current user
 */
export const accessTokenSelector = state => getKey(state, 'user.accessToken', null);

/**
 * Get user id from store
 * @param {Object} state redux state
 * @returns {string} current user
 */
export const userIdSelector = state => getKey(state, 'user.sub', null) || localStorage.getObject(USER_ID)?.univision_user_id;

/**
 * Gets card data from horoscopes user favorites
 * @returns {Array} current personalized card data for horoscopes
 */
export const horoscopesCardDataSelector = createSelector(
  userSelector,
  user => getKey(user, 'horoscopes.cardsData')
);

/**
 * Gets all reactions data from the store
 * @returns {Object} current user reactions data
 */
export const userReactionsSelector = createSelector(
  userSelector,
  user => getKey(user, 'reactions.byId')
);

/**
 * Get contentId from ownProps component
 * @param {Object} _ redux state
 * @param {Object} ownProps component ownProps
 * @returns {Object} contentId from props
 */
export const contentIdSelector = (_, { contentId }) => contentId;

/**
 * Gets a user reaction from an specific contentId. To be used with a connector component with props
 * we need a selector creator in order to avoid memo invalidation
 * from the same component check https://github.com/reduxjs/reselect#sharing-selectors-with-props-across-multiple-component-instances
 * @param {Object} state current redux state
 * @param {string} contentId content id to find
 * @returns {func}
 */
export const makeUserReactionByIdSelector = () => createSelector(
  [userReactionsSelector, contentIdSelector],
  (reactions, contentId) => getKey(reactions, `${contentId}.reaction`),
);

/**
 * Gets a user reaction from an specific contentId. To be used with useSelector hook
 * @param {string} contentId content id to find
 * @returns {Object}
 */
export const userReactionSelectorCreator = contentId => (
  state => getKey(state, `user.reactions.byId.${contentId}.reaction`)
);
