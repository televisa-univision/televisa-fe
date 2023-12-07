import React from 'react';
import PropTypes from 'prop-types';

import RawHtmlContainer from '@univision/fe-components-base/dist/components/enhancements/RawHtmlContainer';
/**
 * RawHtml content type component
 * @param {Object} props - react props for this component
 * @param {Object} props.pageData - page data from state API
 * @returns {JSX}
 */
function RawHtml({ pageData }) {
  return (
    <RawHtmlContainer html={pageData.data.html} headers={pageData.data.headers} />
  );
}

RawHtml.propTypes = {
  pageData: PropTypes.object.isRequired,
};

export default RawHtml;
