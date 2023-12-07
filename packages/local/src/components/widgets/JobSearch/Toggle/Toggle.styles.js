import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { GREY_BLACK } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  label: css`
    color: ${GREY_BLACK};
    font-size: ${rem('16px')};
    line-height: ${rem('20px')};
    margin-right: 16px;
  `,
  toggleWrapper: css`
    max-width: 470px;
  `,
};
