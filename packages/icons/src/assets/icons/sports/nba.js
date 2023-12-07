import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * nba component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const nba = ({
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
        d="M52.575 52.575c41.635-41.634 109.215-41.634 150.85 0 41.634 41.635 41.634 109.215 0 150.85-41.635 41.634-109.215 41.634-150.85 0-41.634-41.635-41.634-109.215 0-150.85zM128 143.085l-52.27 52.27c14.708 11.388 32.358 17.272 50.007 17.724-.452-19.158 5.506-38.391 17.876-54.381L128 143.085zm30.849 30.849c-7.844 11.163-11.917 24.136-11.842 37.184 11.842-2.79 23.23-7.995 33.262-15.764l-21.42-21.42zm-61.547-61.547c-15.914 12.445-35.223 18.328-54.381 17.876.452 17.65 6.336 35.299 17.725 50.006L112.916 128l-15.614-15.613zm113.816 34.62c-13.124 0-26.097 3.922-37.184 11.842l21.42 21.42c7.769-10.031 12.973-21.42 15.764-33.262zm-15.764-71.276L143.084 128l15.614 15.613c15.99-12.37 35.299-18.404 54.532-17.876-.528-17.725-6.487-35.299-17.876-50.006zm-65.091-32.96c.528 19.232-5.506 38.541-17.876 54.531L128 112.915l52.27-52.27c-14.708-11.388-32.282-17.347-50.007-17.875zM60.646 75.73c-7.769 10.031-12.973 21.42-15.764 33.262 13.124 0 26.097-3.922 37.184-11.842l-21.42-21.42zm48.347-30.849c-11.842 2.79-23.23 7.995-33.262 15.764l21.42 21.42c7.92-11.087 11.842-24.06 11.842-37.184z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

nba.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default nba;
