import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * uforiaMusicActive component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const uforiaMusicActive = ({
  width,
  height,
  fill,
  className,
  style,
  viewBox,
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
        d="M74.667 149.333c5.89 0 10.666 4.776 10.666 10.667s-4.775 10.667-10.666 10.667H32c-5.891 0-10.667-4.776-10.667-10.667S26.11 149.333 32 149.333h42.667zm64-53.333c5.89 0 10.666 4.776 10.666 10.667 0 5.89-4.775 10.666-10.666 10.666H32c-5.891 0-10.667-4.775-10.667-10.666S26.11 96 32 96h106.667zm0-53.333c5.89 0 10.666 4.775 10.666 10.666S144.558 64 138.667 64H32c-5.891 0-10.667-4.776-10.667-10.667 0-5.89 4.776-10.666 10.667-10.666h106.667zM149.333 149.333C172.897 149.333 192 168.436 192 192s-19.103 42.667-42.667 42.667-42.666-19.103-42.666-42.667 19.102-42.667 42.666-42.667zm74.667-128c5.891 0 10.667 4.776 10.667 10.667 0 5.47-4.118 9.979-9.423 10.595l-1.244.072h-32V192c0 5.47-4.118 9.979-9.423 10.595l-1.244.072c-5.47 0-9.978-4.118-10.595-9.423l-.071-1.244V32c0-5.47 4.117-9.979 9.422-10.595l1.244-.072H224z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

uforiaMusicActive.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default uforiaMusicActive;
