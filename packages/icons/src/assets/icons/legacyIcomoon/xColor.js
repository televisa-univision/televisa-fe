import React from 'react';
import PropTypes from 'prop-types';
import Svg, {
  Path, G, Rect,
} from 'svgs';

/**
 * xColor component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const xColor = ({
  height,
  width,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G id="twitter">
      <Rect y="0.5" width="24" height="24" rx="12" fill="black" />
      <Path id="path1009" d="M5.5317 6.42188L10.5509 13.1265L5.5 18.5777H6.63674L11.0588 13.8051L14.6316 18.5777H18.5L13.1984 11.4959L17.8997 6.42188H16.763L12.6905 10.8173L9.40008 6.42188H5.5317ZM7.20336 7.2584H8.98051L16.8281 17.7411H15.0509L7.20336 7.2584Z" fill="white" />
    </G>
  </Svg>
);

xColor.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default xColor;
