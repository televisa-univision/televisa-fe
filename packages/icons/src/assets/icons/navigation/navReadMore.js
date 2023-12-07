import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * navReadMore component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const navReadMore = ({
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
      <Path d="M0 0h256v256H0z" />
      <G fill={`${fill || BLACK}`} fillRule="nonzero">
        <Path d="M149.333 96H224c5.867 0 10.667-4.8 10.667-10.667 0-5.866-4.8-10.666-10.667-10.666h-74.667c-5.866 0-10.666 4.8-10.666 10.666 0 5.867 4.8 10.667 10.666 10.667zM224 160h-74.667c-5.866 0-10.666 4.8-10.666 10.667 0 5.866 4.8 10.666 10.666 10.666H224c5.867 0 10.667-4.8 10.667-10.666 0-5.867-4.8-10.667-10.667-10.667zM224 117.333h-42.667c-5.866 0-10.666 4.8-10.666 10.667s4.8 10.667 10.666 10.667H224c5.867 0 10.667-4.8 10.667-10.667s-4.8-10.667-10.667-10.667zM94.4 83.733c-3.307-3.306-9.067-.96-9.067 3.84v29.76H32c-5.867 0-10.667 4.8-10.667 10.667s4.8 10.667 10.667 10.667h53.333v29.76c0 4.8 5.76 7.146 9.067 3.733l40.427-40.427c2.133-2.133 2.133-5.44 0-7.573L94.4 83.733z" />
      </G>
    </G>
  </Svg>
);

navReadMore.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default navReadMore;
