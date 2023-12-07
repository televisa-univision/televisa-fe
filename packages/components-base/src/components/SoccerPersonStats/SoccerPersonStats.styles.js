import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  BLACK,
  DARKER_GREY,
  GALLERY_GREY,
} from '@univision/fe-utilities/styled/constants';
import { HORIZONTAL } from '@univision/fe-commons/dist/constants/layoutTypes';

export default {
  statWrapper: ({ layout }) => css`
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-bottom: 32px;
    text-align: left;
    width: 100%;
    ${layout === HORIZONTAL && media.sm`
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: 24px;
      width: 33%;
    `}
    ${layout !== HORIZONTAL && media.sm`
      align-items: center;
      flex-direction: row;
      margin-bottom: 32px;
      width: 100%;
    `}
    
  `,
  stat: ({ isValue, layout, type }) => css`
    color: ${isValue ? BLACK : DARKER_GREY};
    display: flex;
    font-size: ${rem(14)};
    line-height: ${rem(18)};
    margin-bottom: 0;
    width: 50%; 
    ${layout === HORIZONTAL && media.sm`
      margin-bottom: 5px;
      width: 100%;
      ${type === 'club' && css`
        margin-top: -6px;
      `}
    `}
    ${layout !== HORIZONTAL && media.sm`
      margin-bottom: 0;
      width: 50%;
    `}
  `,

  wrapper: ({ layout }) => css`
    align-items: center;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: fit-content;
    justify-content:center;
    margin-top: 30px;
    width: 100%;
    ${layout === HORIZONTAL && media.sm`
      align-items: flex-start;
      flex-direction: row;
      justify-content: flex-start;
    `}
     ${layout !== HORIZONTAL && media.sm`
      align-items: center;
      flex-direction: column;
      justify-content: center;
    `}
  `,
  team: css`
    justify-content: flex-end;
  `,
  flag: css`
    height: 20px;
    width: 30px;
  `,
  separator: css`
    border-left: 1px solid ${GALLERY_GREY};
    height: 20px;
    margin: 0 3px;
    width: 1px;
    ${media.md`
      margin: 6px 8px 0 5px;
    `}
  `,
  league: css`
    > div:last-child {
      display: none;
    }
  `,
};
