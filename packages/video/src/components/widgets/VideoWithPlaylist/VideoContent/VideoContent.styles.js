import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import mediaRange from '@univision/fe-utilities/styled/mixins/mediaRange';
import numberOfLines from '@univision/fe-utilities/styled/mixins/numberOfLines';
import {
  APP_BREAKPOINTS,
  BLACK,
  DARK_VARIANT,
  LIGHT_VARIANT,
  WHITE,
  ZINDEX_REACTION,
} from '@univision/fe-commons/dist/utils/styled/constants';

const variantFg = {
  [DARK_VARIANT]: WHITE,
  [LIGHT_VARIANT]: BLACK,
};

export default {
  wrapper: css`
    padding: 4px 16px;

    ${media.md`
      padding: 4px 0;
    `}
  `,

  content: css`
    height: 116px;
    position: relative;
  `,

  label: ({ isWorldCupMVP }) => css`
    position: relative;
    ${isWorldCupMVP && css`
    .uvs-font-c-bold{
      font-family: 'Poppins', sans-serif;
      font-size: ${rem('12px')};
      font-weight: 700;
      line-height: ${rem('12px')};
    }
    `}
  `,

  labelWrapper: css`
    align-items: center;
    display: flex;
    height: 40px;
    justify-content: space-between;
    position: relative;

    ${media.md`
      height: 48px;
      justify-content: space-between;
    `}
  `,

  actionBar: css`
    margin: 0 -16px;
    z-index: ${ZINDEX_REACTION};
    ${media.md`
      margin: 0;
      width: 376px;
      > div > div:last-child {
        right: 16px;
      }
    `}
  `,

  title: ({ isWorldCupMVP, variant }) => css`
    color: ${variantFg[variant]};
    font-size: ${rem('16px')};
    line-height: ${rem('20px')};
    text-align: left;
    ${media.md`
      font-size: ${rem('20px')};
      line-height: ${rem('24px')};
    `}
    ${!isWorldCupMVP && mediaRange(APP_BREAKPOINTS.xxs, APP_BREAKPOINTS.xs, `
      ${numberOfLines(3)}
      &&& {
        font-size: ${rem('12px')};
        line-height: ${rem('14px')};
        margin-top: 8px;
      }
    `)}
    ${isWorldCupMVP && css`
      font-size: ${rem('16px')};
      line-height: ${rem('20px')};
      ${media.md`
        font-size: ${rem('26px')};
        line-height: ${rem('26px')};
      `}
    `}
  `,
  branding: css`
    align-items: center;
    display: flex;
    flex-direction: row;
    font-size: ${rem('18px')};
    height: 48px;
    justify-content: flex-start;
  `,
};
