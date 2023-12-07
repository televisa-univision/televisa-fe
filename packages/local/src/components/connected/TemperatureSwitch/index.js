import { connect } from 'react-redux';
import { setIsCelsiusDisabled, setIsCelsiusActive } from '@univision/fe-commons/dist/store/actions/local/local-actions';
import { localSelector } from '@univision/fe-commons/dist/store/selectors/local-selectors';

import TemperatureSwitch from './TemperatureSwitch';

/**
 * Connector to subscribe to local market
 * @param {Object} state of the page
 * @returns {Object}
 */
const mapStateToProps = (state) => {
  const {
    isCelsius,
  } = localSelector(state);

  return {
    isCelsius,
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {Object}
 */
export const mapDispatchToProps = {
  setIsCelsiusActive,
  setIsCelsiusDisabled,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TemperatureSwitch);
