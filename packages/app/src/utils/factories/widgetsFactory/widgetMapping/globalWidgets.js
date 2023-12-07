import dynamic from 'next/dynamic';

import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';

import CardCarouselPlaceholder from '@univision/fe-components-base/dist/components/widgets/Placeholder/CardsCarousel';
import GridPlaceholder from '@univision/fe-components-base/dist/components/widgets/Placeholder/Grid';
import ListPlaceholder from '@univision/fe-components-base/dist/components/widgets/Placeholder/List';
import Advertisment from '@univision/fe-components-base/dist/components/widgets/Advertisement';
import VideoWithPlaylist from '@univision/fe-video/dist/components/widgets/VideoWithPlaylist/VideoWithPlaylistConnector';

import types from './widgetTypes.json';

/**
 * Widgets meant to be used globally.
 * THE CHUNK NAME MUST BE "globalWidgets"
 */
const globalWidgets = {
  /**
   * Widget used as fallback
   * @constructor
   */
  ContentCarousel: {
    name: 'Content Carousel',
    type: types.carousel,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-content-carousel-cpm" */ '@univision/fe-components-base/dist/components/widgets/ContentCarousel')),
  },
  [widgetTypes.ADVERTISEMENT]: {
    name: 'All - Banner - Advertisement',
    type: types.banner,
    loader: Advertisment,
  },
  [widgetTypes.ALL_CAROUSEL_ICON_PROMO]: {
    name: 'All - Carousel - Icon Promo',
    type: types.carousel,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-allCarouselIconPromo-ssr-cpm" */ '@univision/fe-components-base/dist/components/widgets/IconPromoContainer')),
  },
  [widgetTypes.ALL_COUNTDOWN_TIMER]: {
    name: 'All - Countdown - Timer',
    type: types.countdown,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-countdownTimer-ssr-cpm" */ '@univision/fe-components-base/dist/components/widgets/Countdown/Countdown')),
  },
  [widgetTypes.ALL_EXTERNAL_EMBED]: {
    name: 'All - External - Embed',
    type: types.external,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-external-embed" */ '@univision/fe-components-base/dist/components/widgets/ExternalEmbed')),
  },
  [widgetTypes.ALL_MOVING_BANNER]: {
    name: 'All - Banner - Moving Banner',
    type: types.banner,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-moving-banner" */ '@univision/fe-components-base/dist/components/NotificationBanner')),
  },
  [widgetTypes.ALL_VIDEO_PLAYLIST_VIDEO]: {
    name: 'All - Video Playlist - Video',
    type: types.videoPlaylist,
    loader: VideoWithPlaylist,
  },
  [widgetTypes.GRID_WIDGET]: {
    name: 'Grid Widget',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-enhancements-ssr-cpm" */ '@univision/fe-components-base/dist/components/widgets/Grids/GridEnhancement/GridConnector')),
    placeholder: GridPlaceholder,
  },
  [widgetTypes.LIST_WIDGET]: {
    name: 'List Widget',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-list-ssr-cpm" */ '@univision/fe-components-base/dist/components/widgets/ListWidgets/ListEnhancement/ListConnector')),
    placeholder: ListPlaceholder,
  },
  [widgetTypes.CAROUSEL_WIDGET]: {
    name: 'Carousel Widget',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-enhancements-ssr-cpm" */ '@univision/fe-components-base/dist/components/widgets/Carousel')),
    placeholder: CardCarouselPlaceholder,
  },
  [widgetTypes.ALL_LOCAL_NEWS_CAROUSEL]: {
    name: 'Local News Carousel',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-local-news-carousel" */ '@univision/fe-components-base/dist/components/widgets/LocalNewsCarousel')),
    placeholder: CardCarouselPlaceholder,
  },
  [widgetTypes.DIGITAL_CHANNEL_CARD]: {
    name: 'Digital Channel Card',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-digital-channel-ssr-cpm" */ '@univision/fe-components-base/dist/components/cards/OpeningCard')),
  },
  [widgetTypes.CHANNEL_STRIP]: {
    name: 'Channel Strip',
    type: types.banner,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-channel-strip" */ '@univision/fe-components-base/dist/components/ChannelStrip')),
  },
  [widgetTypes.CROSS_VERTICAL_LIST]: {
    name: 'Cross Vertical List',
    type: types.list,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-cross-vertical-list" */ '@univision/fe-components-base/dist/components/widgets/CrossVerticalList')),
  },
  [widgetTypes.TOP_QUICK_LINKS]: {
    name: 'Top Quick Links',
    type: types.list,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-top-quick-links" */ '@univision/fe-components-base/dist/components/widgets/TopQuickLinks')),
  },
  [widgetTypes.INDEX_WIDGET]: {
    name: 'Index Widget',
    type: types.list,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-index-widget" */ '@univision/fe-components-base/dist/components/widgets/IndexList')),
  },
  [widgetTypes.SINGLE_WIDGET]: {
    name: 'Single Widget',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-single-widget" */ '../../../../components/base/SingleWidgetLoader')),
  },
  [widgetTypes.PODCAST_OPENER]: {
    name: 'Podcast Opener',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-podcast-opener" */ '@univision/fe-components-base/dist/components/widgets/PodcastOpener')),
  },
  [widgetTypes.DIGITAL_CHANNEL_EPG]: {
    name: 'Digital Channel EPG',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-digital-channel-epg" */ '@univision/fe-components-base/dist/components/widgets/DigitalChannelEPG')),
  },
};

export default globalWidgets;
