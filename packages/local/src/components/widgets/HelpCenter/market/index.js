import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '@univision/fe-components-base/dist/components/Dropdown';
import { BLACK } from '@univision/fe-commons/dist/utils/styled/constants';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import styled from 'styled-components';
import { CITIES } from '../constants';
import Styles from './HelpCenterMarket.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const DropDown = styled(Dropdown)`${Styles.dropDownWrapper}`;
const Paragraph = styled.p`${Styles.paragraph}`;

/**
 * Help center market component
 * @param {Array} CITIES current help center data
 * @returns {JSX}
 */
function HelpCenterMarket ({ selectedCity, setSelectedCity }) {
  const options = useMemo(() => (
    CITIES.map((item, index) => ({ name: item, value: String(index) }))
  ), []);
  const handleCityChange = useCallback((e) => {
    e.preventDefault();
    setSelectedCity(e.target.value);
  }, [setSelectedCity]);

  return (
    <Wrapper>
      <Paragraph>{localization.get('findCompaniesByCity')}</Paragraph>
      <DropDown
        iconFill={BLACK}
        placeholder={localization.get('allCities')}
        options={options}
        onChange={handleCityChange}
        value={selectedCity}
        name="select-city"
      />
    </Wrapper>
  );
}

HelpCenterMarket.propTypes = {
  selectedCity: PropTypes.string,
  setSelectedCity: PropTypes.func,
};

export default HelpCenterMarket;
