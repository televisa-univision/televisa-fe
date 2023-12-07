import React from 'react';
import Svg, { G, Path, Ellipse } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import {
  MOJO, MUSTARD, VERY_LIGHT_GREY, CARNATION_PINK, CASABLANCA, YELLOW_ORANGE,
} from '@univision/fe-utilities/styled/constants';

/**
 * langSpanish props
 * @param {string} className - modifier class
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} viewBox - viewBox value
 * @param {number} width - icon width size
 * @returns {JSX}
 */
const langSpanish = ({
  width, height, fill, className, style, viewBox,
}) => (
  <Svg
    viewBox={viewBox}
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <G transform="translate(16 52)" fillRule="nonzero" fill="none">
      <G fill={`${fill || MOJO}`}>
        <Path d="M0 134.625C0 144.22 7.51 152 16.776 152h190.448c9.265 0 16.776-7.779 16.776-17.375V120H0v14.625ZM207.224 0H16.776C7.51 0 0 7.779 0 17.375V32h224V17.375C224 7.78 216.49 0 207.224 0Z" />
      </G>
      <Path fill={MUSTARD} d="M0 32.002h224v88.001H0z" />
      <Path fill={`${fill || MOJO}`} d="m94.62 76 3.275-15.262c.302-1.405-.73-2.738-2.121-2.738h-2.306c-1.39 0-2.423 1.333-2.122 2.738L94.621 76Z" />
      <Path fill={VERY_LIGHT_GREY} d="M90.759 67.998h7.724v33.998h-7.724z" />
      <Path fill={CASABLANCA} d="M88.826 64.001h11.586v4H88.826z" />
      <G fill={`${fill || MOJO}`}>
        <Path d="M81.103 76h19.311v4h-19.31zM100.413 92l-11.586-4v-4l11.586 4zM36.69 76l3.274-15.262c.302-1.405-.73-2.738-2.121-2.738h-2.307c-1.39 0-2.422 1.333-2.121 2.738L36.69 76Z" />
      </G>
      <Path fill={VERY_LIGHT_GREY} d="M50.207 64c-2.133 0-3.862 1.791-3.862 4v26c0 4.86 4.38 14 19.31 14 14.931 0 19.31-9.14 19.31-14V68c0-2.209-1.729-4-3.862-4H50.207Z" />
      <G fill={`${fill || MOJO}`}>
        <Path d="M65.655 84h-19.31V68c0-2.209 1.73-4 3.862-4h15.448v20ZM65.655 84h19.31v10c0 5.523-4.322 10-9.655 10-5.332 0-9.655-4.477-9.655-10V84Z" />
      </G>
      <Path fill={CASABLANCA} d="M46.345 84h19.31v10c0 5.523-4.322 10-9.655 10-5.333 0-9.655-4.477-9.655-10V84Z" />
      <G fill={`${fill || MOJO}`}>
        <Path d="M61.793 101.955V84H57.93v19.798c1.436-.301 2.735-.96 3.862-1.843ZM54.069 103.798V84h-3.862v17.955c1.128.883 2.426 1.542 3.862 1.843Z" />
      </G>
      <Path fill={YELLOW_ORANGE} d="M50.208 76h11.586v4H50.208z" />
      <G fill={CASABLANCA}>
        <Path d="M50.208 67.998h11.586v4H50.208z" />
        <Path d="M52.137 70.377h7.724v7.246h-7.724z" />
      </G>
      <Path fill={VERY_LIGHT_GREY} d="M32.826 67.998h7.724v33.998h-7.724z" />
      <G fill={CASABLANCA}>
        <Path d="M30.896 100.002h11.586v4H30.896zM30.896 64.001h11.586v4H30.896z" />
      </G>
      <Path fill="#5064AA" d="M28.967 103.999h15.448v4H28.967z" />
      <Path fill={CASABLANCA} d="M90.759 100.002h11.586v4H90.759z" />
      <Path fill="#5064AA" d="M86.896 103.999h15.448v4H86.896z" />
      <Path fill={CASABLANCA} d="M54.071 60h23.173v4H54.071z" />
      <Path fill={YELLOW_ORANGE} d="M63.726 48.001h3.862v12h-3.862z" />
      <G fill={VERY_LIGHT_GREY}>
        <Path d="M61.793 54C58.598 54 56 51.308 56 48c0-3.309 2.599-6 5.793-6 3.195 0 5.793 2.692 5.793 6s-2.598 6-5.793 6Zm0-8c-1.065 0-1.931.896-1.931 2 0 1.103.865 2 1.93 2 1.067 0 1.932-.896 1.932-2 0-1.103-.865-2-1.931-2Z" />
        <Path d="M69.517 54c-3.194 0-5.793-2.692-5.793-6 0-3.309 2.6-6 5.793-6 3.195 0 5.793 2.692 5.793 6s-2.598 6-5.793 6Zm0-8c-1.065 0-1.93.896-1.93 2 0 1.103.865 2 1.93 2 1.066 0 1.932-.896 1.932-2 0-1.103-.866-2-1.932-2Z" />
        <Path d="M77.241 58c-3.194 0-5.792-2.692-5.792-6 0-3.309 2.598-6 5.792-6 3.195 0 5.793 2.692 5.793 6s-2.598 6-5.793 6Zm0-8c-1.065 0-1.93.896-1.93 2s.865 2 1.93 2c1.066 0 1.932-.896 1.932-2s-.866-2-1.932-2ZM54.069 58c-3.195 0-5.793-2.692-5.793-6 0-3.309 2.599-6 5.793-6s5.793 2.692 5.793 6-2.599 6-5.793 6Zm0-8c-1.065 0-1.931.896-1.931 2s.865 2 1.93 2C55.136 54 56 53.104 56 52s-.865-2-1.931-2Z" />
      </G>
      <Path fill={CASABLANCA} d="M77.242 92v2c0 1.103-.867 2-1.932 2-1.064 0-1.93-.897-1.93-2v-2h3.862m3.861-4H69.517v6c0 3.309 2.599 6 5.793 6 3.195 0 5.793-2.692 5.793-6v-6Z" />
      <Path fill={CARNATION_PINK} d="M75.31 80c-2.132 0-3.862-1.791-3.862-4v-4c0-2.21 1.73-4 3.862-4 2.133 0 3.863 1.79 3.863 4v4c0 2.209-1.73 4-3.863 4Z" />
      <Ellipse fill="#5064AA" cx="65.656" cy="83.998" rx="5.793" ry="6" />
      <Path fill={CASABLANCA} d="M63.726 39.999h3.862v12h-3.862z" />
      <Path fill={MOJO} d="m54.069 60-3.862-4 2.262-2.343C55.966 50.035 60.709 48 65.655 48s9.69 2.035 13.186 5.657L81.104 56l-3.862 4H54.069Z" />
      <G fill={MUSTARD} transform="translate(55.998 53.999)">
        <Ellipse cx="9.657" cy="2" rx="1.931" ry="2" />
        <Ellipse cx="1.931" cy="2" rx="1.931" ry="2" />
        <Ellipse cx="17.379" cy="2" rx="1.931" ry="2" />
      </G>
      <G fill={MOJO}>
        <Path d="M30.896 76h19.311v4h-19.31zM30.896 92l11.586-4v-4l-11.586 4z" />
      </G>
    </G>
  </Svg>
);

langSpanish.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default langSpanish;
