// TODO: We can not use this import because it create an infinite number of
// circular references. Due that reason we are passing the reset anonymous
// user action as parameter in the payload of the watched actions
// After the removal of every usage of the Store in util/helpers/index
// we could include this import and remove the usage of that parameter
// import {
//   restartAnonymousUser,
// } from '../slices/user/user-actions';
import { GRAPHQL } from '../../constants/errors';
import { GRAPHQL_SERVICE_ERROR } from '../../constants/messages';

/**
 * Listen for USER_NOT_FOUND error to determines if the user needs to be created again.
 * This error use to happen when you fetch GraphQL with and accessToken of another
 * environment.
 * @param {Object} store redux store
 * @param {Object} next dispatch function
 * @param {Object} action to dispatch
 * @property {Object} action.error an Error object
 * @property {string} action.error.name name of the error expected to be USER_NOT_FOUND
 * @property {string} action.error.message a json string containing an array of GraphQL errors
 * @property {Object} action.meta.arg.restartAction the action restartAnonymousUser as parameter
 * @returns {Function}
 */
export const userNotFound = store => next => (action) => {
  const { error, meta } = action || {};
  const { restartAction } = meta?.arg || {};

  if (error?.name === GRAPHQL_SERVICE_ERROR) {
    try {
      const errors = JSON.parse(error?.message);
      if (Array.isArray(errors)) {
        const hasUserNotFoundError = errors.some(
          e => e?.extensions?.code === GRAPHQL.USER_NOT_FOUND
        );
        if (hasUserNotFoundError && restartAction) {
          const nextAction = next(action);
          restartAction()(store.dispatch, store.getState);
          return nextAction;
        }
      } else {
        throw new Error(`Invalid error format for a ${GRAPHQL_SERVICE_ERROR}`);
      }
    } catch (err) {
      // TODO: After Store dependency get removed from utils/helpers/index.js
      // We will be able to use clientLogging here because actually it creates
      // a circular dependency.
      // clientLogging(err, 'userNotFound ReduxMiddleware');
    }
  }

  return next(action);
};

export default userNotFound;
