import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';
import { GREEN_DARKER } from '../../../constants/colors';

/**
 * tudnRegistration component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const tudnRegistration = ({
  fill,
  height,
  width,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <Path
      d="M120.6 0C132 0 142 7.6 142 22.7c0 14-10 22-21.4 22H98V12.3l5.2 5.3v21.8h17.4A17 17 0 00137 22.3 17 17 0 00120.5 5H97.9V0h22.7zm1 12.4h-23V7H121c8.1.1 14.7 7 14.7 15.4s-6.6 15.2-14.7 15.3h-15.5V19.5l5 5.2v7.9h11.1c5.5 0 9.8-4.5 9.8-10.1 0-5.4-3.7-10.1-9.8-10.1zM0 0h44.6v5.3H0V0zm0 12.4V7.2h44.6v5.2H0zm23.2 7l5.1 5.3V45h-5V19.5zM21.4 45v.1h-5V12.4l5 5.2v27.3zm67-45h5v24c0 11.7-7.3 21.9-22 21.9-13.7 0-21.6-10.3-21.6-22V0h5v24a17 17 0 0016.8 17 17 17 0 0016.7-17V0zM56.1 0h5.1v24.3c0 5.6 4.4 10 10 10 5.1 0 9.7-3.8 9.7-10V0H86v24a15 15 0 01-14.9 15 15 15 0 01-15-15V0zm127.3.1h5v44.6H178l-18.6-24.4v24.4h-5.1V7h1L180 39.4h3.5V0zm-1.2 37.4h-.8L156.8 5H153v39.6h-5V0h11.2l18 23.7V0h5.1v37.5zM194.7 0c2 0 3.5 1.7 3.5 3.6 0 2-1.5 3.6-3.5 3.6s-3.5-1.6-3.5-3.6 1.6-3.6 3.5-3.6zm0 6.5c1.6 0 2.8-1.3 2.8-2.9 0-1.6-1.2-2.8-2.8-2.8a2.9 2.9 0 00-2.8 2.8c0 1.6 1.3 3 2.8 3zm-.5-2.6v1.7h-.8v-4h1.3c.5 0 .8.2 1 .4.3.2.4.5.4.9 0 .3-.2.7-.5.9h-.2l1.1 1.8h-1l-1-1.7h-.3zm.6-.7l.3-.1.1-.2v-.3l-.4-.1h-.6v.7h.6z"
      fill={`${fill || GREEN_DARKER}`}
      fillRule="evenodd"
    />
  </Svg>
);

tudnRegistration.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default tudnRegistration;
