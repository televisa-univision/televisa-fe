import { css } from 'styled-components';

import {
  BLACK,
  DAISY_BUSH,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  container: css`
    align-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
  `,
  content: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
    padding: 0;
    width: 100%;

    ${media.sm`
      width: 74%;
    `}
  `,
  list: css`
    margin: 10px 0;
    width: 100%;
  `,
  contentLine: css`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 5px 0;
    padding: 0;
    padding: 15px 0;
    width: 100%;
  `,
  contentNumber: css`
    align-content: center;
    align-items: center;
    background-color: ${DAISY_BUSH};
    border-radius: 100%;
    display: flex;
    justify-content: center;
  `,
  description: css`
    color: ${BLACK};
    font-size: ${rem('16px')};
    line-height: ${rem('26px')};
    margin: 15px 0;
  `,
  lineTitle: css`
    height: 100%;
    width: 100%;
  `,
  sponsor: css`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    margin: 5px 0;

    img {
      height: 100%;
    }
    span {
      font-size: ${rem('12px')};
    }
    a {
      height: 32px;
      width: auto;
    }
  `,
  price: css`
    &&& {
      color: ${BLACK};
      font-size:  ${rem('20px')};
      font-weight: 400;
      margin: 5px 0;
    }
  `,
  title: css`
    color: ${BLACK};
    font-size: ${rem('20px')};
    line-height: ${rem(32)};
    margin: 5px 0;
    text-align: center;
  `,
  titleNumber: css`
    align-items: center;
    color: ${WHITE};
    display: flex;
    font-size: ${rem('48px')};
    font-weight: bold;
    height: 30px;
    justify-content: center;
    margin: 16px;
    width: 30px;

    ${media.sm`
      width: 50px;
      height: 50px;
    `}
  `,
};
