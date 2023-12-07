import React from 'react';
import { shallow } from 'enzyme';

import WithNativeMarker from '@univision/fe-commons/dist/components/ads/dfp/Native/WithNativeMarker';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import features from '@univision/fe-commons/dist/config/features';

import TopicBar from '../../TopicBar';
import * as sizes from '../../Picture/imageSizes';

import mockApiData from './mockData.json';
import ContentCardGrid from '.';
import Styles from './ContentCardGrid.scss';

jest.mock('../../ContentCard', () => jest.fn());
jest.mock('../../TopicBar', () => jest.fn());
jest.mock('@univision/fe-commons/dist/components/ads/dfp/DFPAd', () => 'DFPAd');

storeHelpers.isTopAdInserted = jest.fn(() => false);
storeHelpers.getDevice = jest.fn();
storeHelpers.getPageData = jest.fn();

/**
 * Mocked content items for test
 * @type {Array}
 */
let props;
beforeEach(() => {
  props = {
    content: mockApiData,
    settings: {},
    device: 'mobile',
    theme: {},
  };
});

/** @test {ContentCardGrid} */
describe('ContentCardGrid Spec', () => {
  it('should render the WithNativeMarker ad component', () => {
    const wrapper = shallow(<ContentCardGrid {...props} />);
    expect(wrapper.find(WithNativeMarker)).toBeDefined();
  });

  it('should show topicbar', () => {
    props.settings = { title: 'Hello' };
    const wrapper = shallow(<ContentCardGrid {...props} />);
    expect(wrapper.find(TopicBar).length).toBe(1);
  });

  it('should render in dark', () => {
    features.shows.showsRedesign = jest.fn();
    features.shows.showsRedesign.mockReturnValueOnce(true);
    props.settings = { title: 'Hello' };
    const data = { data: { uri: 'univision.com/tv-en-vivo' }, pageCategory: 'show' };
    Store.dispatch(setPageData(data));
    const wrapper = shallow(<ContentCardGrid {...props} />);
    expect(wrapper.find(TopicBar).props().variant).toBe('dark');
  });

  it('should render an empty div if content is anything other than an array', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    props.content = null;
    const wrapper = shallow(<ContentCardGrid {...props} />);
    expect(wrapper.find('.uvs-widget').exists()).toBe(false);
  });
  it('should render a left lead', () => {
    props.leadAlignment = 'left';
    const wrapper = shallow(<ContentCardGrid {...props} />);
    expect(wrapper.find('.col-md-3')).toHaveLength(0);
  });

  it('should render a left lead when Video', () => {
    props.leadAlignment = 'left';
    props.content = [{
      type: 'video',
    }, ...props.content];
    const wrapper = shallow(<ContentCardGrid {...props} />);
    expect(wrapper.find('.col-md-3')).toHaveLength(0);
  });

  it('should render a hidden title if there is a primaryTag', () => {
    storeHelpers.getPageData.mockReturnValueOnce({
      data: {
        primaryTag: {
          name: 'test',
        },
      },
    });
    const wrapper = shallow(<ContentCardGrid {...props} />);
    expect(wrapper.find('Title')).toHaveLength(1);
  });

  it('should override image size for first content on desktop', () => {
    const wrapper = shallow(<ContentCardGrid {...props} device="desktop" />);
    const firstContent = wrapper.find('.desktopColumn').get(0).props.children[0];
    const secondContent = wrapper.find('.desktopColumn').get(1).props.children;
    const deviceSizeOverrides = {
      xl: sizes.MEDIUM,
      lg: sizes.MEDIUM,
      md: sizes.MEDIUM,
      sm: sizes.X_SMALL,
      xsm: sizes.X_SMALL,
    };

    expect(firstContent.props.deviceSizeOverrides).toBe(undefined);
    expect(secondContent.props.deviceSizeOverrides).toEqual(deviceSizeOverrides);
  });
  it('should render mobile as tablet structure if it is added', () => {
    const wrapper = shallow(<ContentCardGrid {...props} mobileAsTabletView />);
    expect(wrapper.find(`div.${Styles.mobile} .col-xs-6`)).toBeTruthy();
    expect(wrapper.find(`div.${Styles.mobile} .col-xs-12`)).toBeTruthy();
  });
  it('should render with 4 elements in the content', () => {
    props.content = [...props.content.slice(0, 4), { type: 'video' }];
    const wrapper = shallow(<ContentCardGrid {...props} />);
    expect(wrapper.find('.uvs-widget').exists()).toBeTruthy();
  });
  it('should render with 2 elements in the content', () => {
    props = {
      ...props,
      content: props.content.slice(0, 2),
    };
    const wrapper = shallow(<ContentCardGrid {...props} />);
    expect(wrapper.find('.uvs-widget').exists()).toBeTruthy();
  });
  it('should render an ad if no top ad has been inserted', () => {
    storeHelpers.isTopAdInserted.mockReturnValueOnce(false);
    const wrapper = shallow(<ContentCardGrid {...props} />);
    expect(wrapper.find('DFPAd').length).toBe(1);
    expect(wrapper.find('DFPAd').prop('position')).toBe('TOP');
  });
  it('should not render an ad if top ad has been inserted', () => {
    storeHelpers.isTopAdInserted.mockReturnValueOnce(true);
    const wrapper = shallow(<ContentCardGrid {...props} />);
    expect(wrapper.find('DFPAd').length).toBe(0);
  });
  it('should render an ad in mobileAsTabletView if no top ad has been inserted', () => {
    props = {
      ...props,
      mobileAsTabletView: true,
    };
    storeHelpers.isTopAdInserted.mockReturnValueOnce(false);
    const wrapper = shallow(<ContentCardGrid {...props} />);
    expect(wrapper.find('DFPAd').length).toBe(1);
    expect(wrapper.find('DFPAd').prop('position')).toBe('TOP');
  });
  it('should not render an ad in mobileAsTabletView if top had has been inserted', () => {
    props = {
      ...props,
      mobileAsTabletView: true,
    };
    storeHelpers.isTopAdInserted.mockReturnValueOnce(true);
    const wrapper = shallow(<ContentCardGrid {...props} />);
    expect(wrapper.find('DFPAd').length).toBe(0);
  });
});
