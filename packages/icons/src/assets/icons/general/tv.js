import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path } from 'svgs';
import { BLACK } from '../../../constants/colors';

/**
 * TV component
 * @param {!Object} props - components props
 * @param {width} props.width - icon width size
 * @param {height} props.height - icon height size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const tv = ({
  width, height, fill, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <G fill={fill || BLACK} fillRule="evenodd">
      <Path d="M20 0H0v12h9v1H4v1h12v-1h-5v-1h9V0zM1 11V1h18v10H1z" fillRule="nonzero" />
      <Path d="M10 4.618H8.884V8H8.1V4.618H7V4h3v.618zm1.933 2.297l.056.22h.019l.053-.212L13.044 4H14l-1.536 4h-.931L10 4h.956l.977 2.915z" />
    </G>
  </Svg>
);

tv.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default tv;
