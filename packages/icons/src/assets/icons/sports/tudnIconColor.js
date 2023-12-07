import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { GOSSAMER } from '@univision/fe-utilities/styled/constants';

import TudnIcon from './tudnIcon';

/**
 * tudnIconColor component
 * @param {Object} props - props of the component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const tudnIconColor = (props) => {
  const {
    fill,
    ...otherProps
  } = props;

  return (
    <TudnIcon {...otherProps} fill={`${fill || GOSSAMER}`} />
  );
};

tudnIconColor.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default tudnIconColor;
