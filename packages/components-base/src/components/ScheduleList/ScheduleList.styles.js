import { css } from 'styled-components';
import { WHITE, BLACK_GREY, GRAYISH_BLUE } from '@univision/fe-commons/dist/utils/styled/constants';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  scheduleItem: ({ variant }) => css`
    align-items: center;
    border-bottom: 1px solid ${GRAYISH_BLUE};
    color: ${variant === 'dark' ? WHITE : BLACK_GREY};
    display: flex;
    font-size:${rem('14px')};
    padding: 16px 8px;
    
    &:first-child {
      padding-top: 0;
    }
  `,

  title: css`
    font-size:${rem('12px')};
    line-height:${rem('16px')};
  `,

  time: css`
    font-size: ${rem('12px')};
    font-weight: bold;
    letter-spacing: -0.4px;
    line-height: ${rem('16px')};
    margin-right: 20px;
    width: 60px;
    `,
};
