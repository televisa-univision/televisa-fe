import { css } from 'styled-components';
import {
  CHARADE,
  DARKER_GREY,
  VERY_LIGHT_GREY,
  TRANSPARENT,
  WHITE,
  SPRING_GREEN,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  link: ({ isWorldCupMVP }) => css`
    color: ${CHARADE};
    display: flex;
    padding: 16px;
    width: 100%;

    &:hover {
      color: ${CHARADE};
    }

    ${isWorldCupMVP && css`
      color: ${WHITE};
      font-family: 'Roboto Flex', sans-serif;

      &:hover {
        color: ${SPRING_GREEN};
      }
    `}
  `,
  mainList: css`
    display: flex;
    flex-direction: column;
    list-style-type: none;
    margin: 0 auto;
    padding: 0;
  `,
  mainMenuItem: ({ isWorldCupMVP }) => css`
    border-radius: 3px;
    color: ${DARKER_GREY};
    cursor: pointer;
    display: block;
    max-width: max-content;
    min-width: 100%;
    width: max-content;

    &:hover {
      background-color: ${VERY_LIGHT_GREY};
    }

    ${isWorldCupMVP && css`
      line-height: ${rem(20)};

      &:hover {
        background-color: ${TRANSPARENT};
      }
    `}
  `,
  wrapper: css`
    width: 100%;
  `,
};
