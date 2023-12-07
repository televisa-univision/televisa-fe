import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { BLACK, GREY, WHITE } from '@univision/fe-utilities/styled/constants';

import bg from '../../../../assets/images/radio-default-360.jpg';

const BLUR = '10px';

export default {
  performanceWrapper: css`
    background: ${BLACK};
    margin-bottom: 1.5rem;
    position: relative;

    ${media.sm`
      overflow: hidden;
    `}
  `,
  image: css`
    opacity: 0;
    position: absolute;
    visibility: hidden;
  `,
  backgroundArt: css`
    background: ${BLACK} url(${bg}) center center no-repeat;
    background-size: cover;
    bottom: -${BLUR};
    display: none;
    filter: blur(${BLUR});
    left: -${BLUR};
    opacity: 0.5;
    position: absolute;
    right: -${BLUR};
    top: -${BLUR};
    visibility: hidden;

    &::after {
      background-image: linear-gradient(180deg,transparent 30%, ${BLACK});
      background-repeat: repeat-x;
      bottom: 0;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }

    ${media.sm`
      visibility: visible;
      display: block;
    `}
  `,
  performance: css`
    color: ${WHITE};
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    text-align: center;

    ${media.sm`
      flex-direction: row;
      justify-content: center;
      align-items: center;
    `}
  `,
  albumArt: css`
    background: ${GREY} url(${bg}) top center no-repeat;
    background-size: cover;
    height: 320px;
    width: 100%;

    ${media.sm`
      height: 192px;
      margin: ${rem('25px')} 3rem ${rem('25px')} 0;
      width: 383px;
    `}
  `,
  metadata: css`
    background: linear-gradient(to bottom, fade-out(${BLACK}, 1) 0%, fade-out(${BLACK}, .1) 80%);
    bottom: 0;
    height: 135px;
    left: 0;
    position: absolute;
    right: 0;

    ${media.sm`
      position: inherit;
      background: transparent;
      width: 300px;
      margin: 0 20px;
      height: auto;
    `}
  `,
};
