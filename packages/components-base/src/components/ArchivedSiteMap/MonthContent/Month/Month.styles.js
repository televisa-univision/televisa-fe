import { css } from 'styled-components';
import {
  BLACK_GREY,
  GREY_BOULDER,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  monthName: css`
    color: ${GREY_BOULDER};
    font-size: ${rem('28px')};
    line-height: ${rem('32px')};
    margin-bottom: 16px;
    text-transform: capitalize;
  `,
  part: css`
    color: ${BLACK_GREY};
    font-size: ${rem('16px')};
    font-weight: unset;
    line-height: ${rem('22px')};
    margin-bottom: 30px;
    width: max-content;
    a {
      color: ${BLACK_GREY};
    }
  `,
};
