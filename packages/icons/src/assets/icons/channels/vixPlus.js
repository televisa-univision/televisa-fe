import React from 'react';
import Svg, { Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { INTERNATIONAL_ORANGE } from '@univision/fe-utilities/styled/constants';

/**
 * vixPlus props
 * @property {string} className - modifier class
 * @property {string} fill - fill color, default: svg file color
 * @property {number} height - icon height size
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} viewBox - svg viewBox
 * @property {number} width - icon width size
 * @returns {JSX}
 */
const vixPlus = ({
  className,
  fill,
  height,
  style,
  width,
  viewBox,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox={viewBox}
    style={style}
    className={className}
  >
    <Path fill={fill || INTERNATIONAL_ORANGE} d="m797 454 68-108c1-3 1-5-1-8L749 153l-2-4c-4-8-1-14 8-14h137c8 0 14 4 18 11l62 108 3 5 3-5 61-106c5-9 12-13 22-13h129c4 0 9-1 11 4 3 5 1 9-2 13l-106 170-10 17c-2 2-2 4 0 7l114 184 3 4c5 9 1 16-9 16h-134c-9 0-16-4-20-12l-61-106-4-7-6 11-58 101c-5 9-12 13-22 13H757c-4 0-8 0-11-5-2-4-1-8 2-12l49-79zM479 281l-80 256c-3 10-7 13-18 13H209c-10 0-14-3-17-13L70 149c-3-10 0-14 10-14h124c10 0 14 3 17 12l74 268 2 4 5-17 71-255c3-9 7-12 16-12h122c9 0 12 5 10 13l-42 133z M1338 383h-20c-9 0-13-5-13-13v-69h-66c-10 0-14-4-14-14v-57c0-10 4-14 14-14h66v-68c0-9 4-13 13-13h62c9 0 13 4 13 13v68h66c10 0 14 4 14 15v56c0 10-4 14-14 14h-66v68c0 10-4 14-14 14h-41zM704 415v121c0 10-4 14-14 14H567c-10 0-14-4-14-14V344c0-10 4-14 14-14h123c10 0 14 4 14 14v71zM586 141a84 84 0 1 1 85 145 84 84 0 0 1-85-145z" />
  </Svg>
);

vixPlus.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  width: PropTypes.number,
  viewBox: PropTypes.string,
};

export default vixPlus;
