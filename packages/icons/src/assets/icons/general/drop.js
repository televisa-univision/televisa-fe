import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLUE } from '../../../constants/colors';

/**
 * drop icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const drop = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M180.705 32.353c-1.576 5.115-3.03 9.84-4.48 14.567-3.595 11.69-7.182 23.376-10.778 35.065-4.58 14.916-9.164 29.832-13.753 44.748l-13.288 43.246c-2.916 10.1-14.415 47.756-21.061 54.06-5.838 5.53-13.391 10.302-21.282 10.302-21.151 0-35.903-13.37-33.634-35.424.574-5.588 2.9-10.861 5.9-15.65 2.23-3.549 8.905-14.263 10.02-16.062 1.428-2.29 2.853-4.58 4.278-6.874 1.68-2.708 3.365-5.416 5.053-8.129 1.899-3.056 3.801-6.112 5.7-9.169 2.074-3.334 4.144-6.67 6.214-10 2.204-3.54 4.4-7.08 6.604-10.619 2.284-3.67 4.564-7.34 6.843-11.015 2.326-3.735 4.647-7.466 6.969-11.198 2.313-3.726 4.63-7.449 6.944-11.176 2.267-3.644 4.53-7.288 6.796-10.932 2.167-3.487 4.342-6.979 6.512-10.47 2.029-3.266 4.061-6.536 6.093-9.801 1.848-2.974 3.692-5.947 5.544-8.92l4.861-7.816c1.346-2.168 2.695-4.336 4.044-6.504l3.093-4.977c.67-1.075 1.337-2.155 2.011-3.234.264-.427.532-.854.8-1.29 1.51-2.31 3.856-3.748 6.58-3.748 4.358 0 7.92 3.705 7.92 8.233a7.82 7.82 0 0 1-.503 2.787z" fill={`${fill || BLUE}`} />
  </Svg>
);

drop.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default drop;
