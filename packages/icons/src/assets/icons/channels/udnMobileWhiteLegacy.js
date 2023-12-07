import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

/**
 * udnMobileWhite component
 * @param {size} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {style} props.style - style override
 * @param {string} props.className - modifier class name
 * @returns {JSX}
 */
const udnMobileWhite = ({
  width, height, fill, className, style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 256 256"
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <Path fill={`${fill || '#FFFFFF'}`} fillRule="evenodd" d="M228.018 140.066l.383-1.724 1.473-7.162c.549-3.232 1.023-6.56 1.45-9.939l-32.743 21.555c-5.008 35.09-34.663 61.605-70.942 61.617-.543 0-1.097-.029-1.61-.029-8.298-11.451-9.657-32.824-9.668-60.996 28.975-.25 65.39-1.172 82.328-10.183l33.67-22.175c.736-8.608 1.13-17.698 1.13-27.517 0-30.402-3.94-58.846-7.932-76.869l-73.026 48.088c23.299 1.019 41.093 3.283 46.85 7.544l.05 64.614c-11.38 7.083-55.654 9.882-83.048 9.882l-.051-54.562-.023-28.189c7.738 0 15.259.091 22.448.25L216.62 2.999H28.778c-4.266 17.692-8.777 47.986-8.777 80.515 0 17.408 1.148 32.677 3.472 46.666l30.591-20.15V63.783c0 .005.012.01.012.022 0-.045-.012-.096-.012-.142-.005-1.542 1.268-2.782 2.827-2.782 9.2-.006 35.645 3.886 53.542 25.219.04.04.086.074.126.12l-1.08 50.55c-8.12-.22-35.599-1.336-55.415-7.867v-9.347l-28.918 19.041.332 1.468c6.058 27.37 17.165 49.596 33.949 67.965 0 0 6.247 6.89 9.862 10.377l29.318-19.297c-26.046-10.587-44.326-35.829-44.543-66.15 10.514 6.36 40.597 10.33 55.067 10.54.126 23.291 2.872 49.756 11.615 60.81-4.294-.308-8.463-1.019-12.5-2.026L75.268 224c.274.244.576.523.845.75 13.408 10.787 29.969 20.754 50.63 30.436h.005c20.66-9.682 37.221-19.65 50.63-30.435 1.758-1.508 3.626-3.237 5.699-5.28 3.232-2.884 10.998-11.44 10.998-11.44 16.766-18.37 27.873-40.596 33.943-67.965" />
    </G>
  </Svg>
);

udnMobileWhite.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default udnMobileWhite;
