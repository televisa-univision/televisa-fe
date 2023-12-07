import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * results component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const results = ({
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
        d="M194.967 21.333c5.372 0 9.727 4.355 9.727 9.727v11.607h15.75c13.69 0 24.89 9.6 24.89 21.333v149.333c0 11.734-11.2 21.334-24.89 21.334H46.222c-13.813 0-24.889-9.6-24.889-21.334L21.458 64c0-11.733 10.95-21.333 24.764-21.333h17.862V31.069c0-5.377 4.36-9.736 9.736-9.736 5.377 0 9.736 4.36 9.736 9.736v11.598H185.24V31.06c0-5.372 4.355-9.727 9.727-9.727zm-69.634 82.315l-83.715.006v112.382l83.715-.004V103.648zm100.279.006l-84.279-.006v112.384l84.279.004V103.654zM80.458 127.761c6.333 0 11.444 2.055 15.333 6.166 3.457 3.655 5.377 8.538 5.761 14.65l.072 2.35v16.084c0 7.25-1.93 12.923-5.791 17.02-3.862 4.098-8.959 6.146-15.292 6.146-6.389 0-11.62-2.048-15.482-6.145-3.432-3.642-5.339-8.53-5.72-14.663l-.071-2.358v-16.084c0-7.25 1.916-12.923 5.75-17.02 3.833-4.098 9.05-6.146 15.44-6.146zm104.93.715c6.639 0 11.764 1.632 15.375 4.896 3.611 3.263 5.417 7.757 5.417 13.479 0 3.833-1 7.229-3 10.187-2 2.959-5.667 7.327-11 13.104l-7.375 8.834.083.208h23.417v10.833h-43.206v-9.166l19.706-20.5c2.5-2.834 4.333-5.361 5.5-7.584 1.166-2.222 1.75-4.152 1.75-5.791 0-2.361-.528-4.23-1.584-5.604-1.055-1.375-2.75-2.063-5.083-2.063-2.194 0-4.935.896-6.143 2.688-1.208 1.791-1.812 4.076-1.812 6.854H163.64l-.083-.25c-.14-5.611 1.708-10.368 5.541-14.271 3.834-3.903 9.956-5.854 16.289-5.854zm-105.064 9.75c-2.25 0-3.987.972-5.209 2.916-1.018 1.62-1.612 3.849-1.782 6.684l-.051 1.775v17.916c0 3.778.618 6.632 1.854 8.563 1.236 1.93 2.993 2.896 5.27 2.896 2.223 0 3.952-.966 5.188-2.896 1.03-1.609 1.631-3.86 1.803-6.75l.052-1.813v-17.916c0-3.695-.632-6.514-1.896-8.459-1.264-1.944-3.007-2.916-5.23-2.916zm45.01-77.255l-84.019.004v24.358h84.018V60.971zm101.04.004l-85.04-.004v24.362h85.04V60.975z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

results.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default results;
