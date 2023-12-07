import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import { Svg, Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * favorite icon component
 * @param {Object} props - components props
 * @param {string} props.className - modifier class name
 * @param {string} props.fill - icon fill modifier
 * @param {number} props.height - icon height
 * @param {(style|Object)} props.style - style override
 * @param {string} props.viewBox - viewBox
 * @param {number} props.width - icon width
 * @returns {JSX}
 */
const favorite = ({
  width, height, fill, viewBox, className, style,
}) => (
  <Svg width={width} height={height} viewBox={viewBox} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M128.384 7c2.288 0 4.32 1.464 5.032 3.624l26.216 79.944h84.832c2.288 0 4.32 1.464 5.032 3.624l.008.016c.712 2.16-.064 4.528-1.92 5.864l-76.208 54.216-36.392 26.256L59.76 235.28c-1.856 1.336-4.368 1.336-6.224 0-1.856-1.336-2.632-3.704-1.928-5.864l26.216-79.952-68.632-49.408c-1.856-1.336-2.624-3.704-1.92-5.864.704-2.16 2.736-3.624 5.032-3.624h84.832l26.216-79.944c.704-2.16 2.744-3.624 5.032-3.624zm-.008 22.208l-22.368 68.216c-.704 2.16-2.736 3.624-5.032 3.624H28.584l58.568 42.16c1.856 1.328 2.632 3.696 1.92 5.856l-22.368 68.224 58.56-42.16c1.856-1.336 4.368-1.336 6.224 0l3.84687 5.15956 36.04837-26.00447-3.69524-5.21109c-.712-2.16.064-4.52 1.92-5.856l-.008-.008 58.568-42.16h-72.392c-2.288 0-4.32-1.464-5.032-3.624l-22.368-68.216zm78.048 171.904h32.192c2.16 0 3.904 1.744 3.904 3.904v5.68c0 2.16-1.744 3.904-3.904 3.904h-32.192v31.256c0 2.16-1.744 3.904-3.904 3.904h-5.68c-2.16 0-3.904-1.744-3.904-3.904V214.6h-31.928c-2.16 0-3.904-1.744-3.904-3.904v-5.68c0-2.16 1.744-3.904 3.904-3.904h31.928v-31.256c0-2.16 1.744-3.904 3.904-3.904h5.68c2.16 0 3.904 1.744 3.904 3.904v31.256z"
      fill={`${fill || BLACK}`}
      fillRule="nonzero"
    />
  </Svg>
);

favorite.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

export default favorite;
