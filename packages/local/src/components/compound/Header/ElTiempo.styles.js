import { css } from 'styled-components';
import { GRADIENT_HEADER_COMPOUND } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  container: ({ isOpeningWeatherForecast }) => css`
    align-items: center;
    display: flex;
    padding: ${isOpeningWeatherForecast ? '12px 1px 15px' : '16px'};
    width: 100%;

    ${!isOpeningWeatherForecast && css`
      background: ${GRADIENT_HEADER_COMPOUND};
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    `}

    ${isOpeningWeatherForecast && css`
      align-items: flex-end;
      box-sizing: content-box;
      height: 40px;
    `}
  `,
  icon: css`
    display: inline-flex;
    margin-right: auto;
  `,
};
