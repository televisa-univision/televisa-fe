import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop, RadialGradient,
} from 'svgs';

/**
 * conectaApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const conectaApp = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Defs>
      <LinearGradient x1="4.764%" y1="50%" x2="91.581%" y2="49.631%" id="conectaApp1">
        <Stop stopColor="#CA1F1B" offset="0%" />
        <Stop stopColor="#6D1E2C" offset="53.901%" />
        <Stop stopColor="#682531" offset="70.65%" />
        <Stop stopColor="#791416" offset="100%" />
      </LinearGradient>
      <RadialGradient cx="46.717%" cy="31.634%" fx="46.717%" fy="31.634%" r="535.006%" gradientTransform="matrix(.10666 -.012 .0001 .0814 .417 .296)" id="conectaApp2">
        <Stop stopColor="#FFF" stopOpacity=".21" offset="0%" />
        <Stop stopColor="#FFF" stopOpacity="0" offset="100%" />
      </RadialGradient>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="94.88%" id="conectaApp3">
        <Stop stopColor="#C93EC5" offset="0%" />
        <Stop stopColor="#2C90DF" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="conectaApp4">
        <Stop stopColor="#C91D18" offset="0%" />
        <Stop stopColor="#791416" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="18.007%" y1="49.628%" x2="90.646%" y2="48.713%" id="conectaApp5">
        <Stop stopColor="#2C90DF" offset="0%" />
        <Stop stopColor="#1B4AD3" offset="51.483%" />
        <Stop stopColor="#1804DE" offset="100%" />
      </LinearGradient>
      <RadialGradient cx="46.717%" cy="31.634%" fx="46.717%" fy="31.634%" r="393.012%" gradientTransform="matrix(.14667 0 0 .06119 .399 .297)" id="conectaApp6">
        <Stop stopColor="#FFF" stopOpacity=".21" offset="0%" />
        <Stop stopColor="#FFF" stopOpacity="0" offset="100%" />
      </RadialGradient>
      <LinearGradient x1="50%" y1="1.168%" x2="50%" y2="100%" id="conectaApp7">
        <Stop stopColor="#43CF81" offset="0%" />
        <Stop stopColor="#1700E0" offset="100%" />
      </LinearGradient>
      <RadialGradient cx="46.717%" cy="31.634%" fx="46.717%" fy="31.634%" r="220.087%" gradientTransform="matrix(.2619 0 0 .06119 .345 .297)" id="conectaApp8">
        <Stop stopColor="#FFF" stopOpacity=".21" offset="0%" />
        <Stop stopColor="#FFF" stopOpacity="0" offset="100%" />
      </RadialGradient>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="conectaApp9">
        <Stop stopColor="#C847C8" offset="0%" />
        <Stop stopColor="#CB1E14" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="6.205%" y1="49.671%" x2="95.375%" y2="50.511%" id="conectaApp10">
        <Stop stopColor="#C847C8" offset="0%" />
        <Stop stopColor="#6D6395" offset="41.681%" />
        <Stop stopColor="#43CF81" offset="100%" />
      </LinearGradient>
      <LinearGradient x1="10.679%" y1="50%" x2="92.783%" y2="50.36%" id="conectaApp11">
        <Stop stopColor="#C83EC6" offset="0%" />
        <Stop stopColor="#C71F46" offset="64.59%" />
        <Stop stopColor="#E72829" offset="100%" />
      </LinearGradient>
      <RadialGradient cx="46.717%" cy="31.634%" fx="46.717%" fy="31.634%" r="391.589%" gradientTransform="matrix(.1464 .06115 -.00055 .06107 .399 .268)" id="conectaApp12">
        <Stop stopColor="#FFF" stopOpacity=".21" offset="0%" />
        <Stop stopColor="#FFF" stopOpacity="0" offset="100%" />
      </RadialGradient>
      <RadialGradient cx="46.717%" cy="31.634%" fx="46.717%" fy="31.634%" r="208.951%" gradientTransform="matrix(.27586 0 0 .06119 .338 .297)" id="conectaApp13">
        <Stop stopColor="#FFF" stopOpacity=".21" offset="0%" />
        <Stop stopColor="#FFF" stopOpacity="0" offset="100%" />
      </RadialGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path d="M26.672 0h202.656C244.058 0 256 11.919 256 26.672v202.656c0 14.73-11.919 26.672-26.672 26.672H26.672C11.942 256 0 244.081 0 229.328V26.672C0 11.942 11.919 0 26.672 0z" fill={`${fill || '#ECECEC'}`} fillRule="nonzero" />
      <Path d="M52.627 154.529l127.814-3.006h12.186a324.6 324.6 0 0 0 0 6.105c0 4.27-1.349 8.62-7.22 8.62-7.017.27-50.61 1.94-130.78 5.009l-2-16.728z" fill="url(#conectaApp1)" />
      <Path d="M47.017 155.356l138.828-4.83a5.587 5.587 0 0 1 5.778 5.388 5.584 5.584 0 0 1-5.385 5.777h-.002l-138.828 4.83a5.587 5.587 0 0 1-5.778-5.389 5.584 5.584 0 0 1 5.385-5.776h.002z" fill="url(#conectaApp2)" />
      <Path fill="url(#conectaApp3)" d="M142.627 106.523v78h-14l.028-78z" />
      <Path fill="url(#conectaApp4)" d="M192.627 100.523v52h-12v-52z" />
      <Path d="M128.627 183.38l77.596-3.857 3.227 13.726c-47.053 2.75-71.15 4.153-72.292 4.208-4.65.508-8.51-1.914-8.531-6.539v-7.537z" fill="url(#conectaApp5)" />
      <Path d="M53.917 55.559L192.12 65.714a5.941 5.941 0 0 1 5.493 6.32 5.86 5.86 0 0 1-6.276 5.454L53.133 67.333a5.941 5.941 0 0 1-5.492-6.32 5.86 5.86 0 0 1 6.276-5.454z" fill="url(#conectaApp6)" opacity=".884" />
      <Path d="M216.627 186.496v-.625-105.99l-12-.358v114c2.073-.08 3.867-.162 5.38-.246 4.333-.204 6.62-3.269 6.62-6.781z" fill="url(#conectaApp7)" />
      <Path d="M139.767 179.992l66.775-3.402a8.5 8.5 0 0 1 8.92 8.032l.08 1.486a8.5 8.5 0 0 1-8.055 8.947l-66.775 3.401a8.5 8.5 0 0 1-8.92-8.031l-.08-1.487a8.5 8.5 0 0 1 8.055-8.946z" fill="url(#conectaApp8)" opacity=".737" transform="rotate(-3 173.627 187.523)" />
      <Path d="M54.627 71.523v99.734c-3.023.116-5.925.204-8.708.266-3.356.05-7.292-2.98-7.292-6.918V71.523h16z" fill="url(#conectaApp9)" />
      <Path d="M211.072 67.096c-3.02-.26-164.598-11.505-165.673-11.573-3.572 0-6.76 4.77-6.772 6.848v9.687l178 9.465-.002-7.595c0-3.165-2.34-6.569-5.553-6.832z" fill="url(#conectaApp10)" />
      <Path d="M187.113 94.569c-2.998-.253-50.696-1.98-51.763-2.046-3.546 0-6.704 3.206-6.723 6.646v8.36c33.608.794 52.59 1.113 56.945.955 6.534-.236 7.055-5.22 7.055-6.671v-.614c0-3.071-2.324-6.375-5.514-6.63z" fill="url(#conectaApp11)" />
      <Path d="M59.47 56.343l138.204 10.155a5.94 5.94 0 0 1 5.493 6.32 5.86 5.86 0 0 1-6.276 5.454L58.687 68.117a5.941 5.941 0 0 1-5.493-6.32 5.86 5.86 0 0 1 6.276-5.454z" fill="url(#conectaApp12)" opacity=".884" transform="rotate(1 128.18 67.307)" />
      <Path d="M142.049 92.54l43.632 1.604a7.21 7.21 0 0 1 6.941 7.445 7.159 7.159 0 0 1-7.418 6.917l-43.632-1.604a7.21 7.21 0 0 1-6.941-7.444 7.159 7.159 0 0 1 7.418-6.917z" fill="url(#conectaApp13)" opacity=".426" />
    </G>
  </Svg>
);

/**
 * conectaApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
conectaApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default conectaApp;
