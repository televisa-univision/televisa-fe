import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'svgs';
import { DEEP_SEA, SPRING_WING } from '@univision/fe-utilities/styled/constants';

/**
 * TUDN main rebrand logo
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const tudnRebrand = ({
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
    <Path fillRule="evenodd" clipRule="evenodd" d="M87.511 0h-16.42v3.658h16.286c6.644.069 12.002 5.576 12.002 12.352 0 6.778-5.358 12.285-12.002 12.353H74.804V12.622l-3.713-3.78v23.343H87.51c8.17 0 15.451-5.793 15.451-15.904C102.945 5.441 95.746 0 87.51 0h.001Z" fill="url(#a)" />
    <Path fillRule="evenodd" clipRule="evenodd" d="M32.241 0H0v3.753h32.241V0Zm62.696 16.148c0-3.85-2.645-7.275-7.063-7.275L71.186 8.86V5.025h16.226c5.898.081 10.645 4.986 10.645 11.04 0 6.057-4.76 10.974-10.645 11.042H76.224V14.036l3.597 3.682v5.717h8.053c3.968 0 7.063-3.224 7.063-7.287ZM0 8.874h11.796v23.502h3.652l-.001-.081V12.611l-3.65-3.737H32.24v-3.74H0v3.74Zm11.797 0h-.001Zm4.998 23.502V13.994l3.65 3.753v14.63h-3.65ZM63.819 17.26V0h3.663v17.218C67.482 25.644 62.178 33 51.547 33c-9.88 0-15.58-7.41-15.58-15.782V0h3.653v17.259c.066 6.786 5.462 12.26 12.1 12.26 6.639 0 12.034-5.474 12.1-12.26Z" fill="url(#b)" />
    <Path fillRule="evenodd" clipRule="evenodd" d="M40.857 17.157V0h3.67v17.453c0 4.055 3.153 7.191 7.142 7.191 3.763 0 7.1-2.693 7.1-7.191V0h3.684v17.157c-.08 6.006-4.875 10.84-10.797 10.84-5.922 0-10.732-4.848-10.799-10.84Zm91.936 11.164V.054h3.67v32.13h-7.685L115.29 14.559v17.627h-3.671V5.009h.73l17.886 23.312h2.558Z" fill="url(#c)" />
    <Path fillRule="evenodd" clipRule="evenodd" d="M131.503 26.952V0h-3.674v17.01L114.821 0h-8.184v32.185h3.674V3.615h2.733l17.888 23.337h.571ZM140.454 0C141.86 0 143 1.161 143 2.59c0 1.43-1.14 2.59-2.546 2.59-1.401.004-2.54-1.155-2.546-2.589 0-1.43 1.14-2.591 2.546-2.591Zm2.042 2.59c0 1.148-.915 2.078-2.042 2.078-1.128 0-2.043-.93-2.043-2.078 0-1.132.915-2.064 2.043-2.064a2.05 2.05 0 0 1 2.042 2.064Zm-2.387.217v1.2h-.637V1.175h.994c.346 0 .545.08.704.215a.828.828 0 0 1 .278.634.726.726 0 0 1-.358.647.465.465 0 0 1-.128.064l-.045.016.836 1.242h-.689l-.782-1.201h-.173v.015Zm.636-.622c-.053.068-.118.095-.264.095v-.014h-.372v-.513h.372a.329.329 0 0 1 .264.108c.04.04.054.094.054.163 0 .067-.013.121-.054.161Z" fill="url(#d)" />
    <Defs>
      <LinearGradient id="a" x1="75.744" y1="7.51" x2="110.529" y2="29.61" gradientUnits="userSpaceOnUse">
        <Stop stopColor={SPRING_WING} />
        <Stop offset="1" stopColor={DEEP_SEA} />
      </LinearGradient>
      <LinearGradient id="b" x1="14.316" y1="7.7" x2="46.728" y2="69.496" gradientUnits="userSpaceOnUse">
        <Stop stopColor={SPRING_WING} />
        <Stop offset="1" stopColor={DEEP_SEA} />
      </LinearGradient>
      <LinearGradient id="c" x1="54.816" y1="7.51" x2="86.432" y2="67.772" gradientUnits="userSpaceOnUse">
        <Stop stopColor={SPRING_WING} />
        <Stop offset="1" stopColor={DEEP_SEA} />
      </LinearGradient>
      <LinearGradient id="d" x1="111.946" y1="7.51" x2="148.465" y2="33.984" gradientUnits="userSpaceOnUse">
        <Stop stopColor={SPRING_WING} />
        <Stop offset="1" stopColor={DEEP_SEA} />
      </LinearGradient>
    </Defs>
  </Svg>
);

tudnRebrand.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default tudnRebrand;
