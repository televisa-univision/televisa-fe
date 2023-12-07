import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TempSwitch from '@univision/shared-components/dist/components/weather/TempSwitch';

import Styles from './TemperatureSwitch.styles';

const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * TemperatureSwitch
 * @param {Object} props - component props
 * @param {string} [props.className] - modifier class
 * @param {boolean} [props.isCelsius] - if true, sets celsius on
 * @param {func} [props.setIsCelsiusActive] - dispatch function
 * @param {func} [props.setIsCelsiusDisabled] - dispatch function
 * @returns {JSX}
 */
const TemperatureSwitch = ({
  className, isCelsius, setIsCelsiusActive, setIsCelsiusDisabled,
}) => {
  if (isCelsius === null) return null;

  return (
    <Wrapper
      className={className}
      onClick={isCelsius
        ? () => setIsCelsiusDisabled()
        : () => setIsCelsiusActive()
      }
    >
      <TempSwitch isCelsius={isCelsius} />
    </Wrapper>
  );
};

TemperatureSwitch.propTypes = {
  className: PropTypes.string,
  isCelsius: PropTypes.bool,
  setIsCelsiusActive: PropTypes.func,
  setIsCelsiusDisabled: PropTypes.func,
};

export default TemperatureSwitch;
