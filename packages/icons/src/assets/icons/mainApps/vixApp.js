import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, G, Rect, Defs, Stop,
} from 'svgs';

/**
 * vixApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const vixApp = ({
  width, height, style, className,
}) => (
  <Svg width={width} height={height} viewBox={'0 0 32 32'} style={style} className={className}>
    <G id="App Icon/VIX">
      <Rect width={width} height={height} rx="5" fill="url(#paint0_linear_509_179)" />
      <Path id="Vector" d="M7.10031 11.8518C7.25753 11.8518 7.37254 11.9348 7.40886 12.0828L8.98795 17.6433L10.5852 12.0828C10.6215 11.9406 10.7304 11.8518 10.8938 11.8518H13.4712C13.5921 11.8518 13.6769 11.9703 13.6405 12.0828L11.0995 20.0358C11.0511 20.1897 10.9422 20.2667 10.7788 20.2667H7.14856C6.99134 20.2667 6.87633 20.1956 6.82793 20.0358L4.27479 12.0828C4.23854 11.9761 4.32931 11.8518 4.45028 11.8518H7.10031ZM14.1185 13.4388C14.1185 12.5032 14.9051 11.7334 15.861 11.7334C16.817 11.7334 17.6035 12.5032 17.6035 13.4388C17.6035 14.3745 16.817 15.1444 15.861 15.1444C14.9051 15.1444 14.1185 14.3745 14.1185 13.4388H14.1185ZM17.422 20.018C17.422 20.1601 17.3252 20.2608 17.1739 20.2608H14.5481C14.4029 20.2608 14.3001 20.1661 14.3001 20.018V16.0445C14.3001 15.9024 14.3969 15.8017 14.5481 15.8017H17.1739C17.3191 15.8017 17.422 15.8964 17.422 16.0445V20.018ZM18.3174 19.9588L20.798 16.0563L18.3174 12.1538C18.2267 12.0117 18.3053 11.8518 18.4747 11.8518H21.282C21.4756 11.8518 21.5905 11.9111 21.6753 12.0532L23.0366 14.3805L24.3979 12.0532C24.4886 11.9111 24.5975 11.8518 24.7912 11.8518H27.5379C27.7074 11.8518 27.786 12.0058 27.6953 12.1538L25.2146 16.0563L27.6953 19.9588C27.7799 20.1009 27.7074 20.2608 27.5379 20.2608H24.7307C24.5371 20.2608 24.4222 20.2016 24.3375 20.0595L22.9762 17.7322L21.6149 20.0595C21.5301 20.2016 21.4212 20.2608 21.2216 20.2608H18.4747C18.3054 20.2608 18.2268 20.1069 18.3175 19.9588H18.3174Z" fill="white" />
    </G>
    <Defs>
      <linearGradient id="paint0_linear_509_179" x1="0" y1="0" x2="28.1245" y2="35.119" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#CA2173" />
        <Stop offset="0.244792" stopColor="#F34C1B" />
        <Stop offset="0.494792" stopColor="#FF5900" />
        <Stop offset="0.744792" stopColor="#FC4D08" />
        <Stop offset="1" stopColor="#F52D1F" />
      </linearGradient>
    </Defs>
  </Svg>
);

/**
 * lasEstrellasApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
vixApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default vixApp;
