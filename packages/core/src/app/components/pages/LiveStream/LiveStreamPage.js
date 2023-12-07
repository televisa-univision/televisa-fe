import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import Store from '@univision/fe-commons/dist/store/store';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { getKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import { getNetworkChannels } from '@univision/fe-commons/dist/utils/helpers/taxonomy/matchers/custom/soccer';
import { getPageCategory, getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import { getEPGSchedule, parseVLLSchedule } from '@univision/fe-commons/dist/utils/video';
import { useInterval } from '@univision/fe-commons/dist/utils/hooks';
import Header from '@univision/fe-components-base/dist/components/Header';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import ScheduleList from '@univision/fe-components-base/dist/components/ScheduleList';
import TudnMvpdWrapper from '@univision/fe-deportes/dist/components/base/TudnMvpdWrapper';

import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import LiveStream from '@univision/fe-video/dist/components/LiveStream';

import GlobalWidget from '../../layout/GlobalWidget';
import MainWrapper from '../../layout/MainWrapper';
import Styles from './LiveStreamPage.scss';
import StyledComponent from './LiveStreamPage.styles';

const ThemeWrapper = styled.div`${StyledComponent.themeWrapper}`;

export const REFETCH_INTERVAL = 30000;
export const VLL_REFETCH_INTERVAL = 120000;

/**
 * Return schedule livestream data
 * @param {Object} args schedule arguments
 */
const getLivestreamSchedule = async ({
  isEnabledSchedule, livestreamId, nodeId,
}) => {
  if (isEnabledSchedule) {
    // eslint-disable-next-line babel/no-unused-expressions
    global?.FMG?.getLivestreamSchedule?.({ livestreamId, nodeId });
  }
};

/**
 * Container component rendering all pieces of a LiveStream
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const LiveStreamPage = ({ page }) => {
  const {
    livestreamId,
    mainImage,
    playerType,
    primaryTag,
    tudnExtra: tudnXtra,
    tudnExtraSettings: tudnXtraSettings,
    tvssUrl,
    enableDai,
    jwRecommendationChannel,
    digitalChannelSchedule,
    isDigitalChannelLiveStream,
    isAkamaiTokenEnabled,
    useVLLSchedule,
    title,
    adSettings,
  } = page;

  const nodeId = `livestream-${livestreamId}`;
  const channels = getNetworkChannels(page);
  const theme = getTheme(Store);
  const variant = isDigitalChannelLiveStream ? theme?.variant : 'light';
  const useDigitalChannelSchedule = isValidArray(digitalChannelSchedule) && !useVLLSchedule;
  const [tab, setTab] = useState(null);
  const [program, setProgram] = useState(null);
  const [schedule, setSchedule] = useState(
    useDigitalChannelSchedule ? digitalChannelSchedule : null
  );

  useEffect(() => {
    if (isValidArray(schedule)) {
      setTab({
        label: localization.get('schedule'),
        content: <ScheduleList schedule={schedule} variant={variant} />,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]);

  useEffect(() => {
    if (useVLLSchedule) {
      // eslint-disable-next-line babel/no-unused-expressions
      global?.FMG?.on?.('vhm.proxy.schedule', (scheduleResult) => {
        const scheduleData = parseVLLSchedule(scheduleResult?.schedule);
        if (isValidArray(scheduleData)) {
          setSchedule(scheduleData);
          setProgram(getEPGSchedule(schedule)?.currentShow);
        }
      }, nodeId);
    }
    getLivestreamSchedule({
      isEnabledSchedule: useVLLSchedule,
      livestreamId,
      nodeId,
    });
    return () => global?.FMG?.off?.('vhm.proxy.schedule', nodeId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    getLivestreamSchedule({
      isEnabledSchedule: useVLLSchedule,
      livestreamId,
      nodeId,
    });
  }, VLL_REFETCH_INTERVAL);

  useInterval(() => {
    if (useDigitalChannelSchedule) {
      setProgram(getEPGSchedule(schedule)?.currentShow);
    }
  }, REFETCH_INTERVAL);

  return (
    <Provider store={Store}>
      <ThemeWrapper theme={theme}>
        <MainWrapper state={Store.getState()}>
          <Header pageData={page} pageCategory={getPageCategory(Store)} />
          <GlobalWidget />
          <div className={`container ${Styles.container}`}>
            <div className="row">
              <div className="col-12">
                <VideoPlayer
                  disableVideoAds={adSettings?.disableVideoAds}
                  fullWidth
                  simple
                  isLivestreamPage
                  nodeId={nodeId}
                  variant={variant}
                  tab={tab}
                  hidePlaylist={!jwRecommendationChannel}
                  program={program}
                  widgetData={page}
                >
                  {videoProps => (
                    <LiveStream
                      disableVideoAds={adSettings?.disableVideoAds}
                      livestreamId={livestreamId}
                      tvssUrl={tvssUrl}
                      isAuth={getKey(page, 'isAuth', getKey(page, 'auth'))}
                      primaryTag={primaryTag}
                      mainImage={mainImage}
                      playerType={playerType}
                      isActive={getKey(page, 'isActive', getKey(page, 'active'))}
                      channels={channels}
                      enableDai={enableDai}
                      jwRecommendationChannel={jwRecommendationChannel}
                      videoProps={{ ...videoProps, isLivestream: true }}
                      program={program}
                      title={title}
                      isAkamaiTokenEnabled={isAkamaiTokenEnabled}
                    />
                  )}
                </VideoPlayer>
              </div>
            </div>
          </div>
          <Footer />
          <TudnMvpdWrapper
            isXtra={tudnXtra}
            tudnXtraSettings={tudnXtraSettings}
          />
        </MainWrapper>
      </ThemeWrapper>
    </Provider>
  );
};

LiveStreamPage.propTypes = {
  page: PropTypes.object.isRequired,
};

export default LiveStreamPage;
