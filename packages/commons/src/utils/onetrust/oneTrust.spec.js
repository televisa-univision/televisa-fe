import oneTrustManager from './oneTrustManager';
import { TARGETING_COOKIES } from '../../constants/oneTrust';

const cb = jest.fn();

// Use jest fake timers
jest.useFakeTimers();

global.window ??= Object.create(window);

describe('OneTrust Manager', () => {
  oneTrustManager.allowOneTrust = true;
  it('Should return plain script type if category is not sent', () => {
    expect(oneTrustManager.getScriptType()).toEqual('text/plain');
  });

  it('Should return plain script type if category is sent but OneTrustActiveGroups hasnt been defined', () => {
    global.window ??= {};
    expect(oneTrustManager.getScriptType(TARGETING_COOKIES)).toEqual('text/plain');
  });

  it('Should return plain script type if category is sent but OneTrustActiveGroups have no Targeting Cookies accepted', () => {
    global.window.OnetrustActiveGroups = ',C0001,C0003';
    expect(oneTrustManager.getScriptType(TARGETING_COOKIES)).toEqual('text/plain');
  });

  it('Should return javascript type if category is sent and OneTrustActiveGroups has the Targeting Cookies accepted', () => {
    global.window.OnetrustActiveGroups = ',C0001,C0003,C0004';
    expect(oneTrustManager.getScriptType(TARGETING_COOKIES)).toEqual('text/javascript');
  });

  it('Should return javascript type if One Trust script is not allowed to load', () => {
    oneTrustManager.allowOneTrust = false;
    expect(oneTrustManager.getScriptType(TARGETING_COOKIES)).toEqual('text/javascript');
  });
});

describe('waitForOneTrustGroupsActive', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
    jest.spyOn(global, 'clearInterval');
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(global, 'clearTimeout');
    global.window.OnetrustActiveGroups = ',C0001,C0002,';
    oneTrustManager.allowOneTrust = true;
  });
  afterEach(() => {
    global.setInterval.mockRestore();
    global.clearInterval.mockRestore();
    global.setTimeout.mockRestore();
    global.clearTimeout.mockRestore();
  });

  it('should invoke the callback if onetrustactivegroups are not defined for a period', () => {
    global.window.OnetrustActiveGroups = undefined;
    global.setInterval.mockImplementation(callback => callback());
    expect.assertions(2);
    oneTrustManager.waitForOneTrustGroupsActive(cb);
    expect(clearInterval).toHaveBeenCalledTimes(0);

    jest.runAllTimers();

    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  it('should call clearInterval if OneTrustActiveGroups is defined', () => {
    global.window.OnetrustActiveGroups = ',C0001,C0003';
    global.setInterval.mockImplementation(callback => callback());
    expect.assertions(1);
    oneTrustManager.waitForOneTrustGroupsActive(cb);
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  it('should not call clearInterval if window is not defined', () => {
    global.window.OnetrustActiveGroups = undefined;
    global.setInterval.mockImplementation(callback => callback());
    expect.assertions(1);
    oneTrustManager.waitForOneTrustGroupsActive(cb);
    expect(clearInterval).toHaveBeenCalledTimes(0);
  });
});

describe('OneTrust Cookie Active Groups', () => {
  let optanonCookie;
  beforeEach(() => {
    global.window.OnetrustActiveGroups = undefined;
    optanonCookie = '&groups=C0001%3A1%2CC0003%3A1%2CC0004%3A0%2CC0002%3A0%2CC0005%3A0';
  });
  it('Should set normal categories', () => {
    oneTrustManager.getCookieActiveGroups(optanonCookie);
    expect(global.window.OnetrustActiveGroups).toEqual(',C0001,C0003,');
  });

  it('Should set all categories', () => {
    optanonCookie = '&groups=C0001%3A1%2CC0003%3A1%2CC0004%3A1%2CC0002%3A1%2CC0005%3A1';
    oneTrustManager.getCookieActiveGroups(optanonCookie);
    expect(global.window.OnetrustActiveGroups).toEqual(',C0001,C0003,C0004,C0002,C0005,');
  });

  it('Should return nothing if cookie has no groups value', () => {
    optanonCookie = 'isGpcEnabled=0&datestamp=Tue+Sep+19+2023+14%3A22%3A15+GMT-0400+(Atlantic+Standard+Time)&version=202304.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=3c917a3b-ebb9-4961-b127-9e85b9cfd029&interactionCount=0&landingPath=https%3A%2F%2Fperformance.univision.com%2F%3Fmode%3Dprod%26adEnv%3Dproduction';
    oneTrustManager.getCookieActiveGroups(optanonCookie);
    expect(global.window.OnetrustActiveGroups).toEqual(undefined);
  });

  it('Should fail without window defined', () => {
    const windowObject = global.window;
    delete global.window;
    oneTrustManager.getCookieActiveGroups(optanonCookie);
    expect(global.window).toBeFalsy();
    global.window = windowObject;
  });
});

describe('OneTrust Allow', () => {
  let props;
  beforeEach(() => {
    props = {
      content_vertical: 'local',
    };
  });
  it('Should set OneTrust to load', () => {
    oneTrustManager.setPageSection(props);
    expect(oneTrustManager.allowOneTrust).toEqual(true);
  });

  it('Should not set allow one trust script', () => {
    oneTrustManager.setPageSection();
    expect(oneTrustManager.allowOneTrust).toEqual(false);
  });
});
