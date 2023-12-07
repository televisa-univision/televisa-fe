import React from 'react';
import { shallow } from 'enzyme';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as horizontalSlideshowActions from '@univision/fe-commons/dist/store/actions/slideshow/horizontal-slideshow-actions';
import Features from '@univision/fe-commons/dist/config/features';

import mockApiData from './__mocks__/mockHorizontalSlideshow.json';

import HorizontalSlideshow from '.';

const store = configureStore();

/** @test {HorizontalSlideshow} */
describe('HorizontalSlideshow ', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<HorizontalSlideshow pageData={mockApiData} />);
    expect(wrapper).toBeDefined();
  });

  it('should not render anything if page is not provided', () => {
    const wrapper = shallow(<HorizontalSlideshow pageData={null} />);

    expect(wrapper.find('Provider').length).toBe(0);
  });

  it('should render related tags', () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    const wrapper = shallow(<HorizontalSlideshow pageData={mockApiData} />);

    expect(wrapper.find('RelatedTags').length).toBe(1);
  });

  it('should not render related tags if does not have them', () => {
    mockApiData.data.secondaryTags = [];
    const wrapper = shallow(<HorizontalSlideshow pageData={mockApiData} />);

    expect(wrapper.find('RelatedTags').length).toBe(0);
  });

  it('should not try to set initial horizontal slideshows if HSS is disabled', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const actionSpy = jest.spyOn(horizontalSlideshowActions, 'setInitialSlideshows');
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(false);
    shallow(<HorizontalSlideshow pageData={mockApiData} />);

    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(actionSpy).not.toHaveBeenCalled();
  });
});
