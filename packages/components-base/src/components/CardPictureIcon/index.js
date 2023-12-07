import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { isRectangleCard } from '../cards/helpers';

import Button from '../Button';
import Picture from '../Picture';
import Styles from './CardPictureIcon.styles';

export const MediaCard = styled.div`${Styles.mediaCard}`;
export const IconWrapper = styled(Button)`${Styles.iconWrapper}`;

/**
 * Render the card image.
 * @param {string} type size of card
 * @param {string} title alt text for image
 * @param {string} image the image to be rendered
 * @param {string} aspectRatio the aspect ratio of the image to be displayed
 * @param {string} iconName the icon to be rendered
 * @returns {JSX}
 */
const CardMediaIcon = ({
  type, title, image, aspectRatio, iconName,
}) => {
  const overrideImageUrl = aspectRatio && getRenditionUrl(
    getKey(image, 'renditions.original', {}),
    aspectRatio
  );

  return (
    <MediaCard>
      <Picture
        alt={title}
        image={image}
        overrideImageUrl={overrideImageUrl}
        overrideImageBounds={aspectRatio}
      />
      {!isRectangleCard(type) && (
        <IconWrapper type={type}>
          <Icon name={iconName} size="xsmall" fill={WHITE} />
        </IconWrapper>
      )}
    </MediaCard>
  );
};

CardMediaIcon.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  aspectRatio: PropTypes.object,
  iconName: PropTypes.string,
};

export default CardMediaIcon;
