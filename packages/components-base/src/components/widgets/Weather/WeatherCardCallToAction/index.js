import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { ASTRONAUT } from '@univision/fe-commons/dist/utils/styled/constants';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '../../../Link';
import Styles from './WeatherCardCallToAction.styles';

const SeeForecast = styled(Link)`${Styles.seeForecast}`;
const RightArrowIcon = styled(Icon)`${Styles.rightArrowicon}`;
/**
 * WeatherModal Component
 * @param {Object} props - component props
 * @param {string} props.uri - market uri
 * @param {string} props.className - className
 * @param {function} props.trackingHandler - Tracking Handler
 * @returns {?JSX}
 */
const WeatherCardCallToAction = ({
  uri,
  className,
  trackingHandler,
}) => {
  if (!uri) return null;

  return (
    <SeeForecast href={`${uri}/tiempo`} className={className} onClick={trackingHandler}>
      {localization.get('seeCompleteForecast')}
      <RightArrowIcon name="arrow" size="xxsmall" fill={ASTRONAUT} />
    </SeeForecast>
  );
};

WeatherCardCallToAction.propTypes = {
  uri: PropTypes.string,
  className: PropTypes.string,
  trackingHandler: PropTypes.func,
};

export default WeatherCardCallToAction;
