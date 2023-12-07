import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path } from 'svgs';
import { BLACK } from '../../../constants/colors';

/**
 * logoPrendeTv component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @param {viewBox} viewBox - viewBox size
 * @returns {JSX}
 */
const logoPrendeTv = ({
  width, height, fill, style, viewBox,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" style={style}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h256v256H0z" />
      <Path
        d="M130 150l5 11 5-11h5l-10 22-10-22h5zm-8 0v4h-4v18h-5v-18h-4v-4h13zm46-53v48l-31-24v23h-14V97l31 23 1-23h13zm-83-1l34 2v9H99v11l15 1v9H99v6h20v10H85V96zm-43-4l16 2c16 2 23 10 23 19 0 6-3 11-10 14l11 17H68l-9-15h-4v15H42V92zm177 25c0 14-10 27-31 27h-14V96l15-1c20-3 31 8 30 22zm37-33v12l-20 3v14l15-1v12l-15 1v7l20-1v12h-34l1-53 33-6zM0 84l16 3c16 3 23 13 23 23 0 9-8 18-22 18l-4-1v16H0V84zm189 21h-2v29h2c11-1 17-8 17-16s-6-14-17-13zm-134-1a551646 551646 0 003 15c6 1 9-3 9-7s-3-8-9-8h-3zm-42-6v18h3c6 0 9-3 9-8s-3-8-9-9l-3-1z"
        fill={fill || BLACK}
      />
    </G>
  </Svg>
);

logoPrendeTv.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

logoPrendeTv.defaultProps = {
  viewBox: '0 0 256 256',
};

export default logoPrendeTv;
