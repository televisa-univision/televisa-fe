import React from 'react';
import { shallow, mount } from 'enzyme';

import mockApiData from 'server/proxy/api/page/__mocks__/mockSlideshowData.json';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import Features from '@univision/fe-commons/dist/config/features';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import mockData from '@univision/fe-components-base/dist/components/widgets/CrossVerticalList/__mocks__/crossVerticalListMockData.json';
import VerticalSlideshow from './VerticalSlideshow';
import EndCard from '../HorizontalSlideshow/EndCard/EndCard';

jest.useFakeTimers();
jest.mock('react-lazyload', () => jest.fn(c => c.children));
jest.mock('@univision/fe-commons/dist/assets/images/radio-default-360.jpg', () => jest.fn());

/** @test {VerticalSlideshow} */
describe('VerticalSlideshow', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<VerticalSlideshow page={mockApiData} />);
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
        content: {
          renditions: {
            '16x9-sm': {
              href: 'test',
            },
          },
        },
      },
    ];
    const data = Object.assign({}, mockApiData, { tempAuthors: tempAuthorsData });

    expect(VerticalSlideshow.getTempAuthors(data)).toEqual(tempAuthorsData);
  });

  it('should return an author image if it exists', () => {
    const data = Object.assign({}, mockApiData, {
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
    });
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
    const wrapper = shallow(<VerticalSlideshow page={mockApiData.data} />);
    expect(wrapper.find('RelatedTags').length).toBe(1);
  });

  it('should render end card if there are next slideshows and VSS is off', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    const page = {
      ...mockApiData.data,
      title: '',
      uid: '',
      primaryTag: {},
      nextSlideshows: [{
        title: 'title', test: 'test', mainImage: {}, slideCount: 0, url: '',
      }],
    };
    const wrapper = mount(<VerticalSlideshow page={page} />);
    expect(wrapper.find(EndCard)).toBeDefined();
  });

  it('should not render end card if there are no next slideshows and VSS is off', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    const page = {
      ...mockApiData.data,
      title: '',
      uid: '',
      primaryTag: '',
      nextSlideshows: null,
    };
    const wrapper = shallow(<VerticalSlideshow page={page} />);
    expect(wrapper.find(EndCard)).toHaveLength(0);
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

  it('tracks ShareBar clicks when VSS is off', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    jest.spyOn(Features.actionBar, 'hasActionBar').mockReturnValue(false);
    const trackSpy = jest.spyOn(SocialTracker, 'track');
    const wrapper = shallow(<VerticalSlideshow page={mockApiData.data} />);
    wrapper.find('ShareBar').simulate('click', 'facebook');
    expect(trackSpy).toBeCalled();
    trackSpy.mockReset();
  });

  it('should scroll to anchor if url has hash', () => {
    global.location.hash = '#2';
    const scrollIntoView = jest.fn();
    document.getElementById = () => ({ scrollIntoView });
    shallow(<VerticalSlideshow page={mockApiData.data} />);
    jest.runTimersToTime(550);
    expect(scrollIntoView).toHaveBeenCalled();
  });

  it('should clear the timeout when component unmounts', () => {
    global.location.hash = '#2';
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    const wrapper = shallow(<VerticalSlideshow page={mockApiData.data} />);
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
    const wrapper = shallow(<VerticalSlideshow page={mockApiData.data} />);

    wrapper.instance().renderStitchedSlideshow({
      content: mockApiData.data,
      depth: 1,
    });

    expect(renderCivicScienceSpy).toHaveBeenCalledTimes(1);
  });

  it('should render related stitched slideshows without the civic science widget', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(true);
    const renderCivicScienceSpy = jest.spyOn(VerticalSlideshow, 'renderCivicScience');
    const wrapper = shallow(<VerticalSlideshow page={mockApiData.data} />);

    wrapper.instance().renderStitchedSlideshow({
      content: mockApiData.data,
      depth: 2,
    });

    expect(renderCivicScienceSpy).not.toHaveBeenCalled();
  });

  it('should render the last slideshow with an end card', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(true);
    const wrapper = shallow(<VerticalSlideshow page={mockApiData.data} />);
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
    const wrapper = shallow(<VerticalSlideshow page={mockApiData.data} />);

    expect(wrapper.find('VerticalSlideshowWrapper').length).toBe(1);
    expect(wrapper.find('ContentList').length).toBe(0);
  });

  it('should render a list of vertical slideshows when VSS is enabled', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(true);
    const wrapper = shallow(<VerticalSlideshow page={mockApiData.data} />);

    expect(wrapper.find('ContentList').length).toBe(1);
  });

  it('should not render civic science widget at the end of page when VSS is enabled', () => {
    const renderCivicScienceSpy = jest.spyOn(VerticalSlideshow, 'renderCivicScience');
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(true);
    shallow(<VerticalSlideshow page={mockApiData.data} />);

    expect(renderCivicScienceSpy).not.toHaveBeenCalled();
  });

  it('should not render related tags at the end of page when VSS is enabled', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(true);
    const renderRelatedTagsSpy = jest.spyOn(VerticalSlideshow, 'renderRelatedTags');
    shallow(<VerticalSlideshow page={mockApiData.data} />);

    expect(renderRelatedTagsSpy).not.toHaveBeenCalled();
  });

  it('should render the seconday tags if has it', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    const page = {
      ...mockApiData.data,
    };
    const wrapper = mount(<VerticalSlideshow page={page} />);
    expect(wrapper.find('TagLabel')).toBeDefined();
  });
  it('should render the primary tag if doesnt have secondary tags', () => {
    jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    const page = {
      ...mockApiData.data,
      secondaryTags: null,
    };
    const wrapper = mount(<VerticalSlideshow page={page} />);
    expect(wrapper.find('TagLabel')).toBeDefined();
  });
  it('should render cross vertical widget', () => {
    const page = {
      ...mockApiData.data,
      widgets: [mockData],
    };
    const wrapper = mount(<VerticalSlideshow page={page} />);
    expect(wrapper.find('.widgetsContainer')).toBeDefined();
  });

  describe('handleEndCardVisibility', () => {
    it('should call track event when end card is visible', () => {
      jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
      const trackSpy = jest.spyOn(SlideshowTracker, 'track');
      const data = Object.assign({}, mockApiData.data, { nextSlideshows: [{ test: 'test' }] });
      const wrapper = shallow(<VerticalSlideshow page={data} />);
      wrapper.find('VisibilitySensor').props().onChange(true, data);

      expect(trackSpy).toHaveBeenCalled();
    });

    it('should not call track event when end card is not visible', () => {
      jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
      const trackSpy = jest.spyOn(SlideshowTracker, 'track');
      const data = Object.assign({}, mockApiData.data, { nextSlideshows: [{ test: 'test' }] });
      const wrapper = shallow(<VerticalSlideshow page={data} />);
      wrapper.find('VisibilitySensor').props().onChange(false, data);

      expect(trackSpy).not.toHaveBeenCalled();
    });

    it('should call track event with slideshow depth when VSS is enabled', () => {
      jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(true);
      const trackSpy = jest.spyOn(SlideshowTracker, 'track');
      const data = Object.assign({}, mockApiData.data, { nextSlideshows: [{ test: 'test' }] });
      const wrapper = shallow(<VerticalSlideshow page={data} />);
      const instance = wrapper.instance();

      instance.handleEndCardVisibility(true, data);

      expect(trackSpy).toHaveBeenCalledWith(
        SlideshowTracker.events.change,
        expect.objectContaining({
          slideshowDepth: Features.slideshows.vertical.limit,
        }),
      );
    });
  });

  describe('trackVerticalSlideshowPageView', () => {
    it('should track a slideshow page view with the correct event data', () => {
      const trackSpy = jest.spyOn(SlideshowTracker, 'track').mockReturnValue(null);
      const eventData = {
        example: 'example',
        depth: 5,
      };

      VerticalSlideshow.trackVerticalSlideshowPageView(eventData);

      expect(trackSpy).toHaveBeenCalledWith(
        SlideshowTracker.events.slideshowPageView,
        {
          example: eventData.example,
          slideshowDepth: eventData.depth,
          overrides: {
            slideshow_type: 'vertical_slideshow',
          },
        }
      );
    });
  });

  describe('action bar', () => {
    const page = {
      ...mockApiData.data,
    };

    beforeEach(() => {
      jest.spyOn(Features.actionBar, 'hasActionBar').mockReturnValue(true);
      jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(true);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should show 2 action bars when the feature flags are enabled', () => {
      const wrapper = mount(<VerticalSlideshow page={page} />);
      expect(wrapper.find('ActionBar')).toBeDefined();
    });

    it('should show 1 action bar when the stitching feature flag is disabled', () => {
      jest.spyOn(Features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
      const wrapper = mount(<VerticalSlideshow page={page} />);
      expect(wrapper.find('ActionBar')).toBeDefined();
    });

    it('should not show action bars when the action bar feature flag is disabled', () => {
      jest.spyOn(Features.actionBar, 'hasActionBar').mockReturnValue(false);
      const wrapper = mount(<VerticalSlideshow page={page} />);
      expect(wrapper.find('ActionBar')).toHaveLength(0);
    });

    it('should call the social tracker when the onShareClick method is called', () => {
      const trackerSpy = jest.spyOn(SocialTracker, 'track').mockImplementation(() => jest.fn());

      const wrapper = shallow(<VerticalSlideshow page={page} />);
      const instance = wrapper.instance();
      instance.onShareButtonClick();

      expect(trackerSpy).toHaveBeenCalled();
    });
  });
});
