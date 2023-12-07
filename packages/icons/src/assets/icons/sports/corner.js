import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path } from 'svgs';

import { BLACK, CINNABAR } from '../../../constants/colors';

/**
 * corner component
 * @param {!Object} props - components props
 * @param {string} props.fill - custom fill color
 * @param {string} props.stroke - custom stroke color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {string} props.className - class name modifier
 * @param {Object} props.style - style override
 * @returns {JSX}
 */
const corner = ({
  fill,
  stroke,
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
    <G fill="none" fillRule="evenodd">
      <Path fill={`${fill || CINNABAR}`} d="M160 31.467l-85.333 32 85.333 32z" />
      <Path fill={`${stroke || fill || BLACK}`} fillRule="nonzero" d="M170.667 170.56V21.333H160v138.774V160H42.667v10.667h112.96l52.48 52.48 7.573-7.574z" />
      <Path fill={`${stroke || fill || BLACK}`} fillRule="nonzero" d="M183.68 187.627c-16 9.6-76.267 8.64-86.72-23.36l-10.667 3.306c7.254 22.08 33.6 35.84 68.694 35.84a72.747 72.747 0 0 0 33.706-6.72l-5.013-9.066z" />
    </G>
  </Svg>
);

corner.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default corner;
