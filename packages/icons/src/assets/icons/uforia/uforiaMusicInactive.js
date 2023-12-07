import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * uforiaMusicInactive component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const uforiaMusicInactive = ({
  width,
  height,
  fill,
  className,
  style,
  viewBox,
}) => (
  <Svg
    viewBox={viewBox}
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <G fill={`${fill || BLACK}`} fillRule="nonzero">
      <Path d="M53.25 127.8c11.764 0 21.3 9.536 21.3 21.3v10.65c0 11.764-9.536 21.3-21.3 21.3H21.3c-11.764 0-21.3-9.536-21.3-21.3V149.1c0-11.764 9.536-21.3 21.3-21.3h31.95zm0 21.3H21.3v10.65h31.95V149.1zm53.25-85.2c11.764 0 21.3 9.536 21.3 21.3v10.65c0 11.764-9.536 21.3-21.3 21.3H21.3c-11.764 0-21.3-9.536-21.3-21.3V85.2c0-11.764 9.536-21.3 21.3-21.3h85.2zm0 21.3H21.3v10.65h85.2V85.2zm0-85.2c11.764 0 21.3 9.536 21.3 21.3v10.65c0 11.764-9.536 21.3-21.3 21.3H21.3C9.536 53.25 0 43.714 0 31.95V21.3C0 9.536 9.536 0 21.3 0h85.2zm0 21.3H21.3v10.65h85.2V21.3zM127.8 127.8c23.527 0 42.6 19.073 42.6 42.6S151.327 213 127.8 213s-42.6-19.073-42.6-42.6 19.073-42.6 42.6-42.6zm0 21.3c-11.764 0-21.3 9.536-21.3 21.3 0 11.764 9.536 21.3 21.3 21.3 11.764 0 21.3-9.536 21.3-21.3 0-11.764-9.536-21.3-21.3-21.3zM202.35 0C208.232 0 213 4.768 213 10.65c0 5.462-4.111 9.963-9.408 10.578l-1.242.072H170.4v149.1c0 5.462-4.111 9.963-9.408 10.578l-1.242.072c-5.462 0-9.963-4.111-10.578-9.408l-.072-1.242V10.65c0-5.462 4.111-9.963 9.408-10.578L159.75 0h42.6z" />
    </G>
  </Svg>
);

uforiaMusicInactive.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default uforiaMusicInactive;
