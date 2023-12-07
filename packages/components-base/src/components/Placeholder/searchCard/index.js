import React from 'react';
import Styles from './searchCard.scss';

import HorizontalCardPlaceholder from '../horizontalCard';

/**
 * SearchPlaceHolder
 * @param {number} numberOfCards - number of search cards to show
 * @returns {jsx}
 */
const SearchPlaceholder = ({ numberOfCards }) => {
  return (
    [...Array(numberOfCards).keys()].map(number => (
      <div className={Styles.searchPlaceholder} key={number.toString()}>
        <div className={Styles.cardSearchWrapper}>
          <HorizontalCardPlaceholder />
        </div>
      </div>
    ))
  );
};

export default SearchPlaceholder;
