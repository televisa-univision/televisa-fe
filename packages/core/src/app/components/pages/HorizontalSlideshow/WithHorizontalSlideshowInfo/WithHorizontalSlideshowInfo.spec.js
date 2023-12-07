import React from 'react';
import { shallow } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';

import WithHorizontalSlideshowInfo from './WithHorizontalSlideshowInfo';

/**
 * Wrapped component
 * @param {string} profile - Sample WrappedComponent
 * @constructor
 */
const WrappedComponent = () => <div>WithHorizontalSlideshowInfo</div>;

describe('WithHorizontalSlideshowInfo', () => {
  it('should have the horizontal slideshow info properties as props', () => {
    const WrappedWithHorizontalSlideshowInfo = WithHorizontalSlideshowInfo(WrappedComponent);
    const wrapper = shallow(<WrappedWithHorizontalSlideshowInfo store={Store} />);
    const props = wrapper.find('WrappedComponent').props();

    expect(props.currentSlideshowIndex).toBe(0);
    expect(props.errorFetchingNextSlideshow).toBe(false);
    expect(props.fetchingNextSlideshow).toBe(false);
    expect(props.isFinalSlideshow).toBe(false);
    expect(props.isFirstSlideshow).toBe(true);
    expect(props.page).toEqual({});
    expect(props.slideshows).toEqual([]);
  });
});
