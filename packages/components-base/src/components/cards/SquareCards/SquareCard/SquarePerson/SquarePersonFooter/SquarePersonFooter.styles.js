import { css } from 'styled-components';
import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';
import {
  BLACK_GREY,
  CARD_SHADOW,
  TRANSPARENT,
  BLACK,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  LARGE,
  MEDIUM,
} from '@univision/fe-commons/dist/constants/cardSizes';

export default {
  cardSizer: css`
    border-radius: 4px;
    box-shadow: ${CARD_SHADOW};
    overflow: hidden;
  `,
  personCardBody: css`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  `,
  personCardPictureOverlay: css`
    background: ${linearGradient({ direction: '180deg', start: TRANSPARENT, end: BLACK_GREY })};
    bottom: 0;
    left: 0;
    opacity: 0.6;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  `,
  personCardPicture: css`
    > div {
      padding-bottom: 100%;
    }
  `,
  personCardFooter: ({ size }) => css`
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    ${getFromMap(size,
    {
      [LARGE]: css`
        flex-direction: row;
        margin-top: 34px;
      `,
      [MEDIUM]: css`
        flex-direction: column;
        flex-grow: 3;
        margin-top: 19px;
      `,
      default: css`
        flex-direction: column;
        margin-top: 13px;
      `,
    })};
  `,
  personCardSocial: ({ size }) => css`
    align-items: center;
    display: flex;
    justify-content: center;
    ${getFromMap(size,
    {
      [LARGE]: css`
        margin: 0 32px 0 0;
        max-width: 303px;
        min-width: 303px;
      `,
    })};
  `,
  personCardFollow: ({ isDark, size }) => css`
    color: ${isDark ? WHITE : BLACK};
    font-size: ${rem('12px')};
    letter-spacing: ${rem('0.75px')};
    line-height: ${rem('14px')};
    margin-right: 24px;
    text-transform: uppercase;

    ${getFromMap(size,
    {
      [LARGE]: css`
        margin-right: 32px;
      `,
    })};
  `,
  personCardSocialLink: ({ size }) => css`
    border-radius: 40px;
    ${getFromMap(size,
    {
      [LARGE]: css`
        max-width: 50px;
      `,
      [MEDIUM]: css`
        max-width: 44px;
      `,
      default: css`
        max-width: 44px;
      `,
    })};
    && svg {
      margin: 0;
    }
    &:last-child {
      margin: 0;
    }
    && a {
      padding: 0;
      text-align: center;
      ${getFromMap(size,
    {
      [LARGE]: css`
        height: 50px;
        line-height: 50px;
        width: 50px;
      `,
      [MEDIUM]: css`
        height: 44px;
        line-height: ${rem('44px')};
        width: 44px;
      `,
      default: css`
        height: 44px;
        line-height: 44px;
        width: 44px;
      `,
    })}}
  `,
  socialWrapper: ({ size }) => css`
    margin-right: 24px;
    &:last-child {
      margin-right: 0;
    }
    ${getFromMap(size,
    {
      [LARGE]: css`
        margin-right: 32px;
      `,
    })};
  `,
};
