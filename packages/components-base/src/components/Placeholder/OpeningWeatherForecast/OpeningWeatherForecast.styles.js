import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import {
  ALICE_BLUE,
  BLACK_SQUEEZE,
  BLACK_08,
  DARK_BLUE,
  MIDNIGHT_EXPRESS,
  VERY_LIGHT_GREY,
} from '@univision/fe-utilities/styled/constants';

export default {
  container: css`
    padding-left: 19px;
    padding-right: 19px;
    padding-top: 67px;
  `,
  skWrapper: css`
    min-height: 190px;

    ${media.sm`
      min-height: 152px;
    `}

    ${media.md`
      min-height: 138px;
    `}
  `,
  weatherConditionWrapper: css`
    background: ${linearGradient({ direction: 'to right', start: ALICE_BLUE, end: BLACK_SQUEEZE })};
    border-radius: 5px;
    border-top: 1px solid ${VERY_LIGHT_GREY};
    box-shadow: 0 2px 4px 0 ${BLACK_08};
    display: flex;
    flex-direction: column;
    height: 123px;
    width: 100%;

    ${media.md`
      height: 70px;
    `}
  `,
  wrapper: css`
    background: ${linearGradient({ direction: '45deg', start: DARK_BLUE, end: MIDNIGHT_EXPRESS })};
    height: 90px;
  `,
};
