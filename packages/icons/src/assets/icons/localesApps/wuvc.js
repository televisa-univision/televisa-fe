import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path, G } from 'svgs';

/**
 * wuvc component
 * @param {Object} props - component props
 * @param {string} [props.className] - modifier class
 * @param {string} [props.fill] - icon fill modifier
 * @param {size} props.height - icon height
 * @param {style} [props.style] - style override
 * @param {string} props.viewBox - viewBox
 * @param {size} props.width - icon width
 * @returns {JSX}
 */
const wuvc = ({
  className, fill, height, style, viewBox, width,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox={viewBox}
    style={style}
    className={className}
  >
    <G fill="none" fillRule="nonzero">
      <Path
        d="M38.31271 80v53.93066c2.69017 0 17.70404.37796 30.42371-.75249 3.20423-.32423 6.33727-.7334 9.32093-1.24835 7.32198-1.38533 13.4925-3.55608 15.63387-5.34193V85.37141C88.11464 81.24144 64.63952 80 38.31272 80"
        fill="#00C56E"
      />
      <Path
        d="M93.6907 127.27553v-.68659c-2.13962 1.78584-8.3119 3.95659-15.63387 5.34192-2.98367.51321-6.11497.92412-9.32093 1.24662-12.71794 1.13218-27.73354.7542-30.4237.7542 0 .31384.00173.61726.00173.9172.0052 2.14128.033 3.9826.08336 6.06146.01563.55656.03126 1.127.0469 1.72343.07641 2.6198.19451 5.21361.3595 7.72939.35601 5.34018.94128 10.34053 1.8687 14.51386 1.03681 4.6692 2.50607 8.30502 4.56233 10.2313.033.02947.066.06588.099.0971.6669.02427 1.33726.03987 2.0111.03987 15.7103 0 29.59357-7.80221 37.97668-19.7396 3.02187-4.30336 5.32822-9.93136 6.74538-15.81076 1.05592-3.94272 1.6221-8.08657 1.6221-12.36045-.00175 0-.00523 0-.00696.00174.00173-.01907.00173-.03641.00173-.05548.00174-.00174.00521-.00347.00695-.0052"
        fill="#1717EF"
      />
      <Path
        d="M45.23403 175.10815c-2.05627-1.92629-3.52379-5.56212-4.56234-10.22958-.9274-4.17505-1.51268-9.17367-1.86696-14.51385-.16673-2.51751-.28308-5.11132-.3595-7.7294-.01737-.59817-.033-1.1686-.04863-1.72515-.05037-2.07886-.07641-3.92018-.08163-6.06146 0-.29995-.00173-.60338-.00173-.9172-12.20735 0-22.78044-.91718-27.83774-1.83785-5.32303-.964-8.86418-2.91628-9.4755-3.9011 0 4.55129.6582 9.73369 1.88433 13.8862 1.4432 4.8894 3.67141 9.44069 6.5422 13.50825 8.02707 11.38082 21.06283 18.98365 35.90823 19.61823-.03474-.03121-.066-.06589-.10073-.0971"
        fill="#FF161F"
      />
      <Path
        d="M2.8034 83.19336c-.99513 0-1.8027.80624-1.8027 1.79972v43.2c.60958.98307 4.15247 2.93536 9.47549 3.9011.81972.14911 1.78534.29822 2.87773.44387 5.64953.749 14.73079 1.39398 24.95827 1.39398v-33.24437c-11.54217-14.8398-29.39904-17.4943-35.5088-17.4943"
        fill="#E621BB"
      />
      <Path
        d="M150 136v-21l-17 21h17zm18.00034-54v54.60035H183v15.5991h-14.99966V173H150.3904v-20.80054H108v-10.39941L155.60925 82h12.3911zM221.5 96c-10.6776 0-14.5 14.17453-14.5 31.49913C207 144.82374 210.8224 159 221.5 159c10.67584 0 14.5-14.17626 14.5-31.50087C236 110.17453 232.17584 96 221.5 96zm-.5-16c23.37942 0 32 21.02057 32 47 0 25.98115-8.62058 47-32 47-23.38116 0-32-21.01885-32-47 0-25.97943 8.61884-47 32-47z"
        fill={`${fill || '#6C6C6C'}`}
      />
    </G>
  </Svg>
);

/**
 * wuvc props
 * @property {string} [className] - modifier class
 * @property {string} fill - fill color, default: svg file color
 * @property {number} height - icon height size
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {number} width - icon width size
 */
wuvc.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default wuvc;
