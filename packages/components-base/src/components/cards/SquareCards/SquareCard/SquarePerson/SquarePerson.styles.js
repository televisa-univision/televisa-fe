import { css } from 'styled-components';
import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';
import {
  BLACK,
  BLACK_GREY,
  CARD_SHADOW,
  TRANSPARENT,
  DARKER_GREY,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';

export default {
  cardSizer: css`
    border-radius: 4px;
    box-shadow: ${CARD_SHADOW};
    overflow: hidden;
  `,
  personCardContainer: ({ size }) => css`
    align-items: center;
    color: ${BLACK};
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    ${getFromMap(size,
    {
      [LARGE]: css`
        padding: 24px;
      `,
      [MEDIUM]: css`
        padding: 16px;
      `,
      default: css`
        padding: 8px;
      `,
    })};
  `,
  personCardBody: css`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  `,
  personCardContent: ({ size }) => getFromMap(size,
    {
      [LARGE]: css`
        margin-top: 24px;
        text-align: center;
      `,
      [MEDIUM]: css`
        margin-top: 16px;
        text-align: center;
      `,
      default: css`
        margin-top: 16px;
        text-align: center;
      `,
    }),
  personCardMedia: ({ size }) => css`
    border-radius: 1000px;
    flex: 0 0 auto;
    overflow: hidden;
    position: relative;
    ${getFromMap(size,
    {
      [SMALL]: css`
        height: 145px;
        width: 145px;
      `,
      [LARGE]: css`
        height: 380px;
        width: 380px;
      `,
      [MEDIUM]: css`
        height: 200px;
        width: 200px;
      `,
    })};
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
  personCardTitle: ({ size, isDark }) => css`
  color: ${isDark ? WHITE : BLACK_GREY};
  letter-spacing: ${rem('-0.4px')};
  a {
    color: ${isDark ? WHITE : BLACK_GREY};
  }
  ${getFromMap(size,
    {
      [SMALL]: css`
        font-size: ${rem('16px')};
        line-height: ${rem('20px')};
      `,
      [LARGE]: css`
        font-size: ${rem('30px')};
        line-height: ${rem('34px')};
      `,
      [MEDIUM]: css`
        font-size: ${rem('18px')};
        letter-spacing: ${rem('-0.36px')};
        line-height: ${rem('24px')};
      `,
    })};
  `,
  personCardOccupation: ({ isDark, size }) => css`
    color: ${isDark ? WHITE : DARKER_GREY};
    font-size: ${rem('10px')};
    letter-spacing: ${rem('1px')};
    line-height: ${rem('14px')};
    text-transform: uppercase;

    ${getFromMap(size,
    {
      [LARGE]: css`
        margin-top: 16px;
      `,
      [MEDIUM]: css`
        margin-top: 11px;
      `,
      default: css`
        margin-top: 8px;
      `,
    })}

  `,
  wrapper: ({ size }) => css`
    ${getFromMap(size,
    {
      [LARGE]: css`
        height: 622px;
      `,
      [MEDIUM]: css`
        height: 376px;
      `,
      default: css`
        height: 300px;
      `,
    })};
  `,
};
