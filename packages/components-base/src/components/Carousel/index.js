import React from 'react';
import PropTypes from 'prop-types';

import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import {
  exists,
  hasKey,
  getKey,
  isValidObject,
  isValidFunction,
} from '@univision/fe-commons/dist/utils/helpers';
import { asDeferrer } from '@univision/fe-commons/dist/utils/deferrer';

import MobileCarousel from './MobileCarousel';
import Styles from './Carousel.scss';

/**
 * Carousel component
 */
@asDeferrer
class Carousel extends React.Component {
  /**
   * bind methods and setup component
   * @param {Object} props the component props
   */
  constructor(props) {
    super(props);
    this.state = {
      isMobile: getDevice(Store) !== 'desktop',
      viewWidth: null,
      shouldRender: null,
      itemsOnScreen: 0,
      numberOfItems: exists(props.children)
        ? React.Children.count(props.children)
        : 0,
      mobileRerender: false,
      doMobileAnimation: false,
    };
    this.DesktopComponent = null;
    this.hasBreakPoints = isValidObject(props.itemsToBeDisplayed);
    this.hasBreakPointsSeparators = isValidObject(props.separator);
    this.currentBreakPointCache = null;

    // Setup callbacks
    this.paginationStatusCallback = this.paginationStatusCallback.bind(this);
    this.prevActionCallback = this.prevActionCallback.bind(this);
    this.nextActionCallback = this.nextActionCallback.bind(this);
    // Setups methods
    this.goToPrev = this.goToPrev.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goToPage = this.goToPage.bind(this);

    this.callbackValidator = true;
    // Mobile lazyload
    this.hasMobileLazyLoad = false;
    this.hasDesktopLazyLoad = false;

    this.lazyLoadScrollingStart = this.lazyLoadScrollingStart.bind(this);
    this.lazyLoadScrolling = this.lazyLoadScrolling.bind(this);
    this.handleOnTouchEnd = this.handleOnTouchEnd.bind(this);

    this.delayedAction = null;
    this.slidesRefs = new Map();
    this.carousel = React.createRef();
    this.container = React.createRef();

    this.mobileCurrentPage = null;
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    const { goToItem, forceArrows } = this.props;
    // Let's defer the update of the style so the main thread can complete
    // any pending paint, redraw, etc
    this.defer(() => {
      const isMobile = getDevice(Store) === 'mobile';
      if (!isMobile || forceArrows) {
        this.setupStates();
      } else if (isMobile && goToItem > 0 && !forceArrows) {
        this.mobileGoToPage(goToItem);
      }
    });
  }

  /**
   * Should component update logic
   * @returns {bool}
   */
  shouldComponentUpdate() {
    if (!this.callbackValidator) {
      this.callbackValidator = true;
      return false;
    }

    return this.callbackValidator;
  }

  /**
   * componentDidUpdate method
   */
  componentDidUpdate() {
    if (this.carousel.current && this.delayedAction) {
      this.carousel.current.goToPage(this.delayedAction);
      this.delayedAction = null;
    }
  }

  /**
   * Evaluate the current breakpoint and returns it
   * @returns {string}
   */
  get currentBreakPoint() {
    if (exists(this.currentBreakPointCache)) {
      return this.currentBreakPointCache;
    }
    /* istanbul ignore next: while building window is not a valid node element */
    const width = getKey(global, 'window.innerWidth', 0);
    const isSSR = !width;
    let breakpoint;
    // We're using if instead of switch based on browsers performance tests
    // http://jsfiddle.net/some/HKdug/
    if (width >= 768 && width < 1024) {
      breakpoint = { name: 'sm', width };
    } else if (
      (width >= 1024 && width < 1280)
      || (isSSR && getDevice(Store) === 'desktop')
    ) {
      breakpoint = { name: 'md', width };
    } else if (width >= 1280 && width < 1440) {
      breakpoint = { name: 'lg', width };
    } else if (width >= 1440) {
      breakpoint = { name: 'xl', width };
    } else {
      breakpoint = { name: 'xs', width };
    }

    this.currentBreakPointCache = breakpoint;
    return breakpoint;
  }

