import React from 'react';
import styled from 'styled-components';

import {
  TROPICAL_RAIN_FOREST,
  FLIRT,
  BITTERSWEET,
  DAISY_BUSH,
  DEEP_KOMARU,
  GAMBOGE,
  HAITI,
} from '@univision/fe-utilities/styled/constants';
import { GRADIENT_UNICABLE } from '@univision/fe-commons/src/utils/styled/constants';

import Styles from './DevPage.styles';

const WrapperStyled = styled.div`${Styles.wrapper}`;
const ContainerStyled = styled.div`${Styles.container}`;
const WelcomeStyled = styled.div`${Styles.welcome}`;
const ButtonsStyled = styled.div`${Styles.buttons}`;
const LinkStyled = styled.a`${Styles.link}`;

/**
 * Main dev page to navigate through the available sites
 * @returns {JSX}
 */
function DevPage() {
  return (
    <WrapperStyled>
      <ContainerStyled>
        <WelcomeStyled>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 120">
            <path
              d="M217.818 15.679v1.877h1.55V15.68zm60.719 0v1.877h1.55V15.68zm250.464 0v1.877h1.552V15.68zm182.157 0v1.877h1.551V15.68zm75.898 0v1.877h1.551V15.68zM40.241 20.037v.493h15.18v-.493h-7.59zm45.54 0v.493h15.179v-.493h-7.59zm30.359 0v.493h30.359v-.493h-22.77zm60.718 0v.493h30.36v-.493h-22.77zm45.54 0v.493h15.18v-.493h-7.59zm37.949 0v.493h15.18v-.493h-7.59zm53.129 0v.493h30.359v-.493h-22.77zm60.718 0v.493h15.18v-.493h-7.59zm45.54 0v.493H450.093v-.493h-22.77zm45.539 0v.493H518.402v-.493H472.862zm68.308 0v.493H579.121v-.493h-37.95zm106.258 0v.493h22.77v-.493h-15.18zm75.899 0v.493h45.539v-.493h-37.95zm75.898 0v.493H837.176v-.493h-37.95zM35.914 23.681v12.607h1.059V23.68zm22.77 0v12.607h1.058V23.68zm22.769 0v12.607h1.059V23.68zm22.77 0v12.607h1.058V23.68zm113.847 0v12.607h1.059V23.68zm37.95 0v12.607h1.058V23.68zm22.769 0v12.607h1.059V23.68zm182.156 0v12.607h1.059V23.68zm60.719 0v12.607h1.059V23.68zm7.59 0v12.607h1.059V23.68zm182.156 0v12.607h1.059V23.68zm75.899 0v12.607h1.058V23.68zm-670.541.443l4.844 10.36h1.17l-4.839-10.36zm30.359 0l4.844 10.36h1.17l-4.838-10.36zm27.614 0l-4.845 10.36h1.176l4.838-10.36zm30.36 0l-4.845 10.36h1.176l4.838-10.36zm33.104 0l4.845 10.36h1.17l-4.84-10.36zm75.899 0l4.844 10.36h1.17l-4.839-10.36zm30.359 0l4.844 10.36h1.17l-4.838-10.36zm27.614 0l-4.845 10.36h1.176l4.838-10.36zm17.925 0l4.844 10.36h1.17l-4.838-10.36zm27.614 0l-4.844 10.36h1.175l4.839-10.36zm30.36 0l-4.845 10.36h1.176l4.838-10.36zm131.772 0l4.845 10.36h1.17l-4.84-10.36zm57.974 0l-4.845 10.36h1.176l4.838-10.36zm25.514 0l4.845 10.36h1.17l-4.839-10.36zm98.668 0l4.845 10.36h1.17l-4.839-10.36zm75.899 0l4.844 10.36h1.17l-4.838-10.36zm-349.76 11.671v.493H518.401v-.493h-22.77zm68.308 0v.493h7.59v-.493zm182.156 0v.493h7.59v-.493zm75.898 0v.493h7.59v-.493zM35.914 39.44v12.607h1.059V39.44zm22.77 0v12.607h1.058V39.44zm22.769 0v12.607h1.059V39.44zm22.77 0v12.607h1.058V39.44zm113.847 0v12.607h1.059V39.44zm37.95 0v12.607h1.058V39.44zm22.769 0v12.607h1.059V39.44zm182.156 0v12.607h1.059V39.44zm22.77 0v12.607h1.059V39.44zm45.539 0v12.607h1.059V39.44zm22.77 0v12.607h1.058V39.44zm37.949 0v12.607h1.058V39.44zm121.437 0v12.607h1.059V39.44zm22.77 0v12.607h1.058V39.44zm37.949 0v12.607h1.059V39.44zm15.18 0v12.607h1.058V39.44zm22.77 0v12.607h1.058V39.44zm37.948 0v12.607h1.06V39.44zm-281.944.068c.546.94.952 1.876 1.219 2.807.27.932.406 1.865.406 2.801 0 .932-.136 1.863-.406 2.795a12.754 12.754 0 0 1-1.22 2.825h.986c.62-.968 1.081-1.916 1.385-2.844a8.878 8.878 0 0 0 .455-2.776 8.84 8.84 0 0 0-.455-2.764c-.304-.927-.766-1.875-1.385-2.844zm182.156 0c.546.94.952 1.876 1.219 2.807.27.932.406 1.865.406 2.801 0 .932-.135 1.863-.406 2.795a12.755 12.755 0 0 1-1.219 2.825h.985c.62-.968 1.081-1.916 1.385-2.844a8.879 8.879 0 0 0 .455-2.776c0-.915-.151-1.836-.455-2.764-.304-.927-.765-1.875-1.385-2.844zm75.899 0c.545.94.952 1.876 1.218 2.807.271.932.407 1.865.407 2.801a9.97 9.97 0 0 1-.407 2.795 12.756 12.756 0 0 1-1.218 2.825h.984c.62-.968 1.082-1.916 1.385-2.844a8.877 8.877 0 0 0 .456-2.776 8.84 8.84 0 0 0-.456-2.764c-.303-.927-.765-1.875-1.385-2.844zm-699.78.376l4.844 10.36h1.17l-4.839-10.36zm30.359 0l4.844 10.36h1.17l-4.839-10.36zm12.434 0l-4.844 10.36h1.175l4.839-10.36zm30.36 0l-4.845 10.36h1.176l4.838-10.36zm48.284 0l4.844 10.36h1.17l-4.838-10.36zm75.898 0l4.845 10.36h1.17l-4.839-10.36zm30.36 0l4.844 10.36h1.17l-4.839-10.36zm12.434 0l-4.844 10.36h1.175l4.839-10.36zm33.105 0l4.844 10.36h1.17l-4.838-10.36zm12.434 0l-4.844 10.36h1.175l4.839-10.36zm30.36 0l-4.845 10.36h1.176l4.838-10.36zm189.746 0l-4.845 10.36h1.176l4.838-10.36zm20.547 0l-2.807 6.161h1.096l2.253-4.369 2.259 4.37h1.096l-2.807-6.162zm20.147 0l4.845 10.36h1.17l-4.839-10.36zm-182.784 11.67v.493h15.18v-.492h-7.59zm68.309 0v.493h7.59v-.492zm182.156 0v.493h7.59v-.492zm75.898 0v.493h7.59v-.492zm-559.93 3.195l2 2.315h.948l-1.73-2.315zm-218.561.45v12.606h1.059V55.198zm22.77 0v12.606h1.058V55.198zm22.769 0v12.606h1.059V55.198zm22.77 0v12.606h1.058V55.198zm113.847 0v12.606h1.059V55.198zm60.719 0v12.606h1.059V55.198zm182.156 0v12.606h1.059V55.198zm45.54 0v12.606h1.058V55.198zm22.769 0v12.606h1.059V55.198zm182.156 0v12.606h1.059V55.198zm75.899 0v12.606h1.058V55.198zm-655.362.443l4.845 10.36h1.17l-4.84-10.36zm57.974 0l-4.845 10.36h1.176l4.838-10.36zm139.362 0l4.845 10.36h1.17l-4.84-10.36zm103.513 0l-4.845 10.36h1.176l4.838-10.36zm189.746 0l-4.845 10.36h1.176l4.838-10.36zm22.77 0l-4.845 10.36h1.176l4.838-10.36zm10.335 0l4.844 10.36h1.17l-4.839-10.36zm22.77 0l4.844 10.36h1.17l-4.84-10.36zm88.332 0l-4.845 10.36h1.176l4.838-10.36zm75.898 0l-4.844 10.36h1.176l4.838-10.36zm-256.479 2.154l-6.506 2.574v1.021l6.506 2.573v-1.126l-5.232-1.951 5.232-1.97zm-345.58 5.159v1.877h1.55v-1.877zm247.454 4.358v.492h15.18v-.492h-7.59zm68.309 0v.492h7.59v-.492zm91.078 0v.492h7.59v-.492zm91.078 0v.492h22.77v-.492h-15.18zm75.898 0v.492h22.77v-.492h-15.18zM57.138 70.507l2 2.314h.949l-1.73-2.314zm-21.224.45v12.606h1.059V70.956zm68.308 0v12.606h1.06V70.956zm113.848 0v12.606h1.059V70.956zm22.77 0v12.606h1.058V70.956zm37.949 0v12.606h1.059V70.956zm182.156 0v12.606h1.059V70.956zm22.77 0v12.606h1.059V70.956zm45.539 0v12.606h1.059V70.956zm22.77 0v12.606h1.058V70.956zm37.949 0v12.606h1.058V70.956zm121.437 0v12.606h1.059V70.956zm22.77 0v12.606h1.058V70.956zm53.129 0v12.606h1.058V70.956zm22.77 0v12.606h1.058V70.956zm-243.996.067c.546.94.952 1.875 1.219 2.807.27.931.406 1.865.406 2.8 0 .932-.136 1.864-.406 2.795a12.754 12.754 0 0 1-1.22 2.826h.986c.62-.969 1.081-1.917 1.385-2.844a8.878 8.878 0 0 0 .455-2.776c0-.916-.152-1.837-.455-2.764-.304-.928-.766-1.876-1.385-2.844zm-484.642.375v3.417h1.07v-3.417zm58.096 0l4.845 10.36h1.17l-4.84-10.36zm42.794 0l-4.845 10.36h1.176L183.5 71.4zm63.464 0l4.844 10.36h1.17L246.97 71.4zm91.078 0l4.845 10.36h1.17l-4.84-10.36zm42.794 0l-4.845 10.36h1.176l4.838-10.36zm2.745 0l4.845 10.36h1.17l-4.84-10.36zm42.794 0l-4.845 10.36h1.176l4.838-10.36zm189.746 0l-4.844 10.36h1.175l4.839-10.36zm71.054 0l4.844 10.36h1.17l-4.838-10.36zM65.202 76.632v1.01h3.207v-1.01zm7.59 0v1.01h3.207v-1.01zm415.25 6.438v.493h30.36v-.493h-22.77zm68.309 0v.493h7.59v-.493zm75.898 0v.493h37.95v-.493h-30.36zM218.07 86.714v12.607h1.059V86.714zm22.77 0v12.607h1.058V86.714zm37.949 0v12.607h1.059V86.714zm182.156 0v12.607h1.059V86.714zm60.719 0v12.607h1.059V86.714zm7.59 0v12.607h1.059V86.714zm182.156 0v12.607h1.059V86.714zm22.77 0v12.607h1.058V86.714zm53.129 0v12.607h1.058V86.714zm22.77 0v12.607h1.058V86.714zm-769.21.444l4.845 10.36h1.17l-4.84-10.36zm57.973 0l-4.844 10.36h1.176l4.838-10.36zm48.285 0l4.844 10.36h1.17l-4.838-10.36zm27.614 0l-4.845 10.36h1.176l4.838-10.36zm78.644 0l4.844 10.36h1.17l-4.839-10.36zm91.078 0l4.844 10.36h1.17l-4.838-10.36zm27.614 0l-4.845 10.36h1.176l4.838-10.36zm17.925 0l4.844 10.36h1.17l-4.838-10.36zm27.614 0l-4.844 10.36h1.175l4.839-10.36zm166.977 0l-4.845 10.36h1.176l4.838-10.36zm22.77 0l-4.845 10.36h1.175l4.839-10.36zm22.769 0l-4.845 10.36h1.176l4.838-10.36zm40.694 0l4.845 10.36h1.17l-4.839-10.36zm22.77 0l4.844 10.36h1.17l-4.838-10.36zM47.83 98.828v.493H93.371v-.492H55.42zm106.258 0v.493h15.18v-.492h-7.59zm68.308 0v.493h15.18v-.492h-7.59zm37.95 0v.493h15.18v-.492h-7.59zm91.078 0v.493h15.18v-.492h-7.59zm45.539 0v.493h15.18v-.492h-7.59zm68.309 0v.493H518.402v-.492H472.862zm68.308 0v.493H579.121v-.492h-37.95zm75.899 0v.493h15.18v-.492h-7.59zm68.308 0v.493h15.18v-.492h-7.59zm45.54 0v.493h7.59v-.492zm75.898 0v.493h7.59v-.492z"
            />
          </svg>
        </WelcomeStyled>
        <ButtonsStyled>
          {/* auto-domain-link-end */}
          <LinkStyled href="/tudn" target="_blank" color={TROPICAL_RAIN_FOREST}>
            TUDN site
          </LinkStyled>
          <LinkStyled href="/univision" target="_blank" color={FLIRT}>
            Univision site
          </LinkStyled>
          <LinkStyled href="/prendetv" target="_blank" color={BITTERSWEET}>
            Prende TV site
          </LinkStyled>
          <LinkStyled href="/delicioso" target="_blank" color={DAISY_BUSH}>
            Delicioso site
          </LinkStyled>
          <LinkStyled href="/mulher" target="_blank" color={DEEP_KOMARU}>
            Mulher site
          </LinkStyled>
          <LinkStyled href="/tasaudavel" target="_blank" color={GAMBOGE}>
            Tasaudavel site
          </LinkStyled>
          <LinkStyled href="/zappeando" target="_blank" color={HAITI}>
            Zappeando site
          </LinkStyled>
          <LinkStyled href="/lasestrellas" target="_blank" color={HAITI}>
            Las Estrellas site
          </LinkStyled>
          <LinkStyled href="/canal5" target="_blank" color={TROPICAL_RAIN_FOREST}>
            Canal5 site
          </LinkStyled>
          <LinkStyled href="/elnu9ve" target="_blank" color={FLIRT}>
            Elnu9ve site
          </LinkStyled>
          <LinkStyled href="/distritocomedia" target="_blank" color={TROPICAL_RAIN_FOREST}>
            Distritocomedia site
          </LinkStyled>
          <LinkStyled href="/televisa" target="_blank" color={TROPICAL_RAIN_FOREST}>
            Televisa site
          </LinkStyled>
          <LinkStyled href="/unicable" target="_blank" color={GRADIENT_UNICABLE}>
            Unicable site
          </LinkStyled>
          <LinkStyled href="/telehit" target="_blank" color={TROPICAL_RAIN_FOREST}>
            Telehit site
          </LinkStyled>
          <LinkStyled href="/losbingers" target="_blank" color={HAITI}>
            Losbingers site
          </LinkStyled>
          <LinkStyled href="/bandamax" target="_blank" color={TROPICAL_RAIN_FOREST}>
            Bandamax site
          </LinkStyled>
          <LinkStyled href="/lcdlf" target="_blank" color={TROPICAL_RAIN_FOREST}>
            Lcdlf site
          </LinkStyled>
          {/* auto-domain-link-end */}
        </ButtonsStyled>
      </ContainerStyled>
    </WrapperStyled>
  );
}

export default DevPage;
