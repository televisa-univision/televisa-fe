import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * virgo icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const virgo = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M179.18 156.63V94.335l.615-.44c3.905-2.79 8.63-4.285 13.48-4.2603 9.175.0203 17.445 5.3953 20.96 13.6403 3.51 8.235 1.58 17.715-4.89 24.035l-30.165 29.32zm-51.105-97.81l-1.1 1.225-1.1-1.225c-5.57-6.22-13.51-9.78-21.86-9.78S87.73 52.6 82.16 58.82l-1.1 1.23-1.1-1.23c-7.88-8.815-20.275-12.07-31.475-8.215-11.945 4.115-19.96 15.415-19.92015 28.11 0 3.635 2.94015 6.585 6.56015 6.585s6.56-2.95 6.56-6.59c0-9.1 7.34-16.48 16.395-16.48s16.395 7.38 16.395 16.48v64.315c0 3.64 2.935 6.59 6.56 6.59 3.625 0 6.56-2.95 6.56-6.59V78.71c0-9.1 7.34-16.48 16.395-16.48s16.395 7.38 16.395 16.48v64.315c0 3.64 2.935 6.59 6.56 6.59 3.625 0 6.56-2.95 6.56-6.59V78.71c0-9.1 7.34-16.48 16.395-16.48s16.395 7.38 16.395 16.48l-.005 13.16c-.015.155-.01.445.01.815l-.005 77.01-25.905 26.03c-2.565 2.575-2.565 6.75 0 9.325 2.565 2.575 6.725 2.575 9.29 0l17.995-18.08.84 2.06c5.02 12.29 17.775 19.63 30.94 17.69 14.22-2.1 24.75-14.375 24.71-28.82 0-3.635-2.94-6.585-6.56-6.585-3.62 0-6.56 2.95-6.56 6.59 0 8.77-7.075 15.885-15.805 15.885s-15.805-7.115-15.805-15.885v-2.75l38.035-38.22c11.78-11.925 13.485-30.565 4.06-44.435-8.875-13.065-25.345-18.51-40.15-13.38l-1.895.655-.065-2.005c-.51-15.98-13.56-28.71-29.515-28.725-8.34.01-16.27 3.57-21.84 9.78l.01-.005z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

virgo.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default virgo;
