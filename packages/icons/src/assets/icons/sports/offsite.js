import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path } from 'svgs';

import { BLACK, CINNABAR, SUNFLOWER } from '@univision/fe-utilities/styled/constants';

/**
 * offsite component
 * @param {!Object} props - components props
 * @param {string} props.fill - custom fill color
 * @param {string} props.stroke - custom stroke color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {string} props.className - class name modifier
 * @param {Object} props.style - style override
 * @returns {JSX}
 */
const offsite = ({
  fill,
  stroke,
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
    <G fill="none" fillRule="evenodd">
      <Path
        fill={SUNFLOWER}
        d="M52.614 111.157L97.87 65.902l30.17 30.17-45.255 45.255z"
      />
      <Path
        fill={CINNABAR}
        d="M82.718 141.344l45.255-45.255 30.17 30.17-45.255 45.255zM97.84 65.82l45.256-45.255 30.17 30.17L128.01 95.99z"
      />
      <Path
        fill={SUNFLOWER}
        d="M128.052 95.9l45.255-45.255 30.17 30.17-45.255 45.255z"
      />
      <Path
        fill={`${stroke || fill || BLACK}`}
        fillRule="nonzero"
        d="M42.552 115.352l7.542-7.543 120.68 120.68-7.542 7.543z"
      />
    </G>
  </Svg>
);

offsite.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default offsite;
