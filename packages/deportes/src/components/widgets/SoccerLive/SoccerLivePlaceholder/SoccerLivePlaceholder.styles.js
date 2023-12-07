import { css } from 'styled-components';
import {
  LIGHT_GREY, VERY_LIGHT_GREY,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  container: css`
    border-bottom: 1px solid ${LIGHT_GREY};
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    max-width: 1260px;
    width: 100%;
  `,
  soccerLiveSquareContainer: css`
    align-items: center;
    display: flex;
    justify-content: center;
    width: 20%;

    ${media.sm`
      width: 18%;
    `}
  `,
  soccerLiveSquare: css`
    background: ${VERY_LIGHT_GREY};
    height: 12px;
    width: 60%;

    ${media.sm`
      width: 35%;
    `}
  `,
  cardTVWrapper: css`
    align-items: center;
    border-left: 1px solid ${VERY_LIGHT_GREY};
    border-right: 1px solid ${VERY_LIGHT_GREY};
    display: flex;
    justify-content: center;
    width: 64%;

    ${media.sm`
      padding: 0 2%;
      width: 64%;
    `}
  `,
};
