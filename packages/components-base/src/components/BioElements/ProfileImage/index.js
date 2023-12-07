import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Picture from '../../Picture';

import * as ratios from '../../Picture/aspectRatios';
import * as sizes from '../../Picture/imageSizes';
import Styles from './ProfileImage.styles';

const deviceSizeOverrides = {
  xl: sizes.LARGE,
  lg: sizes.LARGE,
  md: sizes.LARGE,
  sm: sizes.LARGE,
  xsm: sizes.LARGE,
};

const ProfileWrapper = styled.div`${Styles.profileWrapper}`;

/**
 * ProfileImage component for bios
 * @param {string} [className] - modifier class
 * @param {string} image - Image source .
 * @param {string} [title] - alt text for the image.
 * @returns {JSX}
 */
const ProfileImage = ({
  className,
  image,
  title,
}) => {
  if (!image) return null;

  return (
    <ProfileWrapper className={className}>
      <Picture
        alt={title}
        aspectRatio={ratios.ASPECT_RATIO_1X1}
        deviceSizeOverrides={deviceSizeOverrides}
        image={image}
        preload={false}
      />
    </ProfileWrapper>
  );
};

ProfileImage.propTypes = {
  className: PropTypes.string,
  image: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
    renditions: PropTypes.object.isRequired,
  }).isRequired,
  title: PropTypes.string,
};

export default ProfileImage;
