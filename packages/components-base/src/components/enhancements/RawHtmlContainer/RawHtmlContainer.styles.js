import { css } from 'styled-components';

import {
  APP_BREAKPOINTS,
  ENHANCEMENT_MARGIN_VERTICAL,
} from '@univision/fe-utilities/styled/constants';

/**
 * Get styles for custom behavior depending of the rawhtml type.
 * @param {string} type - the raw html type
 * @param {boolean} isUnivisionStatic - is univision static raw html
 * @returns {string}
 */
function getStyleByType(type, isUnivisionStatic) {
  if (type === 'facebook' || type === 'instagram') {
    return css`
      @media (max-width: ${APP_BREAKPOINTS.xs}px) {
        margin-left: calc(((100vw - 350px) / 2) - 28px);
        margin-right: calc(((100vw - 350px) / 2) - 28px);
        height: 100%;

        &.iframe {
          height: 100%;
          height: -webkit-fill-available; /* stylelint-disable-line */
        }

        .fb-post.fb_iframe_widget {
          & > span {
            width: 100%;
            iframe {
              width: 100%;
            }
          }
        }
      }
    `;
  }
  if (type === 'youtube') {
    return css`
      padding-bottom: 56.25%;
      position: relative;
      width: 100%;

      ${!isUnivisionStatic && css`
        height: 0;
      `}

      ${isUnivisionStatic && css`
        padding-bottom: 0;
      `}

      & iframe {
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }
    `;
  }
  return '';
}

export default {
  dangerouslySet: ({ 'data-type': type, isUnivisionStatic }) => css`
    ${getStyleByType(type, isUnivisionStatic)}

    ${isUnivisionStatic && css`
      padding-bottom: 0;
    `}
  `,
  raw: ({ 'data-type': type, fullWidth, isUnivisionStatic }) => css`
    margin: ${ENHANCEMENT_MARGIN_VERTICAL} auto;
    max-width: 800px;
    overflow: initial;
    text-align: center;
    ${getStyleByType(type, isUnivisionStatic)}

    ${(fullWidth || isUnivisionStatic) && css`
      max-width: 100%;
    `}
  `,

  iframe: css`
    border: 0;
    max-width: 560px;
    overflow: hidden;
    width: 100%;
  `,
};
