import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';
import {
  getPageCategory,
} from '@univision/fe-commons/dist/store/storeHelpers';
import Header from '@univision/fe-components-base/dist/components/Header';
import ContentList from '@univision/fe-components-base/dist/components/ContentList';
import { exists, getKey, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import { SPONSORED_TAG_NAME } from '@univision/fe-commons/dist/constants/ads';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import features from '@univision/fe-commons/dist/config/features';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import userTiming from '@univision/fe-commons/dist/utils/performance/userTiming';
import { ARTICLE_RENDERED } from '@univision/fe-commons/dist/utils/performance/userTiming/marks';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import { TUDN_SITE, UNIVISION_SITE, TELEVISA_SITES } from '@univision/fe-commons/dist/constants/sites';
import { US, MX } from '@univision/fe-commons/dist/constants/userLocation';
import GlobalWidget from '../../layout/GlobalWidget';
import MainWrapper from '../../layout/MainWrapper';

import ArticleContent from './ArticleContent/ArticleContent';
import ArticleMetadata from './ArticleMetadata';
import RecipeMicrodata from './RecipeMicrodata';
import { trackNewArticle } from './helpers';

/**
 * Determines if infinite scroll articles is enabled
 * @param {number} limit the article limit
 * @param {*} firstArticle the first article
 * @param {Object} site current site
 * @param {string} userLocation current user location
 * @returns {boolean}
 */
const isInfiniteScrollingEnabled = (limit, firstArticle, site, userLocation) => {
  if ([TUDN_SITE, UNIVISION_SITE].includes(site) && userLocation === US) return false;
  return features.article.infiniteScrolling()
    && limit > 1
    && getKey(firstArticle, 'tagHierarchy[0].name') !== SPONSORED_TAG_NAME;
};

/**
 * Container component rendering all pieces of an article
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
class Article extends Component {
  /**
   * Setup user timing
   */
  componentDidMount() {
    userTiming(ARTICLE_RENDERED).finish();
  }

  /**
   * Renders page
   * @returns {JSX}
   */
  render() {
    const { page, site } = this.props;

    if (!exists(page)) return (<div />);

    let articles = [page];

    if (
      hasKey(page, 'relatedContent.relatedContent')
      && Array.isArray(page.relatedContent.relatedContent)
    ) {
      articles = [page, ...page.relatedContent.relatedContent.filter(a => a.type === 'article')];
    }

    const { adSettings } = page;
    const isTypeRecipe = getKey(page, 'articleType', '') === 'recipe';
    const thirdPartyAdsDisabled = isTypeRecipe || getKey(adSettings, 'disable3rdPartyAds', false);
    const contentsListLimit = getKey(features, 'article.contentsListLimit', 1);
    const userLocation = page?.userLocation;
    const infiniteScrollingEnabled = isInfiniteScrollingEnabled(
      contentsListLimit,
      articles[0],
      site,
      userLocation,
    );
    const isTelevisaSite = TELEVISA_SITES.includes(page.site);
    // show teads in MX and in TUDN site only
    const showTeads = (userLocation === MX && site === TUDN_SITE) || isTelevisaSite;

    return (
      <Provider store={Store}>
        <Fragment>
          <MainWrapper state={Store.getState()}>
            {showTeads
              && !thirdPartyAdsDisabled
              && adHelper.getAd(AdTypes.TEADS_AD, { isLazyLoaded: false })}
            {!thirdPartyAdsDisabled
              && adHelper.getAd(AdTypes.CUSTOM_OFFERING_AD_1X1, {
                isLazyLoaded: false,
              })}
            {!thirdPartyAdsDisabled
              && adHelper.getAd(AdTypes.CUSTOM_OFFERING_AD_1X2, {
                isLazyLoaded: false,
              })}
            {!thirdPartyAdsDisabled
              && adHelper.getAd(AdTypes.CUSTOM_OFFERING_AD_1X5, {
                isLazyLoaded: false,
              })}
            <Header
              cancelUpdate={infiniteScrollingEnabled}
              pageCategory={getPageCategory(Store)}
              pageData={page}
            />
            <GlobalWidget />
            <div itemScope itemType="http://schema.org/NewsArticle">
              <ArticleMetadata page={page} />
              {isTypeRecipe && <RecipeMicrodata data={page} />}
              <ContentList
                contents={articles}
                itemComponent={ArticleContent}
                infiniteScrollingEnabled={infiniteScrollingEnabled}
                limit={contentsListLimit}
                thirdPartyAdsDisabled={thirdPartyAdsDisabled}
                trackItem={trackNewArticle} // required event data gets passed from ContentListItem
              />
            </div>
            <Footer />
          </MainWrapper>
        </Fragment>
      </Provider>
    );
  }
}

/**
 * propTypes
 * @property {Object} page - The page object from content API
 * @property {Array} page.body - The body object from content API
 * @property {Object} radioStation - The radio object from store
 */
Article.propTypes = {
  page: PropTypes.object,
  site: PropTypes.string,
};

/**
 * Default Prop Values
 */
Article.defaultProps = {
  page: {},
};

export default Article;
