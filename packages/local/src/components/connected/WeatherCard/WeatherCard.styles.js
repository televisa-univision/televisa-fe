import { css } from 'styled-components';

import {
  media,
  mediaRange,
  rem,
} from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  APP_BREAKPOINTS,
  ASTRONAUT,
  BASELINE_CARDS,
  BLACK_20,
  BLACK_GREY,
  BLACK,
  CHAMBRAY,
  GRADIENT_WEATHER_BREAKING_CARD,
  GREY_ALTO,
  MOBILE_SCREEN_SIZE_SMALL,
  WHITE_50,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';

/**
 * setStyle helper
 * @param {string} size - card size
 * @param {string} rules - css rules
 * @returns {string}
 */
const setStyle = (size, rules) => {
  switch (size) {
    case 'small':
    default: {
      return css`
        ${mediaRange(APP_BREAKPOINTS.xxs, 359, rules)};
        ${media.md`${rules}`}
      `;
    }
    case 'mobile-large': {
      return css`
        ${mediaRange(BASELINE_CARDS, APP_BREAKPOINTS.sm, rules)};
      `;
    }
    case 'tablet': {
      return css`
        ${mediaRange(APP_BREAKPOINTS.sm, APP_BREAKPOINTS.md - 1, rules)};
      `;
    }
  }
};

