import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';

import ThemeStyle from '@univision/fe-commons/dist/utils/themes/ThemeStyle';
import ScrollTracker from '@univision/fe-commons/dist/components/tracking/ScrollTracker';
import {
  hasKey,
  isInArray,
} from '@univision/fe-commons/dist/utils/helpers';
import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import WithWidgets from '@univision/fe-components-base/dist/components/widgets/WithWidgets';
import insertionPoints from '@univision/fe-components-base/dist/components/widgets/WithWidgets/insertionPoints.json';
import features from '@univision/fe-commons/dist/config/features';
import { LIST_WIDGET, ALL_EXTERNAL_EMBED } from '@univision/fe-commons/dist/constants/widgetTypes';

import ConnectedArticleBody from '../ArticleBody';
import WidgetsFactory from '../../../../utils/factories/widgetsFactory';
import Styles from './ArticleContent.styles';

const Offset2 = styled.div`${Styles.offset2}`;

const WidgetsContainerList = styled.div`${Styles.widgetsContainer}`;
const WidgetExternal = styled.div`${Styles.containerExternal}`;
const WidgetsContainer = styled.div`${Styles.container}`;

/**
 * Construct the properties to track scroll events
 * @param {Object} page API page data
 * @param {number} depth Index of article loaded
 * @param {boolean} isArticleBody Index of article loaded
 * @returns {{onHalfScroll: (function()), onFullScroll: (function())}}
 */
export const getTrackingProps = (page, depth, isArticleBody) => {
  const trackingData = {
    uid: page.uid,
    title: page.title,
    primaryTag: page.primaryTag,
    articleDepth: depth,
  };
  return {
    // For article, we are only interested on 50% and 100%
    milestones: [50, 100],
    // Track the event based on the milestone
    onMilestone: (milestonesReached) => {
      // 50% of the article body
      if (isInArray(50, milestonesReached) && !isArticleBody) {
        ArticleTracker.track(ArticleTracker.events.halfScroll, trackingData);
      }
      // 100% of the article body until footer
      if (isInArray(100, milestonesReached) && !isArticleBody) {
        ArticleTracker.track(ArticleTracker.events.fullScroll, trackingData);
        return;
      }
      // 100% of the article body
      if (isInArray(100, milestonesReached) && isArticleBody) {
        ArticleTracker.track(ArticleTracker.events.articleRead, trackingData);
      }
    },
  };
};

/**
 * Container component rendering the content of an article
 * @returns {JSX}
 */
const ArticleContent = ({
  content,
  depth,
  pageData,
  thirdPartyAdsDisabled,
  isInViewportCallback,
}) => {
  let sharingOptions = {};
  if (hasKey(content.sharing, 'options')) {
    sharingOptions = content.sharing.options;
  }
  let insertionPointsArray = [insertionPoints.belowArticleBody, insertionPoints.belowContentBody];
  const isLastArticle = !content.nextItem;
  const isSingleArticle = depth === 1 && isLastArticle;
  const { theme, device } = pageData;
  const articleWidgetsFactory = new WidgetsFactory(pageData);
  const articleWidgets = articleWidgetsFactory.getWidgetComponent(LIST_WIDGET);
  const allExternalEmbed = articleWidgetsFactory.getWidgetComponent(ALL_EXTERNAL_EMBED);

  // Shows the civic science widget only on second article on InfiniteScrollArticlePage
  if (!isSingleArticle && depth !== 2) {
    insertionPointsArray = [];
  }

  const Body = WithWidgets(
    <ConnectedArticleBody
      {...content}
      articleDepth={depth}
      device={device}
      isInViewportCallback={isInViewportCallback}
      isLastArticle={isLastArticle}
      pageData={pageData}
      sharingOptions={sharingOptions}
      theme={theme}
      articleTrackerScroll={getTrackingProps}
    />,
    insertionPointsArray,
  );

  const infiniteScrolling = features.article.infiniteScrolling();
  const endOfArticle = !infiniteScrolling || (infiniteScrolling && isLastArticle);

  return (
    <div className="uvs-container">
      <ThemeStyle parentCssElement="article">
        <div className="row">
          <Offset2 className={classnames('col-sm-12', 'col-md-10', 'col-lg-8')}>
            <ScrollTracker {...getTrackingProps(content, depth)}>
              <Body />
            </ScrollTracker>
          </Offset2>
        </div>
        {endOfArticle && (
          <Fragment>
            <div>
              {!thirdPartyAdsDisabled && content.articleType !== 'list'
                && adHelper.getAd(AdTypes.YIELDMO_FOOTER_AD, { isLazyLoaded: 'false' })}
            </div>
          </Fragment>
        )}
      </ThemeStyle>
      {depth === 1 && (
        <WidgetsContainer>
          <WidgetExternal>
            {allExternalEmbed}
          </WidgetExternal>
          <WidgetsContainerList>
            {articleWidgets}
          </WidgetsContainerList>
        </WidgetsContainer>
      )}
    </div>
  );
};

/**
 * propTypes
 * @property {Object} content - the article content itself
 * @property {number} depth - the quantity of articles used by infinite scroll
 * @property {Object} pageData - the page object from content API
 * @property {bool} thirdPartyAdsDisabled - used to disabled the ads
 * @property {func} isInViewportCallback - callback called once the element is in the viewport
 */
ArticleContent.propTypes = {
  content: PropTypes.object.isRequired,
  depth: PropTypes.number,
  pageData: PropTypes.object,
  thirdPartyAdsDisabled: PropTypes.bool,
  isInViewportCallback: PropTypes.func,
};

export default ArticleContent;
