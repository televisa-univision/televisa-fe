import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * liveblogPageAll component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const liveblogPageAll = ({
  fill,
  height,
  width,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox="0 0 1024 1024"
    className={className}
    style={style}
  >
    <Path
      fill={`${fill || BLACK}`}
      d="M816.854 512.030l-379.693-367.458c-13.992-13.562-13.992-35.505 0-49.068s36.696-13.562 50.688 0l397.645 384.83c8.888 8.594 12.144 20.602 9.739 31.665 2.405 11.094-0.851 23.071-9.739 31.665l-397.645 384.83c-13.992 13.562-36.696 13.562-50.688 0s-13.992-35.505 0-49.068l379.693-367.397z M518.187 512.030l-379.693-367.458c-13.992-13.562-13.992-35.505 0-49.068s36.696-13.562 50.688 0l397.645 384.83c8.888 8.594 12.144 20.602 9.739 31.665 2.405 11.094-0.851 23.071-9.739 31.665l-397.645 384.83c-13.992 13.562-36.696 13.562-50.688 0s-13.992-35.505 0-49.068l379.693-367.397z"
    />
  </Svg>
);
liveblogPageAll.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default liveblogPageAll;
