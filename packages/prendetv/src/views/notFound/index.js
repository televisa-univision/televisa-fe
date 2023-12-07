/**
 * @module PrendeTV 404 Page not Found
 */
import React, { useContext } from 'react';
import styled from 'styled-components';

import localization from '../../constants/localization';
import PrendeTVContext from '../../context';

import Styles from './notFound.styles';

const Image = styled.img`${Styles.image}`;
const PlugImage = styled.img`${Styles.plugImage}`;
const Text = styled.p`${Styles.text}`;
const TextWrapper = styled.div`${Styles.textWrapper}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Prende TV Not Found
 *
 * @returns {JSX}
 */
const NotFound = () => {
  const { device, lang } = useContext(PrendeTVContext);
  const plugImage = device === 'desktop' ? 'https://st1.uvnimg.com/6e/e7/251818724f2f99ae0c3524bc1796/plug-desktop.svg'
    : 'https://st1.uvnimg.com/61/9e/e925127146488c64ee774b443695/plug-mobile.svg';

  return (
    <Wrapper>
      <PlugImage src={plugImage} />
      <Image src="https://st1.uvnimg.com/3b/9b/839a08d44c00a4e1b2e79fe2ce8a/back.jpg" alt="Background image" />
      <TextWrapper>
        <Text medium>{localization.get('sorry', { language: lang })}!</Text>
        <Text big>404</Text>
        <Text small>{localization.get('notFound', { language: lang })}</Text>
      </TextWrapper>
    </Wrapper>
  );
};

export default NotFound;