  /**
   * Returns the number of items to be displayed in the current breakpoint
   * @returns {number}
   */
  get itemsOnScreen() {
    const { itemsToBeDisplayedDefault, itemsToBeDisplayed } = this.props;

    if (!this.hasBreakPoints) {
      return itemsToBeDisplayed;
    }

    const { currentBreakPoint } = this;
    let itemsOnScreen = itemsToBeDisplayedDefault;

    if (hasKey(itemsToBeDisplayed, currentBreakPoint.name)) {
      itemsOnScreen = Number(itemsToBeDisplayed[currentBreakPoint.name]);

      if (itemsOnScreen === 0) {
        itemsOnScreen = itemsToBeDisplayedDefault;
      }
    }

    return itemsOnScreen;
  }

  /**
   * Returns the width value of the separator in the current breakpoint
   * @returns {number}
   */
  get separatorWidth() {
    const { separator, separatorDefaultValue } = this.props;

    if (!this.hasBreakPointsSeparators) {
      return separator;
    }

    const { currentBreakPoint } = this;
    let currentSeparator;

    if (hasKey(separator, currentBreakPoint.name)) {
      currentSeparator = Number(separator[currentBreakPoint.name]);
    } else {
      currentSeparator = separatorDefaultValue;
    }

    return currentSeparator;
  }

  /**
   * Returns true if the device is mobile
   * @returns {boolean}
   */
  get isMobile() {
    const { forceArrows, switchToDesktop } = this.props;
    const switchOverride = forceArrows ? 300 : switchToDesktop;
    return this.currentBreakPoint.width < switchOverride;
  }

  /**
   * Returns the formated children and the totalWidth
   * @returns {Object}
   */
  get ChildrenWithProps() {
    const {
      viewWidth,
      shouldRender,
      numberOfItems: currentNumberOfItems,
    } = this.state;
    const {
      children,
      componentClass,
      disableLazyLoad,
      forceArrows,
      goToItem,
      lastSeparatorWidth,
      mobilePeekPercentage,
      partialShowing,
      partialShowingValue,
      selectedItem,
      isSnap,
      snapToStart,
    } = this.props;

    this.slidesRefs.clear();
    let { numberOfItems } = this.state;
    let { mobilePeek } = this.props;
    let { separatorWidth } = this;

    if (this.hasDesktopLazyLoad) {
      numberOfItems = Math.min(
        partialShowing ? this.itemsOnScreen + 1 : this.itemsOnScreen,
        numberOfItems
      );
    }

    // Server side render logic
    if (!shouldRender) {
      const isMobile = getDevice(Store) === 'mobile' && !forceArrows;

      if (isMobile) {
        this.currentBreakPoint = { name: 'xs', width: 320 };
      } else {
        this.currentBreakPoint = { name: 'md', width: 1024 };
      }

      const numberOfItemsEval = Math.min(
        partialShowing || isMobile
          ? this.itemsOnScreen + 1
          : this.itemsOnScreen,
        numberOfItems
      );

      const hasLazyload = numberOfItems > numberOfItemsEval
        && goToItem === 0 && !disableLazyLoad;
      this.hasMobileLazyLoad = isMobile && hasLazyload;
      this.hasDesktopLazyLoad = !isMobile && hasLazyload;

      if (hasLazyload) {
        numberOfItems = numberOfItemsEval;
      }
    }

    let totalWidth;
    const partialShowingValidator = numberOfItems > this.itemsOnScreen
      && partialShowing;

    const isBPMobile = this.isMobile;
    let itemWidth;
    let itemStyle;
    const itemsOnScreenCheck = Math.min(numberOfItems, this.itemsOnScreen);
    separatorWidth = numberOfItems > 1 ? separatorWidth : 0;
    const separtorCalc = separatorWidth * (itemsOnScreenCheck - 1);
    const separatorValue = numberOfItems > 1
      ? separtorCalc / itemsOnScreenCheck
      : 0;

    if (isBPMobile) {
      itemWidth = 100 / itemsOnScreenCheck;
      mobilePeek = numberOfItems <= this.itemsOnScreen
        ? 0
        : (mobilePeek - (lastSeparatorWidth - separatorWidth)) / itemsOnScreenCheck;
      if (mobilePeekPercentage && mobilePeekPercentage > 0) {
        itemStyle = {
          flexBasis: `calc(${itemWidth}% - (${separatorValue}px + ((${mobilePeekPercentage}% - (${lastSeparatorWidth}px - ${separatorWidth}px)) / ${itemsOnScreenCheck})))`,
        };
      } else {
        itemStyle = {
          flexBasis: `calc(${itemWidth}% - ${separatorValue + mobilePeek}px)`,
        };
      }
    } else {
      if (partialShowingValidator) {
        const offsetItemMargin = this.itemsOnScreen + partialShowingValue;
        itemWidth = 100 / offsetItemMargin;
      } else {
        itemWidth = 100 / itemsOnScreenCheck;
      }

      itemStyle = {
        flexBasis: `calc(${itemWidth}% - ${separatorValue}px)`,
      };
      const itemPercentage = itemWidth / 100;
      totalWidth = Math.floor(
        itemPercentage * viewWidth * currentNumberOfItems
      );
    }

    const ChildrensWithProps = React.Children.map(children, (child, i) => {
      const shouldRenderChild = i < currentNumberOfItems - 1
      || (isBPMobile && numberOfItems > this.itemsOnScreen);
      const lastItem = i >= currentNumberOfItems - 1;
      const mobileAlign = (lastItem || i === 0)
        ? `${lastSeparatorWidth}px`
        : `${lastSeparatorWidth + ((separatorValue + mobilePeek) / 2)}px`;

      if (React.isValidElement(child)) {
        const isselected = typeof selectedItem === 'number'
          && i === selectedItem;
        const clonedItem = React.cloneElement(child, {
          isselected: isselected.toString(),
        });
        const separatorElement = shouldRenderChild ? (
          <div
            style={{
              width: `${lastItem
                ? lastSeparatorWidth
                : separatorWidth}px`,
            }}
            // eslint-disable-next-line react/no-array-index-key
            key={`Separator${i}`}
            className={Styles.separator}
          />
        ) : null;

        return [
          <div
            className={`${Styles.component} ${componentClass}`}
            key={child.key}
            ref={c => this.slidesRefs.set(i, c)}
            style={{
              ...itemStyle,
              ...(isSnap && {
                scrollSnapAlign: 'start',
                scrollSnapStop: 'always',
                scrollSnapMarginLeft: snapToStart ? 0 : mobileAlign,
                scrollMarginInlineStart: snapToStart ? 0 : mobileAlign,
              }),
              overflow: 'visible',
            }}
          >
            {i < numberOfItems && clonedItem}
          </div>,
          separatorElement,
        ];
      }

      return child;
    });

    return {
      ChildrensWithProps,
      totalWidth,
      separatorWidth,
    };
  }

