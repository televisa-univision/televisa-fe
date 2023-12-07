import { css } from 'styled-components';
import {
  LIGHT_GREY, GREY_BLACK,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  date: css`
    border-bottom: 1px solid ${LIGHT_GREY};
    color: $black;
    font-size: ${rem('16px')};
    line-height: 19px;
    padding: 24px 0 8px;
    text-align: left;
  `,
  soccerLiveContainer: css`
    display: flex;
  `,
  endedMatchesSwitchButtonWrapper: css`
    border-bottom: 1px solid ${LIGHT_GREY};
    font-size: 11px;
    padding: 16px 16px;
  `,
  noEventsWrapper: css`
    border-bottom: 1px solid ${LIGHT_GREY};
    color: ${GREY_BLACK};
    font-size: ${rem('14px')};
    font-weight: bold;
    padding: 16px 16px;
    text-align: center;
  `,
};
