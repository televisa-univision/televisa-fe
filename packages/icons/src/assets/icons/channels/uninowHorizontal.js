import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, G, Path } from 'svgs';

import { WHITE } from '../../../constants/colors';

/**
 * uninow component
 * @param {size} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {style} props.style - style override
 * @param {string} props.className - modifier class name
 * @returns {JSX}
 */
const uninowHorizontal = ({
  width, height, fill, className, style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 50 16"
    className={className}
    style={style}
  >
    <Path fill={`${fill || WHITE}`} d="M18.4 13V3.5h1.3L25 9.7V3.5h1.8V13h-1.2l-5.3-6.2V13h-1.8zm9.3-5c0-2.8 2-5 4.9-5 2.9 0 4.8 2.2 4.8 5 0 2.7-2 5-4.8 5a4.8 4.8 0 0 1-4.9-5zm2 0c0 2 1.2 3.5 2.9 3.5s2.9-1.6 2.9-3.5c0-2-1.2-3.5-3-3.5-1.6 0-2.8 1.6-2.8 3.5zm10.8 5l-3-9.5h1.7l2 6 2-6h1.2l2 6 1.9-6h1.8L47 13h-1.3l-2-6-2 6h-1.3z" />
    <G fill="none" fillRule="evenodd">
      <Path fill={`${fill || '#00C473'}`} d="M6.8 0v9.1c.4 0 3 0 5-.2.5 0 1 0 1.6-.2a7 7 0 0 0 2.5-.9V1C15 .2 11.1 0 6.8 0" />
      <Path fill={`${fill || '#1D1DEA'}`} d="M16 8v-.2a7 7 0 0 1-2.6 1l-1.6.1c-2 .2-4.6.2-5 .2a15.3 15.3 0 0 0 0 1.4 36.2 36.2 0 0 0 .4 3.8c.2.7.4 1.3.7 1.7h.4a7.6 7.6 0 0 0 7.4-6l.2-2" />
      <Path fill={`${fill || '#ED1C24'}`} d="M8 16c-.4-.4-.6-1-.8-1.7a16.9 16.9 0 0 1-.4-4v-1V9c-2 0-3.8-.2-4.6-.3C1.3 8.6.7 8.3.6 8c0 .8.2 1.6.4 2.3.2.8.6 1.6 1 2.3 1.4 1.9 3.5 3.2 6 3.3" />
      <Path fill={`${fill || '#C626B6'}`} d="M1 .5C.7.5.5.7.5.8v7.3c.1.2.7.5 1.6.7h.5c1 .2 2.4.3 4.1.3V3.5A7.8 7.8 0 0 0 .9.5" />
    </G>
  </Svg>
);

uninowHorizontal.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default uninowHorizontal;
