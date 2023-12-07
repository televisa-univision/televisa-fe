import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Store from '@univision/fe-commons/dist/store/store';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';
import ShareBar from '@univision/fe-components-base/dist/components/ShareBar';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import Styles from './Status.scss';

/**
 * open card status render
 * @param {Object} props props
 * @returns {JSX}
 */
const openStatus = (props) => {
  const {
    activeSlideNumber,
    endSlideNumber,
    reaction,
    actions,
    showShare,
    showArrows,
    onShareBarClick,
    autoplayEl,
    shareEl,
    sharingOptions,
  } = props;
  const device = getDevice(Store);
  const openCardContainer = activeSlideNumber === 0 && device === 'desktop' ? Styles.openCard : '';
  const reactionContainer = reaction ? Styles.reactionContainer : '';

  return (
    <div className={classnames(Styles.container, reactionContainer)}>
      {!reaction && (
        <div className={openCardContainer}>
          {autoplayEl}
          {device === 'desktop'
            && showArrows && (
              <div className={Styles.mobileActions}>
                <span className={Styles.statusText}>
                  <div>
                    <em>{activeSlideNumber}</em> de {endSlideNumber}
                  </div>
                </span>
                <button id="arrowRight" className={Styles.arrow} onClick={actions.goToNextSlide}>
                  <Icon name="arrow" className={Styles.arrowIcon} size="xsmall" />
                </button>
              </div>
          )}
        </div>
      )}
      {reaction
        && showArrows && (
          <div className={Styles.mobileActions}>
            <span className={Styles.statusText}>
              <div>
                <em>{activeSlideNumber}</em> de {endSlideNumber}
              </div>
            </span>
          </div>
      )}
      {device !== 'desktop'
        && showShare && (
          <div
            className={Styles.callToStart}
            onClick={() => actions.goToNextSlide('button')}
            role="presentation"
          >
            <span>{localization.get('viewGallery')}</span>
            <Icon name="arrow" fill="#fff" size="xxsmall" />
          </div>
      )}
      {shareEl}
      {reaction
        && device === 'desktop'
        && activeSlideNumber === 0 && (
          <div className={Styles.openShareButtons}>
            <ShareBar
              iconSize="xsmall"
              sharingOptions={sharingOptions}
              theme="light"
              showComparte={false}
              compact
              onClick={onShareBarClick}
            />
          </div>
      )}
    </div>
  );
};

openStatus.propTypes = {
  actions: PropTypes.shape({
    goToPrevSlide: PropTypes.func,
    goToNextSlide: PropTypes.func,
    togglePlaying: PropTypes.func,
    onShareClick: PropTypes.func,
    abortAutoplay: PropTypes.func,
  }).isRequired,
  activeSlideNumber: PropTypes.number.isRequired,
  endSlideNumber: PropTypes.number.isRequired,
  reaction: PropTypes.object,
  showShare: PropTypes.bool.isRequired,
  showArrows: PropTypes.bool.isRequired,
  onShareBarClick: PropTypes.func,
  autoplayEl: PropTypes.element,
  shareEl: PropTypes.element,
  sharingOptions: PropTypes.object,
};

export default openStatus;
