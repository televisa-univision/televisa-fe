/* eslint-disable no-underscore-dangle */
/**
 * @jest-environment node
 */
import * as redux from 'redux';
import Store from './store';
import StoreManager from './StoreManager';
import { DeployEnvironment } from '../constants/environment';

describe('StoreManager', () => {
  const initialWindow = global.window;

  beforeAll(() => {
    delete global.window;
  });

  beforeEach(() => {
    global.window = {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: jest.fn(),
      __INITIAL_STATE__: {
        env: DeployEnvironment.Test,
      },
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    global.window = initialWindow;
  });

  it('should return the same Store in store.js', () => {
    expect(StoreManager.getStore()).toBe(Store);
  });

  it('should apply the reducers', () => {
    // Forzing debug middleware to load
    StoreManager.init();
    const state = StoreManager.getStore().getState();
    expect(state.dfpAds).toBeDefined();
    expect(state.page).toBeDefined();
    expect(state.player).toBeDefined();
    expect(state.video).toBeDefined();
  });

  it('should not enable the redux-devtools-extension when windows does not exist', () => {
    const composeSpy = jest.spyOn(redux, 'compose');
    delete global.window;

    StoreManager.init();

    expect(composeSpy).toHaveBeenCalled();
  });

  it('should not enable the redux-devtools-extension in production', () => {
    const composeSpy = jest.spyOn(redux, 'compose');
    global.window.__INITIAL_STATE__.env = DeployEnvironment.Production;
    StoreManager.init();

    expect(global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      .not.toHaveBeenCalled();
    expect(composeSpy).toHaveBeenCalled();
  });

  it('should enable the redux-devtools-extension in lower environments', () => {
    const composeSpy = jest.spyOn(redux, 'compose');
    StoreManager.init();

    expect(global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      .toHaveBeenCalled();
    expect(composeSpy).not.toHaveBeenCalled();
  });

  it('should fall back to redux compose if redux-devtools compose is not available', () => {
    const composeSpy = jest.spyOn(redux, 'compose');
    global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = null;
    StoreManager.init();

    expect(composeSpy).toHaveBeenCalled();
  });

  it('should reset the Store', () => {
    StoreManager.init();
    const state = StoreManager.getStore().getState();
    const testData = { foo: 'bar' };
    state.page = testData;

    expect(StoreManager.getStore().getState().page).toBe(testData);
    StoreManager.init();
    expect(StoreManager.getStore().getState().page).not.toBe(testData);
  });
});
