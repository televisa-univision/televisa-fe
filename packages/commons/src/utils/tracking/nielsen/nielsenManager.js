import { getKey, exists, isValidFunction } from '../../helpers';
import loadNielsen from './nielsenLoader';

/**
 * Nielsen Manager
 */
const nielsenManager = {
  /**
   * Collect tracking data on client side
   * @param {Object} config Nielsen configuration
   */
  load(config) {
    if (exists(config)) {
      this.config = config;
      const env = this.config.environment;
      const scope = this;
      // load the Nielsen SDK
      this.initNielsen = this.initNielsen.bind(this);

      loadNielsen(env).then(scope.initNielsen);
    }
  },

  /**
   * Returns the tracking settings for Nielsen
   * @returns {Object}
   */
  getSettings() {
    if (exists(this.config)) {
      return {
        appID: this.config.appId,
        env: this.config.environment === 'prod' ? 'dcr' : 'dcr-cert',
        pTopic: getKey(this.config, 'common.section'),
        sVcid: getKey(this.config, 'common.vcid'),
        assetId: getKey(this.config, 'common.assetid'),
        segA: getKey(this.config, 'contentSpecific.segA'),
      };
    }
    return {};
  },

  /**
   * Initialize the Nielsen SDK
   * @param {Object} sdkConfig Nielsen SDK Object
   */
  initNielsen(sdkConfig) {
    const { sdk, reloaded } = sdkConfig;
    if (sdk && isValidFunction(sdk.getInstance)) {
      const sdkInstance = sdk.getInstance('staticInstance');
      const isProd = this.config.environment === 'prod';

      const nielsenSDKconfig = this.getSettings();

      if (!reloaded) {
        const nolggStaticParams = {
          sfcode: nielsenSDKconfig.env,
          apid: nielsenSDKconfig.appID,
          nsdkv: '511',
          apn: 'unvision',
        };

        if (!isProd) {
          // Enable SDK logs
          nolggStaticParams.nol_sdkDebug = 'DEBUG';
        }

        sdkInstance.ggInitialize(nolggStaticParams);
      }

      const staticMeta = {
        assetid: nielsenSDKconfig.assetId,
        type: 'static',
        section: nielsenSDKconfig.pTopic,
        vcid: nielsenSDKconfig.sVcid,
        segA: nielsenSDKconfig.segA,
        segC: nielsenSDKconfig.assetId,
      };

      sdkInstance.ggPM('staticstart', staticMeta);
    }
  },
};

export default nielsenManager;
