import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * liveblogComment component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const liveblogComment = ({
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
      d="M487.443 712.205l-9.998 8.234-182.060 149.455v-156.58l-29.787-5.292c-128.174-22.774-222.931-134.783-222.931-266.586 0-149.525 121.202-270.769 270.622-270.769h397.422c149.47 0 270.622 121.2 270.622 270.769 0 149.525-121.202 270.769-270.622 270.769h-223.268zM295.385 513.641c39.878 0 72.205-32.327 72.205-72.205s-32.327-72.205-72.205-72.205c-39.878 0-72.205 32.327-72.205 72.205s32.327 72.205 72.205 72.205zM512 513.641c39.878 0 72.205-32.327 72.205-72.205s-32.327-72.205-72.205-72.205c-39.878 0-72.205 32.327-72.205 72.205s32.327 72.205 72.205 72.205zM728.615 513.641c39.878 0 72.205-32.327 72.205-72.205s-32.327-72.205-72.205-72.205c-39.878 0-72.205 32.327-72.205 72.205s32.327 72.205 72.205 72.205z"
    />
  </Svg>
);

liveblogComment.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default liveblogComment;
