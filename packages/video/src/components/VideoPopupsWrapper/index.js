import React from 'react';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import PopupsProvider from '@univision/fe-components-base/dist/components/Popups/PopupsProvider';
import { FREE_PREVIEW_POPUP } from '@univision/fe-commons/dist/constants/video';
import FreeVideoPreview from './FreeVideoPreview';

/**
 * Video Popups Wrapper
 * @access public
 * @param {Object} props - Component props
 * @extends {React.Component}
 * @returns {JSX}
 */
const VideoPopupsWrapper = (props) => {
  if (typeof global.window === 'undefined') {
    return null;
  }

  return (
    <Provider store={Store}>
      <PopupsProvider
        popups={[
          {
            id: FREE_PREVIEW_POPUP,
            visible: false,
            content: FreeVideoPreview,
            props,
          },
        ]}
      />
    </Provider>
  );
};

export default VideoPopupsWrapper;
