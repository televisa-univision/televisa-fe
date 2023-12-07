import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * news component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const news = ({
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
        d="M117.333 192h32C155.2 192 160 187.2 160 181.333v-42.666C160 132.8 155.2 128 149.333 128h-32c-5.866 0-10.666 4.8-10.666 10.667v42.666c0 5.867 4.8 10.667 10.666 10.667zm-64 0h32C91.2 192 96 187.2 96 181.333V64c0-5.867-4.8-10.667-10.667-10.667h-32c-5.866 0-10.666 4.8-10.666 10.667v117.333c0 5.867 4.8 10.667 10.666 10.667zm128 0h32C219.2 192 224 187.2 224 181.333v-42.666C224 132.8 219.2 128 213.333 128h-32c-5.866 0-10.666 4.8-10.666 10.667v42.666c0 5.867 4.8 10.667 10.666 10.667zM106.667 64v42.667c0 5.866 4.8 10.666 10.666 10.666h96c5.867 0 10.667-4.8 10.667-10.666V64c0-5.867-4.8-10.667-10.667-10.667h-96c-5.866 0-10.666 4.8-10.666 10.667z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

news.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default news;
