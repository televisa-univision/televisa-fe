import React from 'react';
import PropTypes from 'prop-types';
import { Svg, Path, G } from 'svgs';
import { supportingArrays } from 'react-style-proptype';

import { TORCH_RED } from '@univision/fe-utilities/styled/constants';

/**
 * error icon component
 * @param {Object} props - component props
 * @returns {JSX}
 */
const errorInput = ({
  className,
  fill,
  height,
  style,
  viewBox,
  width,
}) => (
  <Svg
    className={className}
    height={height}
    style={style}
    viewBox={viewBox}
    width={width}
  >
    <G fill="none" fillRule="evenodd">
      <Path d="M0 256h256V0H0z" />
      <Path
        d="M128 202.6666667c11.763419 0 21.333333-9.5744 21.333333-21.3429334C149.333333 169.5658667 139.763419 160 128 160c-11.763419 0-21.333333 9.5658667-21.333333 21.3237333 0 11.7685334 9.569914 21.3429334 21.333333 21.3429334zm0-53.3333337c8.836267 0 16-5.3728 16-12v-72c0-6.6272-7.163733-12-16-12s-16 5.3728-16 12v72c0 6.6272 7.163733 12 16 12z"
        fill={`${fill || TORCH_RED}`}
      />
    </G>
  </Svg>
);

errorInput.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default errorInput;
