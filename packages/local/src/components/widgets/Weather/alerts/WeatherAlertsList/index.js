import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Title from '@univision/fe-components-base/dist/components/Title';
import fetchGraphQL from '@univision/fe-commons/dist/utils/api/graphql';
import { getWeatherAlertsWithDescription } from '@univision/fe-graphql-services/dist/requests/queries/weatherAlertQueries';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import { WEATHER_ALERTS_ERROR } from '@univision/fe-commons/dist/constants/messages';
import marketCoordinates from '@univision/fe-commons/dist/constants/marketCoordinates.json';
import { currentMarketSelector } from '@univision/fe-commons/dist/store/selectors/local-selectors';
import { updateUnreadAlerts } from '@univision/fe-commons/dist/store/actions/local/local-actions';
import AlertList from '../../../../compound/AlertList';
import NoAlerts from './NoAlerts';
import Styles from './WeatherAlertsList.styles';
import { formatWeatherAlerts } from '../../../../../utils/helpers';
import SeverityLegend from './SeverityLegend';

export const Aside = styled.aside`${Styles.aside}`;
export const Header = styled.div`${Styles.header}`;
export const StickyAdWrapper = styled.div`${Styles.stickyAdWrapper}`;
export const WeatherAlertsWrapper = styled.div`${Styles.weatherAlertsWrapper}`;
export const WeatherTitle = styled(Title)`${Styles.weatherTitle}`;

/**
 * Renders weather alerts list.
 * @param {string} localMarketName localMarket name
 * @param {Object} page page information
 * @param {function} updateUnreadAlertsAction mark alerts as read in store
 * @returns {JSX}
 */
const WeatherAlertList = ({ page, localMarketName, updateUnreadAlertsAction }) => {
  const device = useSelector(deviceSelector);
  const isMobile = device === 'mobile';
  const [alerts, setAlerts] = useState(null);
  const localMarket = getKey(marketCoordinates, localMarketName, {});
  const serverUri = page?.config?.graphql;
  const areaIds = localMarket?.weatherAlertAreaIds;

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchGraphQL({
          query: getWeatherAlertsWithDescription,
          variables: { areaIds },
          serverUri,
        });
        const weatherAlerts = response?.getWeatherAlertsWithDescription?.alerts || [];
        updateUnreadAlertsAction(weatherAlerts);
        const groupedAlerts = formatWeatherAlerts(weatherAlerts);
        setAlerts(groupedAlerts);
      } catch (err) {
        err.message = `${WEATHER_ALERTS_ERROR} fetchReactions rejected: ${err.message}`;
        clientLogging(err);
      }
    })();
  }, [areaIds, updateUnreadAlertsAction, serverUri]);

  if (!alerts) return null;

  return (
    <div className="row">
      <WeatherAlertsWrapper className="col-12 col-md-8">
        <Header>
          <WeatherTitle element="h2">{localization.get('weatherAlerts', { locals: { singularPlural: 's' } })}</WeatherTitle>
          <SeverityLegend />
        </Header>
        {
          alerts.length > 0 ? alerts.map(item => (
            <AlertList
              {...item}
              key={item.county}
              localMarketName={localMarketName}
              serverUri={serverUri}
            />
          )) : <NoAlerts uri={localMarket.uri} />
        }
      </WeatherAlertsWrapper>
      {
        !isMobile && (
        <Aside className="col-md-4">
          <StickyAdWrapper>
            {adHelper.getAd(AdTypes.LIST_WIDGET_AD, { hasBg: false })}
          </StickyAdWrapper>
        </Aside>
        )
      }
    </div>
  );
};

WeatherAlertList.propTypes = {
  localMarketName: PropTypes.string,
  page: PropTypes.shape({
    config: PropTypes.shape({
      graphql: PropTypes.string,
    }),
  }),
  updateUnreadAlertsAction: PropTypes.func,
};

/**
 * Maps redux state to component props.
 * @param {Object} state redux state
 * @returns {Object}
 */
export const mapStateToProps = (state) => {
  return {
    localMarketName: currentMarketSelector(state),
    page: state.page,
  };
};

const mapDispatchToProps = {
  updateUnreadAlertsAction: updateUnreadAlerts,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherAlertList);
