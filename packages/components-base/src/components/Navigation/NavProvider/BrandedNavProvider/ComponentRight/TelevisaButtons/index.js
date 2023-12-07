import React from 'react';
import styled from 'styled-components';

import ButtonTelevisa from '../../../../../widgets/ButtonTelevisa';
import ButtonPrendeTv from '../../../../ButtonPrendeTv';
import Styles from './TelevisaButtons.styles';

const Wrapper = styled.div`${Styles.container}`;

/**
 * This component merges the ButtonUniNow and ButtonPrendeTV in one component to
 * keep a cleaner rendering logic
 * @returns {JSX}
 */
const TelevisaButtons = () => {
  return (
    <Wrapper>
      <ButtonTelevisa style={{ 'min-width': '102px' }} name={'Las Estrellas'} link={'https://www.lasestrellas.tv/en-vivo'} />
      <ButtonTelevisa name={'Foro TV'} link={'https://www.nmas.com.mx/foro-tv/'} />
      <ButtonPrendeTv />
    </Wrapper>
  );
};

export default TelevisaButtons;
