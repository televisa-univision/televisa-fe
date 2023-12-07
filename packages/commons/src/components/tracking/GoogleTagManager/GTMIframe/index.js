/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

import Store from '../../../../store/store';
import { getEnv } from '../../../../store/storeHelpers';
import gtmConfig from '../../../../utils/tracking/googleTagManager/gtmConfig.json';

/**
 * Renders the <iframe> tag to load Google Tag Manager.
 * This is a fallback to disabled javascript.
 * https://developers.google.com/tag-manager/quickstart
 * @param {string} id - GTM container id
 * @returns {XML}
 * @constructor
 */
const GTMIframe = ({
  id = gtmConfig.id,
}) => {
  const isTestEnvironment = getEnv(Store) === 'test';
  const parameters = isTestEnvironment ? gtmConfig.testParameters : '';
  const iframe = `
    <iframe
        title=${id}
        src="https://www.googletagmanager.com/ns.html?id=${id + parameters}";
        height="0"
        width="0"
        style="display: none; visibility: hidden;"
      ></iframe>
  `;

  // React has issues with SSR and the <noscript> tag
  // We need to use dangerouslySetInnerHTML
  // https://github.com/facebook/react/issues/11423
  return (
    <noscript dangerouslySetInnerHTML={{ __html: iframe }} />
  );
};

GTMIframe.propTypes = {
  id: PropTypes.string,
};

export default GTMIframe;
