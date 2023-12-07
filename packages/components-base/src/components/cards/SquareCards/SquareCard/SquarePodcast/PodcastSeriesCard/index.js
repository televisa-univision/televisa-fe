import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import { PODCAST } from '@univision/fe-commons/dist/constants/labelTypes';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { WHITE } from '@univision/fe-utilities/styled/constants';
import { PODCAST_SERIES_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/podcastCard';

import BackgroundImage from '../../../../../BackgroundImage';
import CardOptions from '../../../../../CardOptionsList';
import PictureIcon from '../../../../../CardPictureIcon';
import Label from '../../../../../Label';
import Link from '../../../../../Link';
import Styles from './PodcastSeriesCard.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const SeriesCardContainer = styled.article`${Styles.seriesCardContainer}`;
const SeriesCardLabel = styled(Label)`${Styles.seriesCardLabel}`;
const SeriesCardContent = styled.div`${Styles.seriesCardContent}`;
const SeriesCardDescription = styled(Link).attrs({ className: 'uvs-font-a-light' })`${Styles.seriesCardDescription}`;
const SeriesCardItem = styled.span.attrs({ className: 'uvs-font-c-regular' })` ${Styles.seriesCardItem}`;
const SeriesCardLinkImage = styled(Link)`${Styles.seriesCardLinkImage}`;

/**
 * Podcast Series Card
 * @param {Object} props component props
 * @param {string} [props.description] - Podcast text description
 * @param {string} [props.episodeCount] - Number of episodes the podcast has
 * @param {Object} [props.image] - renditions for background and card
 * @param {Object} [props.primaryTag] - th primary tag
 * @param {string} [props.title] - main title
 * @param {string} [props.trackClick] - the tracking function
 * @param {string} [props.uri] - podcast URL
 * @returns {JSX}
 */
const PodcastSeriesCard = ({
  description,
  episodeCount,
  image,
  primaryTag,
  size,
  title,
  trackClick,
  uri,
}) => {
  const category = getKey(primaryTag, 'name', '');
  const episodeCountText = episodeCount > 1 ? localization.get('episodes') : localization.get('episode');

  return (
    <Wrapper size={size}>
      <BackgroundImage
        absolute
        aspectRatio={PODCAST_SERIES_CARD_RATIOS[size]}
        blur
        image={image}
        overrideImageUrl={getRenditionUrl(getKey(image, 'renditions.original', {}),
          PODCAST_SERIES_CARD_RATIOS[size])}
      />
      <SeriesCardContainer size={size}>
        <SeriesCardLabel label={localization.get('podcast')} type={PODCAST} size={size} />
        <SeriesCardLinkImage size={size} href={uri} onClick={trackClick} useExplicitNavigation>
          <PictureIcon
            type="square"
            title={title}
            image={image}
            aspectRatio={PODCAST_SERIES_CARD_RATIOS[size]}
            iconName="podcast"
          />
        </SeriesCardLinkImage>
        <SeriesCardContent size={size}>
          <SeriesCardDescription size={size} href={uri} onClick={trackClick} useExplicitNavigation>
            {description}
          </SeriesCardDescription>
          <CardOptions color={WHITE}>
            {category && <SeriesCardItem size={size}>{category}</SeriesCardItem>}
            {(episodeCount > 0) && (
              <SeriesCardItem size={size}>{episodeCount} {episodeCountText}</SeriesCardItem>
            )}
          </CardOptions>
        </SeriesCardContent>
      </SeriesCardContainer>
    </Wrapper>
  );
};

PodcastSeriesCard.propTypes = {
  description: PropTypes.string.isRequired,
  episodeCount: PropTypes.number,
  image: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
    renditions: PropTypes.object.isRequired,
  }).isRequired,
  primaryTag: PropTypes.object,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  title: PropTypes.string.isRequired,
  trackClick: PropTypes.func,
  uri: PropTypes.string.isRequired,
};

export default PodcastSeriesCard;
