import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path } from 'svgs';

import {
  LIGHT_RED, SUNFLOWER, BLACK,
} from '@univision/fe-utilities/styled/constants';

/**
 * secondYellowCard component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const secondYellowCard = ({
  height,
  width,
  viewBox,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox={viewBox}
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd" strokeLinejoin="round" stroke={BLACK} strokeWidth="8">
      <Path fill={LIGHT_RED} d="M95.6463 34.0879l118.896.078.104 158.922-118.8961-.0779z" />
      <Path fill={SUNFLOWER} d="M95.6656 64.674l.0846 128.336 87.2444.057 3.2004 11.9123L71.33 235.6765l-41.2324-153.48 65.568-17.5226z" />
    </G>
  </Svg>
);

secondYellowCard.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default secondYellowCard;
