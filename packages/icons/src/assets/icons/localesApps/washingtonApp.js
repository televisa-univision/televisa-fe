import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, G,
} from 'svgs';

import { WHITE } from '../../../constants/colors';

/**
 * washingtonApp component
 * @param {string} [className] - modifier class
 * @param {string} fill - icon fill modifier
 * @property {number} height - icon height size
 * @param {style} [style] - style override
 * @param {string} viewBox - viewBox
 * @property {number} width - icon width size
 * @returns {JSX}
 */
const washingtonApp = ({
  className, fill, height, style, viewBox, width,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 .5h134v32H0z" />
      <Path
        fill={fill || WHITE}
        d="M65.6 15.7h-3.2v-12h3.2zM86.4 15.7h-3.3v-12h3.3zM104.4 15.7h-3.2v-12h3.2zM50.9 15.667v-6.6c0-1.7 1.2-2.6 2.6-2.6 1.5 0 2.7 1.1 2.7 2.6v6.7h3.2v-6.6c0-3.1-2.1-5.8-5.8-5.8-4 0-6 2.7-6 5.8v6.5h3.3ZM125.1 15.667v-6.6c0-1.7 1.2-2.6 2.6-2.6 1.5 0 2.7 1.1 2.7 2.6v6.7h3.2v-6.6c0-3.1-2.1-5.8-5.8-5.8-4 0-6 2.7-6 5.8v6.5h3.3ZM74.4 11.067l3.3-7.4H81l-5.5 12h-2.2l-5.6-12h3.4zM90.5 12.067c.8.7 2.1 1.2 3.3 1.2.9 0 1.5-.4 1.5-1 0-1.8-5.8-1.2-5.8-5 0-2.3 2.2-3.8 4.6-3.8 1.6 0 3.3.6 4.1 1.2l-1.5 2.3c-.6-.4-1.4-.8-2.3-.8-.9 0-1.6.3-1.6 1 0 1.6 5.8.9 5.8 5.1 0 2.3-2.3 3.7-4.8 3.7-1.7 0-3.4-.6-4.8-1.6l1.5-2.3ZM113.2 12.967c1.9 0 3.2-1.5 3.2-3.3 0-1.8-1.3-3.3-3.2-3.3-1.9 0-3.2 1.5-3.2 3.3 0 1.8 1.3 3.3 3.2 3.3m0-9.5c3.7 0 6.4 2.8 6.4 6.3s-2.8 6.3-6.4 6.3c-3.7 0-6.4-2.8-6.4-6.3-.1-3.5 2.7-6.3 6.4-6.3M41.8 3.667v6.7c0 1.6-1.3 2.6-2.7 2.6-1.5 0-2.7-1.2-2.7-2.6v-6.7h-3.2v6.5c0 3 2.1 5.8 5.8 5.8 4 0 6-2.7 6-5.8v-6.5h-3.2Z"
      />
      <Path
        d="M10.7 2.967v15.6c.8 0 5.1.1 8.8-.2.9-.1 1.8-.2 2.7-.4 2.1-.4 3.9-1 4.5-1.5v-11.9c-1.6-1.2-8.4-1.6-16-1.6"
        fill="#00C56E"
      />
      <Path
        d="M26.7 16.667v-.2c-.6.5-2.4 1.1-4.5 1.5-.9.2-1.8.3-2.7.4-3.7.3-8 .2-8.8.2v2.5c0 .8.1 1.5.1 2.2.1 1.5.3 3 .5 4.2.3 1.3.7 2.4 1.3 3h.6c4.5 0 8.5-2.3 10.9-5.7.9-1.2 1.5-2.9 1.9-4.6.5-1.1.7-2.3.7-3.5"
        fill="#1717EF"
      />
      <Path
        d="M12.7 30.467c-.6-.6-1-1.6-1.3-3-.3-1.2-.4-2.6-.5-4.2 0-.7-.1-1.5-.1-2.2v-2.5c-3.5 0-6.6-.3-8-.5-1.6-.3-2.6-.9-2.8-1.2 0 1.3.2 2.8.5 4 .5 1.4 1.1 2.8 1.9 3.9 2.3 3.3 6.1 5.5 10.3 5.7.1 0 0 0 0 0"
        fill="#FF161F"
      />
      <Path
        d="M.5 3.967c-.3 0-.5.2-.5.5v12.5c.2.3 1.2.8 2.7 1.1.2 0 .5.1.8.1 1.6.2 4.2.4 7.2.4v-9.6c-3.3-4.3-8.4-5-10.2-5"
        fill="#E621BB"
      />
      <Path
        d="M36.6 29.5h-.9L33.1 21h1.2l1.9 6.2 2.1-6.2h.9l2.1 6.2 1.9-6.2h1.2l-2.6 8.5H41l-2.3-6.2-2.1 6.2Zm13.2-2.2h-3.6l-.9 2.2h-1.2l3.5-8.5h.9l3.5 8.5h-1.2l-1-2.2Zm-3-1.2h2.6l-1.3-3.2-1.3 3.2Zm6.7 1.2c.5.6 1.2 1.1 2.1 1.1.8 0 1.5-.5 1.5-1.3 0-1.3-1.8-1.4-2.9-2.2-.6-.4-1.1-1-1.1-1.8 0-1.2 1.1-2.3 2.6-2.3 1.1 0 1.8.4 2.3.9l-.7.9c-.4-.4-1-.6-1.5-.6-.7 0-1.4.4-1.4 1.1 0 1.1 1.8 1.3 2.9 2 .5.4 1.1 1 1.1 1.9 0 1.5-1.1 2.5-2.6 2.5-1.1 0-2.2-.5-3-1.4l.7-.8Zm12.3-1.8H61v4h-1.2V21H61v3.3h4.8V21H67v8.5h-1.2v-4Zm3.4-4.5h1.2v8.4h-1.2V21Zm4.6 2.2v6.2h-1.2v-8.5h.9l5.1 6.2v-6.2h1.2v8.5h-.9l-5.1-6.2ZM89 28c-.7 1-2 1.6-3.3 1.6-2.6 0-4.4-1.8-4.4-4.4 0-2.5 1.8-4.4 4.3-4.4 1.2 0 2.4.5 3.1 1.3l-.8.8c-.5-.5-1.4-1-2.3-1-1.8 0-3.1 1.4-3.1 3.3s1.4 3.3 3.2 3.3c.9 0 1.7-.4 2.1-.8v-2.2h-2.4v-1.1H89V28Zm.8-7h5.8v1.1h-2.3v7.3h-1.2V22h-2.3v-1Zm10.3-.2c2.4 0 4.2 1.9 4.2 4.4 0 2.5-1.8 4.4-4.2 4.4-2.4 0-4.2-1.9-4.2-4.4 0-2.5 1.8-4.4 4.2-4.4Zm0 7.7c1.8 0 3.1-1.4 3.1-3.3 0-1.8-1.3-3.3-3.1-3.3S97 23.4 97 25.2c.1 1.9 1.3 3.3 3.1 3.3Zm7-5.3v6.2h-1.2v-8.5h.9l5.1 6.2v-6.2h1.2v8.5h-.9l-5.1-6.2ZM117 28l-1.5 3.2h-.8l.9-3.2h1.4Zm5.1 1.5V21h2.6c1.3 0 2.2.3 2.9.8 1.1.8 1.7 2 1.7 3.4s-.6 2.6-1.7 3.4c-.7.5-1.6.8-2.9.8l-2.6.1Zm4.9-6.6c-.5-.4-1.2-.7-2.5-.7h-1.3v6.2h1.3c1.2 0 1.9-.3 2.5-.7.6-.6 1.1-1.4 1.1-2.4s-.4-1.9-1.1-2.4Zm4.6 5c.4 0 .9.4.9.9 0 .4-.4.9-.9.9-.4 0-.9-.4-.9-.9.1-.5.5-.9.9-.9Zm6.7-7.1c1.2 0 2.4.5 3.1 1.3l-.8.8c-.5-.5-1.4-1-2.3-1-1.8 0-3.1 1.4-3.1 3.3s1.4 3.3 3.2 3.3c1.1 0 1.9-.6 2.5-1.2l.9.8c-.7 1-2 1.6-3.3 1.6-2.6 0-4.4-1.8-4.4-4.4-.1-2.5 1.7-4.5 4.2-4.5Zm5.8 7.1c.4 0 .9.4.9.9 0 .4-.4.9-.9.9-.4 0-.9-.4-.9-.9s.5-.9.9-.9Z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

/**
 * washingtonApp props
 * @property {string} [className] - modifier class
 * @property {string} fill - fill color, default: svg fill color
 * @property {number} height - icon height size
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {number} width - icon width size
 */
washingtonApp.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default washingtonApp;
