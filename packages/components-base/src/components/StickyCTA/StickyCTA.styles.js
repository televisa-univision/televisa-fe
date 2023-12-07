import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  WHITE,
  WHITE_50,
  ZINDEX_ABOVE_NAVIGATION,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  fullWidth: ({ hide, backgroundColor }) => css`
    background-color: ${backgroundColor};
    bottom: 0;
    left: 0;
    opacity: 1;
    position: fixed;
    transition: opacity .5s ease-in-out;
    width: 100%;
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 130};

    ${hide && css`
      height: 0px;
      opacity: 0;
    `}
  `,

  wrapper: ({ hasClose }) => css`
    align-items: center;
    color: ${WHITE};
    display: flex;
    font-size: ${rem('14px')};
    justify-content: space-between;
    line-height: ${rem('17px')};
    padding: 10px 10px;

    ${hasClose && css`
      min-height: 140px;
    `}

    ${media.sm`
      font-size: ${rem('16px')};
      min-height: auto;
      line-height: ${rem('20px')};
    `}

    span a {
      color: ${WHITE};
      font-weight: 400;
      text-decoration: underline;
    }
  `,

  text: css`
    padding-left: 24px;
    padding-right: 5px;
    width: 100%;

    ${media.sm`
      padding-left: 5px;
    `}
  `,

  ctaBtn: css`
    border: 1px solid ${WHITE_50};
    border-radius: 4px;
    margin-left: 10px;
    margin-right: 10px;
    min-height: 40px;
    min-width: 124px;

    span {
      color: ${WHITE};
      font-size: ${rem('12px')};
      font-weight: 400;
    }

    &:hover {
      border-color: transparent;
    }

    ${media.sm`
      min-width: 174px;
    `}
  `,

  closeBtn: css`
    height: 24px;
    margin-left: 20px;
    position: absolute;
    right: 16px;
    top: 16px;

    ${media.sm`
      position: relative;
      top: auto;
      right: auto;
    `}
  `,
};
