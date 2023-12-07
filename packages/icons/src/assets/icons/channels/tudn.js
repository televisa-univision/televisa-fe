import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { GREEN_DARKER } from '../../../constants/colors';

/**
 * TUDN main logo
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const tudn = ({
  fill,
  height,
  width,
  viewBox,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox={viewBox}
    className={className}
    style={style}
  >
    <Path
      d="M56.817 17.15V6.936H55.36v6.446l-5.154-6.447h-3.242V19.13h1.455V8.307h1.083l7.088 8.842zm3.546-10.213c.557 0 1.009.44 1.009.981a.996.996 0 0 1-1.009.982c-.557 0-1.01-.44-1.01-.982s.453-.981 1.01-.981zm0 1.768c.447 0 .81-.352.81-.787a.794.794 0 0 0-.81-.782c-.446 0-.809.353-.809.782 0 .435.363.787.81.787zM60.226 8v.455h-.252V7.382h.394c.137 0 .216.03.279.082a.309.309 0 0 1 .11.24.273.273 0 0 1-.142.245c-.021.016-.042.02-.069.03l.332.47h-.273l-.31-.454h-.069zm.147-.199c.058 0 .084-.01.105-.036.016-.015.022-.036.022-.061 0-.026-.006-.047-.022-.062a.133.133 0 0 0-.105-.04h-.147v.194h.147zM20.89 6.916v6.512h.006-.006c.027 2.274 1.933 4.115 4.282 4.115s4.25-1.835 4.282-4.115h-.006.006V6.916h-1.46v6.624c0 1.707-1.324 2.73-2.817 2.73-1.582 0-2.832-1.191-2.832-2.73V6.916zm36.457.021v10.728h-1.014L49.24 8.818h-.288v10.314h1.454v-6.69l5.349 6.69h3.048V6.937zm-17.805 3.327c1.754 0 2.806 1.294 2.806 2.745 0 1.534-1.23 2.75-2.806 2.75h-3.2v-2.157l-1.429-1.39v4.932h4.445v-.005.005c2.338-.025 4.229-1.881 4.229-4.166 0-2.284-1.886-4.135-4.23-4.165v.004-.004h-6.445v1.446zM4.629 6.916h12.809v1.416H4.629zm0 3.348h12.81v-1.41H4.629zm6.673 1.932v6.937h1.45V13.61zm-.536 6.906v-7.427l-1.45-1.41v8.867h1.45zM29.984 6.916v6.512c-.026 2.56-2.17 4.626-4.807 4.626-2.637 0-4.78-2.066-4.807-4.626V6.916h-1.45v6.497c0 3.158 2.265 5.954 6.19 5.954 4.224 0 6.33-2.774 6.33-5.955V6.917h-1.455zm9.431 0h-6.504v1.385h6.452c2.632.026 4.755 2.111 4.755 4.677 0 2.566-2.123 4.651-4.755 4.677h-4.98v-5.96l-1.472-1.43v8.837h6.504c3.237 0 6.121-2.193 6.121-6.022-.005-4.104-2.858-6.164-6.12-6.164z"
      fill={`${fill || GREEN_DARKER}`}
      fillRule="evenodd"
    />
  </Svg>
);

tudn.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default tudn;
