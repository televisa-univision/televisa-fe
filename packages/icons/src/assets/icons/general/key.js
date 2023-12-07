import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';
import { BLACK } from '../../../constants/colors';

/**
 * Key component
 * @param {!Object} props - components props
 * @param {width} props.width - icon width size
 * @param {height} props.height - icon height size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const key = ({
  width, height, fill, viewBox, style, className,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} style={style} className={className}>
    <Path fill={fill || BLACK} d="M236.803 101.16H136.048C123.39 69.825 90.3 51.856 57.126 58.303 23.95 64.751 0 93.805 0 127.6c0 33.795 23.951 62.85 57.126 69.297 33.174 6.447 66.264-11.522 78.922-42.856l2.181 2.053 5.648 5.391 5.519-5.39 11.937-11.809 11.936 11.808 5.52 5.391 5.519-5.39 11.936-11.809 17.328 17.199 41.2-40.816.899-.77-18.868-18.739zM44.277 146.082c-10.58-.211-19.007-8.922-18.866-19.504.14-10.581 8.794-19.066 19.377-18.997 10.582.07 19.124 8.666 19.127 19.249a19.38 19.38 0 0 1-19.895 19.252h.257z" fillRule="nonzero" />
  </Svg>
);

/**
 * recipe props
 * @property {number} width - icon width size
 * @property {number} height - icon height size
 * @property {string} fill - fill color, default: svg file color
 * @property {string} viewBox - viewBox width, height, default: 0 0 256 256
 * @property {(Object|style)} [style] - modifier styles
 * @property {string} className - modifier class
 */
key.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  className: PropTypes.string,
};

export default key;
