import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import { media, numberOfLines } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  ALICE_BLUE,
  BLACK,
  RED,
  VELVET_RED,
  VERY_LIGHT_GREY,
  WHITE,
  WHITE_GREY,
} from '@univision/fe-utilities/styled/constants';
import {
  BANNER_FLAVOR_LANDING_PAGE,
  BANNER_FLAVOR_MODAL,
  BANNER_FLAVOR_OPENING_CARD,
  BANNER_RISK_HIGH,
} from '@univision/fe-commons/dist/constants/weather';

export default {
  alerts: ({ flavor }) => css`
    margin-right: auto;
    text-transform: uppercase;

    ${flavor === BANNER_FLAVOR_LANDING_PAGE && media.md`
      margin-bottom: 8px;
    `}
  `,
  arrowRight: ({ risk }) => css`
    height: ${risk === BANNER_RISK_HIGH ? 20 : 16}px;
    margin-left: 5px;
    width: auto;
  `,
  cta: () => css`
    letter-spacing: ${rem('0.75px')};
  `,
  event: () => css`
    color: ${WHITE};
    margin-right: auto;
    position: relative;
  `,
  eventLocation: css`
    display: block;
    font-size: ${rem('12px')};
    line-height: ${rem('15px')};
    margin-left: 40px;
    ${numberOfLines(1)};
  `,
  eventText: css`
    display: block;
    font-weight: bold;
    margin-left: 40px;
    ${numberOfLines(1)};
  `,
  icon: css`
    height: 28px;
    left: 3px;
    position: absolute;
    top: 0;
    transform: rotate(180deg);
    width: 28px;
  `,
  seeMore: ({ flavor }) => css`
    display: inline-block;
    text-transform: uppercase;

    ${flavor !== BANNER_FLAVOR_OPENING_CARD && flavor !== BANNER_FLAVOR_LANDING_PAGE && css`
      display: none;
    `}

    ${flavor !== BANNER_FLAVOR_LANDING_PAGE && media.md`
      display: none;
    `}
  `,
  totalAlerts: css`
    color: ${RED};
    margin-right: 5px;
  `,
  wrapper: ({ flavor, risk }) => css`
    align-items: center;
    border-radius: 4px;
    color: ${BLACK};
    display: flex;
    font-size: ${rem('12px')};
    height: 44px;
    letter-spacing: ${rem('1px')};
    line-height: ${rem('14px')};
    margin-top: 14px;
    padding: 0 16px;
    vertical-align: top;
    width: 100%;
    ${media.md`
      margin-top: 0px;
    `}

    &:hover {
      color: ${BLACK};
    }

    ${flavor === BANNER_FLAVOR_LANDING_PAGE && css`
      background-color: ${ALICE_BLUE};

      ${media.md`
        border-right: 1px solid ${VERY_LIGHT_GREY};
        display: inline-flex;
        height: 70px;
      `}

      ${risk !== BANNER_RISK_HIGH && media.md`
        align-items: flex-start;
        flex-direction: column;
        padding-right: 0;
        max-width: 185px;
        justify-content: center;
      `}

      ${risk === BANNER_RISK_HIGH && media.md`
        max-width: 279px;
      `}
    `}

    ${flavor === BANNER_FLAVOR_MODAL && risk !== BANNER_RISK_HIGH && css`
      border-bottom: 1px solid ${WHITE_GREY};
    `}

    ${flavor === BANNER_FLAVOR_OPENING_CARD && risk !== BANNER_RISK_HIGH && css`
      background-color: ${WHITE};
      border-bottom: 1px solid ${WHITE_GREY};
    `}

    ${risk === BANNER_RISK_HIGH && css`
      background-color: ${VELVET_RED};
      color: ${WHITE};
      font-size: ${rem('14px')};
      line-height: ${rem('17px')};
      padding: 0 8px;

      &:hover {
        color: ${WHITE};
      }
    `}
  `,
};
