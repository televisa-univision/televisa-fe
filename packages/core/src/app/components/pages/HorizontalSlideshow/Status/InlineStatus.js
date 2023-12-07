import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import ProgressCircle from '@univision/fe-components-base/dist/components/ProgressCircle';
import Styles from './Status.scss';

/**
 * Inline or lead render
 * @param {Object} props props
 * @returns {JSX}
 */
const inlineStatus = (props) => {
  const {
    isLead,
    activeSlideNumber,
    endSlideNumber,
    prevSlideNumber,
    running,
    progress,
    actions,
    isEndOfSlideshow,
    showArrows,
  } = props;
  return (
    <div className={classnames({ [Styles.lead]: isLead }, Styles.inline)}>
      <div className={Styles.inlineWrapper}>
        <button className={Styles.control} onClick={actions.togglePlaying}>
          {running ? (
            <Icon name="pausecircle" className={Styles.icon} />
          ) : (
            <Icon name="playLegacy" className={Styles.icon} />
          )}
          <ProgressCircle running={running} progress={progress} color="white" size={32} />
        </button>
        {showArrows && [
          <div className={`${Styles.inlineStatusText} uvs-font-a-bold`}>
            <div>
              {activeSlideNumber === 0 || exists(activeSlideNumber)
                ? activeSlideNumber
                : prevSlideNumber}
              /{endSlideNumber}
            </div>
          </div>,
          <span className={Styles.statusText}>
            <div>
              {activeSlideNumber === 0 || exists(activeSlideNumber)
                ? activeSlideNumber
                : prevSlideNumber}
              /{endSlideNumber}
            </div>
          </span>,
        ]}
        {!isEndOfSlideshow && (
          <div className={Styles.mobileActions}>
            {activeSlideNumber !== 0 && (
              <button id="arrowLeft" className={Styles.arrow} onClick={actions.goToPrevSlide}>
                <Icon name="arrowLeftLegacy" className={Styles.arrowIcon} size="xsmall" />
              </button>
            )}
            <button id="arrowRight" className={Styles.arrow} onClick={actions.goToNextSlide}>
              <Icon name="arrow" className={Styles.arrowIcon} size="xsmall" />
            </button>
          </div>
        )}
        {isEndOfSlideshow && (
          <button className={Styles.replay} onClick={actions.restartSlideshow}>
            <Icon name="replay" className={Styles.replayIcon} size="xsmall" />{' '}
            {localization.get('startOver')}
          </button>
        )}
      </div>
    </div>
  );
};

inlineStatus.propTypes = {
  isLead: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    goToPrevSlide: PropTypes.func,
    goToNextSlide: PropTypes.func,
    togglePlaying: PropTypes.func,
    onShareClick: PropTypes.func,
    abortAutoplay: PropTypes.func,
    restartSlideshow: PropTypes.func,
  }).isRequired,
  activeSlideNumber: PropTypes.number.isRequired,
  endSlideNumber: PropTypes.number.isRequired,
  prevSlideNumber: PropTypes.number,
  running: PropTypes.bool,
  progress: PropTypes.number,
  showArrows: PropTypes.bool.isRequired,
  isEndOfSlideshow: PropTypes.bool,
};

export default inlineStatus;
