import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  noInfo: css`
  align-items: center;
  display: flex;
  font-size: ${rem('14px')};
  justify-content: center;
  padding: 14px 0;
  text-transform: uppercase;
  `,

  lineup: css`
    flex: 1;
  `,
};
