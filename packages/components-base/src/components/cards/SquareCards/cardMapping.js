import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import SquareArticleImage from './SquareCard/SquareArticleImage';
import SquareCardLoading from './SquareCard/SquareCardLoading';
import SquareSlideshowGrid from './SquareCard/SquareSlideshowGrid';
import SquareLiveblogPosts from './SquareCard/SquareLiveblogPosts';
import SquareVideo from './SquareCard/SquareVideo';
import SquareVideoInline from './SquareCard/SquareVideoInline';
import SquareLivestream from './SquareCard/SquareLivestream';
import SquarePerson from './SquareCard/SquarePerson';
import SquareShow from './SquareCard/SquareShow';
import SquareGeneric from './SquareCard/SquareGeneric';
import SquareExternalPromo from './SquareCard/SquareExternalPromo';
import PodcastEpisodeCard from './SquareCard/SquarePodcast/PodcastEpisodeCard';
import SquareScoreCardConnector from './SquareCard/SquareScoreCard/SquareScoreCardConnector';
import cardTypes from './SquareCard/constants/cardTypes';

/**
 * Gets the commonProps used in a card
 * @param {Object} props component props
 * @returns {Object}
 */
const getCommonProps = ({
  title,
  description,
  uid,
  uri,
  size,
  widgetContext,
  isDark: inDarkMode,
  trackClick,
  trackClickOther,
  image,
  theme,
}) => ({
  title,
  description,
  uid,
  uri,
  size,
  widgetContext,
  isDark: inDarkMode,
  trackClick,
  trackClickOther,
  image,
  theme,
});

/**
 * Returns the liveblogcard variant component
 * @param {Object} props of the component
 * @returns {JSX}
 */
const LiveblogCard = (props) => {
  const {
    recentPostTitles,
    recentTitledPosts,
  } = props;

  const commonProps = getCommonProps(props);

  return (
    <>
      <SquareArticleImage
        {...commonProps}
        isLiveblog
      />
      <SquareLiveblogPosts
        recentPostTitles={recentPostTitles}
        recentTitledPosts={recentTitledPosts}
        {...commonProps}
      />
    </>
  );
};

LiveblogCard.propTypes = {
  recentPostTitles: PropTypes.array,
  recentTitledPosts: PropTypes.array,
};

const cardMapping = {
  [cardTypes.ADVERTISING_CARD]: {
    loader: SquareArticleImage,
    extraProps: ['type'],
  },
  [cardTypes.ARTICLE_IMAGE_CARD]: {
    loader: SquareArticleImage,
    extraProps: ['type'],
  },
  [cardTypes.LOADING]: {
    loader: SquareCardLoading,
    extraProps: [],
  },
  [cardTypes.GRID_CARD]: {
    loader: SquareSlideshowGrid,
    extraProps: ['cardImages'],
  },
  [cardTypes.LIVE_BLOG_CARD]: {
    loader: LiveblogCard,
    extraProps: ['recentPostTitles', 'recentTitledPosts'],
  },
  [cardTypes.VIDEO_PREVIEW_CARD]: {
    loader: SquareVideo,
    extraProps: ['contentPriority', 'durationString', 'mcpid', 'previewUrl', 'showNative'],
  },
  [cardTypes.VIDEO_INLINE_CARD]: {
    loader: SquareVideoInline,
    extraProps: ['mcpid', 'sharing', 'type'],
  },
  [cardTypes.LIVE_STREAM_CARD]: {
    loader: SquareLivestream,
    extraProps: ['active', 'auth', 'enableDai', 'livestreamId', 'mainImage', 'playerType', 'primaryTag', 'tvssUrl', 'vertical'],
  },
  [cardTypes.SOCCER_MATCH_CARD]: {
    loader: SquareScoreCardConnector,
    extraProps: ['awayTeamSeason', 'cardLabel', 'homeTeamSeason', 'matchId', 'liveStreamData', 'soccerCompetitionSeason', 'updateDate'],
  },
  [cardTypes.PODCAST_EPISODE_CARD]: {
    loader: PodcastEpisodeCard,
    extraProps: [],
  },
  [cardTypes.PODCAST_SERIES_CARD]: {
    loader: dynamic(() => import(/* webpackChunkName: "podcast-serie-card" */ './SquareCard/SquarePodcast/PodcastSeriesCard'), {
      loading: SquareCardLoading,
    }),
    extraProps: ['primaryTag'],
  },
  [cardTypes.PERSON_CARD]: {
    loader: SquarePerson,
    extraProps: [],
  },
  [cardTypes.SHOW_CARD]: {
    loader: SquareShow,
    extraProps: [],
  },
  [cardTypes.RADIO_STATION_CARD]: {
    loader: dynamic(() => import(/* webpackChunkName: "radio-card" */ '../RadioCard'), {
      loading: SquareCardLoading,
    }),
    extraProps: ['type'],
  },
  [cardTypes.GENERIC_CARD]: {
    loader: SquareGeneric,
    extraProps: ['cardTheme', 'isConectaFeed', 'labelProps', 'schedule', 'type'],
  },
  [cardTypes.EXTERNAL_CONTENT_PROMO_CARD]: {
    loader: SquareExternalPromo,
    extraProps: ['isConectaFeed', 'schedule', 'type'],
  },
  [cardTypes.HOROSCOPE_CARD]: {
    loader: dynamic(() => import(/* webpackChunkName: "horoscope-card" */ './SquareCard/SquareHoroscope'), {
      loading: SquareCardLoading,
    }),
    extraProps: ['image', 'size', 'trackClick', 'uri', 'horoscopeData', 'authors'],
  },
  [cardTypes.SOCCER_PERSON_CARD]: {
    loader: dynamic(() => import(/* webpackChunkName: "soccer-person-card" */ './SquareCard/SquareSoccerPerson'), {
      loading: SquareCardLoading,
    }),
    extraProps: [],
  },
};

export default cardMapping;
