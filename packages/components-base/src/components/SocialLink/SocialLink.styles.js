import { css } from 'styled-components';

import {
  DARKER_GREY,
  FACEBOOK_BACKGROUND,
  INSTAGRAM_BACKGROUND,
  TWITTER_BACKGROUND,
  YOUTUBE_BACKGROUND,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';

export default {
  socialLink: ({ type }) => css`
    background-color: ${DARKER_GREY};
    width: 100%;

    a {
      display: block;
      color: ${WHITE};
      width: 100%;
      padding: 0.5rem;
      text-transform: uppercase;
      font-size: 0.6875rem;
      line-height: 0.875rem;
      -webkit-font-smoothing: antialiased;
    }

    svg {
      margin-right: 0.5rem;
    }

    ${getFromMap(type,
    {
      facebook: css`
        background-color: ${FACEBOOK_BACKGROUND};
      `,
      twitter: css`
        background-color: ${TWITTER_BACKGROUND};
      `,
      instagram: css`
        background-color: ${INSTAGRAM_BACKGROUND};
      `,
      youtube: css`
        background-color: ${YOUTUBE_BACKGROUND};
      `,
    })}
  `,
};
