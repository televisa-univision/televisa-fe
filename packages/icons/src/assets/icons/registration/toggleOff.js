import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import {
  Svg, G, Rect, Circle,
} from 'svgs';

/**
 * toggleOff icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const toggleOff = ({
  width, height, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Rect fill="#E2E2E3" width={105} height={60} rx={30} />
      <Circle fill="#FFF" cx={30} cy={30} r={26.3} />
    </G>
  </Svg>
);

toggleOff.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default toggleOff;
