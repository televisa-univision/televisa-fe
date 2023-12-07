import React, { useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import {
  SUCCESS,
  LOADING,
  ERROR,
} from '@univision/fe-commons/dist/constants/status';

import FullWidth from '../FullWidth';
import FavoriteButton from './FavoriteButton';
import Styles from './FavoriteSelector.styles';

const Container = styled.div`
  ${Styles.container}
`;
const ItemContainer = styled.div`
  ${Styles.itemContainer}
`;
const Item = styled(FavoriteButton)`
  ${Styles.item}
`;
const TopBorder = styled.div`
  ${Styles.topBorder}
`;
const Title = styled.h2`
  ${Styles.title}
`;

/**
 * Renders a list of favorite cards which let the user mark different content
 * as a favorite. This selection powers other dynamic content throughout the
 * app.
 * @returns {JSX}
 */
const FavoriteSelector = ({
  accessToken,
  borderColor,
  className,
  favorites,
  favoriteIconColor,
  fetchFavoritesAction,
  iconColor,
  items,
  personalizationType,
  style,
  fetchFavoritesStatus,
  title,
  titleColor,
  updateFavoriteAction,
  widgetContext,
}) => {
  useEffect(() => {
    if (accessToken) {
      fetchFavoritesAction(personalizationType);
    }
  }, [personalizationType, fetchFavoritesAction, accessToken]);

  // Define order of items after first load of favorites
  const itemsOrdered = useMemo(() => {
    if (
      !isValidArray(items)
      || !Array.isArray(favorites)
      || fetchFavoritesStatus !== SUCCESS) {
      return items;
    }
    const resultMap = {};
    favorites.forEach((favId) => { resultMap[favId] = null; });
    items.forEach((item) => { resultMap[item.id] = item; });
    return Object.values(resultMap);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFavoritesStatus, items]);

  // Set items isFavorite flag following the defined order
  const itemsList = useMemo(() => {
    if (!Array.isArray(favorites) || !isValidObject(itemsOrdered)) {
      return null;
    }
    const resultMap = {};
    itemsOrdered.forEach((item) => { resultMap[item.id] = { ...item, isFavorite: false }; });
    favorites.forEach((favId) => { resultMap[favId] = { ...resultMap[favId], isFavorite: true }; });
    return Object.values(resultMap);
  }, [itemsOrdered, favorites]);

  const toggleFavorite = useCallback(signId => updateFavoriteAction(personalizationType, signId),
    [updateFavoriteAction, personalizationType]);

  if (!itemsList) return null;

  const components = itemsList.map(item => (
    <Item
      key={item.id}
      action={toggleFavorite}
      favorited={item.isFavorite}
      favoriteIconColor={favoriteIconColor}
      href={item.href}
      iconColor={iconColor}
      iconName={item.iconName}
      id={item.id}
      personalizationType={personalizationType}
      title={item.title}
      widgetContext={widgetContext}
    />
  ));

  return (
    <Container className={className} style={style}>
      <TopBorder color={borderColor} />
      <Title color={titleColor}>{title}</Title>
      <FullWidth breakpoints={['xxs', 'xs']}>
        <ItemContainer>
          {components}
        </ItemContainer>
      </FullWidth>
    </Container>
  );
};

FavoriteSelector.propTypes = {
  accessToken: PropTypes.string,
  updateFavoriteAction: PropTypes.func,
  fetchFavoritesAction: PropTypes.func,
  borderColor: PropTypes.string,
  className: PropTypes.string,
  favorites: PropTypes.arrayOf(PropTypes.string),
  favoriteIconColor: PropTypes.string,
  iconColor: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      iconName: PropTypes.string,
      title: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  personalizationType: PropTypes.string.isRequired,
  style: PropTypes.object,
  fetchFavoritesStatus: PropTypes.oneOf([SUCCESS, LOADING, ERROR]),
  title: PropTypes.string,
  titleColor: PropTypes.string,
  widgetContext: PropTypes.object,
};

export default FavoriteSelector;
