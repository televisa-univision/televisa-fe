import { connect } from 'react-redux';

import getEvents from '@univision/fe-commons/dist/store/actions/deportes/events-actions';
import playByPlayExtractor from '@univision/shared-components/dist/extractors/playByPlayExtractor';
import { getWidgetById } from '@univision/fe-commons/dist/store/storeHelpers';
import {
  exists, getKey, isEqual, isValidArray,
} from '@univision/fe-commons/dist/utils/helpers';

import { getMatchCMSStatus } from '../../../utils/helpers';
import PlayByPlay from '.';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{matches: Object}}
 */
const mapStateToProps = (state, ownProps) => {
  const { settings } = ownProps;
  const widget = exists(settings.matchId) && getWidgetById(state.page, settings.uid);
  const eventStatus = getKey(widget, 'extraData.eventStatus', null);
  const activeGame = getMatchCMSStatus(eventStatus) === 'LIVE';

  return {
    events: getKey(widget, 'extraData.events', []),
    activeGame,
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
    getEvents: () => dispatch(getEvents(ownProps, playByPlayExtractor)),
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
  const nextData = getKey(nextProps, 'events', []);
  const prevData = getKey(prevProps, 'events', []);

  return (
    (!isValidArray(nextData) && isValidArray(prevData))
    || (nextProps.activeGame === prevProps.activeGame && isEqual(nextData, prevData))
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: true,
    areStatePropsEqual,
  }
)(PlayByPlay);
