import { connect } from 'react-redux';
import { getAllEvents } from '@univision/fe-commons/dist/store/actions/tvguide/all-actions';
import { getKey, isEqual } from '@univision/fe-commons/dist/utils/helpers';
import agendaActionDefinition from '../../../utils/helpers/tvGuide/agendaActionDefinition';
import TvGuide from '.';

/**
 * Helper to register and validate actions
 * @returns {Array}
 */
const registerActions = () => {
  const actions = [];
  if (agendaActionDefinition.action()) {
    actions.push(agendaActionDefinition.action);
  }
  return actions;
};

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{standings: Object}}
 */
const mapStateToProps = (state, ownProps) => {
  return {
    ...getKey(state, 'tvGuide', {}),
    ...ownProps,
    events: getKey(state, 'tvGuide.events'),
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {{matches: Array}}
 */
const mapDispatchToProps = (dispatch) => {
  return ({
    getAllEvents: () => {
      return dispatch(getAllEvents(registerActions()));
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
)(TvGuide);

export {
  connector as default,
  mapDispatchToProps,
  mapStateToProps,
  areStatePropsEqual,
  registerActions,
};
