import React, { useCallback } from 'react';
import styled from 'styled-components';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import PropTypes from 'prop-types';
import Styles from './Modal.styles';
import Button from '../../RegistrationForm/Button';

const Description = styled.div`${Styles.description}`;
const IconWrapper = styled.div`${Styles.iconWrapper}`;
const ModalWrapper = styled.div`${Styles.modalWrapper}`;
const ModalContainer = styled.div`${Styles.modalContainer}`;
/**
 * Button base component.
 * @returns {JSX}
 * @constructor
 */
const Modal = ({ onClick }) => {
  const {
    gradient,
  } = useRegistrationTheme();
  const { start } = gradient;

  /**
   * Handle click modal button
   */
  const handleClick = useCallback(
    () => {
      if (isValidFunction(onClick)) onClick();
    },
    [onClick],
  );
  return (
    <ModalWrapper onClick={handleClick}>
      <ModalContainer>
        <IconWrapper>
          <Icon name="check" fill={start} height={85} width={85} />
        </IconWrapper>
        <Description className="uvs-font-a-light">{localization.get('modalRegistrationMsg')} </Description>
        <Button label={localization.get('close')} gradient={gradient} />
      </ModalContainer>
    </ModalWrapper>
  );
};

Modal.propTypes = {
  onClick: PropTypes.func,
};

export default React.memo(Modal);
