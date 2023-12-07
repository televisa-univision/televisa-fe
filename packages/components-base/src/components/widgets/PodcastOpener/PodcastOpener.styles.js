import { css } from 'styled-components';

import { MOBILE, DESKTOP } from '@univision/fe-commons/dist/constants/devices';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { WHITE } from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  actionBarWrapper: css`
    margin-bottom: 0;

    ${media.md`
      margin-bottom: -10px;
    `}
  `,
  container: css`
    color: ${WHITE};
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 600px;
    z-index: 1;

    ${media.md`
      flex-direction: row;
      padding: 40px 0;
    `}
  `,
  contentWrapper: css`
    display: flex;
    flex-basis: 100%;
    flex-direction: column;

    ${media.md`
      flex-basis: 70%;
      justify-content: space-between;
    `}
  `,
  description: css`
    font-size: ${rem(14)};
    padding: 0 16px;

    ${media.md`
      padding: 0;
    `}
  `,
  fullWidthWrapper: ({ image }) => css`
    background-color: black;
    display: flex;
    overflow: hidden;
    position: relative;

    &:after {
      background-image: url(${image});
      background-repeat: no-repeat;
      background-size: 100%;
      content: "";
      filter: blur(70px);
      height: 100%;
      position: absolute;
      width: 100%;
    }
  `,
  pictureImage: css`
    height: 188px;
    max-width: 188px;

    ${media.md`
      height: 196px;
      max-width: 196px;
    `}
  `,
  pictureWrapper: css`
    display: flex;
    flex-basis: 60%;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 16px;

    ${media.md`
      flex-basis: 40%;
      padding: 0;
    `}
  `,
  title: ({ type }) => css`
    align-items: center;
    display: flex;
    flex-basis: 40%;
    font-size: ${rem(18)};
    padding-left: 16px;

    ${type === DESKTOP && css`
      display: none;
    `}

    ${media.md`
      align-items: baseline;
      display: flex;
      padding-left: 0;

      ${type === MOBILE && css`
        display: none;
      `}
    `}
  `,
};
