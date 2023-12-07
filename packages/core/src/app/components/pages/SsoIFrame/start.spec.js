import * as sso from '@univision/fe-commons/dist/constants/sso';
import { LOCAL_STORAGE_COMMANDS } from '@univision/fe-commons/dist/constants/iFrame';
import * as start from './start';

let postMessageMock;
const origin = 'http://localhost:8080';

describe('start', () => {
  beforeEach(() => {
    postMessageMock = jest.spyOn(global.window.parent, 'postMessage').mockImplementationOnce(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
  });

  describe('validate duplicated code', () => {
    // To avoid that webpack make so big the javascript assets
    // for this page we are avoiding to import from any of the existing
    // packages. That downside force us to duplicate code.
    // This tests will validate the repeated code for this page is
    // consistent with the code existing in those packages.

    it('should iFrameAncestorsRegex values  has to be consistent with Commons values', () => {
      //  If this test fails it should be fixed without modify this code
      expect(start.iFrameAncestorsRegex).toEqual(sso.iFrameAncestorsRegex);
    });

    it('should LOCAL_STORAGE_COMMANDS values has to be consistent with Commons values', () => {
      //  If this test fails it should be fixed without modify this code
      expect(start.LOCAL_STORAGE_COMMANDS).toEqual(LOCAL_STORAGE_COMMANDS);
    });
  });

  describe('localStorageMessageHandler', () => {
    it('should return when not command or commandId', () => {
      start.mainMessageHandler({ origin, data: { command: LOCAL_STORAGE_COMMANDS.getItem, key: '123' } });
      expect(postMessageMock).not.toHaveBeenCalled();
      start.mainMessageHandler({ origin, data: { commandId: 'test', key: '123' } });
      expect(postMessageMock).not.toHaveBeenCalled();
      start.mainMessageHandler({ origin, data: { commandId: 'test', command: LOCAL_STORAGE_COMMANDS.getItem, key: '123' } });
      expect(postMessageMock).toHaveBeenCalled();
    });

    it('should return when key is not valid', () => {
      start.mainMessageHandler({ origin, data: { command: LOCAL_STORAGE_COMMANDS.getItem, commandId: '123' } });
      expect(postMessageMock).not.toHaveBeenCalled();
      start.mainMessageHandler({ origin, data: { command: LOCAL_STORAGE_COMMANDS.clear, commandId: '123' } });
      expect(postMessageMock).toHaveBeenCalled();
    });

    it('should call getItem', () => {
      window.localStorage.setItem('SSO_IFRAME_KEY_123', 'value');
      start.mainMessageHandler({
        origin,
        data: {
          command: LOCAL_STORAGE_COMMANDS.getItem, commandId: '123', key: '123',
        },
      });
      expect(window.localStorage.getItem('SSO_IFRAME_KEY_123')).toEqual('value');
    });
    it('should call setItem', () => {
      start.mainMessageHandler({
        origin,
        data: {
          command: LOCAL_STORAGE_COMMANDS.setItem, commandId: '123', key: '123', value: 'value',
        },
      });
      expect(window.localStorage.getItem('SSO_IFRAME_KEY_123')).toEqual('value');
    });
    it('should call removeItem', () => {
      window.localStorage.setItem('123', 'value');
      start.mainMessageHandler({
        origin,
        data: {
          command: LOCAL_STORAGE_COMMANDS.removeItem, commandId: '123', key: '123', value: 'value',
        },
      });
      expect(window.localStorage.getItem('SSO_IFRAME_KEY_123')).toBeNull();
    });
    it('should call clear', () => {
      window.localStorage.setItem('123', 'value');
      start.mainMessageHandler({
        origin,
        data: {
          command: LOCAL_STORAGE_COMMANDS.clear, commandId: '123', key: '123', value: 'value',
        },
      });
      expect(window.localStorage.getItem('SSO_IFRAME_KEY_123')).toBeNull();
    });
    it('should post back an error message when he command is unknown', () => {
      start.mainMessageHandler({
        origin,
        data: {
          command: 'wrong  command', commandId: '123', key: '123', value: 'value',
        },
      });
      const args = postMessageMock.mock.calls[0];
      expect(args[0].commandId).toEqual('123');
      expect(args[0].error).toBeDefined();
      expect(args[1]).toEqual(origin);
    });

    it('should post back an error message when there is an exception', () => {
      jest.restoreAllMocks();
      postMessageMock = jest.spyOn(global.window.parent, 'postMessage')
        .mockImplementationOnce(() => { throw new Error('test'); })
        .mockImplementationOnce(() => {});
      start.mainMessageHandler({
        origin,
        data: {
          command: LOCAL_STORAGE_COMMANDS.getItem, commandId: '123', key: {},
        },
      });
      const args1 = postMessageMock.mock.calls[1];
      expect(args1[0].commandId).toEqual('123');
      expect(args1[0].error).toBeDefined();
      expect(args1[1]).toEqual(origin);
    });
  });

  describe('mainMessageHandler', () => {
    it('should invalid parent stop execution and post back an error message', () => {
      start.mainMessageHandler({
        origin: 'InvalidDomain',
        data: { command: LOCAL_STORAGE_COMMANDS.getItem, commandId: '123', key: '123' },
      });
      const args = postMessageMock.mock.calls[0];
      expect(args[0].error).toBeDefined();
      expect(args[1]).toEqual('InvalidDomain');
    });

    it('should invalid data not to invoke the localStorageMessageHandler', () => {
      start.mainMessageHandler({
        origin: 'http://localhost:8080',
      });
      expect(postMessageMock).not.toHaveBeenCalled();
    });

    it('should invoke properly the localStorageMessageHandler and send back a postMesage', () => {
      start.mainMessageHandler({
        origin: 'http://www.univision.com',
        data: { command: LOCAL_STORAGE_COMMANDS.getItem, commandId: '123', key: '123' },
      });
      expect(postMessageMock).toHaveBeenCalled();
    });
  });
});
