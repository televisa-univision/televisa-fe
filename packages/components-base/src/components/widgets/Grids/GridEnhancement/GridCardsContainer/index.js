import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  SQUARE,
} from '@univision/fe-commons/dist/constants/cardTypes';

import {
  attachSquareCardMetaData,
} from '../../../../cards/helpers';
import GridCard from '../GridCard';

import Styles from './GridCardsContainer.styles';

const Cards = styled.div`
  ${Styles.cards}
`;
const ListGridStyled = styled.div`
  ${Styles.listGrid}
`;

/**
 * Check if should re-render the component based on props changes
 * @param {Object} prevProps - react previous props component
 * @param {Object} nextProps - react new props component
 * @returns {boolean}
 */
function areEqualProps(prevProps, nextProps) {
  return prevProps?.content === nextProps?.content;
}

/**
 * Get grid cards component
 * @param {Array} content - the widgets content
 * @params {Object} cardData - data to cards props
 * @param {string} breakpoint - the current breakpoint
 * @param {string} device - if page has ad skin present
 * @param {bool} isDark - true if in dark mode
 * @param {bool}  listGrid - true if list grid is active
 * @param {string} listTitle - the list title
 * @param {string} mainCardSize - the card size
 * @param {string} otherCardSize - the card size
 * @param {bool} shouldRenderAd - true if should render ad on mobile
 * @param {Object} theme - the page theme definition
 * @param {Object} widgetContext - the widgets context
 * @returns {Array<JSX>}
 */
function GridCardsContainer({
  content,
  breakpoint,
  device,
  isDark,
  listGrid,
  listTitle,
  mainCardSize,
  otherCardSize,
  shouldRenderAd,
  theme,
  widgetContext,
}) {
  const contentItems = content.slice(0, listGrid ? 7 : 5);
  const lastIndex = contentItems.length - 1;
  const gridCards = contentItems.map((card, idx) => {
    const isFirst = idx === 0;
    const isLast = idx === lastIndex;
    const cardContent = attachSquareCardMetaData(card, SQUARE);
    const key = cardContent.nativeAdKey || cardContent.uid;
    const cardWidgetContex = { ...widgetContext, ...cardContent.widgetContext };

    return (
      <GridCard
        key={key}
        cardContent={cardContent}
        cardPosition={idx}
        cardWidgetContext={cardWidgetContex}
        device={device}
        isDark={isDark}
        isFirst={isFirst}
        isLast={isLast}
        breakpoint={breakpoint}
        shouldRenderAd={shouldRenderAd}
        listGrid={listGrid}
        listTitle={listTitle}
        mainCardSize={mainCardSize}
        otherCardSize={otherCardSize}
        theme={theme}
      />
    );
  });

  return (
    <Cards listGrid={listGrid}>
      {listGrid ? (
        <>
          {gridCards.slice(0, 3)}
          <ListGridStyled>
            {gridCards.slice(3, 7)}
          </ListGridStyled>
        </>
      ) : gridCards}
    </Cards>
  );
}

GridCardsContainer.propTypes = {
  content: PropTypes.array,
  breakpoint: PropTypes.string,
  device: PropTypes.string,
  isDark: PropTypes.bool,
  listGrid: PropTypes.bool,
  listTitle: PropTypes.string,
  mainCardSize: PropTypes.string,
  otherCardSize: PropTypes.string,
  shouldRenderAd: PropTypes.bool,
  theme: PropTypes.object,
  widgetContext: PropTypes.object,
};

export default React.memo(GridCardsContainer, areEqualProps);
export { areEqualProps };
