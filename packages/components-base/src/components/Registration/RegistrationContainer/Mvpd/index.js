import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
  GREY_BLACK,
} from '@univision/fe-commons/dist/utils/styled/constants';
import PropTypes from 'prop-types';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';
import useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import Styles from './Mvpd.styles';
import StylesAnimation from '../RegistrationContainer.styles';
import mvpdList from './mvpdList';
import MvpdItem from './MvpdItem';
import { LANDING } from '../../RegistrationConfiguration';

const AnimationWrapper = styled.div`${StylesAnimation.animationWrapper}`;
const Skip = styled.div`${StylesAnimation.skip}`;
const MvpdContainer = styled.div`${Styles.mvpdContainer}`;
const PageMsg = styled.div`${Styles.pageMsg}`;
const Title = styled.div`${Styles.title}`;
const Wrapper = styled.div`${Styles.wrapper}`;

// This will render all listed MVPDs
const renderMvpds = mvpdList
  .map((item) => {
    const { key, ...props } = item;
    return <MvpdItem key={`registration-mvpd-${key}`} {...props} />;
  });

/**
 * MVPD list component.
 * @returns {JSX}
 * @constructor
 */
const Mvpd = ({ navigateToPage }) => {
  const { primary } = useRegistrationTheme();
  /**
   * Handle click
   */
  const handleClick = useCallback(() => {
    if (isValidFunction(navigateToPage)) navigateToPage(LANDING);
  }, [navigateToPage]);
  return (
    <AnimationWrapper>
      <Wrapper>
        <Title onClick={handleClick} primary={primary}>
          <Icon name="arrowLeft" size="small" fill={GREY_BLACK} />
          <span>{localization.get('mvpdTitle')}</span>
        </Title>
        <PageMsg>{localization.get('mvpdDesc')}</PageMsg>
        <MvpdContainer>
          {renderMvpds}
        </MvpdContainer>
        <PageMsg>{localization.get('mvpdDesc2')}</PageMsg>
        <Skip className="uvs-font-c-bold">{localization.get('skipRegistration')}</Skip>
      </Wrapper>
    </AnimationWrapper>
  );
};

/**
 * propTypes
 * @property {Array} [Mvpd] - Mvpd for registration
 */
Mvpd.propTypes = {
  navigateToPage: PropTypes.func,
};

export default React.memo(Mvpd);
