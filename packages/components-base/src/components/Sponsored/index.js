import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { SPONSOR_AD } from '@univision/fe-commons/dist/utils/ads/ad-types';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import { timeBannerSelector } from '@univision/fe-commons/dist/store/selectors/ads-selectors';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import Styles from './Sponsored.styles';

const SponsoredByMessage = styled.div.attrs({
  className: 'msg',
})`${Styles.sponsoredBy}`;

/**
 * SponsoredBy component
 * @param {Object} props - component props
 * @param {string} props.className - modifier class
 * @param {boolean} props.isOpeningWeatherForecast - is opening weather forecast
 * @param {boolean} props.isWeatherCard - is a Weather Card
 * @param {string} props.message - custom sponsored by message
 * @param {string} props.type - Weather Card type eg:square, rectangle
 * @returns {JSX}
 */
const SponsoredBy = ({
  className,
  isOpeningWeatherForecast,
  isWeatherCard,
  message,
  type,
}) => {
  const isTimeBanner = useSelector(timeBannerSelector);
  const [showAdLabel, setShowAdLabel] = useState(false);

  /**
   * onSlotRenderEndedEvent
   * @param {Object} event event
   */
  const onSlotRenderEndedEvent = (event) => {
    setShowAdLabel(!event.isEmpty);
  };

  const adElement = React.useMemo(() => adHelper.getAd(SPONSOR_AD, {
    isLazyLoaded: false,
    onSlotRenderEnded: onSlotRenderEndedEvent,
  }), []);

  return (
    <div className={className}>
      {(showAdLabel || isTimeBanner?.length) && (
        <SponsoredByMessage
          type={type}
          isWeatherCard={isWeatherCard}
          isOpeningWeatherForecast={isOpeningWeatherForecast}
        >
          {message}
        </SponsoredByMessage>
      )}
      {adElement}
    </div>
  );
};

SponsoredBy.propTypes = {
  className: PropTypes.string,
  isOpeningWeatherForecast: PropTypes.bool,
  isWeatherCard: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.string,
};

SponsoredBy.defaultProps = {
  message: localization.get('sponsoredBy'),
};

export default SponsoredBy;
