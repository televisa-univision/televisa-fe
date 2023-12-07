import { css } from 'styled-components';
import { media, mediaRange } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  APP_BREAKPOINTS,
  ASTRONAUT,
  DARK_BLUE,
  MIDNIGHT_EXPRESS,
  VERY_LIGHT_GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { GREY, GREY_BLACK_LIGHT } from '@univision/shared-components/dist/constants/stylesVariables';

export default {
  container: css`
    display: flex;
    flex-wrap: wrap;

    ${media.md`
      flex-wrap: nowrap;
    `}
  `,
  dropDownWrapper: css`
    && {
      background-color: ${VERY_LIGHT_GREY};
      font-family: 'Roboto Condensed', Roboto, sans-serif;
      font-size: ${rem('16px')};
      line-height: ${rem('22px')};
      outline: none;
      padding: 8px 16px 8px 8px;
    }
  `,
  form: css`
    margin-bottom: 15px;

    & input:focus {
      border-color: ${DARK_BLUE};
    }

    ${media.md`
      margin-bottom: 24px;
    `}
  `,
  filters: css`
    && {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 25px;

      ${media.md`
        align-self: flex-start;
        width: 100%;
        padding-right: 40px;
      `}

      > div {
        width: 100%;
        ${mediaRange(620, APP_BREAKPOINTS.md, css`width: 49%;`)}
      }

      > div:not(:last-child) {
        border-color: transparent;
        border-radius: 4px;
        display: inline-block;
        margin-bottom: 15px;
        max-width: unset;
        overflow: hidden;
      }

      &::after {
        border-right: 1px solid ${GREY_BLACK_LIGHT};
        box-sizing: border-box;
        content: '';
        display: none;
        height: 100%;
        opacity: 0.31;
        position: absolute;
        right: 20px;
        top: 0;
        width: 1px;

        ${media.md`
          display: inline-block;
        `}
      }
    }
  `,
  header: css`
    display: flex;
    padding-bottom: 16px;
    position: relative;
    width: 100%;

    &::after {
      background: linear-gradient(45deg, ${DARK_BLUE} 0%, ${DARK_BLUE} 40.08%, ${MIDNIGHT_EXPRESS} 100%);
      bottom: 15px;
      content: '';
      display: block;
      height: 2px;
      margin-top: 16px;
      position: absolute;
      width: 100%;
    }
  `,
  link: css`
    align-items: center;
    color: ${ASTRONAUT};
    display: inline-flex;
    font-size: ${rem('12px')};
    justify-content: space-evenly;
    letter-spacing: 0.75px;
    line-height: ${rem('14px')};
    text-transform: uppercase;
  `,
  title: css`
    color: ${ASTRONAUT};
    font-size: ${rem('20px')};
    letter-spacing: 0;
    line-height: ${rem('24px')};
    margin-bottom: 12px;
  `,
  postJobApply: css`
    && {
      &:hover {
        color: ${ASTRONAUT};
      }
      & > svg {
        fill: ${GREY};
        margin-right: 4px;
      }
    }
  `,
  postJobAnchor: css`
    && {
      display: inline-block;
      margin-left: auto;
    }
  `,
  postJobMobile: css`
    && {
      display: block;
      ${media.md`
        display: none;
      `}
    }
  `,
  postJobDesktop: css`
    && {
      display: none;
      ${media.md`
        display: block;
      `}
    }
  `,
};
