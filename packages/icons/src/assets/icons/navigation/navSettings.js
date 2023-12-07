import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * navSettings component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const navSettings = ({
  width, height, fill, className, style, viewBox,
}) => (
  <Svg
    viewBox={viewBox}
    height={height}
    width={width}
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h256v256H0z" />
      <Path
        d="M207.253 138.453c.427-3.413.747-6.826.747-10.453s-.32-7.04-.747-10.453l22.507-17.6c2.027-1.6 2.56-4.48 1.28-6.827l-21.333-36.907c-1.28-2.346-4.16-3.2-6.507-2.346l-26.56 10.666c-5.547-4.266-11.52-7.786-18.027-10.453l-4.053-28.267c-.32-2.56-2.56-4.48-5.227-4.48h-42.666c-2.667 0-4.907 1.92-5.227 4.48L97.387 54.08c-6.507 2.667-12.48 6.293-18.027 10.453L52.8 53.867c-2.453-.96-5.227 0-6.507 2.346L24.96 93.12c-1.387 2.347-.747 5.227 1.28 6.827l22.507 17.6C48.32 120.96 48 124.48 48 128c0 3.52.32 7.04.747 10.453l-22.507 17.6c-2.027 1.6-2.56 4.48-1.28 6.827l21.333 36.907c1.28 2.346 4.16 3.2 6.507 2.346l26.56-10.666c5.547 4.266 11.52 7.786 18.027 10.453l4.053 28.267c.32 2.56 2.56 4.48 5.227 4.48h42.666c2.667 0 4.907-1.92 5.227-4.48l4.053-28.267c6.507-2.667 12.48-6.293 18.027-10.453l26.56 10.666c2.453.96 5.227 0 6.507-2.346l21.333-36.907c1.28-2.347.747-5.227-1.28-6.827l-22.507-17.6zM128 165.333c-20.587 0-37.333-16.746-37.333-37.333S107.413 90.667 128 90.667s37.333 16.746 37.333 37.333-16.746 37.333-37.333 37.333z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

navSettings.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default navSettings;
