/**
 * @module PrendeTV Utilities Specs
 */
import * as languages from '@univision/fe-commons/dist/utils/localization/languages';

import { BITTERSWEET, WHITE } from '@univision/fe-utilities/styled/constants';

import * as commonHelpers from '@univision/fe-commons/dist/utils/helpers';
import gtmManager from '@univision/fe-commons/dist/utils/tracking/googleTagManager/gtmManager';

import { PRENDE_TV_LANDING, PRENDE_TV_PARTNERS } from '../constants';

import * as helpers from '.';

commonHelpers.setCookie = jest.fn();
jest.mock('@univision/fe-commons/dist/utils/tracking/googleTagManager/gtmManager', () => ({
  ...jest.requireActual('@univision/fe-commons/dist/utils/tracking/googleTagManager/gtmManager'),
  triggerEvent: jest.fn(),
}));

describe('Helpers PrendeTV test', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'production';
    delete window.location;
    window.location = {};
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return true if the page is PrendeTV', () => {
    expect(helpers.isLandingPage(PRENDE_TV_LANDING)).toEqual(true);
  });
  it('should return WHITE color if the page is landing', () => {
    expect(helpers.getHeadlineFontColor(PRENDE_TV_LANDING)).toEqual(WHITE);
  });
  it('should return BITTERSWEET color if the page is not landing', () => {
    expect(helpers.getHeadlineFontColor(PRENDE_TV_PARTNERS)).toEqual(BITTERSWEET);
  });
  it('should return BITTERSWEET color if the page is landing', () => {
    expect(helpers.getHeadlineBackColor(PRENDE_TV_LANDING)).toEqual(BITTERSWEET);
  });
  it('should return WHITE color if the page is not landing', () => {
    expect(helpers.getHeadlineBackColor(PRENDE_TV_PARTNERS)).toEqual(WHITE);
  });
  it('should return the correct path to redirect in spanish when is the home page', () => {
    expect(helpers.getRedirectWithLangUrl(languages.ES, `${helpers.getPrefix()}/${languages.EN}`)).toEqual('/');
  });
  it('should return the correct path to redirect in spanish', () => {
    expect(helpers.getRedirectWithLangUrl(languages.ES, PRENDE_TV_PARTNERS)).toEqual('/business');
  });
  it('should return the correct path to redirect in english', () => {
    expect(helpers.getRedirectWithLangUrl(languages.EN, `${helpers.getPrefix()}/${languages.EN}${PRENDE_TV_PARTNERS}/abc`)).toEqual(`${helpers.getPrefix()}/${languages.EN}${PRENDE_TV_PARTNERS}/abc`);
  });
  it('should return path when no path is specified', () => {
    expect(helpers.getRedirectWithLangUrl(languages.ES, undefined)).toEqual(undefined);
  });
  it('should return path itself when the path starts with https', () => {
    expect(helpers.getRedirectWithLangUrl(languages.ES, 'https://example')).toEqual('https://example');
  });
  it('should perform a the redirect to english version of the partner page', () => {
    expect(helpers.redirectWithLang(languages.EN, PRENDE_TV_PARTNERS)).toEqual(true);
  });
  it('should not perform a the redirect when window location is undefined.', () => {
    delete window.location;
    expect(helpers.redirectWithLang(languages.EN, PRENDE_TV_PARTNERS)).toEqual(false);
  });
  it('should return the path formatted', () => {
    expect(helpers.getUrlPath(languages.ES, PRENDE_TV_PARTNERS)).toEqual(`${helpers.getPrefix()}/business`);
    expect(helpers.getUrlPath(languages.EN, PRENDE_TV_PARTNERS)).toEqual(`${helpers.getPrefix()}/${languages.EN}/business`);
  });
  it('should return the same path when is an external one', () => {
    expect(helpers.getUrlPath(languages.EN, 'https://www.prende.tv')).toEqual('https://www.prende.tv');
  });
  it('should return the correct prefix value on production environment', () => {
    expect(helpers.getPrefix()).toEqual('');
  });
  it('should return the correct prefix value on development environment', () => {
    process.env.NODE_ENV = 'development';
    expect(helpers.getPrefix()).toEqual('/prendetv');
  });
  it('should set prende tv cookie', () => {
    helpers.setPrendeTVCookie();
    expect(commonHelpers.setCookie).toHaveBeenCalledTimes(1);
  });
  it('should set content tracking', () => {
    helpers.setContentTracking({
      currentTarget: {
        dataset: {
          app: 'foo',
        },
      },
    });

    expect(gtmManager.triggerEvent).toBeCalledWith({
      event_label: 'foo',
      event_action: 'content_click',
      event_name: 'section',
    });
  });
});
