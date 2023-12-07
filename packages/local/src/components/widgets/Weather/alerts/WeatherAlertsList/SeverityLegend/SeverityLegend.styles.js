import {
  GREY_15,
  GREY_BLACK,
} from '@univision/fe-commons/dist/utils/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import { css } from 'styled-components';
import alertColors from '../../../../../compound/AlertList/AlertItem/alertColors';

export default {
  wrapper: css`
    align-items: center;
    border: 1px solid ${GREY_15};
    border-radius: 3px;
    display: flex;
    height: 40px;
    margin: 10px 0 16px;
    padding: 0 16px;
    width: 100%;

    ${media.sm`
      display: inline-flex;
      max-width: 375px;
      justify-content: space-around;
    `}
  `,
  title: css`
    color: ${GREY_BLACK};
    font-size: ${rem('10px')};
    text-transform: uppercase;
  `,
  label: ({ severity }) => css`
    color: ${alertColors[severity]};
    font-size: ${rem('10px')};
    line-height: 1px;
    margin-left: -7px;
    text-transform: uppercase;
  `,
  labelWrapper: css`
    align-items: center;
    display: flex;
    line-height: 0;
    margin-left: 10px;
  `,
};
