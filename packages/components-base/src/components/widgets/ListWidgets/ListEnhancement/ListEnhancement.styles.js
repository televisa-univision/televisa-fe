import { css } from 'styled-components';

import STRIPED_BACKGROUND from '@univision/fe-commons/dist/assets/images/striped-background.svg';
import darkModeWidgetWrapper from '@univision/fe-utilities/styled/mixins/darkModeWidgetWrapper';
import flavorWidgetWrapper from '@univision/fe-utilities/styled/mixins/flavorWidgetWrapper';
import {
  WHITE,
  INTERNATIONAL_ORANGE, ORANGE,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  adBackground: css`
    background: url(${STRIPED_BACKGROUND});
    height: 100%;
    width: 100%;
  `,
  stickyAdWrapper: css`
    position: sticky;
    top: 0;
  `,
  wrapper: ({
    backgroundImage,
    flavor,
    isDark,
    primary,
    enablePadding,
  }) => css`
    ${darkModeWidgetWrapper({ isDark })}
    ${flavorWidgetWrapper({
    flavor,
    backgroundImage,
    primary,
    enablePadding,
  })}
  `,
  buttonLink: ({ isWorldCupMVP }) => css`
    &&& {
      align-items: center;
      background: ${INTERNATIONAL_ORANGE};
      border-radius: 4px;
      color: ${WHITE};
      display: flex;
      font-family: 'Roboto Condensed', Roboto, sans-serif;
      font-size: ${rem(11)};
      height: 48px;      
      justify-content: center;
      letter-spacing: 0.75px;
      line-height: ${rem(11)}; 
      margin-bottom: 30px;
      margin-top: 14px;
      padding: 0 20px;
      text-decoration: none;
      width: 196px;
      span, div {
        padding: .5rem 0;
      }
      &:hover {
        background: ${ORANGE};
      }
    ${isWorldCupMVP && css`
      font-family: 'Roboto Flex', sans-serif;
      font-size: ${rem(12)};
      font-style: normal;
      font-weight: 700;
      letter-spacing: 0.75px;
      line-height:  ${rem(14)};
    `}
    }  
    
    ${media.sm`
      flex-direction: row;
      width: 138px;
    `}
  `,
};
