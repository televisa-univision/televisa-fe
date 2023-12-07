import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import extractContentIds from '@univision/fe-commons/dist/utils/helpers/extractContentIds';

import CardsCarousel from '../Carousel/CarouselEnhancement';

/**
 * LocalNewsCarousel component
 * @param {Object} props - component props
 * @param {Array} cardData - card contents
 * @param {func} fetchLocalMarketContent - dispatch action
 * @param {string} localMarket - local market by location
 * @returns {JSX}
 */
const LocalNewsCarousel = (props) => {
  const hasLoad = useRef(false);
  const {
    contents,
    fetchLocalMarketContent,
    fetchReactions,
    localMarket,
    widgetContext,
    ...otherProps
  } = props;
  useEffect(() => {
    fetchLocalMarketContent();
  }, [fetchLocalMarketContent]);

  useEffect(() => {
    if (isValidArray(contents)) {
      const contentIds = extractContentIds({
        data: [{ contents }],
        isWidget: true,
      });
      fetchReactions({ contentIds });
    }
  }, [contents, fetchReactions]);

  if (!isValidArray(contents) && !localMarket && !hasLoad.current) return null;

  hasLoad.current = true;
  return <CardsCarousel {...otherProps} content={contents} localMarket={localMarket} />;
};

LocalNewsCarousel.propTypes = {
  contents: PropTypes.array,
  fetchLocalMarketContent: PropTypes.func,
  fetchReactions: PropTypes.func,
  localMarket: PropTypes.string,
  widgetContext: PropTypes.array,
};

export default LocalNewsCarousel;
