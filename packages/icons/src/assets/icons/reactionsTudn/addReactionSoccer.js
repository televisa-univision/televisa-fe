import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { DARKER_GREY } from '../../../constants/colors';

/**
 * addReactionSoccer icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const addReactionSoccer = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M201.3 134.9c-3.6 41.2-38.3 73.5-80.5 73.5-44.6 0-80.8-36.1-80.8-80.7S76.2 47 120.8 47c17.1 0 33 5.3 46.1 14.4-3.3 3.6-6 7.7-7.9 12.2-10.8-7.6-24-12.1-38.2-12.1-36.6 0-66.3 29.6-66.3 66.2s29.7 66.2 66.3 66.2c34.8 0 63.3-26.7 66.1-60.7 4 1.2 8.2 1.8 12.5 1.8.7-.1 1.3-.1 1.9-.1zM77.7 146.8c-1.8-2.5-1.3-6 1.2-7.9 2.4-1.8 5.8-1.3 7.6 1.2 9.8 13.7 21.9 20.3 36.9 20.3 14.9 0 27.7-7.5 38.8-23.1 1.8-2.5 5.2-3 7.6-1.2 2.4 1.8 2.9 5.4 1.2 7.9-13 18.3-29 27.7-47.6 27.7-18.5 0-33.9-8.5-45.7-24.9zm16.2-23.5c-.5 2.9-3.1 4.8-5.8 4.3-2.7-.5-4.5-3.3-4-6.2 1.7-9.9 6.7-15.7 14.5-15.7 7.7 0 12.7 5.3 14.6 14.3.6 2.9-1.1 5.7-3.8 6.3-2.7.6-5.4-1.2-6-4-.9-4.5-2.3-5.9-4.8-5.9-2.3-.1-3.8 1.6-4.7 6.9zm60.8 0c-.9-5.3-2.4-7-4.7-7-2.5 0-3.9 1.5-4.8 5.9-.6 2.9-3.3 4.7-6 4-2.7-.6-4.4-3.5-3.8-6.3 1.9-9 7-14.3 14.6-14.3 7.8 0 12.8 5.9 14.5 15.7.5 2.9-1.3 5.7-4 6.2s-5.2-1.3-5.8-4.2zm39.5-38.9h14.9c3.8 0 6.8 3 6.8 6.7s-3.1 6.7-6.8 6.7h-14.9v15.8c0 3.7-3.1 6.7-6.8 6.7-3.8 0-6.8-3-6.8-6.7V97.8h-16.4c-3.8 0-6.8-3-6.8-6.7s3.1-6.7 6.8-6.7h16.4V68.3c0-3.7 3.1-6.7 6.8-6.7 3.8 0 6.8 3 6.8 6.7v16.1z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill={`${fill || DARKER_GREY}`}
    />
    <Path fill="none" d="M0 0h256v256H0z" />
  </Svg>
);

addReactionSoccer.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default addReactionSoccer;
