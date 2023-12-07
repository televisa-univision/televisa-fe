import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import { PODCAST_EPISODE } from '@univision/fe-commons/dist/constants/contentTypes.json';
import { UFORIA } from '@univision/fe-commons/dist/constants/labelTypes';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import formatDate from '@univision/fe-utilities/helpers/date/formatDate';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import Icon from '@univision/fe-icons/dist/components/Icon';
import PlayStationButton from '@univision/fe-local/dist/components/connected/PlayStationButton/PlayStationButton';
import { PODCAST_EPISODE_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/podcastCard';

import BackgroundImage from '../../../../../BackgroundImage';
import CardOptions from '../../../../../CardOptionsList';
import PictureIcon from '../../../../../CardPictureIcon';
import Label from '../../../../../Label';
import Styles from './PodcastEpisodeCard.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const EpisodeCardPlayButton = styled(PlayStationButton)`${Styles.episodeCardPlayButton}`;
const EpisodeCardContainer = styled.article`${Styles.episodeCardContainer}`;
const EpisodeCardImage = styled.div`${Styles.episodeCardImage}`;
const EpisodeCardContent = styled.div`${Styles.episodeCardContent}`;
const EpisodeCardHeader = styled.header`${Styles.episodeCardHeader}`;
const EpisodeCardWrapper = styled.div`${Styles.episodeCardWrapper}`;
const EpisodeCardLabel = styled(Label)`${Styles.episodeCardLabel}`;
const EpisodeCardTitle = styled.p.attrs({ className: 'uvs-font-a-medium' })`${Styles.episodeCardTitle}`;
const EpisodeCardDate = styled.span.attrs({ className: 'uvs-font-c-regular' })`${Styles.episodeCardDate}`;
const EpisodeCardDescription = styled.p.attrs({ className: 'uvs-font-a-light' })`${Styles.episodeCardDescription}`;
const EpisodeCardItem = styled.span.attrs({ className: 'uvs-font-c-regular' })`${Styles.episodeCardItem}`;
const EpisodeCardItemButton = styled.button.attrs({ className: 'uvs-font-c-regular' })`${Styles.episodeCardItem}`;

/**
 * Podcast Episode Card
 * @param {Object} props component props
 * @param {Object} [props.audioMetadata] - object containing the audio metadata for the play button
 * @param {string} [props.description] - Podcast text description
 * @param {string} [props.duration] - Podcast duration text
 * @param {number} [props.feedPubDate] - the date the episode was published
 * @param {Object} [props.image] - renditions for background and card
 * @param {Object} [props.parent] - episode's podcast series
 * @param {Object} [props.sharing] - object with the sharing urls and information
 * @param {string} [props.title] - song/radio station main title
 * @param {string} [props.uid] - unique content ID from BEX
 * @param {Object} [props.widgetContext] - widget context from widget factory
 * @returns {JSX}
 */
const PodcastEpisodeCard = ({
  audioMetadata,
  description,
  duration,
  feedPubDate,
  image,
  parent,
  sharing,
  size,
  title,
  uid,
  widgetContext,
}) => {
  const date = formatDate(new Date(feedPubDate), 'en')?.split(' \u2013 ')[0]?.toUpperCase();
  const trackClick = CardTracker.onClickHandler({ uid, title }, widgetContext);
  const feedDate = new Date(feedPubDate);
  const weekEarlier = new Date();
  weekEarlier.setDate(weekEarlier.getDate() - 7);
  const isNewEpisode = weekEarlier < feedDate;
  const playButtonProps = {
    uid,
    uri: parent?.uri,
    image,
    sharing,
    abacast: audioMetadata,
    abacastId: uid,
    contentType: PODCAST_EPISODE,
    detailedDescription: description,
    stationDescription: parent?.title,
    stationTitle: title,
    isPodcast: true,
  };

  return (
    <Wrapper size={size}>
      <BackgroundImage
        absolute
        aspectRatio={PODCAST_EPISODE_CARD_RATIOS[size]}
        blur
        image={image}
        overrideImageUrl={getRenditionUrl(getKey(image, 'renditions.original', {}),
          PODCAST_EPISODE_CARD_RATIOS[size])}
      />
      <EpisodeCardPlayButton {...playButtonProps} onClick={trackClick}>
        <EpisodeCardContainer type={size}>
          <EpisodeCardContent size={size}>
            <EpisodeCardHeader size={size}>
              <EpisodeCardImage size={size}>
                <PictureIcon
                  type="square"
                  title={title}
                  image={image}
                  aspectRatio={PODCAST_EPISODE_CARD_RATIOS[size]}
                  iconName="playcircle"
                />
              </EpisodeCardImage>
              <EpisodeCardWrapper size={size}>
                {isNewEpisode && (
                  <EpisodeCardLabel label={localization.get('newEpisode')} type={UFORIA} size={size} />
                )}
                <EpisodeCardTitle size={size} isNewEpisode={isNewEpisode}>
                  {title}
                </EpisodeCardTitle>
                <EpisodeCardDate size={size}>{date.toString()}</EpisodeCardDate>
              </EpisodeCardWrapper>
            </EpisodeCardHeader>
            <EpisodeCardDescription size={size}>
              {description}
            </EpisodeCardDescription>
            <CardOptions color={WHITE}>
              <EpisodeCardItemButton size={size}>
                <Icon name="playnocircle" fill={WHITE} size={12} />
                {localization.get('listen')}
              </EpisodeCardItemButton>
              <EpisodeCardItem size={size}>{duration}</EpisodeCardItem>
            </CardOptions>
          </EpisodeCardContent>
        </EpisodeCardContainer>
      </EpisodeCardPlayButton>
    </Wrapper>
  );
};

PodcastEpisodeCard.propTypes = {
  audioMetadata: PropTypes.object,
  description: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  feedPubDate: PropTypes.number.isRequired,
  hasAdSkin: PropTypes.bool,
  image: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
    renditions: PropTypes.object.isRequired,
  }).isRequired,
  parent: PropTypes.object,
  sharing: PropTypes.object,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  title: PropTypes.string.isRequired,
  uid: PropTypes.string,
  widgetContext: PropTypes.object,
};

PodcastEpisodeCard.defaultProps = {
  hasAdSkin: false,
};

export default PodcastEpisodeCard;