  /**
   * Sets the current breakpoint
   * @param {Object} bp - object with breakpoint
   */
  set currentBreakPoint(bp) {
    this.currentBreakPointCache = bp;
  }

  /**
   * Handler for the ontouchendevent.
   * @param {Object} e browser event object
   */
  handleOnTouchEnd() {
    const { isMobile } = this.state;
    const { touchEndEvent, mobileScrollAnimated, isSnap } = this.props;

    if (isValidFunction(touchEndEvent)) {
      touchEndEvent();
    }

    if (mobileScrollAnimated && isSnap && isMobile) {
      this.setState({
        mobileRerender: false,
        doMobileAnimation: false,
      });
    }
  }

  /**
   * Setup component states
   */
  setupStates() {
    const {
      state: {
        isMobile: isMobileStatus,
      },
      props: {
        forceArrows,
        switchToDesktop,
      },
    } = this;
    this.currentBreakPointCache = null;
    const currentWidth = this.container?.current?.offsetWidth;
    const breakpoint = this.currentBreakPoint;
    const switchOverride = forceArrows ? 300 : switchToDesktop;
    const isMobile = breakpoint.width < switchOverride;

    if (isMobileStatus !== isMobile) {
      this.setState({
        isMobile,
        shouldRender: true,
      });
    }

    if (!isMobile && !exists(this.DesktopComponent)) {
      import(/* webpackChunkName: "carouselDesktop" */ './CarouselDesktop').then(({ default: _ }) => {
        this.DesktopComponent = _;

        this.forceUpdate();
      });
    }

    if (!isMobileStatus === false && isMobile) {
      this.paginationStatusCallback({});
    }

    this.setState({
      viewWidth: currentWidth,
      shouldRender: true,
      itemsOnScreen: this.itemsOnScreen,
    });
  }

