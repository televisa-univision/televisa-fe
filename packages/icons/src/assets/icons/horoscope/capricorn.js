import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * capricorn icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const capricorn = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M107.44 190.82c-2.835 2.005-3.48 5.895-1.44 8.685 2.04 2.79 5.985 3.425 8.82 1.42l31.24-22.17c.275 13.225 9.65 24.57 22.745 27.53 13.095 2.96 26.56-3.215 32.675-14.99 6.115-11.775 3.32-26.135-6.79-34.85s-24.94-9.55-35.99-2.025V78.435c-.06-12.495-8.14-23.59-20.145-27.65-12.005-4.06-25.31-.205-33.16 9.615-7.82-9.945-21.2-13.89-33.285-9.815-12.085 4.075-20.195 15.275-20.17006 27.85 0 3.435 2.83006 6.22 6.32006 6.22 3.49 0 6.32-2.785 6.32-6.22 0-9.38 7.725-16.98 17.25-16.98s17.25 7.6 17.25 16.98v64.69c0 3.435 2.83 6.22 6.32 6.22s6.32-2.785 6.32-6.22v-64.69c0-9.38 7.725-16.98 17.25-16.98s17.25 7.6 17.25 16.98v84.915l-38.77 27.465-.01.005zm51.385-12.61v-2.115c.125-.97.335-1.93.63-2.86 2.585-8.105 11.02-12.935 19.455-11.15 8.435 1.785 14.1 9.61 13.07 18.04-1.03 8.435-8.42 14.71-17.045 14.475-8.625-.235-15.655-6.895-16.215-15.375.06-.33.095-.66.1-.995v-.025l.005.005z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

capricorn.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default capricorn;
