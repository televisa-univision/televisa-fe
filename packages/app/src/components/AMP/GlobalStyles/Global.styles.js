import { createGlobalStyle } from 'styled-components';

// TODO: remove this workaround once nextjs supports global styles
// https://nextjs.org/docs/advanced-features/amp-support/introduction#caveats
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    color: black;
    font-family: Roboto, sans-serif;
    font-weight: 400;
    line-height: 1.5rem;
    // This helps to prevent the horizontal overflow and horizontal scroll to body level.
    overflow-x: hidden;
    text-align: left;
  }

  .uvs-container {
    width: 100%;
    padding-right: 23px;
    padding-left: 23px;
    margin-right: auto;
    margin-left: auto;
  }

  .uvs-font-a-bold {
    font-weight: 700;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: .5rem;
  }

  a, a:hover, a:visited, a:active, a:focus {
    text-decoration: none;
  }

  button {
    border: none;
    cursor: pointer;
  }

  button:focus {
    outline: 0;
  }
`;

export default GlobalStyle;
