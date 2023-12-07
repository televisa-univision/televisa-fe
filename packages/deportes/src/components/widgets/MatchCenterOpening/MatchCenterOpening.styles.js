import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { VERY_LIGHT_GREY } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  container: css`
    background-color: ${VERY_LIGHT_GREY};
  `,

  wrapper: css`
    padding: 0;
    width: 100%;
  `,

  scoreCard: ({ isCompact }) => css`
    max-width: 1260px;
    transition: height 0.3s ease-out;

    ${isCompact && css`
      margin: 0 auto;
    `}

    ${media.sm`
      margin: 0 auto;
    `}
  `,

  message: css`
    align-items: center;
    color: $black;
    display: flex;
    font-size: ${rem('14px')};
    justify-content: center;
    padding: 30px 0;
    text-align: center;
    text-transform: uppercase;
  `,
};
