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
    margin-bottom: 40px;
  `,
  monthWrapper: css`
    display: grid;
    gap: 13px;
    grid-template-areas: "a a a a";
    ${media.sm`
      gap: 12px;
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
