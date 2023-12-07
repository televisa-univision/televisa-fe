import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { VERY_LIGHT_GREY, LIGHT_GREY, WHITE } from '@univision/fe-utilities/styled/constants';

export default {
  container: css`
    padding: 0 10px;

    ${media.sm`
      padding: 0 20px;
    `}
  `,
  performanceInfo: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${media.sm`
      padding-top: 0;
    `}
  `,
  onAir: css`
    color: ${VERY_LIGHT_GREY};
    font-size: ${rem('9px')};
    line-height: ${rem('11px')};
    margin-bottom: 5px;
    text-transform: uppercase;

    ${media.sm`
      margin-bottom: 10px;
    `}
  `,
  wave: css`
    margin: 0 10px;

    path {
      fill: ${WHITE};
    }
  `,
  title: css`
    color: ${WHITE};
    font-size: ${rem('18px')};
    font-weight: 700;
    line-height: ${rem('22px')};
    margin: 0;
    max-height: 44px;
    min-width: 100%;
    overflow: hidden;
    padding: 0;
    text-align: center;
    text-transform: uppercase;

    ${media.sm`
      max-width: 384px;
      margin-bottom: 5px;
      max-height: 50px;
      -webkit-font-smoothing: antialiased;
    `}
  `,
  artist: css`
    color: ${LIGHT_GREY};
    font-size: ${rem('14px')};
    font-weight: 400;
    line-height: ${rem('17px')};
    margin: 0;
    text-transform: initial;

    ${media.sm`
      -webkit-font-smoothing: antialiased;
    `}
  `,
  launcherWrap: css`
    bottom: -5px;
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    width: 280px;

    ${media.sm`
      position: relative;
      margin-bottom: -2rem;
      width: auto;
    `}
  `,
  launch: css`
    div {
      button {
        font-size: ${rem('9px')};
        line-height: ${rem('11px')};
      }
    }
  `,
};
