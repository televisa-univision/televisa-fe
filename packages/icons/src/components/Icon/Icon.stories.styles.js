import { css } from 'styled-components';

export default {
  row: css`
    border-bottom: 1px solid ${props => (props.items ? '#eee' : '#A6C9F2')};
    display: flex;

    ${props => props.title && css`
      background-color: #D1E3F7;
    `}
  `,
  head: css`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    padding: 10px;

    ${props => (props.icon || props.code) && css`
      justify-content: center;
      padding: 15px 30px;
      width: 100px;
    `}

    ${props => props.code && css`
      margin-right: 20px;
    `}

    ${props => props.name && css`
      font-weight: 400;
    `}
  `,
};
