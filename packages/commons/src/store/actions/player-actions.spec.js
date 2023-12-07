import { batch } from 'react-redux';
import * as graphql from '../../utils/api/graphql';

import * as Actions from './player-actions';
import * as types from './action-types';
import {
  isAnchorRadio,
} from '../radioStoreHelper';
import { removePlayerInstance } from '../../utils/video';
import { RADIO_PLAYER_ID } from '../../constants/radio';

jest.useFakeTimers();
graphql.fetchGraphQL = jest.fn();
jest.mock('../radioStoreHelper', () => ({
  isAnchorRadio: jest.fn(() => true),
  getFetchInterval: jest.fn(),
}));
jest.mock('react-redux', () => ({
  batch: jest.fn(),
}));
jest.mock('../../utils/video', () => ({
  removePlayerInstance: jest.fn(),
}));
batch.mockImplementation(fn => fn());

const getStateMock = jest.fn();
const dispatchMock = jest.fn();
const actionMock = jest.fn();
const clearIntervalMock = jest.spyOn(window, 'clearInterval');

afterEach(() => {
  actionMock.mockClear();
  getStateMock.mockClear();
  dispatchMock.mockClear();
  clearIntervalMock.mockClear();
  graphql.fetchGraphQL.mockClear();
  graphql.fetchGraphQL.mockReset();
});

describe('Player Actions tests', () => {
  it('should return expected object', () => {
    expect(Actions.storeTimer('123'))
      .toEqual({
        type: types.PLAYER_STORE_TIMER,
        data: '123',
      });
    expect(Actions.playRadioAction())
      .toEqual({
        type: types.PLAYER_PLAY_RADIO,
      });
    expect(Actions.releaseNowPlayingAction())
      .toEqual({
        type: types.PLAYER_CLOSE_NOW_PLAYING,
      });
    expect(Actions.closeRadioAction())
      .toEqual({
        type: types.PLAYER_CLOSE_RADIO,
      });
    expect(Actions.playerError({ error: 'abc' }))
      .toEqual({
        type: types.PLAYER_ERROR,
        error: { error: 'abc' },
      });
    expect(Actions.initRadio())
      .toEqual({
        type: types.PLAYER_SET_RADIO_URL,
      });
  });

  it('should remove player instance on close', () => {
    Actions.closeRadio('123');
    expect(removePlayerInstance).toHaveBeenCalledWith(RADIO_PLAYER_ID);
  });
});

describe('resetAndDo', () => {
  it('should not call clearInterval if timer is defined', () => {
    const actionFn = Actions.resetAndDo(actionMock, 'hello');
    getStateMock.mockReturnValueOnce({});
    actionFn(dispatchMock, getStateMock);
    expect(clearIntervalMock.mock.calls.length).toBe(0);
  });
  it('should call clearInterval if timer is defined and call action if defined', () => {
    const actionFn = Actions.resetAndDo(actionMock, 'hello');
    getStateMock.mockReturnValueOnce({ player: { timer: 23 } });
    actionFn(dispatchMock, getStateMock);
    expect(clearIntervalMock.mock.calls.length).toBe(1);

    getStateMock.mockReturnValueOnce({ player: { timer: 23 } });
    actionFn(dispatchMock, getStateMock);
    expect(dispatchMock).toBeCalledWith({ data: null, type: types.PLAYER_STORE_TIMER });
  });
  it('should not call dispatch if action not defined', () => {
    const actionFn = Actions.resetAndDo(null, 'hello');
    actionFn(dispatchMock, getStateMock);
    expect(dispatchMock).not.toBeCalled();
  });
});

describe('timer reset on actions', () => {
  it('should call resetAndDo in some actions and return an arrow function', () => {
    expect(typeof Actions.playRadio()).toBe('function');
    expect(typeof Actions.closeRadio()).toBe('function');
  });
});

describe('releaseNowPlaying', () => {
  const actionFn = Actions.releaseNowPlaying();
  it('should call dispatch close action is anchor player', () => {
    actionFn(dispatchMock, getStateMock);
    expect(dispatchMock.mock.calls[0][0]).toEqual({
      type: types.PLAYER_CLOSE_NOW_PLAYING,
    });
    // console.log(dispatchMock.mock.calls[0][0]);
  });
  it('should call dispatch reset is no anchor player', () => {
    isAnchorRadio.mockReturnValueOnce(false);
    actionFn(dispatchMock, getStateMock);
    expect(typeof dispatchMock.mock.calls[0][0]).toBe('function');
  });
});

describe('setRadioData', () => {
  it('should return the rigth object', async () => {
    expect(Actions.setRadioData({
      type: 'test', songData: {},
    })).toEqual({
      type: 'test', nowPlaying: {},
    });
  });
});

describe('setHeartBeat', () => {
  it('should return the rigth object for heartbeat', async () => {
    expect(Actions.setHeartBeat({
      timeoutId: 1,
    })).toEqual({
      type: types.PLAYER_RADIO_SET_HEARTBEAT,
      heartbeat: { timeoutId: 1 },
    });
  });
});
