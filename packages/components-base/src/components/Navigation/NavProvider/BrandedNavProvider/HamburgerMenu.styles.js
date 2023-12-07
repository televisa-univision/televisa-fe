import { css } from 'styled-components';

/**
 * Temporary styles for the hamburger menu component. These are NOT global selectors.
 * These are looking for child elements within the hamburger menu.
 * Once we move over the Mega Menu, this stylesheet should no longer exist.
 */
export default {
  wrapper: css`
    [data-element-name="AllSectionsMobile"] {
      top: 49px;
    }

    [data-element-name="AllSectionsDesktop"] {
      margin-top: 5px;
    }
  `,
};
