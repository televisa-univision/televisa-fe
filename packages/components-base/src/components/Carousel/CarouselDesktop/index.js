import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import classnames from 'classnames';

import Styles from './CarouselDesktop.scss';

/**
 * Carousel Desktop component
 * @returns {JSX}
 */
class CarouselDesktop extends React.Component {
  /**
   * Component constructor
   * @param {*} props - component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      currentScroll: {
        transform: 'translate3d(0,0,0)',
      },
    };

    this.leftArrowElement = null;
    this.rightArrowElement = null;
    // Caches the number of page to speed up page calculation
    this.numberOfPagesCache = null;
    // Stores the currentPage to prevent state delays
    this.currentPage = 0;
    // Methods bindings
    this.prevAction = this.prevAction.bind(this);
    this.nextAction = this.nextAction.bind(this);
  }

  /* eslint camelcase: "off" */
  /* eslint-disable react/sort-comp */
  /**
   * Check props before mounting the component
   */
  UNSAFE_componentWillMount() {
    const {
      leftArrow,
      rightArrow,
      viewWidth,
      itemsOnScreen,
      scrollWidth,
      partialShowing,
    } = this.props;
    let DefaultArrow;

    if (!React.isValidElement(leftArrow) || !React.isValidElement(rightArrow)) {
      DefaultArrow = Loadable({
        loader: () => import(/* webpackChunkName: "defaultArrow" */ '../DefaultArrow'),
        loading: () => null,
      });
    }

    if (!React.isValidElement(leftArrow)) {
      this.leftArrowElement = <DefaultArrow />;
    } else {
      this.leftArrowElement = leftArrow;
    }

    if (!React.isValidElement(rightArrow)) {
      this.rightArrowElement = <DefaultArrow isRight />;
    } else {
      this.rightArrowElement = rightArrow;
    }

    this.updateProps(viewWidth, itemsOnScreen, scrollWidth, partialShowing);

    const { goToItem } = this.props;
    if (goToItem > 0) {
      this.goToItem(goToItem);
    }
  }

  /**
   * Component did mount logic, calls {CarouselDesktop#runCallbacks}
   */
  componentDidMount() {
    this.runCallbacks();
  }

  /**
   * Component will receive props implementation
   * @param {*} nextProps new props
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.numberOfPagesCache = null;
    const {
      viewWidth, itemsOnScreen, scrollWidth, partialShowing,
    } = nextProps;
    const { props: { viewWidth: viewWidthProp, goToItem }, state: { currentPage } } = this;
    this.updateProps(viewWidth, itemsOnScreen, scrollWidth, partialShowing);

    if (nextProps.goToItem !== goToItem) {
      this.goToItem(nextProps.goToItem);
    } else if (nextProps.viewWidth !== viewWidthProp) {
      this.goToPage(currentPage);
    }
  }

  /**
   * Calculate the number of pages
   * @returns {number}
   */
  get numberOfPages() {
    if (this.numberOfPagesCache) {
      return this.numberOfPagesCache;
    }

    const { usePagination, numberOfItems, partialShowingValue } = this.props;
    const {
      viewWidth, itemsOnScreen, scrollWidth, partialShowing,
    } = this;
    let delta;

    if (usePagination && partialShowing) {
      const itemsWidth = scrollWidth / numberOfItems;
      const vz = itemsWidth * itemsOnScreen;
      delta = scrollWidth / vz;
    } else if (usePagination && !partialShowing) {
      delta = scrollWidth / viewWidth;
    } else if (!usePagination && partialShowing) {
      const offset = itemsOnScreen - 1;
      const vmi = viewWidth * (1 / (itemsOnScreen + partialShowingValue));
      const tmv = scrollWidth / vmi;
      delta = tmv - offset;
    } else {
      const offset = itemsOnScreen - 1;
      const vmi = viewWidth / itemsOnScreen;
      const tmv = scrollWidth / vmi;
      delta = tmv - offset;
    }

    let numberOfPages;
    if (Number.isNaN(delta)) {
      numberOfPages = 0;
    } else if (usePagination) {
      numberOfPages = Math.ceil(delta - 1);
    } else {
      numberOfPages = Math.round(delta - 1);
    }
    /* istanbul ignore next: in Some cases while calculating goToPage */
    numberOfPages = numberOfPages < 0 ? 0 : numberOfPages;

    this.numberOfPagesCache = numberOfPages;
    return numberOfPages;
  }

