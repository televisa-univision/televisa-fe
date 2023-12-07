import { connect } from 'react-redux';
import favoritesMapper from '@univision/fe-commons/dist/store/slices/user/favoritesMapper';
import { favoritesIdsSelector, favoriteDataSelector } from '@univision/fe-commons/dist/store/selectors/favorite-selectors';
import { accessTokenSelector } from '@univision/fe-commons/dist/store/selectors/user-selectors';
import FavoriteSelector from '.';

/**
 * Connector to be called when state change
 * @param {Object} state of of the app
 * @returns {Object}
 */
export const mapStateToProps = (state, { personalizationType }) => {
  const {
    favoritesEntry,
    fetchStatusEntry,
  } = favoritesMapper[personalizationType] || {};
  return {
    favorites: favoritesIdsSelector(state, favoritesEntry),
    fetchFavoritesStatus: favoriteDataSelector(state, fetchStatusEntry),
    accessToken: accessTokenSelector(state),
  };
};

/**
 * Bind actions to a dispatch function
 * @param {Function} dispatch function of store
 * @param {Object} ownProps properties the component receives
 * @property {string} ownProps.personalizationType of this FavoriteSelector
 * @returns {Function}
 */
export const mapDispatchToProps = dispatch => ({
  updateFavoriteAction: (personalizationType, signId) => {
    const { updateFavoriteAction } = favoritesMapper[personalizationType] ?? {};
    if (updateFavoriteAction) dispatch(updateFavoriteAction(signId));
  },
  fetchFavoritesAction: (personalizationType) => {
    const { fetchFavoritesAction } = favoritesMapper[personalizationType] ?? {};
    if (fetchFavoritesAction) {
      dispatch(fetchFavoritesAction());
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteSelector);
