import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { BLACK, WHITE } from '@univision/fe-utilities/styled/constants';

export default {
  articleHeader: ({ isArticle }) => css`
    overflow: hidden;
    padding: 16px 0;
    text-align: center;
    ${media.sm`
      padding: 0;
    `}
    ${media.md`
      padding: 0 25px;
    `}
    & {
      ${isArticle && css`
        padding: 0;
        text-align: left;
      `}
    }
  `,

  header: ({ dark }) => css`
    ${!dark && css`
      color: ${WHITE};
    `}
  `,

  title: ({ isArticle, isWorldCupMVP, theme }) => css`
    font-size: ${rem('30px')};
    line-height: ${rem('33px')};
    ${media.md`
      font-size: ${rem('38px')};
      line-height: ${rem('41px')};
    `}

    ${isArticle && css`
      font-size: ${theme?.titleFontSize?.sm ? rem(theme?.titleFontSize?.sm) : rem('24px')};
      line-height: ${theme?.titleLineHeight?.sm ? rem(theme?.titleLineHeight?.sm) : rem('29px')};
      ${media.md`
        font-size: ${theme?.titleFontSize?.md ? rem(theme?.titleFontSize?.md) : rem('32px')};
        line-height: ${theme?.titleLineHeight?.md ? rem(theme?.titleLineHeight.md) : rem('36px')};
      `}
    `}

    ${isWorldCupMVP && css`
      font-size: ${rem(28)};
      line-height: ${rem('34px')};

      ${media.md`
        font-size: ${rem('42px')};
        line-height: ${rem('50px')};
      `}
    `}
  `,

  truncateContainer: css`
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
  `,

  description: ({ isWorldCupMVP, theme }) => css`
    max-width: 100%;
    ul {
      list-style: none;
      margin-top: 1rem;
      padding-left: ${rem('18px')};
      text-align: left;
      li {
        line-height: 1.3;
        margin: 5px 0;
        position: relative;
        &:before {
          background: ${BLACK};
          border-radius: 50%;
          content: '';
          display: block;
          height: 4px;
          left: -14px;
          position: absolute;
          top: 10px;
          width: 4px;
        }
      }
    }
    ${isWorldCupMVP && css`
      font-family: 'Poppins';
      font-size: ${rem('18px')};
      font-style: normal;
      line-height: ${rem('21px')};
      text-align: left;
      ${media.md`
        font-family: 'Roboto Flex', sans-serif;
        font-weight: bold;
        font-size: ${theme?.descriptionFontSize ? rem(theme?.descriptionFontSize) : rem('14px')};
      `}
    `}
  `,

  statusText: css`
    display: flex;
    font-size: ${rem('11px')};
    font-weight: bold;
    justify-content: center;
    line-height: ${rem('13px')};
    margin: 10px 0;
    em {
      font-style: normal;
      font-weight: bold;
    }
    li {
      line-height: 1;
    }
  `,
};
