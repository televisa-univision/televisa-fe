import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * twitter2 component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const twitterLegacy = ({
  fill,
  height,
  width,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox="0 0 1200 1227"
    className={className}
    style={style}
  >
    <Path
      fill={`${fill || BLACK}`}
      d="M714.2,519.3L1160.9,0H1055L667.1,450.9L357.3,0H0l468.5,681.8L0,1226.4h105.9l409.6-476.2l327.2,476.2H1200L714.2,519.3  L714.2,519.3z M569.2,687.8l-47.5-67.9L144,79.7h162.6l304.8,436l47.5,67.9l396.2,566.7H892.5L569.2,687.8L569.2,687.8z"
    />
  </Svg>
);

twitterLegacy.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default twitterLegacy;
