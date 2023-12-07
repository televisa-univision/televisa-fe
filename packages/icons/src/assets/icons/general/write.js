import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { ASTRONAUT } from '../../../constants/colors';

/**
 * write icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const write = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M55.9336676,118.033067 L171.929173,2.03784533 C173.234358,0.732635126 175.004706,-1.08643217e-05 176.850534,-1.08643217e-05 C178.696361,-1.08643217e-05 180.46637,0.734307268 181.770951,2.04012089 L221.165397,41.4726542 C223.890065,44.2000054 223.88897,48.6194074 221.162951,51.345408 L105.205561,167.302428 L55.9336676,118.033067 Z M34.3229156,177.204878 C33.5167297,180.49533 34.488652,183.967846 36.8858207,186.361711 C39.2829894,188.755576 42.7568428,189.722709 46.0461796,188.911986 L95.8043307,176.703829 L46.5348836,127.431964 C46.5348836,127.431964 39.0607644,157.895111 34.3229156,177.204878 Z M14.4500053,246.044444 C14.4500053,248.684857 15.4987417,251.217157 17.3657951,253.08421 C19.2328484,254.951264 21.7651487,256 24.4055609,256 L232.83749,256 C238.335791,256 242.793045,251.542746 242.793045,246.044444 C242.793045,240.546143 238.335791,236.088889 232.83749,236.088889 L24.4055609,236.088889 C21.765151,236.088889 19.2328551,237.137635 17.3658034,239.004687 C15.4987517,240.871739 14.4500053,243.404035 14.4500053,246.044444 Z" fill={`${fill || ASTRONAUT}`} fillRule="nonzero" />
  </Svg>
);

write.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default write;
