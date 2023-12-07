import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * playLegacy component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const playLegacy = ({
  fill,
  height,
  width,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox="0 0 1024 1024"
    className={className}
    style={style}
  >
    <Path
      fill={`${fill || BLACK}`}
      d="M509.072 993.61c269.493 0 487.932-217.711 487.932-486.235s-218.439-486.235-487.932-486.235c-269.493 0-487.932 217.711-487.932 486.235s218.439 486.235 487.932 486.235zM509.072 1014.751c-281.153 0-509.072-227.16-509.072-507.375s227.919-507.375 509.072-507.375c281.153 0 509.072 227.16 509.072 507.375s-227.919 507.375-509.072 507.375z M433.094 380.532v259.875l217.287-129.938z"
    />
  </Svg>
);

playLegacy.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default playLegacy;
