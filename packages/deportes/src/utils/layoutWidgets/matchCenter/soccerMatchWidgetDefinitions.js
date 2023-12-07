import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import { getWidgetIndexByType } from '@univision/fe-commons/dist/store/storeHelpers';
import * as adTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';

/**
 * Get soccer match widgets definition
 * @param {Object} data page data from API
 * @returns {Object} all match widget
 */
export default function widgetDefinitions(data) {
  if (data) {
    return {
      /**
       * Video Player
       */
      AllVideoPlaylistVideo: {
        type: widgetTypes.ALL_VIDEO_PLAYLIST_VIDEO,
        content: data.playlist?.videos,
        settings: {
          uid: data.uid,
          soccerMatch: {
            uid: data.uid,
            image: data.image,
            description: data.description,
            publishDate: data.publishDate,
            title: data.title,
            uri: data.uri,
            hasMatchHighlights: data.hasMatchHighlights,
            // optaId: "965217"
            // matchId: "g965217",
            optaId: data.matchId,
            streamId: data.streamId,
            streamIdEnglish: data.streamIdEnglish,
            matchId: `g${data.matchId}`,
            isAuth: getKey(data, 'isAuth', getKey(data, 'auth')),
            adPackage: data?.soccerCompetitionSeason?.soccerCompetition?.league?.adPackage,
            eventId: data?.matchId || data?.eventId,
          },
        },
      },
      HalfTimeLivestream: {
        type: widgetTypes.ALL_VIDEO_PLAYLIST_VIDEO,
        content: data.playlist?.videos,
        settings: {
          mainTabLabel: null,
          uid: data.uid,
          updateDate: null,
          publishDate: null,
          otherTabs: [
            {
              label: null,
              content: [],
            },
          ],
          type: 'allvideoplaylistvideo',
          titleLink: null,
          uri: null,
          livestream: {
            uid: data.uid,
            uri: 'https://www.univision.com/deportes/minuto-45-livestream',
            type: 'livestream',
            image: {
              type: 'image',
              uid: data.uid,
              title: 'Minuto 45 de TV',
              caption: '',
              credit: null,
              renditions: {
                original: {
                  href: 'https://cdn1.uvnimg.com/06/08/8bc58b974ffd96b9e4f564afd586/minuto-45-con-en-vivo.jpg',
                  width: 4800,
                  height: 2700,
                },
              },
            },
            eventId: data?.matchId || data?.eventId,
            isSensitive: false,
            contentPriority: 'standard',
            title: 'Minuto 45',
            eventName: 'Minuto 45: Mundial Rusia 2018',
            description: 'Durante 15 minutos seguidos repasamos todo lo que sucedió en el primer tiempo y nuestros expertos te explican por qué se está dando este resultado.',
            livestreamId: '201806041107',
            adobeNetworkId: null,
            isAuth: true,
            playerType: 'JW',
            tvssUrl: 'usprauth.univision.com',
            mainImage: 'https://cdn2.uvnimg.com/92/d7/b94aadc34574976635b51d24124d/minuto-45-con-en-vivo.jpg',
            isActive: true,
            showEnVivo: false,
            authors: [],
            tempAuthors: [],
            player: 'JW',
          },
        },
      },
      LivestreamVideo: {
        type: widgetTypes.ALL_VIDEO_PLAYLIST_VIDEO,
        content: data.playlist?.videos,
        settings: {
          mainTabLabel: null,
          uid: data.uid,
          updateDate: null,
          publishDate: null,
          type: 'allvideoplaylistvideo',
          titleLink: null,
          uri: data.uri,
          livestream: {
            uid: data.uid,
            uri: data.uri,
            type: 'livestream',
            image: data.image,
            isSensitive: false,
            contentPriority: 'standard',
            title: data.title,
            enableDai: !!data.streamId,
            eventName: data.shortTitle,
            description: data.description,
            livestreamId: data.streamId,
            streamIdEnglish: data.streamIdEnglish,
            streamStartTime: data.streamStartTime,
            streamEndTime: data.streamEndTime,
            expirationDate: data.expirationDate,
            isAuth: data.auth,
            tvssUrl: 'usprauth.univision.com',
            mainImage: data.image,
            isActive: true,
            eventId: data?.matchId || data?.eventId,
            adPackage: data?.soccerCompetitionSeason?.soccerCompetition?.league?.adPackage,
          },
        },
      },
      /**
       * Ads
       */
      TopAdvertisement: adHelper.getAdDefinition(adTypes.TOP_AD_SECTIONS, '0'),
      MidAdvertisement: adHelper.getAdDefinition(adTypes.MID_AD_NO_FLEX, '1'),
      /**
       * Match Stats
       */
      [widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_STATS]: {
        type: widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_STATS,
        settings: {
          uid: 2,
          lazyLoadClient: false,
          matchId: data.matchId,
        },
      },
      /**
       * Standings
       */
      [widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS]: {
        type: widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
        settings: {
          uid: 3,
          lazyLoadClient: true,
          highlightedCompetitionSeasons: [
            data.soccerCompetitionSeason,
          ],
          displayType: {
            value: 'Flexible',
          },
        },
      },
      /**
       * Match Prematch
       */
      [widgetTypes.DEPORTES_MATCH_CENTER_PREMATCH]: {
        type: widgetTypes.DEPORTES_MATCH_CENTER_PREMATCH,
        settings: {
          uid: 4,
          lazyLoadClient: true,
          matchId: data.matchId,
        },
      },
      /**
       * Match opening
       */
      [widgetTypes.DEPORTES_GRID_SOCCER_MATCH_OPENING]: {
        type: widgetTypes.DEPORTES_GRID_SOCCER_MATCH_OPENING,
        settings: {
          uid: 5,
          lazyLoadClient: true,
          matchId: data.matchId,
          soccerCompetitionSeason: data.soccerCompetitionSeason,
        },
      },
      /**
       * Match Summary
       */
      [widgetTypes.DEPORTES_MATCH_SUMMARY]: {
        type: widgetTypes.DEPORTES_MATCH_SUMMARY,
        settings: {
          uid: 6,
          lazyLoadClient: true,
          matchId: data.matchId,
        },
      },
      /**
       * Match Play By Play
       */
      [widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY]: {
        type: widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY,
        settings: {
          uid: 7,
          lazyLoadClient: false,
          matchId: data.matchId,
        },
      },
      /**
       * Match Line up
       */
      [widgetTypes.DEPORTES_MATCH_CENTER_LINEUP]: {
        type: widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
        settings: {
          uid: 8,
          lazyLoadClient: true,
          matchId: data.matchId,
          soccerMatchStatus: data.soccerMatchStatus,
        },
      },
      /**
       * Heatmap
       */
      [widgetTypes.DEPORTES_MATCH_COMPARE_HEATMAP]: {
        type: widgetTypes.DEPORTES_GRID_EXTERNAL_SCRIPT,
        settings: {
          uid: 9,
          season: getKey(data, 'soccerCompetitionSeason.seasonId'),
          competition: getKey(data, 'soccerCompetitionSeason.soccerCompetition.id'),
          lazyLoadClient: true,
          match: data.matchId,
          teamCompare: `${data.homeTeamId},${data.awayTeamId}`,
          type: 'compareHeatmap',
        },
      },
    };
  }
  return null;
}

