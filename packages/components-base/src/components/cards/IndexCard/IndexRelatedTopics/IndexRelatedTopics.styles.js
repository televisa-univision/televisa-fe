import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import {
  BLACK,
  GREY_BLACK,
} from '@univision/fe-utilities/styled/constants';

/**
 * Related topics stylesheet
*/
export default {
  container: css`
    display: flex;
    font-size: ${rem(10)};
    letter-spacing: 1px;
    line-height: ${rem(14)};
    margin-bottom: 8px;
    text-transform: uppercase;

    ${media.md`
      flex-direction: column;
    `}
  `,
  mainLabel: css`
    color: ${GREY_BLACK};

    ${media.md`
      margin-bottom: 4px;
    `}
  `,
  topicLink: ({ color }) => css`
    color: ${color || BLACK};

    &:hover {
      color: ${GREY_BLACK}
    }
  `,
  topicList: css`
    list-style: none;
    margin: 0;
    padding: 0;

    > li {
      display: inline-block;
      margin: 0;
      padding: 0 8px;

      ${media.md`
        display: block;
        padding: 2px 0;
      `}
    }
  `,
};
