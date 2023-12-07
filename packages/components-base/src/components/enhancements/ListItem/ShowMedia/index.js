import React from 'react';
import PropTypes from 'prop-types';
import Video from '@univision/fe-video/dist/components/enhancements/Video';
import Picture from '../../../Picture';
import RawHtmlContainer from '../../RawHtmlContainer';
import * as sizes from '../../../Picture/imageSizes';

/**
 * ShowMedia component
 * @param {Object} media - media data for the component
 * @param {string} device - what platform user is accessing
 * @returns {JSX}
 */
const ShowMedia = ({ media }) => {
  const OVERRIDE = {
    xl: sizes.LARGE,
    lg: sizes.X_LARGE,
    md: sizes.MEDIUM,
    sm: sizes.MEDIUM,
  };
  switch (media?.type) {
    case 'video':
      return <Video {...media} />;
    case 'image':
      return (
        <Picture
          alt={media.title}
          image={media}
          deviceSizeOverrides={OVERRIDE}
        />
      );
    case 'externalcontent':
      return (
        <RawHtmlContainer html={media?.responseData?.html} />
      );
    default:
      return null;
  }
};

/**
* propTypes
* @property {Object} media Data for Components
*/
ShowMedia.propTypes = {
  media: PropTypes.object.isRequired,
  device: PropTypes.string,
};

export default ShowMedia;