  /**
   * mobile current page to use during actions
   * needs to be set for swipes
   * @param {number} pageNumber - current page number
   */
  setMobileCurrentPage(pageNumber) {
    this.mobileCurrentPage = pageNumber;
  }

  /**
   * Method that calls {MobileCarousel#goToPage}
   * @param {number} pageToGo - the target page
   */
  mobileGoToPage(pageToGo) {
    const { afterPageChange } = this.props;
    const { mobileGoToPage } = this.state;

    // force re render if the user has change the slide by doing
    // a scroll and it's out of sync with the current page triggered
    // by calling this method directly
    if (this.mobileCurrentPage !== pageToGo) {
      this.mobileCurrentPage = pageToGo;
      this.setState({
        mobileGoToPage: pageToGo,
        mobileRerender: true,
        doMobileAnimation: true,
      });
    } else if (pageToGo !== mobileGoToPage) {
      this.setState({
        mobileGoToPage: pageToGo,
        mobileRerender: false,
        doMobileAnimation: true,
      });
    }

    if (afterPageChange && isValidFunction(afterPageChange)) {
      afterPageChange(pageToGo);
    }
  }

  /**
   * Setup method that calls {CarouselDesktop#nextAction}
   * @param {number} value - the target page
   */
  desktopGoToPage(value) {
    this.activateLazyElements(value);
  }

  /**
   * Exposes the goToPage methods.
   * @param {number} number - the item number to go to in the carousel
   */
  goToPage(number) {
    if (this.isMobile) {
      this.mobileGoToPage(number);
    } else {
      this.desktopGoToPage(number);
    }
  }

  /**
   * Method to handle scrolling start
   * @param {event} event - touch event
   */
  lazyLoadScrollingStart(event) {
    event.stopPropagation(this);
  }

  /**
   * Method to handle scrolling in mobile
   * @param {event} event - touch event
   */
  lazyLoadScrolling(event) {
    event.stopPropagation();
    this.hasMobileLazyLoad = false;
    this.removeLazyLoadScrolling();
  }

  /**
   * Removes {#lazyLoadScrolling} event from the ref container
   */
  removeLazyLoadScrolling() {
    this.container.current.removeEventListener(
      'touchstart',
      this.lazyLoadScrollingStart
    );
    this.container.current.removeEventListener(
      'touchmove',
      this.lazyLoadScrolling
    );
    this.setupStates();
  }

  /**
   * Returns the number of pages in desktop
   * @param {Object} value - with numberOfPages and currentPage
   */
  paginationStatusCallback(value) {
    const { goToItem } = this.props;

    if (this.hasDesktopLazyLoad && goToItem > 0) {
      this.activateLazyElements(goToItem);
    }

    const { afterPageChange } = this.props;
    if (afterPageChange && isValidFunction(afterPageChange)) {
      this.callbackValidator = false;
      afterPageChange(value);
    }
  }

  /**
   * Render the lazyloaded elements in desktop
   * @param {number} pageToGo - page to go after update
   */
  activateLazyElements(pageToGo) {
    if (this.hasDesktopLazyLoad) {
      this.hasDesktopLazyLoad = false;
      this.setupStates();
      this.delayedAction = pageToGo;
    } else {
      // eslint-disable-next-line babel/no-unused-expressions
      this.carousel?.current?.goToPage(pageToGo);
    }
  }

  /**
   * Previous Action Callback
   */
  prevActionCallback() {
    const { prevAction } = this.props;
    if (prevAction && isValidFunction(prevAction)) {
      this.callbackValidator = false;
      prevAction();
    }
  }

  /**
   * Next Action Callback
   * @param {number} pageToGo - page to go after update
   */
  nextActionCallback(pageToGo) {
    this.callbackValidator = this.hasDesktopLazyLoad;
    this.activateLazyElements(pageToGo);

    const { nextAction } = this.props;
    if (nextAction && isValidFunction(nextAction)) {
      nextAction();
    }
  }

  /**
   * Setup method that calls {CarouselDesktop#prevAction}
   */
  goToPrev() {
    this.carousel.current.prevAction();
  }

  /**
   * Setup method that calls {CarouselDesktop#nextAction}
   */
  goToNext() {
    this.carousel.current.nextAction();
  }

