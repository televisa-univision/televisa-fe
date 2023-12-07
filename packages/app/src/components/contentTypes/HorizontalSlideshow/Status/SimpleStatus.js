import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import Styles from './Status.scss';

/**
 * Render SimpleStatus (the component has the auto play and the slideshow number positioned
 * vertically)
 * @param {Object} props props
 * @returns {JSX}
 */
const SimpleStatus = (props) => {
  const {
    activeSlideNumber,
    autoplayEl,
    endSlideNumber,
    prevSlideNumber,
  } = props;
  const currentSlideNumber = typeof activeSlideNumber !== 'undefined' && activeSlideNumber !== null
    ? activeSlideNumber
    : prevSlideNumber;

  return (
    <div className={Styles.simpleContainer}>
      {autoplayEl}
      <span
        className={classnames(
          !exists(activeSlideNumber) && activeSlideNumber !== 0 ? Styles.adStatus : '',
          Styles.statusText,
          Styles.simpleStatusText,
        )}
      >
        <div>
          <em>{currentSlideNumber}</em>
          {'/'}
          {endSlideNumber}
        </div>
      </span>
    </div>
  );
};

SimpleStatus.propTypes = {
  activeSlideNumber: PropTypes.number,
  autoplayEl: PropTypes.element,
  endSlideNumber: PropTypes.number,
  prevSlideNumber: PropTypes.number,
};

export default SimpleStatus;
