import React, { Component } from 'react';
import { exists, getKey } from '@univision/fe-commons/dist/utils/helpers';
import Carousel from '../..';
import TestItem from '../TestItem';
import Styles from './ComplicatedExample.scss';

/**
 * Test component
 */
class ComplicatedExample extends Component {
  /**
   * Component's constructor
   * @param {*} props with initial settings
   */
  constructor(props) {
    super(props);
    this.state = {
      numberOfPages: 0,
      currentPage: 0,
    };

    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.getNumberOfPages = this.getNumberOfPages.bind(this);
    this.carousel = React.createRef();
  }

  /**
   * Update the number of pages
   * @param {number} value - number of pages
   */
  getNumberOfPages(value) {
    this.setState({
      numberOfPages: getKey(value, 'numberOfPages', 0),
      currentPage: getKey(value, 'currentPage', 0),
    });
  }

  /**
   * Actions when left arrow gets clicked
   */
  prev() {
    this.setState({
      press: 'Left Arrow',
    });
  }

  /**
   * Actions when right arrow gets clicked
   */
  next() {
    this.setState({
      press: 'Right Arrow',
    });
  }

  /**
   * Go to the target page
   * @param {*} value - target page
   */
  goToPage(value) {
    this.setState({
      press: null,
    });

    this.carousel.current.goToPage(value);
  }

  /**
   * Create pagination component
   * @returns {JSX}
   */
  paginationComponent() {
    const { numberOfPages, currentPage } = this.state;
    let component;
    if (numberOfPages) {
      const circles = Array.from({ length: numberOfPages + 1 }, (v, i) => {
        const isselected = i === currentPage ? Styles.isselected : '';
        return (
          <button
            key={`circle${i}`}
            className={`${Styles.circle} ${isselected}`}
            onClick={() => this.goToPage(i)}
          />
        );
      });
      component = <div className={Styles.paginationWrapper}>{circles}</div>;
    }

    return component;
  }

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    const numberOfElements = 12;
    const { press } = this.state;

    let pressElement;
    if (exists(press)) {
      pressElement = <div className={Styles.text}>{press} click</div>;
    }

    const elements = Array.from({ length: numberOfElements }, (v, i) => {
      return <TestItem key={`t${i}`} numberId={i} />;
    });

    const settings = {
      maskWrapper: Styles.mask,
      className: Styles.carouselWrapper,
      leftArrowClassName: Styles.leftArrow,
      rightArrowClassName: Styles.rightArrow,
      arrowTheme: 'light',
      usePagination: true,
      prevAction: this.prev,
      nextAction: this.next,
      itemsToBeDisplayed: {
        xs: 2,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      },
      afterPageChange: this.getNumberOfPages,
    };

    return (
      <div className={Styles.wrapper}>
        <Carousel
          ref={this.carousel}
          {...settings}
        >
          {elements.map((e) => {
            return e;
          })}
        </Carousel>
        {this.paginationComponent()}
        {pressElement}
      </div>
    );
  }
}

export default ComplicatedExample;
