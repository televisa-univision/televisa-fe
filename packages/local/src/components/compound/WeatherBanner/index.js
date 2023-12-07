import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  BANNER_FLAVOR_LANDING_PAGE,
  BANNER_FLAVOR_MODAL,
  BANNER_FLAVOR_OPENING_CARD,
  BANNER_RISK_HIGH,
  BANNER_RISK_LOW,
} from '@univision/fe-commons/dist/constants/weather';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { BLACK, WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import { isValidObject, toRelativeUrl } from '@univision/fe-commons/dist/utils/helpers';
import TrackWeather from '@univision/fe-commons/dist/utils/tracking/tealium/weather/WeatherTracker';
import Link from '@univision/fe-components-base/dist/components/Link';

import trackObjectBuilder, { MODAL, WIDGET, TIEMPO } from './utils';

import Styles from './WeatherBanner.styles';

const Alerts = styled.span`${Styles.alerts}`;
const ArrowRight = styled(Icon)
  .attrs({
    name: 'arrowRight',
    size: 16,
  })`${Styles.arrowRight}`;
const CTA = styled.span
  .attrs({ className: 'uvs-font-c-regular' })`${Styles.cta}`;
const Event = styled.span
  .attrs({ className: 'uvs-font-a-regular' })`${Styles.event}`;
const EventLocation = styled.span`${Styles.eventLocation}`;
const EventText = styled.span`${Styles.eventText}`;
const SeeMore = styled.span`${Styles.seeMore}`;
const TotalAlerts = styled.span`${Styles.totalAlerts}`;
const WarningIcon = styled(Icon)
  .attrs({
    name: 'infoCircle',
  })`${Styles.icon}`;
const Wrapper = styled(Link)
  .attrs({ className: 'uvs-font-c-bold' })`${Styles.wrapper}`;

/**
 * Renders the Weather Banner, per flavor
 * @param {Object} props - All props object for this component
 * @param {string} [props.className] - Optional class name for additional styling
 * @param {Object} props.analitycsType - Tracking data type
 * @param {Object} props.extremeAlert - weather alert with extreme severity
 * @param {number} props.totalCount - Is the total active alerts
 * @param {number} props.widgetPos - widget position
 * @param {string} props.cardId - Id for the card with the WeatherBanner
 * @param {string} props.flavor - Type of banner
 * @param {string} props.uri - URL to redirect the user on click
 * @returns {JSX}
 */
const WeatherBanner = ({
  cardId,
  className,
  extremeAlert,
  flavor,
  totalCount,
  analyticsType,
  uri,
  widgetPos,
}) => {
  const onClickBanner = useCallback(() => {
    TrackWeather.track(
      TrackWeather.events.bannerClick,
      trackObjectBuilder({
        type: analyticsType,
        id: cardId,
        widgetPos,
        extremeAlert,
      })
    );
  }, [analyticsType, cardId, widgetPos, extremeAlert]);
  if (!totalCount) return null;

  const isHighRisk = isValidObject(extremeAlert);
  const risk = isHighRisk ? BANNER_RISK_HIGH : BANNER_RISK_LOW;
  const url = toRelativeUrl(uri);

  return (
    <Wrapper
      className={className}
      flavor={flavor}
      href={url}
      onClick={onClickBanner}
      risk={risk}
    >
      {risk === BANNER_RISK_LOW && (
        <Alerts flavor={flavor}>
          <TotalAlerts>{totalCount}</TotalAlerts>
          {LocalizationManager.get(
            'weatherAlerts',
            { locals: { singularPlural: totalCount > 1 ? 's' : '' } },
          )}
        </Alerts>
      )}
      {isHighRisk && (
        <Event>
          <WarningIcon fill={WHITE} />
          <EventText>{extremeAlert.eventDescription}</EventText>
          <EventLocation>{extremeAlert.areaName}</EventLocation>
        </Event>
      )}

      <CTA>
        {risk === BANNER_RISK_LOW && (
          <SeeMore flavor={flavor}>{LocalizationManager.get('seeMore')}</SeeMore>
        )}
        <ArrowRight fill={risk === BANNER_RISK_LOW ? BLACK : WHITE} flavor={flavor} risk={risk} />
      </CTA>
    </Wrapper>
  );
};

WeatherBanner.propTypes = {
  className: PropTypes.string,
  cardId: PropTypes.string,
  extremeAlert: PropTypes.object,
  flavor: PropTypes.oneOf([
    BANNER_FLAVOR_LANDING_PAGE,
    BANNER_FLAVOR_MODAL,
    BANNER_FLAVOR_OPENING_CARD,
  ]),
  totalCount: PropTypes.number,
  analyticsType: PropTypes.oneOf([
    MODAL,
    TIEMPO,
    WIDGET,
  ]),
  uri: PropTypes.string,
  widgetPos: PropTypes.number,
};

WeatherBanner.defaultProps = {
  flavor: BANNER_FLAVOR_OPENING_CARD,
};

export default WeatherBanner;
