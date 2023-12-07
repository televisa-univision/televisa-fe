import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * shareSpider component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const shareSpider = ({
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
      d="M768 724.305c-38.912 0-73.984 15.165-100.608 39.582l-364.8-213.59c2.816-11.566 4.608-23.647 4.608-35.984s-1.792-24.418-4.608-35.984l360.96-211.534c27.392 25.703 64 41.639 104.448 41.639 84.736 0 153.6-69.141 153.6-154.217s-68.864-154.217-153.6-154.217c-84.736 0-153.6 69.141-153.6 154.217 0 12.337 1.792 24.418 4.608 35.984l-360.96 211.534c-27.392-25.703-64-41.639-104.448-41.639-84.736 0-153.6 69.141-153.6 154.217s68.864 154.217 153.6 154.217c40.448 0 77.056-15.936 104.448-41.639l364.8 213.59c-2.56 10.795-4.096 22.104-4.096 33.671 0 82.763 66.816 149.847 149.248 149.847s149.248-67.084 149.248-149.847c0-82.763-66.816-149.847-149.248-149.847v0z"
    />
  </Svg>
);

shareSpider.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default shareSpider;
