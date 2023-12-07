import VideoTracker from '@univision/fe-commons/dist/utils/tracking/tealium/video/VideoTracker';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import { PRENDETV_PROMO } from '@univision/fe-commons/dist/constants/urls';
import * as utils from '@univision/fe-commons/dist/utils/video';
import * as events from './events';

describe('handleCloseAnchor', () => {
  it('should call pause video player when exec `handleCloseAnchor`', () => {
    const pause = jest.spyOn(utils, 'doIfPlayerExists').mockImplementation((nodeId, fn) => fn({
      pause: jest.fn(),
    }));
    events.handleCloseAnchor('JWplayer')(true);
    expect(pause).toBeCalled();
  });

  it('should call stop video player when exec `handleCloseAnchor`', () => {
    const pause = jest.spyOn(utils, 'doIfPlayerExists').mockImplementation((nodeId, fn) => fn({
      pause: jest.fn(),
    }));
    events.handleCloseAnchor('JWplayer')(false);
    expect(pause).toBeCalled();
  });
});

describe('handleExpandedClick', () => {
  it('should track the click depending on expanded state', () => {
    spyOn(VideoTracker, 'track');
    events.handleExpandedClick();
    expect(VideoTracker.track).toBeCalled();
  });
});

describe('appendVideos', () => {
  beforeAll(() => {
    window.FMG = {
      trigger: jest.fn(),
    };
  });

  it('should call append videos', () => {
    spyOn(window.FMG, 'trigger');
    const videos = [{ mcpid: 123 }];
    events.appendVideos(videos, {}, 'player');
    expect(window.FMG.trigger).toBeCalledWith('appendVideos', null, { videos }, 'player');
  });
});

describe('anchorTracking', () => {
  WidgetTracker.track = jest.fn();
  window.open = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call widget tracking', () => {
    spyOn(window.FMG, 'trigger');
    events.anchorTracking({ title: 'title', uid: 'uid' })();
    expect(WidgetTracker.track).toBeCalledWith(WidgetTracker.events.click, {
      contentTitle: 'title',
      contentUid: 'uid',
      target: 'prendetv_cta_external',
      eventLabel: 'Video_Playlist_Banner',
      extraData: {
        destination_url: PRENDETV_PROMO,
      },
      widgetContext: {
        title: 'anchor - title',
        type: 'anchor_expanded',
      },
    });
  });

  it('should not call open url if empty object', () => {
    spyOn(window.FMG, 'trigger');
    events.anchorTracking(null)();
    expect(window.open).not.toBeCalled();
  });

  it('should call widget tracking and open url if provided', () => {
    spyOn(window.FMG, 'trigger');
    events.anchorTracking({ title: 'title', uid: 'uid', url: 'www.prende.tv' })();
    expect(WidgetTracker.track).toBeCalledWith(WidgetTracker.events.click, {
      contentTitle: 'title',
      contentUid: 'uid',
      target: 'prendetv_cta_external',
      eventLabel: 'Video_Playlist_Banner',
      extraData: {
        destination_url: PRENDETV_PROMO,
      },
      widgetContext: {
        title: 'anchor - title',
        type: 'anchor_expanded',
      },
    });
    expect(window.open).toBeCalledWith('www.prende.tv');
  });
});
