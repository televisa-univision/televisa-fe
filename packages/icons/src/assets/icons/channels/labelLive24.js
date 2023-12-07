import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

/**
 * labelLive24 component
 * @param {size} size - icon size
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const labelLive24 = ({
  width, height, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M5.4 2.7v2.5c-.5.6-1.3 1-2.2 1-1.7 0-3-1.2-3-3C.3 1.7 1.6.5 3.3.5c.8 0 1.5.3 2 .8l-.5.6C4.3 1.4 3.7 1 3 1 1.9 1 1 2 1 3.2a2 2 0 002.1 2.1c.6 0 1.1-.2 1.4-.5V3.4H3v-.7h2.4zm3.6.7h-.6v2.7h-.8V.4h2c.5 0 .8.2 1 .4a1.5 1.5 0 010 2.3c-.1.2-.3.3-.6.3l2 2.7h-1L9 3.4zm-.6-.7h1.1c.4 0 .6-.1.7-.2l.2-.6c0-.2 0-.3-.2-.5-.1-.1-.3-.2-.7-.2H8.4v1.5zM17.5 6L17 4.7h-2.4L14 6h-.8L15.4.4h.6l2.4 5.7h-.9zm-1.8-4.3l-.8 2h1.7l-.9-2zm3.2-.6V.4h4v.8h-1.6v5h-.8v-5h-1.6zm5.7 5V.3h.8V6h-.8zm2.7-1l.5-.5c.3.4.8.7 1.4.7.5 0 1-.3 1-.8 0-.9-1.2-1-2-1.5-.4-.2-.7-.6-.7-1.2 0-.9.7-1.5 1.7-1.5.7 0 1.2.3 1.5.5l-.4.6c-.3-.2-.7-.4-1-.4-.5 0-1 .3-1 .8 0 .7 1.2.9 2 1.4.3.2.7.6.7 1.3 0 1-.8 1.6-1.8 1.6-.7 0-1.4-.3-2-1zM43 2.8h2v.7h-2v2h2.5V6h-3.3V.4h3.2v.8H43v1.5zM51.7 6l-3.4-4v4.2h-.8V.4h.5l3.4 4.2V.4h.9v5.7h-.6zM61.8.4l-2.2 5.7H59L56.8.4h.8l1.7 4.3L61 .4h.8zm1.7 5.7V.4h.8v5.7h-.8zM71.1.4l-2.3 5.7h-.5L66 .4h.8l1.7 4.3L70.2.4h.9zm1.1 2.9a2.8 2.8 0 115.7 0 2.8 2.8 0 11-5.7 0zm.8 0c0 1.2.9 2.1 2 2.1 1.2 0 2-.9 2-2.1C77 2 76.3 1 75 1c-1.1 0-2 1-2 2.2zm16.2-1.4l-.7-.3C88.8.6 89.6.4 90 .4c1 0 1.7.7 1.7 1.7 0 .6-.3 1.2-.7 1.6l-1.4 1.7h2.1V6h-3.4v-.5l2-2.2c.4-.5.6-.9.6-1.3 0-.5-.3-1-.9-1-.5 0-.8.3-1 .8zm4 2.8v-.5l3-3.8h.5V4h.9v.7h-.9v1.4H96V4.7h-2.7zm1.2-.7h1.5V2l-1.5 2zm5.1 2h-.8l2.6-5.7h.8L99.5 6zm5.1 0h-.8l2.4-4.9h-2.6V.4h3.6V1l-2.6 5z"
        fill="#FFF"
      />
      <Path
        d="M36.5 2a1 1 0 010 2 1 1 0 010-2M83 2a1 1 0 010 2 1 1 0 010-2"
        fill="#929292"
      />
    </G>
  </Svg>
);

/**
 * labelLive24 props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
labelLive24.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default labelLive24;
