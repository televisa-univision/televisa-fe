import loadAdsWizz from './vendors/adswizzLoader';
import { RADIO_PLAYER_ID } from '../../constants/radio';

/**
 * AdsWizz Manager
 */
const adswizzManager = {
  /**
   * Load adswizz script
   */
  load() {
    this.playerData = {};
    loadAdsWizz();
  },

  decorateAudioSource(streamUrl) {
    if (window.adswizzSDK === undefined || !streamUrl) return '';
    const contentPlayer = document.getElementById(RADIO_PLAYER_ID);
    const decoratedUrl = window.adswizzSDK.decorateURL(streamUrl);
    const { token } = this.getPlayerData();
    const stream = this.addTokenToStream(decoratedUrl, token);
    contentPlayer.src = stream;
    contentPlayer.useCredential = true;
    return stream;
  },

  addTokenToStream(streamUrl, token) {
    const prependString = streamUrl.includes('?') ? '&' : '?';
    return `${streamUrl}${prependString}key=${token}`;
  },

  setPlayerData(data) {
    this.playerData = { ...this.playerData, ...data };
  },

  modifyPlayerData() {
    if (window.adswizzSDK === undefined) return;
    const playerData = this.getPlayerData();
    const audioUrl = this.decorateAudioSource(playerData.stream);
    playerData.file = audioUrl;
    global.window.FMG.callFn('playRadio', { ...playerData, useCredential: true });
  },

  getPlayerData() {
    if (this.playerData) {
      return {
        ...this.playerData,
      };
    }
    return {};
  },

  changeMetadataFunction() {
  },

  adsWizzCompanionOutOfContextFunction() {
    document.getElementById('companionBanner').innerHTML = 'stopped';
  },

  adsWizzCompanionWillDisplayFunction() {
  },

  adsWizzCompanionWillDisplayFallbackFunction() {
  },

  initAdsWizz() {
    if (window.adswizzSDK !== undefined) {
      const { zoneId } = this.getPlayerData();
      const contentPlayer = document.getElementById(RADIO_PLAYER_ID);
      const companionBannerDiv = document.getElementById('companionBanner');
      window.adswizzSDK.init({
        listenerConsent: true,
        contentPlayer,
        playerId: 'tuvnuforia_web_player',
        metadata: {
          listeners: [this.changeMetadataFunction],
          pollingInterval: 2000,
          connectionType: window.adswizzSDK.MetadataConnection.LONG_POLLING,
        },
        companionBanner: {
          container: companionBannerDiv,
          size: [720, 80],
          baseURL: 'https://univision.deliveryengine.adswizz.com/',
          zoneId,
          alwaysDisplayAds: true,
          extraExposureTime: 5000,
          outOfContextListener: this.adsWizzCompanionOutOfContextFunction,
          willDisplayListener: this.adsWizzCompanionWillDisplayFunction,
          willDisplayFallbackListener: this.adsWizzCompanionWillDisplayFallbackFunction,
        },
      });
      window.adswizzSDK.addMetadataChangedListener(this.changeMetadataFunction);
      this.modifyPlayerData();
    }
  },
};

export default adswizzManager;
