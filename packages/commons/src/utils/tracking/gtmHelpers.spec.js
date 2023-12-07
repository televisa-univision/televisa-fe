import { waitForGtmDomReady } from './gtmHelpers';

describe('waitForGtmDomReady', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
    jest.spyOn(global, 'clearInterval');
  });
  afterEach(() => {
    global.setInterval.mockRestore();
    global.clearInterval.mockRestore();
  });
  it('should resolves', () => {
    window.google_tag_manager = {
      dataLayer: {
        gtmDom: true,
      },
    };
    global.setInterval.mockImplementation(callback => callback());
    expect.assertions(1);
    return expect(waitForGtmDomReady()).resolves.toEqual(true);
  });
  it('should not call clearInterval if gtm dom is not true', () => {
    window.google_tag_manager = {};
    global.setInterval.mockImplementation(callback => callback());
    expect.assertions(1);
    waitForGtmDomReady();
    expect(clearInterval).toHaveBeenCalledTimes(0);
  });
});
