import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  BLACK_HAZE,
  DESERT_STORM,
  GENOA,
  SNUFF,
} from '@univision/fe-utilities/styled/constants';

export default {
  content: css`
    display: flex;
    flex-direction: column;
    padding: 10px 12px 10px 10px;
  `,
  contentColumn: ({ alignment, isColored }) => css`
    align-items: center;
    display: flex;
    font-family: 'Roboto Flex', sans-serif;
    font-size: ${rem(12)};
    font-weight: 700;
    justify-content: ${alignment || 'center'};
    line-height: ${rem(14)};
    text-transform: uppercase;

    ${isColored && css`
      color: ${GENOA};
    `}
  `,
  contentRow: ({ isHighlighted }) => css`
    display: grid;
    grid-template-columns: 1fr 5fr repeat(4, 1fr);
    margin-bottom: 4px;

    ${isHighlighted && css`
      background: ${SNUFF};
      border-radius: 6px;
    `}
  `,
  headerColumn: ({ alignment, isColored }) => css`
    font-family: 'Roboto Flex', sans-serif;
    font-size: ${rem(12)};
    font-weight: 700;
    line-height: ${rem(14)};
    text-align: ${alignment || 'center'};
    text-transform: uppercase;

    ${isColored && css`
      color: ${GENOA};
    `}
  `,
  header: css`
    background: ${BLACK_HAZE};
    border-radius: 4px 4px 0px 0px;
    display: grid;
    grid-template-columns: 6fr repeat(4, 1fr);
    padding: 6px 12px 4px 10px;
  `,
  teamImg: css`
    width: 21px;
  `,
  teamName: css`
    margin-left: 10px;
    text-transform: none;
  `,
  wrapper: css`
    background: ${DESERT_STORM};
    border-radius: 4px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `,
};
