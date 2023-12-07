import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * aquarius icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const aquarius = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M24.54 200.635l.03.03-.565.57c-3.34 3.375-8.76 3.375-12.105 0-3.345-3.375-3.335-8.83 0-12.2l36.735-37.12c1.605-1.625 3.78-2.535 6.055-2.535s4.45.91 6.05 2.535l30.685 31.01 30.715-31.01c1.605-1.625 3.78-2.535 6.055-2.535s4.45.91 6.05 2.535l30.685 31.01 30.715-31.01c1.605-1.625 3.78-2.535 6.055-2.535s4.45.91 6.055 2.535l36.795 37.255c2.745 3.335 2.525 8.355-.58 11.505-3.13 3.175-8.11 3.39-11.64.445l-30.63-30.905-30.68 30.98c-1.605 1.625-3.78 2.535-6.055 2.535s-4.45-.91-6.05-2.53L128.2 170.22 97.55 201.2c-1.605 1.625-3.78 2.535-6.055 2.535s-4.45-.91-6.05-2.53l-30.75-30.985-30.15 30.415h-.005zm0-96.77l.03.03-.565.57c-3.34 3.375-8.76 3.375-12.105 0-3.345-3.375-3.335-8.83 0-12.2l36.735-37.12c1.605-1.625 3.78-2.535 6.055-2.535s4.45.91 6.05 2.535l30.685 31.01 30.715-31.01c1.605-1.625 3.78-2.535 6.055-2.535s4.45.91 6.05 2.535l30.685 31.01 30.715-31.01c1.605-1.625 3.78-2.535 6.055-2.535s4.45.91 6.055 2.535L244.55 92.4c2.745 3.335 2.525 8.355-.58 11.505-3.13 3.175-8.11 3.39-11.64.445L201.7 73.415l-30.685 31.01c-1.605 1.625-3.78 2.535-6.055 2.535s-4.45-.91-6.05-2.535l-30.715-31.01-30.65 31.01c-1.605 1.625-3.78 2.535-6.055 2.535s-4.45-.91-6.05-2.53L54.695 73.415l-30.15 30.445-.005.005z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

aquarius.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default aquarius;
