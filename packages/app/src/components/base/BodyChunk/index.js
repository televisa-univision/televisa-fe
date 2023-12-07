import React from 'react';
import PropTypes from 'prop-types';

import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import RichText from '@univision/fe-components-base/dist/components/RichText';
import Taboola from '@univision/fe-components-base/dist/components/widgets/Taboola';

import features from '@univision/fe-commons/dist/config/features';
import Enhancement from '../Enhancement';
import EnhancementLiveBlog from '../EnhancementLiveBlog';

/**
 * BodyChunk component
 * @param {string} className Custom class name
 * @param {boolean} isFollowedByAList true if the enhancement is followed by a list
 * @param {boolean} isLiveBlog whether it is a liveblog enhancement
 * @param {number} listNumber list item number
 * @param {string} type type of component
 * @param {string} value text value
 * @param {Object} enhancementData enhancement data
 * @returns {JSX} the enhancement component to be rendered
 */
const BodyChunk = ({
  className,
  countListItems,
  pageData,
  device,
  isFollowedByAList,
  isLiveBlog,
  listNumber,
  positionListItem,
  articleDepth,
  uri,
  titleListItem,
  type,
  value,
  uid,
  ...enhancementData
}) => {
  const isLiveBlogFeatureFlag = features.liveblog.liveBlogPerformance();
  switch (type) {
    case 'text': {
      return (
        <RichText
          key={value}
          html={value}
          strip={isFollowedByAList}
          className={className}
        />
      );
    }
    case 'ad':
      return value;
    case 'taboola':
      return (
        <Taboola
          mode={'thumbnails-mid-article-1x1'}
          placement={'Mid Article 1x1'}
          page={pageData}
          articleDepth={articleDepth}
          uri={uri}
        />
      );
    case 'enhancement': {
      return (
        <ErrorBoundary>
          {isLiveBlogFeatureFlag && isLiveBlog
            ? (
              <EnhancementLiveBlog
                countListItems={countListItems}
                data={enhancementData}
                device={device}
                isLiveBlog={isLiveBlog}
                className={className}
                listNumber={listNumber}
                positionListItem={positionListItem}
                titleListItem={titleListItem}
                uid={uid}
              />
            ) : (
              <Enhancement
                countListItems={countListItems}
                data={enhancementData}
                device={device}
                isLiveBlog={isLiveBlog}
                className={className}
                listNumber={listNumber}
                positionListItem={positionListItem}
                titleListItem={titleListItem}
                uid={uid}
              />
            )
          }
        </ErrorBoundary>
      );
    }
    default:
      return null;
  }
};

BodyChunk.propTypes = {
  className: PropTypes.string,
  countListItems: PropTypes.number,
  device: PropTypes.string,
  isFollowedByAList: PropTypes.bool,
  isLiveBlog: PropTypes.bool,
  listNumber: PropTypes.number,
  positionListItem: PropTypes.number,
  type: PropTypes.oneOf(['text', 'enhancement', 'ad', 'taboola']),
  titleListItem: PropTypes.string,
  value: PropTypes.node,
  uid: PropTypes.string,
  pageData: PropTypes.object,
  articleDepth: PropTypes.number,
  uri: PropTypes.string,
};

BodyChunk.defaultProps = {
  isLiveBlog: false,
};

export default BodyChunk;
