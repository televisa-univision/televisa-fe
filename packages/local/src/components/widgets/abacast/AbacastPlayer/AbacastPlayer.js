import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import BackgroundImage from '@univision/fe-components-base/dist/components/BackgroundImage';
import Picture from '@univision/fe-components-base/dist/components/Picture';
import PLAY_STATES from '@univision/fe-commons/dist/constants/radioPlayStates';
import { RADIO_PLAYER_ID, FORWARD, REWIND } from '@univision/fe-commons/dist/constants/radio';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import Button from '@univision/fe-components-base/dist/components/Button';

import AudioProgressBar from './AudioProgressBar';
import AudioMoreInfo from './AudioMoreInfo';
import StationContact from './StationContact';
import StationMenu from './StationMenu';
import StationShare from './StationShare';
import StreamLoading from './StreamLoading';
import UforiaIcon from './UforiaIcon';
import VolumeSlider from './VolumeSlider';
import Styles from './AbacastPlayer.scss';
import localization from '../../../../utils/localization';

/**
 * Render the ProgressBar
 * @param {func} handleProgressBar handle ProgressBar
 * @returns {JSX}
 */
const renderProgressBar = handleProgressBar => (
  <div className={Styles.bottom}>
    <AudioProgressBar onChange={handleProgressBar} />
  </div>
);

/**
 * AbacastPlayer
 * @returns {JSX}
 */
