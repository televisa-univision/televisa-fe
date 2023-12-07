import { css } from 'styled-components';

import {
  BLACK,
  MONTSERRAT_FONT_FAMILY,
  MINE_SHAFT_BLACK,
  ROBOTO_FONT_FAMILY,
  ROBOTO_CONDENSED_FONT_FAMILY,
  GREY_BLACK,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  container: css`
    color: ${BLACK};
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    min-height: 400px;
    padding-top: 10px;
    position: relative;
  `,

  wrapper: css`
    margin-bottom: 16px;
    text-align: center;
    @media (max-width: 767px){
      justify-content: center;
      text-align: left;
    }
  `,

  buttonContainer: css`
    display: flex;
    justify-content: center;
    @media (max-width: 767px){
      justify-content: left;
    }
  `,

  title: css`
    color: ${MINE_SHAFT_BLACK};
    display: flex;
    flex-direction: column;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem('30px')};
    font-weight: 700;
    justify-content: center;
    line-height: 34px;
    margin-bottom: 18px;
    @media (max-width: 767px){
      font-size: ${rem('24px')};
      line-height: 28px;
    }
    @media (max-width: 387px){
      font-size: ${rem('20px')};
      line-height: 24px;
    }
  `,

  subTitle: css`
    color: ${MINE_SHAFT_BLACK};
    font-family: ${ROBOTO_FONT_FAMILY};
    font-size: ${rem('16px')};
    font-weight: 400;
    line-height: 22px;
    @media (max-width: 767px){
      font-size: ${rem('12px')};
      line-height: 16px;
    }
    @media (max-width: 387px){
      font-size: ${rem('10px')};
      line-height: 14px;
    }
  `,

  homeLink: ({ theme }) => css`
    align-items: center;
    background: ${theme};
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: center;
    padding: 12px 16px;
    padding-left: 8px;
    @media (max-width: 767px){
      gap: 4px;
    }
  `,

  text: css`
    color: ${GREY_BLACK};
    display: flex;
    flex-direction: column;
    font-family: ${ROBOTO_FONT_FAMILY};
    font-size: ${rem('16px')};
    font-weight: 400;
    justify-content: center;
    line-height: 22px;
    margin-top: 18px;
    @media (max-width: 767px){
      font-size: ${rem('12px')};
      line-height: 16px;
    }
    @media (max-width: 387px){
      font-size: ${rem('10px')};
      line-height: 14px;
    }
  `,

  buttonText: css`
    &&:hover{
      color: ${WHITE};
    }
    color: ${WHITE};
    font-family: ${ROBOTO_CONDENSED_FONT_FAMILY};
    font-size: ${rem('12px')};
    font-weight: 700;
    letter-spacing: 0.75px;
    line-height: 14px;
    margin: 0px;
    text-transform: uppercase;
  `,
};
