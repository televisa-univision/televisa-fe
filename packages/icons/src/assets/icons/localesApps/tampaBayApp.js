import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, G,
} from 'svgs';

import { WHITE } from '../../../constants/colors';

/**
 * tampaBayApp component
 * @param {string} [className] - modifier class
 * @param {string} fill - icon fill modifier
 * @property {number} height - icon height size
 * @param {style} [style] - style override
 * @param {string} viewBox - viewBox
 * @property {number} width - icon width size
 * @returns {JSX}
 */
const tampaBayApp = ({
  className, fill, height, style, viewBox, width,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h134v32H0z" />
      <Path
        fill={fill || WHITE}
        d="M65.6 15.2h-3.2v-12h3.2zM86.4 15.2h-3.3v-12h3.3zM104.4 15.2h-3.2v-12h3.2zM50.9 15.167v-6.6c0-1.7 1.2-2.6 2.6-2.6 1.5 0 2.7 1.1 2.7 2.6v6.7h3.2v-6.6c0-3.1-2.1-5.8-5.8-5.8-4 0-6 2.7-6 5.8v6.5h3.3ZM125.1 15.167v-6.6c0-1.7 1.2-2.6 2.6-2.6 1.5 0 2.7 1.1 2.7 2.6v6.7h3.2v-6.6c0-3.1-2.1-5.8-5.8-5.8-4 0-6 2.7-6 5.8v6.5h3.3ZM74.4 10.567l3.3-7.4H81l-5.5 12h-2.2l-5.6-12h3.4zM90.5 11.567c.8.7 2.1 1.2 3.3 1.2.9 0 1.5-.4 1.5-1 0-1.8-5.8-1.2-5.8-5 0-2.3 2.2-3.8 4.6-3.8 1.6 0 3.3.6 4.1 1.2l-1.5 2.3c-.6-.4-1.4-.8-2.3-.8-.9 0-1.6.3-1.6 1 0 1.6 5.8.9 5.8 5.1 0 2.3-2.3 3.7-4.8 3.7-1.7 0-3.4-.6-4.8-1.6l1.5-2.3ZM113.2 12.467c1.9 0 3.2-1.5 3.2-3.3 0-1.8-1.3-3.3-3.2-3.3-1.9 0-3.2 1.5-3.2 3.3 0 1.8 1.3 3.3 3.2 3.3m0-9.5c3.7 0 6.4 2.8 6.4 6.3s-2.8 6.3-6.4 6.3c-3.7 0-6.4-2.8-6.4-6.3-.1-3.5 2.7-6.3 6.4-6.3M41.8 3.167v6.7c0 1.6-1.3 2.6-2.7 2.6-1.5 0-2.7-1.2-2.7-2.6v-6.7h-3.2v6.5c0 3 2.1 5.8 5.8 5.8 4 0 6-2.7 6-5.8v-6.5h-3.2Z"
      />
      <Path
        d="M10.7 2.467v15.6c.8 0 5.1.1 8.8-.2.9-.1 1.8-.2 2.7-.4 2.1-.4 3.9-1 4.5-1.5v-11.9c-1.6-1.2-8.4-1.6-16-1.6"
        fill="#00C56E"
      />
      <Path
        d="M26.7 16.167v-.2c-.6.5-2.4 1.1-4.5 1.5-.9.2-1.8.3-2.7.4-3.7.3-8 .2-8.8.2v2.5c0 .8.1 1.5.1 2.2.1 1.5.3 3 .5 4.2.3 1.3.7 2.4 1.3 3h.6c4.5 0 8.5-2.3 10.9-5.7.9-1.2 1.5-2.9 1.9-4.6.5-1.1.7-2.3.7-3.5"
        fill="#1717EF"
      />
      <Path
        d="M12.7 29.967c-.6-.6-1-1.6-1.3-3-.3-1.2-.4-2.6-.5-4.2 0-.7-.1-1.5-.1-2.2v-2.5c-3.5 0-6.6-.3-8-.5-1.6-.3-2.6-.9-2.8-1.2 0 1.3.2 2.8.5 4 .5 1.4 1.1 2.8 1.9 3.9 2.3 3.3 6.1 5.5 10.3 5.7.1 0 0 0 0 0"
        fill="#FF161F"
      />
      <Path
        d="M.5 3.467c-.3 0-.5.2-.5.5v12.5c.2.3 1.2.8 2.7 1.1.2 0 .5.1.8.1 1.6.2 4.2.4 7.2.4v-9.6c-3.3-4.3-8.4-5-10.2-5"
        fill="#E621BB"
      />
      <Path
        d="M33.4 21.1h5.8v1.1H37v7.3h-1.2v-7.3h-2.3v-1.1h-.1Zm11.1 6.3h-3.6l-.9 2.2h-1.3l3.5-8.5h.8l3.5 8.5h-1.3l-.7-2.2Zm-3.1-1.2H44l-1.3-3.1-1.3 3.1Zm10.9 1.5h-.8L49 23.9v5.7h-1.2v-8.5h.8l3.3 5.2 3.3-5.2h.8v8.5h-1.2v-5.7l-2.5 3.8Zm7.1-1.9v3.7h-1.2V21h3.2c.8 0 1.4.2 1.8.6.5.4.8 1.1.8 1.8s-.3 1.4-.8 1.8c-.4.4-.9.6-1.8.6h-2Zm1.9-1.1c.6 0 .9-.1 1.1-.4.2-.2.3-.5.3-.8 0-.3-.1-.6-.3-.8-.2-.2-.5-.4-1.1-.4h-1.9v2.4h1.9Zm7.8 2.7h-3.6l-.9 2.2h-1.3l3.5-8.5h.8l3.5 8.5H70l-.9-2.2ZM66 26.2h2.6l-1.3-3.1-1.3 3.1Zm9.4 3.4v-8.5h2.9c.8 0 1.3.2 1.7.6.4.4.7 1 .7 1.6 0 .6-.3 1.1-.7 1.5.8.4 1.4 1.3 1.4 2.2 0 .8-.4 1.5-.9 2-.4.4-1 .6-1.8.6h-3.3Zm2.6-5.2c.7 0 1-.1 1.2-.4.2-.2.3-.4.3-.7 0-.3-.1-.5-.3-.7-.2-.2-.5-.4-1.2-.4h-1.5v2.2H78Zm.4 4c.8 0 1.1-.2 1.4-.4.2-.3.4-.6.4-1s-.2-.7-.4-1c-.3-.3-.6-.4-1.4-.4h-1.8v2.8h1.8Zm9.1-1h-3.6l-.9 2.2h-1.3l3.5-8.5h.8l3.5 8.5h-1.3l-.7-2.2Zm-3.1-1.2H87l-1.3-3.1-1.3 3.1Zm8.6-.5v3.9h-1.2v-3.9l-2.9-4.6h1.4l2.2 3.4 2.2-3.4h1.4L93 25.7Z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

/**
 * tampaBayApp props
 * @property {string} [className] - modifier class
 * @property {string} fill - fill color, default: svg fill color
 * @property {number} height - icon height size
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {number} width - icon width size
 */
tampaBayApp.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default tampaBayApp;
