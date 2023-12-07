/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
import ReactDOM from 'react-dom';
import Store from '../../store/store';
import * as helpers from '.';
import { fetchSportApi } from '../api/fetchApi';
import { fetchAuthGraphQL } from '../api/graphql';
import * as matchers from '../helpers/taxonomy/matchers/custom/soccer';
import setPageData from '../../store/actions/page-actions';
import VideoTracker from '../tracking/tealium/video/VideoTracker';
import * as storeHelpers from '../../store/storeHelpers';
import { RADIO_PLAYER_ID } from '../../constants/radio';
import contentTypes from '../../constants/contentTypes.json';
import features from '../../config/features';
import thirdPartyFeatures from '../../config/features/thirdParties';
import { AIRPLAY, CHROMECAST } from '../../constants/video';

/**
 * Mock for return value ones
 * @param {*} data - the fetch response
 * @param {Error} error - the error for fetch reject
 * @returns {Function}
 */
function mockReturnValue(data, error) {
  return jest.fn(() => new Promise((resolve, reject) => {
    resolve(data || {});
    reject(error || new Error('something bad happened'));
  }));
}

jest.mock(
  '../api/fetchApi',
  () => ({ fetchSportApi: mockReturnValue({ 'sports-content': 'abc' }) })
);

jest.mock(
  '../api/graphql',
  () => ({ fetchAuthGraphQL: mockReturnValue({ getVideoUserGroup: [{ position: 50 }] }) })
);
thirdPartyFeatures.isPermutiveEnabled = jest.fn(() => false);

const originalDate = global.Date;

describe('playerInstance', () => {
  beforeEach(() => {
    // create a mock window
    const mockWindow = {
      FMG: {
        getJWPlayerInstance: jest.fn(),
        removeInstance: jest.fn(),
        preloadLibraries: jest.fn(),
      },
    };

    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);

    const pageData = {
      config: {
        videoHub: {
          env: 'prod',
        },
      },
    };

    Store.dispatch(setPageData(pageData));
  });

  it('should return the player instance', () => {
    global.window.FMG.getJWPlayerInstance = () => ({ test: 'hello' });
    expect(helpers.getPlayerInstance('123')).toEqual({ test: 'hello' });
  });

  it('should return the video instance', () => {
    global.window.FMG.getInstance = () => ({ test: 'hello' });
    expect(helpers.getVideoInstance('123')).toEqual({ test: 'hello' });
  });

  it('should return the video instance', () => {
    global.window.FMG.getAllInstances = () => ({ test: 'hello' });
    expect(helpers.getAllPlayerInstances('123')).toEqual({ test: 'hello' });
  });

  it('should return false if there are not video instances', () => {
    global.window.FMG.getAllInstances = () => { throw new Error('abc'); };
    expect(helpers.getAllPlayerInstances('123')).toEqual(false);
  });

  it('should return false if there is an error', () => {
    global.window.FMG.getJWPlayerInstance = () => { throw new Error('abc'); };
    expect(helpers.getPlayerInstance('123')).toEqual(false);
  });

  it('should remove the player instance', () => {
    const playerRemove = jest.fn();
    global.window.FMG.getJWPlayerInstance = () => ({ remove: playerRemove });
    helpers.removePlayerInstance('123');
    expect(global.window.FMG.removeInstance).toHaveBeenCalled();
  });

  it('should not remove the player instance if SDK is not loaded', () => {
    global.window.FMG = undefined;
    helpers.removePlayerInstance('123');
    expect(global.window.FMG).toBeUndefined();
  });

  it('should not remove the player instance if no player instance found', () => {
    const playerRemove = jest.fn();
    global.window.FMG.getJWPlayerInstance = () => { throw new Error('abc'); };
    helpers.removePlayerInstance('123');
    expect(playerRemove).not.toHaveBeenCalled();
  });
});

describe('getPlayerCurrentState', () => {
  it('should return the state if player exists', () => {
    global.window.FMG = {
      getJWPlayerInstance: () => ({ getState: () => 'playing' }),
    };
    const state = helpers.getPlayerCurrentState();
    expect(state).toBe('playing');
  });

  it('should return empty string if player doesn`t exists', () => {
    delete global.window.FMG;
    const state = helpers.getPlayerCurrentState();
    expect(state).toBe('');
  });
});

describe('getCurrentIndex', () => {
  it('should return video index if available', () => {
    global.window.FMG = {
      getJWPlayerInstance: () => ({ getPlaylistIndex: () => 1 }),
    };
    expect(helpers.getCurrentIndex('player')).toBe(1);
  });

  it('should return 0 as default index if not available', () => {
    global.window.FMG = {
      getJWPlayerInstance: () => (null),
    };
    expect(helpers.getCurrentIndex('player')).toBe(0);
  });
});

describe('isPlayerBufferingOrPlaying', () => {
  it('should return true if video is playing', () => {
    global.window.FMG = {
      getJWPlayerInstance: () => ({ getState: () => 'playing' }),
    };
    expect(helpers.isPlayerBufferingOrPlaying('player')).toBe(true);
  });

  it('should return false if video is not playing', () => {
    global.window.FMG = {
      getJWPlayerInstance: () => ({ getState: () => 'paused' }),
    };
    expect(helpers.isPlayerBufferingOrPlaying('player')).toBe(false);
  });

  it('should return true if video is buffering', () => {
    global.window.FMG = {
      getJWPlayerInstance: () => ({ getState: () => 'buffering' }),
    };
    expect(helpers.isPlayerBufferingOrPlaying('player')).toBe(true);
  });
});

describe('getPlayerAutoplayValue', () => {
  it('should return the autoplay value if player exists', () => {
    global.window.FMG = {
      getInstance: () => ({
        pageLevelParams: {
          autoplay: 'viewable',
        },
      }),
    };
    const autoplay = helpers.getPlayerAutoplayValue();
    expect(autoplay).toBe('viewable');
  });

  it('should return false if player doesn`t exists or there is not a value', () => {
    delete global.window.FMG;
    const autoplay = helpers.getPlayerAutoplayValue();
    expect(autoplay).toBe(false);
  });
});

