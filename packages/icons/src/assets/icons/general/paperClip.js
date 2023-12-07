import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { ASTRONAUT } from '../../../constants/colors';

/**
 * paper clip icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const paperClip = ({
  className, fill, viewBox, height, style, width,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M38.4886292,233.071806 C9.45504525,202.926206 9.99614925,154.315806 39.1772692,124.280766 L143.405749,17.000286 C165.426069,-5.66576199 201.219189,-5.66776199 223.241589,17.000286 C245.051189,39.447166 245.076789,75.664766 223.241589,98.138206 L132.385589,191.564606 C117.550869,206.833406 93.3134292,206.619006 78.7300692,191.065406 C64.6803092,176.079806 65.1310292,152.328766 79.4515092,137.588766 L150.876629,64.171166 C153.948309,61.014206 158.981909,60.960286 162.119349,64.050686 L173.478869,75.240286 C176.616629,78.331326 176.669909,83.396286 173.598549,86.553246 L102.180949,159.963806 C99.7302292,162.486206 99.5791892,166.678206 101.859029,169.110206 C104.031349,171.427006 107.446549,171.465406 109.654229,169.191806 L200.510389,75.766686 C210.255989,65.735806 210.255989,49.404286 200.505589,39.367806 C190.971189,29.554206 175.682069,29.549246 166.143189,39.367806 L61.9140692,146.647806 C44.6406292,164.427006 44.3742292,193.207806 61.3223892,210.804606 C78.2217492,228.350206 105.538389,228.372606 122.469109,210.947006 L207.964789,122.947806 C211.033589,119.788286 216.067189,119.731326 219.207989,122.819806 L230.574389,134.001726 C233.715189,137.090206 233.771189,142.155166 230.702389,145.314686 L145.206549,233.313406 C115.603509,263.782206 67.7193492,263.422206 38.4886292,233.071806 Z" fill={`${fill || ASTRONAUT}`} fillRule="nonzero" />
  </Svg>
);

paperClip.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  width: PropTypes.number,
};

export default paperClip;
