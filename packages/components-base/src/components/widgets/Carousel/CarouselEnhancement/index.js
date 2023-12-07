import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';

import {
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { SQUARE } from '@univision/fe-commons/dist/constants/cardTypes';
import { SPRING_GREEN, TROPICAL_RAIN_FOREST } from '@univision/fe-utilities/styled/constants';
import { JOB_LISTING } from '@univision/fe-commons/dist/constants/articleTypes';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import { breakpointSelector, hasAdSkinSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import Button from '@univision/shared-components/dist/components/v3/Button';
import features from '@univision/fe-commons/dist/config/features';

import CarouselComponent from '../../../Carousel';
import { attachSquareCardMetaData } from '../../../cards/helpers';
import CardCarouselArrow from '../../../CardCarouselArrow';
import FullWidth from '../../../FullWidth';
import WidgetTitle from '../../WidgetTitle';
import Link from '../../../Link';
import SquareCard, { validSquareTypes } from '../../../cards/SquareCards/SquareCard';

import LocalBar from './LocalBar';
import Styles from './CarouselEnhancement.styles';

const PARTIAL_SHOWING_VALUES = {
  sm: 0.3,
  md: 0.5,
  lg: 0.2,
  xl: 0.2,
};

const TitleBar = styled.div`${Styles.titleBar}`;
const TitleWrapper = styled.div`
  ${Styles.titleWrapper}
`;
const DarkContainer = styled.div`
  ${Styles.darkContainer}
`;
const CardWrapper = styled.div`
  ${Styles.cardWrapper}
`;
const ButtonWrapperStyled = styled.div`
  ${Styles.buttonWrapper}
`;
const FullWidthStyled = styled(FullWidth)`
  ${Styles.fullWidth}
`;
const CarouselStyled = styled(CarouselComponent)`
  ${Styles.carousel}
`;
const LinkStyled = styled(Link)`
  ${Styles.linkStyled}
`;
/**
 * Get cards content component
 * @param {Array} content - the widgets content
 * @params {Object} cardData - data to cards props
 * @param {Array} cardData.hasAdSkin - if page has ad skin present
 * @param {bool} cardData.isDark - true if in dark mode
 * @param {Object} cardData.widgetContext - the widgets context
 * @param {string} cardData.cardSize - the card size
 * @param {Object} cardData.theme - the page theme definition
 * @returns {Array<JSX>}
 */
function getCardsContent(content, {
  hasAdSkin,
  isDark,
  widgetContext,
  cardSize,
  theme,
}) {
  return isValidArray(content) && content.map(
    (data, index) => {
      let cardContent = data;
      // filter out invalid card types to avoid empty spaces in carousel
      if (!validSquareTypes.includes(cardContent.type)) return null;

      cardContent = attachSquareCardMetaData(cardContent, SQUARE);
      const { widgetContext: cardWidgetContext } = cardContent;

      return (
        <CardWrapper key={getKey(cardContent, 'uid', `CardContainer${index}`)}>
          <SquareCard
            {...cardContent}
            hasAdSkin={hasAdSkin}
            isDark={isDark}
            widgetContext={{ ...widgetContext, ...cardWidgetContext }}
            size={cardSize}
            theme={theme}
            isSecondaryContent
          />
        </CardWrapper>
      );
    }
  ).filter(card => card);
}

/**
 * Tracking local weather
 * @param {string} eventAction - action name to track
 */
function trackLocalWeatherWidget(eventAction) {
  const eventData = {
    eventAction,
  };
  NavigationTracker.track(NavigationTracker.events.click, eventData);
}

/**
 * Get title component variant
 * @param {string} title - title text value
 * @param {Object} titleData - data for title component
 * @returns {JSX}
 */
function getTitleOptions(title, {
  localMarket,
  isWorldCupMVP,
  onClickTitleHandler,
  titleLink,
  trackMarketTitle,
}) {
  return localMarket ? (
    <LocalBar
      localMarket={localMarket}
      trackMarketTitle={trackMarketTitle}
      trackLocalWeatherWidget={trackLocalWeatherWidget}
    />
  ) : (
    <WidgetTitle
      titleLink={titleLink}
      onClickTitleHandler={onClickTitleHandler}
      title={title}
      isTitleCase={isWorldCupMVP}
    />
  );
}

/**
 * Carousel Widget
 * @param {Object} props - component props
 * @param {string} props.breakpoint - current breakpoint
 * @param {Array} props.content - card data
 * @param {string} props.device - current device
 * @param {string} props.localMarket - local market call
 * @param {Object} props.settings - widget settings
 * @param {Object} props.theme - widget theme object
 * @param {Object} props.widgetContext - context settings
 * @returns {JSX}
 */
const CarouselEnhancement = ({
  content,
  device,
  breakpoint,
  hasAdSkin,
  localMarket,
  settings,
  theme,
  widgetContext,
}) => {
  const seeMoreLink = settings?.seeMoreLink;
  const hasJobRelatedContent = getKey(content, '[0].articleType', '') === JOB_LISTING;
  const seeMoreBtnContent = hasJobRelatedContent ? localization.get('seeMoreOffers') : localization.get('seeMore');
  const partialValue = hasAdSkin ? 0.5 : PARTIAL_SHOWING_VALUES[breakpoint];
  const cardSize = device === 'mobile' || breakpoint === 'sm' ? SMALL : MEDIUM;
  const isDark = theme?.isDark || false;
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const variant = isDark ? 'dark' : 'light';
  const buttonType = isDark ? 'containedTextIcon' : 'containedText';
  const title = settings?.title;
  const titleLink = getKey(settings, 'titleLink.href', '');
  const showSeeMore = isValidObject(seeMoreLink);
  const enhancedWidgetContext = Object.assign(
    {},
    widgetContext,
    { name: `${widgetContext?.name}2` }
  );

  /**
   * change gradient for button only flag MVP
   */
  const widgetTheme = {
    ...theme,
    ...(isWorldCupMVP && {
      gradient: { end: SPRING_GREEN, start: SPRING_GREEN },
    }),
  };

  /**
   * Tracking arrow click
   */
  const arrowTracking = useCallback(CardTracker.onClickHandler(
    { title: '', uid: '' },
    enhancedWidgetContext,
    'nav_arrow'
  ), [enhancedWidgetContext]);

  /**
   * Tracking see more
   */
  const seeMoreTracking = useCallback(CardTracker.onClickHandler(
    { title: '', uid: '' },
    enhancedWidgetContext,
    'ver_mas'
  ), [enhancedWidgetContext]);

  /**
   * Track click title
   * @param {string} eventTitle - title track event
   */
  const trackClickTitle = useCallback((eventTitle) => {
    CardTracker.onClickHandler(
      { title: '', uid: '' },
      enhancedWidgetContext,
      eventTitle
    )();
  }, [enhancedWidgetContext]);

  /**
   * Handler for on click event in title
   * @param {string} eventTitle - title track event
   */
  const onClickTitleHandler = () => {
    trackClickTitle('title');
  };

  // Get Additional components
  const titleOptions = getTitleOptions(title, {
    localMarket,
    isWorldCupMVP,
    onClickTitleHandler,
    titleLink,
    trackMarketTitle: trackClickTitle,
  });
  const renderCards = getCardsContent(content, {
    hasAdSkin,
    isDark,
    cardSize,
    theme: widgetTheme,
    widgetContext: enhancedWidgetContext,
  });

  if (!isValidArray(renderCards) && !localMarket) return null;

  return (
    <ThemeProvider theme={widgetTheme}>
      <FullWidthStyled breakpoints={['xs', 'xxs']} isDark={isDark}>
        {isDark && <DarkContainer hasAdSkin={hasAdSkin} />}
        <div>
          {localMarket && <TitleBar />}
          <TitleWrapper localMarket={localMarket}>
            {titleOptions}
          </TitleWrapper>
          <CarouselStyled
            itemsToBeDisplayed={{
              xs: 1, sm: 2, md: 2, lg: 3, xl: 3,
            }}
            itemsToBeDisplayedDefault={hasAdSkin ? 2 : 3}
            leftArrow={<CardCarouselArrow variant={variant} />}
            leftArrowClassName="arrowLeft"
            nextAction={arrowTracking}
            prevAction={arrowTracking}
            rightArrow={<CardCarouselArrow direction="right" variant={variant} />}
            rightArrowClassName="arrowRight"
            separator={{ xs: 8 }}
            separatorDefaultValue={16}
            mobilePeek={0}
            mobilePeekPercentage={20}
            disableLazyLoad={cardSize === SMALL}
            partialShowing
            partialShowingValue={partialValue}
            isSnap
            snapToStart
          >
            {renderCards}
          </CarouselStyled>
          {showSeeMore && (
            <ButtonWrapperStyled isWorldCupMvp={isWorldCupMVP}>
              <LinkStyled
                useExplicitNavigation
                {...seeMoreLink}
              >
                <Button
                  onPress={seeMoreTracking}
                  type={buttonType}
                  isOutlined={isDark}
                  useIcon={false}
                  theme={widgetTheme}
                >
                  {seeMoreBtnContent}
                </Button>
              </LinkStyled>
            </ButtonWrapperStyled>
          )}
        </div>
      </FullWidthStyled>
    </ThemeProvider>
  );
};

CarouselEnhancement.propTypes = {
  breakpoint: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.object),
  commonRootSection: PropTypes.object,
  device: PropTypes.string,
  hasAdSkin: PropTypes.bool,
  isDark: PropTypes.bool,
  localMarket: PropTypes.string,
  settings: PropTypes.object,
  theme: PropTypes.object,
  widgetContext: PropTypes.object,
};

CarouselEnhancement.defaultProps = {
  hasAdSkin: false,
  theme: {
    primary: TROPICAL_RAIN_FOREST,
  },
  widgetContext: {},
};

/**
 * Maps redux state to component props.
 * @param {Object} state redux state
 * @returns {Object}
 */
const mapStateToProps = state => ({
  breakpoint: breakpointSelector(state)?.size,
  hasAdSkin: hasAdSkinSelector(state),
});

export default connect(mapStateToProps)(CarouselEnhancement);
