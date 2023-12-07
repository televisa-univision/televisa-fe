import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import ThemeStyle from '@univision/fe-commons/dist/utils/themes/ThemeStyle';
import ScrollTracker from '@univision/fe-commons/dist/components/tracking/ScrollTracker';
import { exists, hasKey, isInArray } from '@univision/fe-commons/dist/utils/helpers';
import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import WithWidgets from '@univision/fe-components-base/dist/components/widgets/WithWidgets';
import insertionPoints from '@univision/fe-components-base/dist/components/widgets/WithWidgets/insertionPoints.json';
import { CROSS_VERTICAL_LIST } from '@univision/fe-commons/dist/constants/widgetTypes';
import features from '@univision/fe-commons/dist/config/features';
import { parseWidgets } from 'app/utils/factories/widgetFactory';

import ArticleBody from '../ArticleBody/ArticleBody';
import Styles from './ArticleContent.scss';

/**
 * Construct the properties to track scroll events
 * @param {Object} page API page data
 * @param {number} depth Index of article loaded
 * @returns {{onHalfScroll: (function()), onFullScroll: (function())}}
 */
export const getTrackingProps = (page, depth) => {
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
      if (isInArray(50, milestonesReached)) {
        ArticleTracker.track(ArticleTracker.events.halfScroll, trackingData);
      }
      // 100% of the article body
      if (isInArray(100, milestonesReached)) {
        ArticleTracker.track(ArticleTracker.events.fullScroll, trackingData);
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
  thirdPartyAdsDisabled,
  isInViewportCallback,
}) => {
  let widgets = null;
  if (Array.isArray(content?.widgets)) {
    widgets = content.widgets.filter(widget => widget?.type === CROSS_VERTICAL_LIST);
  }
  const articleWidgets = useMemo(() => (
    widgets ? parseWidgets({ widgets }, true) : null), [widgets]);
  if (!content) return null;

  let sharingOptions = {};
  if (hasKey(content, 'sharing.options')) {
    sharingOptions = content.sharing.options;
  }
  let insertionPointsArray = [insertionPoints.belowArticleBody, insertionPoints.belowContentBody];
  const isLastArticle = !exists(content.nextItem);
  const isSingleArticle = depth === 1 && isLastArticle;

  // Shows civic science widget only on second article on InfiniteScrollArticlePage
  if (!isSingleArticle && depth !== 2) {
    insertionPointsArray = [];
  }

  const Body = WithWidgets(
    <ArticleBody
      {...content}
      articleDepth={depth}
      isInViewportCallback={isInViewportCallback}
      isLastArticle={isLastArticle}
      sharingOptions={sharingOptions}
      theme={getTheme(Store)}
    />,
    insertionPointsArray
  );

  const infiniteScrolling = features.article.infiniteScrolling();
  const endOfArticle = !infiniteScrolling || (infiniteScrolling && isLastArticle);

  return (
    <div className={classnames('uvs-container', Styles.container)}>
      <ThemeStyle parentCssElement="article">
        <div className="row">
          <div className={classnames('col-sm-12', 'col-md-10', 'col-lg-8', Styles.offset_2)}>
            <ScrollTracker {...getTrackingProps(content, depth)}>
              <Body />
            </ScrollTracker>
          </div>
        </div>
        {endOfArticle && (
          <div>
            {!thirdPartyAdsDisabled
              && adHelper.getAd(AdTypes.YIELDMO_FOOTER_AD, { isLazyLoaded: false })}
          </div>
        )}
      </ThemeStyle>
      {depth === 1 && (
      <div className={Styles.widgetsContainer}>
        {articleWidgets}
      </div>
      )}
    </div>
  );
};

ArticleContent.propTypes = {
  content: PropTypes.object.isRequired,
  depth: PropTypes.number,
  thirdPartyAdsDisabled: PropTypes.bool,
  isInViewportCallback: PropTypes.func,
};

export default ArticleContent;