  /**
   * Returns the page number for the target item
   * @param {number} item - the desired item
   * @returns {number} the page number for the target item
   */
  getPageForItem(item) {
    const { usePagination } = this.props;
    const { itemsOnScreen } = this;

    let page;

    if (usePagination) {
      const validItem = item + 1;
      page = Math.ceil(validItem / itemsOnScreen) - 1;
    } else {
      page = item;
    }

    return page;
  }

  /**
   * Scrolls to the desired item
   * @param {number} item - number of item to focus
   */
  goToItem(item) {
    const { numberOfPages } = this;
    const { numberOfItems } = this.props;

    if (item >= numberOfItems) {
      this.goToPage(numberOfPages);
    } else {
      // Gets the page where the item is located
      const pageForItem = this.getPageForItem(item);
      this.goToPage(pageForItem);
    }
  }

  /**
   * Scrolls to the target page
   * @param {number} page to go
   */
  goToPage(page) {
    let posX;
    const {
      numberOfPages, viewWidth, itemsOnScreen, scrollWidth, partialShowing,
    } = this;
    const {
      usePagination, numberOfItems, separatorWidth, partialShowingValue,
    } = this.props;
    const pageToGo = page > numberOfPages ? numberOfPages : page;

    if (pageToGo <= numberOfPages && pageToGo >= 0) {
      if (pageToGo === numberOfPages) {
        const dif = separatorWidth * (itemsOnScreen - 1);
        const offset = dif / itemsOnScreen;
        const sn = scrollWidth / numberOfItems;
        const itemSize = sn - offset;
        const sni = separatorWidth * (numberOfItems - 1);
        const ini = itemSize * numberOfItems;
        const size = ini + sni;
        posX = size - viewWidth;
      } else if (usePagination && partialShowing) {
        const sn = scrollWidth / numberOfItems;
        posX = pageToGo * (sn * itemsOnScreen);
        posX += pageToGo * separatorWidth;
      } else if (!usePagination && partialShowing) {
        const delta = separatorWidth / itemsOnScreen;
        posX = pageToGo * (viewWidth * (1 / (itemsOnScreen + partialShowingValue)));
        posX += pageToGo * delta;
      } else {
        const delta = usePagination ? separatorWidth : separatorWidth / itemsOnScreen;
        posX = pageToGo * (viewWidth / (usePagination ? 1 : itemsOnScreen));
        posX += pageToGo * delta;
      }

      const speed = usePagination ? 0.5 : 0.4;
      this.setState({
        currentPage: pageToGo,
        currentScroll: {
          transform: `translate3d(-${Math.round(posX)}px,0,0)`,
          transition: `transform ${speed}s ease`,
        },
      });
      this.currentPage = pageToGo;
      this.runCallbacks();
    }
  }

  /**
   * Update local values with new props
   * @param {number} viewWidth - new viewWidth
   * @param {number} itemsOnScreen - new itemsOnScreen
   * @param {number} scrollWidth - new scrollWidth
   * @param {bool} partialShowing - new partialShowing
   */
  updateProps(viewWidth, itemsOnScreen, scrollWidth, partialShowing) {
    this.viewWidth = viewWidth;
    this.itemsOnScreen = itemsOnScreen;
    this.scrollWidth = scrollWidth;
    this.partialShowing = partialShowing;
  }

  /**
   * Run component callbacks
   */
  runCallbacks() {
    const { afterPageChange } = this.props;
    afterPageChange({
      numberOfPages: this.numberOfPages,
      currentPage: this.currentPage,
    });
  }

  /**
   * Check if the component needs the right Arrow
   * @returns {boolean} if needs a right arrow
   */
  hasRightArrow() {
    const { numberOfPages } = this;
    const { currentPage } = this.state;
    return numberOfPages !== currentPage;
  }

  /**
   * Triggers when left arrow gets clicked
   */
  prevAction() {
    const { prevAction } = this.props;
    let { currentPage } = this.state;
    currentPage -= 1;

    this.goToPage(currentPage);
    prevAction();
  }

