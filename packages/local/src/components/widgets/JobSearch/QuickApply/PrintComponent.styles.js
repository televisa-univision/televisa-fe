import { css } from 'styled-components';
import { VERY_LIGHT_GREY } from '@univision/fe-commons/dist/utils/styled/constants';
import { BLACK, BLACK_GREY } from '@univision/fe-utilities/styled/constants';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  paperClip: css`
    margin-right: 10px;
  `,
  titlePrint: css`
    color: ${BLACK_GREY};
    display: block;
    font-size: ${rem('16px')};
    font-weight: bold;
    letter-spacing: 0;
    line-height: ${rem('19px')};
  `,
  textPrint: css`
    color: ${BLACK};
    font-size: ${rem('16px')};
    font-weight: 300;
    letter-spacing: 0;
    line-height: ${rem('20px')};
  `,
  wrapper: css`
    background-color: ${VERY_LIGHT_GREY};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    height: 276px;
    justify-content: space-around;
    margin: 16px 0;
    padding: 16px;
  `,
};
