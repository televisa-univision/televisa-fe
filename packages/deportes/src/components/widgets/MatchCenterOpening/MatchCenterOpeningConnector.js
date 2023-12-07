import { connect } from 'react-redux';

import getScheduleEvent from '@univision/fe-commons/dist/store/actions/deportes/scheduleResults-actions';
import { getWidgetById } from '@univision/fe-commons/dist/store/storeHelpers';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isEqual from '@univision/fe-utilities/helpers/common/isEqual';
import { userLocationSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';

import matchCenterExtractor from '@univision/shared-components/dist/extractors/matchCenterExtractor';
import MatchCenterOpening from '.';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{match: Object}}
 */
const mapStateToProps = (state, ownProps) => {
  const { settings } = ownProps;
  const widget = settings.uid && getWidgetById(state.page, settings.uid);
  const match = getKey(widget, 'extraData', {});
  const newSettings = getKey(widget, 'settings', settings);

  return {
    match,
    settings: newSettings,
    pageCategory: state.page?.pageCategory,
    userLocation: userLocationSelector(state),
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {{getMatch: Function}}
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMatch: matchId => (
      dispatch(getScheduleEvent(ownProps, matchCenterExtractor, matchId))
    ),
  };
};

/**
 * Check if shouldn't set new props if the data is equal or the previous
 * data is not a error
 * @param {Object} nextProps the new prop data
 * @param {Object} prevProps the previous prop data
 * @returns {boolean}
 */
const areStatePropsEqual = (nextProps, prevProps) => {
  const nextData = getKey(nextProps, 'match', {});
  const prevData = getKey(prevProps, 'match', {});

  return (nextData.error && !prevData.error) || isEqual(nextProps, prevProps);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: true,
    areStatePropsEqual,
  }
)(MatchCenterOpening);
