import { css } from 'styled-components';
import media from '@univision/fe-utilities/styled/mixins/media';
import { ASPHALT, CLARET } from '@univision/fe-utilities/styled/constants';

export default {
  wrapper: css`
    background: linear-gradient(360deg, ${ASPHALT} 1.04%, ${CLARET} 91.98%);
    display: grid;
    gap: 16px 8px;
    grid-template-columns: repeat(2, 1fr);
    padding: 24px;

    ${media.md`
      grid-template-columns: repeat(8, 1fr);
    `}
  `,
};
