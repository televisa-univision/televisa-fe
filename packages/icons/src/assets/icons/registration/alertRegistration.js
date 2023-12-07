import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import {
  Defs,
  LinearGradient,
  Stop,
  G,
  Circle,
  Text,
  TSpan,
  Svg,
} from 'svgs';

/**
 * alertRegistration icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const alertRegistration = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <LinearGradient
        x1="94.9%"
        y1="15.8%"
        x2="3.1%"
        y2="95.5%"
        id="prefix__alerta"
      >
        <Stop stopColor="#007350" offset="0%" />
        <Stop stopColor="#079F70" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill={`${fill || 'none'}`} fillRule="evenodd">
      <Circle
        stroke="url(#prefix__alerta)"
        strokeWidth={5.5}
        cx={128}
        cy={128}
        r={90}
      />
      <Text
        fontFamily="BrownPro-Regular, BrownPro"
        fontSize={99.7}
        fill="#057E5A"
      >
        <TSpan x={110.1} y={159}>
          {'!'}
        </TSpan>
      </Text>
    </G>
  </Svg>
);

alertRegistration.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default alertRegistration;
