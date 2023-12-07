import React from 'react';
import PropTypes from 'prop-types';

import thirdPartyFeatures from '@univision/fe-commons/dist/config/features/thirdParties';
import seoTags from '@univision/fe-commons/dist/utils/seo/seoTags';
import ampFactory from 'app/AMP/utils/factories/ampFactory';
import resourceHints from '../ResourceHint/utils';
import Assets from '../Assets';

/**
 * Head component to handle SEO, meta tags and styles
 * @param {Object} props Component props
 * @returns {JSX}
 */
const Head = (props) => {
  const { assets, initialState } = props;
  const hints = resourceHints.get();
  const env = initialState?.config?.deploy?.env;

  return (
    <head>
      <meta charSet="utf-8" />
      {seoTags.title(initialState)}
      {seoTags.canonical(initialState)}
      {ampFactory.getAmpHtmlLink(initialState)}
      {seoTags.language(initialState, 'mx')}
      {seoTags.language(initialState)}
      {seoTags.metas(initialState)}
      {assets
        && !assets.inlineCss
        && assets.styles && <link rel="stylesheet" href={assets.styles} />}
      {hints && hints}
      <Assets
        assets={assets}
        disableAds={thirdPartyFeatures.isDFPDisabled()}
        env={env}
      />
    </head>
  );
};

/**
 * propTypes
 * @property {Object} assets Webpack assets
 * @property {Object} initialState initial application state
 */
Head.propTypes = {
  assets: PropTypes.object,
  initialState: PropTypes.object,
};

export default Head;
