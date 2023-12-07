import React from 'react';
import { shallow } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import * as horizontalSlideshowActions from '@univision/fe-commons/dist/store/actions/slideshow/horizontal-slideshow-actions';
import Features from '@univision/fe-commons/dist/config/features';

import mockApiData from 'server/proxy/api/page/__mocks__/mockSlideshowData.json';

import HorizontalSlideshow from './HorizontalSlideshow';

jest.mock('@univision/fe-commons/dist/assets/images/radio-default-360.jpg', () => jest.fn());

/** @test {HorizontalSlideshow} */
describe('HorizontalSlideshow ', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<HorizontalSlideshow page={mockApiData.data} />);
    expect(wrapper).toBeDefined();
  });

  it('should not render anything if page is not provided', () => {
    const wrapper = shallow(<HorizontalSlideshow page={null} />);

    expect(wrapper.find('Provider').length).toBe(0);
  });

  it('should render related tags', () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    const wrapper = shallow(<HorizontalSlideshow page={mockApiData.data} />);

    expect(wrapper.find('RelatedTags').length).toBe(1);
  });

  it('should not render related tags if does not have them', () => {
    const { data } = mockApiData;
    data.secondaryTags = [];
    const wrapper = shallow(<HorizontalSlideshow page={mockApiData.data} />);

    expect(wrapper.find('RelatedTags').length).toBe(0);
  });

  it('should try to set initial horizontal slideshows if HSS is enabled', () => {
    const dispatchSpy = jest.spyOn(Store, 'dispatch');
    const actionSpy = jest.spyOn(horizontalSlideshowActions, 'setInitialSlideshows');
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(true);
    shallow(<HorizontalSlideshow page={mockApiData.data} />);

    expect(dispatchSpy).toHaveBeenCalled();
    expect(actionSpy).toHaveBeenCalled();
  });

  it('should not try to set initial horizontal slideshows if HSS is disabled', () => {
    const dispatchSpy = jest.spyOn(Store, 'dispatch');
    const actionSpy = jest.spyOn(horizontalSlideshowActions, 'setInitialSlideshows');
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(false);
    shallow(<HorizontalSlideshow page={mockApiData.data} />);

    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(actionSpy).not.toHaveBeenCalled();
  });
});
