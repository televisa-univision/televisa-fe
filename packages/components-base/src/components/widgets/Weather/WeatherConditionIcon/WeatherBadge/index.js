import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isValidNumber } from '@univision/fe-commons/dist/utils/helpers';
import Styles from './weatherBadge.styles';

const Badge = styled.div`${Styles.badge}`;
const LabelAlert = styled.span.attrs({ className: 'uvs-font-a-medium' })`
  ${Styles.labelAlert}
`;

/**
 * Weather Badge
 * @param {Object} props - component props
 * @param {number} props.amount - amount of alerts
 * @returns {JSX}
 */
const WeatherBadge = ({ amount }) => {
  if (!isValidNumber(amount)) return null;
  const isLarger = amount > 9;

  return (
    <Badge larger={isLarger}>
      <LabelAlert>{`${isLarger ? '9+' : amount}`}</LabelAlert>
    </Badge>
  );
};

WeatherBadge.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default WeatherBadge;
