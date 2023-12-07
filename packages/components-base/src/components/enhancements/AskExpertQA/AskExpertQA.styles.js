import { css } from 'styled-components';
import { rem, media } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  ASTRONAUT, DARKER_GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  quesAnsContainer: css`
    height: auto;
    width: 100%;
  `,
  quesAnsLabel: css`
    margin-bottom: 16px;

    ${media.xs`
      margin-bottom: 27px;
    `}
  `,
  quesAnsLabelText: css`
    color: ${DARKER_GREY};
    font-size: ${rem(11)};
    line-height: ${rem(13)};
    margin-bottom: 0;
    text-transform: uppercase;

    &:after{
      background-color: ${ASTRONAUT};
      content:'';
      display: block;
      height: 1px;
      margin-top: 10px;
      width: 40px;
    }
  `,
  questionListContainer: css`
    margin-bottom: 32px;

    ${media.xs`
      margin-bottom: 43px;
    `}
  `,
};
