import { css } from 'styled-components';

import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  WHITE,
  WHITE_10,
  GRAYISH_BLUE,
  GRAYISH_BLUE_DARK,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  barWrapper: css`
    border-top: 1px solid ${GRAYISH_BLUE};
  `,
  headline: css`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;

    ${media.sm`
      margin-bottom: 8px;
    `}
  `,
  infoWrapper: css`
    background: ${GRAYISH_BLUE_DARK};
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  `,
  logo: css`
    width: 109px;
    ${media.sm`
      width: 178px;
    `}
  `,
  schedule: css`
    border-left: 1px solid ${WHITE_10};
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: 16px 20px;
    ${media.md`
      padding: 24px;
    `}
  `,
  timestamp: css`
    color: ${WHITE};
    font-size: ${rem('10px')};
    letter-spacing: 0.4px;
    line-height: ${rem('16px')};
    opacity: 0.4;
    text-transform: uppercase;

    ${media.sm`
      font-size: ${rem('12px')};
      line-height: ${rem('14px')};
    `}
  `,
  title: ({ isLiveTitle }) => css`
    color: ${WHITE};
    font-size: ${rem('16px')};
    letter-spacing: -0.4px;
    line-height: ${rem('20px')};
    margin-top: 4px;

    ${media.sm`
      margin-top: 12px;
      ${isLiveTitle && css`
        font-size: ${rem('30px')};
        letter-spacing: 0;
        line-height: ${rem('34px')};
      `}
    `}
  `,
  videoWrapper: css`
    flex: 0 1 64%;
  `,
  wrapper: css`
    -webkit-font-smoothing: antialiased;
    border-radius: 4px;
    overflow: hidden;
    ${media.sm`
      display: flex;
    `}
  `,
};
