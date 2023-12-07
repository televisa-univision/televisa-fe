import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import NextHead from 'next/head';
import isNextjsVersion from '@univision/fe-commons/dist/utils/helpers/appVersion';

let HeadWrapper = Helmet;

if (isNextjsVersion()) {
  HeadWrapper = NextHead;
}

/**
 * Wrapper for next/head or react-helmet depending of the webapp version
 * @param {Object} props - react props for this component
 * @param {Node} props.children - node/element/tag to inject on the document head
 * @returns {JSX}
 */
function HeadHelmet({
  children,
  ...otherProps
}) {
  return (
    <HeadWrapper {...otherProps}>
      {children}
    </HeadWrapper>
  );
}

HeadHelmet.propTypes = {
  children: PropTypes.node,
};

export default HeadHelmet;