  /**
   * render
   * @returns {JSX}
   */
  render() {
    const {
      isMobile,
      itemsOnScreen,
      numberOfItems,
      shouldRender,
      viewWidth,
      mobileGoToPage,
      mobileRerender,
      doMobileAnimation,
    } = this.state;

    if (numberOfItems === 0) {
      return null;
    }

    const {
      arrowTheme,
      className,
      desktopOverflowVisible,
      goToItem,
      leftArrow,
      leftArrowClassName,
      maskContainer,
      maskWrapper,
      partialShowing,
      partialShowingValue,
      rightArrow,
      rightArrowClassName,
      usePagination,
      offsetMargin,
      mobileScrollAnimated,
      isSnap,
    } = this.props;

    const partialShowingValidator = numberOfItems > itemsOnScreen
      && partialShowing;
    const {
      ChildrensWithProps,
      totalWidth,
      separatorWidth,
    } = this.ChildrenWithProps;
    const hasDesktopSSROverflow = !isMobile && desktopOverflowVisible && !shouldRender;
    let elementClass = isMobile || !shouldRender
      ? Styles.mobileWrapper
      : Styles.desktopWrapper;

    if (hasDesktopSSROverflow) {
      elementClass = Styles.ssrOverflow;
    }

    return (
      <div
        ref={this.container}
        className={`${elementClass} ${className}`}
        onTouchStart={this.hasMobileLazyLoad
          ? this.lazyLoadScrollingStart
          : null
        }
        onTouchMove={this.hasMobileLazyLoad ? this.lazyLoadScrolling : null}
        onTouchEnd={this.handleOnTouchEnd}
      >
        {isMobile === false
        && exists(this.DesktopComponent) && (
          <this.DesktopComponent
            viewWidth={viewWidth}
            usePagination={usePagination}
            itemsOnScreen={itemsOnScreen}
            leftArrow={leftArrow}
            rightArrow={rightArrow}
            leftArrowClassName={leftArrowClassName}
            rightArrowClassName={rightArrowClassName}
            maskWrapper={maskWrapper}
            maskContainer={maskContainer}
            partialShowing={partialShowingValidator}
            partialShowingValue={partialShowingValue}
            arrowTheme={arrowTheme}
            goToItem={goToItem}
            scrollWidth={totalWidth}
            numberOfItems={numberOfItems}
            prevAction={this.prevActionCallback}
            nextAction={this.nextActionCallback}
            afterPageChange={this.paginationStatusCallback}
            ref={this.carousel}
            separatorWidth={separatorWidth}
            overflowVisible={desktopOverflowVisible}
          >
            {ChildrensWithProps}
          </this.DesktopComponent>
        )}
        {(isMobile || !exists(shouldRender)) && (
          <MobileCarousel
            goToItem={goToItem}
            maskContainerClassName={maskContainer}
            maskWrapperClassName={maskWrapper}
            numberOfItems={numberOfItems}
            offsetMargin={offsetMargin}
            slidesRefs={this.slidesRefs}
            separatorWidth={separatorWidth}
            mobileScrollAnimated={mobileScrollAnimated}
            isSnap={isSnap}
            mobileGoToPage={mobileGoToPage}
            mobileRerender={mobileRerender}
            doMobileAnimation={doMobileAnimation}
            hasDesktopSSROverflow={hasDesktopSSROverflow}
          >
            {ChildrensWithProps}
          </MobileCarousel>
        )}
      </div>
    );
  }
}

