import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path, G } from 'svgs';

/**
 * vigilantesDelTiempo component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const vigilantesDelTiempo = ({
  width, height, style, className,
}) => (
  <Svg width={width} height={height} style={style} className={className}>
    <G fill="#FFF" fillRule="evenodd">
      <Path d="M11.32 11.37h1.53L19.32.17h-2.4l-4.31 7.45L10.94.16H8.82l2.5 11.21Zm6.74 0h2.19L22.24.17h-2.18l-2 11.2Zm15.16-9.4A5.86 5.86 0 0 0 28.64 0a6.2 6.2 0 0 0-6.2 6.09c0 3.12 2.5 5.44 5.74 5.44a5.86 5.86 0 0 0 4.3-1.8l.93-5.33h-5.14l-.33 1.93h2.92l-.47 2.64c-.66.42-1.43.64-2.21.64-2 0-3.58-1.44-3.58-3.52a4.1 4.1 0 0 1 7.13-2.82l1.49-1.3Zm.54 9.4h2.19L37.94.17h-2.19l-1.99 11.2Zm4.16 0h6.9l.34-1.92h-4.72L42.1.16H39.9l-1.99 11.21Zm9.94 0 1.5-2.48h4.52l.66 2.48h2.16L53.73.17h-1.52l-6.8 11.2h2.45Zm4.65-7.64.85 3.24h-2.82l1.97-3.24Zm13.23 7.64h1.53L69.26.17h-2.19l-1.34 7.52L60.8.16H59.3l-2 11.21h2.2l1.32-7.53 4.93 7.53ZM70.43.17l-.34 1.91h2.97l-1.65 9.3h2.18l1.66-9.3h2.96l.34-1.92h-8.12Zm7.3 11.2h6.9l.34-1.92h-4.72l.56-3.12h3.44l.34-1.93h-3.44l.42-2.32h4.56l.34-1.92h-6.75l-1.99 11.21Zm7.77-1.7a5.32 5.32 0 0 0 4.08 1.86c2.17 0 3.97-1.47 3.97-3.44 0-3.22-4.18-3.3-4.18-4.8 0-.86.9-1.37 1.75-1.37.76 0 1.49.35 1.98.93l1.42-1.4A4.87 4.87 0 0 0 91.04 0c-2.12 0-3.8 1.38-3.8 3.27 0 3 4.17 2.83 4.17 4.83 0 .98-1 1.51-1.83 1.51A3.3 3.3 0 0 1 87 8.31l-1.5 1.36ZM22.31 16.01l-.47 2.7H26L23.7 31.78h3.07l2.32-13.07h4.18l.47-2.7H22.31Zm10.27 15.76h3.07l2.8-15.76h-3.07l-2.8 15.76Zm5.85 0h9.7l.48-2.7h-6.64l.79-4.39h4.83l.47-2.7h-4.83l.6-3.27h6.4l.47-2.7h-9.47l-2.8 15.76Zm18.7-2.58h2.15l4.99-6.1-1.56 8.68h3.07l2.8-15.76h-2.14l-7.74 9.44L54.9 16h-2.14l-2.8 15.76h3.07l1.6-8.89 2.5 6.3Zm16.12-6.54.7-3.94h2.12c1.27 0 1.81.25 2.13.68.24.32.36.7.36 1.1 0 .64-.28 1.24-.77 1.65-.36.31-.86.51-2.03.51h-2.5Zm2.64 2.7c1.79 0 2.82-.38 3.68-.98a4.8 4.8 0 0 0 2.03-3.88 4.4 4.4 0 0 0-1.03-2.86c-.86-1.01-2.24-1.62-4.34-1.62h-4.87l-2.8 15.76h3.07l1.13-6.41h3.13Zm9.33-1c0-3.1 2.64-5.86 5.68-5.86a4.81 4.81 0 0 1 4.92 4.95c0 3.09-2.64 5.86-5.68 5.86a4.81 4.81 0 0 1-4.92-4.96Zm13.65-.9c0-4.29-3.36-7.66-7.97-7.66a8.74 8.74 0 0 0-8.73 8.55c0 4.28 3.36 7.66 7.97 7.66 4.9 0 8.73-4.05 8.73-8.56ZM3.38 24.4c1.32 0 2.21-.3 2.93-.8a4.46 4.46 0 0 0 1.93-3.61 3.86 3.86 0 0 0-1.76-3.3 4.66 4.66 0 0 0-2.71-.66H1.49L0 24.4h3.38Zm-1.5-1.43.99-5.5h.9c1 0 1.56.2 1.99.58.56.49.88 1.2.86 1.94 0 .92-.44 1.8-1.17 2.36a3.1 3.1 0 0 1-2.08.62H1.88Zm6.5 1.44h5.17l.25-1.44h-3.53l.42-2.33h2.57l.25-1.44h-2.57l.32-1.74h3.4l.26-1.43H9.88l-1.5 8.38Zm6.14 0h5.16l.25-1.44h-3.52l1.23-6.94h-1.63l-1.49 8.38Z" />
    </G>
  </Svg>
);

/**
 * vigilantesDelTiempo props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
vigilantesDelTiempo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default vigilantesDelTiempo;
