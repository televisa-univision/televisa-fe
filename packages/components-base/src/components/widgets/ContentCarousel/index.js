import PropTypes from 'prop-types';
import React from 'react';

import Store from '@univision/fe-commons/dist/store/store';
import { getTheme } from '@univision/fe-commons/dist/store/storeHelpers';

import * as sizes from '../../Picture/imageSizes';
import PromoItem from '../../PromoItem';
import TopicBar from '../../TopicBar';
import Arrow from '../../SlideArrow';
import CoreSlider from '../../CoreSlider';

import Styles from './ContentCarousel.scss';

/**
 * Device Size overrides for this widget, need the smallest images here.
 * @type {{xl: string, lg: string, md: string, sm: string, xs: string}}
 */

const deviceSizeOverrides = {
  xl: sizes.XX_SMALL,
  lg: sizes.XX_SMALL,
  md: sizes.XX_SMALL,
  sm: sizes.XX_SMALL,
  xsm: sizes.XX_SMALL,
};

/**
 * Content Carousel Widget
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const ContentCarousel = ({ content, settings }) => {
  if (!content || !content.length || !Array.isArray(content)) {
    return null;
  }
  const promoItems = content.map(contentData => (
    <div key={contentData.uid}>
      <div className={Styles.card}>
        <PromoItem
          key={contentData.uid}
          {...contentData}
          deviceSizeOverrides={deviceSizeOverrides}
          className={Styles.title}
        />
      </div>
    </div>
  ));

  const settingsData = {
    prevArrow: <Arrow direction="prev" theme="light" autoHide />,
    nextArrow: <Arrow direction="next" theme="light" autoHide />,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, content.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, content.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          lazyLoad: false,
        },
      },
    ],
  };

  const hasTitle = !!settings?.title;

  return (
    <div className={`uvs-widget ${Styles.contentCarousel} ${!hasTitle ? Styles.noTitle : ''}`}>
      {hasTitle && (
        <TopicBar
          settings={settings}
          align="center"
          separator="bottom"
          theme={getTheme(Store)}
        />
      )}
      <div className="carousel-widget">
        <CoreSlider settings={settingsData}>{promoItems}</CoreSlider>
      </div>
    </div>
  );
};

ContentCarousel.propTypes = {
  content: PropTypes.array.isRequired,
  settings: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

export default ContentCarousel;
