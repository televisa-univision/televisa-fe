import { css } from 'styled-components';

import { GREEN_DARKER } from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  labelMVP: css`
    > span {
      color: ${GREEN_DARKER};
      font-family: 'Roboto Flex', sans-serif;
      font-size: ${rem('12px')};
      font-style: normal;
      font-weight: 700;
      letter-spacing: 1px;
      line-height: ${rem('24px')};
      margin-bottom: 5px;
      margin-top: 5px;
      order: 0;
    }
  `,
};
