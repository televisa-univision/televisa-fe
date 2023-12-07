import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { SUNFLOWER, BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * yellowCard component
 * @param {!Object} props - components props
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const yellowCard = ({
  height,
  width,
  viewBox,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox={viewBox}
    className={className}
    style={style}
  >
    <Path stroke={BLACK} strokeWidth="8" fill={SUNFLOWER} fillRule="evenodd" strokeLinejoin="round" d="M50.4513 67.1086l114.865-30.6972 41.2324 153.48-114.865 30.6972z" />
  </Svg>
);

yellowCard.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default yellowCard;
