import { css } from 'styled-components';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

const ArticleBodyStyles = {
  categoryTag: ({ theme }) => css`
    color: ${theme?.categoryColor ? theme.categoryColor : '#000'};
    font-family: 'Roboto', sans-serif;
    font-size: ${rem('10px')};
  `,
  body: ({ theme, isWorldCupMVP }) => {
    return css`
    ${isWorldCupMVP && css`
      font-family: 'Poppins', sans-serif;
      line-height: ${rem('27px')};
    `}

    font-size: ${rem('16px')};
    line-height: ${rem('20px')};
    margin-top: 16px;

    a {
      color: ${theme?.custom?.a ? theme.custom.a : '#000'};
      font-weight: 700;

      &:hover {
        color: ${theme?.custom?.['a:hover'] ? theme?.custom?.['a:hover'] : '#000'};
        text-decoration: underline;
      }
    }

    h2,
    h3,
    h4,
    h5 {
      @include uvs-font('b', 'bold');
      margin-bottom: 8px;
    }

    b {
      color: ${theme?.custom?.b ? theme.custom.b : '#000'};
    }

    p {
      margin-bottom: 16px;
    }

    h1 {
      font-size: ${rem('20px')};
      line-height: ${rem('24px')};

      @include media-breakpoint-up('md') {
        font-size: ${rem('32px')};
        line-height: ${rem('36px')};
      }
    }

    h2 {
      font-size: ${rem('18px')};
      line-height: ${rem('24px')};

      @include media-breakpoint-up('md') {
        font-size: ${rem('24px')};
        line-height: ${rem('29px')};
      }
    }

    h3 {
      font-size: rem(16x);
      line-height: ${rem('20px')};

      @include media-breakpoint-up('md') {
        font-size: ${rem('20px')};
        line-height: ${rem('24px')};
      }
    }

    h4 {
      font-size: ${rem('14px')};
      line-height: ${rem('18px')};

      @include media-breakpoint-up('md') {
        font-size: ${rem('18px')};
        line-height: ${rem('24px')};
      }
    }

    h5 {
      font-size: ${rem('12px')};
      line-height: ${rem('16px')};

      @include media-breakpoint-up('md') {
        font-size: ${rem('16px')};
        line-height: ${rem('20px')};
      }
    }

    ul, ol {
      @include media-breakpoint-down('sm') {
        padding-left: 20px;
      }
      li {
        margin-bottom: 10px;
      }
    }

    sub, sup {
      left: ${rem('-2px')};
    }
  `;
  },
};

export default ArticleBodyStyles;
