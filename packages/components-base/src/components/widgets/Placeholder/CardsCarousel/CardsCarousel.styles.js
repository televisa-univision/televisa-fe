import { css } from 'styled-components';

import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import { BLACK_08, GREY } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  container: ({ removeContainerSpaces }) => css`
    display: flex;
    margin-bottom: 40px;
    padding-bottom: 16px;

    ${removeContainerSpaces && css`
      margin-bottom: 0;
      padding-bottom: 0;
    `}
  `,
  titleContainer: css`
    background: ${GREY};
    height: 20px;
    margin: 14px 0;
    opacity: .1;
    width: 75%;

    ${media.sm`
      width: 32.3%;
    `}
  `,
  titleBar: css`
    background: ${GREY};
    height: 2px;
    opacity: .1;
    width: 100%;
  `,
  card: css`
    background: ${GREY};
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 ${BLACK_08};
    opacity: .1;
  `,
  separator: css`
    display: flex;
    flex-shrink: 0;
    height: 2px;
    width: 20px;
  `,
};
