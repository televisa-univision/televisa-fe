import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TVGuideDate from '@univision/shared-components/dist/components/v2/TVGuideDate';
import Carousel from '@univision/fe-components-base/dist/components/Carousel';
import Styles from './TvGuideDateNav.scss';

/**
 * Tv Guide Nav widget
 * @param {Object} props wrapper props
 * @returns {?JSX}
 */
const TvGuideDateNav = (props) => {
  const {
    className,
    activeDate,
    onPress,
  } = props;
  if (typeof onPress !== 'function') {
    return null;
  }
  const itemsToBeDisplayed = {
    xs: 2,
    sm: 6,
    md: 8,
    lg: 8,
    xl: 8,
  };
  const now = new Date();
  now.setDate(now.getDate() - 11);
  const dates = [];
  let next;
  let count = 0;
  while (count < 21) {
    next = new Date(now.setDate(now.getDate() + 1));
    dates.push(next);
    count += 1;
  }
  return (
    <div className={classnames(
      className,
      Styles.navWrapper,
    )}
    >
      <Carousel
        itemsToBeDisplayed={itemsToBeDisplayed}
        maskWrapper={Styles.mobileMask}
        className={Styles.carousel}
        componentClass={Styles.carouselItem}
        partialShowing
        switchToDesktop={480}
        leftArrowClassName={classnames(Styles.leftArrow, Styles.arrowColor)}
        rightArrowClassName={classnames(Styles.rightArrow, Styles.arrowColor)}
        goToItem={9}
        offsetMargin={0}
        separator={0}
        separatorDefaultValue={0}
        forceArrows
      >
        {dates.map(d => (
          <TVGuideDate
            key={`key${d}`}
            date={d}
            onPress={() => onPress(d)}
            isActive={d.getDate() === activeDate}
            className={Styles.date}
          />
        ))}
      </Carousel>
    </div>
  );
};

/**
 * propTypes
 * @property {Date} [startDate] - the date to start the nav bar
 * @property {number} [activeDate] - the date number
 * @property {string} [className] - a custom class name
 * @property {Function} [onPress] - the callback when pressing a channel button
 */
TvGuideDateNav.propTypes = {
  activeDate: PropTypes.number,
  className: PropTypes.string,
  onPress: PropTypes.func,
};

/**
 * Default Prop Values
 */
TvGuideDateNav.defaultProps = {
  className: '',
};

export default TvGuideDateNav;
