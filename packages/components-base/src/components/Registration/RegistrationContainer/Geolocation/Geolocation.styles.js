import { css } from 'styled-components';
import {
  VERY_LIGHT_GREY,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  container: css`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: fit-content;
    position: relative;
    width: 100%;
    ${media.sm`
      width: 410px;
    `}
  `,
  search: css`
    margin-bottom: 24px;
  `,
  titleBack: css`
    margin-bottom: 30px;
    div {
      justify-content: unset;
    }
  `,
  toggle: css`
    position: absolute;
    right: -60px;
  `,
  wrapper: css`
    background-color: ${VERY_LIGHT_GREY};
    display: flex;
    height: 100vh;
    justify-content: center;
    padding-left: 19px;
    padding-right: 19px;
    padding-top: 24px;
    width: 100%;
    ${media.sm`
      background-color: ${WHITE};
      height: 100%;
      padding-top: 87px;
      width: 100%;
    `}
  `,
};
