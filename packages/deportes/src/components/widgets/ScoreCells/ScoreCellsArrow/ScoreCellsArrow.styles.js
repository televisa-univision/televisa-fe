import { css } from 'styled-components';

import { WHITE_RGB, BLACK_50 } from '@univision/fe-commons/dist/utils/styled/constants';

/**
 * Get css values on arrow is hidden
 * @param {boolean} isRight - true if it's the right arrow
 * @returns {string}
 */
const getHiddenTransform = (isRight) => {
  if (isRight) {
    return css`transform: translate3d(101%, 0, 0);`;
  }
  return css`
    transform: translate3d(-101%, 0, 0);
    transition: transform 0.45s ease;
  `;
};

export default {
  arrow: ({ isHidden, isRight }) => css`
    align-items: center;
    background: rgba(${WHITE_RGB}, 0.9);
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: 0;
    transition: transform 0.3s ease-out, opacity, background-color 0.3s linear;
    width: 68px;
    ${isHidden && getHiddenTransform(isRight)}

    svg {
      filter: drop-shadow(0px 2px 2px ${BLACK_50});
    }

    &:hover {
      svg {
        opacity: 0.7;
      }
    }
  `,
};
