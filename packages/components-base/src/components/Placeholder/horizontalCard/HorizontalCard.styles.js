import { css } from 'styled-components';
import {
  VERY_LIGHT_GREY,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  skeletonWrapper: css`
    display: flex;
    flex-direction: column;
    height: 96px;
    justify-content: space-between;
    padding: 16px 0;

    ${media.sm`
      flex-direction: row;
      height: 140px;
    `}
  `,
  skeletonAvatar: css`
    background: ${VERY_LIGHT_GREY};
    height: 45px;
    margin-right: 16px;
    width: 80px;

    ${media.sm`
      width: 192px;
      height: 108px;
    `}
  `,
  skeletonContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 170px;

    ${media.sm`
      width: 235px;
    `}

    ${media.md`
      width: 410px;
    `}
  `,
  skeletonTitle: css`
    background: ${VERY_LIGHT_GREY};
    height: 10px;
    margin-bottom: 2px;
    width: 100%;

    ${media.sm`
      width: 60%;
      height: 21px;
    `}
  `,
  skeletonContent: css`
    background: ${VERY_LIGHT_GREY};
    display: none;
    height: 10px;
    width: 98%;

    ${media.sm`
      display: block;
    `}
  `,
  skeletonButton: css`
    background: ${VERY_LIGHT_GREY};
    display: none;
    height: 21px;
    margin: 9px 0;
    width: 68px;

    ${media.sm`
      display: block;
    `}
  `,
};
