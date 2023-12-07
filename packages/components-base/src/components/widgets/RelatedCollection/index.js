import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import { VERTICAL } from '@univision/fe-commons/dist/constants/layoutTypes';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import { useBreakPoint } from '@univision/fe-commons/dist/utils/hooks';
import { getThemeFromVertical } from '@univision/fe-commons/dist/components/ThemeProvider/helpers';
import RELATED_COLLECTION_BODY_DEPTH from '@univision/fe-commons/dist/constants/recirculation';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import features from '@univision/fe-commons/dist/config/features';

import Link from '../../Link';
import ListCard from '../../cards/SquareCards/ListCard';
import Carousel from '../../Carousel';
import LegacyStyles from './RelatedCollection.scss';
import CardCarouselArrow from '../../CardCarouselArrow';
import Styles from './RelatedCollection.styles';

const Cards = styled.div`${Styles.cards}`;
const CardsWrapper = styled.div`${Styles.cardsWrapper}`;
const Title = styled.h3`${Styles.title}`;
const TitleLink = styled(Link)`${Styles.titleLink}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Related Collection widget
 * @param {Object} props - component props
 * @param {Array} props.contents - cards content
 * @param {Array} props.device - current device
 * @param {Array} props.hierarchy - section hierarchy
 * @param {string} props.title - enhancement title
 * @param {Object} props.titleLink - title link settings
 * @param {string} props.uid - enhancement uid
 * @param {string} props.uri - article uri
 * @returns {?JSX}
 */
const RelatedCollection = ({
  contents,
  device,
  hierarchy,
  title,
  titleLink,
  uid,
  uri,
  type,
}) => {
  const breakPoint = useBreakPoint();
  const isDesktop = device === 'desktop';
  const isRelatedCollection = type === 'relatedcollection';
  const hasCustomSize = device !== 'mobile' && contents && contents.length < 5;
  const widgetContext = {
    id: uid,
    isActionBarEnabled: true,
    cardTypeOverride: 'ListCard',
    name: 'Related Collection',
    position: `${RELATED_COLLECTION_BODY_DEPTH}%`,
    title,
    type: 'card',
    widgetType: 'recirculation',
  };
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const anchorTheme = getThemeFromVertical(hierarchy[0]?.uri || uri);
  const titleOption = !title ? null : (
    <Title isWorldCupMVP={isWorldCupMVP}>
      <TitleLink
        checkUserLocation
        href={titleLink?.href}
        target={titleLink?.target}
        theme={anchorTheme}
        isWorldCupMVP={isWorldCupMVP}
      >
        {title}
      </TitleLink>
    </Title>
  );

  const listCards = !isValidArray(contents) ? null : contents.map((card) => {
    const cardThemeData = isValidArray(card?.hierarchy) ? card.hierarchy[0]?.uri : card?.uri;
    const cardTheme = getThemeFromVertical(cardThemeData);
    const cards = (
      <ListCard
        {...card}
        layout={VERTICAL}
        key={card.uid}
        widgetContext={widgetContext}
        hasCustomSize={hasCustomSize}
        theme={cardTheme}
        isRelatedCollection={isRelatedCollection}
      />
    );

    return hasCustomSize ? <Cards>{cards}</Cards> : cards;
  });

  const arrowTracking = useCallback(CardTracker.onClickHandler({
    title: '', uid: '',
  }, widgetContext, 'nav_arrow'), [widgetContext]);
  const LeftArrow = <CardCarouselArrow iconSize={26} />;
  const RightArrow = <CardCarouselArrow iconSize={26} direction="right" />;

  if (!listCards) return null;

  return (
    <ErrorBoundary>
      <Wrapper>
        {titleOption}
        {hasCustomSize
          ? <CardsWrapper>{listCards}</CardsWrapper>
          : (
            <Carousel
              className={LegacyStyles.carousel}
              componentClass={LegacyStyles.item}
              itemsToBeDisplayed={{
                xs: 2, sm: 4, md: 4, lg: 5, xl: 5,
              }}
              leftArrow={LeftArrow}
              leftArrowClassName={LegacyStyles.leftArrow}
              maskWrapper={LegacyStyles.mask}
              nextAction={arrowTracking}
              prevAction={arrowTracking}
              rightArrow={RightArrow}
              rightArrowClassName={LegacyStyles.rightArrow}
              separator={{ xs: 8 }}
              separatorDefaultValue={8}
              partialShowing={breakPoint === 'md' && isDesktop}
              forceArrows={isDesktop}
              isSnap
            >
              {listCards}
            </Carousel>
          )}
      </Wrapper>
    </ErrorBoundary>
  );
};

RelatedCollection.propTypes = {
  contents: PropTypes.array,
  device: PropTypes.string,
  hierarchy: PropTypes.array,
  title: PropTypes.string,
  titleLink: PropTypes.shape({
    href: PropTypes.string,
    target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
    text: PropTypes.string,
    uid: PropTypes.string,
  }),
  uid: PropTypes.string,
  uri: PropTypes.string,
  type: PropTypes.string,
};

RelatedCollection.defaultProps = {
  contents: [],
  hierarchy: [],
};

export default memo(RelatedCollection);
