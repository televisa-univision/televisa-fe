import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * partidos component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const partidos = ({
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
        d="M130.852 21.673c-.118 0-.229.014-.346.02-.118 0-.23-.02-.347-.02-60.098 0-108.826 48.72-108.826 108.826 0 60.105 48.728 108.84 108.826 108.84.118 0 .229-.015.347-.029.117 0 .228.028.346.028 60.098 0 108.826-48.727 108.826-108.832S190.95 21.673 130.852 21.673zm7.142 31.588l28.336-3.258c10.698 4.735 20.26 11.544 28.212 19.905l3.612 28.87-35.02 9.201-25.147-17.506V53.26h.007zM66.462 69.908c7.96-8.361 17.52-15.17 28.22-19.905l28.336 3.258v37.212L97.87 107.979l-35.02-9.2 3.612-28.87zm-13.277 103.19c-6.087-10.956-9.831-23.332-10.747-36.519l14.942-24.911 35.47 9.318 8.972 29.605-23.095 34.424-25.542-11.918zm97.455 43.11c-6.379 1.47-12.98 2.316-19.788 2.33-.118 0-.229-.014-.346-.014-.118 0-.23.014-.347.014-6.816-.014-13.416-.86-19.788-2.33l-20.002-23.65 22.56-33.605H148.083l22.56 33.606-20.002 23.65zm52.991-104.547l14.942 24.911c-.915 13.18-4.666 25.563-10.747 36.518l-25.542 11.919-23.095-34.424 8.978-29.606 35.464-9.318zm-73.125-10.441l22.563 16.802-7.682 29.06h-30.936l-7.529-29.06 23.584-16.802z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

partidos.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default partidos;
