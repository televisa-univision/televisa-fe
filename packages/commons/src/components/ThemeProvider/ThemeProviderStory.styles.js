import { css } from 'styled-components';

export default {
  storyWrapper: css`
    display: flex;
    height: 1000px;
    margin: -20px;
  `,
  textDemo: ({ theme = {} }) => css`
    align-items: center;
    background-color: ${theme.isBrandedHeaderBlack ? 'black' : 'yellow'};
    color: ${theme.isBrandedHeaderBlack ? 'white' : 'black'};
    display: flex;
    height: 100px;
    justify-content: center;
    width: 100px;
  `,
};
