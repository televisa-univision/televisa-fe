import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import configureStore from '../../../../store/configureStore';
import * as Actions from '../../../../store/actions/ads-actions';
import WithNativeContent, { areStatePropsEqual } from './WithNativeContent';

const initialState = {
  dfpAds: {
    nativeCalled: true,
    ads: [],
  },
  page: {
    data: { type: 'section' },
  },
};
const store = configureStore(initialState);
const PromoContent = {
  uri: 'https://www.univision.com/',
  type: 'slideshow',
  title: 'Test',
  shortTitle: 'just testing',
  description: 'Descubre quienes son los nominados en las diferentes categorías y vota por tus locutores favoritos.',
  shortDescription: 'Descubre quienes son los nominados en las diferentes categorías y vota por tus locutores favoritos.',
  image: {
    renditions: {
      original: {
        href: 'https://cdn3.uvnimg.com/04/91/56e1f57d4d3699062bccc3c0c420/570012daabe54ee7bfed05aace5cb775',
        width: 1920,
        height: 1080,
      },
      '16x9': {
        href: 'https://cdn4.uvnimg.com/dims4/default/1454b76/2147483647/thumbnail/1240x698/quality/75/?url=https%3A%2F%2Fcdn3.uvnimg.com%2F04%2F91%2F56e1f57d4d3699062bccc3c0c420%2F570012daabe54ee7bfed05aace5cb775',
        width: 1240,
        height: 698,
      },
      '16x9-extended': {
        href: 'https://cdn4.uvnimg.com/dims4/default/b8ef363/2147483647/thumbnail/1440x810/quality/75/?url=https%3A%2F%2Fcdn3.uvnimg.com%2F04%2F91%2F56e1f57d4d3699062bccc3c0c420%2F570012daabe54ee7bfed05aace5cb775',
        width: 1440,
        height: 810,
      },
      '16x9-med': {
        href: 'https://cdn4.uvnimg.com/dims4/default/a6d6a74/2147483647/thumbnail/400x225/quality/75/?url=https%3A%2F%2Fcdn3.uvnimg.com%2F04%2F91%2F56e1f57d4d3699062bccc3c0c420%2F570012daabe54ee7bfed05aace5cb775',
        width: 400,
        height: 225,
      },
      '16x9-mobile': {
        href: 'https://cdn4.uvnimg.com/dims4/default/d375d88/2147483647/thumbnail/480x270/quality/75/?url=https%3A%2F%2Fcdn3.uvnimg.com%2F04%2F91%2F56e1f57d4d3699062bccc3c0c420%2F570012daabe54ee7bfed05aace5cb775',
        width: 480,
        height: 270,
      },
      '16x9-sm': {
        href: 'https://cdn4.uvnimg.com/dims4/default/51dc300/2147483647/thumbnail/246x138/quality/75/?url=https%3A%2F%2Fcdn3.uvnimg.com%2F04%2F91%2F56e1f57d4d3699062bccc3c0c420%2F570012daabe54ee7bfed05aace5cb775',
        width: 246,
        height: 138,
      },
    },
  },
  primaryTag: {
    name: 'Radio',
    link: 'http://www.univision.com/temas/entretenimiento',
  },
  primaryTopic: 'Radio',
};

/**
 * Dummy component
 * @param {Object} props of the component
 * @returns {Object}
 */
const PromoItem = ({ title }) => <div>{title}</div>;
PromoItem.propTypes = {
  title: PropTypes.string.isRequired,
};

jest.useFakeTimers();
store.getState = jest.fn();
store.dispatch = jest.fn();

beforeEach(() => {
  store.getState.mockReturnValue(initialState);
});

afterEach(() => {
  store.dispatch.mockClear();
});

/** @test {WithNativeContent} */
describe('WithNativeContent ', () => {
  it('should render without crashing', () => {
    const PromoWithNativeContent = WithNativeContent(PromoItem);
    const div = document.createElement('div');
    store.getState.mockReturnValue({
      dfpAds: {
        ads:
      [
        {
          uid: 'test',
          didRender: true,
          isEmpty: false,
          slotID: 'test',
        },
      ],
      },
    });
    ReactDOM.render(
      <Provider store={store}>
        <PromoWithNativeContent {...PromoContent} showNative onDevice="tablet" actualDevice="tablet" />
      </Provider>,
      div
    );
  });

  it('should areStatePropsEqual check props to prevent re-renders', () => {
    const baseProps = {
      isNativeAdEmpty: false,
      isNativeAdCalled: true,
    };
    const diffProps = {
      isNativeAdEmpty: true,
      isNativeAdCalled: true,
    };

    expect(areStatePropsEqual(baseProps, baseProps)).toBe(true);
    expect(areStatePropsEqual(baseProps, diffProps)).toBe(false);
  });
});

