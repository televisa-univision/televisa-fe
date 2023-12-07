import { css } from 'styled-components';

import {
  WHITE_GREY_70,
  BLACK,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  container: css`
    color: ${BLACK};
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    min-height: 400px;
    padding-top: 10px;
    position: relative;
  `,

  wrapper: css`
    margin-bottom: 16px;
    text-align: center;
  `,

  title: css`
    display: flex;
    flex-direction: column;
    font-size: ${rem('26px')};
    justify-content: center;
    line-height: 31px;
    margin-bottom: 18px;
  `,

  subTitle: css`
    font-size: ${rem('15px')};
    line-height: 19px;
  `,

  homeLink: css`
    color: ${WHITE_GREY_70};
    font-size: ${rem('10px')};
  `,
};
