import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * cancer icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const cancer = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M54.795 178.5l-.04-.015c-1.565-1.57-2.175-3.85-1.605-5.995.57-2.145 2.245-3.815 4.385-4.39 2.14-.575 4.42.04 5.99 1.605 26.875 26.83 68.18 32.605 101.33 14.315-12.62-3.97-21.14-15.89-20.725-29.225.43-13.765 10.26-25.425 23.745-28.155 13.485-2.73 27.07 4.185 32.81 16.7 5.74 12.515 2.125 27.34-8.685 35.755-38.175 37.465-99.355 37.195-137.2-.6l-.005.005zm36.71-106.51c12.62 3.965 21.15 15.88 20.74 29.22-.425 13.765-10.255 25.43-23.74 28.165-13.485 2.735-27.075-4.185-32.815-16.7-5.74-12.515-2.12-27.34 8.695-35.76 38.185-37.455 99.365-37.18 137.215.615 1.565 1.57 2.175 3.85 1.605 5.995-.57 2.145-2.245 3.815-4.385 4.39-2.14.575-4.42-.04-5.99-1.605-26.87-26.835-68.18-32.615-101.33-14.32h.005zm8.28 28.27c.01-6.5-3.63-12.46-9.42-15.405-5.79-2.945-12.74-2.385-17.93 1.41-.345.335-.725.625-1.065.815-6.07 5.175-7.805 13.84-4.2 20.96 3.605 7.12 11.615 10.835 19.37 8.995 7.745-1.84 13.225-8.75 13.265-16.72l-.025-.055h.005zm56.735 55.515c-.01 6.5 3.63 12.46 9.42 15.405 5.79 2.945 12.74 2.385 17.93-1.41.345-.335.725-.625 1.065-.815 6.07-5.175 7.805-13.84 4.2-20.96-3.605-7.12-11.615-10.835-19.37-8.995-7.745 1.84-13.225 8.75-13.265 16.72l.025.055h-.005z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

cancer.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default cancer;
