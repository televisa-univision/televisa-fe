import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { HOROSCOPES } from '@univision/fe-commons/dist/constants/personalizationType';
import { DAISY_BUSH } from '@univision/fe-commons/dist/utils/styled/constants';
import { horoscopes } from './constants';
import FavoriteSelector from '.';

/**
 * Keeps track of favorite horoscopes for this story
 * @returns {JSX}
 */
const FavoriteHoroscopeContainer = () => {
  const [favorites, setFavorites] = useState([]);

  /**
   * Adds/Removes favorites (this would be a redux action in the real app)
   * @param {string} personalizationType type of personalization
   * @param {string} id the id of the favorite horoscope
   */
  const toggleFavorite = (personalizationType, id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favoriteId => favoriteId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <FavoriteSelector
      updateFavoriteAction={toggleFavorite}
      fetchFavoritesAction={() => {}}
      personalizationType={HOROSCOPES}
      borderColor={DAISY_BUSH}
      favorites={favorites}
      favoriteIconColor={DAISY_BUSH}
      iconColor={DAISY_BUSH}
      items={horoscopes}
      personalizationCategory="horoscopos"
      title="Elige tus Favoritos"
      titleColor={DAISY_BUSH}
      style={{ maxWidth: '1264px' }}
    />
  );
};

storiesOf('Clickable/FavoriteSelector', module).add(
  'horoscope selector',
  () => (
    <FavoriteHoroscopeContainer />
  )
);
