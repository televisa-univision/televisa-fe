import { css } from 'styled-components';
import { rem, media } from '@univision/fe-commons/dist/utils/styled/mixins';
import { WHITE, CONCRETE, BLACK } from '@univision/fe-commons/dist/utils/styled/constants';

const flexColumn = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default {
  container: css`
    background-color: ${WHITE};
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    height: 120px;
    position: relative;
    width: 96px;

    ${media.md`
       width: 90px;
       height: 112px;
    `}
  `,
  iconButton: css`
    -webkit-tap-highlight-color: transparent;
    box-shadow: none;
    outline: none;
  `,
  main: css`
    ${flexColumn}
  `,
  favoriteIcon: css`
    cursor: pointer;
    position: absolute;
    right: 6px;
  `,
  title: css`
    color: ${BLACK};
    font-size: ${rem('14px')};
    font-weight: bold;
    margin-bottom: 8px;
    margin-top: 16px;
  `,
  mainIconContainer: css`
    align-items: center;
    background-color: ${CONCRETE};
    border-radius: 100%;
    display: flex;
    height: 52px;
    justify-content: center;
    width: 52px;

    ${media.md`
       width: 43px;
       height: 43px;
       padding: 2px;
    `}
  `,
};
