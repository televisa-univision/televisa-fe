import { css } from 'styled-components';
import { rem, media } from '@univision/fe-commons/dist/utils/styled/mixins/index';
import {
  BLACK_GREY,
  GREY_BLACK,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  profileWrapper: css`
    display: flex;
    flex: 0 0 100%;
    flex-direction: column;
    margin-left: 0;
    margin-right: 0;
    padding: 0;
  `,
  hoverLink: ({ title, profileImage }) => css`
    flex: 1;
    padding: 0;

    ${media.sm`
      ${profileImage} {
        transition: filter 0.2s linear;
      }

      &:hover {
        ${profileImage} {
          filter: brightness(1.1);
        }

        ${title} {
          color: ${GREY_BLACK};
        }
      }
    `}
  `,
  title: ({ variant }) => css`
    color: ${variant === 'dark' ? WHITE : BLACK_GREY};
    font-size: ${rem(18)};
    line-height: ${rem(22)};
    margin-bottom: 8px;
    transition: color 0.2s linear;
  `,
  description: css`
    color: ${GREY_BLACK};
    font-size: ${rem(14)};
    line-height: ${rem(17)};
    margin-bottom: 8px;
  `,
  followComponent: ({ isTalent }) => css`
    flex: 1;
    margin: ${isTalent ? 0 : 8}px 0 8px;
  `,
  separatorBackground: css`
    margin-bottom: 8px;
  `,
};
