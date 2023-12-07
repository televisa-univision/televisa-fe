import { css } from 'styled-components';
import { BLACK, WHITE, SPRING_GREEN } from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import stripped from '@univision/fe-commons/dist/assets/images/striped-background.svg';

export default {
  fullWidth: () => css`
    background: ${WHITE};
    height: auto;
    padding: 0;
  `,

  cellContainer: ({ mobileOneCell, isWorldCupMVP }) => css`
    ${!isWorldCupMVP && css`
      background: url(${stripped});
    `}
    border: none;
    display: flex;
    flex-direction: ${isWorldCupMVP ? 'column' : 'row'};
    flex-wrap: wrap;
    justify-content: ${mobileOneCell ? 'center' : 'flex-start'};
    width: 100%;

    ${media.sm`
      justify-content: center;
      flex-wrap: nowrap;
    `}

    ${isWorldCupMVP && media.sm`
      flex-direction: row;
      padding: 8px;
      gap:16px;
    `}
  `,

  calienteCTA: css`
    margin-top: -8px;
  `,

  carousel: css`
    width: 100%;
  `,

  containerRow: css`
    ${media.sm`
      overflow: hidden;
    `}
  `,

  containerCol: css`
    margin-left: -8px;
    margin-right: -8px;
    max-width: none;

    ${media.xs`
      max-width: 100%;
      margin-left: 0px;
      margin-right: 0px;
    `}
  `,

  viewButton: css`
    margin-top: 10px;
  `,

  seeAllContainer: ({ hidden, isWorldCupMVP }) => css`
    background: ${WHITE};
    display: ${hidden ? 'none' : 'block'};
    padding-top: 10px;
    width: 100%;

    ${media.sm`
      padding-top: 0;
    `}

    ${isWorldCupMVP && media.sm`
      width: calc(100% - 12px);
    `}
  `,

  seeAllTudn: ({ isWorldCupMVP }) => css`
    ${isWorldCupMVP && css`
      background-color: ${SPRING_GREEN};

      .uvs-font-c-bold {
        font-family: 'Roboto Flex', sans-serif;
      }

      svg > path {
        fill: ${BLACK};
      }

      p[type="primary"] {
        font-family: 'Roboto Flex', sans-serif;
        font-size: ${rem(11)};
        font-weight: 700;
      }
    `}

    ${media.sm`
      width: ${isWorldCupMVP ? '100%' : '98%'};
      height: ${isWorldCupMVP ? '92px' : '113px'};
    `}
  `,

  viewMoreButton: ({ isWorldCupMVP }) => css`
    ${isWorldCupMVP && css`
      background-color: ${SPRING_GREEN};
      color: ${BLACK};

      svg > path {
        fill: ${BLACK};
      }

      p[type="loadMore"] {
        font-family: 'Roboto Flex', sans-serif;
        font-size: ${rem(11)};
        font-weight: 700;
      }
    `}
  `,

  scoreCellWrapper: ({
    alignRight,
    hidden,
    mobileWrapper,
    withPadding,
    inCarousel,
    isWorldCupMVP,
    hasCalienteCta,
  }) => css`
    align-items: center;
    background: ${WHITE};
    display: flex;
    height: ${isWorldCupMVP ? 'auto' : '121px'};
    justify-content: flex-start;
    width: ${isWorldCupMVP ? 'auto' : '50%'};

    ${isWorldCupMVP && css`
      flex-direction: column;
      margin-bottom: 16px;

      > a {
        color: ${BLACK};
      }
    `}

    ${hidden && css`
      display: none;
    `}

    ${mobileWrapper && css`
      height: 113px;
    `}

    ${alignRight && css`
      justify-content: flex-end;
    `}

    ${media.sm`
      width: ${inCarousel ? '100%' : 'auto'};
      height: ${hasCalienteCta ? '150px' : '113px'};
      padding-left: ${inCarousel ? '0' : '4px'};

      ${withPadding && !isWorldCupMVP && css`
        padding-right: 4px;
      `}
    `}

    ${isWorldCupMVP && media.sm`
      margin-bottom: 0;
    `}
  `,

  // This selector is only used for the rebrand scorecell
  scoreCard: ({ inCarousel }) => css`
    width: 100%;

    ${media.sm`
      width: ${inCarousel ? '100%' : '243px'};
    `}

    .uvs-font-c-regular,
    .uvs-font-c-bold {
      font-family: 'Roboto Flex', sans-serif;
    }
  `,

  scoreCell: ({ customWidth }) => css`
    ${customWidth && css`
      width: 98%;
    `}
  `,

  sponsor: css`
    display: flex;
    max-height: 113px;

    ${media.xs`
      margin-top: 4px;
      max-width: 200px;
    `}

    span {
      color: $grey-black;
      display: flex;
      font-size: ${rem(11)};

      ${media.xs`
        font-size: ${rem(9)};
        align-items: center;
      `}
    }

    a {
      display: flex;
    }

    img {
      display: flex;
      height: 100%;
      max-height: none;
      max-width: 197px;
      width: 100%;

      ${media.xs`
        width: 100px;
      `}
    }
  `,
};
