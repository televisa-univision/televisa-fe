import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import StylesAnimation from '../RegistrationContainer.styles';
import Styles from './Geolocation.styles';
import { LANDING } from '../../RegistrationConfiguration';
import TitleBack from '../../TitleBack';
import InputField from '../../../InputField';
import Toggle from '../../../Toggle';
import Button from '../../../RegistrationForm/Button';

const AnimationWrapper = styled.div`${StylesAnimation.animationWrapper}`;
const Container = styled.div`${Styles.container}`;
const Wrapper = styled.div`${Styles.wrapper}`;
const SearchWrapper = styled.div`${Styles.search}`;
const TitleBackWrapper = styled.div`${Styles.titleBack}`;
const ToggleWrapper = styled.div`${Styles.toggle}`;

/**
 * RegistrationForm base component.
 * @returns {JSX}
 * @constructor
 */
const Geolocation = ({ navigateToPage }) => {
  const {
    primary,
    gradient,
  } = useRegistrationTheme();
  const { start } = gradient;

  /**
   * Handle click
   */
  const handleClick = useCallback(() => {
    if (isValidFunction(navigateToPage)) navigateToPage(LANDING);
  }, [navigateToPage]);
  return (
    <AnimationWrapper>
      <Wrapper>
        <Container>
          <TitleBackWrapper>
            <TitleBack
              color={primary}
              label={localization.get('geolocation')}
              onClick={handleClick}
            />
          </TitleBackWrapper>
          <ToggleWrapper>
            <Toggle fill={start} width={100} height={100} />
          </ToggleWrapper>
          <SearchWrapper>
            <InputField type="search" />
          </SearchWrapper>
          <Button label={localization.get('geolocationUpdate')} gradient={gradient} />
        </Container>
      </Wrapper>
    </AnimationWrapper>
  );
};

/**
 * propTypes
 * @property {Array} [Geolocation] - RegistrationForm for registration
 */
Geolocation.propTypes = {
  navigateToPage: PropTypes.func,
};

export default React.memo(Geolocation);
