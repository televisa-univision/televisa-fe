import { css } from 'styled-components';

import {
  BLACK,
  BLACK_GREY,
  GRADIENT_ADVERTISING_LABEL,
  GRADIENT_GREY_LABEL,
  GRADIENT_LONG_FORM,
  GRADIENT_RED_LIVE,
  GRADIENT_RADIO,
  GRADIENT_UFORIA,
  INCH_WORM,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import {
  ADVERTISING,
  BREAKING_NEWS,
  LIVE,
  LONGFORM,
  PODCAST,
  STORYTELLING,
  UFORIA,
  RADIO,
} from '@univision/fe-commons/dist/constants/labelTypes';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';

/**
 * Gets color for the provided label type
 * @param {string} type of label
 * @returns {string}
 */
const getLabelTextColor = type => getFromMap(type, {
  [ADVERTISING]: BLACK_GREY,
  [BREAKING_NEWS]: WHITE,
  [LIVE]: WHITE,
  [LONGFORM]: WHITE,
  [PODCAST]: WHITE,
  [STORYTELLING]: BLACK_GREY,
  default: WHITE,
});

/**
 * Gets background color for the provided label type
 * @param {string} type of label
 * @returns {string}
 */
const getLabelBackground = type => getFromMap(type, {
  [ADVERTISING]: css`
    background: ${GRADIENT_ADVERTISING_LABEL};
  `,
  [BREAKING_NEWS]: css`
    background: ${GRADIENT_RED_LIVE};
  `,
  [LIVE]: css`
    background: ${GRADIENT_RED_LIVE};
  `,
  [LONGFORM]: css`
    background: ${GRADIENT_LONG_FORM};
  `,
  [PODCAST]: css`
    background: ${GRADIENT_GREY_LABEL};
  `,
  [RADIO]: css`
    background: ${GRADIENT_RADIO};
  `,
  [STORYTELLING]: css`
    background-color: ${INCH_WORM};
  `,
  [UFORIA]: css`
    background: ${GRADIENT_UFORIA};
  `,
  default: css`
    background-color: ${BLACK};
  `,
});

export default {
  labelText: ({ smallSize, type }) => css`
    color:  ${getLabelTextColor(type)};
    font-size: ${smallSize ? rem(8) : rem(12)};
    letter-spacing: 1px;
    line-height: ${rem(14)};
    text-transform: uppercase;
    white-space: nowrap;
  `,
  labelWrapper: ({ smallSize, type }) => css`
    align-items: center;
    ${getLabelBackground(type)};
    display: inline-flex;
    flex-direction: row;
    height: ${smallSize ? '18px' : '24px'};
    padding-left: ${smallSize ? '4px' : '8px'};
    padding-right: ${smallSize ? '4px' : '8px'};
  `,
  liveIcon: ({ smallWrapper }) => css`
    margin-left: -4px;
    ${smallWrapper && css`
      margin-top: -1px;
    `}
  `,
};
