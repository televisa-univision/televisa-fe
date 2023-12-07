import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { G, Path } from 'svgs';

/**
 * unimas component
 * @param {!Object} props - components props
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {string} props.viewBox - viewBox layout
 * @param {string} props.className - class name modifier
 * @param {string} props.style - style override
 * @returns {JSX}
 */
const unimas = ({
  height,
  width,
  className,
  style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 350 90"
    className={className}
    style={style}
  >
    <G fill="none" fillRule="evenodd">
      <Path
        fill="#363fe4"
        d="m47.9 19.2-7.4 42.6c-1.2 6.9-4.8 10.4-10.7 10.4-5 0-7.9-2.2-7.9-7.2 0-.9.1-2.3.3-3.2l7.4-42.6h-18c-1.7 0-3.2 1.2-3.5 2.9L.9 62.6c-.4 2.1-.6 3.2-.6 5.3 0 14.2 12 20.5 25.3 20.5 16.7 0 31.8-7.4 35-26.4L68 19.2H47.9zm69.1 0-5.5 32.4S106 19.2 84.3 19.2h-9.8l-12 68h18.9l7.6-42 17.7 42H124l12-68h-19zm25 0-12 68.1h20.9L163 19.2zm186.7 14.7c4.2 0 10.1 2.5 13.3 5.3l8.7-9.8c1.4-1.6 1.1-4.2-.7-5.3-7.1-4.4-14.4-5.9-23-5.9-15.2 0-26.6 9.5-26.6 24.4 0 14.8 13.4 18.2 24 21.9 1.9.7 3.6 1.4 3.6 3.6 0 4.5-5.6 5.1-9 5.1-6 0-12.3-3-16.8-6.9l-8 9.4-8.6-56.6h-24.3L232 76.2l10.1-57h-26.2l-14.5 23.9-.8-3.9c-2.9-15.7-15.4-20-22.3-20h-9.2L157 87.3h18.8l7.5-42.3 5.3 31.6h13.3l17-32.5-7.6 43.2h35.1l5.2-11h22.6l1.3 11H296l-.7-4.5c7.5 4.3 15.9 5.7 24.5 5.7 15.5 0 30.2-6.8 30.2-24.2 0-13.1-11.2-17.4-20.8-20.4-2.3-.8-8.6-2.1-8.6-5.4 0-3.9 4.6-4.6 8.1-4.6zm-70 26.9 10.8-23.5 2.8 23.5h-13.6zM295.4.2l-34.1 7.1-1.8 7.1h29.3z"
      />
    </G>
  </Svg>
);

unimas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default unimas;
