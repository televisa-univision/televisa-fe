import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { getDevice, getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import inlineAds from '@univision/fe-commons/dist/utils/ads/Article/inline';
import {
  exists,
  getKey,
  isValidArray,
  isValidURL,
} from '@univision/fe-commons/dist/utils/helpers';
import { cleanEnhancementsInBody } from '@univision/fe-commons/dist/utils/text';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import labelTypes from '@univision/fe-commons/dist/constants/labelTypes';
import { newsletterContainerArticleBodyDepth } from '@univision/fe-commons/dist/constants/ads';
import RELATED_COLLECTION_BODY_DEPTH from '@univision/fe-commons/dist/constants/recirculation';
import LiveLabel from '@univision/fe-components-base/dist/components/LiveLabel';
import Label from '@univision/fe-components-base/dist/components/Label';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import Meta from '@univision/fe-components-base/dist/components/Meta/Meta';
import OpinionAuthor from '@univision/fe-components-base/dist/components/OpinionAuthor';
import RelatedTags from '@univision/fe-components-base/dist/components/RelatedTagsLegacy';
import { EmptyPlaceholder } from '@univision/fe-components-base/dist/components/Placeholder';
import TagLabel from '@univision/fe-components-base/dist/components/TagLabel';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';
import CallButton from '@univision/fe-components-base/dist/components/CallButton';
import { ASK_EXPERT, JOB_LISTING } from '@univision/fe-commons/dist/constants/articleTypes';
import features from '@univision/fe-commons/dist/config/features';
import RelatedCollection from '@univision/fe-components-base/dist/components/widgets/RelatedCollection';

import ContentHeader from 'components/layout/ContentHeader/ContentHeader';
import ActionBar from '@univision/fe-components-base/dist/components/ActionBar';
import { mergeRawHtmls } from './articleBodyUtils';
import ArticleLead from '../ArticleLead/ArticleLead';
import ArticleChunk from '../ArticleChunk/ArticleChunk';
import Styles from './ArticleBody.scss';
import ApplyJobButton from '../ArticleJobListing/ApplyJobButton';
import AskExpertHelpers from '../ArticleAskExpert/helpers';

/**
 * ArticleBody
 * @param {Object} props component props
 * @returns {jsx}
 */
const ArticleBody = ({
  articleDepth,
  articleType,
  askExpertData,
  authors,
  body,
  contentPriority,
  description,
  fullWidth,
  hidePublishDate,
  hideRelatedCollection,
  hierarchy,
  isFullWidth,
  isInViewportCallback,
  isOpinionArticle,
  jobListingData,
  lead,
  primaryTag,
  publishDate,
  recipeData,
  relatedCollection,
  richTextDescription,
  secondaryTags,
  sharingOptions,
  showUpdateDate,
  source,
  sponsor,
  tempAuthors,
  theme,
  title,
  uid,
  updateDate,
  uri,
}) => {
  const device = getDevice(Store);
  const published = publishDate;
  let bodyArray = body;
  if (exists(body) && Array.isArray(body)) {
    bodyArray = inlineAds.injectAds({
      bodyArray: cleanEnhancementsInBody(body),
      device,
      lead,
    });
  }

  const shareData = {
    uid,
    primaryTag,
    title,
    type: 'article',
  };

  let articleLead = null;
  if (exists(lead)) {
    articleLead = (
      <ArticleLead
        articleDepth={articleDepth}
        isFullWidth={isFullWidth || fullWidth}
        lead={lead}
      />
    );
  }

  let ArticleRecipe;
  if (exists(recipeData)) {
    ArticleRecipe = Loadable({
      loader: () => import(/* webpackChunkName: "articleRecipe" */ '../ArticleRecipe'),
      loading: EmptyPlaceholder,
    });
  }

  let ArticleAskExpert;
  if (exists(askExpertData)) {
    ArticleAskExpert = Loadable({
      loader: () => import(/* webpackChunkName: "articleAskExpert" */ '../ArticleAskExpert/AskExpertBody'),
      loading: EmptyPlaceholder,
    });
  }

  const pageData = getPageData(Store);

  /**
   * Tracking Event for Apply Button on JobListing Article
   */
  const trackingApplyBtn = () => {
    ArticleTracker.track(ArticleTracker.events.applyBtnClick, {
      uid,
      title,
    });
  };

  /**
   * Tracking Event for Call Button on Ask Expert Article
   */
  const trackingCallBtn = useCallback(() => {
    ArticleTracker.track(ArticleTracker.events.callExpertBtnClick, {
      uid,
    });
  }, [uid]);

  /**
   * Checks for header data, if available
   * the page tag is hidden if it matches
   * the header title
   * @param {string} tagName - tag name
   * @returns {boolean}
   */
  const shouldRenderTagLabel = (tagName) => {
    const headerTitle = getKey(pageData, 'headerTitle', null);
    return !headerTitle
      || (exists(tagName)
      && typeof tagName === 'string'
      && headerTitle.toLowerCase() !== tagName.toLowerCase());
  };

  const opinionText = getKey(pageData.data, 'opinionText', null);

  /**
   * If the primary topic is "News in English", some child components
   * need to have their labels rendered in English
   */
  const topicsToTranslate = {
    [`${localization.get('newsInEnglish', { language: 'en' })}`]: 'en', // news in english
  };
  const primaryTopic = getKey(pageData, 'data.primaryTopic', '');
  const language = getKey(topicsToTranslate, primaryTopic, localization.getCurrentLanguage());
  const tagLabel = (isValidArray(secondaryTags) && secondaryTags[0]) || primaryTag;
  const isBreakingNews = exists(contentPriority) && contentPriority.toLowerCase() === 'breaking_news';
  const applyUrl = getKey(jobListingData, 'applyUrl');
  const isJobListingArticle = exists(articleType)
    && articleType.toLowerCase() === JOB_LISTING.toLowerCase();
  const isJobApplyBtnExist = isJobListingArticle && isValidURL(applyUrl);
  const jobApplyButton = isJobApplyBtnExist && <ApplyJobButton applyUrl={applyUrl} className="uvs-font-c-regular" applyBtnTracking={trackingApplyBtn} />;
  const isAskExpertArticle = exists(articleType)
    && articleType.toLowerCase() === ASK_EXPERT.toLowerCase();
  const askExpertLbl = isAskExpertArticle && <Label label={localization.get('sponsored')} type={labelTypes.ADVERTISING} />;
  const callExpertBtn = isAskExpertArticle && (
    <div className={Styles.callWrapper}>
      <div className={Styles.callInnerWrapper}>
        <CallButton
          callNumber={AskExpertHelpers.getAskExpertPhoneNumber(pageData)}
          callBtnTracking={trackingCallBtn}
        />
      </div>
    </div>
  );
  const askExpertBody = isAskExpertArticle && (
    <ArticleAskExpert
      askExpertData={askExpertData}
      askExpertQaAClassName={Styles.askExpertBody}
      callBtnTracking={trackingCallBtn}
      pageData={pageData}
    />
  );
  const hasActionBar = features.actionBar.hasActionBar(Store.getState());

  /**
   * Social sharing tracking callback
   * @param {string} name of social media
   */
  const onShareButtonClick = (name) => {
    SocialTracker.track(
      SocialTracker.events.share,
      { name, ...shareData }
    );
  };

  const articleBody = useMemo(
    () => {
      if (bodyArray && isValidArray(bodyArray)) {
        const bodyLength = bodyArray.length;
        const newsletterContainerPosition = Math.floor(bodyLength
          * newsletterContainerArticleBodyDepth
          * 0.01);
        const relatedCollectionPosition = Math.floor(bodyLength
          * RELATED_COLLECTION_BODY_DEPTH
          * 0.01);

        return (
          <div
            id="article-chunks"
            className={classnames({ [Styles.askExpertBody]: isAskExpertArticle })}
          >
            {mergeRawHtmls(bodyArray)
              .filter(chunk => !chunk.skip)
              .map((chunk, idx) => {
                const key = `${uid}_${idx}`;
                return (
                  <React.Fragment key={key}>
                    <ArticleChunk
                      {...chunk}
                      article={{ uid, title, primaryTag }}
                    />
                    {idx === newsletterContainerPosition && <div className="newsletterContainerArticle" />}
                    {!hideRelatedCollection
                    && idx === relatedCollectionPosition
                    && (
                      <RelatedCollection
                        {...relatedCollection}
                        device={device}
                        hierarchy={hierarchy}
                        uri={uri}
                      />
                    )}
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
      device,
      hierarchy,
      hideRelatedCollection,
      isAskExpertArticle,
      primaryTag,
      relatedCollection,
      title,
      uid,
      uri,
    ],
  );

  return (
    <>
      <article data-component-name="article">
        <div
          className={classnames({
            [Styles.header]: !isBreakingNews,
            [Styles.headerWithBreakingNews]: isBreakingNews,
            [Styles.centered]: lead && lead.type === 'image' && isFullWidth,
          })}
        >
          {!isOpinionArticle && !features.shows.hideTagLabel()
            && shouldRenderTagLabel(getKey(tagLabel, 'name')) && (
              <TagLabel
                tag={tagLabel}
                className={Styles.primaryTag}
                style={{ color: theme.primary }}
              />
          )}
          {isBreakingNews && (
            <FullWidth breakpoints={['xxs', 'xs']}>
              <LiveLabel
                className={Styles.breakingNews}
                position="center"
                size="extralarge"
                type="breakingNews"
              />
            </FullWidth>
          )}
          {askExpertLbl}
          <ContentHeader
            title={title}
            description={description}
            richTextDescription={richTextDescription}
            dark
            className={classnames(Styles.contentHeader, {
              [Styles.centered]: lead && lead.type === 'image' && isFullWidth,
            })}
          />
          {isOpinionArticle
            && opinionText && (
              <div className={Styles.opinion}>
                <OpinionAuthor
                  author={authors[0]}
                  language={language}
                  opinionText={opinionText}
                  theme={theme}
                />
              </div>
          )}
          <div className={classnames(Styles.meta, { [Styles.isOpinion]: isOpinionArticle })}>
            {!isOpinionArticle && (
              <Meta
                showAvatar
                authors={Array.isArray(authors) && authors.length > 0 ? authors : null}
                tempAuthors={
                  Array.isArray(tempAuthors) && tempAuthors.length > 0 ? tempAuthors : null
                }
                date={published}
                updateDate={updateDate}
                hidePublishDate={hidePublishDate}
                showUpdateDate={showUpdateDate}
                language={language}
                source={source}
                sponsor={sponsor}
                modifierClass={classnames({ [Styles.askExpertAuthor]: isAskExpertArticle })}
              />
            )}
            {callExpertBtn}
            {isOpinionArticle && <span className={Styles.date}>{published}</span>}
            {hasActionBar && (
            <FullWidth className={Styles.actionBarWrapper} breakpoints={['xxs', 'xs']}>
              <ActionBar
                actionBarType={getKey(theme, 'actionBarType', '')}
                contentId={uid}
                isContentLayout
                sharingOptions={sharingOptions}
                showCtaShare
                onShareButtonClick={onShareButtonClick}
                type={theme?.actionBarType}
              />
            </FullWidth>
            )}
          </div>
          {jobApplyButton}
          {articleLead}
        </div>
        <div className={classnames({ [Styles.body]: !isAskExpertArticle })}>
          {askExpertBody}
          {articleBody}
          {hasActionBar && (
            <div className={Styles.bottomActionBar}>
              <FullWidth className={Styles.actionBarWrapper} breakpoints={['xxs', 'xs']}>
                <ActionBar
                  actionBarType={getKey(theme, 'actionBarType', '')}
                  contentId={uid}
                  isContentLayout
                  sharingOptions={sharingOptions}
                  showCtaShare
                  onShareButtonClick={onShareButtonClick}
                  type={theme?.actionBarType}
                />
              </FullWidth>
            </div>
          )}
          {jobApplyButton}
          {ArticleRecipe && (
            <ArticleRecipe {...recipeData} isInViewportCallback={isInViewportCallback} />
          )}
          {isValidArray(secondaryTags) && (
            <RelatedTags contents={secondaryTags} className={Styles.secondaryTags} />
          )}
        </div>
      </article>
    </>
  );
};

/**
 * propTypes
 * @property {Array} body an array of body chunks to be rendered
 * @property {Object} lead details about the articles lead content
 * @property {String} publishDate the timestamp when the article was published
 * @property {bool} inViewport true if article is visible in the viewport
 * @property {bool} hidePublishDate hide the published
 * @property {bool} hideRelatedCollection hide the related collection
 */
ArticleBody.propTypes = {
  articleDepth: PropTypes.number,
  articleType: PropTypes.string,
  askExpertData: PropTypes.object,
  authors: PropTypes.arrayOf(PropTypes.object),
  body: PropTypes.arrayOf(PropTypes.object),
  contentPriority: PropTypes.string,
  description: PropTypes.string,
  fullWidth: PropTypes.bool,
  hierarchy: PropTypes.array,
  hidePublishDate: PropTypes.bool,
  hideRelatedCollection: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  isInViewportCallback: PropTypes.func,
  isLastArticle: PropTypes.bool,
  isOpinionArticle: PropTypes.bool,
  jobListingData: PropTypes.object,
  lead: PropTypes.object,
  primaryTag: PropTypes.object.isRequired,
  publishDate: PropTypes.string,
  recipeData: PropTypes.object,
  relatedCollection: PropTypes.object,
  richTextDescription: PropTypes.array,
  secondaryTags: PropTypes.array.isRequired,
  sharingOptions: PropTypes.object,
  showUpdateDate: PropTypes.bool,
  source: PropTypes.string,
  sponsor: PropTypes.object,
  tempAuthors: PropTypes.arrayOf(PropTypes.object),
  theme: PropTypes.object,
  title: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  updateDate: PropTypes.string,
  uri: PropTypes.string,
};

ArticleBody.defaultProps = {
  theme: {},
};

export default ArticleBody;
