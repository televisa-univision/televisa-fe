import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import {
  getKey,
  isValidArray,
  isValidObject,
} from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { SQUARE } from '@univision/fe-commons/dist/constants/cardTypes';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import { JOB_LISTING } from '@univision/fe-commons/dist/constants/articleTypes';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import { hasAdSkinSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';

import Carousel from '../../Carousel';
import { attachCardTypeMetaData } from '../../cards/helpers';

import CardCarouselArrow from '../../CardCarouselArrow';
import LocalBar from './LocalBar';
import Styles from './CardsCarousel.styles';
import LegacyStyles from './CardsCarousel.scss';
import Link from '../../Link';
import CardsCta from '../../CardsCta';

const Title = styled.div.attrs({
  className: 'uvs-font-a-black',
})`${Styles.title}`;
const TitleBar = styled.div`${Styles.titleBar}`;
const TitleWrapper = styled.div`${Styles.titleWrapper}`;
const DarkContainer = styled.div`${Styles.darkContainer}`;

/**
 * CardsCarousel component
 * @param {Object} props - component props
 * @param {Array} props.cardData - card data
 * @param {Object} props.commonRootSection - root section info
 * @param {string} props.localMarket - local market call
 * @param {Object} props.settings - widget settings
 * @param {Object} props.theme - theme settings
 * @param {Object} props.widgetContext - context settings
 * @returns {JSX}
 */
const CardsCarousel = ({
  cardData,
  hasAdSkin,
  localMarket,
  settings,
  theme,
  widgetContext,
}) => {
  const hasJobRelatedContent = getKey(cardData, '[0][1].articleType', '') === JOB_LISTING;
  const seeMoreBtnContent = hasJobRelatedContent ? localization.get('seeMoreOffers') : localization.get('seeMore');
  const { isDark } = theme;
  const arrowTracking = useCallback(() => {
    CardTracker.onClickHandler(
      { title: '', uid: '' },
      widgetContext,
      'nav_arrow'
    )();
  }, [widgetContext]);

  const seeMoreTracking = useCallback(() => {
    CardTracker.onClickHandler(
      { title: '', uid: '' },
      widgetContext,
      'ver_mas'
    )();
  }, [widgetContext]);

  const trackMarketTitle = useCallback((eventTitle) => {
    CardTracker.onClickHandler(
      { title: '', uid: '' },
      widgetContext,
      eventTitle
    )();
  }, [widgetContext]);

  const trackLocalWeatherWidget = useCallback((eventAction) => {
    const eventData = {
      eventAction,
    };
    NavigationTracker.track(NavigationTracker.events.click, eventData);
  }, []);

  const variant = isDark ? 'dark' : 'light';

  const title = getKey(settings, 'title');
  const titleLink = getKey(settings, 'titleLink.href', '');
  const titleColor = isDark ? WHITE : theme.primary;
  const titleOptions = useMemo(() => (
    localMarket ? (
      <LocalBar
        localMarket={localMarket}
        trackMarketTitle={trackMarketTitle}
        trackLocalWeatherWidget={trackLocalWeatherWidget}
      />
    ) : (
      <Title color={titleColor} onClick={() => trackMarketTitle('title')}>
        <Link href={titleLink}>{title}</Link>
      </Title>
    )
  ), [
    title,
    titleColor,
    localMarket,
    titleLink,
    trackMarketTitle,
    trackLocalWeatherWidget,
  ]);
  const renderCard = useMemo(() => isValidArray(cardData) && cardData.map(
    (data, index) => {
      if (!isValidArray(data)) return null;

      const [CardComponent] = data;
      let [, cardContent = {}] = data;
      cardContent = attachCardTypeMetaData(cardContent, SQUARE);
      const { widgetContext: cardWidgetContext } = cardContent;

      return CardComponent && (
        <CardComponent
          {...cardContent}
          hasAdSkin={hasAdSkin}
          isDark={isDark}
          type={SQUARE}
          widgetContext={{ ...widgetContext, ...cardWidgetContext }}
          key={getKey(cardContent, 'uid', `CardContainer${index}`)}
        />
      );
    }
  ).filter(card => card), [cardData, hasAdSkin, isDark, widgetContext]);

  if (!isValidArray(renderCard) && !localMarket) return null;

  const seeMoreLink = getKey(settings, 'seeMoreLink');
  const LeftArrow = <CardCarouselArrow variant={variant} />;
  const RightArrow = <CardCarouselArrow direction="right" variant={variant} />;

  return (
    <ThemeProvider theme={theme}>
      <div className={`row ${LegacyStyles.row} ${isDark
        ? LegacyStyles.dark
        : ''}`}
      >
        {isDark && <DarkContainer hasAdSkin={hasAdSkin} />}
        <div className="col-12">
          <TitleBar />
          <TitleWrapper>
            {titleOptions}
          </TitleWrapper>
          <Carousel
            className={LegacyStyles.carousel}
            componentClass={LegacyStyles.item}
            itemsToBeDisplayed={{ xs: 1, sm: 2 }}
            itemsToBeDisplayedDefault={3}
            leftArrow={LeftArrow}
            leftArrowClassName={LegacyStyles.leftArrow}
            maskWrapper={LegacyStyles.mask}
            nextAction={arrowTracking}
            prevAction={arrowTracking}
            rightArrow={RightArrow}
            rightArrowClassName={LegacyStyles.rightArrow}
            separator={{ xs: 8 }}
            separatorDefaultValue={16}
            isSnap
          >
            {renderCard}
          </Carousel>
          {isValidObject(seeMoreLink) && (
            <CardsCta
              seeMoreLink={seeMoreLink}
              label={seeMoreBtnContent}
              onClick={seeMoreTracking}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

CardsCarousel.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.array),
  hasAdSkin: PropTypes.bool,
  isDark: PropTypes.bool,
  localMarket: PropTypes.string,
  settings: PropTypes.object,
  theme: PropTypes.object,
  widgetContext: PropTypes.object,
};

CardsCarousel.defaultProps = {
  hasAdSkin: false,
  theme: {},
};

/**
 * Maps redux state to component props.
 * @param {Object} state redux state
 * @returns {Object}
 */
const mapStateToProps = state => ({
  hasAdSkin: hasAdSkinSelector(state),
});

export default connect(mapStateToProps)(CardsCarousel);
