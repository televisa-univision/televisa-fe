import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import toAbsoluteUrl from '@univision/fe-utilities/helpers/url/toAbsoluteUrl';
import toStartCase from '@univision/fe-utilities/helpers/string/toStartCase';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';

/**
 * Get ld+json script with hierarchy data from api page
 * @param {array} hierarchy from the initial state
 * @param {string} domain from the initial state
 * @returns {JSX}
 */
function getHierarchyMicrodata(hierarchy, domain) {
  if (!isValidArray(hierarchy)) return null;

  try {
    const breadcrumbList = hierarchy.map((tag, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': toAbsoluteUrl(tag.uri, domain),
        name: toStartCase(tag.name),
      },
    }));
    const breadcrumb = {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbList,
    };
    const json = JSON.stringify(breadcrumb, null, 2);

    return (
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: json,
          }}
        />
      </Head>
    );
  } catch (error) {
    error.message = `Error creating hierarchy microdata: ${error.message}`;
    clientLogging(error);
    return null;
  }
}

/**
 * Get ld+json script with seo metadata from api page
 * @param {Object} ldJSON from the initial state
 * @returns {JSX}
 */
function getSeoMicrodata(ldJSON) {
  if (!ldJSON) return null;

  try {
    const parsedldData = JSON.parse(ldJSON);
    const json = JSON.stringify(parsedldData, null, 2);

    return (
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: json,
          }}
        />
      </Head>
    );
  } catch (error) {
    error.message = `Error creating seo microdata: ${error.message}`;
    clientLogging(error);
    return null;
  }
}

/**
 * Container component representing the MainShell metadata
 * @param {Object} props - react props for this component
 * @param {Object} props.pageData - page data from API
 * @returns {JSX[]}
 */
function PageMicrodata({ pageData }) {
  const { domain = '', data = {} } = pageData || {};
  const hierarchyMicrodata = getHierarchyMicrodata(data.hierarchy, domain);
  const { ld_json: ldJSON } = data.seo || {};
  const seoMicrodataMicrodata = getSeoMicrodata(ldJSON);

  return (
    <>
      {hierarchyMicrodata}
      {seoMicrodataMicrodata}
    </>
  );
}

PageMicrodata.propTypes = {
  pageData: PropTypes.object,
};

export default PageMicrodata;
