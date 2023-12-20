import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { ONETRUST_SCRIPT } from '@univision/fe-commons/dist/constants/oneTrust';
import { fetchOneTrustLocationApi } from '@univision/fe-commons/dist/utils/api/fetchApi';

import FooterLinkOneTrust from './FooterLinkOneTrust';

global.window ??= Object.create(window);

global.window.dataLayer = [];
global.window.OneTrust = {
  ToggleInfoDisplay: jest.fn(),
  getGeolocationData: jest.fn().mockReturnValue({
    continent: 'SA',
    country: 'BR',
    state: 'RJ',
    stateName: 'Rio de Janeiro',
  }),
};

/**
 * Mock for waiting component updates and its states
 * @param {*} wrapper - component wrapper
 * @returns {Function}
 */
const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
  });
};

/**
 * Mock for return value ones
 * @param {*} data - the fetch response
 * @param {Error} error - the error for fetch reject
 * @returns {Function}
 */
function mockReturnValue(data, error) {
  return jest.fn(() => new Promise((resolve, reject) => {
    resolve(data || {});
    reject(error || new Error('something bad happened'));
  }));
}

jest.mock(
  '@univision/fe-commons/dist/utils/api/fetchApi',
  () => ({
    fetchOneTrustLocationApi: mockReturnValue({
      continent: 'SA',
      country: 'BR',
      state: 'RJ',
      stateName: 'Rio de Janeiro',
    }),
  })
);

describe('FooterLink tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders OneTrust Button in light site variant', async () => {
    spyOn(global.document, 'querySelectorAll').and.returnValue([{ src: ONETRUST_SCRIPT }]);
    const wrapper = mount(<FooterLinkOneTrust themeVariant={'light'} site={'mulher'} />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find(FooterLinkOneTrust)).toHaveLength(1);
  });
  it('renders OneTrust Button in dark site variant', async () => {
    spyOn(global.document, 'querySelectorAll').and.returnValue([{ src: ONETRUST_SCRIPT }]);
    const wrapper = mount(<FooterLinkOneTrust themeVariant={'dark'} />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find(FooterLinkOneTrust)).toHaveLength(1);
  });
  it('should trigger track event and banner for onetrust', async () => {
    spyOn(global.document, 'querySelectorAll').and.returnValue([{ src: ONETRUST_SCRIPT }]);
    const wrapper = mount(<FooterLinkOneTrust />);
    await waitForComponentToPaint(wrapper);
    wrapper.find('FooterLinkOneTrust__OneTrustButton').simulate('click');
    expect(wrapper.find(FooterLinkOneTrust)).toHaveLength(1);
  });
  it('should not load onetrust footer button if script isnt loaded', async () => {
    spyOn(global.document, 'querySelectorAll').and.returnValue([{ src: ONETRUST_SCRIPT }]);
    const wrapper = mount(<FooterLinkOneTrust />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find(FooterLinkOneTrust)).toHaveLength(1);
  });
  it('should not load footer button if onetrust script isnt loaded', async () => {
    spyOn(global.document, 'querySelectorAll').and.returnValue([{ src: '' }]);
    const wrapper = mount(<FooterLinkOneTrust />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find(FooterLinkOneTrust)).toHaveLength(1);
  });
  it('renders OneTrust Button in USA California', async () => {
    spyOn(global.document, 'querySelectorAll').and.returnValue([{ src: ONETRUST_SCRIPT }]);
    fetchOneTrustLocationApi.mockReturnValue({
      continent: 'NA',
      country: 'US',
      state: 'CA',
      stateName: 'California',
    });
    const wrapper = mount(<FooterLinkOneTrust />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find(FooterLinkOneTrust)).toHaveLength(1);
  });
  it('renders OneTrust Button in USA Washington', async () => {
    spyOn(global.document, 'querySelectorAll').and.returnValue([{ src: ONETRUST_SCRIPT }]);
    fetchOneTrustLocationApi.mockReturnValue({
      continent: 'NA',
      country: 'US',
      state: 'WA',
      stateName: 'Washington',
    });
    const wrapper = mount(<FooterLinkOneTrust />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find(FooterLinkOneTrust)).toHaveLength(1);
  });

  it('renders OneTrust Button in USA California', async () => {
    spyOn(global.document, 'querySelectorAll').and.returnValue([{ src: ONETRUST_SCRIPT }]);
    fetchOneTrustLocationApi.mockReturnValue({
      continent: 'NA',
      country: 'US',
      state: 'CA',
      stateName: 'California',
    });
    const wrapper = mount(<FooterLinkOneTrust site={'mulher'} />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find(FooterLinkOneTrust)).toHaveLength(1);
  });
  it('renders OneTrust Button in USA Washington', async () => {
    spyOn(global.document, 'querySelectorAll').and.returnValue([{ src: ONETRUST_SCRIPT }]);
    fetchOneTrustLocationApi.mockReturnValue({
      continent: 'NA',
      country: 'US',
      state: 'WA',
      stateName: 'Washington',
    });
    const wrapper = mount(<FooterLinkOneTrust site={'mulher'} />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find(FooterLinkOneTrust)).toHaveLength(1);
  });
});
