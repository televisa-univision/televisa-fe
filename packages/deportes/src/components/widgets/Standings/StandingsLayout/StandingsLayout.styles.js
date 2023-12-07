import { css } from 'styled-components';
import { SPRING_GREEN, WOOD_SMOKE } from '@univision/fe-utilities/styled/constants';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

const buttonMvp = css`
  background-color: ${SPRING_GREEN};
  border-bottom-color: none;
  border-bottom-style: none;
  border-bottom-width: 0px;
  font-size: 0.875rem;
  height: 42px;
  & p {
    color: ${WOOD_SMOKE};
    font-size: ${rem(14)};
    line-height: ${rem(16)};
    margin-right: 5px;
    font-weight: 700;
  }
  line-height: ${rem(16)};
  margin-right: 5px;
  width: 100%;
  &:hover {
    background-color: none;
    border-style: none;
  }`;
export default {
  buttonMvp,
};
