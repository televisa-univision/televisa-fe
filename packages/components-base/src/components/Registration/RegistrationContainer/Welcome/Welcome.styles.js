import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  msg: css`
    font-size: ${rem('16px')};
    line-height: ${rem('22px')};
    text-align: center;
  `,
  title: ({ primary }) => css`
    color: ${primary};
    font-size: ${rem('20px')};
    line-height: ${rem('24px')};
    padding-bottom: 16px;
    text-align: center;
  `,
  wrapper: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 24px;
    width: 100%;
    ${media.sm`
      padding-top: 87px;
    `}
  `,
};
