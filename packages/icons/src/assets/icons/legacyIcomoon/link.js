import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';
import Svg, { Path } from 'svgs';

import { BLACK } from '../../../constants/colors';

/**
 * link component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const link = ({
  fill,
  height,
  width,
  className,
  style,
}) => (
  <Svg
    height={height}
    width={width}
    viewBox="0 0 1024 1024"
    className={className}
    style={style}
  >
    <Path
      fill={`${fill || BLACK}`}
      d="M640 341.333h128c47.147 0 89.728 19.072 120.661 50.005s50.005 73.515 50.005 120.661-19.072 89.728-50.005 120.661-73.515 50.005-120.661 50.005h-128c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667h128c70.699 0 134.741-28.715 181.035-74.965s74.965-110.336 74.965-181.035-28.715-134.741-74.965-181.035-110.336-74.965-181.035-74.965h-128c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM384 682.667h-128c-47.147 0-89.728-19.072-120.661-50.005s-50.005-73.515-50.005-120.661 19.072-89.728 50.005-120.661 73.515-50.005 120.661-50.005h128c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-128c-70.699 0-134.741 28.715-181.035 74.965s-74.965 110.336-74.965 181.035 28.715 134.741 74.965 181.035 110.336 74.965 181.035 74.965h128c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667zM341.333 554.667h341.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-341.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
    />
  </Svg>
);

link.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
};

export default link;
