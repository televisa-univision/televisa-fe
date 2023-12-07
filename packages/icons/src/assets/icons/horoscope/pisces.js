import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * pisces icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const pisces = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M211.875 128.015c0-3.84-3.07-6.945-6.855-6.945h-32.105l.085-1.06c1.805-22.35 11.435-43.315 27.15-59.125 1.74-1.76 2.415-4.32 1.78-6.725-.635-2.405-2.49-4.275-4.855-4.915-2.365-.64-4.89.045-6.625 1.795-18.295 18.48-29.335 43.05-31.075 69.145l-.06.915h-61.41l-.06-.915c-1.77-26.09-12.805-50.65-31.075-69.15-2.68-2.71-7.02-2.71-9.7 0-2.685 2.715-2.685 7.13 0 9.845 15.675 15.84 25.275 36.795 27.09 59.125l.085 1.06H52.23c-3.785 0-6.855 3.105-6.855 6.945 0 3.84 3.07 6.945 6.855 6.945h31.95l-.085 1.06c-1.815 22.335-11.415 43.29-27.09 59.125-1.74 1.76-2.415 4.32-1.78 6.725.635 2.405 2.49 4.275 4.855 4.915 2.365.64 4.89-.045 6.625-1.795 18.27-18.5 29.305-43.06 31.075-69.15l.06-.915h61.41l.06.915c1.74 26.095 12.78 50.665 31.075 69.145 2.68 2.71 7.02 2.71 9.7 0 2.685-2.715 2.685-7.13 0-9.845-15.695-15.825-25.3-36.785-27.09-59.13l-.085-1.06h31.995c1.835.03 3.605-.685 4.915-1.99s2.05-3.09 2.05-4.955l.005.015z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

pisces.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default pisces;
