import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import formatVideoData from './castHelpers';
import Analytics from './analytics';

const tracker = new Analytics();
let pendingLivestream = null;

const receiver = {
  get instance() {
    return window.cast.framework.CastReceiverContext.getInstance();
  },
  get playerManager() {
    return receiver.instance.getPlayerManager();
  },
  init(configUrls, TagManager, streamManager, daiApi) {
    if (typeof window.cast === 'undefined') {
      return;
    }
    receiver.setLoadInterceptor(configUrls, streamManager, daiApi);
    receiver.start();
    // analytics
    tracker.initAnalytics(TagManager);
    tracker.startTracking(receiver.playerManager);
    // resend live stream after ads finished (workaround to fix live pre rolls)
    receiver.playerManager.addEventListener('BREAK_ENDED', (breakInfo) => {
      if (pendingLivestream?.media && breakInfo?.total >= 1) {
        const media = { ...pendingLivestream.media };
        receiver.playerManager.load({
          media: {
            ...media,
            customData: {
              ...media.customData, skipAds: true,
            },
          },
        });
      }
    });
    receiver.playerManager.addEventListener('PLAYER_LOAD_COMPLETE', () => {
      // temporarly remove CC button until tracks are fixed
      receiver.playerManager.removeSupportedMediaCommands(
        window.cast.framework.messages.Command.EDIT_TRACKS
      );
    });
  },
  start() {
    return receiver.instance.start();
  },
  setLoadInterceptor(configUrls, streamManager, daiApi) {
    const { messages } = window.cast.framework;
    pendingLivestream = null;
    receiver.playerManager.setMessageInterceptor(
      messages.MessageType.LOAD,
      (loadRequestData) => {
        const mediaData = { ...loadRequestData };
        if (!mediaData?.media) {
          const error = new messages.ErrorData(messages.ErrorType.LOAD_FAILED);
          error.reason = messages.ErrorReason.INVALID_REQUEST;
          clientLogging(error);
          return error;
        }

        if (mediaData?.media?.customData?.playLiveAds && !mediaData?.media?.customData?.skipAds) {
          pendingLivestream = mediaData;
        } else {
          pendingLivestream = null;
        }

        return formatVideoData(mediaData, configUrls, streamManager, daiApi);
      }
    );
  },
  errorHandler() {
    const { events } = window.cast.framework;
    const { playerManager } = receiver;
    playerManager.addEventListener(events.EventType.ERROR, (error) => {
      const errorData = { ...error };
      errorData.errorType = `[Cast] ${errorData?.detailedErrorCode}`;
      clientLogging(errorData);
    });
  },
};

export default receiver;
