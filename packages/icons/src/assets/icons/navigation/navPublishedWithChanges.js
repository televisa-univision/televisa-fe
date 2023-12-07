import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * navPublishedWithChanges component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const navPublishedWithChanges = ({
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
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h256v256H0z" />
      <Path
        d="M180.8 109.12l-60.373 60.373a10.623 10.623 0 01-15.04 0L75.2 139.307a10.623 10.623 0 010-15.04 10.623 10.623 0 0115.04 0l22.613 22.613 52.8-52.8a10.623 10.623 0 0115.04 0 10.528 10.528 0 01.107 15.04zM42.667 128c0-24.853 10.88-47.147 27.946-62.72l16.32 16.32C90.24 84.907 96 82.56 96 77.76V32c0-2.987-2.347-5.333-5.333-5.333h-45.76c-4.8 0-7.147 5.76-3.734 9.066l14.294 14.4C34.56 69.547 21.333 97.173 21.333 128c0 50.667 35.414 93.12 82.774 104 6.72 1.493 13.226-3.52 13.226-10.453 0-5.014-3.52-9.28-8.426-10.454-37.867-8.64-66.24-42.56-66.24-83.093zm192 0c0-50.667-35.414-93.12-82.774-104-6.72-1.493-13.226 3.52-13.226 10.453 0 5.014 3.52 9.28 8.426 10.454 37.867 8.64 66.24 42.56 66.24 83.093 0 24.853-10.88 47.147-27.946 62.72l-16.32-16.32c-3.307-3.307-9.067-.96-9.067 3.84V224c0 2.987 2.347 5.333 5.333 5.333h45.76c4.8 0 7.147-5.76 3.734-9.066l-14.294-14.4c20.907-19.414 34.134-47.04 34.134-77.867z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

navPublishedWithChanges.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default navPublishedWithChanges;
