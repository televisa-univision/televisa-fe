import React from 'react';
import { shallow, mount } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import * as horizontalSlideshowActions from '@univision/fe-commons/dist/store/actions/slideshow/horizontal-slideshow-actions';
import Features from '@univision/fe-commons/dist/config/features';
import Swipeable from 'react-swipeable';
import Slider from './Slider';
import Styles from './Slider.scss';

/** @test {Slider} */
describe('Slider', () => {
  const props = {
    goToPrevSlide: jest.fn(),
    goToNextSlide: jest.fn(),
    actions: {
      togglePlaying: jest.fn(),
      restartSlideshow: jest.fn(),
    },
    slides: [{
      id: 0,
      image: {
        renditions: {
          foo: 'bar',
        },
      },
    }],
    activeSlideIndex: 1,
    endSlideIndex: 30,
    isThereEndcard: true,
    content: 'test',
    renderSimpleStatus: () => <button type="button" className="simpleStatus" />,
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<Slider {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('should render a swipeable slide', () => {
    const wrapper = shallow(<Slider {...props} />);
    wrapper.setState({ containerWidth: 800 });
    wrapper.instance().setContainerWidthAndHeight();
    expect(wrapper.find(Swipeable).exists()).toBe(true);
  });

  it('should go to slide on button click', () => {
    const wrapper = shallow(<Slider {...props} />);
    wrapper.setState({ containerWidth: 800 });
    wrapper.instance().setContainerWidthAndHeight();
    wrapper
      .find('button')
      .first()
      .simulate('click');
    expect(props.goToPrevSlide).toHaveBeenCalled();
    wrapper
      .find('button')
      .last()
      .simulate('click');
    expect(props.goToNextSlide).toHaveBeenCalled();
  });

  it('should render an ad slide', () => {
    const wrapper = shallow(<Slider activeSlideIndex={0} />);
    const instance = wrapper.instance();
    const slide = instance.renderSlide({ type: 'ad' }, 0);
    const Mock = () => slide;
    const mockWrapper = shallow(<Mock />);
    expect(mockWrapper.find('AdSlide').exists()).toBe(true);
  });

  it('should render an lead slide', () => {
    const wrapper = shallow(<Slider activeSlideIndex={1} />);
    const instance = wrapper.instance();
    const slide = instance.renderSlide({ type: 'leadImage' }, 0);
    const Mock = () => slide;
    const mockWrapper = shallow(<Mock />);
    expect(mockWrapper.name()).toEqual('LeadSlide');
  });

  it('should render an end slide', () => {
    const wrapper = shallow(<Slider
      activeSlideIndex={3}
      endSlideIndex={3}
      actions={props.actions}

    />);
    const instance = wrapper.instance();
    const slide = instance.renderSlide({
      type: 'end',
      mainImage: {
        foo: 'bar'
      },
      title: 'foo',
      url: 'foo',
      slideCount: 3
    }, 0);
    const Mock = () => slide;
    const mockWrapper = shallow(<Mock />);
    expect(mockWrapper.name()).toEqual('EndCard');
  });

  it('should have inlineSlide class in slide', () => {
    const wrapper = shallow(<Slider {...props} inline />);
    wrapper.instance().container.current = { offsetWidth: 800 };
    wrapper.instance().setContainerWidthAndHeight();
    wrapper.update();
    expect(wrapper.find(`div.${Styles.inlineSlide}`).length).toEqual(1);
  });

  it('should not render an end slide if activeSlideIndex !== endSlideIndex', () => {
    const wrapper = shallow(<Slider
      activeSlideIndex={2}
      endSlideIndex={3}
      actions={props.actions}
    />);
    const instance = wrapper.instance();
    const slide = instance.renderSlide({
      type: 'end',
      mainImage: {
        foo: 'bar'
      },
      title: 'foo',
      url: 'foo',
      slideCount: 3
    }, 0);
    const Mock = () => slide;
    const mockWrapper = shallow(<Mock />);
    expect(mockWrapper.name()).toEqual(null);
  });

  it('should not add class endContainer if isThereEndcard === false', () => {
    const wrapper = shallow(<Slider
      activeSlideIndex={3}
      endSlideIndex={3}
      actions={props.actions}
      isThereEndcard={false}
    />);
    expect(wrapper.find(`div.${Styles.endContainer}`).length).toEqual(0);
  });
  it('should add class endContainer if isThereEndcard === true', () => {
    const wrapper = shallow(<Slider
      activeSlideIndex={3}
      endSlideIndex={3}
      actions={props.actions}
      isThereEndcard
    />);
    expect(wrapper.find(`div.${Styles.endContainer}`).length).toEqual(1);
  });

  it('should not render a slide if does not meet lazyload conditions', () => {
    const wrapper = shallow(<Slider activeSlideIndex={0} />);
    const instance = wrapper.instance();
    const slide = instance.renderSlide({ type: 'ad' }, 4);
    expect(slide).toEqual(null);
  });

  it('should handle swiped right event', () => {
    const prevMock = jest.fn();
    const wrapper = shallow(<Slider activeSlideIndex={1} goToPrevSlide={prevMock} />);
    wrapper.instance().handleSwipedRight({}, 10, true);
    expect(prevMock).toHaveBeenCalled();
  });

  it('should do nothing on swiped right if conditions not met', () => {
    const prevMock = jest.fn();
    const wrapper = shallow(<Slider activeSlideIndex={1} goToPrevSlide={prevMock} />);
    wrapper.instance().handleSwipedRight({}, 0, false);
    expect(prevMock).not.toHaveBeenCalled();
  });

  it('should handle swiped right event on first slide of any slideshow other than the first one', () => {
    const prevMock = jest.fn();
    const wrapper = shallow(
      <Slider
        activeSlideIndex={0}
        goToPrevSlide={prevMock}
        isFirstSlideshow={false}
      />
    );
    wrapper.instance().handleSwipedRight({}, 10, true);
    expect(prevMock).toHaveBeenCalled();
  });

  it('should handle swiped left event', () => {
    const nextMock = jest.fn();
    const wrapper = shallow(<Slider
      activeSlideIndex={1}
      goToNextSlide={nextMock}
      endSlideIndex={30}
    />);
    wrapper.instance().handleSwipedLeft({}, 10, true);
    expect(nextMock).toHaveBeenCalled();
  });

  it('should do nothing on swiped left if conditions not met', () => {
    const nextMock = jest.fn();
    const wrapper = shallow(<Slider activeSlideIndex={1} goToNextSlide={nextMock} />);
    wrapper.instance().handleSwipedLeft({}, 0, false);
    expect(nextMock).not.toHaveBeenCalled();
  });

  it('should handle swiped left event if on final slide of any slideshow other than final one', () => {
    const nextMock = jest.fn();
    const wrapper = shallow(<Slider
      activeSlideIndex={10}
      endSlideIndex={10}
      isFinalSlideshow={false}
      goToNextSlide={nextMock}
    />);
    wrapper.instance().handleSwipedLeft({}, 0, true);
    expect(nextMock).toHaveBeenCalled();
  });

  it('should handle swiping right event', () => {
    const wrapper = shallow(<Slider activeSlideIndex={1} />);
    wrapper.instance().handleSwipingRight({}, 10);
    expect(wrapper.state().swipeOffset).toEqual(10);
  });

  it('should do nothing on swiping right event if at index 0', () => {
    const wrapper = shallow(<Slider activeSlideIndex={0} />);
    wrapper.instance().handleSwipingRight({}, 10);
    expect(wrapper.state().swipeOffset).toEqual(0);
  });

  it('should handle swiping left event', () => {
    const wrapper = shallow(<Slider activeSlideIndex={1} endSlideIndex={30} />);
    wrapper.instance().handleSwipingLeft({}, 10);
    expect(wrapper.state().swipeOffset).toEqual(-10);
  });

  it('should do nothing on swiping left event if at endIndex on inline slideshows', () => {
    const wrapper = shallow(<Slider activeSlideIndex={5} endSlideIndex={5} inline />);
    wrapper.instance().handleSwipingLeft({}, 10);
    expect(wrapper.state().swipeOffset).toEqual(0);
  });

  it('should do nothing on swiping left event if at final slide of final slideshow', () => {
    const wrapper = shallow(<Slider activeSlideIndex={5} endSlideIndex={5} isFinalSlideshow />);
    wrapper.instance().handleSwipingLeft({}, 10);
    expect(wrapper.state().swipeOffset).toEqual(0);
  });

  it('should add the resize event listener on mount', () => {
    global.addEventListener = jest.fn();
    const wrapper = shallow(<Slider />);
    wrapper.instance().componentDidMount();
    expect(global.addEventListener).toHaveBeenCalled();
  });

  it('should remove resize event listener on unmount', () => {
    global.removeEventListener = jest.fn();
    const wrapper = shallow(<Slider />);
    wrapper.instance().componentWillUnmount();
    expect(global.removeEventListener).toHaveBeenCalled();
  });

  it('should focus the container if not inline slideshow', () => {
    const wrapper = mount(<Slider />);
    const instance = wrapper.instance();
    spyOn(instance.container.current, 'focus');
    instance.componentDidMount();
    expect(instance.container.current.focus).toHaveBeenCalled();
  });

  it('should set the last slide index on update', () => {
    const wrapper = shallow(<Slider activeSlideIndex={1} />);
    const instance = wrapper.instance();
    instance.UNSAFE_componentWillUpdate({ activeSlideIndex: 2 });
    expect(instance.lastSlideIndex).toEqual(1);
  });

  it('should add the inline class if inline', () => {
    const wrapper = shallow(<Slider inline />);
    expect(wrapper.find(`div.${Styles.inline}`).length).toEqual(1);
  });

  it('should add the isFullWidth class if isFullWidth', () => {
    const wrapper = shallow(<Slider isFullWidth />);
    expect(wrapper.find(`div.${Styles.isFullWidth}`).length).toEqual(1);
  });

  it('should return transition if swipeOffset not 0', () => {
    const wrapper = shallow(<Slider activeSlideIndex={1} />);
    wrapper.setState({ swipeOffset: 10 });
    wrapper.instance().lastSlideIndex = 5;
    const styles = wrapper.instance().getTrackStyles();
    expect(styles.transition).toEqual('none');
  });

  it('should change the containerWidth if container offsetWidth changes', () => {
    const { slides, ...currentProps } = props;
    const wrapper = shallow(<Slider {...currentProps} slides={[{ id: 1, type: 'end' }]} />);
    wrapper.instance().container.current = { offsetWidth: 800 };
    wrapper.instance().setContainerWidthAndHeight();
    wrapper.update();
    expect(wrapper.state('containerWidth')).toEqual(800);
  });

  it('should hide the content if the image is clicked', () => {
    const wrapper = mount(<Slider {...props} />);
    wrapper.setState({ containerWidth: 800 });
    wrapper.find('.track').simulate('click');
    expect(wrapper.state('showContent')).toEqual(false);
  });

  it('should not hide content if image is clicked and device is equal to desktop', () => {
    Store.dispatch(setPageData({ device: 'desktop' }));
    const wrapper = mount(<Slider {...props} />);
    wrapper.setState({ containerWidth: 800 });
    wrapper.find('.track').simulate('click');
    expect(wrapper.state('showContent')).toEqual(true);
  });

  it('should not hide the content if the autoplay button is clicked', () => {
    Store.dispatch(setPageData({ device: 'mobile' }));
    const wrapper = mount(<Slider {...props} />);
    wrapper.setState({ containerWidth: 800 });
    wrapper.find('.simpleStatus').simulate('click');
    expect(wrapper.state('showContent')).toEqual(true);
  });

  it('should keep the initialContainerHeight when restart is clicked', () => {
    Store.dispatch(setPageData({ device: 'desktop' }));
    const wrapper = shallow(<Slider {...props} />);
    wrapper.instance().onRestartClick();
    expect(wrapper.state('containerHeight')).toBe(null);
  });

  it('should set the initialContainerHeight when restart is clicked and device !== desktop', () => {
    Store.dispatch(setPageData({ device: 'mobile' }));
    const wrapper = shallow(<Slider {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({ activeSlideIndex: undefined });
    instance.onRestartClick();
    expect(wrapper.state('containerHeight')).toBe(instance.initialContainerHeight);
  });

  it('should return the expected containerHeight state', () => {
    Store.dispatch(setPageData({ device: 'mobile' }));
    global.innerWidth = 375;
    global.innerHeight = 660;
    const wrapper = mount(<Slider {...props} />);
    expect(wrapper.state('containerHeight')).toBe(410);
  });

  it('should render previous slide button on any slideshow other than the first', () => {
    const wrapper = shallow(
      <Slider
        {...props}
        isFirstSlideshow={false}
      />
    );
    expect(wrapper.instance().renderPrevSlideButton()).toBeTruthy();
  });

  it('should not render previous slide button if on first slide of first slideshow', () => {
    const wrapper = shallow(
      <Slider
        {...props}
        activeSlideIndex={0}
        isFirstSlideshow
      />
    );
    expect(wrapper.instance().renderPrevSlideButton()).toBe(null);
  });

  it('should not render previous slide button if on first slide of inline slideshow', () => {
    const wrapper = shallow(
      <Slider
        {...props}
        activeSlideIndex={0}
        inline
      />
    );
    expect(wrapper.instance().renderPrevSlideButton()).toBe(null);
  });

  it('should not render next slide button if on final slide of final slideshow', () => {
    const wrapper = shallow(
      <Slider
        {...props}
        activeSlideIndex={10}
        endSlideIndex={10}
        isFinalSlideshow
      />
    );
    expect(wrapper.instance().renderNextSlideButton()).toBe(null);
  });

  it('should not render next slide button if on final slide of inline slideshow', () => {
    const wrapper = shallow(
      <Slider
        {...props}
        activeSlideIndex={10}
        endSlideIndex={10}
        inline
        isFinalSlideshow={false}
      />
    );
    expect(wrapper.instance().renderNextSlideButton()).toBe(null);
  });

  it('should set the canvas height to 100% for the end card', () => {
    const wrapper = mount(
      <Slider
        {...props}
        activeSlideIndex={10}
        endSlideIndex={10}
        isThereEndcard
      />
    );
    expect(wrapper.state('containerHeight')).toBe('100%');
  });

  it('should render error overlay if there was an error fetching a slideshow', () => {
    const wrapper = mount(
      <Slider
        {...props}
        errorFetchingNextSlideshow
      />
    );
    wrapper.setState({ containerWidth: 800 });
    expect(wrapper.findWhere(node => node.key() === 'error-overlay').exists()).toBe(true);
  });

  it('should render loading overlay while fetching next slideshow', () => {
    const wrapper = mount(
      <Slider
        {...props}
        fetchingNextSlideshow
      />
    );
    wrapper.setState({ containerWidth: 800 });
    expect(wrapper.findWhere(node => node.key() === 'loading-overlay').exists()).toBe(true);
  });

  it('should have onNextSlideshowClueClick dispatch the goToNextSlideshow action', () => {
    const dispatchSpy = jest.spyOn(Store, 'dispatch');
    const dispatchArg = jest.fn();
    jest.spyOn(horizontalSlideshowActions, 'goToNextSlideshow').mockReturnValue(dispatchArg);
    Slider.onNextSlideshowClueClick();
    expect(dispatchSpy).toHaveBeenCalledWith(dispatchArg);
  });

  it('should show next slideshow clue if on last slide of any slideshow but the final one', () => {
    jest.spyOn(Features.slideshows.horizontal, 'stitchingEnabled').mockReturnValue(true);
    const wrapper = mount(
      <Slider
        {...props}
        activeSlideIndex={4}
        endSlideIndex={4}
        isFinalSlideshow={false}
      />
    );
    wrapper.setState({ containerWidth: 800 });

    expect(wrapper.find('.showNextSlideshowClue').length).toEqual(1);
  });
});
