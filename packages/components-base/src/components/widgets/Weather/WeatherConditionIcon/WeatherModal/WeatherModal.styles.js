import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  ASTRONAUT_BLUE,
  DARK_BLUE,
  DARKER_GREY,
  MIDNIGHT_EXPRESS,
  VERY_LIGHT_GREY,
  ZINDEX_ABOVE_NAVIGATION,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  dataContainer: css`
    padding: 16px;
    width: 100%;
  `,
  modalWrapper: css`
    height: 0;
    position: absolute;
    right: 0;
    width: 0;
  `,
  modal: ({ localCarousel }) => css`
    align-items: center;
    background-color: white;
    border: 0;
    border-radius: 4px;
    bottom: -5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
    position: relative;
    right: calc(100vw - ${localCarousel ? 102 : 40}px);
    transform-origin: top right;
    width: calc(100vw - 40px);
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 1};

    ${media.xs`
      max-width: 368px;
      right: 368px;
    `}

    ${media.md`
      bottom: -16px;;
    `}
  `,
  rowCol: ({ isCol, justify, mt }) => css`
    display:flex;
    flex-direction: ${isCol ? 'column' : 'row'};
    position: relative;
    width: 100%;

    ${!isCol && css`
      align-items: flex-start;
    `}

    ${justify && css`
      justify-content: space-between;
    `}

    ${mt && css`
      margin-top: ${mt}px;
    `}
  `,
  weatherIcon: css`
    flex-shrink: 0;
    margin-right: 8px;
  `,
  minMax: ({ hasMargin }) => css`
    ${hasMargin && css`
      margin-left: 8px;
    `}
  `,
  location: css`
    margin-top: 19px;
  `,
  precip: css`
    color: ${DARKER_GREY};
    font-size: ${rem('10px')};
    margin: 0;
    text-transform: uppercase;
  `,
  separator: css`
    background-color: ${VERY_LIGHT_GREY};
    height: 2px;
    margin-bottom: 26px;
    margin-top: 8px;
    width: 100%;
  `,
  tempSwitch: css`
    position: absolute;
    right: 0;
    top: 0;
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 2};
  `,
  seeForecast: css`
    align-self: center;
    background-color: ${DARK_BLUE};
    color: white;
    display: flex;
    font-size: ${rem('12px')};
    justify-content: center;
    letter-spacing: 0.75px;
    line-height: ${rem('14px')};
    margin-bottom: 0;
    margin-top: 32px;
    padding: 14px;
    text-align: center;
    text-transform: uppercase;
    width: 100%;

    && {
      color: white;
    }

    &:hover {
      background-color: ${ASTRONAUT_BLUE};
    }
  `,
  arrowUp: css`
    border-bottom: 14px solid ${MIDNIGHT_EXPRESS};
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    height: 0;
    position: absolute;
    right: 10px;
    top: -13px;
    width: 0;

    ${media.md`
      right: 20px;
    `}
  `,
};
