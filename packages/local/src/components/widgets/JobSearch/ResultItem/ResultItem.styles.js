import { css } from 'styled-components';
import { media, numberOfLines } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  ASTRONAUT,
  BLACK,
  BLACK_08,
  BLACK_GREY,
  DARK_BLUE,
  WHITE,
  GREY_BLACK,
  MIDNIGHT_EXPRESS,
  VERY_LIGHT_GREY,
  TRANSPARENT,
} from '@univision/fe-commons/dist/utils/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';

export default {
  arrowIcon: css`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translate(0, -50%);
  `,
  applyButton: ({ isQuick }) => css`
    && {
      background: linear-gradient(45deg, ${DARK_BLUE} 0%, ${DARK_BLUE} 40.08%, ${MIDNIGHT_EXPRESS} 100%);
      border-radius: 4px;
      color: ${WHITE};
      cursor: pointer;
      display: inline-flex;
      font-size: ${rem('12px')};
      height: 44px;
      letter-spacing: 0.75px;
      line-height: ${rem('14px')};
      margin: 0;
      text-align: center;
      width: 50%;

      ${media.xs`
        max-width: 150px;
      `}

      &:hover {
        background-color: ${ASTRONAUT};
        background-image: none;
      }

      ${!isQuick && `
        background: ${WHITE};
        border: 1px solid ${ASTRONAUT};
        color: ${ASTRONAUT};
        &:hover {
          background-color: ${VERY_LIGHT_GREY};
          color: ${ASTRONAUT};
        }
      `}
    }
  `,
  clock: css`
    && {
      margin: 0 10px 0 0;
    }
  `,
  closeText: css`
    color: ${ASTRONAUT};
    font-size: ${rem('12px')};
    letter-spacing: 0.75px;
    line-height: ${rem('14px')};
    margin-right: 5px;
    text-transform: uppercase;
  `,
  closeButton: css`
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 45%;

    ${media.xs`
      margin-left: 35px;
      width: 108px;
    `}
  `,
  collapsible: css`
    margin-bottom: 5px;
    > button {
      padding: 0;
    }

    ${media.xs`
      margin-bottom: 16px;
    `}
  `,
  company: css`
    color: ${GREY_BLACK};
    display: block;
    font-size: ${rem('10px')};
    letter-spacing: 0.63px;
    line-height: ${rem('14px')};
    margin-bottom: 8px;
    text-transform: uppercase;

    ${numberOfLines(1)}
  `,
  descriptionText: css`
    color: ${BLACK_GREY};
    font-size: ${rem('14px')};
    letter-spacing: 0;
    line-height: ${rem('18px')};
    margin-bottom: 20px;
  `,
  info: css`
    flex-direction: column;
    justify-content: center;
    width: 100%;
      ${media.xs`
        display: inline-flex;
      `}
  `,
  header: css`
    align-items: flex-start;
    background-color: ${WHITE};
    border-bottom: 0;
    border-radius: 4px;
    box-shadow: 0 0 4px 0 ${BLACK_08};
    display: flex;
    flex-direction: column;
    height: 169px;
    padding: 25px 16px 16px;
    position: relative;
    text-align: left;
    width: 100%;

    ${media.xs`
      align-items: center;
      height: 94px;
      padding: 16px;
      flex-direction: row;
    `}
  `,
  buttons: css`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;

    ${media.xs`
      margin-top: 0;
      justify-content: flex-end;
      display: inline-flex;
    `}
  `,
  lastDetails: css`
    align-items: center;
    display: flex;
  `,
  locationIcon: css`
    margin-right: 8px;
  `,
  title: css`
    color: ${BLACK};
    display: block;
    font-size: ${rem('14px')};
    letter-spacing: 0;
    line-height: ${rem('18px')};
    ${numberOfLines(2)}
    margin-bottom: 4px;

    ${media.sm`
      font-size: ${rem('16px')};
    `}
  `,
  text: css`
    color: ${GREY_BLACK};
    font-size: ${rem('10px')};
    letter-spacing: 1px;
    line-height: ${rem('14px')};
    text-transform: uppercase;
  `,
  applyContainer: css`
    display: flex;
    flex-direction: column;
    ${media.sm`
      flex-direction: row;
    `}
  `,
  companyInfoContainer: css`
    display: flex;
    width: 100%;
  `,
  companyInfo: css`
    display:flex;
    flex-direction: column;
    width: 100%;
  `,
  logoWrapper: css`
    border-radius: 1000px;
    flex: 0 0 auto;
    max-height: 80px;
    overflow: hidden;
    position: relative;
  `,
  pictureOverlay: css`
    background: ${linearGradient({ direction: '180deg', start: TRANSPARENT, end: BLACK_GREY })};
    bottom: 0;
    left: 0;
    opacity: 0.6;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 1;
  `,
  linkDetail: css`
    color: ${ASTRONAUT};
    font-size: ${rem('12px')};
    letter-spacing: 1px;
    line-height: ${rem('14px')};
    margin-left: 15px;
  `,
  titleCompany: css`
    color: ${BLACK};
    display: block;
    font-size: ${rem('14px')};
    letter-spacing: 0;
    line-height: ${rem('18px')};
    ${numberOfLines(2)}
    margin: 13px 0 0 15px;
    ${media.sm`
      font-size: ${rem('16px')};
    `}
  `,
  detailCompany: css`
    color: ${GREY_BLACK};
    font-size: ${rem('10px')};
    letter-spacing: 1px;
    line-height: ${rem('14px')};
    margin: 3px 0 10px 15px;
    text-transform: uppercase;
  `,
  titleAboutCompany: css`
    color: ${BLACK};
    display: block;
    font-size: ${rem('14px')};
    letter-spacing: 0;
    line-height: ${rem('18px')};
    ${numberOfLines(2)}
    margin-bottom: 14px;
    ${media.sm`
      font-size: ${rem('14px')};
    `}
  `,
};
