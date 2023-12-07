import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

import Svg, { G, Path } from 'svgs';

/**
 * heartWithFill component
 * @param {size} size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {style} style - style override
 * @returns {JSX}
 */
const heartWithFill = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} className={className} viewBox={viewBox} style={style}>
    <G fill="none" fillRule="evenodd">
      <Path d="M-32-42h256v256H-32z" />
      <Path
        d="M137 1c-16 0-31 8-41 19v1-1A58 58 0 0053 1C38 1 25 6 15 15 6 25 0 38 0 52c0 11 3 22 10 33l1 3c10 16 21 27 57 58l28 25 23-20c42-37 53-48 63-65 7-12 10-23 10-34 0-14-6-27-15-37-10-9-23-14-38-14h-2z"
        fill={fill || BLACK}
      />
    </G>
  </Svg>
);

/**
 * heartWithFill props
 * @param {string} props.className - modifier class name
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
heartWithFill.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default heartWithFill;
