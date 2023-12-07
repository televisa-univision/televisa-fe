import { css } from 'styled-components';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  followUsContainer: ({ isVertical }) => css`
    align-items: center;
    display: flex;
    flex-direction: ${isVertical ? 'column' : 'row'};
    justify-content: space-between;
  `,
  followUsLabel: ({ isVertical }) => css`
    font-size: ${rem('11px')};
    margin-bottom: ${isVertical ? '16px' : '0'};
    text-transform: uppercase;
  `,
  networksContainer: ({ isVertical }) => css`
    display: grid;
    grid-gap: 24px;
    grid-template-columns: 1fr 1fr 1fr;
    margin-left: ${isVertical ? '0' : '24px'};
  `,
};
