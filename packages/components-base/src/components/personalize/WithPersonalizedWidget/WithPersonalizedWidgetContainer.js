import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { favoriteDataSelector } from '@univision/fe-commons/dist/store/selectors/favorite-selectors';
import { accessTokenSelector } from '@univision/fe-commons/dist/store/selectors/user-selectors';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import {
  SUCCESS,
  LOADING,
  ERROR,
} from '@univision/fe-commons/dist/constants/status';
import {
  favoritesMapper,
} from '@univision/fe-commons/dist/store/slices/user/favoritesMapper';
import WithPersonalizedWidgetContentLegacy from '../WithPersonalizedWidgetContent/WithPersonalizedWidgetContentLegacy';

/**
   * HOC to add showNative marker
   * This will defined in what position the ad will be displayed
   * @param {Object} props of component
   * @returns {React.Component}
   */
export const WithPersonalizedWidgetComponent = (props) => {
  const {
    accessToken,
    settings,
    fetchFavoritesAction,
    fetchFavoritesStatus,
    widgetContext,
    propCardsPath,
    WidgetWrappedComponent,
    personalizedWidgetKey,
  } = props;
  const shouldBePersonalized = widgetContext?.id === personalizedWidgetKey;
  const personalizationType = settings?.personalizationType;

  const newProps = { ...props };
  const cards = newProps[propCardsPath];

  useEffect(() => {
    if (accessToken) {
      fetchFavoritesAction(personalizationType);
    }
  }, [personalizationType, fetchFavoritesAction, accessToken]);

  newProps[propCardsPath] = useMemo(() => {
    if (!isValidArray(cards)) return [];

    if (fetchFavoritesStatus === SUCCESS && shouldBePersonalized) {
      if (propCardsPath === 'content') {
        return cards.map(cardData => ({
          ...cardData,
          personalizationType,
        }));
      }
      return cards.map(([Component, cardData], idx) => ([
        WithPersonalizedWidgetContentLegacy(idx, widgetContext, personalizationType, Component),
        cardData,
      ]
      ));
    }

    return cards;
  }, [cards,
    fetchFavoritesStatus,
    personalizationType,
    widgetContext,
    shouldBePersonalized,
    propCardsPath]);

  return <WidgetWrappedComponent {...newProps} />;
};

WithPersonalizedWidgetComponent.propTypes = {
  accessToken: PropTypes.string,
  personalizedWidgetKey: PropTypes.string,
  settings: PropTypes.object.isRequired,
  widgetContext: PropTypes.object.isRequired,
  /** Action to fetch favorite horoscopes */
  fetchFavoritesAction: PropTypes.func.isRequired,
  /** Fetching Favorites Status */
  fetchFavoritesStatus: PropTypes.oneOf([SUCCESS, LOADING, ERROR]),
  /** Property used to read Widget cards content from WidgetWrappedComponent widget props */
  propCardsPath: PropTypes.string,
  /** Widget component to be personalized */
  WidgetWrappedComponent: PropTypes.func,
};

/**
   * Connector to be called when state change
   * @param {Object} state of the app
   * @param {Object} ownProps properties of the component
   * @returns {Object}
   */
export const mapStateToProps = (state, { settings }) => {
  const personalizationType = settings?.personalizationType;
  const {
    fetchStatusEntry,
    widgetKeyEntry,
  } = favoritesMapper[personalizationType] ?? {};
  return {
    fetchFavoritesStatus: favoriteDataSelector(state, fetchStatusEntry),
    personalizedWidgetKey: favoriteDataSelector(state, widgetKeyEntry),
    accessToken: accessTokenSelector(state),
  };
};

/**
   * Bind actions to a dispatch function
   * @param {Function} dispatch function of store
   * @returns {Function}
   */
export const mapDispatchToProps = dispatch => ({
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
)(WithPersonalizedWidgetComponent);