/**
 * propTypes
 * @property {node} children - components child
 * @property {string} className - modifier class
 * @property {string} componentClass - modifier class for the carousel items
 * @property {bool} usePagination - activates pagination in desktop
 * @property {bool} disableLazyLoad - disables lazyload
 * @property {object} itemsToBeDisplayed - can either be an object or a number
 * with the items to display
 * @property {number} itemsToBeDisplayedDefault - if itemsToBeDisplayed is set
 * with an object, this is used for the missing breakpoints
 * @property {node} leftArrow - a valid react element for the left arrow
 * @property {node} rightArrow - a valid react element for the right arrow
 * @property {string} leftArrowClassName - a string with a modifier class for
 * the left arrow
 * @property {string} rightArrowClassName - a string with a modifier class for
 * the right arrow
 * @property {string} maskWrapper - modifier class for the mask wrapper
 * @property {string} maskContainer - modifier class for the mask container
 * @property {bool} partialShowing - activates partial showing navigation in
 * desktop
 * @property {number} partialShowingValue - the partial showing value of last
 * element visible on the carousel default set to 50% - 0.5
 * @property {string} arrowTheme - can either be dark or light, sets the theme
 * for the arrows
 * @property {number} mobilePeek - set the viewable pixel in mobile for the next
 * item
 * @property {number} mobilePeekPercentage - set the viewable percentage in
 * mobile for the next item
 * @property {number} selectedItem - select the target item in the carousel
 * @property {number} goToItem - scrolls to the selected item in the carousel
 * @property {number} switchToDesktop - defines the number at which the carousel
 * switch between mobile and desktop
 * @property {function} prevAction - Callback when the left arrow is clicked
 * @property {function} nextAction - Callback when the right arrow is clicked
 * @property {function} afterPageChange - Callback after the carousel changes
 * the number of pages, breakpoint and the current page, @returns {object} with numberOfPages
 * and currentPage
 * @property {object} separator - can either be an object or a number with the
 * width of the separator
 * @property {number} separatorDefaultValue - if separator is set with an
 * object, this is used
 * @property {bool} snapToStart - true is snap to start
 * @property {number} lastSeparatorWidth - last element right distance with
 * wrapper
 * @property {function} touchEndEvent - touch event function to help catching
 * swipes
 * @property {number} offsetMargin - mobile offset margin to center the element
 * in mobile
 * for the missing breakpoints
 * @property {boolean} desktopOverflowVisible - determines if desktop overflow
 * is visible.
 * @property {function} afterSwipe - callback called after the swipedRight and
 * swipedLeft events.
 */
Carousel.propTypes = {
  afterPageChange: PropTypes.func,
  arrowTheme: PropTypes.oneOf(['dark', 'light']),
  children: PropTypes.node,
  className: PropTypes.string,
  componentClass: PropTypes.string,
  desktopOverflowVisible: PropTypes.bool,
  disableLazyLoad: PropTypes.bool,
  forceArrows: PropTypes.bool,
  goToItem: PropTypes.number,
  isSnap: PropTypes.bool,
  itemsToBeDisplayed: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  itemsToBeDisplayedDefault: PropTypes.number,
  lastSeparatorWidth: PropTypes.number,
  leftArrow: PropTypes.element,
  leftArrowClassName: PropTypes.string,
  maskContainer: PropTypes.string,
  maskWrapper: PropTypes.string,
  mobilePeek: PropTypes.number,
  mobilePeekPercentage: PropTypes.number,
  mobileScrollAnimated: PropTypes.bool,
  nextAction: PropTypes.func,
  offsetMargin: PropTypes.number,
  partialShowing: PropTypes.bool,
  partialShowingValue: PropTypes.number,
  prevAction: PropTypes.func,
  rightArrow: PropTypes.element,
  rightArrowClassName: PropTypes.string,
  selectedItem: PropTypes.number,
  separator: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  separatorDefaultValue: PropTypes.number,
  snapToStart: PropTypes.bool,
  switchToDesktop: PropTypes.number,
  touchEndEvent: PropTypes.func,
  usePagination: PropTypes.bool,
};

/**
 * Default Props for the Carousel
 */
Carousel.defaultProps = {
  className: '',
  usePagination: false,
  disableLazyLoad: false,
  itemsToBeDisplayed: 4,
  itemsToBeDisplayedDefault: 4,
  partialShowing: false,
  partialShowingValue: 0.5,
  leftArrowClassName: '',
  rightArrowClassName: '',
  maskWrapper: '',
  maskContainer: '',
  arrowTheme: 'dark',
  mobilePeek: 20,
  selectedItem: null,
  snapToStart: false,
  goToItem: 0,
  switchToDesktop: 768,
  prevAction: null,
  nextAction: null,
  afterPageChange: null,
  separator: 8,
  separatorDefaultValue: 8,
  lastSeparatorWidth: 20,
  touchEndEvent: null,
  offsetMargin: 0,
  forceArrows: false,
  desktopOverflowVisible: false,
};

export default Carousel;
