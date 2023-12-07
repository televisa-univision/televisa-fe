import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, G, Path } from 'svgs';

/**
 * google icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const google = ({
  width, height, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd">
      <Path
        d="M213.3 129c0-7.4-.5-12.7-1.8-18.2h-82v33h48.1c-1 8.2-6.2 20.6-17.9 28.9l-.1 1 26 20.5 1.7.2a87.8 87.8 0 0026-65.4"
        fill="#4285F4"
      />
      <Path
        d="M129.4 216c23.6 0 43.4-8 58-21.6l-27.7-21.7a51.1 51.1 0 01-30.3 8.9 52.7 52.7 0 01-49.7-37h-1l-27 21.3-.4 1c14.4 29 44 49 78.1 49"
        fill="#34A853"
      />
      <Path
        d="M79.7 144.6a55.7 55.7 0 01-.1-35.2v-1.2L52.1 86.6l-.9.4a90.4 90.4 0 000 80l28.4-22.4"
        fill="#FBBC05"
      />
      <Path
        d="M129.4 72.4a48 48 0 0133.8 13.3L188 61a83.2 83.2 0 00-58.6-23c-34.2 0-63.7 20-78 49l28.2 22.4a53 53 0 0149.8-37"
        fill="#EB4335"
      />
    </G>
  </Svg>
);

google.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default google;
