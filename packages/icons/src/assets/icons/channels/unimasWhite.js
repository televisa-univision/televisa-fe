import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import Svg, { G, Path } from 'svgs';

/**
 * unimasWhite component
 * @param {size} props.size - icon size
 * @param {string} props.fill - icon fill modifier
 * @param {style} props.style - style override
 * @param {string} props.className - modifier class name
 * @returns {JSX}
 */
const unimasWhite = ({
  width, height, fill, className, style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 50 18"
    className={className}
    style={style}
  >
    <G id="Page-1" fill="none" fillRule="evenodd">
      <G id="Deportes/TV-Logo/Desktop/white/unimas" fill={`${fill || '#FFFFFF'}`} fillRule="nonzero">
        <Path id="Shape" d="M39.851 4.52l-5.534 1.15-.299 1.162h4.762zM33.922 13.878l1.39-2.34.432 2.34h-1.822zm11-2.674c-1.015-.192-1.248-.359-1.196-.62l.006-.026c.047-.236.308-.403.806-.403.924 0 1.988.29 2.795.953L49.4 8.933c-.973-.883-2.308-1.322-4.226-1.322-2.747 0-4.52 1.418-4.893 3.249l-.007.027c-.416 2.037 1.422 2.655 3.568 3.096 1.025.207 1.307.356 1.25.634l-.005.027c-.054.263-.341.415-.937.415-1.17 0-2.34-.33-3.258-1.13l-1.417 1.322-1.71-7.497h-3.303l-5.136 8.064 1.654-8.082h-4.263l-2.092 3.417-.112-.562c-.566-2.735-3.075-2.853-3.425-2.855h-1.42l-1.987 9.722h3.288l.986-4.818.61 4.05h1.801l2.265-4.05-.984 4.818H31.838l.78-1.293h3.486l.261 1.293h3.613l-.145-.64c.985.52 2.235.786 3.636.786 2.678 0 4.652-1.24 5.066-3.265l.006-.024c.397-1.942-1.163-2.655-3.62-3.111zM22.483 7.021c1.093 0 1.98-.888 1.98-1.984v-2.16H23.46v2.16a.977.977 0 0 1-1.952 0v-2.16h-1.003v2.16c0 1.096.887 1.984 1.98 1.984M26.198 4.75a.978.978 0 1 1 1.954 0v2.161h1.003v-2.16a1.983 1.983 0 0 0-1.98-1.986c-1.093 0-1.982.89-1.982 1.985v2.161h1.004v-2.16h.001z" />
        <Path id="Rectangle-path" d="M30.182 2.884h1.004v4.027h-1.004z" />
        <Path id="Shape" d="M19.294.898c-.162-.131-.456-.255-.895-.378-1.198-.337-9.034.122-9.333.15-.297.03-.18.475-.18.475v.002c.187-.002.39-.002.613-.002 2.191.007 5.035.161 6.05.498.817.268.738.455.738.455l-1.7 7.677c-.44 2.052-2.71 7.051-8.99 7.293-.088-.307-.11-.771-.088-1.318.021-.907.282-2.552.283-2.555.15-.96.33-1.859.453-2.419l1.097-5.12C6.322 3.562 3.486 2.82 2.187 2.94c-.11.01-.194.092-.226.231V3.17L.586 9.802c-.307 1.452-.842 7.724 6.26 7.724 6.394 0 9.732-5.142 10.42-7.735v.006l2.203-8.432c.03-.117.03-.3-.175-.467" />
      </G>
    </G>
  </Svg>
);

unimasWhite.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default unimasWhite;
