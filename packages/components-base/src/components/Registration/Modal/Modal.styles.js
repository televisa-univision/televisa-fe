import { css } from 'styled-components';
import {
  BLACK_70,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  description: css`
    font-size: ${rem('16px')};
    line-height: ${rem('22px')};
    margin: 10px 0 24px;
    text-align: center;
  `,
  iconWrapper: css`
    height: 85px;
    width: 85px;
  `,
  modalWrapper: css`
    align-items: center;
    background-color: ${BLACK_70};
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
  `,
  modalContainer: css`
    align-items: center;
    background-color: ${WHITE};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    height: 290px;
    padding: 24px;
    width: 300px;
    button {
      height: 47px;
      width: 88px;
    }
  `,
};
