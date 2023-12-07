import { css } from 'styled-components';
import {
  VERY_LIGHT_GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  dropDownWrapper: css`
    && {
      background-color: ${VERY_LIGHT_GREY};
      font-family: 'Roboto Condensed', Roboto, sans-serif;
      font-size: ${rem('16px')};
      line-height: ${rem('22px')};
      outline: none;
      padding: 8px 16px 8px 8px;
    }
  `,
  wrapper: css`
    && {
      margin-bottom: 20px;
    }
  `,
  itemContainer: css`
    && {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: flex-start;
    }
  `,
  buttonContainer: css`
    && {
      display: flex;
      justify-content: center;
    }
  `,
  cardContainer: css`
    && {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin: 4px;
      width: 95vw;

      ${media.sm`
        width: 31%;
    `}
    }
  `,
  cardContainerMore: css`
    display: flex;
    flex-direction: row;
    width: 65%;
  `,
};
