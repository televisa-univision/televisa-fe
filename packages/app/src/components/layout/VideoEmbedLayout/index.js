import React from 'react';
import PropTypes from 'prop-types';

import Tracking from '@univision/fe-commons/dist/components/tracking/MainTracking';
import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';

import EmbeddedVideo from '../../contentTypes/EmbeddedVideo';
import PageHead from '../../base/PageHead';

/**
 * VideoEmbedLayout layout
 * @param {Object} props - react Props for this component
 * @param {Object} props.pageData - page object definition
 * @returns {JSX}
 */
const VideoEmbedLayout = ({ pageData }) => {
  return (
    <>
      <PageHead pageData={pageData} />
      <Tracking
        contentType={contentTypes.VIDEO}
        page={pageData}
      />
      <EmbeddedVideo pageData={pageData} />
    </>
  );
};

VideoEmbedLayout.propTypes = {
  pageData: PropTypes.object,
};

export default VideoEmbedLayout;
