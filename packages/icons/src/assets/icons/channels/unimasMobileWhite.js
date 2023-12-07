import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

/**
 * unimasMobile component
 * @param {size} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {style} props.style - style override
 * @param {string} props.className - modifier class name
 * @returns {JSX}
 */
const unimasMobileWhite = ({
  width, height, fill, className, style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 14"
    className={className}
    style={style}
  >
    <G id="Page-1" fill="none" fillRule="evenodd">
      <G id="Deportes/TV-Logo/Mobile/white/unimas" fill={`${fill || '#FFFFFF'}`} fillRule="nonzero" transform="translate(0 -1)">
        <Path id="Shape" d="M15.132 1.705c-.127-.103-.357-.2-.701-.297-.94-.264-7.086.096-7.32.118-.234.023-.141.372-.141.372V1.9c.146-.002.305-.002.48-.002 1.719.006 3.949.126 4.746.39.64.21.578.357.578.357l-1.333 6.022c-.345 1.61-2.126 5.53-7.05 5.72-.07-.241-.088-.605-.07-1.034.016-.712.221-2.001.222-2.004.118-.752.26-1.458.355-1.897l.86-4.015c-.8-1.644-3.024-2.226-4.043-2.131-.086.008-.152.072-.177.181L.46 8.686c-.241 1.14-.66 6.06 4.91 6.06 5.014 0 7.632-4.034 8.172-6.068v.005l1.728-6.613c.023-.092.023-.236-.138-.366" />
      </G>
    </G>
  </Svg>
);

unimasMobileWhite.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default unimasMobileWhite;
