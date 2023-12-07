// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';
// eslint-disable-next-line import/no-cycle
import {
  getPageCategory,
  getPageData,
  hasFeatureFlag,
  isContentTypeAllowed,
  isDeviceAllowed, isLiveTvPage,
  getRequestParams,
} from '../../store/storeHelpers';
import { globalComponents } from '..';

// eslint-disable-next-line import/no-cycle
import {
  exists,
  getKey,
  hasKey,
  toRelativeUrl,
} from '../../utils/helpers';
import livestreamRedesign from '../data/video/livestreamRedesign.json';
import * as contentTypes from '../../constants/contentTypes.json';
import {
  PER_USER_AD_PERSONALIZATION,
  ENABLE_SOCCER_GAME,
  PHASED_RELEASE,
  VIDEO_NATIVE_PIP,
  MVPD_IMPROV,
  CBP_ADS,
} from '../../constants/tracking';
import { JWP_VERSION } from '../../constants/video';
import { siteSelector } from '../../store/selectors/page-selectors';
import { TUDN_SITE } from '../../constants/sites';

const supportedLiveLabels = {
  breakingNews: 'breakingNews',
  liveblog: 'liveblog',
  livestream: 'livestream',
};

// TO-DO: Update helpers to use selectors instead of global store
const videoFeature = {
  asyncMeta: () => isContentTypeAllowed(Store, [contentTypes.VIDEO]),

  promoVideo: () => isContentTypeAllowed(Store, [contentTypes.VIDEO]),

  isLivestreamPage: () => isContentTypeAllowed(Store, [contentTypes.LIVE_STREAM]),

  isSection: () => isContentTypeAllowed(Store, [contentTypes.SECTION, contentTypes.SOCCER_TEAM]),

  isVideoLayout: () => videoFeature.promoVideo() || videoFeature.isLivestreamPage(),

  sticky: () => videoFeature.isVideoLayout() && isDeviceAllowed(Store, ['mobile']),

  disableAds: sensitiveVideo => (
    getKey(getPageData(Store), 'data.isSensitive', null)
    || getKey(getPageData(Store), 'data.adSettings.disableVideoAds', null)
    || sensitiveVideo
  ),

  useNeulionLivestream: () => isLiveTvPage(Store),

  // Enable SSR for SEO
  isSsrSeoEnabled: () => (getKey(getRequestParams(Store), 'videoSSRSEO', 'false') === 'true'),

  // Enable Five Minute Free (Free Video Preview)
  isFreeVideoPreview: () => true,

  // Enable Google DAI on VOD content
  JWPVersion: () => globalComponents.pageSettings[getPageCategory(Store)]?.jwpVersion || getKey(getRequestParams(Store), 'jwpversion', JWP_VERSION),

  // Enable Google DAI on VOD content
  isVodDAI: userLocation => userLocation !== 'MX' || hasFeatureFlag(Store, 'isVodDAI'),

  // Enable MVPD user journey improvement
  isMVPDImprov: () => hasFeatureFlag(Store, PHASED_RELEASE, MVPD_IMPROV),

  // Enable native video pip experience
  enableNativePip: () => hasFeatureFlag(Store, PHASED_RELEASE, VIDEO_NATIVE_PIP),

  enableResume: () => true,

  enableAdRules: () => hasFeatureFlag(Store, PHASED_RELEASE, PER_USER_AD_PERSONALIZATION)
    && !isContentTypeAllowed(Store, [contentTypes.LIVE_STREAM, contentTypes.SOCCER_MATCH]),

  hasLivestream: (leadType, type, videoType) => {
    const labelType = getKey(supportedLiveLabels, type, getKey(supportedLiveLabels, leadType));
    const hasVideoLabel = hasKey(supportedLiveLabels, videoType);
    const hasTypeLabel = exists(labelType);
    // Boolean to know whether to render the label or not
    return hasTypeLabel || hasVideoLabel;
  },

  enableLivestreamRedesign: data => livestreamRedesign.indexOf(toRelativeUrl(data?.uri)) !== -1,

  isDAI: () => hasKey(getPageData(Store), 'data.streamId'),

  // Marks a soccer match as live
  isEnableSoccerGame: () => hasFeatureFlag(Store, ENABLE_SOCCER_GAME, 'active'),

  // CBP Ads AB test feature flag
  enableCbpAds: () => hasFeatureFlag(Store, PHASED_RELEASE, CBP_ADS)
    && !isContentTypeAllowed(Store, [contentTypes.LIVE_STREAM, contentTypes.SOCCER_MATCH]),

  // Enable casting feature flag
  enableCasting: () => siteSelector(Store.getState()) === TUDN_SITE,
};

export default videoFeature;
