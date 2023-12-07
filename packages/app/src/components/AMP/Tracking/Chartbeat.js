/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Chartbeat tracking for AMP pages.
 * @param {Object} page The page data from API
 * @returns {XML}
 * @constructor
 */
const Chartbeat = ({ page }) => {
  const pageData = page?.data;
  const {
    canonical_url, title, content_type, content_author, section_full_hierarchy,
  } = pageData?.tracking?.analytics?.data || {};
  const sections = section_full_hierarchy?.join(', ');
  const sectionsTag = sections && content_type ? `${sections}, ${content_type}` : sections || content_type;
  const domain = page?.domain;
  const domainShort = domain?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');

  const chartbeatData = {
    vars: {
      uid: '38125',
      domain: domainShort,
      sections: sectionsTag,
      authors: content_author,
      canonicalPath: canonical_url,
      title,
      contentType: content_type,
    },
  };

  return (
    <amp-analytics type="chartbeat">
      <script
        type="application/json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chartbeatData) }}
      />
    </amp-analytics>
  );
};

/**
 * propTypes
 * @property {Object} page - The page object from content API
 */
Chartbeat.propTypes = {
  page: PropTypes.object,
};

export default Chartbeat;