describe('getPlayerAnchorState', () => {
  it('should return the state if player exists', () => {
    global.window.FMG = {
      getInstance: () => ({
        modules: {
          anchorVideo: {
            getState: () => true,
          },
        },
      }),
    };
    const state = helpers.getPlayerAnchorState();
    expect(state).toBe(true);
  });

  it('should return false if player doesn`t exists', () => {
    delete global.window.FMG;
    const state = helpers.getPlayerAnchorState();
    expect(state).toBe(false);
  });
});

describe('setPlayerAnchorState', () => {
  it('should call function if player exists', () => {
    const setState = jest.fn();
    global.window.FMG = {
      getInstance: () => ({
        modules: {
          anchorVideo: {
            setState,
          },
        },
      }),
    };
    helpers.setPlayerAnchorState(1, true);
    expect(setState).toHaveBeenCalledWith(true);
  });

  it('should not call function if does not exist', () => {
    const setState = jest.fn();
    global.window.FMG = {
      getInstance: () => ({
        test: {
          setState,
        },
      }),
    };
    helpers.setPlayerAnchorState(1, true);
    expect(setState).not.toHaveBeenCalledWith(true);
  });
});

describe('closeAnchor', () => {
  it('should call function if player exists', () => {
    const closeAnchor = jest.fn();
    global.window.FMG = {
      getInstance: () => ({
        modules: {
          anchorVideo: {
            closeAnchor,
          },
        },
      }),
    };
    helpers.closeAnchor(1, true);
    expect(closeAnchor).toHaveBeenCalledWith(1);
  });

  it('should not call function if does not exists', () => {
    const closeAnchor = jest.fn();
    global.window.FMG = {
      getInstance: () => ({
        test: {
          closeAnchor,
        },
      }),
    };
    helpers.closeAnchor(1, true);
    expect(closeAnchor).not.toHaveBeenCalledWith(1);
  });
});

describe('showMVPDModal', () => {
  it('should show MVPD modal if player exists', () => {
    const renderProviders = jest.fn();
    global.window.FMG = {
      getAllInstances: () => ({ test: 'hello' }),
      getInstance: () => ({
        adobePass: {
          mvpdModal: {
            renderProviders,
          },
        },
      }),
    };
    helpers.showMVPDModal('test');
    expect(renderProviders).toHaveBeenCalled();
  });

  it('should return false if player doesn`t exists', () => {
    const renderProviders = jest.fn();
    delete global.window.FMG;
    helpers.showMVPDModal(null);
    expect(renderProviders).not.toHaveBeenCalled();
  });
});

describe('isRadioOnVideoPage', () => {
  it('should return false is not is a radio id and is not a video page', () => {
    jest.spyOn(storeHelpers, 'getContentType').mockReturnValue(contentTypes.SECTION);
    expect(helpers.isRadioOnVideoPage('')).toBe(false);
  });

  it('should return true if is a radio id and is a video page', () => {
    jest.spyOn(storeHelpers, 'getContentType').mockReturnValue(contentTypes.VIDEO);
    expect(helpers.isRadioOnVideoPage(RADIO_PLAYER_ID)).toBe(true);
  });
});

describe('isAnyPlayerAnchored', () => {
  it('should return playerId if there is a player on anchor state', () => {
    const player = {
      modules: {
        anchorVideo: {
          getState: () => true,
        },
      },
    };
    global.window.FMG = {
      getAllInstances: () => ({ test: player }),
      getInstance: () => player,
    };
    expect(helpers.isAnyPlayerAnchored()).toBe('test');
  });

  it('should return false if there isn´t a player on anchor state', () => {
    const player = {};
    global.window.FMG = {
      getAllInstances: () => ({ test: player }),
      getInstance: () => player,
    };
    expect(helpers.isAnyPlayerAnchored()).toBe(false);
  });

  it('should return false if there isn´t a player', () => {
    global.window.FMG = {
      getAllInstances: () => ({}),
    };
    expect(helpers.isAnyPlayerAnchored()).toBe(false);
  });
});

describe('isAnyPlayerPlaying', () => {
  it('should return playerId if there is a player playing', () => {
    jest.spyOn(storeHelpers, 'getContentType').mockReturnValue(contentTypes.SECTION);
    global.window.FMG = {
      getAllInstances: () => ({ test: 'hello' }),
      getJWPlayerInstance: () => ({ getState: () => 'playing' }),
    };
    expect(helpers.isAnyPlayerPlaying('123')).toBe('test');
  });

  it('should return playerId if there is a player buffering', () => {
    global.window.FMG = {
      getAllInstances: () => ({ test: 'hello' }),
      getJWPlayerInstance: () => ({ getState: () => 'buffering' }),
    };
    expect(helpers.isAnyPlayerPlaying('123')).toBe('test');
  });

  it('should return false if there are not valid players', () => {
    global.window.FMG = {
      getAllInstances: () => false,
      getJWPlayerInstance: () => ({ getState: () => 'playing' }),
    };
    expect(helpers.isAnyPlayerPlaying('123')).toBe(false);
  });

  it('should return false if there are not players playing', () => {
    global.window.FMG = {
      getAllInstances: () => ({ test: 'hello' }),
      getJWPlayerInstance: () => ({ getState: () => 'pause' }),
    };
    expect(helpers.isAnyPlayerPlaying('123')).toBe(false);
  });

  it('should return false if there is a player playing but is Radio Player', () => {
    jest.spyOn(storeHelpers, 'getContentType').mockReturnValue(contentTypes.VIDEO);
    global.window.FMG = {
      getAllInstances: () => ({ [RADIO_PLAYER_ID]: 'hello' }),
      getJWPlayerInstance: () => ({ getState: () => 'playing' }),
    };
    expect(helpers.isAnyPlayerPlaying('123')).toBe(false);
  });
});

describe('isAnyAutoplayPlayer', () => {
  it('should return playerId if there is a player with autoplay', () => {
    global.window.FMG = {
      getAllInstances: () => ({ test: 'hello' }),
      getInstance: () => ({
        pageLevelParams: {
          autoplay: 'viewable',
        },
      }),
    };
    expect(helpers.isAnyAutoplayPlayer('123')).toBe('test');
  });

  it('should return false if there are not valid players', () => {
    global.window.FMG = {
      getAllInstances: () => false,
    };
    expect(helpers.isAnyAutoplayPlayer('123')).toBe(false);
  });

  it('should return false if there are not players on autoplay', () => {
    global.window.FMG = {
      getAllInstances: () => ({ test: 'hello' }),
      getInstance: () => ({
        pageLevelParams: {
          autoplay: false,
        },
      }),
    };
    expect(helpers.isAnyAutoplayPlayer('123')).toBe(false);
  });
});

