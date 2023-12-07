import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import features from '../../../config/features';
import fetchApi, { fetchSportApi } from '../../../utils/api/fetchApi';
import { mergeWidgets } from '../../storeHelpers';
import setPageData from '../page-actions';
import { clientLevelLogging } from '../../../utils/logging/clientLogging';
import { loggingLevels } from '../../../utils/logging/loggingLevels';
import { PAGE_API_ERROR } from '../../../constants/messages';
import {
  OPTA_STATUS,
  CMS_STATUS,
} from '../../../constants/matchStatus';
import {
  configSelector,
  pageSelector,
  pageCategorySelector,
} from '../../selectors/page-selectors';
import {
  getMatchPageCategory,
} from '../../../utils/helpers/taxonomy/matchers/custom/soccer';

/**
 * Get & store soccer events data
 * @param {function} getWidgetsMap - to get match/event widgets by page category/event status
 * @param {function} extractor - to get/extract match/event status in Opta/Cms format
 * @returns {Object}
 */
export default function getEventStatus(getWidgetsMap, extractor) {
  return async (dispatch, getState) => {
    const state = getState();
    const pageData = pageSelector(state);

    if (!isValidObject(pageData?.data) || !isValidFunction(extractor)) {
      return;
    }
    const { data } = pageData;
    const { matchId, soccerMatchStatus, eventStatus } = data;
    // Get soccer events
    const config = configSelector(state);
    let response = {};
    let fetchedData = {};

    try {
      if (isValidValue(matchId)) {
        response = await fetchSportApi({
          uri: `/v1/schedule-results/soccer/${matchId}`,
          proxyUri: config?.proxy,
        });
      } else {
        fetchedData = await fetchApi({
          url: data?.uri,
          env: config?.apiEnv,
        });
      }
    } catch (error) {
      clientLevelLogging({
        error,
        info: `${PAGE_API_ERROR} fetch API rejected`,
        level: loggingLevels.warn,
      });
      throw error;
    }

    let { optaStatus, cmsStatus = soccerMatchStatus } = extractor(response, fetchedData) || {};
    if (features.video.isEnableSoccerGame()) {
      optaStatus = OPTA_STATUS.MID_EVENT;
      cmsStatus = CMS_STATUS.LIVE_MATCH;
    }

    const pageCategory = getMatchPageCategory(cmsStatus);

    if (pageCategory !== pageCategorySelector(state)
        || eventStatus !== optaStatus) {
      let nextWidgets = [];
      if (isValidFunction(getWidgetsMap)) {
        nextWidgets = getWidgetsMap(data, pageCategory);
      }
      const prevWidgets = getKey(data, 'widgets', []);
      const newData = {
        ...pageData,
        // Needed for subnav
        pageCategory,
        data: {
          ...pageData.data,
          // Needed for subnav and update flag
          soccerMatchStatus: cmsStatus,
          // Needed for video player
          eventStatus: optaStatus,
          // Needed for layout
          widgets: mergeWidgets(nextWidgets, prevWidgets),
          // for ending streams via bex
          streamEndTime: fetchedData?.streamEndTime,
          streamStartTime: fetchedData?.streamStartTime,
        },
      };
      dispatch(setPageData(newData));
    }
  };
}
