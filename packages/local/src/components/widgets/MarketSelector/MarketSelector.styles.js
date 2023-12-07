import { css } from 'styled-components';
import {
  BLACK, WHITE, DARK_BLUE, ZINDEX_ABOVE_NAVIGATION,
  ZINDEX_ABOVE_NAVIGATION_AND_SEARCH, BLACK_20, LIGHT_GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  container: ({ hasAdSkin }) => css`
    max-width: 830px;
    position: relative;
    width: 100%;
    z-index: ${ZINDEX_ABOVE_NAVIGATION_AND_SEARCH};

    ${hasAdSkin && css`
      max-width: 500px;
    `}
  `,
  marketTopicBar: ({ open }) => css`
    background: ${DARK_BLUE};
    font-size: ${rem('14px')};
    letter-spacing: initial;
    line-height: ${rem('17px')};
    margin: 0;
    padding: 16px 10px;
    padding-left: 20px;

    div > a {
      color: ${WHITE};
      display: flex;
      align-items: center;
      max-height: 24px;
      img {
        max-height: 24px;
      }
    }
    svg {
      path {
        fill: ${WHITE};
      }
      ${media.sm`
        transition: all 1s;
        transform: ${open ? 'rotate(-90deg)' : 'rotate(90deg)'};
      `}
    }
    ${media.sm`
      padding: 8px 10px;
    `}
    span {
      color: ${WHITE};
    }
    div > span:first-child {
      color: ${WHITE};
      font-size: ${rem('18px')};
      line-height: ${rem('22px')};
      max-height: 24px;
      text-transform: initial;

      ${media.sm`
        font-size: ${rem('16px')};
        line-height: ${rem('19px')};
      `}
    }
  `,
  marketButton: css`
    cursor: pointer;
    margin-left: -4px;
    padding: 0;
    width: 100vw;

    ${media.sm`
      width: 100%;
      margin-left: 0;
    `}
  `,
  linksContainer: css`
    background: #fff;
    box-shadow: 0px 3px 4px 0px ${BLACK_20};
    height: calc(100vh - 50px);
    left: 0;
    padding: 24px;
    padding-bottom: 40px;
    position: fixed;
    top: 50px;
    z-index: ${ZINDEX_ABOVE_NAVIGATION};
    ${media.sm`
      top: initial;
      height: initial;
      position: absolute;
    `}
  `,
  LinkList: css`
    display: flex;
    flex-wrap: wrap;
  `,
  linkMenu: css`
    color: ${BLACK};
    font-size: ${rem('16px')};
    line-height: ${rem('20px')};
    padding: 14px 0 8px;
    position: relative;
    text-align: initial;

    :before {
      background: ${LIGHT_GREY};
      bottom: 0;
      content: "";
      height: 1px;
      position: absolute;
      width: 85%;
    }
    ${media.sm`
      margin: 8px 0;
      padding: 0;
      :before {
        background: none;
      }
    `}
  `,
  linkDescription: css`
    color: ${BLACK};
    font-size: ${rem('16px')};
    font-weight: bold;
    line-height: ${rem('19px')};
    margin-bottom: 24px;
  `,
};
