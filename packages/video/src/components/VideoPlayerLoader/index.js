import SDKWrapper from '@univision/fmg-video-sdk';
import {
  getEnv,
  getNodeId,
  getVideoAds,
  getVideoEnv,
  getSite,
} from '@univision/fe-commons/dist/utils/video';

/* istanbul ignore next */
if (global.window) {
  const adEnv = getEnv();
  const env = getVideoEnv();
  const nodeId = getNodeId();
  const videoAds = getVideoAds();
  const site = getSite();
  // Create instance and preload libraries
  new SDKWrapper({ // eslint-disable-line no-new
    adEnv,
    env,
    nodeId,
    videoAds,
    site,
  });
}
