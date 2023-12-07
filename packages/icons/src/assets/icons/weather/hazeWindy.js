import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { LIGHT_GREY } from '../../../constants/colors';

/**
 * hazeWindy icon component
 * @param {!Object} props - components props
 * @param {number} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {string} props.viewBox - viewBox
 * @param {string} props.className - modifier class name
 * @param {(style|Object)} props.style - style override
 * @returns {JSX}
 */
const hazeWindy = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path d="M190.509 91.623c-2.57.16-4.8-2.346-5.12-4.8-2.667-19.093-19.2-33.493-38.4-33.493-16.214 0-30.934 10.347-36.48 25.6-.534 1.387-1.814 2.667-3.2 3.2-1.6.533-3.2.427-4.694-.32-3.733-1.92-7.893-2.987-12.16-2.987-14.506 0-26.24 11.734-26.24 26.134 0 2.986-2.56 5.557-5.546 5.557l-.64-.117c-14.4 0-26.027 11.84-26.027 26.24 0 12.906 9.28 23.786 21.973 25.92 1.6.213 2.987.32 4.16.32h129.92c2.006 0 4.096-.235 6.102-.619 2.037-.405 4.01-1.141 6.037-1.493 3.285-.576 6.208 2.176 6.208 5.418 0 1.686-.736 3.275-2.123 4.246-.98.672-2.144 1.034-3.285 1.354a48.275 48.275 0 0 1-12.939 1.76H58.03c-.747 0-1.28 0-1.92-.106-.854 0-1.707-.107-2.454-.214h-.32c-.64 0-1.173-.106-1.92-.213-.533-.107-1.173-.32-1.813-.427-.533-.106-1.067-.213-1.493-.426-15.68-4.587-26.774-18.88-26.774-35.52 0-18.667 14.08-34.454 32.427-36.694 2.56-17.92 18.24-31.893 36.693-31.893 4.054 0 8.214.747 12.054 2.133 8.426-16.746 25.706-27.52 44.48-27.52 23.146 0 43.2 16.214 48.213 38.72 1.483 6.08.053 9.952-4.693 10.24zM53.675 202.926c-6.88 0-6.87-10.667 0-10.667H229.62c6.88 0 6.859 10.667 0 10.667H53.675zm32.391-87.584c-6.88 0-6.87-10.667 0-10.667h75.05c6.87 0 6.86 10.667 0 10.667h-75.05zm95.765 0c-6.88 0-6.858-10.667 0-10.667h47.787c6.88 0 6.87 10.667 0 10.667h-47.787zm-62.198 29.026c-6.88 0-6.859-10.667 0-10.667h110.41c6.88 0 6.87 10.667 0 10.667h-110.41z" fill={`${fill || LIGHT_GREY}`} />
  </Svg>
);

hazeWindy.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default hazeWindy;