describe('getPlayerCurrentMcpid', () => {
  it('should get mcpid', () => {
    global.window.FMG = {
      getInstance: () => ({
        currentMcpid: 'test',
      }),
    };
    expect(helpers.getPlayerCurrentMcpid(1)).toEqual('test');
  });

  it('should return false if there is not mcpid ', () => {
    global.window.FMG = {
      getInstance: () => { throw new Error('abc'); },
    };
    expect(helpers.getPlayerCurrentMcpid(1)).toBe(false);
  });
});

describe('isVideoPlaying', () => {
  it('should return playerId if there is a player playing', () => {
    global.window.FMG = {
      getAllInstances: () => ({ test: 'hello' }),
      getJWPlayerInstance: () => ({ getState: () => 'playing' }),
      getInstance: () => ({ currentMcpid: 'mcpId' }),
    };
    expect(helpers.isVideoPlaying('mcpId')).toBe('test');
  });

  it('should return false if there is a player playing but the mcpid is different', () => {
    global.window.FMG = {
      getAllInstances: () => ({ test: 'hello' }),
      getJWPlayerInstance: () => ({ getState: () => 'playing' }),
      getInstance: () => ({ currentMcpid: 'mcpId-different' }),
    };
    expect(helpers.isVideoPlaying('mcpId')).toBe(false);
  });

  it('should return false if there are not players playing', () => {
    global.window.FMG = {
      getAllInstances: () => ({ test: 'hello' }),
      getJWPlayerInstance: () => ({ getState: () => 'pause' }),
      getInstance: () => ({ currentMcpid: 'mcpId' }),
    };
    expect(helpers.isVideoPlaying('mcpId')).toBe(false);
  });
});

describe('getWrapperElement', () => {
  it('should return dom element', () => {
    const div = document.createElement('div');
    div.setAttribute('id', '1-wrapper');
    document.getElementById = jest.fn();
    document.getElementById.mockReturnValue(div);

    expect(!!helpers.getWrapperElement(1)).toBe(true);
  });
});

describe('removeWrapperElement', () => {
  it('should return dom element', () => {
    // create a mock window
    const mockGlobal = {
      document: '<div id="1-wrapper"></div>',
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockGlobal);
    const remove = jest.fn();
    document.getElementById = jest.fn(() => ({
      remove,
    }));
    helpers.removeWrapperElement(1);
    expect(remove).toHaveBeenCalled();
  });
});

describe('isWrapperAvailable', () => {
  it('should return true if dom element exists', () => {
    // create a mock window
    const mockGlobal = {
      document: '<div id="1-wrapper"></div>',
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockGlobal);
    expect(helpers.isWrapperAvailable(1)).toBe(true);
  });
});

describe('clearInstanceEvents', () => {
  it('should call function if player exists', () => {
    const clearInstanceEvents = jest.fn();
    global.window.FMG = {
      clearInstanceEvents,
    };
    helpers.clearInstanceEvents();
    expect(clearInstanceEvents).toHaveBeenCalled();
  });

  it('should not call function if does not exists', () => {
    const clearInstanceEvents = jest.fn();
    global.window.FMG = null;
    helpers.clearInstanceEvents();
    expect(clearInstanceEvents).not.toHaveBeenCalled();
  });
});

describe('removeVideoInstance', () => {
  it('should remove video instances', () => {
    const clearInstanceEvents = jest.fn();
    const removeInstance = jest.fn();
    const remove = jest.fn();
    document.getElementById = jest.fn(() => ({
      remove,
    }));
    ReactDOM.unmountComponentAtNode = jest.fn();
    global.window.FMG = {
      clearInstanceEvents,
      removeInstance,
    };
    helpers.removeVideoInstance(1);
    expect(clearInstanceEvents).toHaveBeenCalled();
    expect(removeInstance).toHaveBeenCalled();
    expect(remove).toHaveBeenCalled();
    expect(ReactDOM.unmountComponentAtNode).toHaveBeenCalled();
  });
});

describe('getPlaceholderElement', () => {
  it('should return dom element', () => {
    // create a mock window
    const mockGlobal = {
      document: '<div id="1-placeholder"></div>',
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockGlobal);
    expect(!!helpers.getPlaceholderElement(1)).toBe(true);
  });
});

describe('isPlaceholderAvailable', () => {
  it('should return true if dom element exists', () => {
    // create a mock window
    const mockGlobal = {
      document: '<div id="1-placeholder"></div>',
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockGlobal);
    expect(helpers.isPlaceholderAvailable(1)).toBe(true);
  });
});

