import { css } from 'styled-components';
import { mediaRange, rem, numberOfLines } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  APP_BREAKPOINTS,
  ASTRONAUT, BLACK_20, BLACK_GREY, GRADIENT_ASTRONAUT_CHAMBRAY, GREY_BLACK, WHITE_GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  labelContent: css`
    margin-bottom: 8px;
  `,

  dataTitle: css`
    color: ${ASTRONAUT};
    display: block;
    font-size: ${rem('12px')};
    letter-spacing: 1px;
    line-height: ${rem('14px')};
    margin-bottom: 8px;
    text-transform: uppercase;
   `,

  dataContent: ({ hasAdSkin }) => css`
  && {
    color: ${BLACK_GREY} ;
    font-size: ${rem('14px')};
    letter-spacing: 0;
    line-height: ${rem('18px')};
    margin: ${hasAdSkin ? '0' : '0 0 8px'}; 
    text-transform: none;
    ${numberOfLines(3)};
 
    @media (min-width: ${APP_BREAKPOINTS.md + 1}px) {
      font-size: ${hasAdSkin ? rem('14px') : rem('18px')}; 
      line-height: ${hasAdSkin ? rem('18px') : rem('22px')}; 
    }
  
    ${mediaRange(APP_BREAKPOINTS.md, APP_BREAKPOINTS.md, `
      font-size: ${rem('14px')}; 
      line-height: ${rem('18px')}; 
      margin: 0; 
     `)}
   }
  `,

  dataTime: css`
    color: ${GREY_BLACK};  
    display: block;
    font-size: ${rem('10px')};
    letter-spacing: 1px;
    line-height: ${rem('14px')};
    text-transform: uppercase;

    ${mediaRange(APP_BREAKPOINTS.md, APP_BREAKPOINTS.md, `
     display: none; 
  `)}
   `,

  dataContainer: ({ hasAdSkin }) => css`
   border-bottom: 1px solid ${WHITE_GREY}; 
   box-sizing: border-box;
   margin: 0 14px 12px 2px;
   padding-bottom: 12px;

   @media (min-width: ${APP_BREAKPOINTS.md + 1}px) {
     margin: 0 16px 16px 2px;
     padding-bottom: 16px;
    }

   ${mediaRange(APP_BREAKPOINTS.md, APP_BREAKPOINTS.md, `
     margin-bottom: 16px; 
   `)}

   &:last-of-type {
     border-bottom: none;
     margin-bottom: ${hasAdSkin ? '0' : '16px'}; 
     padding-bottom: 0;

    @media (min-width: ${APP_BREAKPOINTS.md + 1}px) {
      margin-bottom: ${hasAdSkin ? '0' : '27px'}; 
    }

    ${mediaRange(APP_BREAKPOINTS.md, APP_BREAKPOINTS.md, `
      margin-bottom: 0; 
   `)}
   }
  `,

  title: css`
  && {
    color: ${ASTRONAUT}; 
    font-size: ${rem('20px')};
    font-weight: 900;
    letter-spacing: 0;
    line-height: ${rem('24px')};
    margin: 0 0 8px;
  }
  `,

  titleBar: ({ hasAdSkin }) => css`
    background: ${GRADIENT_ASTRONAUT_CHAMBRAY};
    height: 2px;
    margin: ${hasAdSkin ? '0 16px 16px 0' : '0 16px 24px 0'}; 

    ${mediaRange(APP_BREAKPOINTS.md, APP_BREAKPOINTS.md, `
     margin: 0 16px 16px 0; 
   `)}
   `,

  listWrapper: css`
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 ${BLACK_20};
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    padding: 16px 0 0 16px;
   `,
};
