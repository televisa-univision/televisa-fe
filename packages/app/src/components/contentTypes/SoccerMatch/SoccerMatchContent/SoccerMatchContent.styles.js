import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  headline: css`
    font-size: ${rem('28px')};
    line-height: ${rem('32px')};
    margin: 1rem auto;
    text-align: center;

    ${media.sm`
      margin-top: ${rem('24px')};
      max-width: 1046px;
      font-size: ${rem('38px')};
      line-height: ${rem('44px')};
    `}
  `,
};
