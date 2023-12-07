import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { newsletterContainerArticleBodyDepth } from '@univision/fe-commons/dist/constants/ads';
import Store from '@univision/fe-commons/dist/store/store';
import { getPageData, getAdSettings } from '@univision/fe-commons/dist/store/storeHelpers';
import inlineAds from '@univision/fe-commons/dist/utils/ads/Article/inline';
import {
  exists, getKey, isValidArray, hasKey,
} from '@univision/fe-commons/dist/utils/helpers';
import { cleanEnhancementsInBody } from '@univision/fe-commons/dist/utils/text';

import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import ArticleRecipe from 'components/pages/Article/ArticleRecipe';
import ampFactory from 'app/AMP/utils/factories/ampFactory';

import adHelper from '../../../../utils/ads/ampAdHelper';
import AmpArticleLead from '../ArticleLead/AmpArticleLead';
import AmpArticleChunk from '../ArticleChunk/AmpArticleChunk';
import AmpAuthor from '../../../author/AmpAuthor';
import {
  Body, Header, Headline, OpinionAuthor, OpinionAuthorAvatar,
  OpinionAuthorLink, OpinionWrapper, PublishDate, RecipeWrapper, TagLabel,
} from './AmpArticleBody.styles';

/**
 * Render the Opinion Author.prop
 * @param {Array} authors Authors
 * @param {string} opinionText Opinion
 * @returns {jsx}
 */
const renderOpinionAuthor = (authors, opinionText) => {
  const author = authors[0];
  const authorImage = getKey(author, 'image.renditions.1x1-xxs-mobile.href', '');
  return (
    <OpinionAuthor>
      <OpinionAuthorAvatar image={authorImage} />
      <OpinionWrapper>
        <a className="uvs-font-a-bold" href="https://univision.com/temas/opinion"> {localization.get('opinion')} </a>
        <OpinionAuthorLink className="uvs-font-a-bold">
          {author.fullName}
        </OpinionAuthorLink>
        {opinionText && <p>{opinionText}</p>}
      </OpinionWrapper>
    </OpinionAuthor>
  );
};

/**
 * ArticleBody
 * @param {Object} props component props
 * @returns {JSX}
 */
const ArticleBody = ({
  body,
  lead,
  authors,
  tempAuthors,
  publishDate,
  source,
  uid,
  primaryTag,
  secondaryTags,
  title,
  isFullWidth,
  isOpinionArticle,
  description,
  recipeData,
}) => {
  const published = publishDate;
  const device = 'mobile';
  const adSettings = getAdSettings(Store);
  const inlineAd = {
    type: 'ad',
    value: adHelper.getAd(AdTypes.IN_BODY_AD, adSettings),
  };
  let bodyArray = body;
  if (exists(body) && Array.isArray(body)) {
    bodyArray = inlineAds.injectAds({
      bodyArray: cleanEnhancementsInBody(body),
      device,
      advertisement: inlineAd,
      initialAdOverride: inlineAd,
    });
  }

  let articleLead = null;
  if (exists(lead)) {
    articleLead = <AmpArticleLead lead={lead} isFullWidth={isFullWidth} />;
  }

  let articleRecipe;
  if (exists(recipeData)) {
    articleRecipe = <RecipeWrapper><ArticleRecipe {...recipeData} /></RecipeWrapper>;
  }

  const opinionText = getKey(getPageData(Store), 'data.opinionText', null);
  const tagLabel = (isValidArray(secondaryTags) && secondaryTags[0]) || primaryTag;

  const articleBody = useMemo(
    () => {
      if (bodyArray && Array.isArray(bodyArray)) {
        const newsletterContainerPosition = Math.floor(bodyArray.length
          * newsletterContainerArticleBodyDepth
          * 0.01);

        return (
          <div id="article-chunks">
            {ampFactory
              .mergeRawHtmls(bodyArray)
              .filter(chunk => !chunk.skip)
              .map((chunk, idx) => {
                const key = `${uid}_${idx}`;
                return (
                  <React.Fragment key={key}>
                    <AmpArticleChunk
                      {...chunk}
                      article={{ uid, title, primaryTag }}
                      isFullWidth={isFullWidth}
                      index={idx}
                    />
                    {idx === newsletterContainerPosition && <div className="newsletterContainerArticle" />}
                  </React.Fragment>
                );
              })
            }
          </div>
        );
      }

      return null;
    }, [
      bodyArray,
      primaryTag,
      title,
      uid,
      isFullWidth,
    ],
  );

  return (
    <article data-component-name="article">
      <Header>
        {!isOpinionArticle && hasKey(tagLabel, 'name') && (
          <TagLabel
            className="uvs-text-hover uvs-font-a-bold"
            href={getKey(tagLabel, 'link', getKey(tagLabel, 'uri', '#'))}
          >
            {tagLabel.name}
          </TagLabel>
        )}
        <Headline centered={lead && lead.type === 'image' && isFullWidth}>
          <h1 itemProp="headline">
            {title}
          </h1>
          {description && (
            // eslint-disable-next-line react/no-danger
            <div dangerouslySetInnerHTML={{ __html: description }} />
          )}
        </Headline>
        {isOpinionArticle && opinionText && renderOpinionAuthor(authors, opinionText)}
        {!isOpinionArticle && (
          <AmpAuthor
            showAvatar
            authors={Array.isArray(authors) && authors.length > 0 ? authors : null}
            tempAuthors={
            Array.isArray(tempAuthors) && tempAuthors.length > 0 ? tempAuthors : null
            }
            date={published}
            source={source}
          />
        )}
        {isOpinionArticle && <PublishDate>{published}</PublishDate>}
        {articleLead}
      </Header>
      <Body>
        {articleBody}
        {articleRecipe}
      </Body>
      { adHelper.getAd(AdTypes.YIELDMO_FOOTER_AD, adSettings) }
    </article>
  );
};

/**
 * propTypes
 * @property {Array} body an array of body chunks to be rendered
 * @property {Object} lead details about the articles lead content
 * @property {String} publishDate the timestamp when the article was published
 */
ArticleBody.propTypes = {
  uid: PropTypes.string.isRequired,
  primaryTag: PropTypes.object.isRequired,
  secondaryTags: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  body: PropTypes.arrayOf(PropTypes.object),
  lead: PropTypes.object,
  authors: PropTypes.arrayOf(PropTypes.object),
  tempAuthors: PropTypes.arrayOf(PropTypes.object),
  publishDate: PropTypes.string,
  source: PropTypes.string,
  theme: PropTypes.object,
  isFullWidth: PropTypes.bool,
  isOpinionArticle: PropTypes.bool,
  recipeData: PropTypes.object,
};

ArticleBody.defaultProps = {
  theme: {},
};

export default ArticleBody;
