import React from 'react';
import Svg, { G, Path } from 'svgs';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import { BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * otherSports component
 * @param {number} width - icon width size
 * @param {number} height - icon height size
 * @param {string} fill - fill color, default: svg file color
 * @param {(Object|style)} [style] - modifier styles
 * @param {string} className - modifier class
 * @param {string} viewBox - viewBox value
 * @returns {JSX}
 */
const otherSports = ({
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
        d="M128 21.333c58.91 0 106.667 47.757 106.667 106.667 0 26.586-9.727 50.9-25.815 69.578l.309.278-10.862 11.748-.795-.688c-18.669 16.05-42.953 25.75-69.504 25.75-26.288 0-50.355-9.51-68.949-25.276l-.237.214-2.09-2.246c-21.726-19.526-35.39-47.846-35.39-79.358C21.333 69.09 69.09 21.333 128 21.333zm.556 156.55c-15.171 0-31.577 5.878-47.904 15.766l-3.998 2.514c11.911 8.987 26.252 14.923 41.862 16.65l5.548-4.542 5.194-4.36 4.776-4.151c7.284-6.46 13.04-12.232 17.567-17.841-7.875-2.624-15.608-4.037-23.045-4.037zm38.323 10.437l-1.653 2.165c-4.656 5.922-10.415 11.921-17.496 18.412l-3.135 2.824a84.948 84.948 0 0035.249-15.937 93.134 93.134 0 00-3.383-2.135 143.87 143.87 0 00-9.582-5.329zM62.933 72.78l-1.075 1.299C49.862 88.777 42.667 107.549 42.667 128c0 21.917 8.262 41.904 21.842 57.016a172.107 172.107 0 017.854-5.053c18.605-11.267 37.62-18.08 56.193-18.08 10.546 0 21.235 2.196 31.91 6.157 3.545-7.467 5.39-15.41 6.214-25.006l.318-4.72c.041-.81.077-1.631.106-2.465l.116-5.153c.01-.885.014-1.783.014-2.696 0-11.974-3.038-24.076-9.167-36.301-9.886 3.42-19.76 5.298-29.51 5.298-18.574 0-37.59-6.814-56.194-18.08a175.262 175.262 0 01-9.43-6.136zm130.532.48l-1.273.886a174.69 174.69 0 01-7.442 4.77 159.573 159.573 0 01-11.923 6.564c6.925 14.057 10.407 28.233 10.407 42.52 0 19.454-2.002 33.677-8.059 46.59a160.02 160.02 0 019.575 5.373 174.599 174.599 0 017.159 4.579c13.331-15.05 21.424-34.851 21.424-56.542 0-20.834-7.466-39.924-19.868-54.74zm-75.286-30.022l-.684.069c-16.093 1.976-30.8 8.431-42.835 18.08a130.903 130.903 0 005.992 3.843c16.327 9.888 32.733 15.767 47.904 15.767 6.818 0 13.884-1.187 21.08-3.391-7.815-11.361-18.293-22.814-31.457-34.368zm23.975.597l.29.305c8.93 9.09 16.409 18.225 22.422 27.405 3.854-1.854 7.727-3.972 11.595-6.315a158.104 158.104 0 005.406-3.425c-11.238-9.143-24.823-15.484-39.713-17.97z"
        fill={`${fill || BLACK}`}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);

otherSports.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default otherSports;
