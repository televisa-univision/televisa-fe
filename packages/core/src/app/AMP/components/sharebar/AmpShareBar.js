import React from 'react';
import PropTypes from 'prop-types';

import shareButtonDataHelper from '@univision/fe-components-base/dist/components/ShareButton/shareButtonDataHelper';
import AmpIcon from '../icon/AmpIcon';
import { ShareBar, ShareLink, socialNetworks } from './AmpShareBar.styles';

/**
 * Share bar for AMP pages
 * @param {Object} sharingOptions Sharing options for the content.
 * @returns {jsx}
 * @constructor
 */
const AmpShareBar = ({ sharingOptions }) => {
  return (
    <ShareBar>
      {Object.keys(socialNetworks).map(socialNetwork => (
        <ShareLink
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
};

export default AmpShareBar;
