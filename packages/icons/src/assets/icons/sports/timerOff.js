import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * timerOff component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const timerOff = ({
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
      <Path d="M0 0h256v256H0V0zm0 0h256v256H0V0zm0 0h256v256H0V0zm0 0h256v256H0V0zm0 0h256v256H0V0z" />
      <Path
        d="M187.947 63.68C171.413 50.56 150.613 42.667 128 42.667c-19.52 0-37.653 5.866-52.8 15.786l15.573 15.574C101.653 67.733 114.453 64 128 64c41.28 0 74.667 33.387 74.667 74.667 0 13.546-3.734 26.346-10.027 37.226l15.467 15.467C218.133 176.32 224 158.187 224 138.667c0-22.614-7.893-43.414-21.013-59.84l7.63-7.631c4.156-4.155 4.168-10.889.027-15.058l-.03-.031c-4.14-4.168-10.873-4.192-15.04-.053-.01.008-.019.017-.027.026l-7.6 7.6zm-38.614-53.013h-42.666C100.776 10.667 96 15.442 96 21.333S100.776 32 106.667 32h42.666C155.224 32 160 27.224 160 21.333c0-5.89-4.776-10.666-10.667-10.666zm-32 90.026l21.334 21.334V96c0-5.891-4.776-10.667-10.667-10.667S117.333 90.11 117.333 96v4.693zM25.44 49.44a9.596 9.596 0 00-.012 13.559L48 85.653C37.867 100.8 32 119.04 32 138.667c0 53.013 42.88 96 96 96 19.627 0 37.867-5.867 53.12-16l19.893 19.893a9.579 9.579 0 1013.547-13.547l-75.467-75.466L38.987 49.44a9.579 9.579 0 00-13.547 0zM128 213.333c-41.28 0-74.667-33.386-74.667-74.666 0-13.654 3.734-26.454 10.134-37.547L165.44 203.093a73.242 73.242 0 01-37.44 10.24z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

timerOff.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default timerOff;
