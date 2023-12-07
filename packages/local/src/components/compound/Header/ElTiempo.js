import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '@univision/fe-icons/dist/components/Icon';
import features from '@univision/fe-commons/dist/config/features';
import Styles from './ElTiempo.styles';

const Container = styled.div`${Styles.container}`;
const ElTiempoIcon = styled(Icon)`${Styles.icon}`;

/**
 * Render the El Tiempo Header.
 * @param {string} [className] - Optional class name for additional styling
 * @param {boolean} isOpeningWeatherForecast - true for opening weather forecast
 * @param {Object|Element} rightComponent component that will render at the right position.
 * @returns {JSX}
 */
const ElTiempo = ({ className, isOpeningWeatherForecast, rightComponent }) => {
  const useVigilantesDelTiempo = features.localMarkets.shouldUseVigilantesDelTiempo();
  const usePrimeraAlerta = features.localMarkets.shouldUsePrimeraAlerta();
  const useGuardianesDelTiempo = features.localMarkets.shouldUseGuardianesDelTiempo();
  let iconName = useVigilantesDelTiempo ? 'vigilantesDelTiempo' : 'elTiempoLogo';
  iconName = usePrimeraAlerta ? 'primeraAlerta' : iconName;
  iconName = useGuardianesDelTiempo ? 'guardianesDelTiempo' : iconName;
  let size = [70, 28];

  if (useVigilantesDelTiempo || useGuardianesDelTiempo) {
    size = [120, 32];
  } else if (isOpeningWeatherForecast) {
    size = [82, 32];
  }

  return (
    <Container className={className} isOpeningWeatherForecast={isOpeningWeatherForecast}>
      <ElTiempoIcon
        name={iconName}
        size={size}
      />
      {rightComponent}
    </Container>
  );
};

ElTiempo.propTypes = {
  className: PropTypes.string,
  isOpeningWeatherForecast: PropTypes.bool,
  rightComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]),
};

export default ElTiempo;
