import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import {
  isValidArray, toAbsoluteUrl, getKey,
} from '@univision/fe-commons/dist/utils/helpers';
import { capitalizeWord } from '@univision/shared-components/dist/utils/helpers';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';

/**
 * Get ld+json script with hierarchy data from api page
 * @param {array} hierarchy from the initial state
 * @param {string} domain from the initial state
 * @returns {JSX}
 */
const getHierarchyMetadataScript = (hierarchy, domain) => {
  if (isValidArray(hierarchy)) {
    try {
      const breadcrumbList = hierarchy.map((tag, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@id': toAbsoluteUrl(tag.uri, domain),
          name: capitalizeWord(tag.name),
        },
      }
      ));
      const breadcrumb = {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbList,
      };

      return (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        </Helmet>
      );
    } catch (error) {
      clientLogging(error);

      return null;
    }
  }
  return null;
};

/**
 * Get ld+json script with seo metadata from api page
 * @param {Object} ldJSON from the initial state
 * @returns {JSX}
 */
const getSEOMetadataScript = (ldJSON) => {
  if (!ldJSON) return null;

  try {
    const parsedldData = JSON.parse(ldJSON);

    return (
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(parsedldData)}</script>
      </Helmet>
    );
  } catch (error) {
    clientLogging(error);

    return null;
  }
};

/**
 * Container component representing the MainShell metadata
 * @param {Object} props React Props for this component
 * @returns {array}
 */
const MainShellMetadata = (props) => {
  const { domain = '', data = {} } = props.initialState || {};
  const hierarchyScript = getHierarchyMetadataScript(data.hierarchy, domain);
  const ldJSON = getKey(data.seo, 'ld_json');
  const seoMetadataScript = getSEOMetadataScript(ldJSON);

  return [
    hierarchyScript,
    seoMetadataScript,
  ];
};

/**
 * propTypes
 * @property {Object} initialState initial application state
 */
MainShellMetadata.propTypes = {
  initialState: PropTypes.object,
};

export default MainShellMetadata;
