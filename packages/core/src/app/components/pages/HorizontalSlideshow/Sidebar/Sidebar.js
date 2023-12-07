import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Store from '@univision/fe-commons/dist/store/store';
import { getTheme, getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import Meta from '@univision/fe-components-base/dist/components/Meta/Meta';
import Truncate from '@univision/fe-components-base/dist/components/Truncate';
import ShareBar from '@univision/fe-components-base/dist/components/ShareBar';
import Clickable from '@univision/fe-components-base/dist/components/Clickable';
import Reaction from '../Reaction/Reaction';
import { handleShareBarClick } from '../helpers';
import Status from '../Status/Status';
import Styles from './Sidebar.scss';

/**
 * Check if the activeSlideNumber exists and is different to 0
 * @param {number} activeSlideNumber current slide number
 * @returns {bool} validation result
 */
const validateActiveSlideNumber = (activeSlideNumber) => {
  return !(!exists(activeSlideNumber) && activeSlideNumber !== 0);
};

/**
 * Slideshow sidebar
 * @param {Object} props component's props
 * @returns {JSX}
 */
const Sidebar = (props) => {
  const {
    actions,
    activeSlideCaption,
    activeSlideId,
    activeSlideNumber,
    endSlideNumber,
    hideCaption,
    isEndOfSlideshow,
    meta,
    pollQuestionOverride,
    reaction,
    showShareClue,
    shareData,
    sharingOptions,
    status,
  } = props;
  const theme = getTheme(Store);
  const device = getDevice(Store);
  const hasActiveSlideNumber = validateActiveSlideNumber(activeSlideNumber);
  const state = Store.getState();
  const adId = AdTypes.SLIDESHOW_RIGHT_AD;

  /**
   * share button clicked
   * @param {string} name to share
   * @param {Object} shareData object
   * @param {Object} actions callback onShareClick
   */
  const onShareBarClick = (name) => {
    handleShareBarClick(name, props);
  };

  return (
    <div className={classnames(Styles.container, { [Styles.adContainer]: !hasActiveSlideNumber })}>
      <Status
        actions={actions}
        running={status.running}
        progress={status.progress}
        activeSlideNumber={activeSlideNumber}
        endSlideNumber={endSlideNumber}
        isEndOfSlideshow={isEndOfSlideshow}
        reaction={reaction}
        shareData={shareData}
        sharingOptions={sharingOptions}
      />
      {shareData && exists(shareData.title) && (
        <div className={Styles.title}>{shareData.title}</div>
      )}
      {meta && device === 'desktop' && (activeSlideNumber === 0 || meta.sponsor) && (
        <Meta
          authors={meta.author}
          date={meta.date}
          modifierClass={Styles.meta}
          showAvatar={false}
          showUpdateDate={false}
          source={meta.source}
          sponsor={meta.sponsor}
          tempAuthors={meta.tempAuthors}
          updateDate={meta.date}
        />
      )}
      {reaction && hasActiveSlideNumber && exists(reaction.pollQuestion) && (
        <div className={Styles.pollQuestion}>
          <h4 className={Styles.pollQuestionTitle}>
            {pollQuestionOverride || reaction.pollQuestion}
          </h4>
        </div>
      )}
      {activeSlideCaption && hasActiveSlideNumber && !hideCaption && (
        <div className={Styles.captionContainer}>
          <Truncate
            device={device}
            text={activeSlideCaption}
            html={activeSlideCaption}
            trimLength={180}
          />
        </div>
      )}
      {reaction && exists(activeSlideNumber) && (
        <Reaction
          slideId={activeSlideId}
          slideshowId={reaction.slideshowId}
          pollOptions={reaction.pollOptions}
          autoSlideChangeTime={reaction.autoSlideChangeTime}
          goToNext={actions.goToNextSlide}
          closedDate={reaction.closedDate}
          theme={theme}
          modifierClass={Styles.sidebarReactions}
          webAppPollOptions={reaction.webAppPollOptions}
        />
      )}
      {!reaction && hasActiveSlideNumber && (
        <ShareBar
          className={Styles.shareBar}
          onClick={onShareBarClick}
          padLeft={false}
          sharingOptions={sharingOptions}
          showShareClue={showShareClue}
          theme="rounded"
        />
      )}
      {activeSlideNumber === 0 && (
        <Clickable
          label={localization.get('viewGallery')}
          type="button"
          appearance="primary"
          className={Styles.startButton}
          onClick={() => actions.goToNextSlide('button')}
          icon="arrow"
          theme={{
            primary: '#1A1A1A',
          }}
        />
      )}
      {
        <div className={classnames({ [Styles.hideAd]: state.dfpAds.hideAds.includes(adId) })}>
          {adHelper.getAd(adId, { hasBg: false })}
        </div>
      }
    </div>
  );
};

/**
 * propTypes
 * @property {Object} meta - Meta data from this content (Author, date, source and sponsor)
 * @property {Object} meta.sponsor - Link, Logo and name from the sponsor
 */
Sidebar.propTypes = {
  actions: PropTypes.shape({
    goToPrevSlide: PropTypes.func,
    goToNextSlide: PropTypes.func,
    togglePlaying: PropTypes.func,
    onShareClick: PropTypes.func,
  }).isRequired,
  activeSlideCaption: PropTypes.string,
  activeSlideId: PropTypes.string,
  activeSlideNumber: PropTypes.number,
  endSlideNumber: PropTypes.number,
  hideCaption: PropTypes.bool,
  isEndOfSlideshow: PropTypes.bool,
  meta: PropTypes.shape({
    author: PropTypes.array,
    date: PropTypes.string,
    source: PropTypes.string,
    sponsor: PropTypes.shape({
      link: PropTypes.string,
      logo: PropTypes.string,
      name: PropTypes.string,
    }),
    tempAuthors: PropTypes.array,
  }),
  pollQuestionOverride: PropTypes.string,
  reaction: PropTypes.object,
  sharingOptions: PropTypes.object,
  shareData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    primaryTag: PropTypes.object.isRequired,
  }).isRequired,
  showShareClue: PropTypes.bool,
  status: PropTypes.shape({
    running: PropTypes.bool,
    progress: PropTypes.number,
  }).isRequired,
};

export default Sidebar;
