import { createSelector } from 'reselect';
import { getKey } from '../../utils/helpers';

/**
 * Get reaction object from store
 * @param {Object} state redux state
 * @returns {Object} current user
 */
export const reactionsSelector = state => state?.reactions ?? {};

/**
 * Get contentId from ownProps component
 * @param {Object} state redux state
 * @param {Object} ownProps component ownProps
 * @returns {Object} contentId from props
 */
const contentIdSelector = (state, { contentId }) => contentId;

/**
 * Gets reactions counts from an specific contentId
 * we need a selector creator in order to avoid memo invalidation
 * from the same component check https://github.com/reduxjs/reselect#sharing-selectors-with-props-across-multiple-component-instances
 * @param {Object} state redux state
 * @param {string} contentId content id to find
 * @returns {function}
 */
export const makeReactionsByIdSelector = () => createSelector(
  [reactionsSelector, contentIdSelector],
  (reactions, contentId) => getKey(reactions, `byId.${contentId}.counts`, []),
);

/**
 * Gets total reactions count from an specific contentId
 * @param {string} contentId content id to be found
 * @returns {int}
 */
export const reactionsTotalSelector = (contentId) => {
  const reactionsByIdSelector = makeReactionsByIdSelector();
  return createSelector(
    state => reactionsByIdSelector(state, { contentId }),
    reactions => reactions.reduce((acc, cur) => acc + cur.count, 0)
  );
};
