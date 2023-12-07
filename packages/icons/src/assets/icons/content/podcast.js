import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { Path, G } from 'svgs';

/**
 * podcast component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @returns {JSX}
 */
const podcast = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <G fill="none" fillRule="evenodd">
      <Path d="M52.382 134.171H71.99c.268-28.483 23.468-51.517 52.015-51.517s51.746 23.034 52.015 51.517h19.607c-.268-39.367-32.19-71.124-71.622-71.124S52.65 94.804 52.382 134.171zm143.245 0h.502l-.5.5c0-.166 0-.333-.002-.5zm-71.622-22.749c-10.82 0-19.592 8.772-19.592 19.592 0 10.82 8.772 19.592 19.592 19.592 10.82 0 19.592-8.772 19.592-19.592 0-10.82-8.772-19.592-19.592-19.592zm-39.58 81.828l39.58 40.7 39.58-40.7v-6.494c0-5.857-5.425-10.882-14.703-14.605-7.72-3.098-17.619-4.987-24.877-4.987-7.259 0-17.158 1.89-24.877 4.987-9.279 3.723-14.704 8.748-14.704 14.605v6.494zM11.167 134.17h19.607c.27-51.254 41.912-92.73 93.23-92.73 51.317 0 92.96 41.476 93.23 92.73h19.607c-.27-62.036-50.738-112.338-112.837-112.338-62.1 0-112.567 50.302-112.837 112.338z" fill={`${fill || '#000000'}`} />
    </G>
  </Svg>
);

podcast.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default podcast;
