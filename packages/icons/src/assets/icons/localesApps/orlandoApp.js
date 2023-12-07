import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, G,
} from 'svgs';

import { WHITE } from '../../../constants/colors';

/**
 * orlandoApp component
 * @param {string} [className] - modifier class
 * @param {string} fill - icon fill modifier
 * @property {number} height - icon height size
 * @param {style} [style] - style override
 * @param {string} viewBox - viewBox
 * @property {number} width - icon width size
 * @returns {JSX}
 */
const orlandoApp = ({
  className, fill, height, style, viewBox, width,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <G fillRule="nonzero" fill="none">
      <Path
        d="M63.7 12.3h-3.1V.6h3.1v11.7Zm20.2 0h-3.2V.6h3.2v11.7Zm17.6 0h-3.2V.6h3.2v11.7Zm-52.1 0V5.9c0-1.6 1.2-2.6 2.6-2.6 1.5 0 2.6 1.1 2.6 2.6v6.5h3.1V6c0-3-2.1-5.6-5.7-5.6C48.1.4 46.2 3 46.2 6v6.4h3.2v-.1Zm72.2 0V5.9c0-1.6 1.2-2.6 2.6-2.6 1.5 0 2.6 1.1 2.6 2.6v6.5h3.1V6c0-3-2.1-5.6-5.7-5.6-3.9 0-5.8 2.6-5.8 5.6v6.4h3.2v-.1ZM72.2 7.8 75.4.6h3.3l-5.4 11.7h-2.2L65.7.6H69l3.2 7.2Zm15.7 1c.8.7 2 1.2 3.2 1.2.8 0 1.5-.4 1.5-1 0-1.8-5.7-1.1-5.7-4.9 0-2.2 2.2-3.6 4.5-3.6 1.5 0 3.2.6 4 1.2L93.9 4c-.6-.4-1.4-.8-2.3-.8-.9 0-1.6.3-1.6.9 0 1.5 5.7.9 5.7 5 0 2.2-2.2 3.6-4.7 3.6-1.6 0-3.3-.6-4.7-1.6l1.6-2.3ZM110 .4c3.6 0 6.2 2.7 6.2 6.1 0 3.4-2.7 6.1-6.2 6.1-3.6 0-6.2-2.7-6.2-6.1-.1-3.4 2.6-6.1 6.2-6.1m0 9.3c1.8 0 3.1-1.4 3.1-3.2 0-1.8-1.3-3.2-3.1-3.2s-3.1 1.5-3.1 3.2c0 1.8 1.2 3.2 3.1 3.2M40.5.6v6.5c0 1.6-1.2 2.6-2.6 2.6-1.4 0-2.6-1.1-2.6-2.6V.6h-3.1V7c0 3 2.1 5.6 5.7 5.6 3.9 0 5.8-2.6 5.8-5.6V.6h-3.2ZM37 16.9c2.7 0 4.8 2.1 4.8 4.9 0 2.8-2.1 4.9-4.8 4.9-2.7 0-4.8-2.1-4.8-4.9 0-2.8 2.1-4.9 4.8-4.9Zm0 8.5c1.9 0 3.4-1.5 3.4-3.6s-1.5-3.6-3.4-3.6-3.4 1.5-3.4 3.6c0 2 1.4 3.6 3.4 3.6Zm7.8-3.4v4.5h-1.4V17h3.3c.9 0 1.4.2 1.8.6.6.5.9 1.2.9 2s-.4 1.5-.9 2c-.3.2-.6.4-1.1.5l3.4 4.5h-1.6l-3.4-4.5h-1V22Zm1.9-1.3c.6 0 .9-.1 1.1-.4.2-.2.4-.5.4-.9s-.1-.7-.4-.9c-.2-.2-.5-.4-1.1-.4h-1.9v2.6h1.9Zm6.8 4.5h4.2v1.3h-5.6V17h1.4v8.2Zm11.6-1.1h-4l-1 2.4h-1.4l3.9-9.5h1l3.9 9.5h-1.4l-1-2.4Zm-3.5-1.3h2.9L63 19.3l-1.4 3.5Zm8.6-3.3v7h-1.4V17h1l5.7 7v-7h1.3v9.5h-1l-5.6-7Zm9.1 7V17h2.9c1.5 0 2.5.3 3.3.9 1.2.9 1.9 2.3 1.9 3.9s-.7 3-1.9 3.9c-.8.6-1.8.9-3.3.9l-2.9-.1Zm5.5-7.4c-.6-.5-1.4-.8-2.7-.8h-1.4v6.9h1.4c1.3 0 2.1-.3 2.7-.8.7-.6 1.2-1.6 1.2-2.7s-.5-2-1.2-2.6Zm8.5-2.2c2.7 0 4.8 2.1 4.8 4.9 0 2.8-2.1 4.9-4.8 4.9-2.7 0-4.8-2.1-4.8-4.9 0-2.8 2.1-4.9 4.8-4.9Zm0 8.5c1.9 0 3.4-1.5 3.4-3.6s-1.5-3.6-3.4-3.6-3.4 1.5-3.4 3.6c0 2 1.4 3.6 3.4 3.6Z"
        fill={fill || WHITE}
      />
      <Path
        d="M10.5 0v15.1c.8 0 5 .1 8.5-.2.9-.1 1.8-.2 2.6-.4 2.1-.4 3.8-1 4.4-1.5V1.5C24.4.3 17.9 0 10.5 0Z"
        fill="#00C473"
      />
      <Path
        d="M26 13.2V13c-.6.5-2.3 1.1-4.4 1.5-.8.1-1.7.3-2.6.4-3.6.3-7.8.2-8.5.2v2.5c0 .7.1 1.5.1 2.2.1 1.5.3 2.9.5 4.1.3 1.3.7 2.3 1.3 2.9h.6c4.4 0 8.3-2.2 10.6-5.5.8-1.2 1.5-2.8 1.9-4.4.3-1.3.5-2.4.5-3.7 0 .1 0 .1 0 0 0 .1 0 .1 0 0Z"
        fill="#1D1DEA"
      />
      <Path
        d="M12.4 26.7c-.6-.5-1-1.6-1.3-2.9-.3-1.2-.4-2.6-.5-4.1 0-.7-.1-1.4-.1-2.2V15c-3.4 0-6.4-.3-7.8-.5-1.5-.3-2.5-.8-2.7-1.1 0 1.3.2 2.7.5 3.9.4 1.4 1 2.6 1.8 3.8 2.4 3.3 6 5.4 10.1 5.6Z"
        fill="#ED1C24"
      />
      <Path
        d="M.6.9c-.3 0-.5.2-.5.5v12.1c.2.3 1.2.8 2.7 1.1.2 0 .5.1.8.1 1.6.2 4.1.4 7 .4V5.8C7.3 1.6 2.3.9.6.9Z"
        fill="#C626B6"
      />
    </G>
  </Svg>
);

/**
 * orlandoApp props
 * @property {string} [className] - modifier class
 * @property {string} fill - fill color, default: svg fill color
 * @property {number} height - icon height size
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {number} width - icon width size
 */
orlandoApp.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default orlandoApp;
