import { css } from 'styled-components';

import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import { GREY } from '@univision/fe-commons/dist/utils/styled/constants';

/**
 * Get content height based on viewport
 * @returns {string}
 */
const getContentHeight = () => (
  css`
  ${media.sm`
    min-height: 1024px;
  `}

  ${media.md`
    min-height: 768px;
  `}

  ${media.lg`
    min-height: 1024px;
  `}
  `
);

export default {
  container: css`
    min-height: 740px;
    width: 100%;

    ${getContentHeight()}
  `,
  tag: css`
    background: ${GREY};
    height: 12px;
    margin: 1rem 0;
    opacity: .1;
    width: 31%;
  `,
  title: css`
    background: ${GREY};
    height: 23px;
    margin: 1rem 0;
    opacity: .1;
    width: 90%;
  `,
  content: css`
    background: ${GREY};
    height: 88px;
    margin: 1rem 0;
    opacity: .1;
    width: 100%;

    ${getContentHeight()}
  `,
  offset: css`
    margin: 0 auto;
  `,
  videoContainer: css`
    padding-top: 16px;
  `,
};
