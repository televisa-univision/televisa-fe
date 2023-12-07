import { css } from 'styled-components';

import { GREY } from '@univision/fe-commons/dist/utils/styled/constants';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import StrippedImage from '@univision/fe-commons/dist/assets/images/striped-background.svg';

export default {
  container: css`
    margin-bottom: 40px;
    padding-bottom: 16px;
  `,
  titleContainer: css`
    background: ${GREY};
    height: 10px;
    margin: 14px 0;
    opacity: .1;
    width: 75%;

    ${media.sm`
      width: 32.3%;
      height: 20px;
    `}
  `,
  titleBar: css`
    background: url('${StrippedImage}');
    background-size: 10px;
    padding: 5px 0;
  `,
  videoPlaceholder: css`
    background: ${GREY};
    height: 0;
    opacity: .1;
    padding-bottom: 56.25%;
    width: 100%;

    ${media.md`
      height: auto;
      padding-right: 10px;
    `}
  `,
};
