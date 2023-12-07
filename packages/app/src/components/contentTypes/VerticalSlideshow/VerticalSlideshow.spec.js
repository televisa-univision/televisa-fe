/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import Features from '@univision/fe-commons/dist/config/features';
import { isVerticalTelevisaByUri } from '@univision/fe-commons/src/utils/header/helpers';

import VerticalSlideshow from '.';
import mockApiData from './__mocks__/mockSlideshowData.json';

const store = configureStore();

jest.useFakeTimers();
jest.mock('react-lazyload', () => jest.fn(c => c.children));
jest.mock('@univision/fe-commons/dist/assets/images/radio-default-360.jpg', () => jest.fn());
jest.mock('@univision/fe-commons/src/utils/header/helpers');
jest.mock('../HorizontalSlideshow/EndCard', () => {
  const EndCard = ({ onCardVisibility }) => {
    if (onCardVisibility) onCardVisibility();
    return <div>test</div>;
  };

  return EndCard;
});
jest.mock('../../base/GlobalWidget');

/** @test {VerticalSlideshow} */
describe('VerticalSlideshow', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<VerticalSlideshow pageData={mockApiData} />);
    expect(wrapper).toBeDefined();
  });

  it('should return null if no author present in the page data', () => {
    expect(VerticalSlideshow.getAuthor()).toEqual(null);
  });

  it('should return null if no tempauthors present in the page data', () => {
    expect(VerticalSlideshow.getTempAuthors()).toEqual(null);
  });

  it('should return data if tempauthors in the api response', () => {
    const tempAuthorsData = [
      {
        title: 'test',
        image: {
          renditions: {
            '16x9-sm': {
              href: 'test',
            },
          },
        },
      },
    ];
    const data = { ...mockApiData, tempAuthors: tempAuthorsData };

    expect(VerticalSlideshow.getTempAuthors(data)).toEqual(tempAuthorsData);
  });

  it('should return an author image if it exists', () => {
    const data = {
      ...mockApiData,
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
    };
    const author = VerticalSlideshow.getAuthor(data);

    expect(author[0].image.renditions['16x9-sm'].href).toEqual('test');
  });

  it('should not render slideshow component if there is no data', () => {
    const wrapper = shallow(<VerticalSlideshow />);
    expect(wrapper.find('VerticalSlideshow').length).toBe(0);
  });

  it('should render related tags at end of page when VSS is off', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    const wrapper = shallow(<VerticalSlideshow pageData={mockApiData} />);
    expect(wrapper.find('RelatedTags').length).toBe(1);
  });

  it('should render end card if there are next slideshows and VSS is off', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    const page = {
      ...mockApiData,
      data: mockApiData.data,
      title: '',
      uid: '',
      primaryTag: '',
      nextSlideshows: [{ title: 'title', test: 'test' }],
    };
    const wrapper = mount(<Provider store={store}><VerticalSlideshow pageData={page} /></Provider>);
    expect(wrapper.find('EndCard')).toHaveLength(1);
  });

  it('should not render end card if not nextSlideshows', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    const page = {
      ...mockApiData,
      data: {
        ...mockApiData.data,
        nextSlideshows: null,
      },
      title: '',
      uid: '',
      primaryTag: '',
    };
    const wrapper = mount(<Provider store={store}><VerticalSlideshow pageData={page} /></Provider>);
    expect(wrapper.find('EndCard')).toHaveLength(0);
  });

  it('should not render end card if there are no next slideshows and VSS is off', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    const page = {
      ...mockApiData,
      data: {
        ...mockApiData.data,
        nextSlideshows: null,
      },
      title: '',
      uid: '',
      primaryTag: '',
    };
    const wrapper = shallow(<VerticalSlideshow pageData={page} />);
    expect(wrapper.find('EndCard')).toHaveLength(0);
  });

  it('should scroll to the top when onRestartClick is called', () => {
    const scrollToSpy = jest.spyOn(global, 'scrollTo');
    VerticalSlideshow.onRestartClick();
    expect(scrollToSpy).toHaveBeenCalledTimes(1);
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });

  it('should return null if no Related Tags in the api response', () => {
    const relatedTags = VerticalSlideshow.renderRelatedTags();
    expect(relatedTags).toEqual(null);
  });

  it('should scroll to anchor if url has hash', () => {
    global.location.hash = '#2';
    const scrollIntoView = jest.fn();
    document.getElementById = () => ({ scrollIntoView });
    shallow(<VerticalSlideshow pageData={mockApiData} />);
    jest.runTimersToTime(550);
    expect(scrollIntoView).toHaveBeenCalled();
  });

  it('should not scroll to anchor if url has invalid hash', () => {
    global.location.hash = '#test';
    const scrollIntoView = jest.fn();
    document.getElementById = () => null;
    mount(<Provider store={store}><VerticalSlideshow pageData={mockApiData} /></Provider>);
    jest.runTimersToTime(550);
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it('should clear the timeout when component unmounts', () => {
    global.location.hash = '#2';
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    const wrapper = shallow(<VerticalSlideshow pageData={mockApiData} />);
    wrapper.instance().timeout = 1;
    wrapper.instance().componentWillUnmount();
    expect(clearTimeoutSpy).toHaveBeenCalledWith(1);
    clearTimeoutSpy.mockRestore();
  });

  it('should gather related slideshows correctly', () => {
    const acc = [{ uri: 'univision.com/first-slideshow' }];
    const next = { url: 'univision.com/second-slideshow' };
    const expected = [
      ...acc,
      { uri: next.url },
    ];

    expect(VerticalSlideshow.gatherSlideshows(acc, next)).toEqual(expected);
  });

  it('should have getContents return the correct information for vertical stitching', () => {
    const second = { url: 'univision.com/second-slideshow' };
    const third = { url: 'univision.com/third-slideshow' };
    const fourth = { url: 'univision.com/fourth-slideshow' };
    const fifth = { url: 'univision.com/fifth-slideshow' };
    const nextSlideshows = [second, third, fourth, fifth];
    const mainSlideshow = {
      nextSlideshows,
      uri: 'univision.com/main-slideshow',
    };
    const expected = nextSlideshows
      .reduce((acc, next) => [...acc, { uri: next.url }], [mainSlideshow]);

    expect(VerticalSlideshow.getContents(mainSlideshow)).toEqual(expected);
  });

  it('should have getContents return an array with the main slideshow when there are no other slideshows', () => {
    const mainSlideshow = { uri: 'univision.com/main-slideshow' };

    expect(VerticalSlideshow.getContents(mainSlideshow)).toEqual([mainSlideshow]);
  });

  it('should render the first stitched slideshow with the civic science widget', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(true);
    const renderCivicScienceSpy = jest.spyOn(VerticalSlideshow, 'renderCivicScience');
    const wrapper = shallow(<VerticalSlideshow pageData={mockApiData} />);

    wrapper.instance().renderStitchedSlideshow({
      content: mockApiData.data,
      depth: 1,
    });

    expect(renderCivicScienceSpy).toHaveBeenCalledTimes(1);
  });

  it('should render related stitched slideshows without the civic science widget', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(true);
    const renderCivicScienceSpy = jest.spyOn(VerticalSlideshow, 'renderCivicScience');
    const wrapper = shallow(<VerticalSlideshow pageData={mockApiData} />);

    wrapper.instance().renderStitchedSlideshow({
      content: mockApiData.data,
      depth: 2,
    });

    expect(renderCivicScienceSpy).not.toHaveBeenCalled();
  });

  it('should render the last slideshow with an end card', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(true);
    const wrapper = shallow(<VerticalSlideshow pageData={mockApiData} />);
    const renderEndCardSpy = jest.spyOn(wrapper.instance(), 'renderEndCard');

    wrapper.instance().renderStitchedSlideshow({
      content: mockApiData.data,
      depth: Features.slideshows.vertical.limit,
    });

    expect(renderEndCardSpy).toHaveBeenCalledTimes(1);
    expect(renderEndCardSpy).toHaveBeenCalledWith(mockApiData.data);
  });

  it('should only render a VerticalSlideshowWrapper when VSS is disabled', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    const wrapper = shallow(<VerticalSlideshow pageData={mockApiData} />);

    expect(wrapper.find('VerticalSlideshowWrapper').length).toBe(1);
    expect(wrapper.find('ContentList').length).toBe(0);
  });

  it('should render a list of vertical slideshows when VSS is enabled', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(true);
    const wrapper = shallow(<VerticalSlideshow pageData={mockApiData} />);

    expect(wrapper.find('ContentList').length).toBe(1);
  });

  it('should render a VerticalSlideshowWrapper when VSS is enabled', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    const wrapper = shallow(<VerticalSlideshow pageData={mockApiData} />);

    expect(wrapper.find('VerticalSlideshowWrapper').length).toBe(1);
  });

  it('should not render civic science widget at the end of page when VSS is enabled', () => {
    const renderCivicScienceSpy = jest.spyOn(VerticalSlideshow, 'renderCivicScience');
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(true);
    shallow(<VerticalSlideshow pageData={mockApiData} />);

    expect(renderCivicScienceSpy).not.toHaveBeenCalled();
  });

  it('should not render related tags at the end of page when VSS is enabled', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(true);
    const renderRelatedTagsSpy = jest.spyOn(VerticalSlideshow, 'renderRelatedTags');
    shallow(<VerticalSlideshow pageData={mockApiData} />);

    expect(renderRelatedTagsSpy).not.toHaveBeenCalled();
  });

  it('should call track event with slideshow depth when VSS is enabled', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(true);
    const trackSpy = jest.spyOn(SlideshowTracker, 'track');
    const page = {
      ...mockApiData,
      data: { ...mockApiData.data, nextSlideshows: [{ test: 'test' }] },
      title: '',
      uid: '',
      primaryTag: '',
    };

    const wrapper = shallow(<VerticalSlideshow pageData={page} />).instance();

    wrapper.handleEndCardVisibility();

    expect(trackSpy).toHaveBeenCalledWith(
      SlideshowTracker.events.change,
      expect.any(Object),
    );
  });

  it('should render the seconday tags if has it', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    const wrapper = mount(
      <Provider store={store}>
        <VerticalSlideshow pageData={mockApiData} />
      </Provider>,
    );
    expect(wrapper.find('TagLabel').text()).toBe(mockApiData.data.secondaryTags[0].name);
  });
  it('should render the primary tag if doesnt have secondary tags', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    const pageData = {
      ...mockApiData,
      site: 'www.lasestrellas.com',
      data: { ...mockApiData.data, secondaryTags: null },
    };
    const wrapper = mount(
      <Provider store={store}>
        <VerticalSlideshow pageData={pageData} />
      </Provider>,
    );
    expect(wrapper.find('TagLabel').text()).toBe(mockApiData.data.primaryTag.name);
  });
  it('should render the primaryTagTelevisa style', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    isVerticalTelevisaByUri.mockReturnValue(true);
    const pageData = {
      ...mockApiData,
      data: { ...mockApiData.data, secondaryTags: null },
    };

    const wrapper = mount(
      <Provider store={store}>
        <VerticalSlideshow pageData={pageData} />
      </Provider>,
    );

    expect(wrapper.find('TagLabel').prop('className').includes('primaryTagTelevisa')).toBe(true);
    isVerticalTelevisaByUri.mockRestore();
  });
});
