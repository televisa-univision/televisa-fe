import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * nfl component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const nfl = ({
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
        d="M173.44 32c22.507 0 39.787 3.84 43.2 7.36 8.427 8.427 19.413 98.773-29.547 147.733C158.187 216 114.88 224 82.56 224c-22.507 0-39.787-3.84-43.2-7.36-8.427-8.427-19.413-98.773 29.547-147.733C97.813 40 141.12 32 173.44 32zM53.76 159.36c-1.387 17.28-.107 32.427 1.813 40.853 5.44 1.174 14.827 2.454 26.987 2.454 3.627 0 8.427-.107 13.973-.534L53.76 159.36zm79.787-101.227c-16.96 4.16-35.414 11.84-49.494 25.92-13.76 13.654-21.653 31.68-26.133 49.6l64.427 64.427c17.066-4.16 35.52-11.84 49.706-26.027C185.6 158.4 193.6 140.48 198.08 122.667l-64.533-64.534zm3.78 31.814l.738.617 6.214 6.215 6.12-6.113 14.934 14.934-6.12 6.112 7.556 7.555a5.333 5.333 0 01-6.804 8.16l-.739-.617-7.555-7.557-13.781 13.782 6.971 6.975a5.333 5.333 0 01-6.804 8.16l-.738-.618-6.981-6.976-13.782 13.781 6.397 6.396a5.333 5.333 0 01-6.804 8.16l-.738-.618-6.396-6.396-4.022 4.04-14.934-14.933 4.023-4.04-7.375-7.374a5.333 5.333 0 016.804-8.16l.739.618 7.373 7.374 13.781-13.781-6.789-6.794a5.333 5.333 0 016.804-8.16l.739.618 6.788 6.794 13.792-13.781-6.215-6.214a5.333 5.333 0 016.804-8.16zm36.113-36.614c-3.733 0-8.64.107-14.187.64L202.24 96.96c1.387-17.493.107-32.747-1.813-41.173-5.44-1.174-14.827-2.454-26.987-2.454z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

nfl.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default nfl;
