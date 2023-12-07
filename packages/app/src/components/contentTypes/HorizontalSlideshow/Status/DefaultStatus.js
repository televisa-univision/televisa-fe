import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import Styles from './Status.scss';

/**
 * default status render
 * @param {Object} props props
 * @returns {JSX}
 */
const DefaultStatus = (props) => {
  const {
    activeSlideNumber,
    endSlideNumber,
    prevSlideNumber,
    actions,
    showArrows,
    autoplayEl,
    shareEl,
  } = props;

  return (
    <div className={Styles.container}>
      {autoplayEl}
      {showArrows && (
        <div className={Styles.mobileActions}>
          <button id="arrowLeft" className={Styles.arrow} onClick={actions.goToPrevSlide}>
            <Icon name="arrowLeftLegacy" className={Styles.arrowIcon} size="xsmall" />
          </button>
          <span
            className={classnames(
              !exists(activeSlideNumber) && activeSlideNumber !== 0 ? Styles.adStatus : '',
              Styles.statusText,
            )}
          >
            <div>
              <em>{exists(activeSlideNumber) ? activeSlideNumber : prevSlideNumber}</em> de{' '}
              <span>{endSlideNumber}</span>
            </div>
          </span>
          <button id="arrowRight" className={Styles.arrow} onClick={actions.goToNextSlide}>
            <Icon name="arrow" className={Styles.arrowIcon} size="xsmall" />
          </button>
        </div>
      )}
      {shareEl}
    </div>
  );
};

DefaultStatus.propTypes = {
  actions: PropTypes.shape({
    goToPrevSlide: PropTypes.func,
    goToNextSlide: PropTypes.func,
    togglePlaying: PropTypes.func,
    onShareClick: PropTypes.func,
    abortAutoplay: PropTypes.func,
  }).isRequired,
  activeSlideNumber: PropTypes.number,
  endSlideNumber: PropTypes.number.isRequired,
  prevSlideNumber: PropTypes.number,
  showArrows: PropTypes.bool.isRequired,
  autoplayEl: PropTypes.element,
  shareEl: PropTypes.element,
};

export default DefaultStatus;
