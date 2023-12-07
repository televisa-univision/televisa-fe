import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import localization from '@univision/fe-utilities/localization';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import { useSelector } from 'react-redux';
import { currentMarketSelector } from '@univision/fe-commons/dist/store/selectors/local-selectors';
import marketCoordinates from '@univision/fe-commons/dist/constants/marketCoordinates.json';
import CategorySponsors from './categorySponsors';
import {
  CITIES, BAHIA, SF, MARKET,
} from './constants';
import HelpCenterMarket from './market';

/**
 * Help center component
 * @param {category} category current help center data
 * @param {content} content current help center data
 * @returns {Array}
 */
const getSubCategoryItems = (category, content) => {
  return [...new Set(content?.filter(item => item.category === category)
    .map(item => item.subCategory))]
    .sort();
};
/**
 * Help center component
 * @param {Array} content current help center data
 * @param {category} category current help center data
 * @returns {JSX}
 */
function HelpCenter({ content, widgetContext }) {
  const [selectedCity, setSelectedCity] = useState('');
  const [city, setCity] = useState([]);
  const widgetTitle = widgetContext?.title || '';

  const defaultMarket = useSelector(currentMarketSelector);
  useEffect(() => {
    const initialCityIndex = MARKET.indexOf(
      marketCoordinates[defaultMarket]?.name || defaultMarket
    );
    setSelectedCity(initialCityIndex);
  }, [defaultMarket]);
  useEffect(() => {
    setCity(CITIES[selectedCity] === BAHIA ? SF : CITIES[selectedCity]);
  }, [selectedCity]);

  const trackEvent = useCallback((title, id, widgetContextItem) => {
    const dataTracking = {
      widget_pos: widgetContextItem?.position,
      widget_title: widgetTitle,
      widget_type: `Help Center - ${widgetContext?.type}`,
    };
    const dataTrackingClick = {
      ...dataTracking,
      card_type: `HelpCenterItem${id + 1} - rectangle`,
      card_title: title,
      card_id: id,
      gtm: { uniqueEventId: id },
    };
    WidgetTracker.track(WidgetTracker.events.helpCenterEngagement, dataTrackingClick);
  }, [widgetContext, widgetTitle]);

  const categories = useMemo(() => {
    return [...new Set(content.map(item => item.category))].sort();
  }, [content]);

  const subcategories = useMemo(() => {
    const newSubcategories = categories?.reduce((acc, value) => {
      const subcategory = getSubCategoryItems(value, content);
      acc[value] = subcategory;
      return acc;
    }, {});
    return newSubcategories;
  }, [content, categories]);

  const categorySections = categories
    .map((category) => {
      return (
        <CategorySponsors
          key={category}
          category={localization.get(category)}
          allSubcategories={subcategories}
          sponsors={content}
          city={city}
          trackEvent={trackEvent}
          widgetContext={widgetContext}
        />
      );
    });
  return (
    <>
      <HelpCenterMarket
        setSelectedCity={setSelectedCity}
        selectedCity={selectedCity}
        trackEvent={trackEvent}
      />
      {categorySections}
    </>
  );
}

HelpCenter.propTypes = {
  content: PropTypes.array,
  widgetContext: PropTypes.object,
};

export default React.memo(HelpCenter);
