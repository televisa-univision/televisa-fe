import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import numberOfLines from '@univision/fe-utilities/styled/mixins/numberOfLines';
import {
  BLACK,
  PARCHMENT,
  WHITE_LINEN,
} from '@univision/fe-utilities/styled/constants';

export default {
  img: css`
    height: 21px;
  `,
  link: css`
    background-color: ${WHITE_LINEN};
    border-radius: 6px;
    box-shadow: 0px 2px 0px ${PARCHMENT};
    display: flex;
    height: 29px;
    overflow: hidden;
    padding: 4px 6px;
  `,
  teamName: css`
    color: ${BLACK};
    font-family: 'Roboto Flex', sans-serif;
    font-size: ${rem(12)};
    font-weight: 600;
    margin-left: 8px;
    ${numberOfLines(1)}

    ${media.md`
      font-size: ${rem(11)};
    `}
  `,
};
