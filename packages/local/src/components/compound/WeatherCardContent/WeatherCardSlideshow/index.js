import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LANDSCAPE } from '@univision/fe-commons/dist/constants/cardTypes';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import Picture from '@univision/fe-components-base/dist/components/Picture';
import Link from '@univision/fe-components-base/dist/components/Link';
import Icon from '@univision/fe-icons/dist/components/Icon';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';

import Styles from './WeatherCardSlideshow.styles';

const Background = styled(Picture)`${Styles.background}`;
const BackgroundOverlay = styled.div`${Styles.backgroundOverlay}`;
const Cta = styled(Link)`${Styles.cta}`;
const SlideCount = styled(Link).attrs({
  className: 'uvs-font-c-regular',
})`${Styles.slideCount}`;
const SlideshowIcon = styled(Icon)`${Styles.slideshowIcon}`;
const Title = styled(Link).attrs({
  className: 'uvs-font-b-bold',
})`${Styles.title}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Renders a slide show component for the weather card widget
 * @param {Object} props All props object for this component
 * @param {string} props.className Optional class name for additional styling
 * @param {Object} image Default background image for the slide show
 * @param {number} slideCount Total images contained in this slide show
 * @param {string} title Title of the slide show
 * @param {string} uid content id
 * @param {string} uri Landing page for this slide show to be displayed in full
 * @param {Object} props.widgetContext - widget context settings
 * @returns {JSX}
 */
const WeatherCardSlideshow = ({
  className,
  image,
  slideCount,
  title,
  uid,
  uri,
  widgetContext,
}) => {
  const trackGraphicsContent = useCallback(() => {
    CardTracker.onClickHandler(
      { title: 'mapas y radar', uid },
      {
        ...widgetContext,
        metaData: {
          ...widgetContext?.metaData,
          cardName: 'LocalWeatherForecast - portrait XL',
          cardType: 'graficos',
        },
      },
      'content'
    )();
  }, [widgetContext, uid]);

  return (
    <Wrapper className={className}>
      <Cta href={uri} useExplicitNavigation onClick={trackGraphicsContent} />
      <Background image={image} type={LANDSCAPE} />
      <BackgroundOverlay />
      <Title href={uri} useExplicitNavigation onClick={trackGraphicsContent}>
        {title}
      </Title>
      <SlideCount href={uri} useExplicitNavigation onClick={trackGraphicsContent}>
        <SlideshowIcon fill={WHITE} name="slideshow" size="xxsmall" />
        {slideCount} {LocalizationManager.get('photos')}
      </SlideCount>
    </Wrapper>
  );
};

WeatherCardSlideshow.propTypes = {
  className: PropTypes.string,
  image: PropTypes.object.isRequired,
  slideCount: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  widgetContext: PropTypes.object,
};

export default WeatherCardSlideshow;
