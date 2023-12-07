import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * politics component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const politics = ({
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
        d="M53.333 170.67V224l-.01-152.512 106.68 3.184-106.67-.005v96.003zm0-138.67c2.946 0 5.613 1.194 7.543 3.124A10.633 10.633 0 0164 42.667c0 3.51-1.697 6.624-4.313 8.57l-1.022.673-5.342 3.087.01-1.655c-5.463-.007-9.977-4.123-10.594-9.43l-.072-1.245c0-2.946 1.194-5.613 3.124-7.543A10.633 10.633 0 0153.333 32z"
        stroke={`${fill || BLACK}`}
        strokeWidth={21.333}
        fill="#D8D8D8"
        fillRule="nonzero"
      />
      <Path
        d="M160 74.667c5.891 0 10.667 4.775 10.667 10.666V128c0 5.891-4.776 10.667-10.667 10.667H64c-5.891 0-10.667-4.776-10.667-10.667V85.333c0-5.89 4.776-10.666 10.667-10.666h96zm-90.667 42.666a5.333 5.333 0 100 10.667 5.333 5.333 0 000-10.667zm42.667 0A5.333 5.333 0 10112 128a5.333 5.333 0 000-10.667zm42.667 0a5.333 5.333 0 100 10.667 5.333 5.333 0 000-10.667zm-21.334-10.666a5.333 5.333 0 100 10.666 5.333 5.333 0 000-10.666zm-42.666 0a5.333 5.333 0 100 10.666 5.333 5.333 0 000-10.666zM69.333 96a5.333 5.333 0 100 10.667 5.333 5.333 0 000-10.667zM112 96a5.333 5.333 0 100 10.667A5.333 5.333 0 00112 96zm42.667 0a5.333 5.333 0 100 10.667 5.333 5.333 0 000-10.667zm-64-10.667a5.333 5.333 0 100 10.667 5.333 5.333 0 000-10.667zm42.666 0a5.333 5.333 0 100 10.667 5.333 5.333 0 000-10.667z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

politics.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default politics;
