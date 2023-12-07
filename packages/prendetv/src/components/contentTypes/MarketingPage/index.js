/* eslint-disable react/no-array-index-key */
/**
 * @module Marketing Page
 */
import React, { useContext } from 'react';
import styled from 'styled-components';

import promoCardFactory from '../../../utils/factories/promoCardsFactory';
import PrendeTVContext from '../../../context';

import Styles from './MarketingPage.styles';

const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Prende TV Marketing Page content type.
 *
 * @returns {JSX.Element}
 */
export function Index() {
  const { page: { data } } = useContext(PrendeTVContext);
  return (
    <Wrapper>
      {data?.promoCards?.map((promoCard, index) => {
        const Component = promoCardFactory(promoCard);
        return Component ? <Component key={index} index={index} {...promoCard} />
          : null;
      })}
    </Wrapper>
  );
}

export default Index;
