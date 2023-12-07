import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  ASTRONAUT_BLUE,
  DARKER_GREY,
  GREY_BLACK,
  VERY_LIGHT_GREY,
  WHITE_GREY,
} from '@univision/fe-utilities/styled/constants';

export default {
  day: ({ isSelected }) => css`
    color: ${isSelected ? ASTRONAUT_BLUE : DARKER_GREY};
    font-size: ${rem('14px')};
    line-height: ${rem('17px')};
    user-select: none;

    ${!isSelected && css`
      cursor: pointer;
    `}
  `,
  dailyWrapper: css`
    min-height: 290px;
  `,
  dateInfo: ({ isBold }) => css`
    flex-grow: ${isBold ? 0 : 1};
    font-size: ${rem('14px')};
    font-weight: ${isBold ? 700 : 400};
    line-height: ${rem('17px')};
    margin-bottom: 0;

    ${isBold && css`
      color: ${GREY_BLACK};
      margin-right: 12px;
      text-transform: uppercase;
    `}
  `,
  dayRow: ({ isWeekend }) => css`
    ${isWeekend && css`
      background-color: ${VERY_LIGHT_GREY};
    `}
  `,
  daySelector: css`
    align-items: center;
    display: flex;
    margin-top: 16px;

    ${media.sm`
      margin-left: 24px;
    `}
  `,
  daySeparator: css`
    background-color: ${WHITE_GREY};
    height: 12px;
    margin: 0 16px;
    width: 1px;
  `,
  infoWrapper: css`
    align-items: flex-end;
    display: flex;
    flex: 1;
    margin-left: 8px;

    ${media.sm`
      margin-left: 24px;
    `}
  `,
  tempSwitch: css`
    align-self: flex-end;
  `,
  weatherTopicBar: css`
    margin-bottom: 1px;
  `,
  wrapper: css`
    margin-top: 24px;
  `,
};
