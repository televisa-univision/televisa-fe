import React from 'react';
import Styles from './tvGuideCard.scss';

import HorizontalCardPlaceholder from '../horizontalCard';

/**
 * Placeholder TV guide
 * @returns {jsx}
 */
const TVGuidePlaceholder = () => {
  return (
    [...Array(3).keys()].map(number => (
      <div className={Styles.tvGuidePlaceholder} key={number.toString()}>
        <div className={Styles.skeletonTVSquare}>
          <div />
        </div>
        <div className={Styles.cardTVWrapper}>
          <HorizontalCardPlaceholder />
        </div>
        <div className={Styles.skeletonTVSquare}>
          <div />
        </div>
      </div>
    ))
  );
};

export default TVGuidePlaceholder;
