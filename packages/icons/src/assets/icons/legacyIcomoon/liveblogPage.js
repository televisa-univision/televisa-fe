import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * liveblogPage component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const liveblogPage = ({
  fill,
  height,
  width,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox="0 0 1024 1024"
    className={className}
    style={style}
  >
    <Path
      fill={`${fill || BLACK}`}
      d="M468.225 512.037l-455.632-440.95c-16.791-16.275-16.791-42.606 0-58.881s44.036-16.275 60.826 0l477.175 461.796c10.666 10.313 14.573 24.723 11.686 37.998 2.886 13.312-1.021 27.685-11.686 37.998l-477.175 461.796c-16.791 16.275-44.036 16.275-60.826 0s-16.791-42.606 0-58.881l455.632-440.876z"
    />
  </Svg>
);
liveblogPage.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default liveblogPage;
