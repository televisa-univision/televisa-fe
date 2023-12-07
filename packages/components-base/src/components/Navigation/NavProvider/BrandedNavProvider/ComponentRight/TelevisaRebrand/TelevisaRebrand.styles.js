import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import { WHITE, WHITE_RGB } from '@univision/fe-utilities/styled/constants';

/**
 * Function for setting Nav type color text hover
 * @param {Object} theme - the styled component props
 * @param {Object} isTudnMX - the styled component props
 * @returns {string}
 */
const getDisplayLogo = (theme) => {
  if (!theme.showVixLogo) {
    return 'none';
  }
  return 'block';
};

/**
 * Function for setting the vix logo divider color
 * @param {Object} theme - the styled component props
 * @returns {string}
 */
const getVixLogoDividerColor = (theme) => {
  if (theme?.colorVixLogoDivider) {
    return theme.colorVixLogoDivider;
  }
  return WHITE_RGB;
};

/**
 * Temporary styles for the hamburger menu component. These are NOT global selectors.
 * These are looking for child elements within the hamburger menu.
 * Once we move over the Mega Menu, this stylesheet should no longer exist.
 */
export default {
  vixLogoWrapper: ({ theme }) => css`
    border-left: ${`1px solid rgba(${getVixLogoDividerColor(theme)}, .2)`};
    display: ${getDisplayLogo(theme)};
    max-height: 20px;
    padding-left: 12px;
  `,
  searchIcon: css`
    align-items: center;
    display: flex;
    margin-right: 12px;
  `,
  searchLabel: ({ theme }) => css`
    color: ${theme.colorBrandedLabels || WHITE};
    font-size: ${rem(14)};
    font-weight: 700;
    line-height: 20px;
    margin-left: 4px;
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
