import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, {
  Path, G, LinearGradient, Stop,
} from 'svgs';

/**
 * univisionApp component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {string} viewBox - viewBox
 * @param {style} style - style override
 * @param {string} [className] - modifier class
 * @returns {JSX}
 */
const univisionApp = ({
  width, height, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <LinearGradient x1=".0195%" y1="49.9971%" x2="100.0208%" y2="49.9971%" id="lgUnivisionApp1">
      <Stop stopColor="#0DB27C" offset="0%" />
      <Stop stopColor="#0CB078" offset="32.58%" />
      <Stop stopColor="#07AA6C" offset="66.12%" />
      <Stop stopColor="#009F57" offset="100%" />
    </LinearGradient>
    <LinearGradient x1="12.8428%" y1="11.7931%" x2="75.6966%" y2="66.9408%" id="lgUnivisionApp2">
      <Stop stopColor="#2E00F4" offset="49.67%" />
      <Stop stopColor="#2903E9" offset="60.07%" />
      <Stop stopColor="#1D0ACD" offset="78.03%" />
      <Stop stopColor="#0A15A3" offset="100%" />
    </LinearGradient>
    <LinearGradient x1="31.3148%" y1="69.6815%" x2="82.9682%" y2="14.983%" id="lgUnivisionApp3">
      <Stop stopColor="#B0001A" offset="0%" />
      <Stop stopColor="#B80018" offset="7.1575%" />
      <Stop stopColor="#DE000F" offset="47.64%" />
      <Stop stopColor="#F60009" offset="79.99%" />
      <Stop stopColor="#FF0007" offset="100%" />
    </LinearGradient>
    <LinearGradient x1="99.961%" y1="49.9943%" x2="-.0308%" y2="49.9943%" id="lgUnivisionApp4">
      <Stop stopColor="#D800BC" offset="0%" />
      <Stop stopColor="#D004B5" offset="23.88%" />
      <Stop stopColor="#BA0FA2" offset="61.12%" />
      <Stop stopColor="#9C1D88" offset="100%" />
    </LinearGradient>
    <G fillRule="nonzero" fill="none">
      <Path d="M211.072 256H44.8853C20.096 256 0 235.904 0 211.072V44.8853C0 20.096 20.096 0 44.8853 0H211.072C235.904 0 256 20.096 256 44.8853V211.072C256 235.904 235.904 256 211.072 256z" fill="#000" />
      <Path d="M62.8262.0851v90.5106c4.518 0 29.7082.6383 51.0623-1.2766 5.3705-.5531 10.6131-1.234 15.6426-2.085 12.2755-2.3405 22.6328-5.9575 26.2132-8.9788V9.1063c-9.3345-6.936-48.718-9.0212-92.918-9.0212z" fill="url(#lgUnivisionApp1)" transform="translate(50 48)" />
      <Path d="M155.7443 1.532V.383c-3.5804 2.9787-13.9377 6.6383-26.2132 8.9787-4.9868.851-10.272 1.532-15.6426 2.0851-21.354 1.9149-46.5442 1.2766-51.0623 1.2766v1.532c0 3.5744.0427 6.6808.1279 10.1701.0426.9362.0426 1.8724.0852 2.8936.128 4.383.341 8.766.5968 12.9788.5967 8.9787 1.577 17.3617 3.1114 24.3404 1.7476 7.8298 4.2197 13.9149 7.6722 17.149l.1705.1701c1.1082.0426 2.259.0852 3.3672.0852 26.341 0 49.6557-13.1064 63.7213-33.1064 5.0721-7.234 8.9508-16.6809 11.3377-26.5107 1.7902-6.5957 2.7279-13.5744 2.7279-20.7234V1.532z" fill="url(#lgUnivisionApp2)" transform="translate(50 125.8723)" />
      <Path d="M74.4623 81.7872c-3.4525-3.234-5.9246-9.3191-7.6721-17.1489-1.577-7.0213-2.5574-15.4043-3.1115-24.3404-.2984-4.2128-.4689-8.5958-.5967-12.9788-.0427-1.0212-.0427-1.9574-.0853-2.8936-.0852-3.4893-.1278-6.5957-.1278-10.1702v-1.5319c-20.459 0-38.2328-1.532-46.7148-3.0638C7.2033 8.0426 1.2787 4.766.2557 3.1064c0 7.617 1.1082 16.3404 3.1541 23.3191 2.4295 8.2128 6.1804 15.8298 10.9968 22.6809C27.8754 68.2128 49.741 80.9787 74.6754 82.0426c-.1279-.1277-.1705-.1703-.2131-.2554z" fill="url(#lgUnivisionApp3)" transform="translate(50 125.8723)" />
      <Path d="M3.282 5.4468c-1.6623 0-3.0263 1.3617-3.0263 3.0213v72.5106c1.023 1.6596 6.9476 4.9362 15.8984 6.5532 1.364.2553 2.9836.5107 4.8164.7234 9.4623 1.2766 24.7213 2.3404 41.8984 2.3404V34.8085C43.4754 9.915 13.5115 5.4468 3.2819 5.4468z" fill="url(#lgUnivisionApp4)" transform="translate(50 48)" />
    </G>
  </Svg>
);

/**
 * univisionApp props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} [className] - modifier class
 */
univisionApp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default univisionApp;
