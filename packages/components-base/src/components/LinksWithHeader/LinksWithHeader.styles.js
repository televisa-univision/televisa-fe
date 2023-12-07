import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { BLACK, VERY_LIGHT_GREY } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  container: css`
    background-color: ${VERY_LIGHT_GREY};
    width: 100%;
  `,
  header: ({ isWorldCupMVP }) => css`
    border-bottom: 1px solid ${BLACK};
    color: ${BLACK};
    font-size: ${rem('18px')};
    font-weight: bold;
    margin: 0 23px;
    padding-bottom: 8px;
    padding-top: 16px;
    ${media.md`
      margin: 0;
      padding-left: 16px;
    `}
    ${isWorldCupMVP && css`
      font-family: 'Roboto Flex', sans-serif;
    `}
  `,
  linkContainer: css`
    padding-bottom: 14px;
    padding-left: 23px;
    ${media.md`
      padding-bottom: 16px;
    `}
  `,
  linkWrapper: css`
    margin-top: 20px;
    ${media.md`
      margin-top: 12px;
    `}
  `,
  link: css`
    color: ${BLACK};
    font-size: ${rem('16px')};
    font-weight: bold;
  `,
  row: ({ isPopularTopics }) => css`
    ${isPopularTopics && css`
      padding: 0;
    `}
  `,
};
