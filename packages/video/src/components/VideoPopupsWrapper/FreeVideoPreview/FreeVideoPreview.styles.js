import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { BLACK, WHITE, ZINDEX_ABOVE_NAVIGATION } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  wrapper: css`
    align-items: center;
    bottom: 150px;
    display: flex;
    height: auto;
    justify-content: center;
    left: 0;
    margin: auto;
    max-width: calc(100% - 32px);
    position: fixed;
    right: 0;
    width: auto;
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 42};
    ${media.sm`
      bottom: 80px;
    `},
    ${media.lg`
      max-width: 1024px;
    `},
  `,
  container: ({ theme }) => css`
    align-items: flex-end;
    background: ${theme?.horizontalLeftGradient || BLACK};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    padding: 16px;
    ${media.sm`
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
    `},
    ${media.md`
      max-width: 1024px;
      padding: 16px 24px;
      width: 100%;
    `}
    }
  `,
  infoAlert: css`
    color: ${WHITE};
    font-size: ${rem('14px')};
    line-height: ${rem('18px')};
  `,
  login: css`
    color: ${WHITE};
    font-size: ${rem('12px')};
    font-weight: bold;
    line-height: ${rem('14px')};
    margin-top: 16px;
    min-width: 136px;
    text-transform: uppercase;
    ${media.sm`
      margin-top: 0;
      margin-left: 20px;
    `}
  `,
};
