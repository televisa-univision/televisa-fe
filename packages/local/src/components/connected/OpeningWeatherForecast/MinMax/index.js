import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';
import {
  GREY_BLACK,
} from '@univision/fe-utilities/styled/constants';

import Styles from './MinMax.styles';

const Temp = styled.div`${Styles.temp}`;
const Wrapper = styled.div.attrs({
  className: 'uvs-font-c-regular',
})`${Styles.wrapper}`;

/**
 * MinMax component
 *
 * @param {Object} props - component props
 * @param {Object} props.className - modifier class
 * @param {Object} props.isMax - true for maximum temperature
 * @param {string} props.value - temperature value
 * @returns {JSX}
 */
const MinMax = ({ className, isMax, value }) => (
  <Wrapper clasName={className} isMax={isMax}>
    <Icon name={isMax ? 'maxTemp' : 'minTemp'} size={11} fill={GREY_BLACK} />
    <Temp>{`${value}º`}</Temp>
  </Wrapper>
);

MinMax.propTypes = {
  className: PropTypes.string,
  isMax: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default MinMax;
