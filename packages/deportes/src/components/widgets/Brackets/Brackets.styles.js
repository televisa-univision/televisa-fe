import { css } from 'styled-components';
import {
  VERY_LIGHT_GREY,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  title: css`
    width: 100%;
    > div {
      padding: 0;
    }
 `,

  container: css`
    margin-top: 20px;
  `,

  content: css`
    display: flex;
    justify-content: center;
    width: 100%;
  `,

  mobileNav: css`
    overflow-x: auto;
    width: 100%;
  `,

  nav: ({ withScroll }) => css`
    ${withScroll && css`
      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      overflow-x: auto;
      ${media.sm`
        overflow-x: visible;
      `}
    `}   
  `,

  headerWrapper: css`
    padding: 0 23px;
    ${media.sm`
      padding: 0;
    `}
  `,

  navWrapper: css`
    background: none;
    background: ${VERY_LIGHT_GREY};
    border-left: none;
    padding-top: 0;
    ${media.sm`
      padding-left: 0;
    `}
  `,
};
