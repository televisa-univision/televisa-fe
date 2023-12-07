import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * contact component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const contact = ({
  fill,
  height,
  width,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox="0 0 18 18"
    className={className}
    style={style}
  >
    <Path
      fill={`${fill || BLACK}`}
      d="M1.8 0C.81 0 .009.81.009 1.8L0 18l3.6-3.6h12.6c.99 0 1.8-.81 1.8-1.8V1.8c0-.99-.81-1.8-1.8-1.8H1.8zm-.799 15.584L1.01 1.801c0-.442.357-.801.791-.801h14.4c.438 0 .8.362.8.8v10.8c0 .438-.362.8-.8.8H3.186L1 15.584zM3 3.5v1h12v-1H3zm0 3v1h12v-1H3zm0 3v1h12v-1H3z"
    />
  </Svg>
);

contact.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default contact;
