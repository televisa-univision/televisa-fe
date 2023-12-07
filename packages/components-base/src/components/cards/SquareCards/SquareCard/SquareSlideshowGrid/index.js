import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import {
  SQUARE,
} from '@univision/fe-commons/dist/constants/cardTypes';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';

import { SLIDESHOW_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/slideshowCard';
import Link from '../../../../Link';
import Picture from '../../../../Picture';
import Styles from './SquareSlideshowGrid.styles';

const CardContainer = styled.div`${Styles.cardContainer}`;
const CardContainerLink = styled(Link)`${Styles.cardContainerLink}`;
const ImageGrid = styled.div`${Styles.imageGrid}`;
const ImageGridContainer = styled.div`${Styles.imageGridContainer}`;
const ImageGridImage = styled(Picture)`${Styles.imageGridImage}`;
const ImageGridOverlay = styled.div`${Styles.imageGridOverlay}`;

/**
 * Render card images
 * @param {Array} cardImages the card images
 * @param {string} type the card type
 * @param {string} size the card size
 * @returns {JSX}
 */
export const renderCardImages = (cardImages, type, size) => {
  if (!isValidArray(cardImages)) {
    return null;
  }

  return cardImages
    .slice(0, 3)
    .map((image, idx) => {
      const imageType = idx === 0
        ? 'main'
        : 'secondary';
      const imageRatio = SLIDESHOW_CARD_RATIOS[size][imageType];

      return (
        <ImageGridImage
          image={image}
          index={idx}
          key={image.uid}
          overrideImageUrl={getRenditionUrl(
            getKey(image, 'renditions.original', {}),
            imageRatio
          )}
          overrideImageBounds={imageRatio}
          type={type}
        />
      );
    });
};

/**
 * Slide show grid component
 * @param {!Object} props - Props for this component
 * @param {array} [props.cardImages] - List of images
 * @param {string} [props.className] - Class name override
 * @param {Object} [props.style] - Styles override
 * @param {string} [props.title] - Slide show title
 * @param {string} [props.type] - Type of card
 * @param {string} [props.uid] - Slide show uid
 * @param {string} [props.uri] - Slide show uri
 * @param {Object} [props.widgetContext] - Widget context
 * @returns {JSX}
 */
const SquareSlideshowGrid = ({
  cardImages,
  className,
  size,
  style,
  title,
  type,
  uid,
  uri,
  widgetContext,
}) => {
  const trackClick = CardTracker.onClickHandler({ uid, title }, widgetContext);

  return (
    <CardContainer
      className={className}
      style={style}
    >
      <CardContainerLink
        href={uri}
        onClick={trackClick}
        type={type}
        useExplicitNavigation
      >
        <ImageGridContainer type={type}>
          <ImageGrid type={type}>
            {renderCardImages(cardImages, type, size)}
          </ImageGrid>
          <ImageGridOverlay type={type} size={size} />
        </ImageGridContainer>
      </CardContainerLink>
    </CardContainer>
  );
};

SquareSlideshowGrid.propTypes = {
  cardImages: PropTypes.arrayOf(
    PropTypes.shape({
      renditions: PropTypes.object,
    })
  ),
  className: PropTypes.string,
  parent: PropTypes.shape({
    uri: PropTypes.string,
    title: PropTypes.string,
  }),
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  title: PropTypes.string,
  type: PropTypes.oneOf([SQUARE]),
  uid: PropTypes.string,
  uri: PropTypes.string,
  widgetContext: PropTypes.object,
};

SquareSlideshowGrid.defaultProps = {
  type: SQUARE,
};

export default SquareSlideshowGrid;
