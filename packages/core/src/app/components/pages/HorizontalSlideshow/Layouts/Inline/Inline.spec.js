import React from 'react';
import { shallow } from 'enzyme';
import dfpManager from '@univision/fe-commons/dist/utils/ads/dfpManager';

import Caption from '@univision/fe-components-base/dist/components/Caption';
import Inline from './Inline';
import Styles from './Inline.scss';

/** @test {Inline} */
describe('Inline', () => {
  const props = {
    slides: [{
      image: {
        credit: 'test',
      },
    }],
    actions: {
      togglePlaying: jest.fn(),
      goToPrevSlide: jest.fn(),
      goToNextSlide: jest.fn(),
      abortAutoplay: jest.fn(),
    },
    status: {
      running: false,
      progress: 0,
    },
    activeSlideIndex: 0,
    activeSlideNumber: 1,
    endSlideIndex: 10,
    endSlideNumber: 11,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<Inline {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('should refresh the ads if new slide and is lead', () => {
    const wrapper = shallow(<Inline {...props} isLead />);
    spyOn(dfpManager, 'refreshAds');
    wrapper.instance().componentDidUpdate({ activeSlideIndex: 1 });
    expect(dfpManager.refreshAds).toBeCalled();
  });

  it('should not refresh the ads if not the lead', () => {
    const wrapper = shallow(<Inline {...props} />);
    spyOn(dfpManager, 'refreshAds');
    wrapper.instance().componentDidUpdate({ activeSlideIndex: 1 });
    expect(dfpManager.refreshAds).not.toBeCalled();
  });

  it('should not abort autoplay if still in view', () => {
    const wrapper = shallow(<Inline {...props} />);
    wrapper.instance().handleVisibilityChange(true);
    expect(props.actions.abortAutoplay).not.toHaveBeenCalled();
  });

  it('should abort autoplay if scrolled out of view', () => {
    const wrapper = shallow(<Inline {...props} />);
    wrapper.instance().handleVisibilityChange(false);
    expect(props.actions.abortAutoplay).toHaveBeenCalled();
  });

  it('should render a caption if available', () => {
    const wrapper = shallow(<Inline {...props} activeSlideCaption="test" />);
    expect(wrapper.find(Caption)).toHaveLength(1);
  });

  it('should render a source if available', () => {
    const wrapper = shallow(<Inline {...props} meta={{ source: 'test' }} />);
    expect(wrapper.find(`div.${Styles.slideSource}`)).toHaveLength(1);
  });

  it('should render a FullWidth if isFullWidth', () => {
    const wrapper = shallow(<Inline {...props} isFullWidth />);
    expect(wrapper.find('FullWidth')).toHaveLength(1);
  });
});
