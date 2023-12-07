import React from 'react';
import { shallow, mount } from 'enzyme';
import Loadable from 'react-loadable';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import Carousel from '.';
import CarouselDesktop from './CarouselDesktop';
import TestItem from './examples/TestItem';

jest.mock('lodash.debounce', () => jest.fn(fn => fn));
jest.useFakeTimers();

const numberOfElements = 12;
const elements = Array.from({ length: numberOfElements }, (v, i) => (
  <TestItem key={`t${i}`} numberId={i} />
));

const itemsToBeDisplayed = {
  md: 5,
  xs: 2,
};

const props = {
  children: elements.map(e => e),
};

global.innerWidth = 500;

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllTimers();
});

describe('Carousel component tests', () => {
  it('returns null if the component has no childrens', () => {
    const wrapper = shallow(<Carousel />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('should return in mobile 12 slides', () => {
    const wrapper = mount(<Carousel {...props} isSnap />);
    expect(wrapper.find('.component').length).toBe(12);
  });

  it('should render with mobile peek', () => {
    const wrapper = mount(<Carousel {...props} mobilePeekPercentage={0.7} />);
    expect(wrapper.find('.component').length).toBe(12);
  });

  it('should set hasBreakpoints to true when itemsToBeDisplayed is a valid array', () => {
    const wrapper = mount(<Carousel {...props} itemsToBeDisplayed={itemsToBeDisplayed} />);
    const instance = wrapper.instance();
    expect(instance.hasBreakPoints).toBeTruthy();
  });

  it('should set numberOfItems to the default value when itemsToBeDisplayed is 0', () => {
    const itbd = {
      md: '5',
      xs: '0',
    };
    const wrapper = mount(<Carousel {...props} itemsToBeDisplayed={itbd} />);
    const instance = wrapper.instance();
    wrapper.setState({
      shoulRender: true,
    });
    instance.setupStates();
    wrapper.update();
    expect(instance.state.itemsOnScreen).toBe(instance.props.itemsToBeDisplayedDefault);
  });

  it("should set numberOfItems to the default value when the breakpoint doesn't exists", () => {
    const itbd = {
      chico: '0',
    };
    const wrapper = mount(<Carousel {...props} itemsToBeDisplayed={itbd} />);
    const instance = wrapper.instance();
    wrapper.setState({
      shoulRender: true,
    });
    instance.setupStates();
    wrapper.update();
    expect(instance.state.itemsOnScreen).toBe(instance.props.itemsToBeDisplayedDefault);
  });

  it("should not update if there's a callback", async () => {
    const wrapper = mount(<Carousel {...props} />);
    const instance = wrapper.instance();
    instance.callbackValidator = false;
    const shouldComponentUpdate = instance.shouldComponentUpdate();
    expect(shouldComponentUpdate).toBeFalsy();
  });

  it('should mark the first item as selected if selectedItem exists', async () => {
    const wrapper = mount(<Carousel {...props} selectedItem={0} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper
      .find(TestItem)
      .first()
      .props().isselected).toEqual('true');
  });

  it('should return the element without props if its not a valid react element', async () => {
    const wrapper = shallow(<Carousel>test</Carousel>);
    expect(wrapper.find('MobileCarousel').contains('test')).toBe(true);
  });

  it('should return in desktop 12 slides with partial showing', async () => {
    global.innerWidth = 1024;
    const wrapper = mount(<Carousel {...props} partialShowing />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find('.component').length).toBe(12);
  });

  it('should return in desktop 12 slides with pagination', async () => {
    global.innerWidth = 800;
    const wrapper = mount(<Carousel {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find('.component').length).toBe(12);
  });

  // Breakpoints
  it('should render in sm breakpoint', async () => {
    global.innerWidth = 800;
    const wrapper = mount(<Carousel {...props} />);
    const instance = wrapper.instance();
    await Loadable.preloadAll();
    wrapper.setState({
      shoulRender: true,
    });
    instance.setupStates();
    wrapper.update();
    expect(instance.currentBreakPoint.name).toBe('sm');
  });

  it('should render in md breakpoint', async () => {
    global.innerWidth = 1024;
    const wrapper = mount(<Carousel {...props} />);
    const instance = wrapper.instance();
    await Loadable.preloadAll();
    wrapper.setState({
      shoulRender: true,
    });
    instance.setupStates();
    wrapper.update();
    expect(instance.currentBreakPoint.name).toBe('md');
  });

  it('should render in md breakpoint with SSR on Desktop', async () => {
    delete global.innerWidth;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const wrapper = mount(<Carousel {...props} />);
    const instance = wrapper.instance();
    await Loadable.preloadAll();
    wrapper.setState({
      shoulRender: true,
    });
    instance.setupStates();
    wrapper.update();
    expect(instance.currentBreakPoint.name).toBe('md');
  });

  it('should render with SSR and overflow', async () => {
    delete global.innerWidth;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const wrapper = mount(<Carousel {...props} desktopOverflowVisible />);

    expect(wrapper.find('MobileCarousel').first().props().hasDesktopSSROverflow).toBeTruthy();
  });

  it('should render in lg breakpoint', async () => {
    global.innerWidth = 1280;
    const wrapper = mount(<Carousel {...props} desktopOverflowVisible />);
    const instance = wrapper.instance();
    await Loadable.preloadAll();
    wrapper.setState({
      shoulRender: true,
    });
    instance.setupStates();
    wrapper.update();
    expect(instance.currentBreakPoint.name).toBe('lg');
  });

  it('should render in xl breakpoint', async () => {
    global.innerWidth = 1440;
    const wrapper = mount(<Carousel {...props} />);
    const instance = wrapper.instance();
    await Loadable.preloadAll();
    wrapper.setState({
      shoulRender: true,
    });
    instance.setupStates();
    wrapper.update();
    expect(instance.currentBreakPoint.name).toBe('xl');
  });

  it('should use custom arrows', async () => {
    global.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    /* eslint-disable react/button-has-type */
    const leftArrow = <button className="customLeftArrow" />;
    const rightArrow = <button className="customRightArrow" />;

    const wrapper = mount(<Carousel {...props} leftArrow={leftArrow} rightArrow={rightArrow} />);
    jest.runAllTimers();
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find('.customLeftArrow').length).toBe(1);
    expect(wrapper.find('.customRightArrow').length).toBe(1);
  });

  it('should trigger prevItem when left arrow is clicked', async () => {
    global.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    spyOn(CarouselDesktop.prototype, 'prevAction').and.callThrough();
    const leftArrow = <button className="customLeftArrow" />;
    const wrapper = mount(<Carousel {...props} leftArrow={leftArrow} />);
    jest.runAllTimers();
    await Loadable.preloadAll();
    wrapper.update();
    wrapper.find('.customLeftArrow').simulate('click');
    expect(CarouselDesktop.prototype.prevAction).toHaveBeenCalledTimes(1);
  });

  it('should trigger nextItem when right arrow is clicked', async () => {
    global.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    spyOn(CarouselDesktop.prototype, 'nextAction').and.callThrough();
    const rightArrow = <button className="customRightArrow" />;
    const wrapper = mount(<Carousel {...props} rightArrow={rightArrow} />);
    jest.runAllTimers();
    await Loadable.preloadAll();
    wrapper.update();
    wrapper.find('.customRightArrow').simulate('click');
    expect(CarouselDesktop.prototype.nextAction).toHaveBeenCalledTimes(1);
  });

  it('should go to a specied page if goToItem is set ', async () => {
    global.innerWidth = 800;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    spyOn(CarouselDesktop.prototype, 'goToPage').and.callThrough();
    const wrapper = mount(<Carousel {...props} goToItem={5} usePagination />);
    jest.runAllTimers();
    wrapper.setState({
      viewWidth: 999,
    });
    await Loadable.preloadAll();
    wrapper.update();
    expect(CarouselDesktop.prototype.goToPage).toHaveBeenCalledTimes(1);
  });

  it('should send the Carousel to the desired page in mobile', async () => {
    global.innerWidth = 320;
    Store.dispatch(setPageData({
      device: 'mobile',
    }));
    const wrapper = mount(<Carousel {...props} goToItem={5} />);
    await Loadable.preloadAll();
    wrapper.update();
    jest.runOnlyPendingTimers();
    wrapper.update();
    expect(wrapper.instance().container.current.children[0].scrollLeft).toEqual(-320);
  });

  it('should use arrows in mobile if the props is true', async () => {
    global.innerWidth = 320;
    Store.dispatch(setPageData({
      device: 'mobile',
    }));
    const wrapper = mount(<Carousel {...props} goToItem={5} forceArrows snapToStart />);
    jest.runAllTimers();
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find(CarouselDesktop).length).toEqual(1);
  });

  it('should go to the last page if goToItem is higher than the number of pages ', async () => {
    global.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const style = {
      transform: 'translate3d(-2016px,0,0)',
      transition: 'transform 0.4s ease',
    };
    const wrapper = mount(<Carousel {...props} goToItem={666} />);
    jest.runAllTimers();
    wrapper.setState({ viewWidth: 1000 });
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find(CarouselDesktop).instance().state.currentScroll).toEqual(style);
  });

  it('should call goToItem when we change the prop', async () => {
    global.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    spyOn(CarouselDesktop.prototype, 'goToItem').and.callThrough();
    const wrapper = mount(<Carousel {...props} />);
    jest.runAllTimers();
    await Loadable.preloadAll();
    wrapper.update();
    wrapper.setProps({
      goToItem: 4,
    });
    expect(CarouselDesktop.prototype.goToItem).toHaveBeenCalledTimes(1);
  });

  it('should call gotoPage when we change the state', async () => {
    global.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    spyOn(CarouselDesktop.prototype, 'goToPage').and.callThrough();
    const wrapper = mount(<Carousel {...props} partialShowing />);
    jest.runAllTimers();
    await Loadable.preloadAll();
    wrapper.update();
    wrapper.setState({
      viewWidth: 999,
    });
    expect(CarouselDesktop.prototype.goToPage).toHaveBeenCalledTimes(1);
  });

  it('should call gotoPage without pagination', async () => {
    global.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    spyOn(CarouselDesktop.prototype, 'goToPage').and.callThrough();
    const wrapper = mount(<Carousel {...props} />);
    jest.runAllTimers();
    await Loadable.preloadAll();
    wrapper.update();
    wrapper.setState({
      viewWidth: 999,
    });
    expect(CarouselDesktop.prototype.goToPage).toHaveBeenCalledTimes(1);
  });

  it("should not use pagination in desktop if partial showing it's also set", async () => {
    global.innerWidth = 1440;
    spyOn(CarouselDesktop.prototype, 'goToPage').and.callThrough();
    const wrapper = mount(<Carousel {...props} partialShowing usePagination goToItem={5} />);
    jest.runAllTimers();
    wrapper.setState({
      viewWidth: 999,
    });
    await Loadable.preloadAll();
    wrapper.update();
    expect(CarouselDesktop.prototype.goToPage).toHaveBeenCalledTimes(1);
  });

  it("should not use pagination in desktop if partial showing it's also set", async () => {
    global.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    spyOn(CarouselDesktop.prototype, 'goToPage').and.callThrough();
    const wrapper = mount(<Carousel {...props} usePagination goToItem={4} />);
    jest.runAllTimers();
    wrapper.setState({
      viewWidth: 999,
    });
    await Loadable.preloadAll();
    wrapper.update();
    expect(CarouselDesktop.prototype.goToPage).toHaveBeenCalledTimes(1);
  });
});

describe('Carousel Methods', () => {
  it('should send the Carousel to the previous page', async () => {
    global.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    spyOn(CarouselDesktop.prototype, 'prevAction').and.callThrough();
    const wrapper = mount(<Carousel {...props} usePagination />);
    jest.runAllTimers();
    wrapper.setState({
      viewWidth: 999,
    });
    await Loadable.preloadAll();
    wrapper.update();
    wrapper.instance().goToPrev();
    expect(CarouselDesktop.prototype.prevAction).toHaveBeenCalledTimes(1);
  });

  it('should send the Carousel to the next page', async () => {
    global.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    spyOn(CarouselDesktop.prototype, 'nextAction').and.callThrough();
    const wrapper = mount(<Carousel {...props} usePagination />);
    jest.runAllTimers();
    wrapper.setState({
      viewWidth: 999,
    });
    await Loadable.preloadAll();
    wrapper.update();
    wrapper.instance().goToNext();
    expect(CarouselDesktop.prototype.nextAction).toHaveBeenCalledTimes(1);
  });
  it('should send the Carousel to a specific page in desktop', async () => {
    global.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    spyOn(CarouselDesktop.prototype, 'goToPage').and.callThrough();
    const wrapper = mount(<Carousel {...props} usePagination />);
    jest.runAllTimers();
    wrapper.setState({
      viewWidth: 999,
    });
    await Loadable.preloadAll();
    wrapper.update();
    wrapper.instance().goToPage(2);
    expect(CarouselDesktop.prototype.goToPage).toHaveBeenCalledTimes(1);
    wrapper.instance().goToPage(1);
    // Now without delay 'cos it no longer has lazyloading
    expect(CarouselDesktop.prototype.goToPage).toHaveBeenCalledTimes(2);
  });
});

describe('Carousel Callbacks', () => {
  it('should call numberOfPages', async () => {
    global.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const mockFn = jest.fn();
    const wrapper = mount(<Carousel {...props} usePagination afterPageChange={mockFn} />);
    jest.runAllTimers();
    wrapper.setState({
      viewWidth: 999,
    });
    await Loadable.preloadAll();
    wrapper.update();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should call prevAction callback', async () => {
    global.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const mockFn = jest.fn();
    const wrapper = mount(<Carousel {...props} usePagination prevAction={mockFn} />);
    jest.runAllTimers();
    wrapper.setState({
      viewWidth: 999,
    });
    await Loadable.preloadAll();
    wrapper.update();
    wrapper.instance().goToPrev();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should call nextAction callback', async () => {
    global.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const mockFn = jest.fn();
    const wrapper = mount(<Carousel {...props} usePagination nextAction={mockFn} />);
    jest.runAllTimers();
    wrapper.setState({
      viewWidth: 999,
    });
    await Loadable.preloadAll();
    wrapper.update();
    wrapper.instance().goToNext();
    expect(mockFn).toHaveBeenCalled();
  });
});

describe('Server Side Render and lazyload', () => {
  it('should load in Desktop with SSR', async () => {
    global.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const wrapper = mount(<Carousel {...props} itemsToBeDisplayed={itemsToBeDisplayed} />);
    jest.runAllTimers();
    const instance = wrapper.instance();
    wrapper.setState({
      viewWidth: 999,
    });
    await Loadable.preloadAll();
    wrapper.update();
    expect(instance.hasDesktopLazyLoad).toBeTruthy();
    instance.goToNext();
    jest.runAllTimers();
    wrapper.update();
    expect(instance.hasDesktopLazyLoad).toBeFalsy();
  });

  it('should load in mobile with SSR', async () => {
    global.innerWidth = 500;
    Store.dispatch(setPageData({
      device: 'mobile',
    }));
    spyOn(Carousel.prototype, 'lazyLoadScrolling').and.callThrough();
    spyOn(Carousel.prototype, 'removeLazyLoadScrolling').and.callThrough();
    const wrapper = mount(
      <Carousel {...props} itemsToBeDisplayed={itemsToBeDisplayed} snapToStart />
    );
    const instance = wrapper.instance();
    wrapper.setState({
      viewWidth: 500,
    });
    await Loadable.preloadAll();
    wrapper.update();
    expect(instance.hasMobileLazyLoad).toBeTruthy();
    wrapper.find('.mobileWrapper').simulate('touchstart');
    wrapper.find('.mobileWrapper').simulate('touchmove');
    expect(Carousel.prototype.lazyLoadScrolling).toHaveBeenCalledTimes(1);
    expect(Carousel.prototype.removeLazyLoadScrolling).toHaveBeenCalledTimes(1);
    expect(instance.hasMobileLazyLoad).toBeFalsy();
  });

  it('should handle ontouchendevent', async () => {
    const touchEndSpy = jest.fn();
    const wrapper = mount(
      <Carousel
        {...props}
        touchEndEvent={touchEndSpy}
        itemsToBeDisplayed={itemsToBeDisplayed}
      />
    );
    const instance = wrapper.instance();

    instance.handleOnTouchEnd();
    expect(touchEndSpy).toHaveBeenCalledTimes(1);
  });

  it('should setup states for touch end with scroll animated', async () => {
    const touchEndSpy = jest.fn();
    const wrapper = mount(
      <Carousel
        {...props}
        touchEndEvent={touchEndSpy}
        itemsToBeDisplayed={itemsToBeDisplayed}
        mobileScrollAnimated
        isSnap
        snapToStart
      />
    );
    const instance = wrapper.instance();
    wrapper.setState({
      isMobile: true,
    });

    instance.handleOnTouchEnd();
    expect(touchEndSpy).toHaveBeenCalledTimes(1);
    expect(instance.state.mobileRerender).toBeFalsy();
    expect(instance.state.doMobileAnimation).toBeFalsy();
  });

  it('should not handle ontouchendevent if handler is invalid', async () => {
    const wrapper = mount(
      <Carousel
        {...props}
        touchEndEvent={undefined}
        itemsToBeDisplayed={itemsToBeDisplayed}
      />
    );
    const instance = wrapper.instance();

    expect(() => {
      instance.handleOnTouchEnd();
    }).not.toThrow();
  });

  it('should call mobileGoToPage and sync with the page that was swiped', async () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Carousel
        {...props}
        itemsToBeDisplayed={itemsToBeDisplayed}
        afterPageChange={mockFn}
        snapToStart
      />
    );
    const instance = wrapper.instance();
    wrapper.setState({ mobileGoToPage: 4 });
    wrapper.update();
    instance.setMobileCurrentPage(3);
    const mobileGoToPageSpy = jest.spyOn(instance, 'mobileGoToPage');

    instance.mobileGoToPage(3);
    expect(mobileGoToPageSpy).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalled();
  });

  it('should ignore mobileGoToPage if it\'s already in that page', async () => {
    const wrapper = mount(
      <Carousel
        {...props}
        itemsToBeDisplayed={itemsToBeDisplayed}
      />
    );
    const instance = wrapper.instance();
    wrapper.setState({ mobileGoToPage: 3 });
    wrapper.update();
    instance.setMobileCurrentPage(3);
    instance.mobileGoToPage(3);

    expect(instance.state.mobileGoToPage).toEqual(3);
  });

  it('should call mobileGoToPage when on mobile', async () => {
    const wrapper = mount(
      <Carousel
        {...props}
        itemsToBeDisplayed={itemsToBeDisplayed}
      />
    );
    const instance = wrapper.instance();
    wrapper.setState({ isMobile: true });
    const mobileGoToPageSpy = jest.spyOn(instance, 'mobileGoToPage');

    instance.goToPage();
    expect(mobileGoToPageSpy).toHaveBeenCalledTimes(1);
  });
});

describe('Separator tests', () => {
  it('should load with separator option using an object', async () => {
    global.innerWidth = 500;
    Store.dispatch(setPageData({
      device: 'mobile',
    }));
    const separator = {
      xs: 10,
    };
    const wrapper = mount(<Carousel {...props} separator={separator} />);
    const instance = wrapper.instance();
    expect(instance.separatorWidth).toBe(10);
  });

  it('should load with the default value if the breakpoint doesn\'t exist', async () => {
    global.innerWidth = 500;
    Store.dispatch(setPageData({
      device: 'mobile',
    }));
    const separator = {
      xss: 10,
    };
    const wrapper = mount(<Carousel {...props} separator={separator} />);
    const instance = wrapper.instance();
    expect(instance.separatorWidth).toBe(instance.props.separatorDefaultValue);
  });
});
