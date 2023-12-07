import { connect } from 'react-redux';
import getMatches from '@univision/fe-commons/dist/store/actions/deportes/matches-actions';
import getAllEvents from '@univision/fe-commons/dist/store/actions/deportes/soccerlive-actions';

import { getWidgetById } from '@univision/fe-commons/dist/store/storeHelpers';
import getKey from '@univision/fe-utilities/helpers/object/getKey';

import matchesExtractor from '@univision/shared-components/dist/extractors/matchesExtractor';
import Matches from '.';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{matches: Object}}
 */
const mapStateToProps = (state, ownProps) => {
  const { settings = {} } = ownProps;
  const widget = settings?.uid && getWidgetById(state.page, settings.uid);
  const matches = getKey(widget, 'extraData', {});

  return {
    matches: {
      ...matches,
      ready: !!matches?.ready,
    },
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {{getMatches: Function}}
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMatches: (query, prevData) => (
      dispatch(getMatches(ownProps, matchesExtractor, query, prevData))
    ),
    getAllEvents: () => {
      return dispatch(getAllEvents(ownProps, matchesExtractor));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches);
