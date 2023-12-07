import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {
  hasKey, isValidArray, toAbsoluteUrl, isInArray, cleanArray, truncateString, isValidObject,
} from '@univision/fe-commons/dist/utils/helpers';

import SlideshowMetadata from '../../HorizontalSlideshow/SlideshowMetadata';

/**
 * Renders metadata for title and body for a post in liveBlog
 * @param {Object} body - post body
 * @param {Object} title - post title
 * @param {string} key - post key
 * @returns {array}
 */
function renderPostTitleDescription(body, title, key) {
  return (
    <Fragment key={key}>
      <meta itemProp="headline" content={truncateString(title, 107, '...', false, false)} />
      <meta itemProp="articleBody" content={body} />
    </Fragment>
  );
}
/**
 * Renders metadata for an enhancement
 * @param {Object} bodyPart piece of body
 * @param {number} index current iteration index
 * @returns {JSX}
 */
function renderEnhancementMetadata(bodyPart, index) {
  if (isValidObject(bodyPart) && bodyPart.type === 'enhancement' && bodyPart.objectData) {
    const allowedTypes = ['video', 'article', 'image', 'slideshow'];

    if (isInArray(bodyPart.objectData.type, allowedTypes)) {
      let props;
      const key = `enhancement-metadata-${index}`;
      switch (bodyPart.objectData.type) {
        case 'image':
          if (!hasKey(bodyPart.objectData, 'renditions.original')) {
            return null;
          }
          return (
            <Fragment key={key}>
              {renderPostTitleDescription(
                bodyPart.objectData.description,
                bodyPart.objectData.title,
              )}
              <div
                itemProp="associatedmedia image"
                itemScope
                itemType="http://schema.org/ImageObject"
              >
                <meta itemProp="url" content={bodyPart.objectData.renditions.original.href} />
                <meta itemProp="width" content={bodyPart.objectData.renditions.original.width} />
                <meta itemProp="height" content={bodyPart.objectData.renditions.original.height} />
                <meta itemProp="caption" content={bodyPart.objectData.caption} />
                <meta itemProp="author" content={bodyPart.objectData.credit} />
              </div>
            </Fragment>
          );
        case 'slideshow':
          props = {
            page: {
              uri: bodyPart.objectData.uri,
              shortTitle: bodyPart.objectData.shortTitle,
              vertical: false,
              slides: bodyPart.objectData.slides,
            },
          };
          return (
            <Fragment key={key}>
              {renderPostTitleDescription(
                bodyPart.objectData.description,
                bodyPart.objectData.title,
              )}
              <SlideshowMetadata key={key} {...props} />
            </Fragment>
          );
        default:
          return renderPostTitleDescription(
            bodyPart.objectData.description, bodyPart.objectData.title, key,
          );
      }
    }
  }

  return null;
}

/**
 * Renders metadata for enhanced post in liveBlog
 * @param {Object} body - post body with enhanced post
 * @param {Object} title - post title
 * @returns {array}
 */
function renderEnhancedPost(body, title) {
  let metaPost = null;
  if (isValidArray(body.referentialText)) {
    metaPost = body.referentialText.map(renderEnhancementMetadata);
    if (!isValidArray(cleanArray(metaPost))) {
      metaPost = body.referentialText.map(b => b.value);
      return renderPostTitleDescription(metaPost, title);
    }
  }
  return metaPost;
}

/**
 * Renders metadata for authors in liveBlog
 * @param {array} authors - authors data
 * @param {string} source - liveBlog source
 * @returns {array}
 */
function renderAuthorMetadata(authors, source) {
  if (isValidArray(authors)) {
    return authors.map((author, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <meta key={idx} itemProp="author" content={author.title} />
    ));
  }
  return (
    <meta itemProp="author" content={source} />
  );
}

/**
 * Renders metadata for an image
 * @param {Object} image - liveBlog image
 * @returns {?JSX}
 */
function renderImageMetadata(image) {
  if (hasKey(image, 'renditions.original')) {
    return (
      <span itemProp="image" itemScope itemType="http://schema.org/ImageObject">
        <meta itemProp="url" content={image.renditions.original.href} />
        <meta itemProp="caption" content={image.caption} />
        <meta itemProp="width" content={image.renditions.original.width} />
        <meta itemProp="height" content={image.renditions.original.height} />
      </span>
    );
  }
  return null;
}

/**
 * Renders metadata for liveBlog post
 * @param {array} posts - liveBlog posts data
 * @param {string} source - liveBlog source
 * @param {string} domain - liveBlog domain
 * @returns {array}
 */
function renderPostMetadata(posts, source, domain) {
  if (isValidArray(posts)) {
    return posts.map((post, index) => (
      <div itemProp="liveBlogUpdate" itemType="http://schema.org/BlogPosting" itemScope key={post.publishDate}>

        <meta itemProp="url" content={`${toAbsoluteUrl(post.uri, domain)}#post${index + 1}`} />
        <meta itemProp="datePublished" content={post.publishDate} />
        <meta itemProp="dateModified" content={post.updateDate} />
        <meta
          itemScope
          itemProp="mainEntityOfPage"
          itemType="http://schema.org/WebPage"
          itemID={`${toAbsoluteUrl(post.uri, domain)}#post${index + 1}`}
        />
        {renderImageMetadata(post.image)}
        {renderAuthorMetadata(post.authors, source)}
        {renderEnhancedPost(post.body, post.title)}
        <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
          <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
            <meta itemProp="url" content="https://cdn1.performance.univision.com/resource/assets/images/tulip-univision.a08d641a5672bda8ec98ec8f92df1ca3.png" />
            <meta itemProp="width" content="20" />
            <meta itemProp="height" content="22" />
          </div>
          <meta itemProp="name" content={source} />
        </div>
      </div>
    ));
  }
  return null;
}

/**
 * Container component representing an LiveBlog metadata
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const LiveBlogMetadata = (props) => {
  const { page, domain } = props;
  let author = page.source;
  if (isValidArray(page.authors)) {
    author = `${props.page.authors[0].firstName} ${props.page.authors[0].lastName}`;
  }
  const liveBlogUrl = toAbsoluteUrl(page.uri, domain);
  const publishDate = page?.mostRecentPostPublishDate || page?.publishDate;
  return (
    <article itemType="http://schema.org/LiveBlogPosting" itemScope>
      <meta itemProp="headline" content={page.title} />
      <meta itemProp="description" content={page.description} />
      <meta itemProp="url" content={liveBlogUrl} />
      <meta itemProp="coverageStartTime" content={publishDate} />
      <meta itemProp="coverageEndTime" content={page.updateDate} />
      <meta
        itemScope
        itemProp="mainEntityOfPage"
        itemType="http://schema.org/WebPage"
        itemID={liveBlogUrl}
      />
      {renderImageMetadata(page.image)}
      {renderPostMetadata(page.posts, author, domain)}
    </article>
  );
};

/**
 * propTypes
 * @property {Object} page - PageData for liveBlog
 * @property {string} domain - liveBlog domain
 */
LiveBlogMetadata.propTypes = {
  page: PropTypes.object,
  domain: PropTypes.string,
};

export default LiveBlogMetadata;