describe('removeAnyPlayerAnchored', () => {
  it('should set anchor state to false if wrapper exists', () => {
    // create a mock window
    const mockGlobal = {
      document: '<div id="1-placeholder"></div>',
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockGlobal);
    const closeAnchor = jest.fn();
    global.window.FMG = {
      getAllInstances: () => ({ test: 'hello' }),
      getInstance: () => ({
        modules: {
          anchorVideo: {
            getState: () => true,
            closeAnchor,
          },
        },
      }),
    };
    helpers.removeAnyPlayerAnchored();
    expect(closeAnchor).toHaveBeenCalledWith('test');
  });

  it('should remove video instance if wrapper does not exists', () => {
    // create a mock window
    const mockGlobal = {
      document: null,
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockGlobal);
    const closeAnchor = jest.fn();
    const removeInstance = jest.fn();
    const clearInstanceEvents = jest.fn();
    global.window.FMG = {
      clearInstanceEvents,
      getAllInstances: () => ({ test: 'hello' }),
      getInstance: () => ({
        modules: {
          anchorVideo: {
            getState: () => true,
            closeAnchor,
          },
        },
      }),
      removeInstance,
    };
    document.getElementById = jest.fn(() => false);
    helpers.removeAnyPlayerAnchored(1);
    expect(removeInstance).toHaveBeenCalled();
  });

  it('should not call any function if nodeId is equal to player Id', () => {
    // create a mock window
    const mockGlobal = {
      document: null,
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockGlobal);
    const closeAnchor = jest.fn();
    const removeInstance = jest.fn();
    const clearInstanceEvents = jest.fn();
    global.window.FMG = {
      clearInstanceEvents,
      getAllInstances: () => ({ test: 'hello' }),
      getInstance: () => ({
        modules: {
          anchorVideo: {
            getState: () => true,
            closeAnchor,
          },
        },
      }),
      removeInstance,
    };
    document.getElementById = jest.fn(() => false);
    helpers.removeAnyPlayerAnchored('test');
    expect(removeInstance).not.toHaveBeenCalled();
  });

  it('should not call any function if there is not a player on anchor mode', () => {
    // create a mock window
    const mockGlobal = {
      document: null,
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockGlobal);
    const closeAnchor = jest.fn();
    const removeInstance = jest.fn();
    const clearInstanceEvents = jest.fn();
    global.window.FMG = {
      clearInstanceEvents,
      getAllInstances: () => ({ test: 'hello' }),
      getInstance: () => ({
        modules: {
          anchorVideo: {
            getState: () => true,
            closeAnchor,
          },
        },
      }),
      removeInstance,
    };
    document.getElementById = jest.fn(() => false);
    helpers.removeAnyPlayerAnchored('test');
    expect(removeInstance).not.toHaveBeenCalled();
  });

  it('should not call any function if there are not players', () => {
    // create a mock window
    const mockGlobal = {
      document: null,
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockGlobal);
    const closeAnchor = jest.fn();
    const removeInstance = jest.fn();
    const clearInstanceEvents = jest.fn();
    global.window.FMG = {
      clearInstanceEvents,
      getAllInstances: () => false,
      getInstance: () => ({
        modules: {
          anchorVideo: {
            getState: () => true,
            closeAnchor,
          },
        },
      }),
      removeInstance,
    };
    document.getElementById = jest.fn(() => false);
    helpers.removeAnyPlayerAnchored('test2');
    expect(removeInstance).not.toHaveBeenCalled();
  });
});

describe('isRadioPlayerEnabled', () => {
  it('should return true if second player instance is muted', () => {
    const getMute = jest.fn(() => true);
    jest.spyOn(storeHelpers, 'getContentType').mockReturnValue(contentTypes.SECTION);
    global.window.FMG = {
      getJWPlayerInstance: () => ({
        getMute,
      }),
    };
    const isRadio = helpers.isRadioPlayerEnabled(RADIO_PLAYER_ID, 'test');
    expect(isRadio).toBe(true);
    expect(getMute).toBeCalled();
  });

  it('should return false if not a radio id in video page', () => {
    const getMute = jest.fn(() => true);
    jest.spyOn(storeHelpers, 'getContentType').mockReturnValue(contentTypes.VIDEO);
    global.window.FMG = {
      getJWPlayerInstance: () => ({
        getMute,
      }),
    };
    const isRadio = helpers.isRadioPlayerEnabled('test', 'test');
    expect(isRadio).toBe(false);
  });

  it('should return true if has radio id and not is a video page', () => {
    jest.spyOn(storeHelpers, 'getContentType').mockReturnValue(contentTypes.SECTION);
    const isRadio = helpers.isRadioPlayerEnabled(RADIO_PLAYER_ID);
    expect(isRadio).toBe(true);
  });
});

describe('pauseAnyPlayerPlaying', () => {
  it('should set all players playing on pause', () => {
    jest.spyOn(storeHelpers, 'getContentType').mockReturnValue(contentTypes.SECTION);
    const pause = jest.fn();
    global.window.FMG = {
      getAllInstances: () => ({ test: 'hello' }),
      getInstance: () => ({
        modules: {
          anchorVideo: {
            getState: () => true,
          },
        },
      }),
      getJWPlayerInstance: () => ({
        getState: () => 'playing',
        getPlaylistItem: () => ({ isLivestream: false }),
        pause,
      }),
    };
    helpers.pauseAnyPlayerPlaying(null, false);
    expect(pause).toHaveBeenCalled();
  });

  it('should set all players playing on pause except livestream', () => {
    const pause = jest.fn();
    global.window.FMG = {
      getAllInstances: () => ({ test: 'hello' }),
      getInstance: () => ({
        modules: {
          anchorVideo: {
            getState: () => true,
          },
        },
      }),
      getJWPlayerInstance: () => ({
        getState: () => 'playing',
        getPlaylistItem: () => ({ isLivestream: true }),
        pause,
      }),
    };
    helpers.pauseAnyPlayerPlaying(null, true);
    expect(pause).not.toHaveBeenCalled();
  });

  it('should not pause if players is not a object valid', () => {
    const pause = jest.fn();
    global.window.FMG = {
      getInstance: () => ({
        modules: {
          anchorVideo: {
            getState: () => true,
          },
        },
      }),
      getJWPlayerInstance: () => ({
        getState: () => 'playing',
        pause,
      }),
    };
    helpers.pauseAnyPlayerPlaying();
    expect(pause).not.toHaveBeenCalled();
  });

  it('should not pause if nodeId is equal to player Id', () => {
    const pause = jest.fn();
    global.window.FMG = {
      getAllInstances: () => ({ test: 'hello' }),
      getInstance: () => ({
        modules: {
          anchorVideo: {
            getState: () => true,
          },
        },
      }),
      getJWPlayerInstance: () => ({
        getState: () => 'playing',
        getPlaylistItem: () => ({ isLivestream: false }),
        pause,
      }),
    };
    helpers.pauseAnyPlayerPlaying('test');
    expect(pause).not.toHaveBeenCalled();
  });

  it('should not pause if there is not a video playing', () => {
    const pause = jest.fn();
    global.window.FMG = {
      getAllInstances: () => ({ test: 'hello' }),
      getInstance: () => ({
        modules: {
          anchorVideo: {
            getState: () => true,
          },
        },
      }),
      getJWPlayerInstance: () => ({
        getState: () => 'pause',
        getPlaylistItem: () => ({ isLivestream: true }),
        pause,
      }),
    };
    helpers.pauseAnyPlayerPlaying(1);
    expect(pause).not.toHaveBeenCalled();
  });

  it('should not pause if radio pplayer is enabled', () => {
    jest.spyOn(storeHelpers, 'getContentType').mockReturnValue(contentTypes.SECTION);
    const pause = jest.fn();
    global.window.FMG = {
      getAllInstances: () => ({ [RADIO_PLAYER_ID]: 'hello' }),
      getInstance: () => ({
        modules: {
          anchorVideo: {
            getState: () => true,
          },
        },
      }),
      getJWPlayerInstance: () => ({
        getState: () => 'playing',
        getPlaylistItem: () => ({ isLivestream: false }),
        pause,
      }),
    };
    helpers.pauseAnyPlayerPlaying(null, false);
    expect(pause).not.toHaveBeenCalled();
  });
});

