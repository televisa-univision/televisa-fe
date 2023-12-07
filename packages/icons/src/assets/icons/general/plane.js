import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, G, Path } from 'svgs';

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
    <G fill="none" fillRule="evenodd">
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${fill || 'none'}`}
        stroke={`${stroke || BLACK}`}
        d="M17.8,17.62l6.79,3.55l0.83,0.96l1.49-1.28l-0.95-1.11c-0.08-0.1-0.18-0.17-0.29-0.23L20,16.54l1.86-1.6 l8.39,1.56l0.69,0.85l1.53-1.24l-0.92-1.13c-0.15-0.18-0.35-0.3-0.58-0.35l-9.21-1.72c-0.29-0.05-0.59,0.03-0.82,0.22L17.62,16 c-0.25,0.21-0.37,0.53-0.34,0.86C17.32,17.18,17.51,17.46,17.8,17.62z"
      />
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${fill || 'none'}`}
        stroke={`${stroke || BLACK}`}
        d="M46.22,11.99L46.22,11.99c-1.4-1.63-3.87-1.82-5.5-0.42L22.81,26.92c-0.84-0.11-3.12-0.49-5.17-0.86 c-0.29-0.05-0.59,0.03-0.81,0.22l-2.22,1.9c-0.23,0.2-0.35,0.49-0.34,0.79c0.01,0.3,0.16,0.58,0.4,0.76l4.28,3.11 c-0.19,0.7-0.26,1.62,0.42,2.42c0.54,0.63,1.78,1.54,4.1,0.64c1.44-0.56,2.66-1.55,3-1.85l5.28-4.52l0.14,0.16l1.53,8 c0.07,0.34,0.31,0.63,0.64,0.74c0.11,0.04,0.22,0.06,0.32,0.06c0.23,0,0.46-0.08,0.64-0.24l3.17-2.72 c0.17-0.15,0.29-0.34,0.33-0.56l1.74-9.18c0.01-0.04,0.01-0.08,0.02-0.12l0.22-3.63l5.3-4.54C47.43,16.09,47.62,13.62,46.22,11.99z M44.52,16l-5.61,4.81c-0.2,0.17-0.33,0.42-0.34,0.69l-0.24,3.99l-1.66,8.78l-1.62,1.39l-1.26-6.59c-0.03-0.17-0.11-0.33-0.22-0.46 l-0.95-1.11c-0.17-0.2-0.41-0.32-0.67-0.34c-0.03,0-0.05,0-0.08,0c-0.23,0-0.46,0.08-0.64,0.24l-6.02,5.16 c-0.58,0.5-1.52,1.15-2.43,1.51c-1.37,0.53-1.77,0.07-1.9-0.08c-0.07-0.09-0.2-0.23,0.17-1.15c0.17-0.42,0.03-0.89-0.34-1.16 l-3.86-2.81l0.92-0.79c5.56,0.99,5.61,0.96,6.04,0.59L42,13.06c0.81-0.69,2.03-0.6,2.73,0.21C45.42,14.08,45.33,15.3,44.52,16z"
      />
    </G>
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
