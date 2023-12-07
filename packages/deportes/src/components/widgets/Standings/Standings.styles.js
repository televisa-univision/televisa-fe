import { css } from 'styled-components';
import {
  SNOW_FLURRY,
  DEEP_SEA,
  WOOD_SMOKE,
  BLACK,
  SIROCCO,
  SPRING_GREEN,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  buttonMvp: ({ isActive, isTudn }) => css`
  background-color: ${SNOW_FLURRY};
  border-bottom-color: ${isActive ? DEEP_SEA : ''};
  border-bottom-width: 3px;
  & p {
    color: ${isActive ? DEEP_SEA : WOOD_SMOKE};
    font-size: ${rem(14)};
    font-weight: ${isActive ? 700 : 400};
    line-height: ${rem(16)};
    margin-right: 5px;
  }
  &:hover {
    p {
      color: ${isTudn && BLACK};
    }
    background-color: ${SNOW_FLURRY};
    ${isTudn && `border-bottom-color: ${DEEP_SEA};`}
  }
`,
  buttonPositionMvp: css`
    background-color: ${SPRING_GREEN};
    border-radius: 4px;
    height: 40px;
    &.positionmvp {
      & p {
        color: ${WOOD_SMOKE};
        font-size: ${rem(14)};
        font-weight: 700;
        line-height: ${rem(16)};
        margin-right: 0px;
      }
    }
    &:hover {
      background-color: ${SPRING_GREEN};
    }
  `,
  buttonResultMvp: css`
    background-color: ${SIROCCO};
    border-radius: 4px;
  `,
  navWrapperMvp: css`
    background-color: ${SNOW_FLURRY};
  `,
};
