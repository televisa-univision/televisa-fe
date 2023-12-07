import React, { Fragment } from 'react';
import PageView from './PageView';
import Comscore from './Comscore';

/**
 * Adds AMP Tracking integrations
 * @returns {JSX}
 */
const Tracking = ({ pageData, requestParams, config }) => {
  /**
   * Render tracking integrations
   * @returns {JSX}
   */
  const renderIntegrations = () => (
    <Fragment>
      <PageView pageData={pageData} config={config} />
      <Comscore />
    </Fragment>
  );

  return (
    requestParams && !('articleRawHtml' in requestParams) ? renderIntegrations() : null
  );
};

export default Tracking;
