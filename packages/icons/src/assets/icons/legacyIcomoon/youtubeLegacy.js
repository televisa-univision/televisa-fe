import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * youtubeLegacy component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const youtubeLegacy = ({
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
      d="M918.672 311.44c-9.756-36.496-38.501-65.248-75.004-75.004-66.163-17.724-331.47-17.724-331.47-17.724s-265.3 0-331.463 17.724c-36.503 9.756-65.248 38.508-75.004 75.004-17.731 66.17-17.731 204.208-17.731 204.208s0 138.045 17.731 204.208c9.756 36.496 38.501 65.255 75.004 75.004 66.163 17.731 331.463 17.731 331.463 17.731s265.307 0 331.47-17.731c36.503-9.749 65.248-38.508 75.004-75.004 17.724-66.163 17.724-204.208 17.724-204.208s0-138.038-17.724-204.208z M427.361 642.909v-254.525l220.41 127.269-220.41 127.255z"
    />
  </Svg>
);

youtubeLegacy.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default youtubeLegacy;
