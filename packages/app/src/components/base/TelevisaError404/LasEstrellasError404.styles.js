import { css } from 'styled-components';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  errorMessageWrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    min-height: 400px;
    padding-top: 10px;
    position: relative;
    text-align: center;
    width: 100%;
  `,
  notFoundMessage: ({ theme }) => css`
    color: ${theme.primary};
    font-family: Roboto;
    font-size: ${rem(28)};
    font-weight: bold;
  `,
};
