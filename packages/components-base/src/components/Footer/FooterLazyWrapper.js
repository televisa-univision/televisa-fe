import React from 'react';
import propTypes from 'prop-types';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';

import FooterData from './footerData.json';
import Footer from '.';

/**
 * FooterWrapper
 * @param {Object} props current footer props
 * @returns {JSX}
 */
const FooterWrapper = (props) => {
  const { site } = props;

  const commonProps = {
    ...props,
    footerLinks: FooterData[site],
  };

  return (
    <ErrorBoundary>
      <Footer {...commonProps} />
    </ErrorBoundary>
  );
};

FooterWrapper.propTypes = {
  site: propTypes.string,
};

export default FooterWrapper;
