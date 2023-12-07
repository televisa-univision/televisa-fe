import { connect } from 'react-redux';
import { getKey, isEqual } from '@univision/fe-commons/dist/utils/helpers';
import getAllEvents from '@univision/fe-commons/dist/store/actions/deportes/soccerlive-actions';
import matchesExtractor from '@univision/shared-components/dist/extractors/matchesExtractor';

import SoccerLive from '.';
import selectSoccerLiveEvenData from './SoccerLiveSelector';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{standings: Object}}
 */
const mapStateToProps = (state, ownProps) => {
  const { settings } = ownProps;
  if (settings.uid) {
    return selectSoccerLiveEvenData(settings.uid, state);
  }
  return {
    eventGroups: [],
    ready: false,
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {{matches: Array}}
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    getAllEvents: () => {
      return dispatch(getAllEvents(ownProps, matchesExtractor));
    },
  });
};

/**
 * Check if shouldn't set new props if the data is equal or the previous
 * data is not a error
 * @param {Object} nextProps the new prop data
 * @param {Object} prevProps the previous prop data
 * @returns {boolean}
 */
const areStatePropsEqual = (nextProps, prevProps) => {
  const nextFlag = getKey(nextProps, 'ready');
  const prevFlag = getKey(prevProps, 'ready');
  // should returns false to re-render;
  return isEqual(nextFlag, prevFlag) && !nextProps.ready;
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: true,
    areStatePropsEqual,
  }
)(SoccerLive);

export {
  connector as default,
  mapDispatchToProps,
  mapStateToProps,
  areStatePropsEqual,
};
