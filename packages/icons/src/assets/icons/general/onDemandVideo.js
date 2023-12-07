import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * onDemandVideo component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const onDemandVideo = ({
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
        d="M224 32H32c-11.733 0-21.333 9.6-21.333 21.333v128c0 11.734 9.6 21.334 21.333 21.334h53.333v10.666C85.333 219.2 90.133 224 96 224h64c5.867 0 10.667-4.8 10.667-10.667v-10.666H224c11.733 0 21.227-9.6 21.227-21.334l.106-128c0-11.84-9.6-21.333-21.333-21.333zm-10.667 149.333H42.667c-5.867 0-10.667-4.8-10.667-10.666V64c0-5.867 4.8-10.667 10.667-10.667h170.666C219.2 53.333 224 58.133 224 64v106.667c0 5.866-4.8 10.666-10.667 10.666zm-58.88-54.72L112 150.933c-7.147 4.054-16-1.173-16-9.28v-48.64c0-8.213 8.853-13.333 16-9.28l42.453 24.32c7.147 4.16 7.147 14.4 0 18.56z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

onDemandVideo.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default onDemandVideo;
