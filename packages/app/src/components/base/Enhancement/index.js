import React from 'react';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload';

import { getKey, isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import { ContentPlaceholder } from '@univision/fe-components-base/dist/components/Placeholder';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import RawHtmlContainer from '@univision/fe-components-base/dist/components/enhancements/RawHtmlContainer';
import loadingModes from '@univision/fe-commons/dist/components/LazyLoad/modes.json';
import LazyLoading from '@univision/fe-commons/dist/components/LazyLoad';

import localization from '@univision/fe-utilities/localization';
import SlideshowPlaceholder from '../../contentTypes/HorizontalSlideshow/Layouts/Inline/Placeholder';

const enhancedComponents = {
  image: dynamic(() => import(/* webpackChunkName: "articleEnhancements-image" */ '@univision/fe-components-base/dist/components/enhancements/InlineImage'), { loading: ContentPlaceholder }),
  quoteenhancement: dynamic(() => import(/* webpackChunkName: "articleEnhancements-quote" */ '@univision/fe-components-base/dist/components/enhancements/Quote'), { loading: ContentPlaceholder }),
  video: dynamic(() => import(/* webpackChunkName: "articleEnhancements-video" */ '@univision/fe-video/dist/components/enhancements/Video'), { loading: ContentPlaceholder }),
  livestream: dynamic(() => import(/* webpackChunkName: "articleEnhancements-livestream" */ '@univision/fe-video/dist/components/enhancements/LiveStream'), { loading: ContentPlaceholder }),
  article: dynamic(() => import(/* webpackChunkName: "articleEnhancements-article" */ '@univision/fe-components-base/dist/components/enhancements/RelatedArticle'), { loading: ContentPlaceholder }),
  slideshow: dynamic(() => import(/* webpackChunkName: "articleEnhancements-slideshow" */ '../../contentTypes/HorizontalSlideshow/SlideshowWrapper'), { loading: SlideshowPlaceholder }),
  listitem: dynamic(() => import(/* webpackChunkName: "articleEnhancements-listitem" */ '@univision/fe-components-base/dist/components/enhancements/ListItem'), { loading: ContentPlaceholder }),
};

/**
 * Enhanchement Component
 * @param {string} className extra class name
 * @param {Object} data page and object props
 * @param {boolean} isLiveBlog determines if is liveblog
 * @param {number} listNumber order number of the list
 * @param {string} device what platform user is accessing
 * @returns {Object}
 */
const Enhancement = ({
  className,
  countListItems,
  data,
  device,
  isLiveBlog,
  listNumber,
  uid,
  positionListItem,
  titleListItem,
}) => {
  const {
    objectData = {},
    enhancementData = {},
    pageData = {},
    onClick,
  } = data || {};
  const { type, credit, caption } = objectData || {};
  const { theme, requestParams } = pageData;

  let props = {
    ...objectData,
    ...enhancementData,
    className,
  };

  if (!type) {
    return null;
  }

  let finalEnhancement;
  let loadingPlaceholder;

  switch (type) {
    case 'article':
      props = {
        ...props,
        onClick,
        isLiveBlog,
        theme,
      };
      break;

    case 'quoteenhancement':
      props = {
        ...props,
        type: getKey(enhancementData, 'quoteType.name')?.toLowerCase(),
        theme,
      };
      break;

    case 'slideshow':
      props = {
        ...props,
        fullWidth: true,
        type: 'inline',
        autoplay: false,
        lazyload: Array.isArray(objectData.slides) || { fetchMode: loadingModes.lazy },
        nextSlideshows: null,
      };

      loadingPlaceholder = SlideshowPlaceholder;
      break;

    case 'image':
      props = {
        ...props,
        onClick,
        fullWidth: true,
        lazyload: true,
      };
      break;

    case 'video':
      props = {
        ...props,
        fullWidth: true,
        env: requestParams?.mode,
        pageData,
        widgetData: objectData,
      };
      break;

    case 'livestream':
      props = {
        ...props,
        fullWidth: true,
      };
      break;

    case 'externalcontent': {
      const responseData = getKey(objectData, 'responseData', {});
      const { html = '', fullWidth } = responseData;

      finalEnhancement = (
        <RawHtmlContainer
          html={html}
          settingsExternalContent={responseData}
        />
      );

      // Some external content must be full-width on all breakpoints
      if (fullWidth) {
        finalEnhancement = (
          <FullWidth breakpoints={['xxs', 'xs', 'sm', 'md', 'lg', 'xl']}>
            {finalEnhancement}
          </FullWidth>
        );
      }

      return finalEnhancement;
    }

    case 'rawhtml':
      return objectData?.html ? <RawHtmlContainer html={objectData.html} /> : null;
    case 'listitem': {
      props = {
        ...props,
        countListItems,
        device,
        listNumber,
        positionListItem,
        titleListItem,
        uid,
      };
      break;
    }
    default:
      return null;
  }

  const DynamicWidget = enhancedComponents[type];
  finalEnhancement = (
    <DynamicWidget
      {...props}
      data-type={type}
      enhancementData={enhancementData}
    />
  );

  if (props.fullWidth) {
    finalEnhancement = (
      <FullWidth breakpoints={['xxs', 'xs']}>
        {finalEnhancement}
        {type && credit && !caption && <p>{localization.get('credit')}: {credit}</p>}
      </FullWidth>
    );
  }

  if (props.lazyload) {
    if (isValidObject(props.lazyload)) {
      const { lazyload } = props;
      return (
        <LazyLoading
          uri={objectData.uri}
          placeholder={loadingPlaceholder}
          {...lazyload}
        >
          {widgetData => (
            <FullWidth breakpoints={['xxs', 'xs']}>
              <DynamicWidget {...widgetData} {...props} data-type={type} />
            </FullWidth>
          )}
        </LazyLoading>
      );
    }

    return (
      <LazyLoad height={100} once>
        {finalEnhancement}
      </LazyLoad>
    );
  }

  return finalEnhancement;
};

export default Enhancement;
