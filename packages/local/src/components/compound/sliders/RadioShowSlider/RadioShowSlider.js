import PropTypes from 'prop-types';
import React from 'react';

import BackgroundImage from '@univision/fe-components-base/dist/components/BackgroundImage';
import CoreSlider from '@univision/fe-components-base/dist/components/CoreSlider';

import Styles from './RadioShowSlider.scss';

/**
 * Promo Carousel Widget
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const RadioShowSlider = ({ content, device }) => {
  const settings = {
    type: 'RadioShow',
    dotsClass: `${Styles.dots} slick-dots`,
    lazyLoad: true,
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
  };

  return (
    <CoreSlider settings={settings} className={Styles.radioShowSlider}>
      {(Array.isArray(content) && content.length > 0) && content.map((item) => {
        return (
          <div key={item.uid} className={Styles.item}>
            <h2 className={Styles.titleWrap}>
              <span className={Styles.title}>{item.title}</span>
            </h2>
            <BackgroundImage
              image={item.image}
              className={Styles.image}
              device={device}
            />
          </div>
        );
      })}
    </CoreSlider>
  );
};

/**
 * PropTypes
 * @property {Array} content Array of content items from the API to be displayed
 */
RadioShowSlider.propTypes = {
  content: PropTypes.array.isRequired,
  device: PropTypes.string,
};

export default RadioShowSlider;
