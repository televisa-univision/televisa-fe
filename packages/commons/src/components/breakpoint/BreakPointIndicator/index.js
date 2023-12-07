import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import BreakPoint from '../../../utils/breakpoint/breakPointMediator';
import breakPointList from '../../../config/breakPointList';
import { getCurrentBreakPoint } from '../../../utils/helpers';
import { setCurrentBreakPoint } from '../../../store/actions/page-actions';

import Styles from './BreakPointIndicator.styles';

const Indicator = styled.div`${Styles.indicator}`;

/**
 * BreakPoints helper
 * @access public
 * @extends {React.Component}
 */
class BKPIndicator extends React.Component {
  /**
   * Constructor
   * @param {Object} props React Props for this component
   * @constructor
   */
  constructor(props) {
    super(props);
    const { device, value } = props;
    this.device = device;
    this.value = value;
  }

  /**
   * Get breakpoint value from component DOM
   */
  componentDidMount() {
    const bkValue = getCurrentBreakPoint();
    const { setCurrentBreakPoint: getBreakPointValues } = this.props;
    getBreakPointValues(bkValue);
    this.value = this.value || BreakPoint.getValue();
  }

  /**
   * gets breakpoint value from scss pseudo-element content prop
   * @returns {string}
   */
  getValue() {
    return this.value;
  }

  /**
   * determines optimal breakpoint value for given device
   * @param {string} device current device
   * @returns {string}
   */
  getValueFromDevice(device = this.device) {
    if (this.value && !device) {
      return this.value;
    }
    const result = Object.values(breakPointList).find((prop) => {
      const bpDevice = prop[2]; // Device
      return bpDevice === (device || 'mobile');
    });
    return result[0];
  }

  /**
   * Div helper to include breakpoint value using media queries
   * using local styles
   * @returns {JSX}
   */
  render() {
    const { className } = this.props;
    return (
      <Indicator className={className} data-element-name="bkp-indicator">
        {`${BreakPoint.getValue()}: ${BreakPoint.getWidth()}px`}
      </Indicator>
    );
  }
}

/**
 * propTypes
 * @property {String} className to override the class name where the BPs are set
 */
BKPIndicator.propTypes = {
  className: PropTypes.string,
  device: PropTypes.string,
  value: PropTypes.string,
  setCurrentBreakPoint: PropTypes.func,
};

/**
 * map app state to local props
 * @param  {Object} page reducer object
 * @returns {Object} the props to inject to the component
 */
const mapStateToProps = ({ page }) => ({
  page,
});

/**
 * map app state to local props
 * @param  {function} dispatch redux action
 * @returns {Object} the actions to inject to the component
 */
const mapDispatchToProps = dispatch => ({
  setCurrentBreakPoint: value => dispatch(setCurrentBreakPoint(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BKPIndicator);
