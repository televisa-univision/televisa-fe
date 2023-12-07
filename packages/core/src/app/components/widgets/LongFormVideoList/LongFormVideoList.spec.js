import React from 'react';
import { shallow } from 'enzyme';
import * as Helpers from '@univision/fe-commons/dist/store/storeHelpers';
import Store from '@univision/fe-commons/dist/store/store';
import comScoreManager from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import fetchContent from '@univision/fe-commons/dist/utils/api/content/fetch';
import LongFormVideoList from '.';
import mockData from './mockLongformVideoList.json';

let props;
let wrapper;
let pageData;

beforeEach(() => {
  props = {
    content: [
      { type: 'video', title: 'test 1' },
      { type: 'video', title: 'test 2' },
      { type: 'video', title: 'test 3' },
      { type: 'video', title: 'test 4' },
      { type: 'video', title: 'test 5' },
    ],
  };

  wrapper = shallow(<LongFormVideoList {...props} />);
  fetchContent.mockReset();
});

jest.mock('@univision/fe-commons/dist/utils/api/content/fetch', () => jest.fn());

describe('Longform video list', () => {
  it('should render as expected', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render content card', () => {
    expect(wrapper.find('.cardWrapper').length).toBe(5);
  });

  it('should render horizontal view for mobile', () => {
    const { view } = wrapper.find('.cardWrapper').first().children().props();
    expect(view).toBe('horizontal');
  });

  it('should render vertical view for mobile', () => {
    Helpers.getDevice = jest.fn();
    Helpers.getDevice.mockReturnValue('desktop');
    wrapper = shallow(<LongFormVideoList {...props} />);
    const { view } = wrapper.find('.cardWrapper').first().children().props();
    expect(view).toBe('vertical');
  });

  it('should not render content cards if no content', () => {
    props.content = null;
    wrapper = shallow(<LongFormVideoList {...props} />);
    expect(wrapper.find('.cardWrapper')).toHaveLength(0);
  });

  it('should load more cards using fetch and track com score beacon.', async () => {
    pageData = {
      domain: 'https://uat2.x.univision.com',
      data: {
        show: {
          uri: '/shows/amar-a-muerte',
        },
      },
    };
    props = {
      content: [
        { type: 'video', title: 'test 1' },
        { type: 'video', title: 'test 2' },
        { type: 'video', title: 'test 3' },
        { type: 'video', title: 'test 4' },
        { type: 'video', title: 'test 5' },
      ],
    };
    Store.dispatch(setPageData(pageData));
    wrapper = await shallow(<LongFormVideoList {...props} />);
    const instance = wrapper.instance();
    expect(wrapper.find('.cardWrapper').length).toBe(5);
    fetchContent.mockReturnValueOnce(mockData);
    jest.spyOn(instance, 'loadMore');
    spyOn(comScoreManager, 'beacon');
    await instance.loadMore();
    expect(comScoreManager.beacon).toHaveBeenCalledTimes(1);
    expect(wrapper.find('.cardWrapper').length).toBe(6);
  });

  it('should catch error if component crash and skip com score tracking', async () => {
    Store.dispatch(setPageData(pageData));
    wrapper = await shallow(<LongFormVideoList {...props} />);
    const instance = wrapper.instance();
    fetchContent.mockImplementationOnce(() => { throw new Error('error desc'); });
    jest.spyOn(instance, 'loadMore');
    spyOn(comScoreManager, 'beacon');
    await instance.loadMore();
    expect(comScoreManager.beacon).not.toHaveBeenCalled();
    expect(wrapper.instance().state.label).toBe(localization.get('errorApp'));
  });

  it('should show end videos if we don have more cards', async () => {
    Store.dispatch(setPageData(pageData));
    wrapper = await shallow(<LongFormVideoList {...props} />);
    const instance = wrapper.instance();
    fetchContent.mockReturnValueOnce(
      {
        staticWidgets: [
          {
          },
        ],
      }
    );
    jest.spyOn(instance, 'loadMore');
    await instance.loadMore();
    expect(wrapper.instance().state.label).toBe(localization.get('endVideos'));
  });

  it('should show error if url does not exist', () => {
    pageData = {
      domain: '',
      data: {
        show: {
          uri: '',
        },
      },
    };
    Store.dispatch(setPageData(pageData));
    wrapper = shallow(<LongFormVideoList />);
    wrapper.instance().loadMore();
    expect(wrapper.instance().state.label).toBe(localization.get('errorApp'));
  });

  it('should not execute loadmore if fetch is true', async () => {
    Store.dispatch(setPageData(pageData));
    wrapper = await shallow(<LongFormVideoList {...props} />);
    const instance = wrapper.instance();
    expect(wrapper.find('.cardWrapper').length).toBe(5);
    wrapper.setState({
      isFetching: true,
    });
    fetchContent.mockReturnValueOnce(mockData);
    jest.spyOn(instance, 'loadMore');
    await instance.loadMore();
    expect(wrapper.find('.cardWrapper').length).toBe(5);
  });
});
