import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { ASTRONAUT, DARK_BLUE, LIGHT_GREY } from '@univision/fe-commons/dist/utils/styled/constants';
import { BLACK_GREY } from '@univision/fe-utilities/styled/constants';

export default {
  attachResume: css`
    align-items: center;
    display: flex;
    flex-direction: row;
  `,
  clickHere: css`
    cursor: pointer;
    text-decoration: underline;
  `,
  closeIcon: css`
    cursor: pointer;
    margin-left: 15px;
  `,
  checkbox: css`
    background-color: transparent;
    border: 2px solid ${ASTRONAUT};
    border-radius: 5px;
    cursor: pointer;
    height: 24px;
    left: 0;
    position: absolute;
    top: 0px;
    width: 24px;
  `,
  checkboxInput: css`
    cursor: pointer;
    opacity: 0;
    position: absolute;
  `,
  checkboxWrapper: css`
    display: flex;
    margin-top: 16px;
  `,
  inputFile: css`
    display: none;
  `,
  inputWrapper: css`
    clear: both;
    display: inline-block;
    font-size: 22px;
    height: 30px;
    line-height: 24px;
    margin-right: 10px;
    position: relative;
    width: 30px;
  `,
  paperClip: css`
    margin-right: 10px;
  `,
  title: css`
    color: ${BLACK_GREY};
    font-size: ${rem('16px')};
    font-weight: bold;
    letter-spacing: 0;
    line-height: ${rem('19px')};
    text-transform: uppercase;
  `,
  text: css`
    color: ${ASTRONAUT};
    cursor: pointer;
    font-size: ${rem('12px')};
    font-weight: bold;
    letter-spacing: 1px;
    line-height: ${rem('14px')};
    margin: 14px 0;
  `,
  termsText: css`
    color: ${BLACK_GREY};
    font-size: ${rem('14px')};
    letter-spacing: 0;
    line-height: ${rem('22px')};
    width: 80%;

    & > a {
      color: ${ASTRONAUT};
      font-weight: 900;
      text-decoration: underline;
    }
  `,
  wrapper: css`
    border: 1px solid ${LIGHT_GREY};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    float: right;
    justify-content: space-around;
    margin: 0 0 25px 45px;
    padding: 25px;
    position: relative;
    width: 100%;

    ${media.xs`
      width: 345px;
    `}

    input:focus {
      border-color: ${DARK_BLUE};
    }
  `,
  input: css`
    && {
      margin: 8px 0;
    }
  `,
};
