import { useSelector } from 'react-redux';
import { reactionsTotalSelector } from '../store/selectors/reactions-selectors';
import { isValidFunction } from '../utils/helpers';
import { userReactionSelectorCreator } from '../store/selectors/user-selectors';

/**
 * Gets the total reactions count hook per content id.
 * Will reset to 0 if actionBar is disabled
 * @param {Object} options - options to be used
 * @property {string} options.uid - id of the content to be retrieved
 * @property {boolean} options.hasActionBar - flag to know if the action bar has been enabled or not
 * @property {function} options.formatter - formatter method to transform the integer
 * into a formatted string
 * @returns {integer} total count, defaults to 0
 */
export default ({ uid, hasActionBar, formatter }) => {
  // This builds a selector with the specific content uid
  const totalSelector = reactionsTotalSelector(uid);
  const userReactionSelector = userReactionSelectorCreator(uid);
  /**
   * These hooks have to be called outside a conditional.
   * More info here:
   * https://reactjs.org/docs/hooks-rules.html
   */
  const totalReactions = useSelector(totalSelector);
  const isReactionSelected = useSelector(userReactionSelector);

  if (!hasActionBar) return 0;

  return isValidFunction(formatter)
    ? formatter({ totalReactions, isReactionSelected }) : totalReactions;
};
