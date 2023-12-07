import { connect } from 'react-redux';
import getStats from '@univision/fe-commons/dist/store/actions/deportes/stats-actions';
import { getWidgetById } from '@univision/fe-commons/dist/store/storeHelpers';
import { exists, getKey, isEqual } from '@univision/fe-commons/dist/utils/helpers';
import matchSummaryExtractor from '@univision/shared-components/dist/extractors/summaryMatchExtractor';
import MatchSummary from '.';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{standings: Object}}
 */
const mapStateToProps = (state, ownProps) => {
  const { settings } = ownProps;
  const widget = exists(settings.uid) && getWidgetById(state.page, settings.uid);
  let data = {};

  if (widget) {
    data = widget.extraData;
  }
  return {
    data,
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {{matches: Array}}
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return { getSummary: () => dispatch(getStats(ownProps, matchSummaryExtractor)) };
};

/**
 * Check if shouldn't set new props if the data is equal or the previous
 * data is not a error
 * @param {Object} nextProps the new prop data
 * @param {Object} prevProps the previous prop data
 * @returns {boolean}
 */
const areStatePropsEqual = (nextProps, prevProps) => {
  const nextData = getKey(nextProps, 'data');
  const prevData = getKey(prevProps, 'data');

  return !nextData || (nextData?.error && !prevData?.error) || isEqual(nextData, prevData);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: true,
    areStatePropsEqual,
  }
)(MatchSummary);
