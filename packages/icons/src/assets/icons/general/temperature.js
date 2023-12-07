import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * temperature icon component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const temperature = ({
  fill,
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
    <Path
      d="M160 136.339114V25.530225h-42.666667v110.808889c-19.6838098 6.558193-32.6428329 24.607232-31.9999997 44.568889.2517961 13.294183 6.0200783 25.94442 16.0289497 35.152582 10.008871 9.208162 23.43347 14.215375 37.304384 13.914084 13.860867.328925 27.285892-4.655221 37.29801-13.847179C185.976795 206.935531 191.74854 194.295443 192 181.010225c.690273-19.998833-12.277622-38.101654-32-44.671111zm-21.333333 83.413333c-11.041985.302088-21.75387-3.627803-29.762564-10.919051C100.895409 201.542147 96.2510757 191.491481 96 180.908003c-.880272-16.827329 10.782553-31.901121 27.84-35.982222l3.733333-1.124445V86.8635583h21.333334v56.9377777l3.733333 1.124445c17.276202 3.928903 29.274576 18.975192 28.693333 35.982222-.222586 10.592542-4.858126 20.659447-12.873233 27.956534-8.015106 7.297086-18.743463 11.217729-29.793433 10.88791zM74.6666667 35.7524472h32.0000003v10.2222222H74.6666667V35.7524472zm0 81.7777778h32.0000003v10.222222H74.6666667v-10.222222zm0-61.3333334H96v10.2222222H74.6666667V56.1968916zm0 20.4444445H96v10.2222222H74.6666667V76.6413361zm0 20.4444444H96v10.2222225H74.6666667V97.0857805z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

temperature.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default temperature;
