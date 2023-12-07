import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, G, Path } from 'svgs';

import { DARKER_GREY } from '../../../constants/colors';

/**
 * shareArrowSoccer icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const shareArrowSoccer = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style}>
    <G fill="none">
      <Path d="M0 0h256v256H0z" />
      <Path
        d="M42.7 181.3c19.6-42.3 56-67.7 109.3-76.2V74.6l61.3 48.3-61.3 53.4v-30.5c-26.4 2-46.8 5.4-61.3 10.2s-30.6 13.1-48 25.3z"
        stroke={fill || DARKER_GREY}
        strokeWidth={12.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

shareArrowSoccer.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default shareArrowSoccer;
