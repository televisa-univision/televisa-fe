import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReactions } from '../../store/slices/reactions/reactions-slice';
import { accessTokenSelector, userIdSelector } from '../../store/selectors/user-selectors';
import { pageDataSelector } from '../../store/selectors/page-selectors';
import gtmManager from '../../utils/tracking/googleTagManager/gtmManager';
import extractContentIds from '../../utils/helpers/extractContentIds';
import dfpManager from '../../utils/ads/dfpManager';

/**
 * Component to fetch page global data that requires an
 * user access token
 * @returns {Function}
 */
const ProtectedDataCollector = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(accessTokenSelector);
  const userId = useSelector(userIdSelector);
  const pageData = useSelector(pageDataSelector);

  /** Effect when user is ready */
  useEffect(() => {
    if (userId) {
      gtmManager.setUserId(userId);
      dfpManager.setWithUserId(userId);
    }
  }, [userId]);

  /** Effect for page data changes */
  useEffect(() => {
    if (!accessToken) return;

    dispatch(fetchReactions({ contentIds: extractContentIds({ data: pageData }) }));
  }, [dispatch, accessToken, pageData]);

  return null;
};

export default ProtectedDataCollector;
