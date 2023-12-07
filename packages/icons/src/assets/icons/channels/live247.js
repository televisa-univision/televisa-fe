import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, {
  G,
  Path,
  Defs,
  Use,
  Mask,
} from 'svgs';

/**
 * Live247 component
 * @param {size} size - icon size
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @returns {JSX}
 */
const live247 = ({
  width, height, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <Defs>
      <Path id="live247-logo-blue" d="M0 0h11.61v10.22H0z" />
      <Path id="live247-logo-red" d="M0 0h9.29v9.87H0z" />
      <Path id="live247-logo-s" d="M0 0h5.78v7.53H0z" />
      <Path id="live247-logo-g" d="M0 0h7.69v7.53H0z" />
      <Path id="live247-logo-u" d="M0 0h7.07v7.38H0z" />
      <Path id="live247-logo-all" d="M0 20h126.44V0H0z" />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path d="M7.82 0v11.32c.57 0 3.71.08 6.38-.15a28.2 28.2 0 0 0 1.95-.27c1.54-.29 2.83-.74 3.28-1.12V1.13C18.26.26 13.34 0 7.83 0" fill="#00C473" />
      <G transform="translate(7.82 9.78)">
        <Mask id="live24-mask-blue" fill="#fff">
          <Use href="#live247-logo-blue" />
        </Mask>
        <Path d="M11.6.14V0c-.44.38-1.73.83-3.27 1.12-.62.11-1.28.2-1.95.26-2.67.24-5.82.16-6.38.16A54.71 54.71 0 0 0 .1 5c.08 1.12.2 2.17.4 3.05.21.98.52 1.74.95 2.15l.02.02h.42a9.7 9.7 0 0 0 7.96-4.14 9.96 9.96 0 0 0 1.42-3.32c.22-.83.34-1.7.34-2.6" fill="#1D1DEA" mask="url(#live24-mask-blue)" />
      </G>
      <G transform="translate(0 10.12)">
        <Mask id="live24-mask-red" fill="#fff">
          <Use href="#live247-logo-red" />
        </Mask>
        <Path d="M9.27 9.85c-.43-.4-.74-1.17-.95-2.15-.2-.87-.32-1.92-.4-3.04a43.82 43.82 0 0 1-.1-3.46C5.26 1.2 3.05 1.01 2 .82.87.62.13.2 0 0a9.68 9.68 0 0 0 9.3 9.87l-.03-.02" fill="#ED1C24" mask="url(#live24-mask-red)" />
      </G>
      <Path d="M.38.67C.17.67 0 .84 0 1.05v9.07c.13.2.87.62 1.99.82l.6.1c1.18.15 3.09.28 5.23.28V4.34A10.03 10.03 0 0 0 .38.67" fill="#C626B6" />
      <Path fill="#FFF" d="M41.35 19.85h-1.94v-7.23h1.94zM53.79 19.85h-1.94v-7.23h1.94zM64.63 19.85h-1.94v-7.23h1.94zM32.52 19.85v-4c0-1 .75-1.58 1.6-1.58.89 0 1.6.69 1.6 1.58v4h1.93v-3.93a3.34 3.34 0 0 0-3.5-3.45c-2.38 0-3.57 1.61-3.57 3.45v3.93h1.94ZM77.05 19.85v-4c0-1 .74-1.58 1.58-1.58.9 0 1.6.69 1.6 1.58v4h1.94v-3.93a3.34 3.34 0 0 0-3.5-3.45c-2.38 0-3.57 1.61-3.57 3.45v3.93h1.95ZM46.59 17.03l1.99-4.41h2.01l-3.32 7.23h-1.34l-3.33-7.23h2.01z" />
      <G transform="translate(55.35 12.47)">
        <Mask id="live24-mask-s" fill="#fff">
          <Use href="#live247-logo-s" />
        </Mask>
        <Path d="M.94 5.17c.49.45 1.25.72 1.98.72.52 0 .92-.26.92-.61 0-1.09-3.5-.7-3.5-3.03C.34.86 1.68 0 3.11 0c.94 0 1.97.36 2.45.73l-.9 1.4a2.45 2.45 0 0 0-1.4-.49c-.53 0-.98.2-.98.58 0 .94 3.5.57 3.5 3.07 0 1.39-1.35 2.24-2.87 2.24A5 5 0 0 1 0 6.56l.94-1.39Z" fill="#FFF" mask="url(#live24-mask-s)" />
      </G>
      <G transform="translate(66.02 12.47)">
        <Mask id="live247-mask-o" fill="#fff">
          <Use href="#live247-logo-g" />
        </Mask>
        <Path d="M3.85 5.74c1.14 0 1.9-.88 1.9-1.97 0-1.09-.76-1.98-1.9-1.98-1.13 0-1.9.9-1.9 1.98a1.9 1.9 0 0 0 1.9 1.97m0-5.74a3.76 3.76 0 1 1 0 7.53 3.76 3.76 0 1 1 0-7.53" fill="#FFF" mask="url(#live247-mask-o)" />
      </G>
      <G transform="translate(21.92 12.62)">
        <Mask id="live247-mask-u" fill="#fff">
          <Use href="#live247-logo-u" />
        </Mask>
        <Path d="M5.13 0v4c0 .99-.75 1.58-1.6 1.58-.89 0-1.6-.69-1.6-1.58V0H0v3.93a3.34 3.34 0 0 0 3.5 3.45c2.38 0 3.57-1.61 3.57-3.45V0H5.13Z" fill="#FFF" mask="url(#live247-mask-u)" />
      </G>
      <Path fill="#FFF" d="M23.43 2.95v7.72h-1.51V.15h1.06l6.31 7.73V.15h1.5v10.52h-1.05zM37.03 9.4c2.15 0 3.76-1.7 3.76-3.99 0-2.27-1.6-3.98-3.76-3.98-2.15 0-3.75 1.71-3.75 3.98 0 2.29 1.6 3.99 3.75 3.99m0-9.4a5.25 5.25 0 0 1 5.27 5.41 5.25 5.25 0 0 1-5.27 5.42 5.25 5.25 0 0 1-5.26-5.42A5.25 5.25 0 0 1 37.03 0M42 .15h7.21v1.43h-2.85v9.09h-1.51V1.58H42z" />
      <Mask id="live247-mask-all" fill="#fff">
        <Use href="#live247-logo-all" />
      </Mask>
      <Path fill="#FFF" mask="url(#live247-mask-all)" d="M50.19 10.67h1.5V.15h-1.5zM58 0c1.5 0 2.92.62 3.84 1.62l-1 1a4 4 0 0 0-2.85-1.2 3.84 3.84 0 0 0-3.82 4 3.83 3.83 0 0 0 3.96 3.98c1.41 0 2.43-.79 3.02-1.5l1.07.97a5.3 5.3 0 0 1-4.1 1.96 5.28 5.28 0 0 1-5.45-5.42A5.28 5.28 0 0 1 58 0M62.97 10.67h1.5V.15h-1.5zM68.56 6.54h3.25l-1.62-3.9-1.63 3.9Zm3.84 1.43h-4.44l-1.1 2.7H65.3L69.66.15h1.05l4.36 10.52h-1.56l-1.11-2.7ZM76.26 8.04a3.35 3.35 0 0 0 2.57 1.36c.98 0 1.84-.63 1.84-1.58 0-1.61-2.23-1.8-3.63-2.7A2.68 2.68 0 0 1 75.7 2.8c0-1.54 1.36-2.8 3.2-2.8 1.33 0 2.26.59 2.82 1.05l-.89 1.1a2.9 2.9 0 0 0-1.88-.72c-.87 0-1.74.5-1.74 1.41 0 1.34 2.24 1.63 3.6 2.53.7.46 1.36 1.2 1.36 2.4 0 1.85-1.43 3.06-3.26 3.06a4.72 4.72 0 0 1-3.69-1.76l1.04-1.03Z" />
      <Path fill="#1D1DEA" mask="url(#live247-mask-all)" d="M110.96.15h-26.3l.02 19.7h26.3z" />
      <Path d="M91.14 9.82c1.1-.43 3.36-.92 3.5-2.15.15-1.07-.5-1.34-1.23-1.34-.84 0-1.5.27-1.52 1.85h-3.81c.02-3.3 1.55-4.82 5.12-4.82 4.12 0 5.64 2.32 5.45 4.63-.14 1.79-1.68 2.75-3.28 3.45-.7.3-3.25 1.1-3.33 1.92l-.02.25h6.05l-2.26 3.07H88.1c.05-3.6-.37-5.4 3.04-6.86" fill="#FFF" mask="url(#live247-mask-all)" />
      <Path d="m104.42 11.18.02-3.55-2.72 3.55h2.7Zm0 2.43h-6.36v-2.44l5.65-7.6h4.77v7.61h2.5v2.43h-2.53v3.07h-4.05l.02-3.07Z" fill="#FFF" mask="url(#live247-mask-all)" />
      <Path fill="#ED1C24" mask="url(#live247-mask-all)" d="M126.43.15h-15.45l.01 19.7h15.45z" />
      <Path fill="#FFF" mask="url(#live247-mask-all)" d="m123.89 6.83-5.14 9.85h-4.53l5.76-9.96h-6.5l-.01-3.15h10.45z" />
    </G>
  </Svg>
);

/**
 * live247 props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 */
live247.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default live247;
