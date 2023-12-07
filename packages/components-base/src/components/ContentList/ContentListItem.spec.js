import React from 'react';
import { shallow, mount } from 'enzyme';
import VisibilitySensor from 'react-visibility-sensor';
import url from 'url';

import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import * as clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import comScoreManager from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';

import ConnectedContestListItem from './ContentListItem';

const { WrappedComponent: ContentListItem } = ConnectedContestListItem;

/**
 * Test item component for ContentListItem
 * @returns {JSX}
 */
const TestItem = () => <div>test item</div>;

describe('ContentListItem', () => {
  let fetchPageDataSpy;

  beforeEach(() => {
    fetchPageDataSpy = jest.spyOn(helpers, 'fetchPageData');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should avoid unnecessary re-rendering', () => {
    const spy = jest.spyOn(ContentListItem.prototype, 'renderContent');
    const wrapper = mount(
      <ContentListItem
        componentLoaded
        contentData={{ uri: '/testing' }}
        setPageDataAction={jest.fn()}
        itemComponent={TestItem}
      />
    );
    expect(spy).toBeCalled();
    spy.mockClear();
    wrapper.setProps({ componentLoaded: true });
    expect(spy).not.toHaveBeenCalled();
    spy.mockClear();
    wrapper.setProps({ contentData: { uri: '/test' } });
    expect(spy).not.toHaveBeenCalled();
    spy.mockClear();
    wrapper.setState({ isNextItemLoaded: true });
    expect(spy).not.toHaveBeenCalled();
  });

  it('calls updatePageContext and trackNewItem if item is visible', () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ uri: '/testing' }}
        itemComponent={TestItem}
        setPageDataAction={jest.fn()}
        depth={2}
      />
    );
    const instance = wrapper.instance();
    jest.spyOn(instance, 'updatePageContext');
    jest.spyOn(instance, 'trackNewItem');
    instance.onItemVisibilityChange(true);
    expect(instance.updatePageContext).toHaveBeenCalledTimes(1);
    expect(instance.trackNewItem).toHaveBeenCalledTimes(1);
    wrapper.setProps({ depth: 1 });
    instance.onItemVisibilityChange(true);
    expect(instance.updatePageContext).toHaveBeenCalledTimes(2);
    expect(instance.trackNewItem).toHaveBeenCalledTimes(1);
  });

  it('does not call updatePageContext if next item is not visible', () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ uri: '/testing' }}
        itemComponent={TestItem}
      />
    );
    const instance = wrapper.instance();
    jest.spyOn(instance, 'updatePageContext');
    instance.onNextItemVisibilityChange(false);
    expect(instance.updatePageContext).not.toBeCalled();
  });

  it('should log error if updatePageContext fails to format url', () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ uri: '/testing' }}
        itemComponent={TestItem}
        setPageDataAction={jest.fn()}
      />
    );
    const error = new Error('url format failed');
    const clientLoggingSpy = jest.spyOn(clientLogging, 'default').mockReturnValue(null);

    jest.spyOn(url, 'format').mockImplementation(() => {
      throw error;
    });

    wrapper.instance().updatePageContext();

    expect(clientLoggingSpy).toHaveBeenCalledWith(error);
  });

  it('does not call loadNextItem if item is not visible', () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ uri: '/testing' }}
        setPageDataAction={jest.fn()}
        itemComponent={TestItem}
      />
    );
    const instance = wrapper.instance();
    const loadNextItem = jest.spyOn(instance, 'loadNextItem').mockReturnValue(Promise.resolve({}));
    instance.onItemVisibilityChange(false);
    expect(loadNextItem).not.toBeCalled();
  });

  it('does not call trackNewItem if tracking is disabled', () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ uri: '/testing' }}
        itemComponent={TestItem}
        setPageDataAction={jest.fn()}
        supressTracking
      />
    );
    const instance = wrapper.instance();
    jest.spyOn(instance, 'trackNewItem');
    instance.onItemVisibilityChange(true);
    expect(instance.trackNewItem).not.toBeCalled();
  });

  it('does not call trackNewItem if item already tracked', () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ uri: '/testing' }}
        itemComponent={TestItem}
        setPageDataAction={jest.fn()}
      />
    );
    const instance = wrapper.instance();
    jest.spyOn(instance, 'trackNewItem');
    wrapper.setState({ isItemTracked: true });
    instance.onItemVisibilityChange(true);
    expect(instance.trackNewItem).not.toBeCalled();
  });

  it('calls loadNextItem if next item is visible', () => {
    const props = { updateLoader: () => {} };
    const wrapper = shallow(
      <ContentListItem
        {...props}
        contentData={{ uri: '/testing' }}
        itemComponent={TestItem}
      />
    );
    const instance = wrapper.instance();
    wrapper.setState({ content: { nextItem: { uri: '/test' } }, isNextItemLoaded: false });
    const loadNextItemSpy = jest
      .spyOn(instance, 'loadNextItem')
      .mockReturnValue(Promise.resolve({}));
    instance.onNextItemVisibilityChange(true);
    expect(loadNextItemSpy).toBeCalled();
  });

  it('updates the page title and uri', () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ title: 'title', uri: '/testing' }}
        itemComponent={TestItem}
        setPageDataAction={jest.fn()}
      />
    );
    const instance = wrapper.instance();
    window.history.replaceState = () => {
      document.uri = 'updated';
    };
    instance.updatePageContext();
    expect(document.title).toBe('title');
    expect(document.uri).toBe('updated');
  });

  it('should call history.replace if context.history is set', () => {
    const history = {
      replace: jest.fn(fn => fn),
    };
    const wrapper = shallow(
      <ContentListItem
        contentData={{ type: 'article', title: 'title', uri: '/testing' }}
        itemComponent={TestItem}
        setPageDataAction={jest.fn()}
      />
    );
    shallow(wrapper.prop('children')({ history }));
    const instance = wrapper.instance();
    instance.updatePageContext();
    expect(history.replace).toHaveBeenCalled();
  });

  it('should call window.history.replaceState if context.history is not set', () => {
    jest.spyOn(window.history, 'replaceState');
    const wrapper = shallow(
      <ContentListItem
        contentData={{ type: 'article', title: 'title', uri: '/testing' }}
        itemComponent={TestItem}
        setPageDataAction={jest.fn()}
      />
    );
    shallow(wrapper.prop('children')());
    const instance = wrapper.instance();
    instance.updatePageContext();
    expect(window.history.replaceState).toHaveBeenCalled();
  });

  it('should track comscore event', () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ title: 'title', uri: '/testing' }}
        itemComponent={TestItem}
        setPageDataAction={jest.fn()}
      />
    );
    const instance = wrapper.instance();
    const comScoreBeaconSpy = jest.spyOn(comScoreManager, 'beacon');
    instance.onItemVisibilityChange(true);
    expect(comScoreBeaconSpy).toBeCalled();
  });

  it('calls onNextItemFetched if next item is fetched', async () => {
    const onNextItemFetched = jest.fn((data, cb) => cb());
    const wrapper = shallow(
      <ContentListItem
        contentData={{ nextItem: { uri: '/testing' } }}
        itemComponent={TestItem}
        onNextItemFetched={onNextItemFetched}
        updateLoader={() => {}}
        fetchPageDataAction={() => Promise.resolve({
          value: {
            data: {
              exampleData: 'example',
            },
          },
        })}
        fetchReactionsAction={jest.fn()}
      />
    );
    const instance = wrapper.instance();
    fetchPageDataSpy.mockReturnValue(Promise.resolve({ data: 'example response' }));
    await instance.loadNextItem();
    expect(onNextItemFetched).toBeCalled();
  });

  it('renders null for non-article contents', () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ type: 'video' }}
        itemComponent={TestItem}
      />
    );
    expect(wrapper.find(VisibilitySensor).length).toBe(0);
  });

  it('renders a VisibilitySensor for article contents', () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ type: 'article' }}
        itemComponent={TestItem}
      />
    );
    const Item = shallow(wrapper.prop('children')());
    expect(Item.find(VisibilitySensor).length).toBe(1);
  });

  it('renders two VisibilitySensor if there is a next item', () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ type: 'article', nextItem: { uri: '/test' } }}
        itemComponent={TestItem}
      />
    );
    const Item = shallow(wrapper.prop('children')());
    expect(Item.find(VisibilitySensor).length).toBe(2);
  });

  it('should call updateInitialLoad if first load', () => {
    const updateInitialLoadSpy = jest.fn();
    const wrapper = shallow(
      <ContentListItem
        contentData={{ type: 'article', nextItem: {} }}
        depth={1}
        itemComponent={TestItem}
        initialLoad
        updateInitialLoad={updateInitialLoadSpy}
      />,
    );
    wrapper.instance().onItemVisibilityChange(true);
    expect(updateInitialLoadSpy).toHaveBeenCalled();
  });

  it('should set callback when setVisibleCallback is called', () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ uri: '/testing' }}
        setPageDataAction={jest.fn()}
        itemComponent={TestItem}
      />
    );
    const instance = wrapper.instance();
    const mock = jest.fn();
    instance.setVisibleCallback(mock);
    expect(instance.isInViewportCallback).toBe(mock);
    instance.isInViewportCallback = mock;
    instance.onItemVisibilityChange(false);
    instance.setVisibleCallback(null);
  });

  it('renders OK if window is undefined', () => {
    delete global.window;
    const wrapper = shallow(
      <ContentListItem
        contentData={{ type: 'article' }}
        itemComponent={TestItem}
      />
    );
    const Item = shallow(wrapper.prop('children')());
    expect(Item.find(VisibilitySensor).length).toBe(1);
  });

  it('falls back to null element if Article has error', () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ type: 'article' }}
        itemComponent={TestItem}
      />
    );
    const Item = shallow(wrapper.prop('children')());
    const fallback = Item.find('ErrorBoundary').prop('fallbackRender')();
    expect(fallback).toEqual(null);
  });

  it('should not call getAd when item depth is 1', () => {
    const adSpy = jest.spyOn(adHelper, 'getAd');
    const wrapper = shallow(
      <ContentListItem
        contentData={{ type: 'article', nextItem: {} }}
        depth={1}
        itemComponent={TestItem}
      />
    );
    wrapper.instance().renderContent();
    expect(adSpy).not.toHaveBeenCalled();
  });

  it('should call getAd when item depth is greater than 1', () => {
    const adSpy = jest.spyOn(adHelper, 'getAd');
    const wrapper = shallow(
      <ContentListItem
        contentData={{ type: 'article', nextItem: { uri: '/test' } }}
        depth={2}
        itemComponent={TestItem}
      />
    );
    wrapper.instance().renderContent();
    expect(adSpy).toHaveBeenCalled();
  });

  it('does not call onNextItemFetched if next item fails to be fetched', async () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ nextItem: { uri: '/testing' } }}
        itemComponent={TestItem}
        onNextItemFetched={jest.fn()}
        updateLoader={jest.fn()}
        fetchPageDataAction={jest.fn()}
        fetchReactionsAction={jest.fn()}
      />
    );

    const instance = wrapper.instance();

    const error = new Error('Mocked error');
    instance.props.fetchPageDataAction.mockRejectedValueOnce(error);

    await instance.loadNextItem();

    // assert that updateLoader is called with the correct parameter
    expect(instance.props.updateLoader).toHaveBeenCalledWith({ displayLoader: false });
  });

  it('does not call onNextItemFetched if next item to be fetched', async () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ nextItem: { uri: '/testing' } }}
        itemComponent={TestItem}
        onNextItemFetched={jest.fn()}
        updateLoader={jest.fn()}
        fetchPageDataAction={jest.fn()}
        fetchReactionsAction={jest.fn()}
      />
    );

    const instance = wrapper.instance();

    const content = { nextItem: { uri: 'example_uri' } };
    instance.setState({ content });

    const responseData = { value: { data: { uid: 'some_uid' } } };
    instance.props.fetchPageDataAction.mockResolvedValueOnce(responseData);

    await instance.loadNextItem();

    // assert that fetchReactionsAction is called with the correct parameter
    expect(instance.props.fetchReactionsAction).toHaveBeenCalledWith({
      contentIds: ['some_uid'],
    });

    // assert that onNextItemFetched is called with the correct parameters
    expect(instance.props.onNextItemFetched).toHaveBeenCalledWith(
      responseData.value.data,
      expect.any(Function)
    );

    // check onNextItemFetched function was called
    expect(instance.props.onNextItemFetched).toBeCalled();
  });

  it('does not call onNextItemFetched if next item not fetched', async () => {
    const wrapper = shallow(
      <ContentListItem
        contentData={{ nextItem: { uri: '/testing' } }}
        itemComponent={TestItem}
        onNextItemFetched={jest.fn()}
        updateLoader={jest.fn()}
        fetchPageDataAction={jest.fn()}
        fetchReactionsAction={jest.fn()}
      />
    );

    const instance = wrapper.instance();

    const responseData = { value: undefined };
    instance.props.fetchPageDataAction.mockResolvedValueOnce(responseData);

    await instance.loadNextItem();

    // check onNextItemFetched function was called
    expect(instance.props.onNextItemFetched).not.toBeCalled();
  });
});
