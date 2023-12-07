import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

/**
 * noticiasLive component
 * @param {size} size - icon size
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const noticiasLive = ({
  width, height, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M7.8.2v11.1c.5 0 3.6.1 6.3-.1l2-.3c1.4-.3 2.7-.7 3.2-1V1.2c-1.3-.8-6-1-11.5-1"
        fill="#00C473"
      />
      <Path
        d="M19.3 10v-.2c-.5.4-1.8.8-3.3 1.1l-2 .3c-2.6.2-5.7.1-6.2.1v1.8a43.5 43.5 0 00.4 4.6c.3 1 .6 1.8 1 2.2h.4c3.3 0 6.2-1.6 8-4.1.6-.9 1-2 1.3-3.3.3-.8.4-1.6.4-2.5z"
        fill="#1D1DEA"
      />
      <Path
        d="M9.2 19.9c-.4-.4-.7-1.2-1-2.2a20.3 20.3 0 01-.4-4.6v-1.8c-2.6 0-4.8-.1-5.8-.3-1.1-.2-1.9-.6-2-.8a9.5 9.5 0 001.8 5.7 9.6 9.6 0 007.4 4"
        fill="#ED1C24"
      />
      <Path
        d="M.4.9C.2.9 0 1 0 1.2v9c.1.2.9.6 2 .8h.6c1.1.2 3 .3 5.2.3V4.5A10 10 0 00.4.9"
        fill="#C626B6"
      />
      <Path
        d="M79.5 12.4c.6.6 1.4 1 2.3 1 .8 0 1.4-.5 1.4-1.2 0-1.2-1.8-1.4-3-2.1-.8-.4-1.4-1-1.4-2.2 0-1.6 1.5-2.6 3.1-2.6 1 0 1.9.2 2.8.9l-1 1.3c-.4-.3-1-.6-1.6-.6-.7 0-1.5.3-1.5 1 0 1.6 4.4 1 4.4 4.3 0 1.7-1.5 2.8-3.2 2.8-1.3 0-2.5-.5-3.5-1.4l1.2-1.2zm-14.1-7h1.8V15h-1.8V5.5zm-8.6 4.8c0 1.8 1.4 3.2 3.3 3.2 1.2 0 2.1-.6 2.7-1.3l1.2 1.1a5 5 0 01-4 1.8c-3 0-5-2.1-5-4.8 0-2.8 2-5 5-5a5 5 0 013.5 1.4L62.3 8a3.2 3.2 0 00-5.5 2.3zm-5.2-4.8h1.9V15h-1.9V5.5zm-1.4 0V7h-2.5v8h-1.9V7h-2.5V5.4h6.9zm-12.4 8c1.8 0 3.1-1.5 3.1-3.2 0-1.8-1.3-3.3-3.1-3.3a3.2 3.2 0 00-3.1 3.3c0 1.7 1.3 3.2 3 3.2zm0-8.1c3 0 5 2.2 5 4.9 0 2.6-2 4.8-5 4.8s-5-2.2-5-4.8c0-2.7 2-5 5-5zm-15 .1h1.4l5.3 6.2V5.4h1.8V15H30l-5.3-6.2V15H23V5.4zm49 5.8h2.6L73 8l-1.3 3zm-3.5 3.7l4.1-9.5h1.3l4 9.5H76l-1-2.1h-3.8l-.9 2h-1.9z"
        fill="#FFF"
      />
      <Path
        d="M103 14.9H87.7V5.2H103c2.7 0 4.9 2.2 4.9 4.8 0 2.7-2.2 4.9-4.9 4.9"
        fill="#ED3A3A"
      />
      <Path
        fill="#FFF"
        d="M90.5 8h.9v3.4h2.1v.8h-3zm3.6 4.2h1V7.9h-1zM98.5 8h.9l-1.5 4.2h-.8l-1.4-4.3h.9l1 3.2zm4.7.7h-2.3v.9h2v.7h-2v1.1h2.4v.8H100V7.9h3z"
      />
    </G>
  </Svg>
);

/**
 * noticiasLive props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
noticiasLive.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default noticiasLive;
