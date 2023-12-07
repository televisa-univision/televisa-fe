import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { WHITE } from '../../../constants/colors';

/**
 * facebookRegistration icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const facebookRegistration = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M217.7 128.1a89.9 89.9 0 11-179.7 0 89.9 89.9 0 01179.7 0zm-104 27.2V180c0 1.6.3 2.2 2 2.1h18.5c1.7 0 2.1-.4 2.1-2.1v-49.4c0-2.6-.3-2.2 2.3-2.2h10.7c1.1 0 1.7-.2 1.8-1.4l1.5-15.9c.1-1.4-.3-1.7-1.6-1.6h-13.6c-.8 0-1.5 0-1.4-1 0-3.2-.1-6.4.1-9.5.2-4 2.6-6 6.6-6h9c.9 0 1.2-.3 1.2-1.2v-16c0-.8-.3-1-1.2-1-6.2 0-12.4-.2-18.6.1-6 .3-11.2 2.6-14.9 7.6A23 23 0 00114 96v12c0 1.4-.3 2-1.8 1.9H104c-1 0-1.3.2-1.3 1.3v15.7c0 1.1.4 1.4 1.4 1.4h7.9c1.4-.1 1.8.3 1.8 1.7v25.3z"
      fill={`${fill || WHITE}`}
      fillRule="evenodd"
    />
  </Svg>
);

facebookRegistration.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default facebookRegistration;
