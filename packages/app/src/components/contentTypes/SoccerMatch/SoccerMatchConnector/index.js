import { connect } from 'react-redux';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import { extractEventStatus } from '@univision/fe-deportes/dist/utils/helpers';
import addSoccerMatchWidgets from '@univision/fe-deportes/dist/utils/layoutWidgets/matchCenter/addSoccerMatchWidgets';
import getEventStatus from '@univision/fe-commons/dist/store/actions/deportes/eventsStatus-actions';
import { pageSelector, languageSelector, userLocationSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { getWidgetIndexByType } from '@univision/fe-commons/dist/store/storeHelpers';
import { DEPORTES_CARD_PLAY_BY_PLAY } from '@univision/fe-commons/dist/constants/widgetTypes';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import features from '@univision/fe-commons/dist/config/features';

import SoccerMatchContainer from '../SoccerMatchContainer';

/**
 * Connector to be called when state change
 * The `pageCategory` for tudn is based on match status to
 * update the widgets/content, as well we have widget per status
 * so we need to check the stats to get updated widgets/category
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{matches: Object}}
 */
export const mapStateToProps = (state) => {
  const page = pageSelector(state);
  const { data, pageCategory } = { ...page };
  let commentaryEvents = [];
  if (features.deportes.showCuepoints(state)) {
    const widgetIndex = getWidgetIndexByType(data, DEPORTES_CARD_PLAY_BY_PLAY);
    commentaryEvents = getKey(data, ['widgets', widgetIndex, 'extraData', 'events'], []);
  }

  return {
    commentaryEvents,
    hideMatchCenterNav: features.deportes.hideMatchCenterNav(state),
    pageCategory: pageCategory || pageCategories.SOCCER_MATCH_PRE,
    pageData: data || {},
    language: languageSelector(state),
    userLocation: userLocationSelector(state),
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {{getMatches: Function}}
 */
export const mapDispatchToProps = (dispatch) => {
  return {
    getStatus: () => dispatch(getEventStatus(addSoccerMatchWidgets, extractEventStatus)),
  };
};

/**
 * Check to mount only when page category change
 * ****** DO NOT DELETE ******
 * Without this break there will be infinite loops
 * because other components affecting the Store
 * @param {Object} nextProps to be applied
 * @param {Object} prevProps to be applied
 * @returns {boolean}
 */
export const areStatePropsEqual = (nextProps, prevProps) => {
  return (
    nextProps.pageCategory === prevProps.pageCategory
    && nextProps.commentaryEvents?.length === prevProps.commentaryEvents?.length
    && nextProps.pageData === prevProps.pageData
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: true,
    areStatePropsEqual,
  },
)(SoccerMatchContainer);
