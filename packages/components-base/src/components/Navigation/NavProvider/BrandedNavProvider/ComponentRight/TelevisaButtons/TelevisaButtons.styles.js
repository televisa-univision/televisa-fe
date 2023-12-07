import { css } from 'styled-components';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  container: css`
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding-right: 10px;
    ${media.sm`
      padding-right: 12px;
    `}
    @media (max-width: 375px) {
      gap: 4px;
    }
  `,
};