  /**
   * Triggers when the right arrow gets clicked
   */
  nextAction() {
    const { nextAction } = this.props;
    let { currentPage } = this.state;
    currentPage += 1;

    nextAction(currentPage);
  }

  /**
   * Render Method
   * @returns {JSX}
   */
  render() {
    const { currentScroll, currentPage } = this.state;
    const {
      children,
      leftArrowClassName,
      rightArrowClassName,
      maskWrapper,
      maskContainer,
      arrowTheme,
      overflowVisible,
    } = this.props;
    const isLeftArrowHidden = currentPage === 0;
    const isRightArrowHidden = !this.hasRightArrow();

    const leftArrowElement = React.cloneElement(this.leftArrowElement, {
      onClick: this.prevAction,
      isHidden: isLeftArrowHidden,
    });
    const rightArrowElement = React.cloneElement(this.rightArrowElement, {
      onClick: this.nextAction,
      isHidden: isRightArrowHidden,
    });
    const maskStyle = overflowVisible
      ? Styles.maskWithOverflowVisible
      : Styles.maskWithOverflowHidden;

    return (
      <div className={Styles.desktopContainer}>
        <div className={classnames(Styles.left, leftArrowClassName, arrowTheme, {
          hidden: isLeftArrowHidden,
        })}
        >
          {leftArrowElement}
        </div>
        <div className={classnames(Styles.right, rightArrowClassName, arrowTheme, {
          hidden: isRightArrowHidden,
        })}
        >
          {rightArrowElement}
        </div>
        <div className={`${maskStyle} ${maskWrapper}`}>
          <div className={Styles.desktopScroll} style={{ ...currentScroll }}>
            <div className={`${Styles.container} ${maskContainer}`}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * propTypes
 * @property {node} children - components child
 * @property {number} viewWidth - the width value for the container
 * @property {bool} usePagination - activates pagination in desktop
 * @property {number} itemsOnScreen - the number of items to display
 * @property {node} leftArrow - a valid react element for the left arrow
 * @property {node} rightArrow - a valid react element for the right arrow
 * @property {string} leftArrowClassName - a string with a modifier class for the left arrow
 * @property {string} rightArrowClassName - a string with a modifier class for the right arrow
 * @property {string} maskWrapper - modifier class for the mask wrapper
 * @property {string} maskContainer - modifier class for the mask container
 * @property {bool} partialShowing - activates partial showing navigation in desktop
 * @property {number} partialShowingValue - the partial showing value of last
 * element visible on the carousel default set to 50% - 0.5
 * @property {number} partialShowingValue - the value for partial showing on desktop
 * @property {string} arrowTheme - can either be dark or light, sets the theme for the arrows
 * @property {number} scrollWidth - the total width of the containers scroll
 * @property {number} goToItem - scrolls to this item
 * @property {number} numberOfItems - the total amounts of items in the carousel
 * @property {number} separatorDesktop - width of separator
 * @property {function} prevAction - Callback when the left arrow is clicked
 * @property {function} nextAction - Callback when the right arrow is clicked
 * @property {function} afterPageChange - Callback after the carousel changes the number of
 * pages, breakpoint and the current page, @returns {object} with numberOfPages and currentPage
 * @property {boolean} overflowVisible - determines if carousel overflow should
 * be visible.
 */
CarouselDesktop.propTypes = {
  children: PropTypes.node,
  viewWidth: PropTypes.number,
  usePagination: PropTypes.bool,
  itemsOnScreen: PropTypes.number,
  leftArrow: PropTypes.element,
  rightArrow: PropTypes.element,
  leftArrowClassName: PropTypes.string,
  rightArrowClassName: PropTypes.string,
  maskWrapper: PropTypes.string,
  maskContainer: PropTypes.string,
  partialShowing: PropTypes.bool,
  partialShowingValue: PropTypes.number,
  arrowTheme: PropTypes.string,
  scrollWidth: PropTypes.number,
  goToItem: PropTypes.number,
  numberOfItems: PropTypes.number,
  separatorWidth: PropTypes.number,
  prevAction: PropTypes.func,
  nextAction: PropTypes.func,
  afterPageChange: PropTypes.func,
  overflowVisible: PropTypes.bool,
};

export default CarouselDesktop;
