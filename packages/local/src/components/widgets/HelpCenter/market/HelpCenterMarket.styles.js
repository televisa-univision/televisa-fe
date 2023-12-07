import { css } from 'styled-components';
import {
  VERY_LIGHT_GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  wrapper: css`
    && {
      align-items: center;
      display: flex;
      gap: 10px;
      padding: 0 auto;
    }
    `,

  dropDownWrapper: css`
    && {
      background-color: ${VERY_LIGHT_GREY};
      font-family: 'Roboto Condensed', Roboto, sans-serif;
      font-size: ${rem('16px')};
      line-height: ${rem('22px')};
      outline: none;
      padding: 8px 40px 8px 8px;  
    }
  `,

  paragraph: css`
    && {
      margin: 0;
    }
  `,
};
