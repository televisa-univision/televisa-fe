import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  outerCaption: css`
    padding: 0 10px;
  `,
  inlineCaption: ({ isLead }) => css`
    text-align: left;

    ${isLead && css`
      padding: rem(8px) 0 0;
      ${media.sm`
        padding: ${rem('8px')} ${rem('20px')} 0;
      `}
    `}

    ${media.sm`
      padding-left: inherit;
      padding-right: inherit;
      line-height: 1.125rem;
    `}
  `,
  fullWidthWrapper: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 1162px;
    padding: 0;
    position: relative;
    width: 100%;
  `,
};
