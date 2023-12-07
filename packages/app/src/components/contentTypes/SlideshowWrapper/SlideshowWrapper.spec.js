import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import preloadAll from 'jest-next-dynamic';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import { SlideshowWrapper, mapStateToProps, isUriEqual } from '.';

const store = configureStore();
const props = {
  pageData: { data: { slideshowType: 'verticalslideshow' } },
};
// mocks
jest.mock('../HorizontalSlideshow/SlideshowWrapper');
jest.mock('../../base/ContentList');

describe('SlideshowWrapper', () => {
  beforeAll(async () => {
    await preloadAll();
  });

  it('should renders as expected', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SlideshowWrapper {...props} />, div);
  });

  it('should not render slideshow component if there is no data', () => {
    const wrapper = shallow(<SlideshowWrapper />);
    expect(wrapper.find('VerticalSlideshowPage').length).toBe(0);
  });

  it('should render horizontal slideshow component if isStickySlideshow is enabled', () => {
    const pageData = {
      data: {
        slides: [{
          image: { title: '' },
        }],
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <SlideshowWrapper pageData={pageData} isStickySlideshow />
      </Provider>,
    );
    expect(wrapper.find('HorizontalSlideshow').length).toBe(1);
  });

  it('should render horizontal slideshow component if slideshowType is horizontal', () => {
    const pageData = {
      data: {
        slideshowType: 'horizontalslideshow',
        slides: [{
          image: { title: '' },
        }],
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <SlideshowWrapper pageData={pageData} />
      </Provider>,
    );
    expect(wrapper.find('HorizontalSlideshow').length).toBe(1);
  });

  it('should render horizontal slideshow component if slideshowType is reactions', () => {
    const pageData = {
      data: {
        slideshowType: 'reactionslideshow',
        slides: [{
          image: { title: '' },
        }],
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <SlideshowWrapper pageData={pageData} />
      </Provider>,
    );
    expect(wrapper.find('HorizontalSlideshow').length).toBe(1);
  });

  it('should render vertical slideshow component if data.vertical', () => {
    const pageData = {
      data: {
        slides: [{
          image: { title: '' },
        }],
        vertical: {},
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <SlideshowWrapper pageData={pageData} />
      </Provider>,
    );
    expect(wrapper.find('VerticalSlideshowPage').length).toBe(1);
  });

  it('should render horizontal slideshow component if not data.vertical', () => {
    const pageData = {
      data: {
        slides: [{
          image: { title: '' },
        }],
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <SlideshowWrapper pageData={pageData} />
      </Provider>,
    );
    expect(wrapper.find('HorizontalSlideshow').length).toBe(1);
  });
});

describe('mapStateProps', () => {
  it('should return the expected theme', () => {
    const mapProps = mapStateToProps({ horizontalSlideshow: { isStickySlideshow: true } });
    expect(mapProps.isStickySlideshow).toBe(true);
  });
});

describe('isUriEqual', () => {
  it('should return true if the next uri is equal', () => {
    const currentProps = { pageData: { data: { uri: '' } } };
    expect(isUriEqual(currentProps, currentProps)).toBe(true);
  });

  it('should return false if the next uri is not equal', () => {
    expect(isUriEqual({ pageData: { data: { uri: '' } } }, { pageData: { data: { uri: 'test' } } })).toBe(false);
  });
});
