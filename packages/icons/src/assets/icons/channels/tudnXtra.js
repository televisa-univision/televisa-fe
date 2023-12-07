import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { GREEN_DARKER } from '../../../constants/colors';

/**
 * tudnXtra
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const tudnXtra = ({
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
      fill={fill || GREEN_DARKER}
      d="M59.82 10.85h2.16l1.7 2.4 1.75-2.4h11.65c2.1.06 3.14 1 3.14 2.86 0 0 .07 1.84-1.43 2.58 0 0 .38.6 1.15 1.82l3.25-7.25h1.93L88.7 19h-1.97L86 17.46h-3.77L81.65 19h-3.33l-1.44-2.3h-1.7V19h-2v-6.53h-2.26V19h-1.9v-6.53H66.6L65 14.7l3 4.3h-2.38l-1.94-2.58L61.72 19H59.6l2.9-4.08-2.68-4.07zm24.32 2.03l-1.22 3h2.43l-1.2-3zm-9.05-.45v2.62h2.04c.86-.1 1.28-.6 1.28-1.47 0 0-.1-1.15-1.28-1.15 0 0-.68 0-2.05 0zm13.5-2.48c.56 0 1.02.45 1.02 1.02 0 .56-.46 1-1.03 1-.58 0-1.04-.44-1.04-1 0-.57.46-1.02 1.03-1.02zm0 1.83c.45 0 .82-.36.82-.8 0-.47-.37-.83-.83-.83-.47 0-.84.37-.84.82 0 .45.37.8.83.8zm-.15-.73v.47h-.26v-1.1h.4c.14 0 .22.02.28.07.07.05.1.14.1.24 0 .1-.04.2-.13.26-.02 0-.04.02-.07.03l.34.5h-.28l-.32-.5h-.07v.02zm.15-.2c.06 0 .1-.02.1-.04.03 0 .03-.03.03-.06 0-.02 0-.05-.02-.06 0-.02-.04-.04-.1-.04h-.15v.2h.15zM40.07 6.77c3.2 0 6 2.07 6 6.18 0 3.83-2.83 6.03-6 6.03H33.7v-8.86l1.44 1.43v5.96h4.88c2.58-.02 4.66-2.1 4.66-4.68 0-2.57-2.08-4.66-4.66-4.7H33.7V6.8h6.37zm-.06 3.3h-6.53v-1.5h6.36v.02c2.32.02 4.18 1.93 4.18 4.3 0 2.34-1.86 4.26-4.17 4.28h-4.4V12.1l1.42 1.43v2.22H40c1.57 0 2.78-1.25 2.78-2.83 0-1.5-1.03-2.83-2.77-2.83zM5.5 6.8h12.6v1.36H5.5V6.78zm0 3.4V8.8h12.6v1.35H5.5zm6.42 2.03l1.6 1.44v5.58h-1.6V12.2zm-.23 7v.02h-1.6v-9.05l1.6 1.44v7.59zM30.4 6.77h1.44v6.6c0 3.24-2.08 6.06-6.26 6.06-3.88 0-6.12-2.84-6.12-6.05V6.77h1.44v6.62c.02 2.6 2.14 4.7 4.75 4.7 2.6 0 4.73-2.1 4.75-4.7V6.78zm-8.87 0H23v6.77c0 1.57 1.23 2.8 2.8 2.8 1.47 0 2.78-1.06 2.78-2.8V6.78h1.45v6.65c-.03 2.33-1.92 4.2-4.24 4.2-2.34 0-4.23-1.87-4.25-4.2V6.78zm35.94 0h1.4v12.2h-2.97l-5.23-6.7V19h-1.42V8.7h.28l6.93 8.84h1V6.78zM56.83 17h-.22L49.7 8.16h-1.06V19h-1.42V6.77h3.17l5.02 6.45V6.78h1.42V17z"
    />
  </Svg>
);

tudnXtra.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default tudnXtra;
