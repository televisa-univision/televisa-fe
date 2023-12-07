import { connect } from 'react-redux';
import getMatches from '@univision/fe-commons/dist/store/actions/deportes/matches-actions';
import { getWidgetById } from '@univision/fe-commons/dist/store/storeHelpers';
import { exists, getKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';

import matchesExtractor from '@univision/shared-components/dist/extractors/matchesExtractor';
import Matches from '.';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{matches: Object}}
 */
const mapStateToProps = (state, ownProps) => {
  const { settings } = ownProps;
  const widget = exists(settings.uid) && getWidgetById(state.page, settings.uid);
  const matches = getKey(widget, 'extraData', {});

  return {
    matches,
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {{getMatches: Function}}
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  const league = ownProps?.settings?.highlightedCompetitionSeasons || [];
  const isWorldCup = isValidArray(league) && league[0]?.soccerCompetition?.id === '4';

  return {
    getMatches: (query, prevData) => (
      dispatch(getMatches(ownProps, matchesExtractor, query, prevData))),
    isWorldCup,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches);
