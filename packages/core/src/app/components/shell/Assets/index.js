import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  AWS_FILE_URL, GPT_FILE_URL, RUBICON_FILE_URL,
} from '@univision/fe-commons/dist/constants/ads';
import { JWP_FILE_URL, JWP_KEY } from '@univision/fe-commons/dist/constants/video';

/**
 * Javascript assets required to render a shell.
 * @param {Object} assets Assets.
 * @param {boolean} disableAds DisableAds flag.
 * @param {string} env site enviroment.
 * @returns {JSX}
 * @constructor
 */
const Assets = ({
  assets, disableAds,
}) => {
  return (
    <Fragment>
      {!disableAds && (
        <script
          async
          type="text/javascript"
          src={GPT_FILE_URL}
        />
      )}
      {!disableAds && (
        <script
          async
          type="text/javascript"
          src={AWS_FILE_URL}
        />
      )}
      {!disableAds && (
        <script
          async
          type="text/javascript"
          src={RUBICON_FILE_URL}
        />
      )}
      <script src={JWP_FILE_URL} />
      <script>{JWP_KEY}</script>
      {Array.isArray(assets.jsDependencies) && assets.jsDependencies.map(js => <script defer src={js} charSet="UTF-8" />)}
      <script defer src={assets.javascript} charSet="UTF-8" />
    </Fragment>
  );
};

Assets.propTypes = {
  assets: PropTypes.object,
  disableAds: PropTypes.bool,
};

Assets.defaultProps = {
  assets: {
    jsDependencies: [],
  },
};

export default Assets;
