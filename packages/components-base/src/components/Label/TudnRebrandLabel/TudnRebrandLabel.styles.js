import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import {
  BLACK_GREY,
  FOLLY,
  SPRING_GREEN,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import {
  BREAKING_NEWS,
  LIVEBLOG,
  LIVECONTENT,
  LIVESTREAM,
} from './constants';
/**
 * Gets color for the provided label type
 * @param {string} type of label
 * @returns {string}
 */
const getLabelTextColor = type => getFromMap(type, {
  [LIVEBLOG]: WHITE,
  [BREAKING_NEWS]: WHITE,
  [LIVECONTENT]: WHITE,
  [LIVESTREAM]: WHITE,
  default: BLACK_GREY,
});

/**
 * Gets background color for the provided label type
 * @param {string} type of label
 * @returns {string}
 */
const getLabelBackground = (type) => {
  return getFromMap(type, {
    [LIVEBLOG]: css`
        background: ${FOLLY}
      `,
    [BREAKING_NEWS]: css`
        background: ${FOLLY}
      `,
    [LIVECONTENT]: css`
        background: ${FOLLY}
      `,
    [LIVESTREAM]: css`
        background: ${FOLLY}
      `,
    default: css`
        background-color: ${SPRING_GREEN};
      `,
  });
};

export default {
  labelText: ({ smallSize, type }) => css`
    color: ${getLabelTextColor(type)};
    font-family: 'Poppins', sans-serif;
    font-size: ${smallSize ? rem(8) : rem(12)};
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.08px;
    line-height: ${rem(14)};
    text-transform: uppercase;
    white-space: nowrap;
  `,
  labelWrapper: ({ smallSize, type }) => css`
    align-items: center;
    ${getLabelBackground(type)};
    display: flex;
    flex-direction: row;
    height: ${smallSize ? '20px' : '23px'};
    justify-content: center;
    padding: 0 ${smallSize ? 4 : 8}px;
  `,
  liveIcon: ({ smallWrapper }) => css`
    margin-left: -4px;
    ${smallWrapper
    && css`
      margin-top: -1px;
    `}
  `,
};
