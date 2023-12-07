import { css } from 'styled-components';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  container: css`
    height: fit-content;
    margin-top: 35px;
    padding-bottom: 60px;
    padding-left: 19px;
    width: 100%;
    ${media.sm`
      height: 100%;
      margin-top: 87px;
      padding-left: 20px;
      width: 23%;
    `}
  `,
  submenuContainer: ({ isLoggedIn }) => css`
    position: relative;
    width: 100%;
    ${isLoggedIn && `
    & > div:first-child {
        width: 50%;
      }
    `}
  `,
  title: ({ primary }) => css`
    color: ${primary};
    font-size: ${rem('16px')};
    font-weight: bold;
    line-height: ${rem('19px')};
    margin-bottom: 32px;
    ${media.sm`
      display: none;
  `}
  `,
};
