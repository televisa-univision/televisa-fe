import { connect } from 'react-redux';
import {
  getWidgetById,
  getWidgetIndexByType,
} from '@univision/fe-commons/dist/store/storeHelpers';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import {
  getKey,
  isEqual,
} from '@univision/fe-commons/dist/utils/helpers';
import { DEPORTES_SCORE_CELLS } from '@univision/fe-commons/dist/constants/widgetTypes';
import getScheduleEvent from '@univision/fe-commons/dist/store/actions/deportes/scheduleResults-actions';
import matchCenterExtractor
  from '@univision/shared-components/dist/extractors/matchCenterExtractor';
import { getMatchData, getFetchedMatch } from './scoreCardUtils';
import SquareScoreCard from '.';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{matches: Array}}
 */
const mapStateToProps = (state, ownProps) => {
  const { matchId, widgetContext, uid } = ownProps;
  const widgetIndex = getWidgetIndexByType(state.page.data, DEPORTES_SCORE_CELLS);
  const matches = getKey(state.page.data, ['widgets', widgetIndex], {});
  const matchData = getMatchData(matches, matchId);
  const shouldFetchMatch = !isValidObject(matchData) && isValidValue(matchId);
  const widget = getWidgetById(state.page, widgetContext.id);
  const contents = getKey(widget, 'contents', []);
  const fetchedMatch = shouldFetchMatch
    ? getFetchedMatch(contents, uid) : {};
  return {
    matchData,
    fetchedMatch,
    shouldFetchMatch,
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
    getMatch: (matchId, options) => (
      dispatch(getScheduleEvent(ownProps, matchCenterExtractor, matchId, options))
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
  return isEqual(nextProps, prevProps);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    areStatePropsEqual,
  }
)(SquareScoreCard);
