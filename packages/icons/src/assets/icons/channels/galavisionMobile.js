import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

/**
 * galavisionMobile
 * @param {size} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {style} props.style - style override
 * @param {string} props.className - modifier class name
 * @returns {JSX}
 */
const galavisionMobile = ({
  width, height, fill, className, style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 15 16"
    className={className}
    style={style}
  >
    <G id="Page-1" fill="none" fillRule="evenodd">
      <G id="Deportes/TV-Logo/Mobile/color/galavision" fill={`${fill || '#F45814'}`}>
        <Path id="Fill-1" d="M11.54 14.986c-5.484.736-8.07-2.955-8.07-5.348 0-2.407 1.896-4.294 4.297-4.294.4 0 .787.055 1.155.156l1.999-4.423A7.723 7.723 0 0 0 7.77.41C3.479.41 0 3.898 0 8.201c0 4.303 3.48 7.791 7.77 7.791a7.723 7.723 0 0 0 3.876-1.036l-.106.03z" />
        <Path id="Fill-4" d="M6.92 13.453c.3.098.62.151.95.151 1.722 0 3.118-1.433 3.118-3.2 0-1.546-1.069-2.906-2.49-3.204h5.722c.37.702.58 1.507.58 2.362 0 2.75-2.171 4.978-4.85 4.978a4.746 4.746 0 0 1-2.898-.987l-.132-.1z" />
      </G>
    </G>
  </Svg>
);

galavisionMobile.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default galavisionMobile;