describe('changeAutoplayPlayer', () => {
  it('should set autostart to `false` if there are any player instance', () => {
    const setConfig = jest.fn();
    global.window.FMG = {
      getAllInstances: () => ({ test: 'test' }),
      getJWPlayerInstance: () => ({
        setConfig,
      }),
    };

    helpers.changeAutoplayPlayer('');
    expect(setConfig).toBeCalledWith(expect.objectContaining({ autostart: false }));
  });

  it('should not set autostart if there aren´t any player instance', () => {
    const setConfig = jest.fn();
    global.window.FMG = {
      getAllInstances: () => ({}),
      getJWPlayerInstance: () => ({
        setConfig,
      }),
    };

    helpers.changeAutoplayPlayer('');
    expect(setConfig).not.toBeCalled();
  });

  it('should not set autostart if have the same player instance', () => {
    const setConfig = jest.fn();
    global.window.FMG = {
      getAllInstances: () => ({ test: 'test' }),
      getJWPlayerInstance: () => ({
        setConfig,
      }),
    };

    helpers.changeAutoplayPlayer('test');
    expect(setConfig).not.toBeCalled();
  });
});

describe('closeRadioIfPlayerIsEnabled', () => {
  const state = {
    player: {
      anchorPlayer: {
        stationTitle: 'test',
      },
    },
  };
  const players = {
    [RADIO_PLAYER_ID]: {
      getState: jest.fn(),
      trigger: jest.fn(),
    },
    test: { getState: jest.fn() },
  };

  beforeAll(() => {
    global.window.FMG = {
      getJWPlayerInstance: (id) => {
        return players[id];
      },
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should close radio player if videoo is unmuted', () => {
    players.test.getState.mockImplementation(() => 'playing');
    players[RADIO_PLAYER_ID].getState.mockImplementation(() => 'paused');

    const result = helpers.closeRadioIfPlayerIsEnabled(state, 'test');
    expect(result).toBe(true);
    expect(players[RADIO_PLAYER_ID].trigger).toBeCalledTimes(1);
  });

  it('should not close the radio and video are paused', () => {
    players.test.getState.mockImplementation(() => 'paused');
    players[RADIO_PLAYER_ID].getState.mockImplementation(() => 'paused');

    const result = helpers.closeRadioIfPlayerIsEnabled(state, 'test');
    expect(result).toBe(false);
    expect(players[RADIO_PLAYER_ID].trigger).not.toBeCalled();
  });

  it('should return false if radio is close', () => {
    const result = helpers.closeRadioIfPlayerIsEnabled({}, 'test');
    expect(result).toBe(false);
  });
});

describe('getPlayerPlaylist', () => {
  it('should get playlist object', () => {
    // create a mock window
    const mockWindow = {
      FMG: {
        getJWPlayerInstance: jest.fn(),
        preloadLibraries: jest.fn(),
        getInstance: () => ({
          videos: { something: 'test' },
        }),
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getPlayerPlaylist(1)).toEqual({ something: 'test' });
  });

  it('should return false if there is not playlist ', () => {
    // create a mock window
    const mockWindow = {
      FMG: {
        getJWPlayerInstance: jest.fn(),
        preloadLibraries: jest.fn(),
        getInstance: () => { throw new Error('abc'); },
      },
    };
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getPlayerPlaylist(1)).toBe(false);
  });
});

describe('doIfPlayerExists', () => {
  beforeEach(() => {
    const mockWindow = {
      FMG: {
        getJWPlayerInstance: jest.fn(),
        preloadLibraries: jest.fn(),
        getInstance: () => { throw new Error('abc'); },
      },
    };
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
  });

  it('should execute the function if the player instance exists', () => {
    const fn = jest.fn();
    const player = { test: 'hello' };
    global.window.FMG.getJWPlayerInstance = () => player;
    helpers.doIfPlayerExists('123', fn);
    expect(fn).toHaveBeenCalledWith(player);
  });

  it('should not execute the function if the player instance exists', () => {
    const fn = jest.fn();
    global.window.FMG.getJWPlayerInstance = () => null;
    helpers.doIfPlayerExists('123', fn);
    expect(fn).not.toHaveBeenCalled();
  });
});

describe('closeAnchoredPlayer', () => {
  it('should call updateAnchoredState if defined', () => {
    const updateAnchoredState = jest.fn();
    spyOn(VideoTracker, 'track');
    Store.getState = () => ({
      video: {
        nodeId: 'test',
        updateAnchoredState,
      },
    });
    global.window.FMG = {
      getAnalyticsData: jest.fn(),
      getJWPlayerInstance: jest.fn(),
      trigger: jest.fn(),
    };
    const player = { pause: jest.fn(), resize: jest.fn() };
    global.window.FMG.getJWPlayerInstance = () => player;
    helpers.closeAnchoredPlayer();
    expect(updateAnchoredState).toHaveBeenCalledTimes(1);
    expect(VideoTracker.track).toBeCalled();

    Store.getState = () => ({
      video: {},
    });
    helpers.closeAnchoredPlayer();
    expect(updateAnchoredState).toHaveBeenCalledTimes(1);
  });
});

describe('checkMatchStatus', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should not trigger callback if not valid one', async () => {
    matchers.getMatchData = jest.fn(() => ({ eventStatus: 'live' }));
    fetchSportApi.mockReturnValueOnce({});
    await helpers.checkMatchStatus('123');
    expect(matchers.getMatchData).not.toBeCalled();
    expect(fetchSportApi).not.toBeCalled();
  });

  it('should trigger callback if valid response', async () => {
    const fetchResponse = {
      statusText: 'status',
      ok: true,
      json: () => Promise.resolve({
        data: {
          match: {
            broadcastEvent: {
              playerState: 'ON',
            },
          },
        },
      }),
    };
    global.fetch = () => Promise.resolve(fetchResponse);
    const callback = jest.fn();
    matchers.getMatchData = jest.fn(() => ({ eventStatus: 'live' }));
    fetchSportApi.mockReturnValueOnce({});
    await helpers.checkMatchStatus('123', callback, 'uri', 123, true, false, false);
    expect(callback).toBeCalled();
  });

  it('should trigger callback if valid response when vixPlayerMx ', async () => {
    const fetchResponse = {
      statusText: 'status',
      ok: true,
      json: () => Promise.resolve({
        data: {
          match: {
            vixPlayerMx: {
              status: 'ON',
            },
          },
        },
      }),
    };
    global.fetch = () => Promise.resolve(fetchResponse);
    const callback = jest.fn();
    matchers.getMatchData = jest.fn(() => ({ eventStatus: 'live' }));
    fetchSportApi.mockReturnValueOnce({});
    await helpers.checkMatchStatus('123', callback, 'uri', 123, false, true, false);
    expect(callback).toBeCalled();
  });

  it('should trigger callback if valid response when vixPlayerUs ', async () => {
    const fetchResponse = {
      statusText: 'status',
      ok: true,
      json: () => Promise.resolve({
        data: {
          match: {
            vixPlayerUs: {
              status: 'ON',
            },
          },
        },
      }),
    };
    global.fetch = () => Promise.resolve(fetchResponse);
    const callback = jest.fn();
    matchers.getMatchData = jest.fn(() => ({ eventStatus: 'live' }));
    fetchSportApi.mockReturnValueOnce({});
    await helpers.checkMatchStatus('123', callback, 'uri', 123, false, false, true);
    expect(callback).toBeCalled();
  });

  it('should trigger callback if valid response with no opta id', async () => {
    const fetchResponse = {
      statusText: 'status',
      ok: true,
      json: () => Promise.resolve({
        data: {
          match: {
            broadcastEvent: {
              playerState: 'ON',
            },
          },
        },
      }),
    };
    global.fetch = () => Promise.resolve(fetchResponse);
    const callback = jest.fn();
    matchers.getMatchData = jest.fn(() => ({ eventStatus: 'live' }));
    fetchSportApi.mockReturnValueOnce({});
    await helpers.checkMatchStatus(null, callback, 'uri', 123, true);
    expect(callback).toBeCalled();
  });

  it('should trigger callback with post-event if invalid response', async () => {
    const callback = jest.fn();
    matchers.getMatchData = jest.fn(() => ({ eventStatus: 'live' }));
    const error = new Error('Not Found');
    fetchSportApi.mockReturnValueOnce(Promise.reject(error));
    await helpers.checkMatchStatus('123', callback);
    expect(callback).toBeCalledWith(expect.objectContaining({
      eventStatus: 'post-event',
      broadcastStatus: 'post-event',
    }));
  });

  it('should trigger callback with live if forceLive true', async () => {
    features.video.isEnableSoccerGame = jest.fn(() => true);
    const callback = jest.fn();
    matchers.getMatchData = jest.fn(() => ({ eventStatus: 'post-event', broadcastStatus: 'post-event' }));
    fetchSportApi.mockReturnValueOnce({});
    await helpers.checkMatchStatus('123', callback);
    expect(callback).toBeCalledWith(expect.objectContaining({
      eventStatus: 'live',
      broadcastStatus: 'ON',
    }));
  });
});

