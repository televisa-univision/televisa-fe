import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path, G } from 'svgs';
import { WHITE } from '../../../constants/colors';

/**
 * playlist icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const playlist = ({
  width, height, fill, className, style,
}) => (
  <Svg width={width} height={height} viewBox="0 0 30 20" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Path d="M26 18V3H3V2h24v16h-1z" fill={`${fill || WHITE}`} />
      <Path stroke={`${fill || WHITE}`} d="M.5 4.5h24v16H.5z" />
      <Path d="M10 14.74959c0 .21984.15087.32166.34312.22432l4.54326-2.30052c.1895-.09596.19226-.25014 0-.3475l-4.54326-2.30051c-.1895-.09596-.34312.00246-.34312.22432v4.49989zM28 15V1H6V0h23v15h-1z" fill={`${fill || WHITE}`} />
    </G>
  </Svg>
);

playlist.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  width: PropTypes.number,
};

export default playlist;
