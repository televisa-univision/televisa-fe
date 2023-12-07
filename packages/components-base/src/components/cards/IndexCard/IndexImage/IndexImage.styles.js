import { css } from 'styled-components';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import media from '@univision/fe-utilities/styled/mixins/media';
import { BLACK_00, BLACK_50 } from '@univision/fe-utilities/styled/constants';

/**
 * Index Card Image stylesheet
 */
export default {
  imageContainer: css`
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  `,
  pictureMask: css`
    background: ${linearGradient({ direction: 'to bottom', start: BLACK_00, end: BLACK_50 })};
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    padding: 4px;
    position: absolute;
    top: 0;
    width: 100%;

    ${media.sm`
      padding: 8px;
    `}
  `,
  ratioBox: css`
    background: gold;
    border-radius: 4px;
    height: 0;
    overflow: hidden;
    padding-bottom: 56.25%;
    position: relative;
    width: 100%;
  `,
  wrapper: css`
    margin-bottom: 8px;
    width: 137px;

    ${media.sm`
      width: 220px;
    `}

    ${media.md`
      width: 198px;
    `}
  `,
};
