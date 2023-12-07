import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { BLACK } from '@univision/fe-commons/dist/utils/styled/constants';
import styled from 'styled-components';
import Dropdown from '@univision/fe-components-base/dist/components/Dropdown';
import Clickable from '@univision/fe-components-base/dist/components/Clickable';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import localization from '@univision/fe-utilities/localization';

import Styles from './CategorySponsors.styles';
import ItemCard from '../ItemCard';

const ButtonContainer = styled.div`${Styles.buttonContainer}`;
const DropDown = styled(Dropdown)`${Styles.dropDownWrapper}`;
const ItemContainer = styled.div`${Styles.itemContainer}`;
const Wrapper = styled.div`${Styles.wrapper}`;
const CardContainer = styled.div`${Styles.cardContainer}`;
/**
 * Grid cards wrapper component
 * @param {Object} category - the widget category
 * @param {Object} sponsors - the sponsors belonging to the category
 * @returns {JSX}
 */
function CategorySponsors({
  category,
  sponsors,
  city,
  allSubcategories,
  trackEvent,
  widgetContext,
}) {
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [seeMore, setSeeMore] = useState(false);

  const allSponsors = sponsors.filter(item => item.category === category);
  const subcategories = allSubcategories[category];
  /**
   * Handle category change
   * @param {Object} e - event submit
   */
  const handleSubCategoryChange = useCallback((e) => {
    e.preventDefault();
    setSelectedSubCategory(e.target?.value);
  }, []);

  /**
  * Handle click on see more button
  */
  const handleClickSeeMore = () => {
    setSeeMore(!seeMore);
  };

  const options = useMemo(() => (
    subcategories.map((item, index) => ({
      name: localization.get(item.toLowerCase()),
      value: String(index),
    }))
      .sort((a, b) => a.name.localeCompare(b.name))
  ), [subcategories]);

  const sponsorCards = useMemo(() => (
    (selectedSubCategory
      ? allSponsors.filter(item => item?.subCategory === subcategories[selectedSubCategory])
      : allSponsors)

      .filter((item) => {
        return (city && item?.market?.title
          ? item?.market?.title.includes(city) : allSponsors);
      })
      .map((item, index, array) => (index % 2 ? null : (
        <CardContainer key={item.title}>
          <ItemCard {...item} index={index} trackEvent={trackEvent} widgetContext={widgetContext} />
          {index !== array.length - 1
          && (
          <ItemCard
            {...array[index + 1]}
            index={index + 1}
            trackEvent={trackEvent}
            widgetContext={widgetContext}
          />
          )}
        </CardContainer>
      )))
  ), [allSponsors, city, selectedSubCategory, subcategories, trackEvent, widgetContext]);

  const itemAll = seeMore ? sponsorCards : sponsorCards.slice(0, 6);

  if (!isValidArray(allSponsors)) return null;

  return (
    <Wrapper>
      <h3>{localization.get(category.toLowerCase())}</h3>
      <DropDown
        iconFill={BLACK}
        placeholder={localization.get('allCategories')}
        options={options}
        onChange={handleSubCategoryChange}
        value={selectedSubCategory}
        name="select-sub-category"
      />
      <ItemContainer>
        {itemAll}
      </ItemContainer>
      <ButtonContainer>
        {sponsorCards.length > 6 && (
          <Clickable
            label={seeMore ? localization.get('seeLess') : localization.get('seeMore')}
            type="button"
            appearance="primary"
            onClick={handleClickSeeMore}
          />
        )}
      </ButtonContainer>
    </Wrapper>
  );
}

CategorySponsors.propTypes = {
  category: PropTypes.string,
  sponsors: PropTypes.array,
  city: PropTypes.string,
  allSubcategories: PropTypes.object,
  trackEvent: PropTypes.func,
  widgetContext: PropTypes.object,
};

export default CategorySponsors;
