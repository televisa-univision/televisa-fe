import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import diamond from '@univision/fe-commons/dist/assets/images/tudn/world-cup-diamond.svg';
import { WHITE } from '@univision/fe-utilities/styled/constants';

export default {
  teamItem: css`
    margin-bottom: 8px;

    &:last-of-type {
      margin-bottom: 0;
    }
  `,
  teamsWrapper: css`
    background-color: ${WHITE};
    border-radius: 6px;
    padding: 8px;
  `,
  title: css`
    align-items: center;
    color: ${WHITE};
    display: flex;
    font-family: 'Roboto Flex', sans-serif;
    font-size: ${rem(16)};
    font-weight: 700;
    margin-bottom: 16px;

    &:after,
    &:before {
      background: url(${diamond});
      content: ' ';
      width: 8px;
      height: 8px;
    }

    &:after {
      margin-left: 10px;
    }

    &:before {
      margin-right: 10px;
    }
  `,
};
