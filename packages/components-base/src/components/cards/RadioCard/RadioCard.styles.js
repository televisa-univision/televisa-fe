import { css } from 'styled-components';
import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';
import {
  LIST,
  SQUARE,
  VERTICAL,
} from '@univision/fe-commons/dist/constants/cardTypes';
import {
  BLACK_20,
  BLACK_50,
  BLACK,
  BLACK_GREY,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

const RADIO_CARD_VERTICAL_HEIGHT = 252;
const RADIO_CARD_WIDTH = 140;

export default {
  cardSizer: ({ type }) => css`
    border-radius: 4px;
    overflow: hidden;

    ${getFromMap(type, {
    [VERTICAL]: css`
        min-height: ${RADIO_CARD_VERTICAL_HEIGHT}px;
        min-width: ${RADIO_CARD_WIDTH}px;
      `,
    [LIST]: css`
        min-width: 340px;
      `,
  })}
  `,
  radioCardContainer: ({ type }) => css`
    -webkit-font-smoothing: antialiased;
    background-color: ${BLACK};
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-width: ${RADIO_CARD_WIDTH}px;

    ${getFromMap(type, {
    [LIST]: css`
        flex-direction: row;
        justify-content: flex-start;
      `,
    [VERTICAL]: css`
        min-height: ${RADIO_CARD_VERTICAL_HEIGHT}px;
      `,
  })}
  `,
  radioInteractionArea: ({ type }) => css`
    position: relative;
    width: 100%;
    z-index: 2;

    ${getFromMap(type, {
    [SQUARE]: css`
        bottom: 48px;
        justify-content: flex-end;
        padding-bottom: 16px;
        padding-left: 16px;
      `,
    [VERTICAL]: css`
        background-color: ${BLACK};
        bottom: 0px;
        justify-content: center;
        padding: 8px 0;
        position: absolute;
      `,
    [LIST]: css`
        background-color: ${BLACK_GREY};
        flex: 1;
        height: 100%;
        padding: 20px 0 0 8px;
      `,
  })}
  `,
  radioCardImageContainer: ({ image, type }) => css`
    display: flex;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    z-index: 1;

    ${getFromMap(type, {
    [LIST]: css`
        align-self: center;
        background-image: url('${image}');
        background-position: center;
        background-size: cover;
        width: 38%;
      `,
  })}
  `,
  radioCardPlayButtonContainer: css`
    z-index: 2;
  `,
  radioCardBackgroundImage: ({ image }) => css`
    background-blend-mode: overlay;
    background-image: url(${image});
    background-position: center;
    background-size: cover;
    bottom: -50px;
    left: -50px;
    position: absolute;
    right: -50px;
    top: -50px;
  `,
  radioCardBackgroundOverlay: ({ flat }) => css`
    background-image: ${flat ? BLACK_20 : 'linear-gradient(rgba(0, 0, 0, 0) 0px, rgb(0, 0, 0) 100%)'};
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  `,
  radioCardLogoContainer: ({ logo, type }) => css`
    background-image: url(${logo});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    height: 64px;
    margin-bottom: 8px;
    width: 104px;
    z-index: 2;

    ${getFromMap(type, {
    [LIST]: css`
        align-self: center;
        position: relative;
        top: 20px;
      `,
    [VERTICAL]: css`
        position: relative;
        top: 30px;
      `,
  })}
  `,
  radioCardLogoLink: css`
    display: block;
    height: 100%;
    width: 100%;
  `,
  radioCardTitle: ({ type }) => css`
    color: ${WHITE};
    font-size: ${rem('14px')};
    line-height: ${rem('18px')};

    ${getFromMap(type, {
    [LIST]: css`
        margin: 0 0 6px 0;
      `,
    [SQUARE]: css`
        margin: 0 0 8px 0;
      `,
    [VERTICAL]: css`
        margin: 0 0 4px 0;
        text-align: center;
      `,
  })}
  `,
  radioCardDescription: ({ type }) => css`
    color: ${WHITE};
    font-size: ${rem('12px')};
    font-weight: normal;
    line-height: ${rem('14px')};
    margin: 0;
    text-transform: uppercase;
    width: 100%;


    ${getFromMap(type, {
    [SQUARE]: css`
        width: 80%;
      `,
    [VERTICAL]: css`
        font-family: 'Roboto Light';
        font-size: ${rem('12px')};
        line-height: ${rem('16px')};
        padding: 0 8px;
        text-align: center;
      `,
  })}
  `,
  radioCardMeta: css`
    color: ${WHITE};
    font-size: ${rem('12px')};
    font-weight: 300;
    line-height: ${rem('14px')};
    margin-top: 4px;
  `,
  radioCardPodcastLength: ({ type }) => css`
    color: ${WHITE};
    font-size: ${rem('12px')};
    font-weight: normal;
    line-height: ${rem('14px')};
    text-transform: lowercase;

    ${getFromMap(type, {
    [LIST]: css`
        margin: 6px 0 4px 0;
      `,
    [SQUARE]: css`
        margin: 8px 0;
      `,
    [VERTICAL]: css`
        margin: 0 0 4px 0;
        text-align: center;
      `,
  })}
  `,
  radioCardPlayButton: ({ type }) => css`
    align-items: center;
    background: transparent;
    border: 1px solid ${WHITE};
    border-radius: 100px;
    display: flex;
    justify-content: center;
    position: absolute;

    svg {
      left: 1px;
      position: relative;
    }

    ${getFromMap(type, {
    [LIST]: css`
        border: 0;
        bottom: 8px;
        height: 24px;
        left: 8px;
        width: 24px;
        z-index: 2;
      `,
    [SQUARE]: css`
        bottom: 16px;
        height: 46px;
        right: 16px;
        width: 46px;
      `,
    [VERTICAL]: css`
        bottom: 16px;
        height: 41px;
        right: 16px;
        top: -50px;
        width: 41px;
      `,
  })}
  `,
  radioCardPlayButtonLabel: ({ type }) => css`
    color: ${WHITE};
    font-size: ${rem('12px')};
    line-height: ${rem('14px')};
    margin-bottom: 0;
    text-shadow: 0 2px 2px ${BLACK_50};
    text-transform: uppercase;

    ${getFromMap(type, {
    [LIST]: css`
        bottom: 12px;
        left: 40px;
        position: absolute;
      `,
  })}
  `,
};
