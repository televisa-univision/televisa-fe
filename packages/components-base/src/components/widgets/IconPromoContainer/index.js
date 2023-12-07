import React from 'react';
import { favHoroscopesEnabledSelector } from '@univision/fe-commons/dist/store/selectors/favorite-selectors';
import { HOROSCOPES } from '@univision/fe-commons/dist/constants/personalizationType';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { DAISY_BUSH } from '@univision/fe-commons/dist/utils/styled/constants';
import FavoriteSelectorConnector from '../../FavoriteSelector/FavoriteSelectorConnector';
import { horoscopes } from '../../FavoriteSelector/constants';
import IconPromoCarousel from '../IconPromoCarousel';

/**
   * Container component that will render different variants of the
   * IconPromoCarousel widget depending of the state of the app
   * @param {Object} props of component
   * @returns {React.Component}
   */
export const IconPromoContainer = (props) => {
  const { isFavHoroscopesEnabled, widgetContext } = props;

  if (isFavHoroscopesEnabled) {
    return (
      <FavoriteSelectorConnector
        borderColor={DAISY_BUSH}
        favoriteIconColor={DAISY_BUSH}
        iconColor={DAISY_BUSH}
        items={horoscopes}
        title={localization.get('selectYourFavorites')}
        titleColor={DAISY_BUSH}
        personalizationType={HOROSCOPES}
        widgetContext={widgetContext}
      />
    );
  }

  return <IconPromoCarousel {...props} />;
};

IconPromoContainer.propTypes = {
  isFavHoroscopesEnabled: PropTypes.bool,
  widgetContext: PropTypes.object,
};

/**
   * Connector to be called when state change
   * @param {Object} state of the app
   * @returns {Object}
   */
export const mapStateToProps = state => ({
  isFavHoroscopesEnabled: favHoroscopesEnabledSelector(state),
});

export default connect(mapStateToProps)(IconPromoContainer);
