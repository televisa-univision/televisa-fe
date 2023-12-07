import * as types from '../actions/action-types';
import playerReducer, { initialState } from './player-reducer';

describe('PLAYER_PLAY_RADIO', () => {
  it('should return data', () => {
    expect(playerReducer({}, {
      type: types.PLAYER_PLAY_RADIO,
    })).toEqual({
      anchorPlayer: {
      },
      pause: false,
    });
  });
});

describe('PLAYER_PAUSE_RADIO', () => {
  it('should return pause flag', () => {
    expect(playerReducer({}, {
      type: types.PLAYER_PAUSE_RADIO,
      pause: true,
    })).toEqual({ pause: true });
  });
});

describe('PLAYER_CLOSE_NOW_PLAYING', () => {
  it('should reelease nowPlaying data and not clear store timer', () => {
    expect(playerReducer({
      anchorPlayer: { abacast: {} },
      timer: 1,
    }, {
      type: types.PLAYER_CLOSE_NOW_PLAYING,
    })).toEqual({
      anchorPlayer: { abacast: {} },
      timer: 1,
    });
  });
});

describe('PLAYER_CLOSE_RADIO', () => {
  it('should reelease anchorPlayer data and not clear store timer', () => {
    expect(playerReducer({
      nowPlaying: { abacastId: 1 },
      timer: 1,
    }, {
      type: types.PLAYER_CLOSE_RADIO,
    })).toEqual({
      nowPlaying: { abacastId: 1 },
      anchorPlayer: initialState.anchorPlayer,
      timer: 1,
    });
  });
});

describe('PLAYER_ERROR action', () => {
  const error = 'No streamID defined';
  it('should return data', () => {
    expect(playerReducer({}, {
      type: types.PLAYER_ERROR,
      error,
    })).toEqual({
      nowPlaying: {
        error: true,
      },
    });
  });
});

describe('PLAYER_STORE_TIMER action', () => {
  it('should return the right data', () => {
    expect(playerReducer({}, {
      type: types.PLAYER_STORE_TIMER,
      data: 1234,
    })).toEqual({
      timer: 1234,
    });
  });
});

describe('PLAYER_SET_RADIO_URL action', () => {
  it('should return the right data', () => {
    expect(playerReducer({}, {
      type: types.PLAYER_SET_RADIO_URL,
    })).toEqual({
    });
  });
});

describe('default state', () => {
  const state = { foo: true };
  it('should return current state if invalid cation passed', () => {
    expect(playerReducer(state, {
      type: 'badaction',
    })).toEqual(state);
  });

  it('should return initial state if none passed to reducer', () => {
    expect(playerReducer(undefined, {
      type: 'action',
    })).toEqual(initialState);
  });
});

describe('PLAYER_RADIO_SET_HEARTBEAT action', () => {
  it('should return the right state', () => {
    expect(playerReducer({}, {
      type: types.PLAYER_RADIO_SET_HEARTBEAT,
      heartbeat: {
        timeoutId: 1,
      },
    })).toEqual({
      heartbeat: {
        timeoutId: 1,
      },
    });
  });
});
