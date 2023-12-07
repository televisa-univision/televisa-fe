import React from 'react';
import PropTypes from 'prop-types';

/**
 * AMP Scripts component
 * @param {Object} props for the component
 * @returns {JSX}
 */
const Scripts = ({ pageData }) => {
  /* eslint-disable react/no-danger */
  return (
    <>
      <title>{pageData.title}</title>
      <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js" />
      <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js" />
      <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js" />
      <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js" />
      <script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js" />
      <script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js" />
      <script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js" />
    </>
  );
};

Scripts.propTypes = {
  pageData: PropTypes.object,
};

export default Scripts;
