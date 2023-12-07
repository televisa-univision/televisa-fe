import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import Store from '@univision/fe-commons/dist/store/store';
import { getRequestParams, getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';
import LiveStream from '@univision/fe-video/dist/components/LiveStream';
import MediaPlayerConnector from '@univision/fe-components-base/dist/components/MediaPlayer/MediaPlayerConnector';
import VideoPlayerPIPWrapper from '@univision/fe-video/dist/components/VideoPlayerPIPWrapper';

import { VIDEO_PLAY_REASON_VIEWABLE } from '@univision/fe-commons/dist/constants/video';
import MainWrapper from '../../layout/MainWrapper';
import Styles from './EmbeddedVideo.scss';

/**
 * Container component representing a Video page
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const EmbeddedVideo = (props) => {
  const requestParams = getRequestParams(Store);
  const { page } = props;
  const {
    data: {
      adSettings: {
        disableVideoAds,
      } = {},
    } = {},
  } = page;
  if ('playlist' in requestParams) {
    return (
      <Provider store={Store}>
        <div>
          <BKPIndicator />
          <div className={Styles.videoWrapper}>
            <VideoPlayer
              disableVideoAds={disableVideoAds}
              variant="dark"
              widgetData={page}
            />
          </div>
        </div>
      </Provider>
    );
  }

  let autoplayConf = VIDEO_PLAY_REASON_VIEWABLE;
  if (requestParams?.autoplay === 'false') {
    autoplayConf = false;
  }

  const commonProps = {
    ...page,
    autoplay: autoplayConf,
    embedVideo: true,
    hideMeta: true,
    hidePlaylist: true,
    env: requestParams.mode,
    theme: getTheme(Store),
  };

  let videoBlock = (
    <VideoPlayer
      {...commonProps}
      disableVideoAds={disableVideoAds}
      widgetData={page}
    />
  );

  if (commonProps.eid) {
    const {
      eid: embedId,
      enabled,
      mcpid: mcpId,
      ssidPrefix: prefix,
      ssid,
      adSettings: {
        targeting: customParams,
      },
    } = commonProps;

    const dfp = {
      prefix,
      advalue: typeof ssid === 'string' ? ssid.replace('e.', '') : '',
      customParams,
    };

    videoBlock = (
      <MainWrapper state={Store.getState()} dfpSupport={false}>
        <VideoPlayer
          {...commonProps}
          disableVideoAds={disableVideoAds}
          fmgCall={{
            name: 'playVOD',
            options: {
              embed: true,
              embedId,
              disabled: !enabled,
              mcpId,
              dfp,
            },
          }}
          widgetData={page}
        />
      </MainWrapper>
    );

    if (commonProps.livestreamId) {
      videoBlock = (
        <MainWrapper state={Store.getState()} dfpSupport={false}>
          <LiveStream embedVideo {...props.page} autoplay={autoplayConf} dfp={dfp} />
        </MainWrapper>
      );
    }
  }

  return (
    <Provider store={Store}>
      {videoBlock}
      <VideoPlayerPIPWrapper />
      <MediaPlayerConnector />
    </Provider>
  );
};

/**
 * propTypes
 * @property {Array} widgets - React widgets to be rendered in the page
 */
EmbeddedVideo.propTypes = {
  page: PropTypes.object.isRequired,
};

export default EmbeddedVideo;
