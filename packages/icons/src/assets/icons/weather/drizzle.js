import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, G, Path } from 'svgs';

import { BLUE, LIGHT_GREY } from '../../../constants/colors';

/**
 * drizzle icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const drizzle = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Path d="M84.551 179.72c-.224.48-.512.82-.832 1.258l-13.248 15.434c-1.578 1.846-4.192 2.38-6.314 1.366-.384-.182-.822-.502-1.163-.79-2.187-1.866-2.443-5.29-.576-7.477l13.237-15.435c1.963-2.133 5.302-2.442 7.488-.576 1.792 1.675 2.368 4.192 1.408 6.22zm84.277 9.44c-.66 1.344-1.77 2.539-2.677 3.659-1.685 2.048-3.37 4.085-5.067 6.123-3.54 4.256-7.082 8.512-10.634 12.757-.79.96-1.59 1.91-2.39 2.859-1.578 1.845-4.192 2.378-6.314 1.386-.384-.181-.822-.512-1.152-.79-2.198-1.855-2.464-5.29-.608-7.476l6.026-7.083c2.667-3.125 5.291-6.261 7.98-9.365 1.268-1.451 2.442-2.976 3.711-4.427 1.216-1.408 2.55-3.093 4.224-3.936 1.856-.939 4.256-.875 5.877.501 1.056.896 1.686 2.294 1.611 3.68a5.389 5.389 0 0 1-.587 2.112z" fill={`${fill || BLUE}`} />
      <Path d="M204.16 137.707a32.9 32.9 0 0 1-5.013 2.026c-3.307 1.174-7.04 1.814-11.094 1.814H58.133c-1.173 0-2.56-.107-4.16-.32C41.28 139.093 32 128.213 32 115.307c0-14.4 11.627-26.24 26.027-26.24l.64.106c2.986 0 5.546-2.56 5.546-5.546 0-14.4 11.734-26.134 26.24-26.134 4.267 0 8.427 1.067 12.16 2.987 1.494.747 3.094.853 4.694.32 1.386-.533 2.666-1.813 3.2-3.2 5.546-15.253 20.266-25.6 36.48-25.6 19.2 0 35.733 14.4 38.4 33.493.32 2.454 2.56 4.587 5.12 4.8 18.666 1.067 33.28 16.747 33.28 35.627 0 13.44-7.467 25.6-19.627 31.787m-81.155 14.506H58.027c-.747 0-1.28 0-1.92-.106-.854 0-1.707-.107-2.454-.214h-.32c-.64 0-1.173-.106-1.813-.213h-.107c-.533-.107-1.173-.32-1.813-.427-.533-.106-1.067-.213-1.493-.426-15.68-4.587-26.774-18.88-26.774-35.52 0-18.667 14.08-34.454 32.427-36.694C56.32 60.693 72 46.72 90.453 46.72c4.054 0 8.214.747 12.054 2.133 8.426-16.746 25.706-27.52 44.48-27.52 23.146 0 43.2 16.214 48.213 38.72 22.507 3.414 39.36 22.934 39.36 45.867 0 17.813-10.24 33.813-26.24 41.493-.427.32-.853.534-1.28.747-.32.107-.64.32-.96.427-.427.213-.853.426-1.387.533-.64.32-1.386.533-2.133.853-.96.32-2.027.64-3.093.854-.32.106-.64.213-1.067.32-.32.106-.64.106-.96.213-.32.107-.747.107-1.173.213-.32 0-.64.107-.96.107-2.347.32-4.8.533-7.254.533H148.57a2.658 2.658 0 0 1-.502.976l-38.076 46.93a2.667 2.667 0 1 1-4.142-3.36l36.141-44.546h-12.127l-16.786 20.77a2.667 2.667 0 1 1-4.148-3.353l14.076-17.417z" fill={`${fill || LIGHT_GREY}`} />
    </G>
  </Svg>
);

drizzle.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default drizzle;
