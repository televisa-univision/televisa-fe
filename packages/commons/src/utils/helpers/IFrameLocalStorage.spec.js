import IFrameLocalStorage, {
  requestLocalStorage,
  requestMessageHandler,
} from './IFrameLocalStorage';
import { LOCAL_STORAGE_COMMANDS } from '../../constants/iFrame';
import * as clientLogging from '../logging/clientLogging';

const iFrameWindowMock = global.window;
const listenerHandlerMock = jest.fn();
const origin = 'http://localhost';
const { addEventListener, removeEventListener, postMessage } = global.window; // To avoid Cycle

describe('IFrameLocalStorage', () => {
  let listener;
  let eventName;
  let clientLoggingSpy;

  beforeEach(() => {
    jest.spyOn(global.window, 'addEventListener').mockImplementationOnce((name, handler) => {
      listener = (e) => {
        listenerHandlerMock();
        handler({ data: { ...e.data, isRoot: false }, origin });
      };
      eventName = name;
      addEventListener(name, listener);
    });
    jest.spyOn(global.window, 'removeEventListener').mockImplementationOnce(() => {});
    clientLoggingSpy = jest.spyOn(clientLogging, 'clientLevelLogging');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    listenerHandlerMock.mockRestore();
    clientLoggingSpy.mockRestore();
    removeEventListener(eventName, listener);
  });

  describe('requestMessageHandler', () => {
    it('should resolves only when the preconditions are meet', () => {
      const resolve = jest.fn();
      const handler = requestMessageHandler({ targetOrigin: origin, commandId: '123', resolve });
      handler({ origin: 'InvalidDomain' });
      expect(resolve).not.toHaveBeenCalled();
      handler({ origin: 'InvalidDomain', data: { commandId: '456' } });
      expect(resolve).not.toHaveBeenCalled();
      handler({ origin, data: { commandId: '456' } });
      expect(resolve).not.toHaveBeenCalled();
      handler({ origin, data: { commandId: '123' } });
      expect(resolve).toHaveBeenCalled();
    });

    it('should reject when message bring an error', () => {
      const reject = jest.fn();
      const handler = requestMessageHandler({ targetOrigin: origin, commandId: '123', reject });
      handler({ origin, data: { commandId: '123', error: 'Invalid Command Error' } });
      expect(reject).toHaveBeenCalledWith(new Error('Invalid Command Error'));
    });
  });

  describe('requestLocalStorage', () => {
    it('should add and remove the event listeners properly', async () => {
      expect.assertions(3);
      await requestLocalStorage({
        command: LOCAL_STORAGE_COMMANDS.get,
        key: 'test',
        iFrameWindow: iFrameWindowMock,
        targetOrigin: origin,
      });
      expect(listenerHandlerMock).toHaveBeenCalledTimes(1);
      expect(global.window.addEventListener).toHaveBeenCalled();
      expect(global.window.removeEventListener).toHaveBeenCalled();
    });

    it('should catch all exceptions, remove the listener and report the error', (done) => {
      expect.assertions(4);
      requestLocalStorage({
        command: LOCAL_STORAGE_COMMANDS.get,
        key: 'test',
        iFrameWindow: {
          postMessage: () => { throw new Error('Test'); },
        },
      }).then((res) => {
        expect(global.window.addEventListener).toHaveBeenCalled();
        expect(global.window.removeEventListener).toHaveBeenCalled();
        expect(clientLoggingSpy.mock.calls[0][0]).toEqual({
          error: new Error('Test'),
          info: 'IFRAME_LOCAL_STORAGE requestLocalStorage error'
        });
        expect(res).not.toBeDefined();
        done();
      });
    });

    it('should reject with for Timeout after a time without resolve', (done) => {
      expect.assertions(2);
      jest.useFakeTimers();
      requestLocalStorage({
        command: LOCAL_STORAGE_COMMANDS.get,
        key: 'test',
        iFrameWindow: {
          postMessage: () => {},
        },
      }).then(() => {
        expect(global.window.removeEventListener).toHaveBeenCalled();
        const { error } = clientLoggingSpy.mock.calls[0][0];
        expect(error.message.startsWith('Timeout')).toBeTruthy();
        done();
      });
      jest.runAllTimers();
    });

    it('should return the data sent back by the iFrame', (done) => {
      expect.assertions(3);

      requestLocalStorage({
        command: LOCAL_STORAGE_COMMANDS.get,
        commandId: '123',
        key: 'test',
        iFrameWindow: {
          postMessage: () => {},
        },
        targetOrigin: origin,
      }).then((data) => {
        expect(global.window.addEventListener).toHaveBeenCalledTimes(1);
        expect(global.window.removeEventListener).toHaveBeenCalledTimes(1);
        expect(data).toEqual('TestData');
        done();
      });

      // Emulates the iFrame sending back data
      global.window.postMessage({
        commandId: '123',
        data: 'TestData',
      }, origin);
    });
  });

  describe('IFrameLocalStorage', () => {
    let ssoIFrameLocalStorage;
    beforeEach(() => {
      jest.spyOn(global.window, 'postMessage').mockImplementationOnce(postMessage);
      ssoIFrameLocalStorage = new IFrameLocalStorage(global.window, origin);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should getItemObject handle parsing exception', async () => {
      expect.assertions(1);
      jest.spyOn(ssoIFrameLocalStorage, 'getItem').mockImplementationOnce(() => Promise.resolve('Test'));
      await expect(ssoIFrameLocalStorage.getItemObject('key')).resolves.toEqual(undefined);
    });
    it('should getItemObject handle rejected promise from getItem', async () => {
      expect.assertions(1);
      jest.spyOn(ssoIFrameLocalStorage, 'getItem').mockImplementationOnce(() => Promise.reject(
        new Error('promise rejected')
      ));
      await expect(ssoIFrameLocalStorage.getItemObject('key')).resolves.toEqual(undefined);
    });
    it('should getItem method have to postMessage properly', async () => {
      await ssoIFrameLocalStorage.getItem('key');
      expect(global.window.postMessage.mock.calls[0][0].command).toEqual(
        LOCAL_STORAGE_COMMANDS.getItem
      );
      expect(global.window.postMessage.mock.calls[0][0].key).toEqual('key');
      expect(global.window.postMessage.mock.calls[0][1]).toMatch(origin);
    });
    it('should setItem method have to postMessage properly', async () => {
      await ssoIFrameLocalStorage.setItem('key', 'testValue');
      expect(global.window.postMessage.mock.calls[0][0].command).toEqual(
        LOCAL_STORAGE_COMMANDS.setItem
      );
      expect(global.window.postMessage.mock.calls[0][0].key).toEqual('key');
      expect(global.window.postMessage.mock.calls[0][0].value).toEqual('testValue');
    });
    it('should removeItem method have to postMessage properly', async () => {
      await ssoIFrameLocalStorage.removeItem('key');
      expect(global.window.postMessage.mock.calls[0][0].command).toEqual(
        LOCAL_STORAGE_COMMANDS.removeItem
      );
      expect(global.window.postMessage.mock.calls[0][0].key).toEqual('key');
    });

    it('should setItemObject method have to postMessage properly', async () => {
      await ssoIFrameLocalStorage.setItemObject('key', {});
      expect(global.window.postMessage.mock.calls[0][0].command).toEqual(
        LOCAL_STORAGE_COMMANDS.setItem
      );
      expect(global.window.postMessage.mock.calls[0][0].key).toEqual('key');
      expect(global.window.postMessage.mock.calls[0][0].value).toEqual(JSON.stringify({}));
    });

    it('should getObject method have to postMessage properly', async () => {
      await ssoIFrameLocalStorage.getItemObject('key');
      expect(global.window.postMessage.mock.calls[0][0].command).toEqual(
        LOCAL_STORAGE_COMMANDS.getItem
      );
      expect(global.window.postMessage.mock.calls[0][0].key).toEqual('key');
    });

    it('should clear method have to postMessage properly', async () => {
      await ssoIFrameLocalStorage.clear();
      expect(global.window.postMessage.mock.calls[0][0].command).toEqual(
        LOCAL_STORAGE_COMMANDS.clear
      );
    });
  });
});