/**
 * Get soccer match content widgets
 * @param {Object} data page data from API
 * @returns {Object} content widgets
 */
export function getContentWidgets(data = {}) {
  let contentWidgets = [];
  if (isValidArray(data.widgets)) {
    contentWidgets = data.widgets;
  }
  const carouselWidgetIndex = getWidgetIndexByType(data, widgetTypes.CAROUSEL_WIDGET);
  const listWidgetIndex = getWidgetIndexByType(data, widgetTypes.LIST_WIDGET);
  return {
    [widgetTypes.CAROUSEL_WIDGET]: contentWidgets[carouselWidgetIndex],
    [widgetTypes.LIST_WIDGET]: contentWidgets[listWidgetIndex],
  };
}

/**
 * Attach ad type/options to widget setting in order to delegate
 * the ad render responsibility to the widget and avoid duplicate
 * ads when the widgets not have data or is hidden
 * @param {Object} widgetDefinition - widget setting definition from {@link widgetDefinitions}
 * @param {string} adType - ad name/type from {@link adTypes}
 * @returns {Object} widget definition with attached `widgetAd` property
 * with ad options inside settings
 */
export function attachAdType(widgetDefinition, adType) {
  if (!isValidObject(widgetDefinition) || !adType) {
    return widgetDefinition;
  }
  const settings = { ...widgetDefinition.settings };
  settings.widgetAd = {
    type: adType,
    isLazyLoaded: true,
    hasBg: true,
    trackingValue: String(settings.uid),
  };

  return {
    ...widgetDefinition,
    settings,
  };
}
