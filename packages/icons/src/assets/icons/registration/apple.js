import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { WHITE } from '../../../constants/colors';

/**
 * apple icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const apple = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path fill="none" d="M0 0h256v256H0z" />
    <Path
      d="M199.7 176.3c-2.6 6.3-5.8 12-9.5 17.4a88 88 0 01-12.2 15c-4.9 4.6-10.1 7-15.7 7.1-4 0-9-1.2-14.6-3.5a41 41 0 00-15.6-3.6c-5 0-10.4 1.2-16 3.6a42.6 42.6 0 01-14 3.7c-5.4.2-10.7-2.2-16-7.3a108.7 108.7 0 01-26.3-43 102 102 0 01-5.8-32.6c0-12 2.6-22.5 7.7-31.2 4-7 9.4-12.5 16-16.6 6.8-4 14-6 21.8-6.2 4.3 0 10 1.3 16.9 4 7 2.6 11.4 4 13.3 4 1.5 0 6.4-1.6 14.8-4.7 8-3 14.7-4.1 20.1-3.7 15 1.3 26 7.2 33.5 18a38 38 0 00-19.7 34.4c0 11.5 4.2 21 12.2 28.7 3.7 3.5 7.7 6.2 12.3 8.1-1 3-2 5.7-3.2 8.4zm-34-136.7c0 9-3.3 17.4-9.7 25.2-7.8 9.2-17.2 14.6-27.4 13.7l-.2-3.4c0-8.6 3.7-17.9 10.3-25.4 3.2-3.9 7.4-7 12.5-9.6 5-2.5 9.8-3.9 14.3-4.1l.1 3.6z"
      fill={`${fill || WHITE}`}
    />
  </Svg>
);

apple.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default apple;
