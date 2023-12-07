import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { exists } from '@univision/fe-commons/dist/utils/helpers';
import ShareBar from '@univision/fe-components-base/dist/components/ShareBar';

import Reaction from '../Reaction/Reaction';
import Styles from './Status.scss';

/**
 * reaction status render
 * @param {Object} props props
 * @returns {JSX}
 */
const reactionStatus = (props) => {
  const {
    actions,
    activeSlideNumber,
    device,
    endSlideNumber,
    prevSlideNumber,
    reaction,
    activeSlideId,
    showArrows,
    showShare,
    onShareBarClick,
    shareEl,
    sharingOptions,
    theme,
  } = props;

  return (
    <div className={classnames(Styles.container, Styles.reactionContainer)}>
      {showArrows && (
        <div className={Styles.mobileActions}>
          <span
            className={classnames(
              !exists(activeSlideNumber) && activeSlideNumber !== 0 ? Styles.adStatus : '',
              Styles.statusText,
            )}
          >
            <div>
              <em>{exists(activeSlideNumber) ? activeSlideNumber : prevSlideNumber}</em> de{' '}
              {endSlideNumber}
            </div>
          </span>
        </div>
      )}
      {showShare
        && reaction
        && device === 'mobile' && (
          <Reaction
            slideId={activeSlideId}
            slideshowId={reaction.slideshowId}
            pollOptions={reaction.pollOptions}
            autoSlideChangeTime={reaction.autoSlideChangeTime}
            goToNext={actions.goToNextSlide}
            closedDate={reaction.closedDate}
            theme={theme}
            modifierClass={Styles.reactionButtons}
            webAppPollOptions={reaction.webAppPollOptions}
          />
      )}
      {shareEl}
      {device === 'desktop' && (
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

reactionStatus.propTypes = {
  actions: PropTypes.shape({
    goToPrevSlide: PropTypes.func,
    goToNextSlide: PropTypes.func,
    togglePlaying: PropTypes.func,
    onShareClick: PropTypes.func,
    abortAutoplay: PropTypes.func,
  }).isRequired,
  activeSlideNumber: PropTypes.number,
  device: PropTypes.string,
  endSlideNumber: PropTypes.number.isRequired,
  prevSlideNumber: PropTypes.number,
  reaction: PropTypes.object.isRequired,
  activeSlideId: PropTypes.string,
  showShare: PropTypes.bool.isRequired,
  showArrows: PropTypes.bool.isRequired,
  onShareBarClick: PropTypes.func,
  shareEl: PropTypes.element,
  sharingOptions: PropTypes.object,
  theme: PropTypes.object,
};

export default reactionStatus;
