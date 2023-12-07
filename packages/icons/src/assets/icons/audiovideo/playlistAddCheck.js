import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { BLACK } from '../../../constants/colors';

/**
 * playlistAddCheck props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 * @returns {JSX}
 */
const playlistAddCheck = ({
  width, height, fill, className, style,
}) => (
  <Svg
    viewBox="0 0 24 24"
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h24v24H0z" />
      <Path
        d="M13 10H3a1 1 0 000 2h10a1 1 0 000-2zm0-4H3a1 1 0 100 2h10a1 1 0 000-2zM3 16h6a1 1 0 000-2H3a1 1 0 000 2zm19.207-3.793l.086.086c.39.39.39 1.024 0 1.415l-5.576 5.584c-.39.39-1.024.391-1.415.002l-3.093-3.087a1 1 0 01-.001-1.415l.086-.086a1 1 0 011.413-.001L16.01 17l4.784-4.792a.999.999 0 011.413 0z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

playlistAddCheck.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  width: PropTypes.number,
};

export default playlistAddCheck;