describe('parseVLLSchedule', () => {
  it('should return valid schedule', () => {
    const item = {
      endTime: '18:15',
      endTimeDisplay: '06:15 pm',
      startTime: '18:15',
      startTimeDisplay: '06:15 pm',
      timezoneDisplay: 'ET',
    };

    const schedule = {
      current_event: {
        ts_start: 1591235878501,
        ts_end: 1591235878501,
      },
      next_event: {
        ts_start: 1591235878501,
        ts_end: 1591235878501,
      },
      upcoming_events: [{
        ts_start: 1591235878501,
        ts_end: 1591235878501,
      }],
    };

    let list = helpers.parseVLLSchedule(schedule);
    expect(list[0]).toEqual(expect.objectContaining({ ...item }));
    expect(list[2]).toEqual(expect.objectContaining({ ...item }));

    delete schedule.upcoming_events;
    list = helpers.parseVLLSchedule(schedule);
    expect(list[2]).not.toBeDefined();
  });

  it('should return an empty array if schedule is empty', () => {
    const schedule = {};
    expect(helpers.parseVLLSchedule(schedule)).toHaveLength(0);
  });
});

describe('getEnv', () => {
  const oldWindow = global.window;

  beforeAll(() => {
    delete global.window;
    jest.restoreAllMocks();
  });

  afterAll(() => {
    global.window = oldWindow;
  });

  it('should get an environment value', () => {
    const mockWindow = {
      __INITIAL_STATE__: {
        env: 'test',
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getEnv()).toEqual('test');
  });

  it('should get an environment value on nextjs', () => {
    const mockWindow = {
      __NEXT_DATA__: {
        props: {
          pageProps: {
            initialState: {
              page: {
                env: 'test',
              },
            },
          },
        },
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getEnv()).toEqual('test');
  });

  it('should get a defult prod environment value', () => {
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => null);
    expect(helpers.getEnv()).toEqual('production');
  });
});

describe('getVideoEnv', () => {
  it('should get an environment value', () => {
    const mockWindow = {
      __INITIAL_STATE__: {
        config: {
          videoHub: {
            env: 'qa',
          },
        },
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getVideoEnv()).toEqual('qa');
  });

  it('should get an environment value on nextjs', () => {
    const mockWindow = {
      __NEXT_DATA__: {
        props: {
          pageProps: {
            initialState: {
              page: {
                config: {
                  videoHub: {
                    env: 'qa',
                  },
                },
              },
            },
          },
        },
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getVideoEnv()).toEqual('qa');
  });

  it('should get a defult prod environment value', () => {
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => null);
    expect(helpers.getVideoEnv()).toEqual('prod');
  });
});

describe('getVideoAds', () => {
  it('should return values if video layout', () => {
    const mockWindow = {
      __INITIAL_STATE__: {
        data: {
          adSettings: {
            adTagValue: 'video_noticias/shows/noticierounivision',
          },
        },
      },
      navigator: {},
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getVideoAds()).toEqual(expect.objectContaining({
      advalue: 'univision_video_noticias/shows/noticierounivision',
    }));
  });

  it('should return values if video layout', () => {
    const mockWindow = {
      __NEXT_DATA__: {
        props: {
          pageProps: {
            initialState: {
              page: {
                data: {
                  adSettings: {
                    adTagValue: 'video_noticias/shows/noticierounivision',
                  },
                },
              },
            },
          },
        },
      },
      navigator: {},
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getVideoAds()).toEqual(expect.objectContaining({
      advalue: 'univision_video_noticias/shows/noticierounivision',
    }));
  });

  it('should return null if there are not parameters', () => {
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => null);
    expect(helpers.getVideoAds()).toEqual(null);
  });

  it('should return undefined if disable ads is enable', () => {
    const mockWindow = {
      __NEXT_DATA__: {
        props: {
          pageProps: {
            initialState: {
              page: {
                data: {
                  adSettings: {
                    disableAds: true,
                  },
                },
              },
            },
          },
        },
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getVideoAds()).toEqual(undefined);
  });
});

describe('getNodeId', () => {
  it('should return player + uid', () => {
    const mockWindow = {
      __INITIAL_STATE__: {
        data: {
          type: 'video',
          uid: '1',
        },
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getNodeId()).toEqual('player-1');
  });

  it('should return player + uid', () => {
    const mockWindow = {
      __NEXT_DATA__: {
        props: {
          pageProps: {
            initialState: {
              page: {
                data: {
                  type: 'video',
                  uid: '1',
                },
              },
            },
          },
        },
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getNodeId()).toEqual('player-1');
  });

  it('should return player + uid on article with video lead', () => {
    const mockWindow = {
      __NEXT_DATA__: {
        props: {
          pageProps: {
            initialState: {
              page: {
                data: {
                  lead: {
                    type: 'video',
                    uid: '2',
                  },
                },
              },
            },
          },
        },
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getNodeId()).toEqual('player-2');
  });

  it('should not return values for article with video lead if uid is not available', () => {
    const mockWindow = {
      __NEXT_DATA__: {
        props: {
          pageProps: {
            initialState: {
              page: {
                data: {
                  lead: {
                    type: 'video',
                  },
                },
              },
            },
          },
        },
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getNodeId()).toEqual(null);
  });

  it('should return livestream + livelstreamid on article with video lead', () => {
    const mockWindow = {
      __NEXT_DATA__: {
        props: {
          pageProps: {
            initialState: {
              page: {
                data: {
                  type: 'livestream',
                  livestreamId: '3',
                },
              },
            },
          },
        },
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getNodeId()).toEqual('livestream-3');
  });

  it('should not return values for article with video lead if uid is not available', () => {
    const mockWindow = {
      __NEXT_DATA__: {
        props: {
          pageProps: {
            initialState: {
              page: {
                data: {
                  type: 'livestream',
                },
              },
            },
          },
        },
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getNodeId()).toEqual(null);
  });

  it('should return just player', () => {
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => null);

    expect(helpers.getNodeId()).toEqual(null);
  });

  it('should early return uid when settings is sent', () => {
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => null);

    expect(helpers.getNodeId({ uid: 2 })).toEqual('player-2');
  });

  it('should early return uid default value when uid is not set', () => {
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => null);

    expect(helpers.getNodeId({})).toEqual('player-1');
  });
});

describe('getVideoUserGroup', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return null if not valid duration', async () => {
    expect(await helpers.getVideoUserGroup()(null)).toBe(null);
  });

  it('should return null if no token', async () => {
    const state = {
      user: {
        accessToken: null,
      },
    };

    expect(await helpers.getVideoUserGroup(state)(123)).toBe(null);
  });

  it('should return correct value if token and duration', async () => {
    const state = {
      user: {
        accessToken: '12345',
      },
    };

    fetchAuthGraphQL.mockReturnValueOnce({ group: 'standard' });
    const response = await helpers.getVideoUserGroup(state)(123);
    expect(response).toEqual({ group: 'standard' });
  });

  it('should return correct value if request fails', async () => {
    const state = {
      user: {
        accessToken: '12345',
      },
    };
    const result = Promise.reject(new Error('request failed'));
    fetchAuthGraphQL.mockReturnValueOnce(result);
    const response = await helpers.getVideoUserGroup(state)(123);
    expect(response).toEqual({});
  });
});

describe('checkExpandOnPlaylistChange', () => {
  it('', () => {
    const toggle = jest.fn();
    const mockWindow = {
      FMG: {
        getAllInstances: () => ({ test: 'hello' }),
        getJWPlayerInstance: () => ({
          getContainer: () => ({
            parentNode: {
              querySelector: () => ({
                classList: { toggle },
              }),
            },
          }),
        }),
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    helpers.checkExpandOnPlaylistChange('test', true);
    expect(toggle).toBeCalledWith('is-expanded', true);
  });
});

describe('isPipSupported', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return false if pip not supported', () => {
    Object.defineProperty(document, 'pictureInPictureEnabled', { value: false, configurable: true });
    expect(helpers.isPipSupported()).toBe(false);
  });

  it('should return true if pip not supported', () => {
    Object.defineProperty(document, 'pictureInPictureEnabled', { value: true, configurable: true });
    expect(helpers.isPipSupported()).toBe(true);
  });
});

describe('isPipRunning', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return true if native PiP is running ', () => {
    Object.defineProperty(document, 'pictureInPictureElement', { value: true });
    expect(helpers.isPipRunning()).toBeTruthy();
  });
});

