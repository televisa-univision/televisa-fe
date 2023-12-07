import styled from 'styled-components';
import {
  DARKER_GREY, GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';

import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export const Caption = styled.div`
  color: ${DARKER_GREY};
  font-family: Roboto,sans-serif;
  font-size: ${rem(16)};
  font-weight: 400;
  line-height: ${rem(20)};
  padding: ${rem(8)} 0 0;
  position: relative;
  text-align: left;

  span, div {
    padding: .5rem 0;
  }
`;

export const Credit = styled.div`
  color: ${GREY};
`;
