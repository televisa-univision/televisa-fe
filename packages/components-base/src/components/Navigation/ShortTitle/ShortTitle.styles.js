import { css } from 'styled-components';
import { WHITE, BLACK } from '@univision/fe-commons/dist/utils/styled/constants';
import { rem, getBackgroundRule, media } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  wrapper: ({ theme }) => css`
    background-color: ${theme.subNavBackgroundColor || BLACK};
    background-position: 100%;
    ${getBackgroundRule({
    backgroundImages: theme.shortTitleBackgroundImages,
    backgroundImage: theme.shortTitleBackground,
    backgroundGradient: theme.shortTitleGradient,
  })};
    background-size: cover;
    width: 100%;
  `,
  shortTitleRowContainer: ({ isWorldCupMVP }) => css`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;

    ${isWorldCupMVP && css`
      justify-content: start;
    `}
  `,
  container: ({ theme }) => css`
    align-items: center;
    height: 40px;
    width: 100%;
    ${media.md`
      height: ${theme.shortTitleHeight};
    `}
  `,
  iconWrapper: css`
    display: inline-block;

    svg {
      height: 20px;
      width: 127px;

      ${media.md`
        height: 24px;
        margin-right: 60px;
        width: 151px;
      `}
    }
  `,
  link: ({ theme, isWorldCupMVP }) => css`
    color: ${WHITE};
    display: inline-block;
    font-size: ${rem(22)};
    line-height: ${rem(26)};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;

    &:hover {
      color: ${WHITE};
    }
    ${theme.shortTitleAlignCenter && css`
       text-align: center;
    `}
    ${isWorldCupMVP && css`
      font-size: ${rem('26px')};
    `}
  `,
  leftCol: css`
    display: flex;
    justify-content: flex-start;
    max-height: 100%;
  `,
  logo: css`
    max-height: 24px;
  `,
  rightCol: css`
    display: flex;
    justify-content: flex-end;
    max-height: 100%;
  `,
  customLogosWrapper: css`
    align-items: center;
    display: flex;
    justify-content: space-between;

    ${media.md`
      justify-content: flex-start;
    `}
  `,
  customLogo: css`
    display: inline-block;
    height: 24px;
    width: 129px;

    ${media.md`
      height: 28px;
      margin-right: 60px;
      width: 151px;
    `}
  `,
  customSubLogo: css`
    display: inline-block;
    height: 9px;
    width: 155px;


    ${media.md`
      height: 11px;
      margin-right: 60px;
      width: 173px;
    `}
  `,
};
