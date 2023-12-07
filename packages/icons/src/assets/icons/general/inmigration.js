import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * inmigration component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const inmigration = ({
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
        d="M140.48 21.333c5.653 0 11.093 2.24 15.04 6.187l51.52 51.52a21.399 21.399 0 016.293 15.147v119.146c0 11.734-9.6 21.334-21.333 21.334H64c-11.733 0-21.333-9.6-21.333-21.334V42.667c0-11.734 9.6-21.334 21.333-21.334h76.48zm-12.523 64c-23.552 0-42.624 19.115-42.624 42.667 0 23.552 19.072 42.667 42.624 42.667 23.595 0 42.71-19.115 42.71-42.667 0-23.552-19.115-42.667-42.71-42.667zm8.192 59.734A60.103 60.103 0 01128 161.963a60.103 60.103 0 01-8.15-16.896h16.3zm-25.088 0c1.366 5.333 3.328 10.453 5.888 15.189a34.077 34.077 0 01-18.474-15.19h12.586zm46.464 0c-4.096 7.04-10.624 12.501-18.474 15.189 2.56-4.736 4.522-9.856 5.888-15.19h12.586zm-48.128-25.6c-.341 2.816-.597 5.632-.597 8.533s.256 5.717.597 8.533H94.976c-.683-2.73-1.11-5.589-1.11-8.533 0-2.944.427-5.803 1.11-8.533h14.421zm28.587 0c.384 2.773.683 5.632.683 8.533s-.299 5.717-.683 8.533h-19.968c-.384-2.816-.683-5.632-.683-8.533s.299-5.76.683-8.533h19.968zm23.04 0c.683 2.73 1.11 5.589 1.11 8.533 0 2.944-.427 5.803-1.11 8.533h-14.421c.341-2.816.597-5.632.597-8.533s-.256-5.717-.597-8.533h14.421zm-21.973-23.723c7.85 2.688 14.378 8.15 18.474 15.19H144.94c-1.366-5.334-3.328-10.454-5.888-15.19zM128 94.037a60.103 60.103 0 018.15 16.896h-16.3A60.103 60.103 0 01128 94.037zm-11.05 1.707c-2.56 4.736-4.523 9.856-5.889 15.19H98.475a34.077 34.077 0 0118.474-15.19z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

inmigration.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default inmigration;
