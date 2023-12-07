import * as SdkHelpers from './SdkHelpers';

beforeEach(() => {
  jest.resetAllMocks();
  global.window.FMG = {
    trigger: jest.fn(),
    on: jest.fn((evt, fn) => fn(evt)),
    soccerPlaylist: jest.fn(),
    playlistLivestream: jest.fn(),
    playLivestream: jest.fn(),
    getInstance: jest.fn(() => ({})),
  };
});

describe('matchOver', () => {
  it('should trigger match over', () => {
    SdkHelpers.matchOver('pip-player');
    expect(global.window.FMG.trigger).toBeCalledWith(
      'matchOver',
      null,
      { matchOver: true },
      'pip-player'
    );
  });

  it('should trigger match over', () => {
    global.window.FMG.getInstance.mockReturnValueOnce(null);
    SdkHelpers.matchOver('pip-player');

    expect(global.window.FMG.trigger).toBeCalledWith(
      'matchOver',
      null,
      { matchOver: true },
      'pip-player'
    );
  });

  it('should not trigger matchOver', () => {
    global.window.FMG.trigger = null;
    SdkHelpers.matchOver('pip-player');
    expect(global.window.FMG.trigger).toBe(null);
  });
});

describe('initSoccerPlaylist', () => {
  it('should trigger match over', () => {
    SdkHelpers.initSoccerPlaylist();
    expect(global.window.FMG.soccerPlaylist).toBeCalled();
  });

  it('should not trigger matchOver', () => {
    global.window.FMG.soccerPlaylist = null;
    SdkHelpers.initSoccerPlaylist();
    expect(global.window.FMG.soccerPlaylist).toBe(null);
  });
});

describe('onPreauthorizedResources', () => {
  it('should trigger onPreauthorizedResources', () => {
    const cb = jest.fn();
    SdkHelpers.onPreauthorizedResources(cb, 'pip-player');
    expect(global.window.FMG.on).toBeCalledWith(
      'preauthorizedResources',
      cb,
      'pip-player'
    );
  });

  it('should not trigger onPreauthorizedResources', () => {
    const cb = jest.fn();
    global.window.FMG.on = null;
    SdkHelpers.onPreauthorizedResources(cb, 'pip-player');
    expect(global.window.FMG.on).toBe(null);
  });
});

describe('onVideoLanguageChanged', () => {
  it('should trigger onVideoLanguageChange', () => {
    const cb = jest.fn();
    SdkHelpers.onVideoLanguageChanged(cb, 'pip-player');
    expect(global.window.FMG.on).toBeCalledWith(
      'Video.LanguageChanged',
      cb,
      'pip-player'
    );
  });

  it('should not trigger onVideoLanguageChanged', () => {
    const cb = jest.fn();
    global.window.FMG.on = null;
    SdkHelpers.onVideoLanguageChanged(cb, 'pip-player');
    expect(global.window.FMG.on).toBe(null);
  });
});

describe('initPlaylistLivestream', () => {
  it('should init playlist livestream', () => {
    SdkHelpers.initPlaylistLivestream();
    expect(global.window.FMG.playlistLivestream).toBeCalled();
  });

  it('should not init playlist livestream', () => {
    global.window.FMG.playlistLivestream = null;
    SdkHelpers.initPlaylistLivestream();
    expect(global.window.FMG.playlistLivestream).toBe(null);
  });
});

describe('initPlayLivestream', () => {
  it('should init playlivestream', () => {
    SdkHelpers.initPlayLivestream();
    expect(global.window.FMG.playLivestream).toBeCalled();
  });

  it('should not init playlivestream', () => {
    global.window.FMG.playLivestream = null;
    SdkHelpers.initPlayLivestream();
    expect(global.window.FMG.playLivestream).toBe(null);
  });
});

describe('onCuePointsModuleReady', () => {
  it('should trigger onCuePointsModuleReady', () => {
    const cb = jest.fn();
    SdkHelpers.onCuePointsModuleReady(cb, 'pip-player');
    expect(global.window.FMG.on).toBeCalledWith(
      'cuepointsModuleReady',
      cb,
      'pip-player'
    );
  });

  it('should not trigger onCuePointsModuleReady', () => {
    const cb = jest.fn();
    global.window.FMG.on = null;
    SdkHelpers.onCuePointsModuleReady(cb, 'pip-player');
    expect(global.window.FMG.on).toBe(null);
  });
});

describe('updateBroadcastState', () => {
  it('should triggerupdateBroadcastState', () => {
    SdkHelpers.updateBroadcastState('player', { broadcastState: true });
    expect(global.window.FMG.trigger).toBeCalledWith(
      'updateBroadcastState',
      null,
      { broadcastState: true },
      'player'
    );
  });

  it('should not trigger matchOver', () => {
    global.window.FMG.trigger = null;
    SdkHelpers.updateBroadcastState('player', { broadcastState: true });
    expect(global.window.FMG.trigger).toBe(null);
  });
});
