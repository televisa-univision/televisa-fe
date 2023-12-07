import React from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { cloneDeep } from '@univision/fe-commons/dist/utils/helpers';
import Features from '@univision/fe-commons/dist/config/features';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import comScoreManager from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';
import * as clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';

import mockApiData from '../__mocks__/mockHorizontalSlideshow.json';

import ConnectedSlideshowWrapper, { SlideshowWrapper } from '.';

const Store = configureStore();

jest.mock('react-loadable');
jest.mock('../SlideshowProvider', () => {
  /**
   * Dummy slideshow provider
   * @returns {JSX}
   */
  const SlideshowProvider = () => <div>provider</div>;

  return SlideshowProvider;
});
jest.mock('../Ads/AdBelowSlideshow', () => jest.fn(() => <div>ad below slideshow</div>));
jest.mock('../Slider');
jest.mock('../Status');
jest.mock('../Sidebar', () => {
  /**
   * Dummy sidebar component
   * @returns {JSX}
   */
  const Sidebar = () => <div>test</div>;

  return Sidebar;
});

const wrapperProps = {
  status: {},
  activeSlideIndex: 0,
  actions: {
    abortAutoplay: jest.fn(),
    goToPrevSlide: jest.fn(),
    goToNextSlide: jest.fn(),
    togglePlaying: jest.fn(),
    onShareClick: jest.fn(),
  },
};

/**
 * Creates layout mock function
 * @param {Object} wrapper the ReactWrapper from enzyme
 * @param {Object} props the props for the wrapper
 * @returns {function} the mock layout function
 */
const getMockLayout = (wrapper, props) => () => wrapper.instance()
  .renderLayout(props);

/**
 * Creates InjectLeadSlide mock function
 * @param {Object} wrapper the ReactWrapper from enzyme
 * @param {Object} props the props for the wrapper
 * @returns {function} the mock InjectLeadSlide function
 */
const getMockInjectLeadSlide = wrapper => () => wrapper.instance()
  .injectLeadSlide();

