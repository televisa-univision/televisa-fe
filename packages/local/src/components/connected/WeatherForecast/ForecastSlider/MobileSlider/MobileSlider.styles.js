import { css } from 'styled-components';
import { ALABASTER, LIGHT_GREY } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  wrapper: css`
    background-color: ${ALABASTER};
    border-bottom: 1px solid ${LIGHT_GREY};
    display: block;
    margin-left: -23px;
    margin-right: -23px;
    margin-top: 16px;
    min-height: 187px;
    overflow-y: hidden;
    padding-bottom: 16px;
    padding-top: 8px;
    position: relative;
    user-select: none;
  `,
  scrollArea: css`
    -webkit-overflow-scrolling: touch;
    display: block;
    margin-bottom: -25px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 25px;
    padding-left: 23px;
    padding-right: 23px;
  `,
};
