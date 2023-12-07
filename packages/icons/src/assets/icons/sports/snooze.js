import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * snooze component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const snooze = ({
  width, height, fill, className, style, viewBox,
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
        d="M77.227 28c-3.77-4.506-10.478-5.103-14.984-1.333l-.002.001-32.723 27.388c-4.504 3.77-5.1 10.477-1.33 14.981l.025.03.022.026c3.79 4.495 10.505 5.075 15.01 1.296l32.657-27.392C80.406 39.22 80.998 32.508 77.227 28zM226.49 54.153L193.75 26.68c-4.504-3.78-11.22-3.2-15.01 1.296l-.021.024c-3.79 4.496-3.22 11.214 1.277 15.005l.02.016 32.738 27.472c4.505 3.78 11.22 3.2 15.011-1.295l.02-.025c3.791-4.496 3.22-11.214-1.276-15.004a10.88 10.88 0 00-.02-.016zM128 42.667c-53.013 0-96 42.986-96 96 0 53.013 42.88 96 96 96 53.013 0 96-42.987 96-96 0-53.014-42.987-96-96-96zm0 170.666c-41.28 0-74.667-33.386-74.667-74.666C53.333 97.387 86.72 64 128 64s74.667 33.387 74.667 74.667S169.28 213.333 128 213.333zm-21.333-96h28.053L98.596 159.13A10.667 10.667 0 0096 166.104v5.63a9.6 9.6 0 009.6 9.6h43.733c5.891 0 10.667-4.776 10.667-10.667S155.224 160 149.333 160H121.28l36.124-41.796A10.667 10.667 0 00160 111.23V105.6a9.6 9.6 0 00-9.6-9.6h-43.733C100.776 96 96 100.776 96 106.667c0 5.89 4.776 10.666 10.667 10.666z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

snooze.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default snooze;
