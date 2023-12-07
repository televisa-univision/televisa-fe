import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardTypes from '@univision/fe-commons/dist/constants/cardTypes';
import {
  SUCCESS,
  LOADING,
  ERROR,
} from '@univision/fe-commons/dist/constants/status';
import favoritesMapper from '@univision/fe-commons/dist/store/slices/user/favoritesMapper';
import { favoriteDataSelector } from '@univision/fe-commons/dist/store/selectors/favorite-selectors';
import * as reactionsActions from '@univision/fe-commons/dist/store/slices/reactions/reactions-slice';
import LoadingCard from '../../cards/LoadingCard';
import { getSingleCardData } from '../../../utils/cardMapper/getWidgetCardsData';
import { attachCardTypeMetaData, setAsPersonalizedContent } from '../../cards/helpers';

/**
 * Determines equality between changes in mapStateToProps
 * @param {Object} psProps prev state props
 * @param {Object} nsProps next state props
 * @returns {boolean} are equals
 */
export const areStatePropsEqual = (psProps, nsProps) => {
  return nsProps.favorite === psProps.favorite
      && nsProps.cardData?.uid === psProps.cardData?.uid;
};

/**
 * Personalized Card Content
 * @param {number} cardIndex index of the card inside the widget
 * @param {Object} widgetContext of the widget where the card is
 * @param {string} personalizationType one of the valid personalization types
 * @param {Function} DefaultComponent card component for the non personalized data
 * @returns {React.Component}
 */
export default (cardIndex, widgetContext, personalizationType, DefaultComponent) => {
  /**
   * HOC to render a card component with personalized content
   * @param {Object} props of component
   * @returns {React.Component}
   */
  const PersonalizedWidgetContent = (props) => {
    const {
      cardData,
      favorite,
      fetchReactions,
      type,
      ...restProps
    } = props;

    const [CardComponent, newCardContent] = useMemo(() => {
      if (!cardData) return [null, null];

      const { uid: id } = cardData;

      if (cardIndex === 0 && id) fetchReactions({ contentIds: [id] });

      const [Component, cardContent] = getSingleCardData(widgetContext, cardData, cardIndex);
      let modifiedCardContent = attachCardTypeMetaData(cardContent, type);

      if (favorite?.status === SUCCESS && favorite?.enabled) {
        modifiedCardContent = setAsPersonalizedContent(modifiedCardContent);
      }

      return [Component, modifiedCardContent];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardData, favorite, type]);

    if (favorite?.status === LOADING && favorite?.enabled) {
      return <LoadingCard type={type} showSpinner />;
    }
    if (!CardComponent) { // if something goes wrong render the default component
      return <DefaultComponent {...restProps} type={type} />;
    }

    return <CardComponent {...restProps} {...newCardContent} type={type} />;
  };

  PersonalizedWidgetContent.propTypes = {
    cardData: PropTypes.object,
    favorite: PropTypes.shape({
      status: PropTypes.oneOf([SUCCESS, LOADING, ERROR]),
      enabled: PropTypes.bool,
    }),
    fetchReactions: PropTypes.func,
    type: PropTypes.oneOf(Object.values(CardTypes)),
  };

  /**
   * Connector to be called when state change
   * @param {Object} state of the app
   * @returns {Object}
   */
  const mapStateToProps = (state) => {
    const {
      cardsDataEntry,
      favoritesEntry,
    } = favoritesMapper[personalizationType];
    return {
      cardData: favoriteDataSelector(state, `${cardsDataEntry}[${cardIndex}]`),
      favorite: favoriteDataSelector(state, `${favoritesEntry}[${cardIndex}]`),
    };
  };

  return connect(
    mapStateToProps,
    {
      fetchReactions: reactionsActions.fetchReactions,
    },
    null,
    { areStatePropsEqual }
  )(PersonalizedWidgetContent);
};
