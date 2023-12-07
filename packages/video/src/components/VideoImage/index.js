import React from 'react';
import PropTypes from 'prop-types';
import Picture from '@univision/fe-components-base/dist/components/Picture';
import Styles from './VideoImage.scss';

/**
 * Isolating image element
 * @param {Object} pictureProps - Picture props
 * @param {Object}  children - Children components
 * @returns {JSX}
 */
const VideoImage = ({ pictureProps, children }) => (
  <div
    className={Styles.wrapper}
    role="presentation"
    data-element-name="VideoImageWrapper"
  >
    <div
      className={Styles.imageWrapper}
      data-element-name="VideoImagePictureWrapper"
    >
      <Picture {...pictureProps} className={Styles.previewWrapper} lazyload />
    </div>
    {children}
  </div>
);

VideoImage.propTypes = {
  children: PropTypes.node,
  pictureProps: PropTypes.object,
};

export default VideoImage;
