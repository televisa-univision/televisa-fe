import { createGlobalStyle } from 'styled-components';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto Flex', Helvetica, Arial, sans-serif;
    letter-spacing: 0.5%;
    line-height: 120%;
    font-size: ${rem(16)} ;
  }

  .uvs-font-a-regular {
    font-family: 'Roboto Flex', Helvetica, Arial, sans-serif;
    font-weight: 400;
  }

  .uvs-font-a-bold{
    font-family: 'Roboto Flex', Helvetica, Arial, sans-serif;
    font-weight: 700;
  }
  
  .uvs-font-b-regular {
    font-family: 'Roboto Flex', Helvetica, Arial, sans-serif;
    font-weight: 400;
  }

  .uvs-font-b-bold{
    font-family: 'Roboto Flex', Helvetica, Arial, sans-serif;
    font-weight: 700;
  }

`;
export default GlobalStyle;
