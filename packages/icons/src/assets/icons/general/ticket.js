import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * ticket icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const ticket = ({
  width, height, fill, viewBox, className, style, stroke,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={`${fill || 'none'}`}
      stroke={`${stroke || BLACK}`}
      d="M6 3.5v9M1.5 10.45a.4935.4935 0 0 1 .4-.4875 2.0062 2.0062 0 0 0 0-3.925.4937.4937 0 0 1-.4-.4875V4a.5.5 0 0 1 .5-.5h12a.5002.5002 0 0 1 .5.5v1.55a.4942.4942 0 0 1-.4.4875A2.006 2.006 0 0 0 12.5105 8 2.006 2.006 0 0 0 14.1 9.9625a.494.494 0 0 1 .4.4875V12a.5004.5004 0 0 1-.1464.3536A.5004.5004 0 0 1 14 12.5H2a.5003.5003 0 0 1-.5-.5v-1.55Z"
    />
  </Svg>
);

ticket.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
  stroke: PropTypes.string,
};

export default ticket;
