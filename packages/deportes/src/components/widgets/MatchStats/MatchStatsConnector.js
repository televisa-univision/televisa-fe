import { connect } from 'react-redux';
import getStats from '@univision/fe-commons/dist/store/actions/deportes/stats-actions';
import { getWidgetById } from '@univision/fe-commons/dist/store/storeHelpers';
import { exists, isEqual } from '@univision/fe-commons/dist/utils/helpers';

import matchStatsExtractor from './MatchStatsExtractorOne';
import MatchStats from '.';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{matches: Array}}
 */
const mapStateToProps = (state, ownProps) => {
  const { settings } = ownProps;
  if (exists(settings.uid)) {
    const id = settings.uid;
    const widget = getWidgetById(state.page, id);
    if (widget && exists(widget.extraData)) {
      return widget.extraData;
    }
  }
  return {};
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {Object}
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return { getMatchStats: () => dispatch(getStats(ownProps, matchStatsExtractor)) };
};

/**
 * Check if shouldn't set new props if the data is equal or the previous
 * data is not a error
 * @param {Object} nextProps the new prop data
 * @param {Object} prevProps the previous prop data
 * @returns {boolean}
 */
const areStatePropsEqual = (nextProps, prevProps) => {
  return (nextProps.error && !prevProps.error) || isEqual(nextProps, prevProps);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: true,
    areStatePropsEqual,
  }
)(MatchStats);
