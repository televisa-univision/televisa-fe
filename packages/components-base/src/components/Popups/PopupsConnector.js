import { connect } from 'react-redux';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';

import PopupsWrapper from './PopupsWrapper';

/**
 * Connector to subscribe on popups store changes
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{popups: Object}}
 */
const mapStateToProps = (state, ownProps) => {
  return {
    popups: getKey(state, 'popups.list', getKey(ownProps, 'popups')),
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @returns {{getMatches: Function}}
 */
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopupsWrapper);
