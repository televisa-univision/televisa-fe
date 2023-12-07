import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import hints from '@univision/fe-commons/dist/utils/ssr/hints';
import types from './widgetTypes.json';
// eslint-disable-next-line import/no-cycle
import { setSSRModuleHint } from '.';

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
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/ContentCarousel'),
  },
  LFFreeContentWidgetEntretenimiento: {
    name: 'LF Free Content widget - Entretenimiento',
    type: types.carousel,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/ContentItemsCarousel'),
  },
  LFFreeContentWidgetNovelas: {
    name: 'LF Free Content widget - Novelas',
    type: types.carousel,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/ContentItemsCarousel'),
  },
  LFFreeContentwidgetNoticias: {
    name: 'LF Free Content widget - Noticias',
    type: types.carousel,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/ContentItemsCarousel'),
  },
  LFFreeContentWidgetSeries: {
    name: 'LF Free Content widget - Series',
    type: types.carousel,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/ContentItemsCarousel'),
  },
  /**
   * Deprecated in favor of "All - Carousel - High Impact"
   * @constructor
   */
  FeaturedItemCarousel: {
    name: 'All - Carousel - High Impact',
    type: types.carousel,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/FeaturedCardCarousel'),
  },
  AllCarouselHighImpact: {
    name: 'All - Carousel - High Impact',
    type: types.carousel,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/FeaturedCardCarousel'),
  },
  ShowsLFGridFeaturedShows: {
    name: 'Shows - LF - Grid - Featured Shows',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/FourAcrossGrid'),
  },
  LFHighImpactWidget: {
    name: 'Shows - LF - High Impact',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/ShowHighImpact'),
  },
  'LFListSchedule:Live&Future': {
    name: 'Shows - LF - Schedule - Live & Future',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/LongformScheduleList'),
  },

  /**
   * Deprecated in favor of "All - Video Playlist - Video"
   * @constructor
   */
  VideoWithPlaylist: {
    name: 'All - Video Playlist - Video',
    type: types.videoPlaylist,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/VideoWithPlaylist'),
  },
  AllVideoPlaylistVideo: {
    name: 'All - Video Playlist - Video',
    type: types.videoPlaylist,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/VideoWithPlaylist'),
  },

  LongFormVideoList: {
    name: 'All - LongFormVideoList - Video',
    type: types.list,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ 'components/widgets/LongFormVideoList'),
  },

  AllGridlatestvideos: {
    name: 'Shows - LF - Grid - Specific Episodes',
    type: types.list,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/GridLatestVideos'),
  },

  ShowsLFGridSpecificEpisodes: {
    name: 'Shows - LF - Grid - Specific Episodes',
    type: types.list,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/GridLatestVideos'),
  },

  AllExternalEmbed: {
    name: 'All - External - Embed',
    type: types.external,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/ExternalEmbed'),
  },

  /**
   * Deprecated in favor of "All - Banner - Moving Banner"
   * @constructor
   */
  AllBannerMovingBanner: {
    name: 'All - Banner - Moving Banner',
    type: types.banner,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/NotificationBanner'),
  },
  /**
   * Deprecated in favor of "All - Banner - Moving Banner"
   * @constructor
   */
  Advertisement: {
    name: 'All - Banner - Advertisement',
    type: types.banner,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/Advertisement'),
  },
  /**
   * Deprecated in favor of "All - Carousel - Icon Promo"
   * @constructor
   */
  AllCarouselIconPromo: {
    name: 'All - Carousel - Icon Promo',
    type: types.carousel,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/IconPromoContainer'),
  },
  SectionAd: {
    name: 'Section Advertisement',
    type: types.banner,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/SectionAd'),
  },
  [widgetTypes.SEARCH_WIDGET_BODY]: {
    name: 'Search - Body',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ 'components/pages/Search/SearchConnector'),
  },
  [widgetTypes.CAROUSEL_WIDGET]: {
    name: 'Carousel Widget',
    type: types.card,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/CardsCarousel'),
  },
  [widgetTypes.ALL_LOCAL_NEWS_CAROUSEL]: {
    name: 'Local News Carousel',
    type: types.card,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/LocalNewsCarousel'),
  },
  [widgetTypes.DIGITAL_CHANNEL_CARD]: {
    name: 'Digital Channel Card',
    type: types.card,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/cards/OpeningCard'),
  },
  [widgetTypes.CHANNEL_STRIP]: {
    name: 'Channel Strip',
    type: types.banner,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/ChannelStrip'),
  },
  [widgetTypes.WEATHER_ALERTS_LIST]: {
    name: 'Weather Alerts List',
    type: types.card,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-local/dist/components/widgets/Weather/alerts/WeatherAlertsList'),
  },
  [widgetTypes.CROSS_VERTICAL_LIST]: {
    name: 'Cross Vertical List',
    type: types.list,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/CrossVerticalList'),
  },
  [widgetTypes.TOP_QUICK_LINKS]: {
    name: 'Top Quick Links',
    type: types.list,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/TopQuickLinks'),
  },
  [widgetTypes.PODCAST_OPENER]: {
    name: 'Podcast Opener',
    type: types.card,
    loader: () => import(/* webpackChunkName: "globalWidgets" */ '@univision/fe-components-base/dist/components/widgets/PodcastOpener'),
  },
};

setSSRModuleHint(globalWidgets, hints.globalWidgets);
export default globalWidgets;
