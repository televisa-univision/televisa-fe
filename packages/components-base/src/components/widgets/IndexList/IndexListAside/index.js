import React from 'react';
import styled from 'styled-components';

import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import { LIST_WIDGET_AD } from '@univision/fe-commons/dist/utils/ads/ad-types';

import Styles from './IndexListAside.styles';

const StickyAdWrapper = styled.div`
  ${Styles.stickyAdWrapper}
`;
const Wrapper = styled.div`
  ${Styles.wrapper}
`;

/**
 * Aside component for Index List
 * An ad for the index list widget usually goes here
 * @returns {JSX}
 */
const IndexListAside = () => {
  return (
    <Wrapper>
      <StickyAdWrapper>
        {adHelper.getAd(LIST_WIDGET_AD, { hasBg: false })}
      </StickyAdWrapper>
    </Wrapper>
  );
};

export default IndexListAside;
