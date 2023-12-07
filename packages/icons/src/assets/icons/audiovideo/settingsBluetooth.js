import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '../../../constants/colors';

/**
 * settingsBluetooth props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 * @returns {JSX}
 */
const settingsBluetooth = ({
  width, height, fill, className, style,
}) => (
  <Svg
    viewBox="0 0 24 24"
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <G>
        <Path d="M0 0h24v24H0z" />
        <Path
          d="M12 22a1 1 0 110 2 1 1 0 010-2zm-4 0a1 1 0 110 2 1 1 0 010-2zm8 0a1 1 0 110 2 1 1 0 010-2zm-2.59-12l3.62-3.62c.19-.19.29-.44.29-.71s-.11-.52-.29-.71L12.7.65c-.29-.29-.72-.37-1.09-.22s-.61.52-.61.92v6.23L7.14 3.73a.996.996 0 10-1.41 1.41L10.58 10l-4.85 4.85a.996.996 0 101.41 1.41L11 12.41v6.23c0 .4.24.77.62.92a.995.995 0 001.09-.21l4.32-4.32c.19-.19.29-.44.29-.71s-.11-.52-.29-.71zM13 3.77l1.91 1.91L13 7.58zm0 12.46v-3.82l1.91 1.91z"
          fill={`${fill || BLACK}`}
          fillRule="nonzero"
        />
      </G>
    </G>
  </Svg>
);

settingsBluetooth.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  width: PropTypes.number,
};

export default settingsBluetooth;
