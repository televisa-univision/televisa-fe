import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * indeterminateCheckBox component
 * @param {size} size - icon size
 * @param {string} fill - icon fill modifier
 * @param {style} style - style override
 * @returns {JSX}
 */
const indeterminateCheckBox = ({
  width, height, fill, style, className,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={style}
    className={className}
  >
    <G fill="none" fillRule="evenodd">
      <G>
        <Path d="m0 0h24v24h-24z" />
        <Path
          d="m19 3h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm-3 10h-8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z"
          fill={fill}
          fillRule="nonzero"
        />
      </G>
    </G>
  </Svg>
);

/**
 * indeterminateCheckBox props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 */
indeterminateCheckBox.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

indeterminateCheckBox.defaultProps = {
  fill: BLACK,
};

export default indeterminateCheckBox;