export default {
  arrowRight: css`
    margin-left: 6px;
  `,
  conditions: css`
    color: ${BLACK};
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    padding-right: 12px;

    ${setStyle('mobile-large', `
      padding: 0 8px;
      margin-top: 12px;
    `)}

    ${setStyle('tablet', `
      margin-top: 16px;
      padding: 0 16px;
    `)}

    ${media.lg`
      margin-top: 24px;
      padding: 0;
    `}
  `,
  conditionsValue: css`
    font-size: ${rem(14)};
    margin-left: 2px;

    ${setStyle('small', css`
      margin-left: 0;
    `)}

    ${setStyle('tablet', css`
      margin-left: 8px;
    `)}
    ${mediaRange(APP_BREAKPOINTS.xxs, APP_BREAKPOINTS.md, `
      font-size: ${rem(9)};
      line-height: ${rem(11)};
    `)}
    ${mediaRange(APP_BREAKPOINTS.sm, MOBILE_SCREEN_SIZE_SMALL, `
      font-size: ${rem(9)};
      line-height: ${rem(11)};
    `)}
    ${media.lg`
      margin-left: 2px;
    `}
  `,
  conditionsWrapper: ({ label, largeLabel }) => css`
    -webkit-font-smoothing: antialiased;
    display: flex;
    font-size: ${rem(12)};
    line-height: ${rem(14)};

    &:before {
      content: '${label}:';
      ${mediaRange(APP_BREAKPOINTS.xxs, MOBILE_SCREEN_SIZE_SMALL, `
        font-size: ${rem(7)};
        line-height: ${rem(11)};
      `)}
      ${mediaRange(APP_BREAKPOINTS.sm, APP_BREAKPOINTS.md, `
        font-size: ${rem(7)};
        line-height: ${rem(11)};
      `)}
    }

    ${largeLabel && setStyle('tablet', `
      &:before {
        content: '${largeLabel}';
      }
    `)}

    ${media.md`
      flex-direction: row;
      font-size: ${rem(10)};
      line-height: ${rem(19)};
    `}
  `,
  content: css`
    margin-left: -16px;
    width: calc(100% + 32px);

    ${setStyle('tablet', css`
      margin-left: -24px;
      width: calc(100% + 48px);
    `)}
  `,
  contentMask: css`
    background-color: ${WHITE_50};
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px 16px 0;

    ${setStyle('tablet', css`
      padding: 8px 24px 0;
    `)}
  `,
  contentNavigation: css`
    background-color: ${WHITE};
    border-bottom: 1px solid ${GREY_ALTO};
    display: flex;
  `,
  contentOption: ({ hasSlideshow, isActive }) => css`
    align-items: center;
    color: ${isActive ? ASTRONAUT : GREY_ALTO};
    display: flex;
    font-size: ${rem(12)};
    height: 44px;
    justify-content: center;
    letter-spacing: 0.75px;
    text-transform: uppercase;
    user-select: none;
    width: 100%;

    ${hasSlideshow && css`
      border: 1px solid ${isActive ? ASTRONAUT : GREY_ALTO};
      border-bottom: none;

      ${isActive && css`
        border-bottom: 2px solid ${ASTRONAUT};
      `}

      ${!isActive && css`
        cursor: pointer;
      `}
    `}
  `,
  currentTemperature: css`
    align-items: center;
    display: flex;
    font-size: ${rem(32)};
    justify-content: flex-end;
    letter-spacing: ${rem(-0.4)};
    line-height: ${rem(36)};

    ${setStyle('small', `
      font-size: ${rem(24)};
      justify-content: flex-start;
      line-height: ${rem(29)};
    `)}

    ${setStyle('tablet', `
      font-size: ${rem(38)};
    `)}

    ${media.lg`
      font-size: ${rem(32)};
      justify-content: flex-end;
    `}
  `,
  currentWeatherIcon: css`
    grid-row: 1 / span 2;
    height: 56px;
    width: 56px;

    ${setStyle('small', css`
      height: 40px;
      width: 40px;
    `)}

    ${setStyle('tablet', css`
      height: 64px;
      width: 64px;
    `)}

    ${media.lg`
      height: 56px;
      width: 56px;
    `}
  `,
  currentWeatherWrapper: css`
    background-color: ${WHITE_50};
    display: flex;
    flex-direction: column;
    padding: 17px 8px 10px;
    ${mediaRange(APP_BREAKPOINTS.sm, APP_BREAKPOINTS.md, `
      padding: 8px;
    `)}
  `,
  marketAndDate: css`
    color: ${WHITE};
    display: flex;
    flex-direction: column;
    text-align: right;
    width: 40%;

    ${setStyle('small', css`
      width: auto;
    `)}

    ${setStyle('mobile-large', `
      width: 45%;
    `)}

    ${setStyle('tablet', `
      flex-direction: row;
      width: auto;
    `)}

    ${media.lg`
      width: 42%;
    `}
  `,
  marketDate: css`
    font-size: ${rem(14)};
    line-height: ${rem(15)};
    margin-top: 2px;

    ${setStyle('small', `
      font-size: ${rem(12)};
      line-height: ${rem(12)};
      margin-top: 0;
    `)}

    ${setStyle('tablet', `
      font-size: ${rem(16)};
      line-height: ${rem(19)};
      margin-left: 8px;
    `)}

    ${media.lg`
      font-size: ${rem(14)};
      line-height: ${rem(15)};
    `}
  `,
  marketName: css`
    font-size: ${rem(16)};
    line-height: ${rem(17)};

    ${setStyle('small', `
      font-size: ${rem(12)};
    `)}

    ${setStyle('tablet', `
      font-size: ${rem(18)};
      line-height: ${rem(21)};
    `)}

    ${media.lg`
      font-size: ${rem(16)};
      line-height: ${rem(17)};
    `}
  `,
  maxMinIcon: css`
    margin-right: 4px;
  `,
  maxMinTemp: css`
    display: flex;
    grid-row: 2;
  `,
  maxMinWrapper: ({ hasMargin }) => css`
    align-items: center;
    color: ${BLACK_GREY};
    display: flex;
    font-size: ${rem(10)};
    letter-spacing: 0.75px;
    line-height: ${rem(15)};
    ${media.md`
      font-size: ${rem(12)};
    `}

    ${hasMargin && css`
      margin-right: 6px;

      ${setStyle('small', css`
        margin-right: 3px;
      `)}
    `}

    ${setStyle('tablet', `
      font-size: ${rem(16)};
    `)}
  `,
  nextHourIcon: css`
    height: 24px;
    width: 24px;

    ${setStyle('tablet', css`
      height: 32px;
      margin-right: 8px;
      width: 32px;
    `)}
  `,
  nextHourInfo: css`
    align-items: center;
    background-color: ${WHITE_50};
    display: flex;
    flex-direction: column;
    font-size: ${rem(14)};
    line-height: ${rem(15)};
    padding-bottom: 6px;
    padding-top: 8px;
    width: calc((100% / 3) - 5.5px);

    ${setStyle('small', `
      font-size: ${rem(12)};
      line-height: ${rem(15)};
    `)}

    ${setStyle('mobile-large', css`
      width: calc((100% / 3) - 10.5px);
    `)}

    ${setStyle('tablet', `
      flex-direction: row;
      font-size: ${rem(14)};
      line-height: ${rem(19)};
      justify-content: center;
      width: calc((100% / 3) - 10.5px);
    `)}

    ${media.lg`
      font-size: ${rem(14)};
      line-height: ${rem(19)};
      width: calc((100% / 3) - 10.5px);
    `}
  `,
  nextHourTemp: css`
    color: ${BLACK};
    display: flex;
    font-size: ${rem(16)};
    margin-bottom: 1px;

    ${setStyle('small', `
      font-size: ${rem(14)};
      line-height: ${rem(18)};
    `)}

    ${setStyle('tablet', `
      font-size: ${rem(16)};
      line-height: ${rem(20)};
      margin-bottom: 0;
      margin-right: 6px;
    `)}

    ${media.lg`
      font-size: ${rem(16)};
      line-height: ${rem(20)};
    `}
  `,
  nextHourWrapper: css`
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    ${media.md`
      margin-top: 8px;
    `}
  `,
  seeForecast: css`
    align-items: center;
    background-color: ${ASTRONAUT};
    border: 1px solid ${CHAMBRAY};
    border-radius: 4px;
    color: ${WHITE};
    display: flex;
    font-size: ${rem(12)};
    justify-content: center;
    letter-spacing: 0.75px;
    line-height: ${rem(20)};
    margin-top: 32px;
    padding: 9px 0;
    text-transform: uppercase;

    && {
      color: ${WHITE};
    }

    &:hover {
      background-color: ${CHAMBRAY};
    }
    ${media.md`margin-top: 8px;`}
    ${media.lg`margin-top: 16px;`}
  `,
  sponsoredAd: ({ hasAlertBanner }) => css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    ${hasAlertBanner && media.lg`
      margin-bottom: 0;
    `}

    .msg {
      color: ${BLACK};
      font-size: ${rem(14)};
      margin: 0;
      padding-bottom: 22px;
      padding-top: 12px;
      width: 50%;

      ${setStyle('small', css`
        padding-bottom: 5px;
        padding-top: 5px;
      `)}

      ${mediaRange(APP_BREAKPOINTS.xxs, 359, `
        padding-bottom: 22px;
        padding-top: 12px;
      `)};

      ${media.lg`
        padding-bottom: 22px;
        padding-top: 12px;
      `}
    }
  `,
  temperature: css`
    display: grid;
    grid-column-gap: 5px;
    grid-template-columns: 56px auto;
    grid-template-rows: 38px 12px;

    ${setStyle('small', css`
      grid-template-columns: 40px auto;
      grid-template-rows: 29px 12px;
    `)}

    ${setStyle('tablet', css`
      grid-template-columns: 64px auto;
      grid-template-rows: 48px 12px;
    `)}

    ${media.lg`
      grid-template-columns: 56px auto;
      grid-template-rows: 38px 12px;
    `}
  `,
  temperaturePhrase: css`
    color: ${BLACK};
    font-size: ${rem(12)};
    line-height: ${rem(15)};
    margin-top: 8px;
    padding-right: 2px;
    width: 40%;

    ${media.md`
      margin-top: 4px;
      width: 40%;
    `}
  `,
  temperatureWrapper: css`
    display: flex;
    justify-content: space-between;
  `,
  weather: css`
    padding: 16px 0;
    ${media.md`
      padding: 8px 0;
    `}
  `,
  wrapper: css`
    background: ${GRADIENT_WEATHER_BREAKING_CARD};
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 ${BLACK_20};
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding: 66px 16px 32px;
    position: relative;
    width: 100%;
    ${mediaRange(APP_BREAKPOINTS.sm, APP_BREAKPOINTS.md, `
      padding: 44px 13px 8px;
    `)}
    ${media.lg`
      padding-bottom: 16px;
    `}
  `,
};
