import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * navList component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const navList = ({
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
        d="M42.667 138.667c5.866 0 10.666-4.8 10.666-10.667s-4.8-10.667-10.666-10.667C36.8 117.333 32 122.133 32 128s4.8 10.667 10.667 10.667zm0 42.666c5.866 0 10.666-4.8 10.666-10.666 0-5.867-4.8-10.667-10.666-10.667C36.8 160 32 164.8 32 170.667c0 5.866 4.8 10.666 10.667 10.666zm0-85.333c5.866 0 10.666-4.8 10.666-10.667 0-5.866-4.8-10.666-10.666-10.666C36.8 74.667 32 79.467 32 85.333 32 91.2 36.8 96 42.667 96zm42.666 42.667h128c5.867 0 10.667-4.8 10.667-10.667s-4.8-10.667-10.667-10.667h-128c-5.866 0-10.666 4.8-10.666 10.667s4.8 10.667 10.666 10.667zm0 42.666h128c5.867 0 10.667-4.8 10.667-10.666C224 164.8 219.2 160 213.333 160h-128c-5.866 0-10.666 4.8-10.666 10.667 0 5.866 4.8 10.666 10.666 10.666zm-10.666-96C74.667 91.2 79.467 96 85.333 96h128C219.2 96 224 91.2 224 85.333c0-5.866-4.8-10.666-10.667-10.666h-128c-5.866 0-10.666 4.8-10.666 10.666zm-32 53.334c5.866 0 10.666-4.8 10.666-10.667s-4.8-10.667-10.666-10.667C36.8 117.333 32 122.133 32 128s4.8 10.667 10.667 10.667zm0 42.666c5.866 0 10.666-4.8 10.666-10.666 0-5.867-4.8-10.667-10.666-10.667C36.8 160 32 164.8 32 170.667c0 5.866 4.8 10.666 10.667 10.666zm0-85.333c5.866 0 10.666-4.8 10.666-10.667 0-5.866-4.8-10.666-10.666-10.666C36.8 74.667 32 79.467 32 85.333 32 91.2 36.8 96 42.667 96zm42.666 42.667h128c5.867 0 10.667-4.8 10.667-10.667s-4.8-10.667-10.667-10.667h-128c-5.866 0-10.666 4.8-10.666 10.667s4.8 10.667 10.666 10.667zm0 42.666h128c5.867 0 10.667-4.8 10.667-10.666C224 164.8 219.2 160 213.333 160h-128c-5.866 0-10.666 4.8-10.666 10.667 0 5.866 4.8 10.666 10.666 10.666zm-10.666-96C74.667 91.2 79.467 96 85.333 96h128C219.2 96 224 91.2 224 85.333c0-5.866-4.8-10.666-10.667-10.666h-128c-5.866 0-10.666 4.8-10.666 10.666z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

navList.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default navList;
