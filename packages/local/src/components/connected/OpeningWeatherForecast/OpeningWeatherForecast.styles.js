import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import numberOfLines from '@univision/fe-utilities/styled/mixins/numberOfLines';
import {
  ALICE_BLUE,
  BLACK_08,
  BLACK_GREY,
  BLACK_SQUEEZE,
  DARK_BLUE,
  MERCURY,
  MIDNIGHT_EXPRESS,
  VERY_LIGHT_GREY,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';

export default {
  container: css`
    padding-left: 19px;
    padding-right: 19px;
  `,
  location: css`
    font-size: clamp(${rem(14)}, 4vw, ${rem(16)});
    line-height: clamp(${rem(17)}, 4.6vw, ${rem(19)});

    ${media.sm`
      white-space: nowrap;
    `}
  `,
  locationDate: css`
    font-size: clamp(${rem(12)}, 3.5vw, ${rem(14)});
    line-height: clamp(${rem(14)}, 4vw, ${rem(16)});

    ${media.sm`
      white-space: nowrap;
    `}
  `,
  locationAndTime: css`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    ${media.sm`
      margin-left: 22px;
    `}

    ${media.lg`
      margin-left: 32px;
    `}
  `,
  mainWrapper: ({ hasAlertBanner }) => css`
    min-height: ${hasAlertBanner ? 234 : 190}px;

    ${media.sm`
      min-height: ${hasAlertBanner ? 195 : 152}px;
    `}

    ${media.md`
      min-height: 138px;
    `}
  `,
  minMaxTempWrapper: css`
    display: flex;
    grid-column: 2;
  `,
  phraseText: css`
    &&& {
      font-size: clamp(${rem(14)}, 4vw, ${rem(16)});
      font-weight: 700;
      line-height: clamp(${rem(14)}, 4vw, ${rem(16)});

      ${numberOfLines(1)}

      ${media.sm`
        margin-left: 22px;
      `}

      ${media.lg`
        margin-left: 32px;
      `}
    }
  `,
  phraseTextWrapper: css`
    align-items: flex-end;
    display: flex;
  `,
  sponsor: css`
    color: ${WHITE};
    display: flex;

    .uvs-ad-ready {
      height: 40px;
    }
  `,
  temp: css`
    align-items: flex-end;
    color: ${BLACK_GREY};
    display: inline-flex;
    font-size: clamp(${rem(28)}, 8.5vw, ${rem(32)});
    grid-column: 2;
    line-height: clamp(${rem(28)}, 8.5vw, ${rem(32)});
  `,
  temperatureDetails: css`
    column-gap: 5px;
    display: grid;
    grid-row: 1 / span 2;
    grid-template-columns: 56px auto;
    grid-template-rows: 38px 18px;
    justify-content: flex-start;
    margin-left: -6px;
    margin-top: 2px;

    ${media.sm`
      margin-top: 0;
    `}
  `,
  weatherConditions: css`
    align-items: flex-end;
    display: flex;
    grid-column: 1 / span 2;
    justify-content: space-between;

    ${media.sm`
      align-items: center;
      border-left: 1px solid ${MERCURY};
      flex-grow: 1;
      height: 39px;
      margin-left: 16px;
      padding-left: 16px;
      margin-right: 16px;
      max-width: 335px;
    `}

    ${media.lg`
      margin-left: 22px;
      padding-left: 22px;
    `}
  `,
  weatherConditionWrapper: css`
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 ${BLACK_08};
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;

    ${media.md`
      flex-direction: row;
      height: 70px;
    `}
  `,
  weatherIcon: css`
    align-self: center;
    flex-shrink: 0;
    grid-row: 1 / span 2;

    ${media.sm`
      height: 54px;
      width: 54px;
    `}
  `,
  weatherInfoGrid: css`
    align-content: center;
    column-gap: 6%;
    display: grid;
    grid-template-columns: calc(50% - 8px) calc(50% - 8px);
    grid-template-rows: 32px 24px 39px;
    justify-content: center;
    max-width: 302px;
    width: 100%;

    ${media.sm`
      align-items: center;
      column-gap: unset;
      display: flex;
      max-width: unset;
    `}

    ${media.md`
      justify-content: flex-start;
      margin-left: 18px;
    `}

    ${media.lg`
      margin-left: 32px;
    `}
  `,
  weatherInfoWrapper: css`
    background: ${linearGradient({ direction: 'to right', start: ALICE_BLUE, end: BLACK_SQUEEZE })};
    border-top: 1px solid ${VERY_LIGHT_GREY};
    display: flex;
    justify-content: center;
    padding: 16px 10px 11px;
    width: 100%;

    ${media.md`
      border: 0;
      padding: 0;
    `}
  `,
  wrapper: css`
    background: ${linearGradient({ direction: '45deg', start: DARK_BLUE, end: MIDNIGHT_EXPRESS })};
    height: 90px;
  `,
};
