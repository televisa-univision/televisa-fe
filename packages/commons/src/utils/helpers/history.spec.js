import createHistory, { replaceState, pushState } from './history';
import * as helpers from '.';

describe('history helper', () => {
  beforeAll(() => {
    jsdom.reconfigure({
      url: 'https://www.univision.com/test',
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('createHistory', () => {
    it('should create a history in the client.', () => {
      expect(createHistory('/test')).toBeDefined();
    });

    it('should create a history in the server.', () => {
      const backupWindow = global.window;
      delete global.window;
      expect(createHistory('/test')).toBeDefined();
      global.window = backupWindow;
    });
  });

  describe('replaceState', () => {
    it('should call replaceState if exist', () => {
      const replaceStateSpy = jest.spyOn(global.window.history, 'replaceState');
      replaceState('test', '/test-push');
      expect(replaceStateSpy).toHaveBeenCalledTimes(1);
      expect(replaceStateSpy).toHaveBeenCalledWith(expect.any(Object), 'test', '/test-push');
    });

    it('should call replaceState if the domain match', () => {
      const replaceStateSpy = jest.spyOn(global.window.history, 'replaceState');
      replaceState('test', 'https://tudn.com/test-push', 'https://tudn.com');
      expect(replaceStateSpy).toHaveBeenCalledTimes(1);
      expect(replaceStateSpy).toHaveBeenCalledWith(expect.any(Object), 'test', '/test-push');
    });

    it('should not call replaceState and redirect if the domain not match', () => {
      const replaceStateSpy = jest.spyOn(global.window.history, 'replaceState');
      const locationRedirectSpy = jest.spyOn(helpers, 'locationRedirect');
      replaceState('test', 'https://www.univision.com/test-push', 'https://tudn.com');
      expect(replaceStateSpy).toHaveBeenCalledTimes(0);
      expect(locationRedirectSpy).toHaveBeenCalledTimes(1);
      expect(locationRedirectSpy).toHaveBeenCalledWith('https://www.univision.com/test-push');
    });

    it('should not call replaceState if not exist', () => {
      const replaceStateSpy = jest.spyOn(global.window.history, 'replaceState');
      const locationRedirectSpy = jest.spyOn(helpers, 'locationRedirect');
      global.window.history.replaceState = null;
      replaceState('test', '/test-push');
      expect(replaceStateSpy).toHaveBeenCalledTimes(0);
      expect(locationRedirectSpy).toHaveBeenCalledTimes(1);
    });

    it('should not call pushState is not a valid URL', () => {
      const pushStateSpy = jest.spyOn(global.window.history, 'pushState');
      const locationRedirectSpy = jest.spyOn(helpers, 'locationRedirect');
      pushState('test', null);
      expect(pushStateSpy).toHaveBeenCalledTimes(0);
      expect(locationRedirectSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('pushState', () => {
    it('should call pushState if exist', () => {
      const pushStateSpy = jest.spyOn(global.window.history, 'pushState');
      pushState('test', '/test-push');
      expect(pushStateSpy).toHaveBeenCalledTimes(1);
    });

    it('should call replaceState if the domain match', () => {
      const pushStateSpy = jest.spyOn(global.window.history, 'pushState');
      pushState('test', 'https://tudn.com/test-push', 'https://tudn.com');
      expect(pushStateSpy).toHaveBeenCalledTimes(1);
      expect(pushStateSpy).toHaveBeenCalledWith(expect.any(Object), 'test', '/test-push');
    });

    it('should not call pushState and redirect if the domain not match', () => {
      const pushStateSpy = jest.spyOn(global.window.history, 'pushState');
      const locationRedirectSpy = jest.spyOn(helpers, 'locationRedirect');
      pushState('test', 'https://www.univision.com/test-push', 'https://tudn.com');
      expect(pushStateSpy).toHaveBeenCalledTimes(0);
      expect(locationRedirectSpy).toHaveBeenCalledTimes(1);
      expect(locationRedirectSpy).toHaveBeenCalledWith('https://www.univision.com/test-push');
    });

    it('should not call pushState if not exist', () => {
      const pushStateSpy = jest.spyOn(global.window.history, 'pushState');
      const locationRedirectSpy = jest.spyOn(helpers, 'locationRedirect');
      global.window.history.pushState = null;
      pushState('test', '/test-push');
      expect(pushStateSpy).toHaveBeenCalledTimes(0);
      expect(locationRedirectSpy).toHaveBeenCalledTimes(1);
    });

    it('should not call pushState is not a valid URL', () => {
      const pushStateSpy = jest.spyOn(global.window.history, 'pushState');
      const locationRedirectSpy = jest.spyOn(helpers, 'locationRedirect');
      pushState('test', null);
      expect(pushStateSpy).toHaveBeenCalledTimes(0);
      expect(locationRedirectSpy).toHaveBeenCalledTimes(0);
    });
  });
});
