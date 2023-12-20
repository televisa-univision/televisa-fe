import { css } from 'styled-components';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { GREY, BLACK_GREY, WHITE_GREY } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  oneTrustButton: ({ themeVariant }) => css`
  & > button {
    background: transparent !important;
    border: none !important;
    color: ${themeVariant === 'dark' ? WHITE_GREY : BLACK_GREY} !important;
    display: block !important;
    font-size: ${rem(13)} !important;
    line-height: ${rem(31)} !important;
    &:hover, &:active {
      color: ${themeVariant === 'dark' ? GREY : BLACK_GREY} !important;
    }
    margin: 0 !important;
    padding: 0 !important;
    text-decoration: none !important;
    transition: none !important;
    white-space: none !important;
    word-wrap: none !important;
  }
  `,
};
