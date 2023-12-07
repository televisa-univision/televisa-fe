import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  cards: css`
    ${media.sm`
      display: grid;
      grid-column-gap: 14px;
      grid-row-gap: 14px;
      grid-template-columns: repeat(2, 357px);
      grid-template-rows: repeat(3, 357px) 448px;
  `}
    ${media.md`
      grid-column-gap: 12px;
      grid-row-gap: 16px;
      grid-template-columns: 488px repeat(2, 236px);
      grid-template-rows: repeat(2, 236px);
  `}
    ${media.lg`
      grid-column-gap: 19px;
      grid-row-gap: 22px;
      grid-template-columns: 610px repeat(2, 294px);
      grid-template-rows: repeat(2, 294px);
  `}
    ${media.xl`
      grid-template-columns: 622px repeat(2, 300px);
      grid-template-rows: repeat(2, 270px);
  `}
  `,

  listGrid: css`
    margin-bottom: 16px;

    ${media.sm`
      margin-bottom: 0;
      grid-column: 1/3;
      grid-row: 4;
    `}

    ${media.md`
      grid-column: 3;
      grid-row: 1/3;
    `}
  `,
};
