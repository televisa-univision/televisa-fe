import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path } from 'svgs';

import { WHITE } from '../../../constants/colors';

/**
 * canalCinco icon
 * @param {size} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {style} props.style - style override
 * @param {string} props.className - modifier class name
 * @returns {JSX}
 */
const canalCinco = ({
  width, height, className, style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 85 75"
    className={className}
    style={style}
  >
    <G fill={WHITE}>
      <Path d="M0 44.2c1.3-.8 2.5-1.6 3.8-2.4 2.5-1.5 4.9-3.1 7.4-4.6.1 0 .1-.1.2-.1.8 1.8 1.5 3.6 2.3 5.5l-6 3.9c.1.2.2.4.3.5 1.7 2.8 4.1 4.9 7 6.5 1.8 1 3.7 1.7 5.7 2 1 .1 2 .1 3.1.2 1.5 0 3.1 0 4.6-.2 1.2-.2 2.3-.6 3.5-1 3.5-1.4 6.4-3.5 8.7-6.6 1.4-1.9 2.3-4 2.6-6.4.2-1.8.2-3.7.1-5.5-.1-1.8-.4-3.5-1-5.2-1.3-3.3-3.7-5.4-7-6.5-1.9-.6-3.9-.8-6-.8-3.4 0-6.9 0-10.3-.1h-.3v-6h10.5c2 0 4 .2 6 .5 3.7.7 6.8 2.3 9.3 5.1 2.3 2.6 3.7 5.6 4.4 9 .2 1.3.3 2.7.5 4 0 .1 0 .2.1.3v3.3c0 .2 0 .4-.1.5 0 .7-.1 1.3-.1 2-.3 2.5-1.1 4.9-2.3 7.1-2.1 3.9-5.1 6.8-8.8 9.1-3.9 2.4-8.2 3.6-12.8 3.7-1.4 0-2.7 0-4.1-.1-1.9-.1-3.7-.5-5.5-1.2-5-1.9-9-5.1-12.1-9.5-1.1-1.6-2-3.4-2.8-5.2-.2-.5-.4-.9-.7-1.4v-.4z" />
      <Path d="M46.1 0V15.6h-6.3v-9H9.9v24.9H3.7V0h42.4zM32 37.6c0 .3-.1.6-.4.7-.6.2-1.2.5-1.8.7-.2.1-.3.1-.5.2-.4.2-.5.5-.3.9s.5.7.7 1.1l.6.9c.3.4.3.5 0 .9-.2.3-.5.5-.7.7-.4.3-.9.6-1.4.9-.2.1-.4.1-.5-.1l-.9-1.2c-.3-.4-.6-.7-.9-1-.2-.2-.4-.2-.6 0-.4.5-.8 1-1.3 1.5-.2.3-.4.5-.7.8-.1.1-.3.1-.4.1-.8-.3-1.5-.8-2.1-1.4-.4-.4-.4-.6-.1-1.1.2-.3.5-.7.7-1 .2-.3.4-.6.6-1 .2-.3.1-.5-.2-.7-.3-.2-.6-.4-.9-.5-.4-.2-.9-.4-1.3-.6-.5-.2-.6-.5-.5-1 .2-.7.5-1.4.8-2.1.2-.4.3-.5.8-.3.4.1.9.3 1.3.5.3.1.5.2.8.3.4.1.6-.1.7-.5 0-.2.1-.4.1-.6 0-.5 0-.9.1-1.4.1-.7.3-.9.9-1 .7-.1 1.3 0 2 0 .4 0 .6.3.6.6 0 .5 0 1 .1 1.5 0 .3.1.6.1.9.1.3.2.4.5.4.3-.1.6-.1.9-.2.5-.2.9-.3 1.4-.5.3-.1.5 0 .6.3.4.7.9 1.5 1 2.4.2-.2.2-.2.2-.1" />
    </G>
  </Svg>
);

canalCinco.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default canalCinco;
