import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import {
  BLACK_01,
  CLARET,
  INTL_ORANGE,
  JACARANDA,
  WHITE,
} from '@univision/fe-utilities/styled/constants';

export default {
  link: css`
    display: block;
  `,
  scoreCard: css`
    width: 100%;
  `,
  scoreCell: css`
    margin-bottom: 16px;

    &:last-of-type {
      margin-bottom: 0;
    }

    ${media.md`
      margin-bottom: 0;
    `}
  `,
  vixLink: css`
    align-items: center;
    background: linear-gradient(180deg, ${JACARANDA} 49.16%, ${CLARET} 213.48%);
    border: 1px solid ${INTL_ORANGE};
    border-radius: 16px;
    box-shadow: 0px 4px 8px ${BLACK_01};
    display: flex;
    padding: 8px 16px;
  `,
  vixLinkLabel: css`
    color: ${WHITE};
    font-family: 'Roboto Flex', sans-serif;
    font-size: ${rem(10)};
    font-weight: 400;
    margin-right: 7px;
    text-transform: uppercase;
  `,
  vixLinkWrapper: css`
    display: flex;
    flex-direction: row-reverse;
    margin-top: 4px;
  `,
  wrapper: css`
    padding: 30px 18px;

    ${media.md`
      display: grid;
      gap: 0 16px;
      grid-template-columns: repeat(4, 1fr);
    `}
  `,
};