describe('shouldContentDisplay ', () => {
  it('should display content when native is empty', () => {
    store.getState.mockReturnValue({
      dfpAds: {
        nativeCalled: true,
        isNativeAdEmpty: true,
      },
    });
    const PromoWithNativeContent = WithNativeContent(PromoItem);
    const wrapper = mount(
      <PromoWithNativeContent
        {...PromoContent}
        onDevice="tablet"
        actualDevice="tablet"
        showNative
        store={store}
      />
    );
    const nativeAdInstance = wrapper
      .children().first().children().first()
      .instance();
    expect(nativeAdInstance.shouldContentDisplay()).toBe(true);
  });
  it('should not display content when native is not empty', () => {
    store.getState.mockReturnValue({
      ...initialState,
      dfpAds: {
        isNativeAdEmpty: false,
      },
    });
    const PromoWithNativeContent = WithNativeContent(PromoItem);
    const wrapper = mount(<PromoWithNativeContent
      {...PromoContent}
      showNative
      oneTimeCall={false}
      onDevice="tablet"
      actualDevice="tablet"
      store={store}
    />);
    jest.runAllTimers();
    const nativeAdInstance = wrapper
      .children().first().children().first()
      .instance();
    expect(nativeAdInstance.shouldContentDisplay()).toBe(false);
  });

  it('should not have a wrapper for non native ad component', () => {
    const PromoWithNativeContent = WithNativeContent(PromoItem);
    const wrapper = mount(<PromoWithNativeContent
      {...PromoContent}
      store={store}
    />);
    jest.runAllTimers();
    expect(wrapper.find('WithNativeContent__ContentWrapper')).toHaveLength(0);
  });
});

describe('displayAd ', () => {
  it('should return null if store dfpAds.nativeCalled is true', () => {
    const PromoWithNativeContent = WithNativeContent(PromoItem);
    const wrapper = mount(<PromoWithNativeContent
      {...PromoContent}
      oneTimeCall={false}
      showNative
      onDevice="tablet"
      actualDevice="tablet"
      store={store}
    />);
    jest.runAllTimers();
    const nativeAdInstance = wrapper
      .children().first().children().first()
      .instance();
    nativeAdInstance.displayAd();
    expect(nativeAdInstance.displayAd()).toBe(null);
  });
  it('should return null if page type is empty', () => {
    store.getState.mockReturnValue({
      page: { data: { type: '' } },
    });
    const PromoWithNativeContent = WithNativeContent(PromoItem);
    const wrapper = mount(
      <PromoWithNativeContent
        {...PromoContent}
        oneTimeCall={false}
        showNative
        onDevice="tablet"
        actualDevice="tablet"
        store={store}
      />
    );
    jest.runAllTimers();
    const nativeAdInstance = wrapper
      .children().first().children().first()
      .instance();
    expect(nativeAdInstance.displayAd()).toBe(null);
  });
  it('should return null if not a section page', () => {
    store.getState.mockReturnValue({
      page: { data: { type: 'article' } },
    });
    const PromoWithNativeContent = WithNativeContent(PromoItem);
    const wrapper = mount(<PromoWithNativeContent
      {...PromoContent}
      oneTimeCall={false}
      showNative
      onDevice="tablet"
      actualDevice="tablet"
      store={store}
    />);
    jest.runAllTimers();
    const nativeAdInstance = wrapper
      .children().first().children().first()
      .instance();
    nativeAdInstance.displayAd();
    expect(nativeAdInstance.displayAd()).toBe(null);
  });
  it('should not return null if store dfpAds.nativeCalled is undefined', () => {
    store.getState.mockReturnValue({
      ...initialState,
      dfpAds: null,
    });
    const PromoWithNativeContent = WithNativeContent(PromoItem);
    const wrapper = mount(<PromoWithNativeContent
      {...PromoContent}
      showNative
      onDevice="tablet"
      actualDevice="tablet"
      store={store}
    />);
    jest.runAllTimers();
    const nativeAdInstance = wrapper
      .children().first().children().first()
      .instance();
    nativeAdInstance.displayAd();
    expect(nativeAdInstance.displayAd()).not.toBe(null);
  });
  it('should not dispatch store if oneTimeCall is false', () => {
    store.getState.mockReturnValue(null);
    const PromoWithNativeContent = WithNativeContent(PromoItem);
    const wrapper = mount(<PromoWithNativeContent
      {...PromoContent}
      oneTimeCall={false}
      showNative
      onDevice="tablet"
      actualDevice="tablet"
      store={store}
    />);
    jest.runAllTimers();
    const dispatchCalledTimes = store.dispatch.mock.calls.length;
    const nativeAdInstance = wrapper
      .children().first().children().first()
      .instance();
    nativeAdInstance.displayAd();
    expect(store.dispatch.mock.calls.length).toBe(dispatchCalledTimes);
  });
  it('should remove timer on unmount', () => {
    jest.spyOn(global, 'clearTimeout');
    const PromoWithNativeContent = WithNativeContent(PromoItem);
    const wrapper = mount(<PromoWithNativeContent
      {...PromoContent}
      oneTimeCall={false}
      showNative
      onDevice="tablet"
      actualDevice="tablet"
      store={store}
    />);
    wrapper.unmount();
    expect(global.clearTimeout).toHaveBeenCalled();
  });
  it('should call setNativeCalled(false) only if showNative=true', () => {
    const PromoWithNativeContent = WithNativeContent(PromoItem);
    const wrapper = mount(<PromoWithNativeContent
      {...PromoContent}
      oneTimeCall={false}
      showNative
      onDevice="tablet"
      actualDevice="tablet"
      store={store}
    />);
    wrapper.unmount();
    expect(store.dispatch).toHaveBeenCalledWith(Actions.setNativeCalled(false));
  });

  it('should not call setNativeCalled(false) showNative=false', () => {
    const PromoWithNativeContent = WithNativeContent(PromoItem);
    const wrapper = mount(<PromoWithNativeContent
      {...PromoContent}
      oneTimeCall={false}
      showNative={false}
      onDevice="tablet"
      actualDevice="tablet"
      store={store}
    />);
    wrapper.unmount();
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
