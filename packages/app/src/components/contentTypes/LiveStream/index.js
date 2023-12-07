import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import { getNetworkChannels } from '@univision/fe-commons/dist/utils/helpers/taxonomy/matchers/custom/soccer';
import { getEPGSchedule, parseVLLSchedule } from '@univision/fe-commons/dist/utils/video';
import { useInterval } from '@univision/fe-commons/dist/utils/hooks';
import TudnMvpdWrapper from '@univision/fe-deportes/dist/components/base/TudnMvpdWrapper';

import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import LiveStream from '@univision/fe-video/dist/components/LiveStream';

import Styles from './LiveStreamPage.styles';
import ConnectedGlobalWidget from '../../base/GlobalWidget';

const ThemeWrapper = styled.div`${Styles.themeWrapper}`;

export const REFETCH_INTERVAL = 30000;
export const VLL_REFETCH_INTERVAL = 120000;

/**
 * Return schedule livestream data
 * @param {Object} args schedule arguments
 */
const getLivestreamSchedule = ({
  isEnabledSchedule, livestreamId, nodeId,
}) => {
  if (isEnabledSchedule) {
    // eslint-disable-next-line babel/no-unused-expressions
    global?.FMG?.getLivestreamSchedule?.({ livestreamId, nodeId });
  }
};

/**
 * Register Schedule event data.
 * @param {Object} args schedule arguments
 */
const registerScheduleEvent = ({ isEnabledSchedule, nodeId, callback }) => {
  if (isEnabledSchedule) {
    // eslint-disable-next-line babel/no-unused-expressions
    global?.FMG?.on?.('vhm.proxy.schedule', (scheduleResult) => {
      const scheduleData = parseVLLSchedule(scheduleResult?.schedule);
      if (isValidArray(scheduleData)) {
        // eslint-disable-next-line babel/no-unused-expressions
        callback?.(scheduleData);
      }
    }, nodeId);
  }
};

/**
 * Container component rendering all pieces of a LiveStream
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const LiveStreamPage = ({ pageData }) => {
  const { data, theme } = pageData ?? {};

  const {
    adSettings: {
      disableVideoAds,
    } = {},
    digitalChannelSchedule,
    enableDai,
    isAkamaiTokenEnabled,
    isDigitalChannelLiveStream,
    livestreamId: currentLivestreamId,
    streamId,
    mainImage,
    playerType,
    primaryTag,
    title,
    tudnExtra: tudnXtra,
    tudnExtraSettings: tudnXtraSettings,
    tvssUrl,
    useVLLSchedule,
    is360,
  } = data ?? {};
  const livestreamId = streamId || currentLivestreamId;
  const nodeId = `livestream-${livestreamId}`;
  const channels = getNetworkChannels(data);
  const variant = isDigitalChannelLiveStream ? theme?.variant : 'light';
  const useDigitalChannelSchedule = isValidArray(digitalChannelSchedule) && !useVLLSchedule;
  const [program, setProgram] = useState(null);
  const [schedule, setSchedule] = useState(
    useDigitalChannelSchedule ? digitalChannelSchedule : null,
  );
  const hidePlaylist = !isValidArray(getKey(data, 'playlist.videos'));

  /**
   * Hook to manage schedule data.
   */
  useEffect(() => {
    if (isValidArray(schedule)) {
      setProgram(getEPGSchedule(schedule)?.currentShow);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]);

  /**
   * Mount/Unmount component
   */
  useEffect(() => {
    const isEnabledSchedule = useVLLSchedule;
    registerScheduleEvent({
      isEnabledSchedule,
      nodeId,
      callback: (scheduleData) => {
        setSchedule(scheduleData);
        setProgram(scheduleData[0]);
      },
    });
    getLivestreamSchedule({
      isEnabledSchedule,
      livestreamId,
      nodeId,
    });
    return () => global?.FMG?.off?.('vhm.proxy.schedule', nodeId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Interval returns the schedule data.
   */
  useInterval(() => {
    getLivestreamSchedule({
      isEnabledSchedule: useVLLSchedule,
      livestreamId,
      nodeId,
    });
  }, VLL_REFETCH_INTERVAL);

  /**
   * Interval to refresh the schedule data.
   */
  useInterval(() => {
    if (useDigitalChannelSchedule) {
      setProgram(getEPGSchedule(schedule)?.currentShow);
    }
  }, REFETCH_INTERVAL);

  return (
    <>
      <ThemeWrapper theme={theme}>
        <ConnectedGlobalWidget />
        <div className="row">
          <div className="col-12">
            <VideoPlayer
              deferPlaylistLoad
              digitalChannelSchedule={schedule}
              disableVideoAds={disableVideoAds}
              fullWidth
              hidePlaylist={hidePlaylist}
              isLivestreamPage
              isNewsDigitalChannel={isDigitalChannelLiveStream}
              program={program}
              simple
              variant={variant}
              widgetData={data}
              nodeId={nodeId}
            >
              {videoProps => (
                <LiveStream
                  disableVideoAds={disableVideoAds}
                  livestreamId={livestreamId}
                  tvssUrl={tvssUrl}
                  isAuth={getKey(data, 'isAuth', getKey(data, 'auth'), false)}
                  primaryTag={primaryTag}
                  mainImage={mainImage}
                  playerType={playerType}
                  isActive={getKey(data, 'isActive', getKey(data, 'active'), false)}
                  isNewsDigitalChannel={isDigitalChannelLiveStream}
                  channels={channels}
                  enableDai={enableDai}
                  videoProps={{ ...videoProps, isLivestream: true }}
                  program={program}
                  title={title}
                  isAkamaiTokenEnabled={isAkamaiTokenEnabled}
                  is360={is360}
                  nodeId={nodeId}
                />
              )}
            </VideoPlayer>
          </div>
        </div>
      </ThemeWrapper>
      <TudnMvpdWrapper
        isXtra={tudnXtra}
        tudnXtraSettings={tudnXtraSettings}
      />
    </>
  );
};

/**
 * propTypes
 * @property {Object} pageData - Data coming from cms
 */
LiveStreamPage.propTypes = {
  pageData: PropTypes.shape({
    data: PropTypes.shape({
      livestreamId: PropTypes.string,
      streamId: PropTypes.string,
      mainImage: PropTypes.string,
      playerType: PropTypes.string,
      primaryTag: PropTypes.object,
      tudnExtra: PropTypes.string,
      tudnExtraSettings: PropTypes.object,
      tvssUrl: PropTypes.string,
      enableDai: PropTypes.string,
      isAkamaiTokenEnabled: PropTypes.bool,
      vertical: PropTypes.string,
    }),
    theme: PropTypes.object,
  }),
};

export default LiveStreamPage;
