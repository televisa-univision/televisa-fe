import PropTypes from 'prop-types';
import React from 'react';

/**
 * Gets the right resource hint markup based on the relationship (rel) value
 * @param {string} rel Relationship of this link to the document that includes it
 * @param {string }href Address for this link
 * @param {string} as Type of preloaded file
 * @returns {JSX}
 */
const getResourceHint = (rel, href, as) => {
  switch (rel) {
    case 'preload':
    case 'preconnect':
      return <link rel={rel} href={href} as={as} crossOrigin="true" />;
    case 'prefetch':
    case 'dns-prefetch':
    case 'prerender':
    default:
      return <link rel={rel} href={href} />;
  }
};

/**
 * Component for generating resource hints
 * @param {Object} props This component's props
 * @returns {JSX}
 * @constructor
 */
const ResourceHint = ({ rel, href, as }) => {
  return getResourceHint(rel, href, as);
};

ResourceHint.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string.isRequired,
  rel: PropTypes.string.isRequired,
};

export default ResourceHint;