describe('getCastingReceiverId', () => {
  it('should return undefined by default', () => {
    expect(helpers.getCastingReceiverId()).toBe(undefined);
  });

  it('should return casting receiver id value', () => {
    const mockWindow = {
      __NEXT_DATA__: {
        props: {
          pageProps: {
            initialState: {
              page: {
                config: {
                  castingReceiverId: 'test',
                },
              },
            },
          },
        },
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getCastingReceiverId()).toBe('test');
  });
});

describe('getCastingPlatform', () => {
  beforeEach(() => {
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => { });
  });

  it('should return null by default', () => {
    expect(helpers.getCastingPlatform()).toBeNull();
  });

  it('should return chromecast value', () => {
    const mockWindow = {
      navigator: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getCastingPlatform()).toBe(CHROMECAST);
  });

  it('should return airplay value', () => {
    const mockWindow = {
      navigator: {
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_0_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15',
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getCastingPlatform()).toBe(AIRPLAY);
  });

  it('should return null for Edge', () => {
    const mockWindow = {
      navigator: {
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 Edg/98.0.1108.55',
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getCastingPlatform()).toBe(null);
  });

  it('should return null for Firefox', () => {
    const mockWindow = {
      navigator: {
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0',
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(helpers.getCastingPlatform()).toBe(null);
  });
});

describe('getEPGSchedule', () => {
  let epgData;

  beforeEach(() => {
    epgData = [
      {
        title: 'earlier show',
        description: 'it should not display',
        live: true,
        days: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'saturday',
          'Sunday',
        ],
        timeZone: 'US/Eastern',
        startTime: '13:00',
        endTime: '16:00',
      },
      {
        title: 'Noticiero Matutino Los Angeles',
        description: 'Noticiero Matutino Los Angeles',
        live: true,
        days: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'saturday',
          'Sunday',
        ],
        timeZone: 'US/Eastern',
        startTime: '17:00',
        endTime: '18:00',
      },
      {
        title: 'late show',
        description: 'it should display',
        live: true,
        days: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'saturday',
          'Sunday',
        ],
        timeZone: 'US/Eastern',
        startTime: '20:00',
        endTime: '21:00',
      },
      {
        title: 'Tuesday Show',
        description: 'Noticiero Matutino Los Angeles',
        live: true,
        days: [
          'Tuesday',
        ],
        timeZone: 'US/Eastern',
        startTime: '18:00',
        endTime: '19:00',
      },
      {
        title: 'Alto Impacto',
        description: 'Noticiero Matutino Los Angeles',
        live: true,
        days: [
          'Tuesday',
        ],
        timeZone: 'US/Eastern',
        startTime: '12:00',
        endTime: '12:00',
      },
    ];
  });

  afterEach(() => {
    global.Date = originalDate;
  });

  it('should return null if schecule is not a valid array', () => {
    expect(helpers.getEPGSchedule()).toBeNull();
  });

  it('should return valid show for currentShow for today(Monday)', () => {
    const currentDate = new Date('06 Dec 2021 17:00:00 EST');
    const result = helpers.daysOfWeek[currentDate.getDay()];
    const schedule = helpers.getEPGSchedule([...epgData], currentDate);
    expect(result)
      .toBe(schedule.nextShows[0].day);
  });

  it('should return null if the current show is not valid', () => {
    expect(helpers.getEPGSchedule([undefined])).toMatchObject({ currentShow: null });
  });

  it('should return null if the days are not set correctly', () => {
    expect(helpers.getEPGSchedule([{ day: 'test', timeZone: 'US/Eastern' }])).toMatchObject({ currentShow: null });
  });

  it('should add an extra zero if the date is a single digit', () => {
    const currentDate = new Date('2021-01-01T01:00:00.000Z');

    const schedule = helpers.getEPGSchedule([epgData[1]], currentDate);

    expect(schedule.nextShows[0].easternDateStart).toBe('01 Jan 2021 17:00:00');
  });

  it('should return null if the current show time is not set correctly', () => {
    epgData[1].startTime = null;

    const result = helpers.getEPGSchedule([epgData[1]]);

    expect(result.currentShow).toBeNull();
  });

  it('should return currentShow if today time is in between start and end times', () => {
    const todayDate = new Date('2023-04-04T19:20:00.000Z');
    const schedules = [
      {
        title: 'earlier show',
        description: 'it should not display',
        live: true,
        days: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'saturday',
          'Sunday',
        ],
        timeZone: 'US/Eastern',
        startTime: '13:00',
        endTime: '16:00',
      },
    ];
    const result = helpers.getEPGSchedule(schedules, todayDate);
    expect(result.currentShow.startTime).toBe(schedules[0].startTime);
    expect(result.currentShow.endTime).toBe(schedules[0].endTime);
  });

  it('test', () => {
    const todayDate = new Date('2021-10-18T14:00:00.000Z');
    const schedule = {
      ...epgData[0],
      startTime: null,
      endTime: null
    };
    const schedules = [schedule];
    const result = helpers.getEPGSchedule(schedules, todayDate);
    expect(result.nextShows[0].startTime).toBeNull();
    expect(result.nextShows[0].endTime).toBeNull();
  });
});

describe('getShowToLocalTime', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should return null if the date is not a valid string', () => {
    expect(helpers.getShowToLocalTime()).toBe(null);
  });
  it('should return null if invalid string was provided', () => {
    expect(helpers.getShowToLocalTime('invalid')).toBe(null);
  });
  it('should return the date correctly', () => {
    const currentDate = '06 Dec 2021 17:00:00 EST';

    expect(helpers.getShowToLocalTime(currentDate)).toHaveLength(3);
    expect(helpers.getShowToLocalTime(currentDate)).not.toContain(':');
  });
  it('should return the date correectly with minutes', () => {
    const currentDate = '06 Dec 2021 17:07:00 EST';

    expect(helpers.getShowToLocalTime(currentDate)).toContain(':');
  });
});

describe('isPlayerInstanceCasting', () => {
  it('should return false by default', () => {
    expect(helpers.isPlayerInstanceCasting()).toBe(false);
  });

  it('should return true when playerId is in store', () => {
    jest.spyOn(Store, 'getState').mockReturnValue({
      video: {
        castingNodeId: 'test',
        castingEnabled: true,
      },
    });
    expect(helpers.isPlayerInstanceCasting('test')).toBe(true);
  });
});
