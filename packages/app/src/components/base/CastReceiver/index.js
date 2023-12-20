import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ScriptLoader from 'next/dist/client/experimental-script';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import receiver from '@univision/fe-video/dist/utils/cast/receiver';
import Styles from './CastReceiver.styles';

/**
 * cast media player component styles
 * @returns {JSX}
 */
const CastGlobalStyle = Styles.global;

/**
 * Load and initilize custom web cast receiver
 * @returns {JSX}
 */
function CastReceiver({ config, TagManager }) {
  const receiverInit = useCallback(() => {
    if (typeof window.cast === 'undefined' || typeof window.google === 'undefined') return;
    const mediaElement = document.getElementsByTagName('cast-media-player')[0];
    if (!mediaElement || typeof mediaElement.getMediaElement !== 'function') return;
    const daiApi = window.google.ima.cast.dai.api;
    const streamManager = new daiApi.StreamManager(mediaElement.getMediaElement());
    receiver.init(config?.urls, TagManager, streamManager, daiApi);
  }, [config, TagManager]);

  return (
    <>
      <ScriptLoader
        type="text/javascript"
        src="//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js"
        onLoad={receiverInit}
        onError={clientLogging}
      />
      <ScriptLoader
        type="text/javascript"
        src="//www.gstatic.com/cast/sdk/libs/devtools/debug_layer/caf_receiver_logger.js"
        onLoad={receiverInit}
        onError={clientLogging}
      />
      <ScriptLoader
        type="text/javascript"
        src="//imasdk.googleapis.com/js/sdkloader/cast_dai.js"
        onLoad={receiverInit}
        onError={clientLogging}
      />
      <CastGlobalStyle />
      <cast-media-player />
    </>
  );
}

CastReceiver.propTypes = {
  config: PropTypes.object,
  TagManager: PropTypes.object,
};

export default CastReceiver;
