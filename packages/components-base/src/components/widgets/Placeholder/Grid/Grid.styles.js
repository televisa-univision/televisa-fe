import { css } from 'styled-components';

import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import { BLACK_08, GREY } from '@univision/fe-commons/dist/utils/styled/constants';

import { getCardPosition } from '../../../cards/helpers';

export default {
  container: css`
    margin-bottom: 40px;
    padding-bottom: 16px;

    ${media.md`
      display: grid;
      grid-column-gap: 16px;
      grid-row-gap: 8px;
      grid-template: repeat(2, 1fr) / repeat(3, 1fr);
  `}
  `,
  titleContainer: css`
    background: ${GREY};
    height: 20px;
    margin: 14px 0;
    opacity: .1;
    width: 75%;

    ${media.sm`
      width: 32.6%;
    `}
  `,
  titleBar: css`
    background: ${GREY};
    height: 2px;
    opacity: .1;
    width: 100%;
  `,
  card: ({ index }) => css`
    background: ${GREY};
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 ${BLACK_08};
    margin-bottom: 16px;
    opacity: .1;

    ${media.md`
      margin-bottom: 0;

      ${getCardPosition(index)};
    `}

  `,
};
