import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import * as devices from '@univision/fe-commons/dist/constants/devices';
import {
  PORTRAIT,
  SQUARE,
} from '@univision/fe-commons/dist/constants/cardTypes';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import {
  attachCardTypeMetaData,
  attachSquareCardMetaData,
} from '@univision/fe-components-base/dist/components/cards/helpers';
import ListWrapper from '@univision/fe-components-base/dist/components/List';
import SquareCard from '@univision/fe-components-base/dist/components/cards/SquareCards/SquareCard';
import { LARGE } from '@univision/fe-commons/dist/constants/cardSizes';
import GridCard from '@univision/fe-components-base/dist/components/widgets/Grids/GridEnhancement/GridCard';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import features from '@univision/fe-commons/dist/config/features';
import WithNativeMarker from '@univision/fe-commons/dist/components/ads/dfp/Native/WithNativeMarker';
import isEqual from '@univision/fe-utilities/helpers/common/isEqual';

import WeatherCard from '../../connected/WeatherCard';
import Styles from './LocalOpening.styles';

const AdWrapper = styled.div`${Styles.adWrapper}`;
const LatestContentContainer = styled.article`${Styles.latestContentContainer}`;
const LeadCardContainer = styled.article`${Styles.leadCardContainer}`;
const WeatherCardContainer = styled.article`${Styles.weatherCardContainer}`;
const Wrapper = styled.section`${Styles.wrapper}`;

/**
 * Local Opening widget component
 * @param {!Object} props - Props for this widget
 * @param {array} props.cardData - Card data of the first content.
 * @param {array} props.content - Content of this widget
 * @param {Object} props.settings - Settings for this widget
 * @param {Object} props.theme - Theme of this widget
 * @param {Object} props.widgetContext - Context of this widget
 * @returns {JSX}
 */
const LocalOpening = ({
  cardData,
  content,
  settings,
  shouldInjectTopAd,
  theme,
  widgetContext,
}) => {
  const device = useSelector(deviceSelector);
  const hasEnhancement = features.content.hasEnhancement();

  // @TODO: Remove after the new SquareCard is deployed on Jan/2021
  //  and feature flag showEnhancement is removed
  const leadCardLegacy = useMemo(() => {
    if (!isValidArray(content) || hasEnhancement) return null;
    const cardType = device === devices.DESKTOP ? PORTRAIT : SQUARE;
    const [CardComponent] = cardData;
    let [, cardContent] = cardData;
    cardContent = attachCardTypeMetaData(cardContent, cardType);
    const { widgetContext: cardContext } = cardContent;

    return (
      <LeadCardContainer className="col-12 col-md-5">
        {
          // TODO: remove this legacy leadCard implementation
          /* istanbul ignore next */
          CardComponent && (
            <CardComponent
              {...cardContent}
              className="leadCard"
              isLeadCard
              theme={theme}
              type={cardType}
              widgetContext={
                {
                  ...cardContext,
                  metaData: {
                    ...cardContext?.metaData,
                    cardType: `${cardContext?.metaData?.cardType} - XL`,
                  },
                }
              }
            />
          )
        }
      </LeadCardContainer>
    );
  }, [
    cardData,
    content,
    device,
    hasEnhancement,
    theme,
  ]);

  // @TODO: Remove after the new SquareCard is deployed on Jan/2021
  //  and feature flag showEnhancement is removed
  const latestContentLegacy = useMemo(() => {
    if (!isValidArray(content) || hasEnhancement) return null;

    return (
      <LatestContentContainer className="col-12 col-md-4">
        <ListWrapper
          contentList={content?.slice(1)}
          title={settings?.title}
          widgetContext={widgetContext}
        />
      </LatestContentContainer>
    );
  }, [
    content,
    hasEnhancement,
    settings,
    widgetContext,
  ]);

  const leadCard = useMemo(() => {
    if (!isValidArray(content) || !hasEnhancement) return null;

    let [, cardContent] = cardData;
    cardContent = attachSquareCardMetaData(cardContent, SQUARE);

    return (
      <LeadCardContainer hasEnhancement={hasEnhancement}>
        <SquareCard
          {...cardContent}
          theme={theme}
          size={LARGE}
        />
      </LeadCardContainer>
    );
  }, [
    cardData,
    content,
    hasEnhancement,
    theme,
  ]);

  const latestContent = useMemo(() => {
    if (!isValidArray(content) || !hasEnhancement) return null;

    const contentItems = content.slice(1);
    const lastIndex = contentItems.length - 1;
    const latestContentCards = contentItems.map((card, idx) => {
      const isLast = idx === lastIndex;
      const cardContent = attachSquareCardMetaData(card, SQUARE);
      const key = cardContent.nativeAdKey || cardContent.uid;
      const cardWidgetContext = { ...widgetContext, ...cardContent.widgetContext };

      return (
        <GridCard
          cardContent={cardContent}
          cardPosition={idx + 3}
          cardWidgetContext={cardWidgetContext}
          device={device}
          isFirst={false}
          isLast={isLast}
          key={key}
          listGrid
          listTitle={settings?.title}
        />
      );
    });

    return (
      <LatestContentContainer hasEnhancement={hasEnhancement}>
        {latestContentCards}
      </LatestContentContainer>
    );
  }, [content, device, hasEnhancement, settings, widgetContext]);

  // @TODO: Remove the wrapperClass and weatherCardContainerClass and hasEnhancement props
  //  after the new SquareCard is deployed on Jan/2021
  //  and feature flag showEnhancement is removed
  const wrapperClass = !hasEnhancement ? 'row no-gutter ml-0 mr-0' : false;
  const weatherCardContainerClass = !hasEnhancement ? 'col-12 col-md-3' : false;

  return (
    <Wrapper className={wrapperClass} hasEnhancement={hasEnhancement}>
      {leadCard}
      {leadCardLegacy}
      {shouldInjectTopAd && (
        <AdWrapper>
          {adHelper.getAd(AdTypes.TOP_AD, { isLazyLoaded: false })}
        </AdWrapper>
      )}
      {latestContent}
      {latestContentLegacy}
      <WeatherCardContainer className={weatherCardContainerClass} hasEnhancement={hasEnhancement}>
        <WeatherCard
          slideshow={settings?.slideshow}
          video={settings?.video}
          widgetContext={widgetContext}
        />
      </WeatherCardContainer>
    </Wrapper>
  );
};

LocalOpening.propTypes = {
  cardData: PropTypes.array,
  content: PropTypes.array,
  settings: PropTypes.object,
  shouldInjectTopAd: PropTypes.bool,
  theme: PropTypes.object,
  widgetContext: PropTypes.object,
};

/**
 * Check if state props are equal
 * @param {Object} nextProps to be applied
 * @param {Object} prevProps to be applied
 * @returns {boolean}
 */
export const areStatePropsEqual = (
  nextProps,
  prevProps
) => isEqual(prevProps.content, nextProps.content);

/**
* Defines which content the native ad should replace when loaded
* Lastly, apply Native Ad Marker before export
*/
const nativeAdPosition = 5;

const LocalOpeningWithNative = WithNativeMarker(LocalOpening, 'content', nativeAdPosition);

export default React.memo(LocalOpeningWithNative, areStatePropsEqual);
