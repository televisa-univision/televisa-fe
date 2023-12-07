import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { hasKey, getKey } from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import { getPageData, getTheme } from '@univision/fe-commons/dist/store/storeHelpers';

import Quote from '@univision/fe-components-base/dist/components/enhancements/Quote';
import RawHtmlContainer from '@univision/fe-components-base/dist/components/enhancements/RawHtmlContainer';
import { enableEnhancementAutoplay } from '@univision/fe-video/dist/helpers';

import ampFactory from 'app/AMP/utils/factories/ampFactory';

import HorizontalSlideshow from '../../HorizontalSlideshow/Layouts/Inline/AmpInlineSlideshow';
import AmpVideo from '../../../widgets/Video/AmpVideo';
import AmpInlineImage from '../../../enhancements/image/AmpInlineImage';
import AmpArticleEnhancement from '../../../enhancements/article/AmpArticleEnhancement';
import AmpFullWidth from '../../../fullwidth/AmpFullWidth.styles';
import { VideoCaption, Blockquote, Pullquote } from './AmpArticleChunk.styles';

/* eslint-disable react/no-danger */
/**
 * Inspects objectData and determins
 * which type of enhancement to render
 * @param {Object} options - config/options to get article chunk data
 * @param {Object} options.objectData - setting for content data by type
 * @param {Object} options.enhancementData - settings for enhancements on article
 * @param {number} options.index - article chunk number
 * @returns {JSX} the enhancement component to be rendered
 */
export const getEnhancement = (options) => {
  const {
    objectData,
    enhancementData,
    index,
  } = options;
  const type = getKey(objectData, 'type');

  switch (type) {
    case 'image': {
      return (
        <AmpInlineImage {...objectData} />
      );
    }
    case 'slideshow': {
      return (
        <HorizontalSlideshow {...objectData} type="inline" autoplay={false} />
      );
    }
    case 'article': {
      return (
        <AmpArticleEnhancement
          {...objectData}
          theme={getTheme(Store)}
        />
      );
    }
    case 'video': {
      const autoplayValue = enableEnhancementAutoplay(objectData.mcpid);
      return (
        <Fragment>
          <AmpVideo
            {...objectData}
            widgetData={objectData}
            pageData={getPageData(Store)}
            autoplay={autoplayValue}
          />
          {objectData.title && <VideoCaption>{objectData.title}</VideoCaption>}
        </Fragment>
      );
    }
    case 'quoteenhancement': {
      const Wrapper = (getKey(enhancementData, 'quoteType', {}).name || '').toLowerCase() === 'blockquote' ? Blockquote : Pullquote;
      return (
        <Wrapper>
          <Quote
            text={enhancementData.text}
            type={hasKey(enhancementData, 'quoteType.name') ? enhancementData.quoteType.name.toLowerCase() : undefined}
          />
        </Wrapper>
      );
    }
    case 'externalcontent': {
      if (hasKey(objectData, 'responseData.html') || hasKey(objectData, 'responseData._url')) {
        return (
          <RawHtmlContainer
            loadExternalScripts={false}
            settingsExternalContent={objectData.responseData}
            html={ampFactory.embedToAmp(objectData.responseData, index)}
          />
        );
      }
      return null;
    }
    case 'rawhtml': {
      if (!objectData?.html) {
        return null;
      }
      return (
        <RawHtmlContainer
          loadExternalScripts={false}
          html={ampFactory.embedToAmp(objectData, index)}
        />
      );
    }
    default:
      return null;
  }
};

/**
 * ArticleChunk - render article content based on it's type
 * @param {Object} props component props
 * @param {string} props.type - article type
 * @param {Object} props.value - article react node/element
 * @param {Object} props.article - article settings for content
 * @param {Object} props.objectData - setting for content data by type
 * @param {number} props.index - article chunk number
 * @returns {JSX}
 */
export default function ArticleChunk ({
  type, value, article, ...rest
}) {
  const enhancementData = rest;
  let enhancement;
  const enhancementType = hasKey(enhancementData, 'objectData.type') ? enhancementData.objectData.type : '';
  switch (type) {
    case 'text':
      return (
        <div dangerouslySetInnerHTML={{ __html: ampFactory.cleanHtml(value) }} />
      );
    case 'ad':
      return value;
    case 'enhancement':
      enhancementData.index = rest.index;
      enhancement = getEnhancement(enhancementData);
      if (['video', 'slideshow'].indexOf(enhancementType) > -1) {
        return <AmpFullWidth>{enhancement}</AmpFullWidth>;
      }
      return enhancement;
    default:
      return null;
  }
}

ArticleChunk.propTypes = {
  type: PropTypes.oneOf(['text', 'enhancement', 'ad']),
  value: PropTypes.node,
  article: PropTypes.object,
  objectData: PropTypes.object,
  isFullWidth: PropTypes.bool,
  index: PropTypes.number,
};
