import { css } from 'styled-components';
import {
  LIGHT_GREY,
  WHITE_GREY,
  BLACK_GREY,
  GREY_30,
  GREY_BLACK,
  ZINDEX_REACTION,
} from '@univision/fe-commons/dist/utils/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  SOCCER,
} from '@univision/fe-commons/dist/constants/sportTypes';

/**
 * Right variations
 * @param {Object} props Get right for cta share for reaction container
 * @returns {string}
 */
export const getRightPositionShareCta = ({ isLandscape, isMobile }) => {
  if (isMobile) return '22px';
  if (isLandscape) return '35px';
  return '0';
};

const SHARE_ICON_POSITION = {
  contentLayout: {
    mobile: '90px',
    desktop: '70px',
  },
  default: '20px',
  landscape: '34px',
  listCard: '10px',
  longShareLabel: {
    mobile: '115px',
    desktop: '95px',
  },
};

/**
 * Right variations shareIcon
 * @param {Object} props Get right for cta share for reaction container
 * @returns {string}
 */
export const getRightPositionShareIcon = ({
  hasLongShareLabel,
  isLandscape,
  isMobile,
  isContentLayout,
  isListCard,
  isWorldCupMVP,
}) => {
  const {
    listCard,
    landscape,
    longShareLabel,
    contentLayout: { mobile, desktop },
  } = SHARE_ICON_POSITION;
  let position = SHARE_ICON_POSITION.default;
  const mobileLabel = hasLongShareLabel ? longShareLabel.mobile : mobile;
  const desktopLabel = hasLongShareLabel ? longShareLabel.desktop : desktop;
  const ctMobileWorldCup = isWorldCupMVP ? '100px' : mobileLabel;
  const ctDesktopWorldCup = isWorldCupMVP ? '80px' : desktopLabel;

  if (isListCard) position = listCard;

  if (isContentLayout && !hasLongShareLabel) {
    position = isMobile
      ? ctMobileWorldCup
      : ctDesktopWorldCup;
  }

  if (isContentLayout && hasLongShareLabel) {
    position = isMobile
      ? ctMobileWorldCup
      : ctDesktopWorldCup;
  }

  if (isLandscape) position = landscape;

  return css`
    right: ${position};
  `;
};

export default {
  actionStyled: ({
    hasLongShareLabel,
    isActive,
    isContentLayout,
    isDark,
    isLandscape,
    isListCard,
    isMobile,
    type,
  }) => {
    const darkBorderColor = type === SOCCER ? GREY_BLACK : GREY_30;
    return css`
    ${!isActive && !isContentLayout && !isListCard && `border-top: 1px solid ${isDark ? darkBorderColor : LIGHT_GREY};`}
    ${isActive && !isContentLayout && 'padding-top: 1px;'}

    > div:last-child {
  ${getRightPositionShareIcon({
      hasLongShareLabel,
      isContentLayout,
      isLandscape,
      isListCard,
      isMobile,
    })};
  ${isListCard && css`top: 24px;`}
    }
  `;
  },
  ctaShare: ({
    isDark,
    isActive,
    isLandscape,
    isMobile,
    isWorldCupMVP,
  }) => css`
    color: ${isDark ? WHITE_GREY : BLACK_GREY};
    cursor: pointer;
    font-size: ${rem('12px')};
    letter-spacing: 1px;
    line-height: ${rem('14px')};
    position: absolute;
    right: ${getRightPositionShareCta({ isMobile, isLandscape, isWorldCupMVP })};
    text-transform: uppercase;
    top: 18px;
    z-index: ${isActive ? '-1' : '0'};
    ${isWorldCupMVP && css`
    font-family: 'Roboto Flex', sans-serif;
    font-size: ${rem('14px')};
    font-style: normal;
    letter-spacing: 0.015em;
    line-height: ${rem('21px')};
    top: 15px;
    `}
  `,
  wrapper: ({ isListCard, isOpen }) => css`
    position: relative;
    z-index: ${ZINDEX_REACTION};
    ${isListCard && css`
      width: ${isOpen ? '100%' : '50%'};
    `}
  `,
};
