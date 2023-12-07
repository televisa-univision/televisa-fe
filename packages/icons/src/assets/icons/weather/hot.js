import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { YELLOW } from '../../../constants/colors';

/**
 * hot icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const hot = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M127.67 182.938c-30.93 0-56.003-25.073-56.003-56.003 0-30.929 25.073-56.002 56.002-56.002 30.93 0 56.003 25.073 56.003 56.002 0 30.93-25.073 56.003-56.003 56.003zm5.7-156.287v29.44c0 2.869-2.443 5.216-5.323 5.216-2.965 0-5.312-2.347-5.312-5.216V26.65c0-2.976 2.347-5.323 5.312-5.323 2.88 0 5.323 2.347 5.323 5.323zm0 173.26v29.44c0 2.87-2.443 5.323-5.323 5.323-2.965 0-5.312-2.453-5.312-5.323v-29.44c0-2.869 2.347-5.312 5.312-5.312 2.88 0 5.323 2.443 5.323 5.312zm101.302-71.963c0 2.976-2.336 5.322-5.323 5.322h-29.333c-2.976 0-5.312-2.346-5.312-5.322 0-2.87 2.336-5.206 5.312-5.206h29.333c2.987 0 5.323 2.336 5.323 5.206zm-173.265 0c0 2.976-2.336 5.322-5.312 5.322h-29.45c-2.87 0-5.313-2.346-5.313-5.322 0-2.87 2.443-5.206 5.312-5.206h29.45c2.977 0 5.313 2.336 5.313 5.206zm143.608-71.64c0 1.375-.533 2.762-1.6 3.722L182.69 80.862c-1.056.96-2.336 1.59-3.83 1.59-1.375 0-2.655-.63-3.711-1.59-.96-.96-1.494-2.336-1.494-3.723 0-1.386.534-2.762 1.494-3.722l20.832-20.832c2.016-2.016 5.525-2.016 7.434 0 1.067.96 1.6 2.336 1.6 3.722zM82.453 178.864c0 1.376-.533 2.763-1.589 3.723L60.128 203.42c-1.056.96-2.336 1.482-3.712 1.482-1.493 0-2.773-.522-3.83-1.482-.96-1.056-1.493-2.336-1.493-3.723 0-1.483.534-2.763 1.494-3.83l20.832-20.725c2.016-2.016 5.525-2.016 7.445 0 1.056.96 1.59 2.347 1.59 3.723zm122.562 20.833c0 1.387-.533 2.667-1.6 3.723-.949.95-2.336 1.482-3.722 1.482-1.376 0-2.752-.533-3.712-1.482l-20.832-20.832c-.96-.96-1.494-2.347-1.494-3.723 0-1.387.534-2.763 1.494-3.723 2.122-2.122 5.418-2.122 7.541 0l20.725 20.726c1.067 1.066 1.6 2.346 1.6 3.83zM82.453 77.14c0 1.376-.533 2.763-1.589 3.723-.96.95-2.24 1.59-3.723 1.59-1.386 0-2.666-.64-3.722-1.59L52.587 60.03c-.96-.96-1.494-2.347-1.494-3.723 0-1.386.534-2.762 1.494-3.722 1.056-.96 2.336-1.6 3.712-1.6h.117c1.376 0 2.656.533 3.712 1.6l20.736 20.832c1.056.96 1.59 2.336 1.59 3.722z" fill={`${fill || YELLOW}`} fillRule="nonzero" />
  </Svg>
);

hot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default hot;
