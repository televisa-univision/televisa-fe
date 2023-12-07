import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import { HORIZONTAL, VERTICAL } from '@univision/fe-commons/dist/constants/layoutTypes';
import { SLIDESHOW_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/slideshowCard';
import { SQUARE_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/squareCard';

import Link from '../../../../Link';
import Picture from '../../../../Picture';
import SquareVideo from '../../SquareCard/SquareVideo';
import Styles from './ListCardImage.styles';

const CardContainer = styled.div`${Styles.cardContainer}`;
const CardContainerLink = styled(Link)`${Styles.cardContainerLink}`;
const Filter = styled.div`${Styles.filter}`;
const ImageGrid = styled.div`${Styles.imageGrid}`;
const ImageGridContainer = styled.div`${Styles.imageGridContainer}`;
const ImageGridImage = styled(Picture)`${Styles.imageGridImage}`;
const ImageGridOverlay = styled.div`${Styles.imageGridOverlay}`;
const ListRadioLogo = dynamic(() => import(/* webpackChunkName: "listRadioLogo-cpm" */ '../ListRadioLogo'));
const PictureStyled = styled(Picture)`${Styles.picture}`;
const SquareVideoStyled = styled(SquareVideo)`${Styles.videoCard}`;

/**
 * Render card images
 * @param {Array} cardImages the card images
 * @param {string} layout the list card layout
 * @returns {JSX}
 */
export const renderCardImages = (cardImages, layout) => {
  if (!isValidArray(cardImages)) return null;

  return cardImages
    .slice(0, 2)
    .map((image, idx) => {
      const imageType = 'main';
      const imageRatio = SLIDESHOW_CARD_RATIOS[layout][imageType];

      return (
        <>
          <ImageGridImage
            image={image}
            index={idx}
            key={image.uid}
            overrideImageUrl={getRenditionUrl(
              getKey(image, 'renditions.original', {}),
              imageRatio
            )}
            overrideImageBounds={imageRatio}
          />
          {layout !== VERTICAL && (
            <ImageGridOverlay layout={layout} index={idx} />
          )}
        </>
      );
    });
};

/**
 * List Card Image component
 * @param {!Object} props - Props for this component
 * @param {Object} [props.abacast] radio station information such as ID, name etc
 * @param {Object} [props.alternativeLogo] - radio station logo renditions
 * @param {array} [props.cardImages] - List of images
 * @param {Node} [props.children] - the chlidren node
 * @param {string} [props.contentPriority] - content priority for this card
 * @param {string} [props.durationString] - the video duration
 * @param {image} [props.image] - main content image
 * @param {isDark} [props.isDark = false] - true if in dark mode
 * @param {isSlideshow} [props.isSlideshow = false] - true if content type is slide show
 * @param {isRadio} [props.isRadio = false] - true is content type is radio
 * @param {isVideo} [props.isVideo = false] - true is content type is video
 * @param {layout} [props.layout] - the layout for the list card
 * @param {string} [props.mcpid] - Video mcpid
 * @param {bool} [props.preventFollowClick] - Adds link but prevents following it
 * @param {number} [props.nowPlayingId] - ID to fetch song/audio information
 * required for pip player
 * @param {string} [props.title] - content title
 * @param {function} [props.trackClick] - The tracking function
 * @param {string} [props.uri] - Slide show uri
 * @param {string} [props.uid] - Video preview uid
 * @param {Object} [props.widgetContext] - the card widget context
 * @returns {JSX}
 */
const ListCardImage = ({
  abacast,
  alternativeLogo,
  cardImages,
  children,
  contentPriority,
  durationString,
  image,
  isDark,
  isRadio,
  isSlideshow,
  isVideo,
  layout,
  overlay,
  preventFollowClick,
  mcpid,
  nowPlayingId,
  title,
  trackClick,
  uid,
  uri,
  useExplicitNavigation,
  target,
  widgetContext,
  ...otherProps
}) => {
  const renderedImages = useMemo(() => renderCardImages(cardImages, layout), [cardImages, layout]);
  const imageRatio = SQUARE_CARD_RATIOS[layout];

  return (
    <CardContainer
      layout={layout}
    >
      <CardContainerLink
        href={isRadio ? null : uri}
        onClick={trackClick}
        preventFollowClick={preventFollowClick}
        target={target}
        useExplicitNavigation={useExplicitNavigation}
      >
        {overlay}
        {isSlideshow && (
          <ImageGridContainer layout={layout} isDark={isDark}>
            <ImageGrid>
              {renderedImages}
            </ImageGrid>
          </ImageGridContainer>
        )}
        {!isVideo && !isSlideshow && (
          <>
            <PictureStyled
              alt={title}
              image={image}
              overrideImageUrl={getRenditionUrl(
                getKey(image, 'renditions.original', {}),
                imageRatio
              )}
              overrideImageBounds={imageRatio}
            />
            {(isRadio || layout === HORIZONTAL || layout === VERTICAL && isDark) && <Filter />}
            {isRadio && (
              <ListRadioLogo
                abacast={abacast}
                alternativeLogo={alternativeLogo}
                image={image}
                nowPlayingId={nowPlayingId}
                title={title}
                uid={uid}
                uri={uri}
                {...otherProps}
              />
            )}
          </>
        )}
        {isVideo && (
          <SquareVideoStyled
            contentPriority={contentPriority}
            durationString={durationString}
            image={image}
            isListCard
            hideProgressBar={layout === HORIZONTAL}
            layout={layout}
            mcpid={mcpid}
            preventFollowClick={preventFollowClick}
            title={title}
            uid={uid}
            uri={uri}
            widgetContext={widgetContext}
            {...otherProps}
          >
            {children}
          </SquareVideoStyled>
        )}
      </CardContainerLink>
    </CardContainer>
  );
};

ListCardImage.propTypes = {
  abacast: PropTypes.object,
  alternativeLogo: PropTypes.object,
  cardImages: PropTypes.arrayOf(
    PropTypes.shape({
      renditions: PropTypes.object,
    })
  ),
  children: PropTypes.node,
  contentPriority: PropTypes.string,
  durationString: PropTypes.string,
  image: PropTypes.shape({
    credit: PropTypes.string,
    renditions: PropTypes.object,
  }),
  overlay: PropTypes.node,
  preventFollowClick: PropTypes.bool,
  isDark: PropTypes.bool,
  isRadio: PropTypes.bool,
  isSlideshow: PropTypes.bool,
  isVideo: PropTypes.bool,
  layout: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
  mcpid: PropTypes.string,
  nowPlayingId: PropTypes.string,
  title: PropTypes.string,
  trackClick: PropTypes.func,
  uid: PropTypes.string,
  uri: PropTypes.string,
  useExplicitNavigation: PropTypes.bool,
  target: PropTypes.string,
  widgetContext: PropTypes.object,
};

ListCardImage.defaultProps = {
  isSlideshow: false,
  target: '_self',
};

export default ListCardImage;