const AbacastPlayer = ({
  alternativeLogo,
  collapsed,
  detailedDescription,
  handleClose,
  handleOpen,
  handleVolume,
  handleProgressBar,
  handleSeek,
  image,
  isPodcastEpisode,
  onShare,
  onClose,
  onImageError,
  play,
  rate,
  sharingOptions,
  socialNetworks,
  stationContact,
  stationDescription,
  stationMenu,
  stationShare,
  stationTitle,
  toggleCollapsed,
  toggleMuted,
  togglePlaying,
  togglePlaybackRate,
  uri,
  volume,
  volumeIconName,
}) => {
  const albumArt = {};
  const useFallback = true;
  const [showInfo, setShowInfo] = useState(false);
  const showPodcastInfo = isPodcastEpisode && showInfo;
  /**
   * Toggles showInfo value.
   */
  const toggleShowInfo = () => {
    setShowInfo(val => !val);
  };
  albumArt.overrideImageUrl = onImageError();

  return (
    <div
      className={classnames(Styles.wrapper, {
        [Styles.hidden]: !stationTitle,
        [Styles.expanded]: !collapsed,
      })}
    >
      <div
        className={Styles.container}
        role="button"
        tabIndex="0"
        onClick={collapsed && toggleCollapsed}
        onKeyPress={collapsed && toggleCollapsed}
      >
        <div id={RADIO_PLAYER_ID} />
        {albumArt.overrideImageUrl && (
          <BackgroundImage
            overrideImageUrl={albumArt.overrideImageUrl}
            className={classnames(Styles.background, { [Styles.expanded]: !collapsed })}
          />
        )}
        <div className={classnames('uvs-container', Styles.innerContainer)}>
          <div className={Styles.header}>
            <div className={Styles.left}>
              <UforiaIcon
                name={(collapsed && 'chevronUp') || (showPodcastInfo ? 'close' : 'chevronDown')}
                onClick={showPodcastInfo ? toggleShowInfo : toggleCollapsed}
              />
              {collapsed ? (
                <Fragment>
                  <div className={Styles.imageContainer}>
                    <Picture
                      {...albumArt}
                      className={classnames(Styles.image, {
                        [Styles.fallback]: useFallback,
                      })}
                      onImageError={onImageError}
                    />
                    {useFallback && alternativeLogo && (
                      <Picture
                        className={Styles.alternativeLogo}
                        image={alternativeLogo}
                      />
                    )}
                  </div>
                  {play === PLAY_STATES.LOADING ? (
                    <StreamLoading size={28} />
                  ) : (
                    <Button onClick={(e) => { e.stopPropagation(); togglePlaying(); }} plain>
                      <Icon
                        name={play === PLAY_STATES.PLAY ? 'pausecircle' : 'playcircle'}
                        size={28}
                        fill={WHITE}
                      />
                    </Button>
                  )}
                  <div className={Styles.stationInfo}>
                    <strong>{stationTitle}</strong>
                    <p>{stationDescription}</p>
                  </div>
                </Fragment>
              ) : (
                <div
                  role="button"
                  tabIndex="0"
                  onClick={toggleCollapsed}
                  onKeyPress={toggleCollapsed}
                  className={Styles.nowPlayingToggle}
                >
                  {showPodcastInfo ? (
                    <UforiaIcon name="close" size={14} onClick={toggleShowInfo} />
                  ) : (
                    <UforiaIcon name="chevronDown" size={14} onClick={toggleCollapsed} />
                  )}
                  <strong className={Styles.nowPlaying}>Now playing</strong>
                </div>
              )}
            </div>
            <div className={Styles.right}>
              <div className={Styles.volume}>
                <VolumeSlider volume={volume} onChange={handleVolume} />
                <UforiaIcon name={volumeIconName} onClick={toggleMuted} size={20} />
              </div>
              {collapsed ? (
                <UforiaIcon name="close" onClick={onClose} />
              ) : (
                <Fragment>
                  <UforiaIcon name="share" openKey="stationShare" onClick={handleOpen} />
                  {!isPodcastEpisode && (
                    <StationMenu
                      onOpen={handleOpen}
                      onClose={handleClose}
                      visible={stationMenu}
                      uri={uri}
                    />
                  )}
                </Fragment>
              )}
            </div>
            {collapsed && isPodcastEpisode
              && renderProgressBar(handleProgressBar)}
          </div>
          <div className={classnames(Styles.expandedWrapper, { [Styles.visible]: !collapsed })}>
            <div className={classnames(Styles.imageContainer, { [Styles.expanded]: !collapsed })}>
              <Picture
                {...albumArt}
                className={classnames(Styles.image, {
                  [Styles.fallback]: useFallback,
                  [Styles.expanded]: !collapsed,
                })}
                onImageError={onImageError}
              />
              {useFallback && alternativeLogo && (
                <Picture
                  className={classnames(Styles.alternativeLogo, {
                    [Styles.expanded]: !collapsed,
                  })}
                  image={alternativeLogo}
                />
              )}
              {!collapsed && isPodcastEpisode && renderProgressBar(handleProgressBar)}
            </div>
            <div className={classnames(
              Styles.expandedContent,
              { [Styles.isPodcast]: isPodcastEpisode, [Styles.showPodcastInfo]: showPodcastInfo }
            )}
            >
              {showPodcastInfo ? (
                <AudioMoreInfo
                  description={detailedDescription}
                  uri={uri}
                  play={play}
                  togglePlaying={togglePlaying}
                  title={stationTitle}
                  iconName="podcast"
                  textLink={localization.get('goToPodcast')}
                />
              ) : (
                <div className={Styles.expandedActions}>
                  <div className={classnames(Styles.controls,
                    { [Styles.isPodcast]: isPodcastEpisode })}
                  >
                    {isPodcastEpisode && !showInfo && (
                      <>
                        <Button onClick={togglePlaybackRate} className={Styles.controlRate} plain>
                          {rate}x
                        </Button>
                        <Button
                          onClick={() => handleSeek(10, REWIND)}
                          className={Styles.controlRwd}
                          plain
                        >
                          <Icon name="rewind10" size={32} fill={WHITE} />
                        </Button>
                      </>
                    )}
                    {!showPodcastInfo && (play === PLAY_STATES.LOADING ? (
                      <StreamLoading size={60} />
                    ) : (
                      <div className={Styles.playButtonAndSongInfo}>
                        <Button onClick={togglePlaying} plain>
                          <Icon
                            name={play === PLAY_STATES.PLAY ? 'pausecircle' : 'playcircle'}
                            size={60}
                            fill={WHITE}
                          />
                        </Button>
                      </div>
                    ))}
                    {isPodcastEpisode && !showInfo && (
                      <>
                        <Button
                          onClick={() => handleSeek(10, FORWARD)}
                          className={Styles.controlFwd}
                          plain
                        >
                          <Icon name="forward10" size={32} fill={WHITE} />
                        </Button>
                        <Button onClick={toggleShowInfo} plain className={Styles.controlInfo}>
                          <Icon name="infoCircle" size={20} fill={WHITE} />
                        </Button>
                      </>
                    )}
                  </div>
                  <div className={Styles.expandedInfo}>
                    <strong>{stationTitle}</strong>
                    <p title={stationDescription}>{stationDescription}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {stationContact && <StationContact socialNetworks={socialNetworks} onClose={handleClose} />}
        {stationShare && (
          <StationShare
            description={stationDescription}
            image={image}
            onShare={onShare}
            onClose={handleClose}
            sharingOptions={sharingOptions}
            title={stationTitle}
            uri={uri}
          />
        )}
      </div>
    </div>
  );
};

AbacastPlayer.propTypes = {
  alternativeLogo: PropTypes.object,
  collapsed: PropTypes.bool,
  detailedDescription: PropTypes.string,
  handleClose: PropTypes.func,
  handleOpen: PropTypes.func,
  handleVolume: PropTypes.func,
  handleProgressBar: PropTypes.func,
  handleSeek: PropTypes.func,
  image: PropTypes.object,
  isPodcastEpisode: PropTypes.bool,
  onClose: PropTypes.func,
  onShare: PropTypes.func,
  onImageError: PropTypes.func,
  play: PropTypes.string,
  rate: PropTypes.number,
  sharingOptions: PropTypes.object,
  socialNetworks: PropTypes.array,
  stationContact: PropTypes.bool,
  stationDescription: PropTypes.string,
  stationMenu: PropTypes.bool,
  stationShare: PropTypes.bool,
  stationTitle: PropTypes.string,
  toggleCollapsed: PropTypes.func,
  toggleMuted: PropTypes.func,
  togglePlaying: PropTypes.func,
  togglePlaybackRate: PropTypes.func,
  uri: PropTypes.string,
  volume: PropTypes.number,
  volumeIconName: PropTypes.string,
};

AbacastPlayer.defaultProps = {
  onImageError: () => null,
};

export default AbacastPlayer;
