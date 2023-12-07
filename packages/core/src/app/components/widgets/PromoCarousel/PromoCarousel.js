import PropTypes from 'prop-types';
import React from 'react';
import PromoItem from '@univision/fe-components-base/dist/components/PromoItem';

import Carousel from '../../sliders/Carousel/Carousel';

/**
 * Promo Carousel Widget
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const PromoCarousel = ({ content }) => {
  const promoItems = content.map(contentData => (
    <div key={contentData.uid}>
      <PromoItem {...contentData} />
    </div>
  ));

  return (
    <Carousel>
      { promoItems }
    </Carousel>
  );
};

/**
 * PropTypes
 * @property {Array} content Array of content items from the API to be displayed
 */
PromoCarousel.propTypes = {
  content: PropTypes.array.isRequired,
};

/**
 * Default Prop Values
 * @property {string} text Default Text in case the prop is not sent
 */
PromoCarousel.defaultProps = {};

export default PromoCarousel;
