import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * addReaction icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const addReaction = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path fill="none" d="M0 0h256v256H0z" />
    <Path
      d="M168.7 58.3l-6.1 8.8c-12.2-8.6-27.1-13.7-43.2-13.7-41.2 0-74.7 33.4-74.7 74.7s33.4 74.7 74.7 74.7c41.1 0 74.4-33.2 74.7-74.2h10.7c-.3 46.9-38.4 84.8-85.3 84.8-47.1 0-85.3-38.2-85.3-85.3s38.2-85.3 85.3-85.3c18.3-.1 35.3 5.7 49.2 15.5zm24 24.5h24.8c2.2 0 4 1.8 4 4v2.7c0 2.2-1.8 4-4 4h-24.8v24.8c0 2.2-1.8 4-4 4H186c-2.2 0-4-1.8-4-4V93.5h-24.8c-2.2 0-4-1.8-4-4v-2.7c0-2.2 1.8-4 4-4H182V58c0-2.2 1.8-4 4-4h2.7c2.2 0 4 1.8 4 4v24.8zM91.1 105.2c18.6 0 23.2 23.1 13.2 23.1s-3.5-11.8-12.3-11.8-2.2 12-12.3 11.8-7.2-23.1 11.4-23.1zm56.9 0c18.6 0 23.2 23.1 13.2 23.1s-3.5-11.8-12.3-11.8c-8.7 0-2.2 12-12.3 11.8-10.1-.1-7.2-23.1 11.4-23.1zm-27.8 73.9c-32.3 0-58.1-30.7-49-35.8 9.1-5.2 11.8 24.7 48.6 24.7s42.5-30.3 53.3-24.7c10.9 5.6-20.6 35.8-52.9 35.8z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill={`${fill || BLACK}`}
    />
  </Svg>
);

addReaction.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default addReaction;
