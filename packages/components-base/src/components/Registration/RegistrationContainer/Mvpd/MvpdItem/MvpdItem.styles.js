import { css } from 'styled-components';
import { VERY_LIGHT_GREY } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  container: css`
    align-items: center;
    background-color: ${VERY_LIGHT_GREY};
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 48px;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    width: 104px;

    &:hover {
      transform: scale(1.1);
    }
  `,
};
