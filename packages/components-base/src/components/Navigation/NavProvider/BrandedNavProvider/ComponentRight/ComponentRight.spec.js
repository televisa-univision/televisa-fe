import React from 'react';
import { shallow } from 'enzyme';

import features from '@univision/fe-commons/dist/config/features';
import brandableTypes from '@univision/fe-commons/dist/utils/brandable/types.json';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import * as reactRedux from 'react-redux';
import getComponent from './getComponent';
import ComponentRight from '.';

describe('ComponentRight suite', () => {
  beforeEach(() => {
    features.registration.enableRegistration = jest.fn(() => false);
    jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => false);
  });
  it('should render a null by default if not uninow button', () => {
    const wrapper = shallow(<ComponentRight />);
    expect(wrapper.children().exists()).toBe(false);

    const nonExistent = shallow(<ComponentRight brandableType="test" />);
    expect(nonExistent.children().exists()).toBe(false);
  });
  it('should render a UniNow by default if uninow button true', () => {
    features.header.buttonUniNow = jest.fn(() => true);
    const wrapper = shallow(<ComponentRight />);
    expect(wrapper.find('UniNow')).toHaveLength(1);

    const nonExistent = shallow(<ComponentRight brandableType="test" />);
    expect(nonExistent.find('UniNow')).toHaveLength(1);
    jest.resetAllMocks();
  });
  it('should render a Locales component', () => {
    const wrapper = shallow(<ComponentRight brandableType={brandableTypes.tv} />);
    expect(wrapper.find('Locales')).toHaveLength(1);
  });
  it('should render nothing by default if not uninow button or Search is hidden', () => {
    Store.dispatch(setPageData({
      props: {
        hideSearch: 'true',
      },
    }));
    const wrapper = shallow(<ComponentRight />);
    expect(wrapper.find('SearchField')).toHaveLength(0);
    expect(wrapper.find('UniNow')).toHaveLength(0);
    const testComponent = getComponent(null);
    expect(testComponent()).toBeNull();
  });
  it('should not render a Locales component in Puerto Rico', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
      data: {
        brandable: {
          tvStation: {
            call: 'WLII',
          },
        },
      },
      props: {
        hideSearch: false,
      },
    }));

    const wrapper = shallow(<ComponentRight brandableType={brandableTypes.tv} />);
    expect(wrapper.find('Locales')).toHaveLength(0);
  });

  it('should return a null value for Puerto Rico', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
      data: {
        brandable: {
          tvStation: {
            call: 'WLII',
          },
        },
      },
    }));

    const testComponent = getComponent(brandableTypes.tv);
    expect(testComponent()).toBeNull();
  });

  it('should not render a Locales component in Bakersfield', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
      data: {
        brandable: {
          tvStation: {
            call: 'KABE',
          },
        },
      },
      props: {
        hideSearch: false,
      },
    }));

    const wrapper = shallow(<ComponentRight brandableType={brandableTypes.tv} />);
    expect(wrapper.find('Locales')).toHaveLength(0);
  });

  it('should return a null value for Bakersfield', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
      data: {
        brandable: {
          tvStation: {
            call: 'KABE',
          },
        },
      },
    }));

    const testComponent = getComponent(brandableTypes.tv);
    expect(testComponent()).toBeNull();
  });

  it('should not render a Locales component in Salt Lake City', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
      data: {
        brandable: {
          tvStation: {
            call: 'KUTH',
          },
        },
      },
      props: {
        hideSearch: false,
      },
    }));

    const wrapper = shallow(<ComponentRight brandableType={brandableTypes.tv} />);
    expect(wrapper.find('Locales')).toHaveLength(0);
  });

  it('should return a null value for Salt Lake City', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
      data: {
        brandable: {
          tvStation: {
            call: 'KUTH',
          },
        },
      },
    }));

    const testComponent = getComponent(brandableTypes.tv);
    expect(testComponent()).toBeNull();
  });
  it('should render userBadge when has enableRegistration true', () => {
    Store.dispatch(setPageData({
      props: {
        hideSearch: 'true',
      },
    }));
    jest.spyOn(reactRedux, 'useSelector').mockImplementationOnce(() => true);
    const wrapper = shallow(<ComponentRight />);
    expect(wrapper.find('UserBadge')).toHaveLength(1);
  });
  it('should render a TudnRebrand by default if isWorldCupMVP true', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = shallow(<ComponentRight />);
    expect(wrapper.find('TudnRebrand')).toHaveLength(1);
    jest.resetAllMocks();
  });

  it('should render TelevisaRebrand when isTelevisaSite is true', () => {
    jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => true);

    const wrapper = shallow(<ComponentRight />);
    expect(wrapper.find('TelevisaRebrand')).toHaveLength(1);
  });

  it('should render TelevisaRebrand when is Televisa site', () => {
    jest.spyOn(reactRedux, 'useSelector').mockImplementationOnce(() => true);
    Store.dispatch(setPageData({
      parentSite: 'televisa',
      domain: 'http://uat.lasestrellas.tv',
    }));
    const props = {
      theme: {},
    };
    const testComponent = getComponent(false, false);
    expect(testComponent(props)).toBeTruthy();
  });

  it('should render TelevisaButtons when the site is televisa', () => {
    jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => 'televisa');

    const wrapper = shallow(<ComponentRight />);
    expect(wrapper.find('TelevisaButtons')).toHaveLength(1);
  });
});
