import { css } from 'styled-components';
import {
  BLACK_GREY,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  iconWrapper: css`
    align-items: center;
    display: flex;
  `,
  mainTitle: css`
    font-size: ${rem('32px')};
    line-height: ${rem('36px')};
    margin: 0;
  `,
  secondTitle: css`
    font-size: ${rem('12px')};
    left: 0;
    letter-spacing: ${rem('1px')};
    line-height: ${rem('14px')};
    position: absolute;
    text-transform: uppercase;
    top: -14px;
  `,
  thirdTitle: css`
    align-items: flex-end;
    display: flex;
    font-size: ${rem('16px')};
    line-height: ${rem('22px')};
    margin: 0 9px;
`,
  titleWrapper: css`
    display: flex;
    margin: 0;
    position: relative;
  `,
  wrapper: css`
    cursor: pointer;
    margin-bottom: 4px;
    a {
      color: ${BLACK_GREY};
    }
  `,
};
