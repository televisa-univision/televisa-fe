import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * replay component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const replay = ({
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
      d="M158.649 510.488c-0.286 5.721-0.43 11.466-0.43 17.229-0 186.85 151.472 338.322 338.322 338.322 65.226 0 127.623-18.45 181.412-52.693 18.832-11.989 43.816-6.441 55.805 12.39s6.441 43.816-12.39 55.805c-66.669 42.443-144.106 65.34-224.827 65.34-231.498 0-419.164-187.666-419.164-419.164 0-5.757 0.116-11.501 0.348-17.229l-74.819 0 118.357-165.7 118.357 165.7h-80.971z M844.201 540.473c0.135-3.935 0.203-7.881 0.203-11.836 0-186.85-151.472-338.322-338.322-338.322-65.226 0-127.623 18.45-181.412 52.693-18.832 11.989-43.816 6.441-55.805-12.39s-6.441-43.816 12.39-55.805c66.669-42.443 144.106-65.34 224.827-65.34 231.498 0 419.164 187.666 419.164 419.164 0 3.952-0.055 7.897-0.164 11.836h75.141l-118.357 165.7-118.357-165.7h80.692z"
    />
  </Svg>
);

replay.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default replay;
