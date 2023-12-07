import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  SUCCESS,
  LOADING,
  ERROR,
} from '@univision/fe-commons/dist/constants/status';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import favoritesMapper from '@univision/fe-commons/dist/store/slices/user/favoritesMapper';
import { favoriteDataSelector } from '@univision/fe-commons/dist/store/selectors/favorite-selectors';
import * as reactionsActions from '@univision/fe-commons/dist/store/slices/reactions/reactions-slice';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import {
  SQUARE,
} from '@univision/fe-commons/dist/constants/cardTypes';
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
 * Modify the cardData to attach it some metadata
 * @param {Object} args arguments
 * @property {Object} args.cardData data to modify
 * @property {Object} args.favorite user personalized data associated to an specific widget position
 * @property {Object} args.cardIndex position personalized inside a widget
 * @property {Object} args.widgetContext from widget data
 * @returns {Object}
 */
const modifiyCardContent = ({
  cardData,
  favorite,
  cardIndex,
  widgetContext,
}) => {
  if (!isValidObject(cardData)) return {};

  let modifiedCardContent = attachCardTypeMetaData({ ...cardData, widgetContext }, SQUARE);

  if (
        favorite?.status === SUCCESS
        && favorite?.enabled) {
    modifiedCardContent = setAsPersonalizedContent(modifiedCardContent);
  }

  modifiedCardContent.isInlineVideo = cardIndex === 0
      && modifiedCardContent?.type === contentTypes.VIDEO;

  return modifiedCardContent;
};

/**
 * Personalized Card Content
 * @param {number} cardIndex index of the card inside the widget
 * @param {string} personalizationType one of the valid personalization types
 * @param {Function} WrappedComponent card component for the non personalized data
 * @returns {React.Component}
 */
export default function (cardIndex, personalizationType, WrappedComponent) {
  /**
   * HOC to render a card component with personalized content
   * @param {Object} props of component
   * @returns {React.Component}
   */
  const PersonalizedWidgetContent = (props) => {
    const {
      cardData = {},
      favorite,
      fetchReactions,
      type,
      widgetContext,
      ...restProps
    } = props;

    useEffect(() => {
      if (cardIndex === 0 && cardData?.uid) {
        fetchReactions({ contentIds: [cardData?.uid] });
      }
    }, [fetchReactions, cardData]);
    const newCardContent = useMemo(() => {
      return modifiyCardContent({
        cardData,
        favorite,
        cardIndex,
        widgetContext,
      });
    }, [cardData, favorite, widgetContext]);

    return (
      <WrappedComponent
        {...restProps}
        type={type}
        {...newCardContent}
        status={favorite?.status}
      />
    );
  };

  PersonalizedWidgetContent.propTypes = {
    cardData: PropTypes.object,
    favorite: PropTypes.shape({
      status: PropTypes.oneOf([SUCCESS, LOADING, ERROR]),
      enabled: PropTypes.bool,
    }),
    fetchReactions: PropTypes.func,
    type: PropTypes.oneOf(Object.values(contentTypes)),
    widgetContext: PropTypes.object,
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
}
