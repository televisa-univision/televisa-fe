import { hasKey, getKey } from '../../../utils/helpers';
import { fetchSportApi } from '../../../utils/api/fetchApi';
import { setWidgetExtraData } from '../page-actions';
import { proxySelector } from '../../selectors/page-selectors';

/**
 * Get & store pre match data
 * @param {Object} widgetData of the widget
 * @param {Object} extractor for the data
 * @returns {Object}
 */
export default function getLineup(widgetData, extractor) {
  const settings = getKey(widgetData, 'settings', {});
  const matchId = getKey(settings, 'matchId', '');

  return async (dispatch, getState) => {
    try {
      // get pre match data
      const state = getState();
      const proxyUri = proxySelector(state);
      const response = await fetchSportApi({
        uri: `/v1/stats/soccer/${matchId}`,
        proxyUri,
      });

      if (!settings.uid) {
        return;
      }
      if (hasKey(response, 'sports-content')) {
        const extractorData = extractor(response);
        dispatch(setWidgetExtraData(settings.uid, extractorData));
      } else {
        dispatch(setWidgetExtraData(settings.uid, { error: response || true }));
      }
    } catch (error) {
      if (hasKey(error, 'response.status')) {
        // Client side fetch
        error.statusCode = error.response.status;
      }
      dispatch(setWidgetExtraData(settings.uid, { error }));
    }
  };
}
