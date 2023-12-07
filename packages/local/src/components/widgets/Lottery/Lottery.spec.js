import React from 'react';
import { shallow, mount } from 'enzyme';

import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { getPageData, getBrandable, isTopAdInserted } from '@univision/fe-commons/dist/store/storeHelpers';
import Brandable from '@univision/fe-commons/dist/utils/brandable';

import Lottery from '.';
import mockData from './data/mockData.json';

jest.mock('@univision/fe-commons/dist/store/storeHelpers', () => ({
  getPageData: jest.fn(),
  getRequestParams: jest.fn(),
  getBrandable: jest.fn(),
  isTopAdInserted: jest.fn(),
  getDevice: jest.fn(),
  getPageUrl: jest.fn(),
  hasFeatureFlag: jest.fn(() => false),
}));

let pageData;

beforeEach(() => {
  pageData = {
    data: {
      brandable: mockData.data.brandable,
      feedGeneratedAt: mockData.data.feedGeneratedAt,
    },
  };
});

jest.mock('@univision/fe-commons/dist/utils/localization/LocalizationManager', () => ({
  getCurrentLanguage: jest.fn(),
  get: jest.fn(),
}));

describe('Lottery Widget', () => {
  it('should render without crashing', () => {
    LocalizationManager.getCurrentLanguage.mockReturnValueOnce('es');
    const wrapper = mount(<Lottery market="Miami" />);
    expect(wrapper.find('Lottery__LotteryWrapper')).toHaveLength(1);
    expect(wrapper.find('Lottery__AdWrapper')).toHaveLength(1);
  });

  it('should not render if there is no market prop and store data is not available ', () => {
    getPageData.mockReturnValueOnce(null);
    const wrapper = shallow(<Lottery />);
    expect(wrapper.find('Lottery__LotteryFrame')).toHaveLength(0);
  });

  it('should not render the ad if the props is disabled ', () => {
    getPageData.mockReturnValueOnce(pageData);
    getBrandable.mockReturnValueOnce(new Brandable(pageData.data));
    isTopAdInserted.mockReturnValueOnce(false);
    const wrapper = shallow(<Lottery market="Nueva York" disableTopAd />);
    expect(wrapper.find('Lottery__AdWrapper')).toHaveLength(0);
  });

  it('should render with data from store', () => {
    getPageData.mockReturnValueOnce(pageData);
    getBrandable.mockReturnValueOnce(new Brandable(pageData.data));
    LocalizationManager.getCurrentLanguage.mockReturnValueOnce('es');
    const wrapper = shallow(<Lottery />);
    expect(wrapper.find('Lottery__LotteryFrame')).toHaveLength(1);
  });

  it('should not render if there is not valid market prop', () => {
    const wrapper = shallow(<Lottery market="123" />);
    expect(wrapper.find('Lottery__LotteryFrame')).toHaveLength(0);
  });

  it('should render language 0 if current language is english', () => {
    LocalizationManager.getCurrentLanguage.mockReturnValueOnce('en');
    const wrapper = shallow(<Lottery market="Nueva York" />);
    expect(wrapper.find('Lottery__LotteryFrame').prop('data-language')).toBe(0);
  });
});
