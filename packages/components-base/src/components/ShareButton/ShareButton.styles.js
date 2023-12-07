import { css } from 'styled-components';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';

import {
  FACEBOOK, TWITTER, WHATSAPP, MAIL,
} from '@univision/fe-commons/dist/constants/socialTypes';
import {
  FACEBOOK_BACKGROUND,
  FACEBOOK_TELEVISA_BACKGROUND,
  TWITTER_BACKGROUND,
  TWITTER_TELEVISA_BACKGROUND,
  WHATSAPP_BACKGROUND,
  FACEBOOK_HOVER,
  TWITTER_HOVER,
  WHATSAPP_HOVER,
  GREY,
  GREY_70,
  WHITE,
  DARK_VARIANT,
  COLOR_VARIANT,
  ROUNDED_VARIANT,
  BLACK_GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';

const WHITE_SVG = css`
  svg {
    path {
      fill: ${WHITE};
    }
  }
`;

/**
 * Get colored styles
 * @param {string} name the name of the social network
 * @param {string} isTelevisaSite televisa site parent
 * @returns {string}
 */
const getColorStyles = (name, isTelevisaSite) => getFromMap(name, {
  [FACEBOOK]: css`
    svg {
      path {
        fill: ${isTelevisaSite ? FACEBOOK_TELEVISA_BACKGROUND : FACEBOOK_BACKGROUND};
      }
    }
  `,
  [TWITTER]: css`
    svg {
      path {
        fill: ${isTelevisaSite ? TWITTER_TELEVISA_BACKGROUND : TWITTER_BACKGROUND};
      }
    }

  `,
  [MAIL]: css`
    svg {
      path {
        fill: ${GREY};
      }
    }
  `,
  [WHATSAPP]: css`
    svg {
      path {
        fill: ${WHATSAPP_BACKGROUND};
      }
    }
  `,
});

/**
 * Get button styles
 * @param {string} name the name of the social network
 * @param {string} isTelevisaSite televisa site parent
 * @returns {string}
 */
const getButtonStyles = (name, isTelevisaSite) => getFromMap(name, {
  [FACEBOOK]: css`
    &:hover {
      svg {
        path {
          fill: ${isTelevisaSite ? FACEBOOK_TELEVISA_BACKGROUND : FACEBOOK_BACKGROUND};
        }
      }
    }
  `,
  [TWITTER]: css`
    &:hover {
      svg {
        path {
          fill: ${isTelevisaSite ? TWITTER_TELEVISA_BACKGROUND : TWITTER_BACKGROUND};
        }
      }
    }
  `,
  [MAIL]: css`
    &:hover {
      svg {
        path {
          fill: ${GREY};
        }
      }
    }
  `,
  [WHATSAPP]: css`
    &:hover {
      svg {
        path {
          fill: ${WHATSAPP_BACKGROUND};
        }
      }
    }
  `,
});

/**
 * Get Rounded Styles
 * @param {string} name the name of the social network
 * @param {string} isTelevisaSite televisa site parent
 * @returns {string}
 */
const getRoundedStyles = (name, isTelevisaSite) => getFromMap(name, {
  [FACEBOOK]: css`
    background-color: ${isTelevisaSite ? FACEBOOK_TELEVISA_BACKGROUND : FACEBOOK_BACKGROUND};
    ${WHITE_SVG}
    &:hover {
      background-color: ${FACEBOOK_HOVER};
      svg {
        path {
          fill: ${WHITE};
        }
      }
    }
  `,
  [TWITTER]: css`
    background-color: ${isTelevisaSite ? TWITTER_TELEVISA_BACKGROUND : TWITTER_BACKGROUND};
    ${WHITE_SVG}
    &:hover {
      background-color: ${TWITTER_HOVER};
      svg {
        path {
          fill: ${WHITE};
        }
      }
    }
  `,
  [MAIL]: css`
    background-color: ${GREY};
    ${WHITE_SVG}
    &:hover {
      background-color: ${GREY_70};
      svg {
        path {
          fill: ${WHITE};
        }
      }
    }
  `,
  [WHATSAPP]: css`
    background-color: ${WHATSAPP_BACKGROUND};
    ${WHITE_SVG}
    &:hover {
      background-color: ${WHATSAPP_HOVER};
      svg {
        path {
          fill: ${WHITE};
        }
      }
    }
  `,
});

export default {
  link: ({ name, theme, isTelevisaSite }) => css`
    border-radius: 1px;
    display: inline-block;
    ${theme !== ROUNDED_VARIANT && media.xs`
        padding: 0 20px;

        &:first-child {
          padding-left: 0;
        }

        &:last-child {
          padding-right: 0;
        }
    `}

   ${theme === DARK_VARIANT && css`
      svg {
        path {
          fill: ${BLACK_GREY};
        }
      }
    `}
    ${theme === COLOR_VARIANT && css`
      ${getColorStyles(name, isTelevisaSite)}
    `}

    ${theme === ROUNDED_VARIANT ? css`
      background-color: ${GREY};
      border-radius: 100%;
      height: 40px;
      line-height: 40px;
      margin-left: 22px;
      padding: 0;
      text-align: center;
      width: 40px;

      &:first-child {
        margin-left: 0;
        padding-left: 0;
        padding-right: 0;
      }
      ${getRoundedStyles(name, isTelevisaSite)}
    ` : css`
    ${getButtonStyles(name, isTelevisaSite)}`}
    ${isTelevisaSite && name !== MAIL && css`
      svg {
        height: 100%;
        width: 100%;
      }
    `}
  `,
};
