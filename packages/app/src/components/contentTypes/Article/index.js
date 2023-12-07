import React from 'react';
import PropTypes from 'prop-types';

import { getKey, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import features from '@univision/fe-commons/dist/config/features';
import { SPONSORED_TAG_NAME } from '@univision/fe-commons/dist/constants/ads';
import { TUDN_SITE, UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import { US } from '@univision/fe-commons/dist/constants/userLocation';

import { trackNewArticle } from './helpers';
import ArticleContent from './ArticleContent';
import ArticleMetadata from './ArticleMetadata';
import RecipeMicrodata from './RecipeMicrodata';
import ContentList from '../../base/ContentList';
import ConnectedGlobalWidget from '../../base/GlobalWidget';
import ListItemMetadata from './ListItemMetadata';

const LIST_LIMIT = features.article.contentsListLimit;

/**
 * Determines if infinite scroll articles is enabled
 * @param {*} page from the api
 * @param {*} site current site
 * @returns {boolean}
 */
const isInfiniteScrollingEnabled = (page, site) => {
  if ([TUDN_SITE, UNIVISION_SITE].includes(site) && page?.userLocation === US) return false;
  return page.isInfiniteScrollEnabled // first article is the content itself
    && LIST_LIMIT > 1
    && getKey(page.tagHierarchy, '[0].name') !== SPONSORED_TAG_NAME;
};

/**
 * Article component rendering all pieces of an article
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const Article = ({ pageData }) => {
  const page = getKey(pageData, 'data');

  if (!page) return (<div />);

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
  const infiniteScrollingEnabled = isInfiniteScrollingEnabled(page, pageData.site);

  return (
    <>
      <ConnectedGlobalWidget />
      <div itemScope itemType="http://schema.org/NewsArticle">
        <ArticleMetadata page={page} />
        <ListItemMetadata page={page} />
        {isTypeRecipe && <RecipeMicrodata data={page} />}
        <ContentList
          contents={articles}
          itemComponent={ArticleContent}
          infiniteScrollingEnabled={infiniteScrollingEnabled}
          limit={LIST_LIMIT}
          pageData={pageData}
          thirdPartyAdsDisabled={thirdPartyAdsDisabled}
          trackItem={trackNewArticle} // required event data gets passed from ContentListItem
        />
      </div>
    </>
  );
};

/**
 * propTypes
 * @property {Object} pageData - The page object from content API
 * @property {Object} pageData.data - The data object from content API
 */
Article.propTypes = {
  pageData: PropTypes.object,
};

/**
 * Default Prop Values
 */
Article.defaultProps = {
  pageData: {},
};

export default Article;
