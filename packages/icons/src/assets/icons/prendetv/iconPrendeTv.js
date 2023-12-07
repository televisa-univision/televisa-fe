import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path, Rect } from 'svgs';
import { WHITE, BITTERSWEET } from '../../../constants/colors';

/**
 * logoPrendeTv component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @returns {JSX}
 */
const iconPrendeTv = ({
  width, height, style, fill, viewBox,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h256v256H0z" />
      <Rect fill={`${fill || BITTERSWEET}`} width="256" height="256" rx="40.96" />
      <Path
        d="M130 147l4 10 4-10h5l-9 19-9-19h5zm-7 0v4h-4v15h-4v-15h-3v-4h11zm39-46v41l-26-20v20h-12v-41l27 20v-20h11zm-71 0l29 1v8h-17v10h13v8h-13v5h17v9l-29-1v-40zm-37-4l14 1c13 2 20 9 20 17 0 5-3 10-9 12l10 14H76l-7-12h-3v12H54V97zm153 22c0 12-10 23-27 22h-13v-41l13-1c18-2 27 7 27 20zm31-29v10l-17 3v12l12-1v10l-12 1v7l17-1v10h-29V95l29-5zM18 90l14 3c13 2 19 11 19 19s-6 16-18 16l-3-1v14H18V90zm163 18h-2v25h2c9 0 14-7 14-14 0-6-5-12-14-11zm-116-1l1 13h2c5 1 8-2 8-6s-3-6-8-7h-3zm-36-5l1 15 2 1c5 0 8-3 8-7s-3-8-8-8l-3-1z"
        fill={WHITE}
      />
    </G>
  </Svg>
);

iconPrendeTv.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default iconPrendeTv;