/** @test {SlideshowWrapper} */
describe('SlideshowWrapper', () => {
  const props = { device: 'mobile' };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={Store}>
        <ConnectedSlideshowWrapper {...props} initialPage={mockApiData.data} />
      </Provider>,
      div,
    );
  });

  it('should return default layout', () => {
    // avoid warning thrown from a child inside SlideshowProvider mock
    global.console.error = jest.fn();
    const wrapper = mount(<SlideshowWrapper initialPage={mockApiData.data} />);
    const Mock = getMockLayout(wrapper, wrapperProps);
    const mockWrapper = shallow(<Mock />);

    expect(mockWrapper.name()).toEqual('Default');
  });

  it('should return default layout when reaction type', () => {
    // avoid warning thrown from a child inside SlideshowProvider mock
    global.console.error = jest.fn();
    const initialPage = {
      ...mockApiData.data,
      ...{ type: 'reactionslideshow' },
    };
    const wrapper = mount(<SlideshowWrapper initialPage={initialPage} />);
    const Mock = getMockLayout(wrapper, wrapperProps);
    const mockWrapper = shallow(<Mock />);

    expect(mockWrapper.name()).toEqual('Default');
  });

  it('should return default layout for reaction', () => {
    // avoid warning thrown from a child inside SlideshowProvider mock
    global.console.error = jest.fn();
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={mockApiData.data} />);
    const Mock = getMockLayout(wrapper, wrapperProps);
    const mockWrapper = shallow(<Mock />);

    expect(mockWrapper.name()).toEqual('Default');
  });

  it('should return inline layout', () => {
    const initialPage = {
      ...mockApiData.data,
      type: 'inline',
    };
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={initialPage} />);
    const Mock = getMockLayout(wrapper, wrapperProps);
    const mockWrapper = shallow(<Mock />);

    expect(mockWrapper.name()).toEqual('Inline');
  });

  it('should return layout props', () => {
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={mockApiData.data} />);
    wrapper.instance().trackSlideChange = jest.fn();
    const layoutProps = wrapper.instance().getLayoutProps(wrapperProps);

    layoutProps.actions.goToPrevSlide('arrow');
    layoutProps.actions.goToPrevSlide(null);

    expect(wrapperProps.actions.goToPrevSlide).toHaveBeenCalled();

    layoutProps.actions.goToNextSlide('arrow');
    layoutProps.actions.goToNextSlide(null);

    expect(wrapperProps.actions.goToNextSlide).toHaveBeenCalled();
    expect(wrapper.instance().trackSlideChange).toHaveBeenCalled();
  });

  it('should have getLayoutProps return default values for activeSlideCaption and activeSlideNumber', () => {
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={mockApiData.data} />);
    const layoutProps = wrapper.instance().getLayoutProps({
      ...wrapperProps,
      activeSlideIndex: 100,
    });

    expect(layoutProps.activeSlideCaption).toBe('');
    expect(layoutProps.activeSlideNumber).toBeNull();
  });

  it('should track slide change', () => {
    let triggered = false;
    const wrapper = mount(<SlideshowWrapper device="mobile" initialPage={mockApiData.data} />);
    const data = wrapper.instance().getSlidesData();

    jest.spyOn(SlideshowTracker, 'track').mockImplementation((event) => {
      triggered = event === SlideshowTracker.events.change;
    });
    data.slides[1].type = 'end';
    data.slides[1].id = '';
    wrapper.instance().trackSlideChange(data.slides[1], data.endSlideNumber, 'arrow');

    expect(triggered).toEqual(true);
  });

  it('should track slide change for inline slideshow', () => {
    const initialPage = {
      ...mockApiData.data,
      type: 'inline',
    };
    let triggered = false;
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={initialPage} />);
    jest.spyOn(comScoreManager, 'beacon');
    const data = wrapper.instance().getSlidesData();

    jest.spyOn(SlideshowTracker, 'track').mockImplementation((event) => {
      triggered = event === SlideshowTracker.events.change;
    });
    wrapper.instance().trackSlideChange(data.slides[1], data.endSlideNumber, 'arrow');

    expect(triggered).toEqual(true);
    expect(comScoreManager.beacon).not.toHaveBeenCalled();
  });

  it('should track a slide change to the end slide', () => {
    const pageData = {
      ...mockApiData.data,
      type: 'default',
    };
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={pageData} isFinalSlideshow />);
    const data = wrapper.instance().getSlidesData();

    jest.spyOn(SlideshowTracker, 'track');
    wrapper.instance().trackSlideChange(data.slides[10], data.endSlideNumber, 'arrow');

    expect(SlideshowTracker.track).toHaveBeenCalled();
  });

  it('should not track slide change for undefined slide', () => {
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={mockApiData.data} />);
    const data = wrapper.instance().getSlidesData();

    jest.spyOn(SlideshowTracker, 'track');
    wrapper.instance().trackSlideChange(data.slides[100], data.endSlideNumber, 'arrow');

    expect(SlideshowTracker.track).not.toHaveBeenCalled();
  });

  it('should not track slide change for invalid slide', () => {
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={mockApiData.data} />);

    jest.spyOn(SlideshowTracker, 'track');
    wrapper.instance().trackSlideChange({}, 30, 'arrow');

    expect(SlideshowTracker.track).not.toHaveBeenCalled();
  });

  it('should call trackSlideChange when onAutoplay is called', () => {
    const wrapper = mount(<SlideshowWrapper initialPage={mockApiData.data} />);

    wrapper.instance().trackSlideChange = jest.fn();
    wrapper.instance().onAutoplay(0);

    expect(wrapper.instance().trackSlideChange).toHaveBeenCalled();
  });

  it('should track slide change with correct active slide number for inline slideshows', () => {
    const pageData = {
      ...mockApiData.data,
      type: 'inline',
    };
    const wrapper = mount(<SlideshowWrapper initialPage={pageData} />);
    const data = wrapper.instance().getSlidesData();
    const trackerSpy = jest.spyOn(SlideshowTracker, 'track');
    const activeSlideIndex = 1;
    wrapper
      .instance()
      .trackSlideChange(
        data.slides[activeSlideIndex],
        data.endSlideNumber,
        'arrow',
      );

    expect(trackerSpy)
      .toHaveBeenCalledWith(
        SlideshowTracker.events.change,
        expect.objectContaining({
          activeSlideNumber: activeSlideIndex + 1,
        }),
      );
  });

  it('should track slide change with correct active slide number for slideshows w/o opening card', () => {
    const wrapper = mount(<SlideshowWrapper device="desktop" initialPage={mockApiData.data} />);
    const data = wrapper.instance().getSlidesData();
    const trackerSpy = jest.spyOn(SlideshowTracker, 'track');
    const activeSlideIndex = 1;
    wrapper
      .instance()
      .trackSlideChange(
        data.slides[activeSlideIndex],
        data.endSlideNumber,
        'arrow',
      );

    expect(trackerSpy)
      .toHaveBeenCalledWith(
        SlideshowTracker.events.change,
        expect.objectContaining({
          activeSlideNumber: activeSlideIndex + 1,
        }),
      );
  });

  it('should track slide change with correct active slide number for slideshows with opening card', () => {
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={mockApiData.data} device="mobile" />);
    const data = wrapper.instance().getSlidesData();
    const trackerSpy = jest.spyOn(SlideshowTracker, 'track');
    const activeSlideIndex = 1;
    wrapper
      .instance()
      .trackSlideChange(
        data.slides[activeSlideIndex],
        data.endSlideNumber,
        'arrow',
      );

    expect(trackerSpy)
      .toHaveBeenCalledWith(
        SlideshowTracker.events.change,
        expect.objectContaining({
          activeSlideNumber: activeSlideIndex,
        }),
      );
  });

  it('should add ads plus end card correctly when HSS is disabled', () => {
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(false);
    const expected = 16;
    const pageData = {
      ...mockApiData.data,
      type: 'default',
    };
    const wrapper = mount(<SlideshowWrapper initialPage={pageData} />);
    const data = wrapper.instance().getSlidesData();

    // 12 slides + 3 ads + end card
    expect(data.slides.length).toEqual(expected);
  });

  it('should add end card if it is the final slideshow', () => {
    const pageData = {
      ...mockApiData.data,
      type: 'default',
      nextSlideshows: [{}, {}, {}, {}, {}],
    };
    const wrapper = mount(<SlideshowWrapper initialPage={pageData} currentSlideshowIndex={4} />);
    const data = wrapper.instance().getSlidesData();

    // 12 slides + 3 ads + 1 end card
    expect(data.slides.length).toBe(16);
  });

  it('should return activeSlide caption and number', () => {
    const wrapper = mount(<SlideshowWrapper device="desktop" initialPage={mockApiData.data} />);
    const data = wrapper.instance().getSlidesData();
    const layoutProps = wrapper.instance().getLayoutProps({
      ...wrapperProps,
      activeSlideIndex: 1,
    });

    expect(layoutProps.activeSlideCaption).toEqual(data.slides[1].caption);
    // opening card exists, so slide number is one more than slide index
    expect(layoutProps.activeSlideNumber).toEqual(2);
  });

  it('should not add the leadImage in desktop', () => {
    const wrapper = mount(<SlideshowWrapper device="desktop" initialPage={mockApiData.data} />);
    const { slides } = wrapper.instance().getSlidesData();

    expect(slides[0].type).not.toBe('leadImage');
  });

  it('should add the leadImage in mobile', () => {
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={mockApiData.data} device="mobile" />);
    const { slides } = wrapper.instance().getSlidesData();

    expect(slides[0].type).toEqual('leadImage');
  });

  it('should add slide index as slide ID if it is not one of the regular slideshow types', () => {
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(true);
    const pageData = {
      ...mockApiData.data,
      type: 'another type',
    };
    const wrapper = mount(
      <SlideshowWrapper {...props} initialPage={pageData} isFinalSlideshow={false} />
    );
    const data = wrapper.instance().getSlidesData();

    data.slides.forEach((slide, index) => {
      expect(slide.id).toEqual(index);
    });
  });

  it('should not add the leadImage in mobile if no Opencard rendition', () => {
    const initialPage = cloneDeep(mockApiData.data);
    delete initialPage.openingCard.renditions;
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={initialPage} />);
    const { slides } = wrapper.instance().getSlidesData();

    expect(slides[0].type).not.toBe('leadImage');
  });

  it('should return null if no author in the api response', () => {
    const initialPage = {
      ...mockApiData.data,
      ...{ authors: [] },
    };
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={initialPage} />);
    const author = wrapper.instance().getAuthor();

    expect(author).toEqual(null);
  });

  it('should return null if no tempAuthors in the api response', () => {
    const initialPage = {
      ...mockApiData.data,
      ...{ authors: [] },
    };
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={initialPage} />);
    const author = wrapper.instance().getTempAuthors();

    expect(author).toEqual(null);
  });

  it('should return an author image if it exists', () => {
    const initialPage = {
      ...mockApiData.data,
      ...{
        authors: [{
          title: 'test',
          image: {
            renditions: {
              '16x9-sm': {
                href: 'test',
              },
            },
          },
        }],
      },
    };
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={initialPage} />);
    const author = wrapper.instance().getAuthor();

    expect(author[0].image.renditions['16x9-sm'].href).toEqual('test');
  });

  it('should return an tempAuthor if it exists', () => {
    const initialPage = {
      ...mockApiData.data,
      ...{
        tempAuthors: [{
          title: 'Temp Author',
        }],
      },
    };
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={initialPage} />);
    const author = wrapper.instance().getTempAuthors();

    expect(author[0].title).toEqual('Temp Author');
  });

  it('should get reactionslideshow data correctly', () => {
    const initialPage = {
      ...mockApiData.data,
      ...{ type: 'reactionslideshow' },
      webAppPollOptions: [1, 2],
    };
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={initialPage} />);
    const data = wrapper.instance().getSlideshowData();

    expect(data.reaction).toBeDefined();
  });

  it('should not render slideshow component if there is no data', () => {
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={mockApiData.data} />);

    expect(wrapper.find('HorizontalSlideshow').length).toBe(0);
  });

  it('should correctly get slide image IDs', () => {
    const slides = [
      { image: { uid: '5c26c27d-7a02-4282-aca9-2a698b2585a4' } },
      { image: { uid: 'cb813265-547f-46aa-9fc0-8338a8689134' } },
      { image: { uid: 'fba9c00b-11f9-4cc2-bd11-6fc3daa6ce3c' } },
    ];
    const expected = [
      '2a698b2585a4',
      '8338a8689134',
      '6fc3daa6ce3c',
    ];

    expect(SlideshowWrapper.getSlideImageIds(slides)).toEqual(expected);
  });

  it('should return the initial page if the regular page is not valid', () => {
    const initialProps = {
      page: {},
      initialPage: { type: 'slideshow' },
      device: 'mobile',
    };

    expect(SlideshowWrapper.getPage(initialProps)).toEqual(initialProps.initialPage);
  });

  it('should return the regular page if is valid', () => {
    const initialProps = {
      page: { type: 'slideshow', slides: [{ uri: '/my-first-slide' }] },
      initialPage: { type: 'slideshow' },
      device: 'mobile',
    };

    expect(SlideshowWrapper.getPage(initialProps)).toEqual(initialProps.page);
  });

  it('should return props as the page is it is an inline slideshow', () => {
    const initialProps = {
      type: 'inline',
      otherProp: 'other',
      oneMore: 'oneMore',
      device: 'mobile',
    };

    expect(SlideshowWrapper.getPage(initialProps)).toEqual(initialProps);
  });

  it('should have injectLeadSlide return an empty object if no page exists', () => {
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={mockApiData.data} />);
    const Mock = getMockInjectLeadSlide(wrapper, wrapperProps);
    const mockWrapper = shallow(<Mock />);
    expect(mockWrapper).toEqual({});
  });

  it('should render Head on client side if HSS is enabled', () => {
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(true);
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={mockApiData.data} />);

    expect(wrapper.find(Head).length).toBe(1);
  });

  it('should not render Head on the server side', () => {
    const windowObject = global.window;
    delete global.window;
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(true);
    const wrapper = shallow(<SlideshowWrapper {...props} initialPage={mockApiData.data} />);

    expect(wrapper.find(Head).length).toBe(0);
    global.window = windowObject;
  });

  it('should not render Head if HSS is disabled', () => {
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(false);
    const wrapper = mount(<SlideshowWrapper {...props} initialPage={mockApiData.data} />);

    expect(wrapper.find(Head).length).toBe(0);
  });

  it('should render nothing and report error when no slides data is retrieved from the api', () => {
    const clientLoggingSpy = jest.spyOn(clientLogging, 'clientLevelLogging').mockImplementation(jest.fn());
    const wrapper = mount(
      <SlideshowWrapper
        {...props}
        initialPage={{ ...mockApiData.data, slides: null }}
      />,
    );

    expect(clientLoggingSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.find('SlideshowProvider').length).toBe(0);
  });

  it('should set end slide number to be one less than slides length when opening card exists', () => {
    const wrapper = shallow(<SlideshowWrapper initialPage={mockApiData.data} device="mobile" />);
    const data = wrapper.instance().getSlidesData();

    // original length is 13: 12 slides + 1 opening
    expect(data.endSlideNumber).toBe(12);
  });
});
