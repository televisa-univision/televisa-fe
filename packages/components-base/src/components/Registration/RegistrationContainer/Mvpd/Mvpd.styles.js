import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { APP_BREAKPOINTS } from '@univision/fe-commons/dist/utils/styled/constants';
import { media, mediaRange } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  mvpdContainer: css`
    display: grid;
    grid-column-gap: 16px;
    grid-row-gap: 16px;
    grid-template-areas: 'a a a';
    justify-content: center;
    margin-bottom: 24px;
    margin-top: 20px;
    width: 100%;

    ${media.sm`
      grid-template-areas: 'a a a a a';
      width: 600px;
    `}
  `,
  skip: css`
    font-size: ${rem('12px')};
    line-height: ${rem('14px')};
    margin-top: 24px;
  `,
  pageMsg: css`
    font-size: ${rem('16px')};
    line-height: ${rem('22px')};
    padding-bottom: 16px;
    text-align: center;
    ${media.sm`
      width: 600px;
    `}
  `,
  title: ({ primary }) => css`
    color: ${primary};
    cursor: pointer;
    display: flex;
    font-size: ${rem('20px')};
    font-weight: bold;
    line-height: ${rem('24px')};
    margin-bottom: 24px;
    margin-left: -4px;
    width: 100%;
    ${media.sm`
      justify-content: center;
    `}
    svg {
      display: flex;
      ${media.sm`
        display: none;
      `}
    }
  `,
  wrapper: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    padding: 24px 35px 80px;
    width: 100%;
    ${mediaRange(APP_BREAKPOINTS.xxs, 414, css`
      padding-left: 20px;
      padding-right: 20px;
      `)}
    ${media.sm`
      padding-top: 87px 0;
  `}
  `,
};
