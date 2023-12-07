import { css } from 'styled-components';

import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  ASTRONAUT,
  CARD_SHADOW,
  SOLITUDE,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import {
  BANNER_RISK_HIGH,
} from '@univision/fe-commons/dist/constants/weather';

export default {
  landingPageContainer: css`
    background-color: ${WHITE};
    border-radius: 7px 7px 0 0;
    box-shadow: ${CARD_SHADOW};
    margin: 10px 10px 0 10px;
    overflow: hidden;

    ${media.md`
      border-radius: 7px;
      max-height: 70px;
      margin: 10px;
    `}
  `,
  modalContainer: css`
    background-color: ${WHITE};
    margin: 10px;
    max-width: 450px;
  `,
  moreData: ({ risk }) => css`
    background: ${SOLITUDE};
    text-align: center;

    ${media.md`
      display: inline-flex;
      height: 70px;
      vertical-align: top;
      width: calc(100% - ${risk === BANNER_RISK_HIGH ? 279 : 185}px);
    `}
  `,
  openingWidgetContainer: css`
    background-color: ${WHITE};
    margin: 10px;
    max-width: 450px;
  `,
  wrapper: css`
    background: ${ASTRONAUT};
    display: flow-root;
  `,
};
