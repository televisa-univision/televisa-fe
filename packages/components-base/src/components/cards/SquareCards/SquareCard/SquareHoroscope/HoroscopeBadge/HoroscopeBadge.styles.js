import { css } from 'styled-components';

import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import { LARGE, MEDIUM, SMALL } from '@univision/fe-commons/dist/constants/cardSizes';
import {
  BLACK,
  DAISY_BUSH_40,
  GREY_BLACK,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

import ovalLandscape from './assets/oval_landscape.svg';

/**
 * Gets the container margins
 * @param {string} size - size of the card
 * @returns {func}
 */
const getContainerPaddings = size => getFromMap(size, {
  [SMALL]: css`
    padding: 8px 16px;
  `,
  [MEDIUM]: css`
    padding: 16px;
  `,
  default: css`
    padding: 16px 24px;
  `,
});

export default {
  avatar: ({ size }) => css`
    background-color: ${BLACK};
    border-radius: 100%;
    overflow: hidden;

    > div {
      padding-bottom: 100%;
    }

    ${getFromMap(size,
    {
      [SMALL]: css`
        height: 86px;
        width: 86px;
      `,
      [MEDIUM]: css`
        height: 102px;
        width: 102px;
      `,
      default: css`
        height: 140px;
        width: 140px;
      `,
    })};
  `,
  avatarContainer: ({ size }) => css`
    align-items: center;
    background: url(${ovalLandscape}) no-repeat;
    background-size: 100%;
    display: flex;
    height: 150px;
    justify-content: center;
    width: 150px;

    ${getFromMap(size,
    {
      [SMALL]: css`
        height: 92px;
        width: 92px;
      `,
      [MEDIUM]: css`
        height: 110px;
        width: 110px;
      `,
      default: css`
        height: 150px;
        width: 150px;
      `,
    })};
  `,
  avatarPicture: css`
    padding-bottom: 0;

    > div {
      padding-bottom: 100%;
    }
  `,
  container: ({ size }) => css`
    background-color: ${DAISY_BUSH_40};
    color: ${WHITE};
    display: flex;
    justify-content: space-between;
    width: 100%;

    ${getContainerPaddings(size)}
  `,
  dateString: css`
    color: ${WHITE};
    font-size: ${rem(10)};
    line-height: ${rem(16)};
    text-transform: uppercase;

    &:hover {
      color: ${GREY_BLACK};
    }
  `,
  signContainer: css`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  signImage: ({ size }) => css`
    ${getFromMap(size,
    {
      [LARGE]: css`
        height: 109px;
      `,
      default: css`
        height: 60px;
      `,
    })}
  `,
  signImageContainer: ({ size }) => css`
    ${getFromMap(size,
    {
      [SMALL]: css`
        margin-bottom: 8px;
        margin-left: 8px;
      `,
      [MEDIUM]: css`
        margin-bottom: 16px;
      `,
      default: css`
        margin-bottom: 9px;
      `,
    })};
  `,
};
