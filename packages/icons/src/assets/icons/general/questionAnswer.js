import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * questionAnswer component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const questionAnswer = ({
  width, height, fill, className, style, viewBox,
}) => (
  <Svg
    viewBox={viewBox}
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h256v256H0z" />
      <Path
        d="M213.333 64h-10.666v85.333c0 5.867-4.8 10.667-10.667 10.667H64v10.667C64 182.4 73.6 192 85.333 192H192l42.667 42.667V85.333c0-11.733-9.6-21.333-21.334-21.333zm-32 53.333V42.667c0-11.734-9.6-21.334-21.333-21.334H42.667c-11.734 0-21.334 9.6-21.334 21.334v138.666L64 138.667h96c11.733 0 21.333-9.6 21.333-21.334z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

questionAnswer.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default questionAnswer;
