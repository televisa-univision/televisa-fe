import { css, createGlobalStyle } from 'styled-components';
import {
  WHITE, WHITE_GREY, LIGHT_GREY, TROPICAL_RAIN_FOREST, GREY, WHITE_80, WHITE_70,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  wrapper: css`
    padding-top: 20px;
    width: 100%;
  `,

  title: css`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    width: 100%;
    > div {
      padding-bottom: 0;
    }
  `,

  nav: ({ hide }) => css`
    height: 40px;
    width: 289px;
    ${media.sm`
      width: auto;
    `}
    ${hide && css`
      ${media.lg`
        display: none;
      `}
    `}
  `,

  mobileSlier: css`
     width: 100%;
  `,

  slider: css`
    margin: 0 auto;
    padding-bottom: 7px;
    width: 100%;
    z-index: 3;
    ${media.xs`
      margin: 0 0 10px;
    `}
    ${media.md`
      width: 102%;
    `}
  `,

  carWrapper: css`
    padding: 0 10px 4px;
    width: 305px;
    ${media.sm`
      margin: 0;
      width: 365px;
    `}
    ${media.md`
      width: 330px;
    `}
    ${media.lg`
      width: 310px;
    `}
  `,

  card: css`
    border: 2px solid ${WHITE_GREY};
    padding: 0 6px 6px;
    width: 295px;
    ${media.sm`
      margin: 0;
      width: 355px;
    `}
    ${media.md`
      width: 320px;
    `}
    ${media.lg`
      width: 300px;
    `}
  `,

  navButton: ({ isActive }) => css`
    background: ${isActive ? TROPICAL_RAIN_FOREST : LIGHT_GREY};
    height: 40px;
    margin-right: 5px;
    width: 40px;
    button {
      height: 40px;
      width: 40px;
    }
    p {
      color: ${WHITE};
      text-transform: uppercase;
    }
    &:hover {
      background: ${TROPICAL_RAIN_FOREST};
    }
  `,

  oneCard: css`
    border: 2px solid ${WHITE_GREY};
    margin: 20px auto 0 auto;
    padding: 0 6px 6px;
    width: 100%;
    ${media.sm`
      width: 80%;
    `}
    ${media.md`
      width: 60%;
    `}
  `,

  global: createGlobalStyle`
    .slick-slider {
      > button {
        &:hover, &:focus  {
          background: ${WHITE_70};
        }
      }
      > button:last-of-type {
        background: ${WHITE_80};
        height: 100%;
        width: 50px;
        > svg {
          filter: drop-shadow( -1px 0 1px ${GREY} );
        }
      }
      > button:first-of-type {
        background: ${WHITE_80};
        height: 100%;
        width: 50px;
        z-index: 1;
        > svg {
          filter: drop-shadow( 1px 0 1px ${GREY} );
        }
      }
    }
  `,
};
