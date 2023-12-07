import { css } from 'styled-components';
import {
  rem,
  mediaRange,
  media,
  numberOfLines,
} from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  ASTRONAUT, APP_BREAKPOINTS, BASELINE_CARDS, BLACK_GREY, BLACK,
} from '@univision/fe-commons/dist/utils/styled/constants';

/**
 * Question common css
 * @returns {string}
 */
const questionStyle = () => `
  font-size: ${rem(16)};
    
  ${mediaRange(APP_BREAKPOINTS.xxs, BASELINE_CARDS, `
    line-height: ${rem(22)};
  `)};

  line-height: ${rem(19)};
  margin: 0;
`;

export default {
  answer: ({ hasElipsis }) => css`
    color: ${BLACK_GREY};
    font-size: ${rem(16)};
    font-weight: 300;
    line-height: ${rem(19)};

    ${!hasElipsis && css`
      ${numberOfLines(2)};
    `}

      ${mediaRange(APP_BREAKPOINTS.xxs, BASELINE_CARDS, `
        line-height: ${rem(22)};
      `)};

    margin: 0;
    `,
  questionAnsVideoWrapper: ({ isOnlyQues }) => css`
    margin-bottom: 39px;

    ${media.xs`
      margin-bottom: 46px;
    `}

    ${isOnlyQues && css`
      margin-bottom: 16px;

      ${media.xs`
        margin-bottom: 22px;
      `}
    
    `}
  `,
  quesAnsIdx: ({ isOnlyQues }) => css`
    color: ${BLACK};
    font-size: ${rem(18)};
    grid-row-end: 4;
    grid-row-start: 1;

    ${isOnlyQues && css`
        color: ${ASTRONAUT};
        grid-row-end: 1;
    `}

    line-height: ${rem(22)};
    margin: 0;
  `,
  quesContainer: ({ isOnlyQues }) => css`
    display: grid;
    grid-gap: 5px 10px;
    grid-template-columns: 20px auto;
    grid-template-rows: auto;
    margin-top: 16px;

    ${media.xs`
      margin-top: 27px;
    `}

    ${isOnlyQues && css`
      margin-top: 0;
    `}
  `,
  questionHeading: css`
    color: ${BLACK};
    ${questionStyle}
    `,
  questionLink: css`
    && {
      color: ${ASTRONAUT};
    }
    font-weight: bold;
    text-decoration: underline;
    ${questionStyle}
  `,
};
