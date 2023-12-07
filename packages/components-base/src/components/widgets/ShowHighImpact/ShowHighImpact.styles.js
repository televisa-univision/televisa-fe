import { css } from 'styled-components';

import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { BLACK, WHITE } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  wrapper: ({ bgImage }) => css`
    background-image: url(${bgImage});
    background-position: center center;
    background-size: cover;
    color: ${WHITE};
    height: auto;
    overflow: hidden;
    position: relative;
    width: 100%;
    z-index: 1;

    ${media.md`
      height: 340px;
      padding: 25px 0 0;

      &:before {
        content: " ";
        background: linear-gradient(to right, ${BLACK} 0%, rgba(0, 0, 0, 0) 100%),
          linear-gradient(to right, ${BLACK} 42%, rgba(0, 0, 0, 0.65) 62%, rgba(0, 0, 0, 0) 100%);
        width: 49%;
        position: absolute;
        height: 100%;
        top: 0;
      }

      &:after {
        content: " ";
        background: linear-gradient(to left, $black 0%, rgba(0, 0, 0, 0) 100%),
          linear-gradient(to left, $black 0%, rgba(0, 0, 0, 0.65) 31.38%, rgba(0, 0, 0, 0) 90%);
        width: 25%;
        position: absolute;
        right: 0;
        height: 100%;
        top: 0;
      }
    `}

    ${media.lg`
      height: 380px;
    `}
  `,
  description: css`
    color: ${WHITE};
    width: 100%;

    ${media.md`
      font-size: ${rem('14px')};
      line-height: ${rem('18px')};
      width: 30%;
    `}
  `,
  fullWrapper: css`
    background: ${BLACK};
    display: block;
    left: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-top: 0px;
    overflow: hidden;
    position: relative;
    right: 50%;
    width: 100vw;

    ${media.md`
      margin: 0;
      left: 0;
      right: 0;
      width: 100%;
    `}
  `,
  gradient: css`
    background: linear-gradient(
      0deg, ${BLACK} 0%,
      rgba(3, 3, 3, 1) 25%,
      rgba(12,12,12,0.13) 80%,
      rgba(12,12,12,0) 100%
    );
    bottom: 0;
    height: 90px;
    position: absolute;
    width: 100%;
  `,
  moreEpisodesButton: css`
    justify-content: center;
    margin-top: 30px;
    position: relative;

    ${media.md`
      margin-left: 27.5%;
      width: 45%;
      position: absolute;
      bottom: 0;
    `}

    .moreEpisodes {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  `,
  container: css`
    display: flex;
    flex-direction: column;
    height: 233px;
    justify-content: flex-end;
    overflow: hidden;
    padding-left: 24px;
    position: relative;
    width: 100%;

    ${media.md`
      height: 236px;
      justify-content: normal;
      margin: 0 auto;
      max-width: 1440px;
      padding-left: 0;
    `}
  `,
  logoContainer: css`
    background: none;
    margin-bottom: 13px;
    margin-left: 0;
    margin-top: 5px;

    ${media.md`
      margin-bottom: 17px;
      margin-top: 0;
    `}

    .logo {
      height: 50px;
      width: auto;
    }
  `,
  airtime: css`
    font-size: ${rem('11px')};
    line-height: ${rem('13px')};
    margin: 0 23px 32px 0;
    text-transform: uppercase;

    ${media.md`
      margin: 15px 0;
    `}
  `,
  bottomContent: css`
    padding: 0 24px;
  `,
};
