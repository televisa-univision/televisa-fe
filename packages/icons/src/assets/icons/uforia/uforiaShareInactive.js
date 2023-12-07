import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { WHITE } from '@univision/fe-utilities/styled/constants';
import UforiaShareActive from './uforiaShareActive';

/**
 * uforiaShareInactive component
 * @param {Object} props - component props
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {string} stroke - stroke color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const uforiaShareInactive = (props) => {
  const {
    stroke,
    ...otherProps
  } = props;

  return (
    <UforiaShareActive
      stroke={`${stroke || WHITE}`}
      {...otherProps}
    />
  );
};

uforiaShareInactive.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  stroke: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default uforiaShareInactive;
