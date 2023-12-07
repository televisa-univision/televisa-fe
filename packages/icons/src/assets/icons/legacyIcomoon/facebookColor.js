import React from 'react';
import PropTypes from 'prop-types';
import Svg, {
  Path, G,
} from 'svgs';

/**
 * facebookColor component
 * @param {!Object} props - components props
 * @param {style} props.fill - custom fill color
 * @param {number} props.width - icon width size
 * @param {number} props.height - icon height size
 * @param {style} props.className - class name modifier
 * @param {style} props.style - style override
 * @returns {JSX}
 */
const facebookColor = ({
  height,
  width,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G id="Facebook">
      <Path id="path12" d="M24 12.4998C24 5.87236 18.6274 0.499784 12 0.499784C5.37258 0.499784 0 5.87236 0 12.4998C0 18.4893 4.38823 23.4538 10.125 24.354V15.9685H7.07813V12.4998H10.125V9.85603C10.125 6.84853 11.9165 5.18728 14.6576 5.18728C15.9705 5.18728 17.3438 5.42166 17.3438 5.42166V8.37478H15.8306C14.3399 8.37478 13.875 9.29979 13.875 10.2488V12.4998H17.2031L16.6711 15.9685H13.875V24.354C19.6118 23.4538 24 18.4893 24 12.4998Z" fill="#1877F2" />
      <Path id="path14" d="M16.6725 15.9688L17.2045 12.5H13.8764V10.249C13.8764 9.30001 14.3413 8.375 15.832 8.375H17.3452V5.42188C17.3452 5.42188 15.9719 5.1875 14.659 5.1875C11.9179 5.1875 10.1264 6.84875 10.1264 9.85625V12.5H7.07954V15.9688H10.1264V24.3542C10.7374 24.4501 11.3635 24.5 12.0014 24.5C12.6393 24.5 13.2655 24.4501 13.8764 24.3542V15.9688H16.6725Z" fill="white" />
    </G>
  </Svg>
);

facebookColor.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default facebookColor;
