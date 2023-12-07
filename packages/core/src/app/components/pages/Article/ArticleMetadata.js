import PropTypes from 'prop-types';
import React from 'react';
import { hasKey, isInArray } from '@univision/fe-commons/dist/utils/helpers';
import SlideshowMetadata from 'components/pages/HorizontalSlideshow/SlideshowMetadata/SlideshowMetadata';

/**
 * Renders metadata for an enhancement
 * @param {Object} bodyPart piece of body
 * @param {number} index current iteration index
 * @returns {JSX}
 */
export function renderEnhancementMetadata(bodyPart, index) {
  if (bodyPart.type === 'enhancement' && hasKey(bodyPart, 'objectData')) {
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
            <div
              key={key}
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
          return <SlideshowMetadata key={key} {...props} />;
        default:
          return <meta key={key} itemProp="articleSection" content={bodyPart.objectData.title} />;
      }
    }
  }

  return null;
}

/**
 * Renders metadata for an article lead
 * @param {Object} data page data
 * @returns {JSX}
 */
function renderLeadMetadata(data) {
  let props;
  if (hasKey(data, 'lead.type')) {
    switch (data.lead.type) {
      case 'video':
        return <meta itemProp="articleSection" content={data.lead.title} />;
      case 'slideshow':
        props = {
          page: data.lead,
        };
        return <SlideshowMetadata key="article-lead-metadata" {...props} />;
      case 'image':
        if (!hasKey(data.lead, 'renditions.original')) {
          return null;
        }
        return (
          <span itemScope itemType="http://schema.org/ImageObject">
            <meta itemProp="contentUrl" content={data.lead.renditions.original.href} />
            <meta itemProp="caption" content={data.lead.caption} />
            <meta itemProp="author" content={data.lead.credit} />
          </span>
        );
      default:
        return null;
    }
  }
  return null;
}

/**
 * Container component representing an Article metadata
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const ArticleMetadata = (props) => {
  const { page } = props;
  const { adSettings } = page;
  const isTaboolaFeedDisabled = adSettings?.disableTaboolaRecirculate;
  let author = page.source;
  if (Array.isArray(page.authors) && page.authors.length > 0) {
    author = `${props.page.authors[0].firstName} ${props.page.authors[0].lastName}`;
  }
  return (
    <div>
      {isTaboolaFeedDisabled ? <meta name="can-recommend" content="false" /> : null}
      <meta itemProp="url" content={page.uri} />
      <meta itemProp="datePublished" content={page.publishDate} />
      <meta itemProp="dateModified" content={page.updateDate} />
      <meta
        itemScope
        itemProp="mainEntityOfPage"
        itemType="http://schema.org/WebPage"
        itemID={page.uri}
      />
      <meta itemProp="description" content={page.description} />
      <meta itemProp="headline" content={page.title} />
      <meta itemProp="alternativeHeadline" content={page.title} />
      <meta itemProp="author" content={author} />

      <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
        <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
          <meta
            itemProp="url"
            content="https://cdn1.performance.univision.com/resource/assets/images/tulip-univision.a08d641a5672bda8ec98ec8f92df1ca3.png"
          />
          <meta itemProp="width" content="20" />
          <meta itemProp="height" content="22" />
        </div>
        <meta itemProp="name" content="Univision" />
      </div>

      {hasKey(props, 'page.image.renditions.original') && (
        <span itemProp="image" itemScope itemType="http://schema.org/ImageObject">
          <meta itemProp="url" content={page.image.renditions.original.href} />
          <meta itemProp="caption" content={page.image.caption} />
          <meta itemProp="width" content={page.image.renditions.original.width} />
          <meta itemProp="height" content={page.image.renditions.original.height} />
        </span>
      )}

      {renderLeadMetadata(page)}

      {Array.isArray(page.body) && page.body.map(renderEnhancementMetadata)}
    </div>
  );
};

/**
 * propTypes
 * @property {Array} widgets - React widgets to be rendered in the page
 */
ArticleMetadata.propTypes = {
  page: PropTypes.object,
};

export default ArticleMetadata;
