import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * scorpio icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const scorpio = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M188.02 207.345c15.34 0 28.29-11.35 30.53-26.495l.57-3.85 2.825 2.67c1.66 1.57 4.015 2.165 6.215 1.57 2.275-.615 4.055-2.405 4.66-4.7.605-2.295-.04-4.74-1.705-6.42l-14.11-14.23c-2.645-2.535-6.745-2.545-9.325-.075l-14.19 14.305c-2.575 2.595-2.575 6.805 0 9.4 2.125 2.145 5.405 2.555 7.97 1.055l5.205-3.045-2.315 5.58c-2.735 6.58-9.13 10.96-16.33 10.96-9.775 0-17.695-7.99-17.695-17.845v-97.83c-.045-12.415-7.82-23.46-19.425-27.59-10.795-3.84-22.805-.945-30.7 7.35l-1.475 1.55-1.465-1.56C111.78 52.315 104.15 49 96.165 49c-7.985 0-15.615 3.315-21.095 9.145l-1.465 1.56-1.475-1.55c-7.895-8.295-19.905-11.195-30.7-7.35-11.605 4.13-19.385 15.175-19.425 27.58 0 3.59 2.82 6.53 6.34 6.645h.04c1.745 0 3.42-.7 4.655-1.945 1.235-1.245 1.93-2.935 1.93-4.695 0-8.895 7.15-16.105 15.975-16.105S66.92 69.5 66.92 78.39v63.495c0 3.67 2.95 6.64 6.585 6.64s6.585-2.97 6.585-6.64V78.39c0-8.895 7.15-16.105 15.975-16.105S112.04 69.5 112.04 78.39v63.495c0 3.67 2.95 6.64 6.585 6.64s6.585-2.97 6.585-6.64V78.39c0-8.895 7.15-16.105 15.975-16.105S157.16 69.5 157.16 78.39v97.835c0 17.19 13.82 31.125 30.87 31.125l-.01-.005z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

scorpio.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default scorpio;
