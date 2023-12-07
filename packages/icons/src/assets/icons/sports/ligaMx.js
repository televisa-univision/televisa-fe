import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * ligaMx component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const ligaMx = ({
  fill,
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
      <Path d="M0 256h256V0H0z" />
      <Path fill={`${fill || BLACK}`} d="M206.125 72.36c-.928-.587-6.294-3.82-10.55-2.369-2.176.726-3.818 2.688-4.874 5.824.053 0-.384 5.547 3.296 11.008 1.312 1.216 34.741 33.984 32.288 72.918 7.498-17.419 15.37-52.64-20.16-87.382" />
      <Path fill={`${fill || BLACK}`} d="M169.469 121.187c1.802 3.136 4.65 6.688 7.946 10.806 7.808 9.728 18.496 23.05 25.227 41.557.043.139 1.003 3.072 3.05 3.435 1.174.224 4.694-.246 11.073-8.747.234-.267 9.578-11.104-2.73-36.139-.118-.234-10.124-21.12-20.214-31.05-1.686-.982-13.483-7.264-22.198 2.805 0 0-6.698 8.992-2.154 17.333" />
      <Path fill={`${fill || BLACK}`} d="M188.459 164.6l-.022-.043c-.192-.352-18.858-35.062-32.49-48.49l-1.302-1.28 1.067-1.484c7.445-10.41 19.573-28.01 20.405-30.954l.171-.598.459-.405c.021-.021 2.602-2.443 2.197-5.621-.384-3.019-3.381-6.102-8.683-8.918-.021.011-16.49-7.018-24.778.534-.096.074-7.446 6.656-15.958 14.944l-1.493 1.44-1.483-1.44a603.796 603.796 0 0 0-15.946-14.934c-2.912-2.645-6.816-3.509-10.667-3.509-7.179 0-14.176 2.987-14.293 3.04-5.142 2.741-8.15 5.824-8.534 8.843-.405 3.178 2.187 5.6 2.208 5.632l.448.405.171.587c.843 2.933 12.97 20.544 20.416 30.954l1.056 1.483-1.301 1.28c-13.632 13.43-32.299 48.139-32.48 48.49-6.966 12.267 3.082 20.64 3.52 20.993 16.192 12.373 25.13 3.68 25.514 3.306 9.344-10.304 19.35-22.24 29.696-35.413l1.675-2.144 1.675 2.144c10.314 13.152 20.32 25.088 29.749 35.477.32.32 9.259 8.992 25.493-3.413.395-.31 10.443-8.683 3.51-20.907M65.203 75.411c-.96-2.73-2.602-4.693-4.79-5.43-4.223-1.386-9.62 1.804-10.538 2.38-35.53 34.74-27.658 69.952-20.16 87.38-2.442-38.932 31.008-71.732 32.587-73.258 3.552-5.354 2.912-11.018 2.901-11.072" />
      <Path fill={`${fill || BLACK}`} d="M41.979 132.078c-12.32 25.056-2.976 35.893-2.88 36 6.528 8.683 10.048 9.12 11.21 8.907 2.048-.363 2.998-3.296 3.008-3.318 6.774-18.624 17.462-31.946 25.27-41.674 3.296-4.118 6.144-7.67 7.786-10.518 4.736-8.682-2.005-17.621-2.069-17.717-8.693-10.016-20.437-3.69-22.123-2.72-10.101 9.941-20.106 30.827-20.202 31.04" />
    </G>
  </Svg>
);

ligaMx.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default ligaMx;
