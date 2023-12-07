import React, {
  useCallback, useMemo,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import inlineAds from '@univision/fe-commons/dist/utils/ads/Article/inline';
import {
  getKey,
  isValidArray,
  isValidURL,
} from '@univision/fe-commons/dist/utils/helpers';
import toDeburr from '@univision/fe-utilities/helpers/string/toDeburr';
import stripHtmlSSR from '@univision/fe-utilities/helpers/html/stripHtmlSSR';
import truncateString from '@univision/fe-utilities/helpers/string/truncateString';

import { cleanEnhancementsInBody } from '@univision/fe-commons/dist/utils/text';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { newsletterContainerArticleBodyDepth } from '@univision/fe-commons/dist/constants/ads';
import { ASK_EXPERT, JOB_LISTING, LIST } from '@univision/fe-commons/dist/constants/articleTypes';
import labelTypes from '@univision/fe-commons/dist/constants/labelTypes';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import Features from '@univision/fe-commons/dist/config/features';
import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';
import { requestParamsSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import RELATED_COLLECTION_BODY_DEPTH from '@univision/fe-commons/dist/constants/recirculation';
import LiveLabel from '@univision/fe-components-base/dist/components/LiveLabel';
import Label from '@univision/fe-components-base/dist/components/Label';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import Meta from '@univision/fe-components-base/dist/components/Meta/Meta';
import OpinionAuthor from '@univision/fe-components-base/dist/components/OpinionAuthor';
import RelatedTags from '@univision/fe-components-base/dist/components/RelatedTagsLegacy';
import { EmptyPlaceholder } from '@univision/fe-components-base/dist/components/Placeholder';
import Taboola from '@univision/fe-components-base/dist/components/widgets/Taboola';
import TagLabel from '@univision/fe-components-base/dist/components/TagLabel';
import CallButton from '@univision/fe-components-base/dist/components/CallButton';
import ActionBar from '@univision/fe-components-base/dist/components/ActionBar';
import RelatedCollection from '@univision/fe-components-base/dist/components/widgets/RelatedCollection';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes';
import { TUDN_SITE, UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import ScrollTracker from '@univision/fe-commons/dist/components/tracking/ScrollTracker';

import BodyChunk from '../../../base/BodyChunk';
import ContentHeader from '../../../base/ContentHeader';
import ArticleLead from '../ArticleLead';
import ApplyJobButton from '../ArticleJobListing';
import AskExpertHelpers from '../ArticleAskExpert/helpers';

import { mergeRawHtmls, isListItemEnhancement } from './helpers';
import Styles from './ArticleBody.scss';
import ArticleBodyStyles from './ArticleBody.styles';
import trackEnhancementClick from '../../../base/Enhancement/util';

const ArticleRecipe = dynamic(() => import(/* webpackChunkName: "articleRecipe" */ '../ArticleRecipe'), {
  loading: EmptyPlaceholder,
});

const ArticleAskExpert = dynamic(() => import(/* webpackChunkName: "articleAskExpert" */ '../ArticleAskExpert/AskExpertBody'), {
  loading: EmptyPlaceholder,
});

const vixTagName = 'vix';

const ArticleBodyDiv = styled.div`${ArticleBodyStyles.body}`;
const CategoryTagDiv = styled.div`${ArticleBodyStyles.categoryTag}`;

/**
 * ArticleBody
 * @param {Object} props component props
 * @returns {jsx}
 */
export const ArticleBody = ({
  articleDepth,
  articleTrackerScroll,
  articleType,
  askExpertData,
  authors,
  body,
  contentPriority,
  description,
  device,
  fullWidth,
  hidePublishDate,
  hideRelatedCollection,
  hierarchy,
  isFullWidth,
  isInViewportCallback,
  isOpinionArticle,
  jobListingData,
  lead,
  pageData,
  primaryTag,
  publishDate,
  recipeData,
  relatedCollection,
  requestParams,
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
  const isNotListType = articleType !== 'list';
  const isWorldCupMVP = Features.deportes.isWorldCupMVP();
  const published = publishDate;
  // Add to this array the televisa sites if they need to have the taboola widget
  const taboolaTargetSites = [
    TUDN_SITE,
    UNIVISION_SITE,
  ];
  let bodyArray = body;
  if (body && Array.isArray(body)) {
    if (isNotListType) {
      bodyArray = inlineAds.injectAds({
        bodyArray: cleanEnhancementsInBody(body),
        device,
        lead,
      });
    } else {
      bodyArray = inlineAds.injectListAds({
        bodyArray: cleanEnhancementsInBody(body),
        device,
        lead,
      });
    }
    bodyArray = inlineAds.injectTaboolaMidAd({ bodyArray });
  }
  const shareData = {
    uid,
    primaryTag,
    title,
    type: articleType === contentTypes.VIEW_LIST ? 'list' : 'article',
  };

  let articleLead = null;
  if (lead) {
    articleLead = (
      <ArticleLead
        pageData={pageData}
        articleDepth={articleDepth}
        isFullWidth={isFullWidth || fullWidth}
        lead={lead}
      />
    );
  }

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
      || (tagName
        && typeof tagName === 'string'
        && headerTitle.toLowerCase() !== tagName.toLowerCase());
  };

  const opinionText = getKey(pageData, 'data.opinionText', null);

  /**
   * If the primary topic is "News in English", some child components
   * need to have their labels rendered in English
   */
  const topicsToTranslate = {
    [`${localization.get('newsInEnglish', { language: 'en' })}`]: 'en', // news in english
  };
  const primaryTopic = getKey(pageData, 'data.primaryTopic', '');
  const language = getKey(topicsToTranslate, primaryTopic, localization.getCurrentLanguage());
  let tagLabel;
  if (isValidArray(secondaryTags) && primaryTag) {
    let [firstTag] = secondaryTags;
    if (primaryTag?.name === 'explora' && secondaryTags.some(t => toDeburr(t.name, { lowercase: true }) === vixTagName)) {
      [firstTag] = secondaryTags.filter(t => toDeburr(t.name, { lowercase: true }) === vixTagName);
      firstTag.link = null;
    }
    tagLabel = firstTag;
  } else {
    tagLabel = primaryTag;
  }
  const isBreakingNews = contentPriority && contentPriority.toLowerCase() === 'breaking_news';
  const applyUrl = getKey(jobListingData, 'applyUrl');
  const isJobListingArticle = articleType
    && articleType.toLowerCase() === JOB_LISTING.toLowerCase();
  const isArticleList = articleType && articleType.toLowerCase() === LIST.toLowerCase();
  const isJobApplyBtnExist = isJobListingArticle && isValidURL(applyUrl);
  const jobApplyButton = isJobApplyBtnExist && <ApplyJobButton applyUrl={applyUrl} className="uvs-font-c-regular" applyBtnTracking={trackingApplyBtn} />;
  const isAskExpertArticle = articleType
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
  const askExpertBody = isAskExpertArticle && askExpertData && (
    <ArticleAskExpert
      askExpertData={askExpertData}
      askExpertQaAClassName={Styles.askExpertBody}
      callBtnTracking={trackingCallBtn}
      pageData={pageData}
    />
  );
  const hasActionBar = requestParams?.showActionBar !== 'false';

  /**
   * Social sharing tracking callback
   * @param {string} name of social media
   */
  const onShareButtonClick = (name) => {
    if (shareData?.type !== 'article') {
      SocialTracker.track(
        SocialTracker.events.share,
        {
          name,
          ...shareData,
        },
      );
    }
  };

  const articleBody = useMemo(
    () => {
      if (bodyArray && isValidArray(bodyArray)) {
        const filteredBody = mergeRawHtmls(bodyArray).filter(chunk => !chunk.skip);
        const bodyLength = filteredBody.length;
        const newsletterContainerPosition = Math.floor(bodyLength
          * newsletterContainerArticleBodyDepth
          * 0.01);
        const relatedCollectionPosition = Math.floor(bodyLength
          * RELATED_COLLECTION_BODY_DEPTH
          * 0.01);
        let listNumber = 0;
        let positionListItem = 0;
        let countListItems = 0;
        let titleListItem = '';
        return (
          <div
            id="article-chunks"
            className={classnames({ [Styles.askExpertBody]: isAskExpertArticle })}
          >
            {filteredBody.map((chunk, idx) => {
              const article = { uid, title, primaryTag };
              const isListEnhancement = isListItemEnhancement(chunk);
              const isListItemType = chunk?.type === contentTypes.LIST_TYPE_TEXT;

              const isTextFollowedByAList = idx < bodyLength
                && isListItemType
                && isListItemEnhancement(filteredBody[idx + 1]);

              if (idx === 0 && isListItemType) {
                titleListItem = truncateString(stripHtmlSSR(chunk.value));
              }

              if (isListEnhancement) {
                listNumber += 1;
                positionListItem = listNumber;
                countListItems = pageData?.data?.listItems?.length;
              }

              return (
                <React.Fragment key={uid}>
                  <BodyChunk
                    {...chunk}
                    article={article}
                    countListItems={countListItems}
                    pageData={pageData}
                    positionListItem={positionListItem}
                    articleDepth={articleDepth}
                    uri={uri}
                    onClick={trackEnhancementClick(chunk, article)}
                    listNumber={listNumber}
                    titleListItem={titleListItem}
                    isFollowedByAList={isTextFollowedByAList}
                    device={device}
                    uid={uid}
                    {...isTextFollowedByAList && { className: Styles.listTitle }}
                  />
                  {idx === newsletterContainerPosition && <div className="newsletterContainerArticle" />}
                  {!hideRelatedCollection
                    && idx === relatedCollectionPosition
                    && relatedCollection
                    && !isArticleList && (
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
    },
    [
      bodyArray,
      device,
      hideRelatedCollection,
      hierarchy,
      isArticleList,
      isAskExpertArticle,
      pageData,
      primaryTag,
      relatedCollection,
      title,
      uid,
      uri,
    ],
  );
  const trackingData = {
    uid,
    title,
    primaryTag,
  };
  return (
    <article data-component-name="article">
      <div
        className={classnames({
          [Styles.header]: !isBreakingNews,
          [Styles.headerWithBreakingNews]: isBreakingNews,
          [Styles.centered]: lead && lead.type === 'image' && isFullWidth,
        })}
      >
        {!isOpinionArticle && !Features.shows.hideTagLabel()
          && shouldRenderTagLabel(getKey(tagLabel, 'name')) && (
            <TagLabel
              tag={tagLabel}
              className={classnames({
                [Styles.primaryTag]: !isWorldCupMVP,
              })}
              style={{ color: theme.widgetTitleColor || theme.primary }}
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
          isArticle
          title={title}
          description={description}
          richTextDescription={richTextDescription}
          dark
          theme={theme}
          featuredTag={secondaryTags.length > 0 ? secondaryTags[0]?.name : null}
          className={classnames({
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
                type={getKey(theme, 'actionBarType', '')}
                contentId={uid}
                isContentLayout
                sharingOptions={sharingOptions}
                showCtaShare
                onShareButtonClick={onShareButtonClick}
                contentTitle={shareData?.title}
                contentType={shareData?.type}
              />
            </FullWidth>
          )}
        </div>
        {jobApplyButton}
        {articleLead}
      </div>
      <ArticleBodyDiv theme={theme} isWorldCupMVP={isWorldCupMVP}>
        {askExpertBody}
        {articleBody && (
          <ScrollTracker {...articleTrackerScroll(trackingData, 1, true)}>
            {articleBody}
          </ScrollTracker>
        )}
        {hasActionBar && (
          <div className={Styles.bottomActionBar}>
            <FullWidth className={Styles.actionBarWrapper} breakpoints={['xxs', 'xs']}>
              <ActionBar
                type={getKey(theme, 'actionBarType', '')}
                contentId={uid}
                isContentLayout
                sharingOptions={sharingOptions}
                showCtaShare
                onShareButtonClick={onShareButtonClick}
                contentTitle={shareData?.title}
                contentType={shareData?.type}
              />
            </FullWidth>
          </div>
        )}
        {jobApplyButton}
        {recipeData && (
          <ArticleRecipe {...recipeData} isInViewportCallback={isInViewportCallback} />
        )}
        {isValidArray(secondaryTags) && (
          <RelatedTags contents={secondaryTags} className={Styles.secondaryTags} />
        )}
        {taboolaTargetSites.includes(pageData.site) && (
          <Taboola
            mode="alternating-thumbnails-a"
            placement="Below Article Thumbnails"
            page={pageData}
            isFeed
            uri={uri}
          />
        )}
      </ArticleBodyDiv>
    </article>
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
  device: PropTypes.string,
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
  pageData: PropTypes.object,
  primaryTag: PropTypes.object.isRequired,
  publishDate: PropTypes.string,
  recipeData: PropTypes.object,
  relatedCollection: PropTypes.object,
  requestParams: PropTypes.object,
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
  articleTrackerScroll: PropTypes.func,
};

ArticleBody.defaultProps = {
  theme: {},
};

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{standings: Object}}
 */
const mapStateToProps = (state) => {
  return {
    requestParams: requestParamsSelector(state),
  };
};

export default connect(mapStateToProps)(ArticleBody);
