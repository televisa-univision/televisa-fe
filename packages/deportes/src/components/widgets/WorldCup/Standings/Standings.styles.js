import { css } from 'styled-components';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { ASPHALT, CLARET, SPRING_GREEN } from '@univision/fe-utilities/styled/constants';

export default {
  button: css`
    background-color: ${SPRING_GREEN};

    .uvs-font-c-bold {
      font-family: 'Roboto Flex', sans-serif;
      font-size: ${rem(11)};
      font-weight: 700;
      letter-spacing: 0.5px;
      margin-right: 0;
    }

    ${media.md`
      width: 187px;
    `}
  `,
  moreButton: css`
    ${media.md`
      grid-column: span 4;
      display: flex;
      justify-content: center;
    `}
  `,
  standingGroup: css`
    margin-bottom: 16px;

    ${media.md`
      margin-bottom: 0;
    `}
  `,
  wrapper: css`
    background: linear-gradient(360deg, ${ASPHALT} 1.04%, ${CLARET} 91.98%);
    padding: 24px;

    ${media.md`
      display: grid;
      gap: 21px 8px;
      grid-template-columns: repeat(4, 1fr);
    `}
  `,
};
