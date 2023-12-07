import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { batch, useDispatch } from 'react-redux';

import { getKey, isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import marketCoordinates from '@univision/fe-commons/dist/constants/marketCoordinates.json';
import Icon from '@univision/fe-icons/dist/components/Icon';
import SelectMarket from '@univision/fe-local/dist/components/compound/SelectMarket';
import { setCurrentMarketByLocation, fetchLocalMarketContent } from '@univision/fe-commons/dist/store/actions/local/local-actions';

import WeatherConditionIcon from '../../Weather/WeatherConditionIcon';
import Styles from './LocalBar.styles';

const Bar = styled.div`${Styles.bar}`;
const MarketLogo = styled(Icon)`${Styles.marketLogo}`;
const MarketWeatherWrapper = styled.div`${Styles.marketWeatherWrapper}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * LocalBar Component
 * @param {Object} props - component props
 * @returns {JSX}
 */
const LocalBar = ({
  localMarket,
  trackMarketTitle,
  trackLocalWeatherWidget,
}) => {
  const { name, miniTulip: logo } = getKey(marketCoordinates, localMarket, {});
  const dispatch = useDispatch();
  const onMarketSelect = useCallback((obj) => {
    const { market } = obj;
    batch(() => {
      dispatch(setCurrentMarketByLocation(market, { disableStorage: true }));
      dispatch(fetchLocalMarketContent({ disableStorage: true }));
    });
    if (isValidFunction(trackMarketTitle)) trackMarketTitle('title_local_dropdown_select');
  }, [dispatch, trackMarketTitle]);
  const onChangeSelectMarket = useCallback(() => {
    if (isValidFunction(trackMarketTitle)) trackMarketTitle('title_local_dropdown');
  }, [trackMarketTitle]);

  return (
    <>
      <Wrapper>
        <Bar>
          <SelectMarket
            onChange={onChangeSelectMarket}
            onSelect={onMarketSelect}
            localMarket={localMarket}
          >
            {name}
          </SelectMarket>
        </Bar>
        <MarketWeatherWrapper>
          <WeatherConditionIcon localCarousel trackLocalWeatherWidget={trackLocalWeatherWidget} />
          <MarketLogo name={logo} size={38} />
        </MarketWeatherWrapper>
      </Wrapper>
    </>
  );
};

LocalBar.propTypes = {
  localMarket: PropTypes.string,
  trackMarketTitle: PropTypes.func,
  trackLocalWeatherWidget: PropTypes.func,
};

export default LocalBar;
