import { css } from 'styled-components';

import { BLACK_08, GREY } from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';
import STRIPED_BACKGROUND
  from '@univision/fe-commons/dist/assets/images/striped-background.svg';

export default {
  container: css`
    margin-bottom: 40px;
    padding-bottom: 16px;
  `,
  titleContainer: css`
    background: ${GREY};
    height: 20px;
    margin: 14px 0;
    opacity: .1;
    width: 75%;

    ${media.sm`
      width: 32.6%;
    `}
  `,
  card: css`
    background: ${GREY};
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 ${BLACK_08};
    height: 125px;
    margin-bottom: 16px;
    opacity: .1;
    width: 100%;
    
  `,
  aside: css`
    display: none;
    ${media.md`
      display: block;
    `}
  `,
  adBackground: css`
    background: url(${STRIPED_BACKGROUND});
    height: 100%;
    width: 100%;
  `,
  button: css`
    background: ${GREY};
    border-radius: 4px;
    height: 44px;
    opacity: .1;
    width: 100%;
  `,
};
