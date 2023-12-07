import { css } from 'styled-components';
import { rem, media, mediaRange } from '@univision/fe-commons/dist/utils/styled/mixins';
import { GREY_BLACK, BASELINE_CARDS_XS, WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import { isSquareCard } from '../cards/helpers';

export default {
  sponsoredBy: ({ isOpeningWeatherForecast, isWeatherCard, type }) => css`
    color: ${isOpeningWeatherForecast ? WHITE : GREY_BLACK};
    font-size: ${rem('9px')};
    line-height: ${rem('11px')};

    ${!isOpeningWeatherForecast && css`
      margin-bottom: 4px;
    `}

    ${isOpeningWeatherForecast && css`
      align-items: center;
      display: flex;
      height: 40px;
      margin-right: 4px;
    `}

    ${isWeatherCard && css`
      ${isSquareCard(type) && mediaRange(0, BASELINE_CARDS_XS, css`
        display: none;
      `)}
    `}

    ${media.md`
      font-size: ${rem('14px')};
      line-height: ${rem('17px')};
    `}
  `,
};
