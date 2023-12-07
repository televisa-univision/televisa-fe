import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * playcircle component
 * @param {string} className - component's container className
 * @param {string} fill - icon fill modifier
 * @param {number} height - px height for icon
 * @param {style} style - style override
 * @param {string} viewBox - viewBox
 * @param {number} width - px width for icon
 * @returns {JSX}
 */
const playcircle = ({
  className, fill, height, style, viewBox, width,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <G fill="none" fillRule="evenodd">
      <Path
        fill={`${fill || BLACK}`}
        d="M248 128C248 61.726 194.274 8 128 8S8 61.726 8 128s53.726 120 120 120 120-53.726 120-120zm8 0c0 70.692-57.308 128-128 128C57.308 256 0 198.692 0 128 0 57.308 57.308 0 128 0c70.692 0 128 57.308 128 128zM104 88l72 39.998L104 168V88z"
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

/**
 * playcircle props
 * @property {string} className - component's container className
 * @property {string} fill - fill color, default: svg file color
 * @property {number} height - px height for icon
 * @property {Object} style - Modifier class
 * @property {string} viewBox - viewBox size, default: 0 0 256 256
 * @property {number} width - px width for icon
 */
playcircle.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default playcircle;
