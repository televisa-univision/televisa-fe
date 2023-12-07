import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * combatSports component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const combatSports = ({
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
        d="M154.88 53.333l14.487.308c5.632 0 15.967 14.54 15.967 20.172h10.506c11.264 0 20.48 9.216 20.48 20.48v81.92c0 11.264-9.216 20.48-20.48 20.48h-59.392c-1.331 0-2.662-.102-3.994-.41l-40.96-8.191c-4.812-.922-8.192-5.12-8.192-10.035V73.813c0-5.632 4.506-11.161 10.036-12.288l39.219-7.884a23.964 23.964 0 013.891-.308h18.432zm-81.92 20.48v102.4H42.24c-5.632 0-10.24-4.608-10.24-10.24v-81.92c0-5.632 4.608-10.24 10.24-10.24h30.72zm71.68 0h-6.144c-1.331 0-34.816 6.554-34.816 6.554v89.293s33.382 6.553 34.816 6.553h57.344v-81.92h-51.2v-20.48zm30.72 30.72v61.44h-30.72v-61.44h30.72zm9.973-30.72H165.12c5.632 0 20.214 5.632 20.214 0z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

combatSports.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default combatSports;
