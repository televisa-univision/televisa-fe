import React from 'react';
import configureMockStore from 'redux-mock-store';
import { create, act } from 'react-test-renderer';
import * as reactRedux from 'react-redux';
import * as reactionsActions from '../../store/slices/reactions/reactions-slice';
import gtmManager from '../../utils/tracking/googleTagManager/gtmManager';
import ProtectedDataCollector from '.';

jest.mock('../../store/slices/reactions/reactions-slice', () => ({
  fetchReactions: jest.fn(() => ({ type: 'test' })),
}));

const mockStore = configureMockStore([]);

const { Provider } = reactRedux;
let store;
let setUserIdSpy;
const state = {
  user: {
    accessToken: 'TestToken',
    sub: 'TestId',
  },
  page: {
    data: {},
  },
};

describe('ProtectedDataCollector', () => {
  beforeEach(() => {
    store = mockStore(state);
    setUserIdSpy = jest.spyOn(gtmManager, 'setUserId').mockImplementationOnce(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should mount component without crash', () => {
    let component;
    act(() => {
      component = create(
        <Provider store={store}>
          <ProtectedDataCollector />
        </Provider>
      );
    });
    expect(component.root).toBeDefined();
  });

  it('should not fetch reactions if invalid access token', () => {
    store = mockStore({ ...state, user: { } });
    act(() => {
      create(
        <Provider store={store}>
          <ProtectedDataCollector />
        </Provider>
      );
    });

    expect(store.getActions()).toEqual([]);
  });

  it('should fetch reactions if valid access token', () => {
    act(() => {
      create(
        <Provider store={store}>
          <ProtectedDataCollector />
        </Provider>
      );
    });

    expect(reactionsActions.fetchReactions).toHaveBeenCalledWith({ contentIds: [] });
    expect(store.getActions()).toEqual([{ type: 'test' }]);
  });

  it('should attach user id to gtmManager after user is ready', () => {
    act(() => {
      create(
        <Provider store={store}>
          <ProtectedDataCollector />
        </Provider>
      );
    });

    expect(setUserIdSpy).toHaveBeenCalledWith('TestId');
  });
});
