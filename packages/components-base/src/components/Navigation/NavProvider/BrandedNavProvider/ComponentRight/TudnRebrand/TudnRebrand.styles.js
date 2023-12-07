import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import { SILVER_SAND, WHITE, SPRING_GREEN } from '@univision/fe-utilities/styled/constants';

/**
 * Temporary styles for the hamburger menu component. These are NOT global selectors.
 * These are looking for child elements within the hamburger menu.
 * Once we move over the Mega Menu, this stylesheet should no longer exist.
 */
export default {
  matchesWrapper: css`
    align-items: center;
    border-right: 1px solid ${SILVER_SAND};
    display: flex;
    font-family: 'Poppins', sans-serif;
    margin-right: 20px;
    padding-right: 20px;

    > a {
      color: ${WHITE};
    }

    > span {
      font-size: ${rem(16)};
      font-weight: 700;
      letter-spacing: ${rem(0.5)};
      margin-left: 8px;
      text-transform: uppercase;
    }
  `,
  partidosText: ({ isMatchesActive }) => css`
    color: ${isMatchesActive ? SPRING_GREEN : WHITE};
    display: none;

    ${media.xs`
      display: block;
    `}
  `,
  vixLogoWrapper: css`
    max-height: 20px;
  `,
  wrapper: css`
    align-items: center;
    display: flex;
    flex-direction: row;

    ${media.md`
      margin-right: 0;
    `}
  `,
};
