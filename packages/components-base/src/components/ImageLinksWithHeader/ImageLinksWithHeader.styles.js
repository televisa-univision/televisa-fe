import { css } from 'styled-components';

import { media, rem, responsiveBackgrounds } from '@univision/fe-commons/dist/utils/styled/mixins';
import { SPRING_WING } from '@univision/fe-utilities/styled/constants';

export default {
  container: css`
    margin-bottom: 28px;
    margin-top: 25px;
    padding: 0 23px;
    ${media.md`
      margin-bottom: 20px;
      margin-top: 27px;
      padding: 0;
    `}
  `,
  imageLinksContainer: css`
    padding: 0 8px;
  `,
  topicBar: ({ isWorldCupMVP }) => css`
    margin-bottom: 16px;
    padding: 0;
    a:first-of-type {
      font-size: ${rem('16px')};
      text-transform: initial;
    }

    ${isWorldCupMVP && css`
      a:first-child {
        color: ${SPRING_WING};
        text-transform: uppercase;
      }

      .uvs-font-a-bold {
        font-family: 'Roboto Flex', sans-serif;
      }
    `}
  `,
  imageLinkWrapper: ({ index }) => {
    const isEven = index % 2 === 0;
    const isNotFirstOrSecond = index > 1;

    return css`
      padding-left: ${!isEven ? '8px' : 0};
      padding-right: ${isEven ? '8px' : 0};
      padding-top: ${isNotFirstOrSecond ? '16px' : 0};
      ${media.md`
        padding-left: ${!isEven ? '10px' : 0};
        padding-right: ${isEven ? '10px' : 0};
        padding-top: ${isNotFirstOrSecond ? '20px' : 0};
      `}
    `;
  },
  image: ({ renditions }) => css`
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 99px;
    ${responsiveBackgrounds(renditions)}
    ${media.md`
      height: 109px;
    `}
  `,
};
