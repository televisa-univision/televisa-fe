/* eslint-disable @next/next/no-sync-scripts */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  AWS_FILE_URL, GPT_FILE_URL, RUBICON_FILE_URL,
} from '@univision/fe-commons/dist/constants/ads';
import { JWP_FILE_PRE_URL, JWP_FILE_POST_URL, JWP_KEY } from '@univision/fe-commons/dist/constants/video';
import features from '@univision/fe-commons/dist/config/features';

/**
 * Additional scripts/javascript assets required on the page.
 * @param {Object} props - react component props
 * @property {boolean} props.disableAds - true disable ads scripts
 * @returns {JSX}
 */
const Scripts = ({ disableAds }) => {
  const JWP_URL = `${JWP_FILE_PRE_URL}${features.video.JWPVersion()}${JWP_FILE_POST_URL}`;

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
      <script src={JWP_URL} />
      <script>{JWP_KEY}</script>
    </Fragment>
  );
};

Scripts.propTypes = {
  disableAds: PropTypes.bool,
};

export default Scripts;
