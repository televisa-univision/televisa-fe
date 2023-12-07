import { css } from 'styled-components';
import {
  BLACK_GREY,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  description: css`
    font-size: ${rem('16px')};
    line-height: ${rem('22px')};
    margin-bottom: 24px;
  `,
  mainTitle: css`
    font-size: ${rem('32px')};
    line-height: ${rem('36px')};
    margin: 0;
  `,
  year: css`
    font-size: ${rem('28px')};
    line-height: ${rem('32px')};
    margin: 0;
    ${media.sm`
      margin: 0 21px 0 0;
    `}
    a {
      color: ${BLACK_GREY};
    }
`,
  yearWrapper: css`
    display: grid;
    gap: 15px;
    grid-template-areas: "a a a a";
    ${media.sm`
      gap: 21px;
      grid-template-areas: "a a a a a a";
    `}
  `,
  wrapper: css`
    color: ${BLACK_GREY};
    padding: 0 15px;
    width: 100%;
    ${media.sm`
      padding: 0;
      width: 540px;
    `}
  `,
};
