import { css } from 'styled-components';
import {
  BLACK,
  GREY_BLACK,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  separator: css`
    padding: 0 8px;
    :last-child {
      display: none;
    }
    ${media.md`
      padding: 0 12px;
    `}
  `,
  tagsContent: css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    ${media.md`
      margin-top: -3px;
    `}
  `,
  tagLabel: ({ color }) => css`
    color: ${color || BLACK};
    padding-top: 0;
  `,
  title: ({ forceColumn }) => css`
    color: ${GREY_BLACK};
    display: flex;
    font-size:${rem(10)};
    letter-spacing: ${rem(1)};
    line-height: ${rem(14)};
    margin-bottom: 8px;
    padding-top: 4px;
    ${media.md`
      margin: 0 24px 0 0;
      ${forceColumn && 'margin: 0 0 8px 0;'}
    `}
  `,
  wrapper: ({ forceColumn }) => css`
    display: flex;
    flex-direction: column;
    ${!forceColumn && media.md`
      flex-direction: row;
    `}
  `,
};
