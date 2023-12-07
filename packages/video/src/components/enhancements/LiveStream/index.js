import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-extraneous-dependencies
import LiveStream from '@univision/fe-video/dist/components/LiveStream';

import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import Caption from '@univision/fe-components-base/dist/components/Caption';

/**
 * LiveStreamEnhancement - LiveStream + Caption
 * @param {Object} props component propTypes
 * @returns {JSX}
 */
const LiveStreamEnhancement = ({ isFullWidth, ...enhancementData }) => {
  return (
    <div>
      {isFullWidth ? (
        <FullWidth breakpoints={['xxs', 'xs', 'sm', 'md', 'lg', 'xl']}>
          <LiveStream {...enhancementData} />
        </FullWidth>
      ) : <LiveStream {...enhancementData} />}
      {enhancementData.title && <Caption content={enhancementData.title} type="article" />}
    </div>
  );
};

LiveStreamEnhancement.propTypes = {
  isFullWidth: PropTypes.bool,
  enhancementData: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

LiveStreamEnhancement.defaultProps = {
  isFullWidth: false,
};

export default LiveStreamEnhancement;
