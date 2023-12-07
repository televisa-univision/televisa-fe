import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop,
} from 'svgs';

/**
 * deportesApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const deportesApp = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Defs>
      <LinearGradient x1="98.49%" y1="90.06%" x2="35.88%" y2="38.77%" id="deportesApp">
        <Stop stopColor="#FFF" stopOpacity=".55" offset="0%" />
        <Stop stopColor="#FFF" stopOpacity=".5" offset="0%" />
        <Stop stopOpacity=".12" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="nonzero">
      <Path d="M26.67 0h202.66A26.66 26.66 0 0 1 256 26.67v202.66A26.66 26.66 0 0 1 229.33 256H26.67A26.66 26.66 0 0 1 0 229.33V26.67A26.66 26.66 0 0 1 26.67 0z" fill={`${fill || '#00C473'}`} />
      <Path d="M255.92 86.96L207.51 33c3.12 50.54 4.68 78.6 4.68 84.16 0 5.56-2.72 14.55-8.17 26.97l-17.36 23.14-12.82 22.9-40 19.06-25.35-3.1H88h4.98l76.24 49.81h60.82c12.4 0 25.88-10.73 25.88-26.05V86.96z" fillOpacity=".8" fill="url(#deportesApp)" style={{ mixBlendMode: 'multiply' }} />
      <Path d="M209.62 136.79l.3-1.38 1.18-5.74c.44-2.59.82-5.25 1.17-7.96l-26.23 17.27a57.23 57.23 0 0 1-56.82 49.35l-1.3-.02c-6.64-9.17-7.73-26.3-7.74-48.86 23.21-.2 52.38-.94 65.95-8.16l26.96-17.76c.6-6.9.91-14.17.91-22.04 0-24.35-3.16-47.13-6.35-61.57l-58.5 38.52c18.67.81 32.92 2.63 37.53 6.04l.04 51.76c-9.12 5.67-44.58 7.91-66.52 7.91l-.04-43.7-.02-22.58c6.2 0 12.22.07 17.98.2L200.5 27H50.03C46.61 41.17 43 65.44 43 91.5c0 13.94.92 26.17 2.78 37.37l24.5-16.14V75.69l.01.02v-.12a2.24 2.24 0 0 1 2.26-2.23c7.37 0 28.55 3.12 42.88 20.2l.1.1-.86 40.5c-6.5-.19-28.51-1.08-44.39-6.31v-7.49l-23.16 15.25.27 1.18c4.85 21.92 13.75 39.73 27.19 54.44 0 0 5 5.52 7.9 8.31l23.48-15.46a57.2 57.2 0 0 1-35.68-52.98c8.42 5.1 32.52 8.27 44.11 8.44.1 18.66 2.3 39.86 9.3 48.7a58.61 58.61 0 0 1-10-1.61l-26.42 17.39.67.6c10.74 8.64 24 16.62 40.56 24.38 16.55-7.76 29.82-15.74 40.56-24.38 1.4-1.2 2.9-2.6 4.56-4.23 2.59-2.3 8.81-9.16 8.81-9.16 13.43-14.71 22.33-32.52 27.19-54.44" fill="#FFF" />
    </G>
  </Svg>
);

/**
 * deportesApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
deportesApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default deportesApp;
