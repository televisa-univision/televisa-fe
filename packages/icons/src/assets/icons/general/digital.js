import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path } from 'svgs';
import { BLACK, WHITE } from '../../../constants/colors';

/**
 * Digital component
 * @param {!Object} props - components props
 * @param {width} props.width - icon width size
 * @param {height} props.height - icon height size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const digital = ({
  width, height, fill, viewBox, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style}>
    <G fillRule="evenodd">
      <Path d="M20 0H3V10.286h6.65l-1 .857H6.4V12h10.2v-.857h-2.25l-1-.857H20V0zM3.85 9.429V.857h15.3V9.43H3.85z" fill={fill || BLACK} />
      <Path d="M6.15 2H1.113c-.51 0-.924.387-.924.865v10.27c0 .478.413.865.924.865h5.035c.51 0 .924-.387.924-.865V2.865C7.073 2.387 6.66 2 6.15 2" fill={WHITE} />
      <Path d="M.844 12.593h5.574V3.407H.844v9.186zm3.11.968h-.645c-.204 0-.37-.156-.37-.347 0-.191.166-.347.37-.347h.645c.205 0 .37.156.37.347 0 .191-.165.347-.37.347zM1.198 2.258c.113 0 .206.086.206.193 0 .107-.093.193-.206.193-.114 0-.207-.086-.207-.193 0-.107.093-.193.207-.193zm.584.072c.07 0 .129.054.129.12 0 .068-.058.122-.13.122-.07 0-.128-.054-.128-.121s.057-.12.129-.12zm1.232.182h1.235c.045 0 .081.034.081.075 0 .042-.036.076-.08.076H3.013c-.045 0-.081-.034-.081-.076 0-.041.036-.075.08-.075zM1.114 2c-.51 0-.924.387-.924.865v10.27c0 .478.413.865.924.865h5.035c.51 0 .924-.387.924-.865V2.865C7.073 2.387 6.66 2 6.15 2H1.114z" fill={fill || BLACK} />
    </G>
  </Svg>
);

digital.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default digital;
