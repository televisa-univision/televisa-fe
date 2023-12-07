import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  ConnectedWithNativeContent,
} from '@univision/fe-commons/dist/components/ads/dfp/Native/WithNativeContent';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import truncateString from '@univision/fe-utilities/helpers/string/truncateString';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { getThemeFromVertical } from '@univision/fe-commons/dist/components/ThemeProvider/helpers';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import features from '@univision/fe-commons/dist/config/features';

import WithPersonalizedWidgetContent from '../../../../personalize/WithPersonalizedWidgetContent';
import SquareCard from '../../../../cards/SquareCards/SquareCard';
import ListCard from '../../../../cards/SquareCards/ListCard';
import WidgetTitle from '../../../WidgetTitle';
import DigitalChannelEPG from '../../../DigitalChannelEPG';

import Styles from './GridCard.styles';

const AdWrapper = styled.div`
  ${Styles.adWrapper}
`;
const Card = styled.div`
  ${Styles.card}
`;
const ListCardStyled = styled(ListCard)`
  ${Styles.listCard}
`;

/**
 * Check if should re-render the component based on props changes
 * @param {Object} prevProps - react previous props component
 * @param {Object} nextProps - react new props component
 * @returns {boolean}
 */
function areEqualProps(prevProps, nextProps) {
  return prevProps?.cardContent?.uid === nextProps?.cardContent?.uid
  && prevProps?.cardContent?.personalizationType === nextProps?.cardContent?.personalizationType;
}

/**
 * Grid cards wrapper component
 * @param {Object} cardsContent - the widget content data
 * @param {string} cardsContent.type - content type value
 * @params {number} cardPosition - index position of current card
 * @param {Object} cardWidgetContext - widget context for the cards
 * @param {string} device - page current device
 * @param {bool} isDark - true if it's dark mode
 * @param {bool} isFirst - true if it's the first card item
 * @param {bool} isLast - true if it's the last card item
 * @param {bool}  listGrid - true if list grid is active
 * @param {string} listTitle - the list main title
 * @param {string} mainCardSize - the card size for the first card
 * @param {string} otherCardSize - the card size for the other cards beside of first card
 * @param {bool} shouldRenderAd - true if should render ad
 * @param {Object} theme - the page theme definition
 * @returns {Array<JSX>}
 */
function GridCards({
  cardContent,
  cardPosition,
  cardWidgetContext,
  breakpoint,
  device,
  isDark,
  isFirst,
  isLast,
  listGrid,
  listTitle,
  mainCardSize,
  otherCardSize,
  shouldRenderAd,
  theme,
}) {
  const isInlineVideo = isFirst && cardContent?.type === contentTypes.VIDEO;
  const cardVertical = isValidArray(cardContent?.hierarchy)
    ? cardContent.hierarchy[0]?.uri
    : cardContent?.uri;
  const verticalTheme = getThemeFromVertical(cardVertical);
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  // Will fallback to widget theme if vertical theme is empty
  const cardTheme = isValidObject(verticalTheme)
    ? verticalTheme
    : theme;
  const cardProps = {
    theme: cardTheme,
    listGrid,
    isDark: cardTheme?.isDark,
    breakpoint,
    isInlineVideo,
    isSecondaryContent: !isFirst,
    isTextOnly: cardPosition > 2 && listGrid,
    size: isFirst ? mainCardSize : otherCardSize,
    widgetContext: cardWidgetContext,
    ...(cardContent?.isDigitalChannelLiveStream && {
      device,
      content: [cardContent],
      forceSingleWidget: true,
    }),
    device,
  };
  let WrappedComponent = cardContent?.isDigitalChannelLiveStream ? DigitalChannelEPG : SquareCard;

  if ((listGrid && cardPosition > 2) || (!isFirst && device === 'mobile')) {
    WrappedComponent = ListCardStyled;
  }

  const { personalizationType } = cardContent;
  if (personalizationType) {
    WrappedComponent = WithPersonalizedWidgetContent(
      cardPosition,
      personalizationType,
      WrappedComponent
    );
  }

  return (
    <>
      {
        (shouldRenderAd && cardPosition === 1) && (
          <AdWrapper>
            {adHelper.getAd(AdTypes.TOP_AD, { isLazyLoaded: false })}
          </AdWrapper>
        )
      }
      {listGrid && cardPosition === 3 && (
        <WidgetTitle
          isDark={isDark}
          listGrid={listGrid}
          title={truncateString(
            listTitle || localization.get('moreNews'),
            { maxChars: 20 }
          )}
          isTitleCase={isWorldCupMVP}
        />
      )}
      <Card
        grid={cardPosition}
      >
        {isLast ? (
          <ConnectedWithNativeContent
            {...cardContent}
            {...cardProps}
            actualDevice={device}
            adType={AdTypes.TRIPLELIFT_NATIVE_AD}
            onDevice={device}
            WrappedComponent={WrappedComponent}
          />
        ) : (
          <WrappedComponent
            {...cardContent}
            {...cardProps}
          />
        )}
      </Card>
    </>
  );
}

GridCards.propTypes = {
  cardContent: PropTypes.shape({
    uri: PropTypes.string,
    hierarchy: PropTypes.array,
    type: PropTypes.string,
    personalizationType: PropTypes.string,
    isDigitalChannelLiveStream: PropTypes.bool,
  }),
  cardPosition: PropTypes.number,
  cardWidgetContext: PropTypes.object,
  breakpoint: PropTypes.string,
  device: PropTypes.string,
  isDark: PropTypes.bool,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  listGrid: PropTypes.bool,
  listTitle: PropTypes.string,
  mainCardSize: PropTypes.string,
  otherCardSize: PropTypes.string,
  shouldRenderAd: PropTypes.bool,
  theme: PropTypes.object,
};

export default React.memo(GridCards, areEqualProps);
export { areEqualProps };
