import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, Defs, G, LinearGradient, Stop, Rect,
} from 'svgs';

/**
 * tudnApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const tudnApp = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Defs>
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="tudnAppIcon">
        <Stop stopColor="#19916E" offset="0%" />
        <Stop stopColor="#045745" offset="100%" />
      </LinearGradient>
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Rect fill={`${fill || 'url(#tudnAppIcon)'}`} width="256" height="256" rx="40.96" />
      <G fill="#FFF">
        <Path d="M152.12 102.444h-24.457v5.926h24.256c9.897.111 17.877 9.033 17.877 20.011 0 10.981-7.98 19.903-17.877 20.012h-18.727v-25.501l-5.53-6.122v37.816h24.453c12.17 0 23.014-9.385 23.014-25.766-.022-17.562-10.745-26.376-23.011-26.376h.002z" />
        <Path d="M152.592 116.77c6.598 0 10.55 5.53 10.55 11.745 0 6.559-4.624 11.764-10.55 11.764h-12.03v-9.23l-5.372-5.945v21.103h16.712v-.024.024c8.79-.109 15.9-8.048 15.9-17.826 0-9.775-7.09-17.693-15.9-17.824v.025-.025h-24.237v6.19l24.927.023zM21.333 102.444h48.16v6.059h-48.16v-6.06zm0 14.326h48.16v-6.038h-48.16v6.038zm25.087 8.266v29.678h5.453v-23.618l-5.453-6.06zm-2.014 29.547v-31.778l-5.453-6.035v37.944h5.455l-.002-.13zm72.255-52.14v27.864c-.098 10.957-8.157 19.794-18.073 19.794-9.915 0-17.976-8.837-18.074-19.794v-27.863h-5.455v27.798c0 13.515 8.513 25.479 23.27 25.479 15.88 0 23.802-11.876 23.802-25.48v-27.797h-5.472.002z" fillRule="nonzero" />
        <Path d="M82.469 102.444v27.863h.021-.021c.1 9.732 7.27 17.606 16.1 17.606 8.83 0 15.978-7.852 16.098-17.606h-.022.022v-27.863h-5.493v28.343c0 7.307-4.976 11.68-10.586 11.68-5.947 0-10.647-5.094-10.647-11.68v-28.343H82.47zm137.068.087v45.908h-3.813l-26.667-37.86h-1.089v44.135h5.473v-28.627l20.11 28.627h11.457v-52.183h-5.47z" fillRule="nonzero" />
        <Path d="M217.541 146.23V102.53h-5.472v27.58l-19.377-27.58h-12.19v52.183h5.472v-46.323h4.071l26.645 37.838h.851zm13.334-43.699c2.094 0 3.792 1.882 3.792 4.199 0 2.319-1.698 4.199-3.792 4.199-2.087.006-3.784-1.872-3.793-4.197 0-2.319 1.698-4.201 3.793-4.201zm0 7.568c1.678 0 3.04-1.509 3.04-3.37 0-1.857-1.362-3.347-3.04-3.347-1.681 0-3.044 1.512-3.044 3.348 0 1.86 1.363 3.369 3.044 3.369zm-.514-3.017v1.945h-.95v-4.592h1.481c.516 0 .812.131 1.05.35.256.24.413.61.413 1.028 0 .458-.196.83-.534 1.048-.078.065-.156.087-.256.13l1.245 2.014h-1.028l-1.164-1.948h-.257v.025zm.553-.854c.217 0 .315-.044.394-.153.06-.066.08-.153.08-.262 0-.112-.021-.199-.08-.264a.471.471 0 0 0-.394-.175h-.553v.832h.553v.022z" fillRule="nonzero" />
      </G>
    </G>
  </Svg>
);

/**
 * deportesApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
tudnApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default tudnApp;
