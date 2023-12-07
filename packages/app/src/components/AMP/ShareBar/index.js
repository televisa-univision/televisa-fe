import React from 'react';
import PropTypes from 'prop-types';

import shareButtonDataHelper from '@univision/fe-components-base/dist/components/ShareButton/shareButtonDataHelper';

import AmpIcon from '../Icon';
import { ShareBar, ShareLink, socialNetworks } from './ShareBar.styles';

/**
 * Share bar for AMP pages
 * @param {Object} sharingOptions Sharing options for the content.
 * @returns {jsx}
 * @constructor
 */
const AmpShareBar = ({ sharingOptions, siteName, theme }) => {
  return (
    <ShareBar theme={theme}>
      {Object.keys(socialNetworks).map(socialNetwork => (
        <ShareLink
          key={socialNetwork}
          theme={theme}
          socialNetwork={socialNetwork}
          {...shareButtonDataHelper(socialNetwork, sharingOptions)}
        >
          <AmpIcon fill="white" name={socialNetwork} />
        </ShareLink>
      ))}
    </ShareBar>
  );
};

AmpShareBar.propTypes = {
  sharingOptions: PropTypes.object,
  siteName: PropTypes.string,
  theme: PropTypes.object,
};

export default AmpShareBar;
