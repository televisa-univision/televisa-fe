import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';

/**
 * Get the card position based on its index
 * @param {number} grid - the grid number to use
 * @returns {string}
 */
export const getCardPosition = grid => getFromMap(grid, {
  grid0: css`
    align-items: center;
    display: flex;
    grid-column: 1 / 3;
    grid-row: 1 / 3;
    ${media.md`
      grid-column: 1 / 2;
      grid-row: 1 / 3;
    `}
  `,
  grid1: css`
    grid-column: 1;
    grid-row: 3;
    ${media.md`
      grid-column: 2;
      grid-row: 1;
    `}
  `,
  grid2: css`
    grid-column: 2;
    grid-row: 3;
    ${media.md`
      grid-column: 2;
      grid-row: 2;
    `}
  `,
  grid3: css`
    grid-column: 1;
    grid-row: 4;
    ${media.md`
      grid-column: 3;
      grid-row: 1;
    `}
  `,
  grid4: css`
    grid-column: 2;
    grid-row: 4;
    ${media.md`
      grid-column: 3;
      grid-row: 2;
   `}
  `,
});

export default {
  card: ({ grid }) => css`
    margin-bottom: 16px;

    ${media.sm`
      margin-bottom: 0;
      ${getCardPosition(`grid${grid}`)};
    `}
  `,

  adWrapper: css`
    margin: 16px 0;
  `,

  listCard: ({ listGrid }) => css`
    margin-bottom: 16px;
    ${media.sm`
      margin-bottom: 14px;
      ${listGrid && 'width: 100%;'}
    `}
    ${media.md`
      margin-bottom: 8px;
    `}
    ${media.lg`
      height: 133px;
      margin-bottom: 14px;
    `}
    ${media.xl`
      height: 134px;
      margin-bottom: 15px;
    `}
  `,
};
