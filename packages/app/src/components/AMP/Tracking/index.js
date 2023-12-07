import React from 'react';
import PageView from './PageView';
import Comscore from './Comscore';
import Nielsen from './Nielsen';
import Chartbeat from './Chartbeat';

/**
 * Adds AMP Tracking integrations
 * @returns {JSX}
 */
const Tracking = ({ page, requestParams, config }) => {
  /**
   * Render tracking integrations
   * @returns {JSX}
   */
  const renderIntegrations = () => (
    <>
      <PageView pageData={page?.data} config={config} />
      <Comscore />
      <Chartbeat page={page} />
      <Nielsen page={page} />
    </>
  );

  return (
    requestParams && !('articleRawHtml' in requestParams) ? renderIntegrations() : null
  );
};

export default Tracking;
