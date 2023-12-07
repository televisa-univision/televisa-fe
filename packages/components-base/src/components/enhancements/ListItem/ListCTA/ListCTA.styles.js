import { css } from 'styled-components';

import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import {
  DAISY_BUSH,
  PURPLE_HEART,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  buttonLink: css`
    &&& {
      align-items: center;
      background: ${linearGradient({ start: DAISY_BUSH, end: PURPLE_HEART })};
      border-radius: 4px;
      color: ${WHITE};
      display: flex;
      height: 48px;
      justify-content: center;
      line-height: ${rem(14)};
      padding: 0 20px;
      text-decoration: none;
      width: 100%;  
      
      &:hover {
        background: ${PURPLE_HEART};
      }
    }  
    
    ${media.sm`
      flex-direction: row;
      width: 138px;
    `}
  `,
  buttonWrapper: css`
    background: ${linearGradient({ start: DAISY_BUSH, end: PURPLE_HEART })};
    border-radius: 4px;
    color: ${WHITE};
    display: flex;
    justify-content: center;
    width: 100%;
    
    ${media.sm`
      width: auto;
    `}
  `,
  title: css`
    &&& {      
      font-family: 'Roboto Condensed', Roboto, sans-serif;
      font-size: ${rem('18px')};
      margin-bottom: 12px;      
      
      ${media.sm`
        font-size: ${rem('20px')};
        margin-right: 15px;
      `}
    }
    
  `,
  wrapper: css`
    align-content: flex-end;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 10px 0;
    padding: 0;
    text-align: center;
    width: 100%;

    ${media.sm`
      flex-direction: row;
    `}
  `,
};
