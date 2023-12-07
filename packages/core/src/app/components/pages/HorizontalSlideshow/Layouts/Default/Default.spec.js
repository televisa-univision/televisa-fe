import React from 'react';
import { shallow } from 'enzyme';
import dfpManager from '@univision/fe-commons/dist/utils/ads/dfpManager';
import Features from '@univision/fe-commons/dist/config/features';
import Store from '@univision/fe-commons/dist/store/store';

import Default from './Default';
import * as SlideshowHelpers from '../../helpers';
import Styles from './Default.scss';

/** @test {Default} */
describe('Default', () => {
  let props;

  beforeEach(() => {
    props = {
      actions: {
        togglePlaying: jest.fn(),
        goToPrevSlide: jest.fn(),
        goToNextSlide: jest.fn(),
        abortAutoplay: jest.fn(),
        onShareClick: jest.fn(),
      },
      activeSlideIndex: 0,
      activeSlideNumber: 1,
      endSlideIndex: 10,
      endSlideNumber: 11,
      isThereEndcard: true,
      meta: true,
      primaryTag: 'primary',
      slides: [{
        image: {
          credit: 'test',
        },
      }],
      sponsor: null,
      status: {
        running: false,
        progress: 0,
      },
      title: 'title',
      type: 'slideshow',
      uid: '123456',
    };
  });

  beforeAll(() => {
    jest.spyOn(Store, 'getState').mockImplementation(() => ({ dfpAds: { shouldRefresh: true } }));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<Default {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('should refresh the ads if new slide', () => {
    const wrapper = shallow(<Default {...props} />);
    spyOn(dfpManager, 'refreshAds');
    wrapper.instance().componentDidUpdate({ activeSlideIndex: 1 });
    expect(dfpManager.refreshAds).toHaveBeenCalled();
  });

  it('should not refresh the ads if no new slide', () => {
    const wrapper = shallow(<Default {...props} />);
    spyOn(dfpManager, 'refreshAds');
    wrapper.instance().componentDidUpdate({ activeSlideIndex: 0 });
    expect(dfpManager.refreshAds).not.toHaveBeenCalled();
  });

  it('should not abort autoplay if still in view', () => {
    const wrapper = shallow(<Default {...props} />);
    wrapper.instance().handleVisibilityChange(true);
    expect(props.actions.abortAutoplay).not.toHaveBeenCalled();
  });

  it('should abort autoplay if scrolled out of view', () => {
    const wrapper = shallow(<Default {...props} />);
    wrapper.instance().handleVisibilityChange(false);
    expect(props.actions.abortAutoplay).toHaveBeenCalled();
  });

  it('should do nothing if keydown doesnt match target key', () => {
    const wrapper = shallow(<Default {...props} />);
    wrapper.instance().handleKeyDown({ keyCode: 12 });
    expect(props.actions.goToPrevSlide).not.toHaveBeenCalled();
  });

  it('should do nothing if is being held down', () => {
    const wrapper = shallow(<Default {...props} />);
    const instance = wrapper.instance();
    instance.keyDown = true;
    instance.handleKeyDown({ keyCode: 12 });
    expect(props.actions.goToPrevSlide).not.toHaveBeenCalled();
  });

  it('should handle keydown left event', () => {
    const wrapper = shallow(<Default {...props} />);
    wrapper.instance().handleKeyDown({ keyCode: 37 });
    expect(props.actions.goToPrevSlide).toHaveBeenCalled();
  });

  it('should handle keydown right event', () => {
    const wrapper = shallow(<Default {...props} />);
    wrapper.instance().handleKeyDown({ keyCode: 39 });
    expect(props.actions.goToNextSlide).toHaveBeenCalled();
  });

  it('should allow keydown action to happen again', () => {
    const wrapper = shallow(<Default {...props} />);
    wrapper.instance().handleKeyUp();
    expect(wrapper.instance().keyDown).toEqual(false);
  });

  it('should not allow keydown action to happen if it is final slide of final slideshow', () => {
    const wrapper = shallow(
      <Default
        {...props}
        activeSlideIndex={10}
        endSlideIndex={10}
        isFinalSlideshow
      />
    );
    wrapper.instance().handleKeyDown({ keyCode: 39 });
    expect(props.actions.goToNextSlide).not.toHaveBeenCalled();
  });

  it('should tell the simple status component if it is the end of the slideshow', () => {
    const wrapper = shallow(
      <Default
        {...props}
        activeSlideIndex={10}
        endSlideIndex={10}
        isFinalSlideshow
      />
    );
    const Status = wrapper.instance().renderSimpleStatus();
    expect(Status.props.isEndOfSlideshow).toBe(true);
  });

  it('should tell the reaction status component if it is the end of the slideshow', () => {
    const wrapper = shallow(
      <Default
        {...props}
        reaction
        activeSlideIndex={10}
        endSlideIndex={10}
        isFinalSlideshow
      />
    );

    expect(wrapper.find('Status').props().isEndOfSlideshow).toBe(true);
  });

  it('should render ShareBar correctly', () => {
    const wrapper = shallow(<Default {...props} />);
    const ShareBar = wrapper.find('ShareBar');
    const shareBarProps = ShareBar.props();
    const expectedProps = {
      centerAll: true,
      className: Styles.shareBar,
      device: 'mobile',
      onClick: wrapper.instance().handleShareBarClick,
      sharingOptions: {},
      theme: 'rounded',
    };

    expect(shareBarProps).toMatchObject(expectedProps);
  });

  it('should have handleShareBarClick call handler correctly', () => {
    const handleShareBarClickSpy = jest.spyOn(SlideshowHelpers, 'handleShareBarClick');
    const wrapper = shallow(<Default {...props} />);

    wrapper.instance().handleShareBarClick('facebook');

    expect(handleShareBarClickSpy).toHaveBeenCalledTimes(1);
    expect(handleShareBarClickSpy).toHaveBeenCalledWith('facebook', {
      shareData: {
        title: props.title,
        uid: props.uid,
        primaryTag: props.primaryTag,
        type: props.type,
      },
      ...props,
    });
  });

  it('should have renderSimpleStatus render a SimpleStatus component', () => {
    const wrapper = shallow(<Default {...props} />);
    const Status = wrapper.instance().renderSimpleStatus(props);

    expect(Status.props.simple).toBe(true);
  });

  it('should render a status component if it is a reaction slideshow', () => {
    const wrapper = shallow(<Default {...props} reaction={{ type: 'reaction' }} />);
    const Status = wrapper.find('Status');

    expect(Status.exists()).toBe(true);
  });

  it('should render an expanded share bar for HSS on the end card', () => {
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(true);
    const wrapper = shallow(
      <Default
        {...props}
        activeSlideIndex={10}
        endSlideIndex={10}
        isFinalSlideshow
      />
    );

    expect(wrapper.find('.shareBarExpanded').length).toBe(1);
  });
});
