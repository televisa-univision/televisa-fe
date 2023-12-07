import { css } from 'styled-components';
import mediaRange from '@univision/fe-utilities/styled/mixins/mediaRange';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  MONTSERRAT_FONT_FAMILY,
  ROBOTO_CONDENSED_FONT_FAMILY,
  WHITE,
  GREY_SILVER_CHALICE,
  BLACK_35,
  APP_BREAKPOINTS,
} from '@univision/fe-utilities/styled/constants';

export default {
  container: css`
    cursor: pointer;
    flex: 1;
    height: 100%;
    position: relative;
    z-index: 0;
    ${media.md`
      height: 480px;
    `}
  `,
  prendeCard: css`
    border-radius: 4px;
    display: block;
    height: 100%;
  `,
  aspectRatioBox: css`
    ${mediaRange(APP_BREAKPOINTS.xxs, APP_BREAKPOINTS.xs, `
      height: 100%;
      overflow: hidden;
      padding-bottom: 100%;
      position: relative;
    `)}
  `,
  squareBadgeStyle: css`
    left: 16px;
    pointer-events: none;
    position: absolute;
    top: 16px;
    z-index: 1;
`,
  innerAspectRatioBox: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    ${mediaRange(APP_BREAKPOINTS.xxs, APP_BREAKPOINTS.xs, `
      justify-content: space-between;
      left: 0;
      position: absolute;
      top: 0;
    `)}
    width: 100%;
    ${media.md`
      height: 100%;
      display: flex;
      flex-direction: row;
    `}
  `,
  content: ({ backgroundImage }) => css`
    background-image: url(${backgroundImage});
    background-size: cover;
    color: ${WHITE};
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    position: relative;
    ${media.xs`
      height: 480px;
      display: flex;
      flex-direction: column;
      width: 100%;
      background-image: url(${backgroundImage});
      justify-content: space-between;
`}
`,
  bottomContainer: css`
    align-items: center;
    background-color: ${BLACK_35};
    border-top: 1px solid ${GREY_SILVER_CHALICE};
    display: flex;
    flex-direction: column;
    height: 105px;
    justify-content: center;
    ${media.sm`
      height: 124px;
      flex-direction: row;
      width: 100%;
      gap: 30px;
      padding-right: 30px;
    `}
  `,
  titleContainer: css`
    align-items: left;
    display: flex;
    flex-direction: column;
    padding: 0 0 20px 16px;

    p {
      font-size: ${rem('16px')};
      font-weight: 700;
      line-height: ${rem('20px')};
      margin: 0;
      padding: 4px 0 0 0;
      text-align: left;
    }

    ${media.sm`
      padding: 0;
      p {
        font-size: ${rem('20px')};
        line-height: ${rem('24px')};
        text-align: center;
      }
    `}
    ${media.md`
      margin-bottom: 0;
      margin-left: 0;
      width: 100%;
      justify-content: center;
      align-items: center;
    `}
  `,
  innerContent: css`
    display: flex;
    flex-direction: column;
`,
  prendeIconStyle: css`
    height: 300px;
    width: 300px;
`,
  title: css`
    font-family: ${MONTSERRAT_FONT_FAMILY};
`,
  subTitle: css`
    font-family: ${MONTSERRAT_FONT_FAMILY};
`,
  footerTitle: css`
    display: flex;
    font-family: ${ROBOTO_CONDENSED_FONT_FAMILY};
    font-size: ${rem('14px')};
    letter-spacing: 1.17px;
    margin-top: 15px;
    position: relative;
    text-transform: uppercase;
    ${media.sm`
      margin-top: 0;
      margin-bottom: 0;
    `}
`,
  topImage: css`
    height: auto;
    max-width: 300px;
    width: 100%;
    ${media.md`
      max-width: 30px;
    `}
`,
  divider: css`
    background-color: ${GREY_SILVER_CHALICE};
    display: none;
    height: 1px;
    margin-bottom: 14px;
    width: 80vw;

    ${media.md`
      display: none;
      height: 80%;
      margin-bottom: 0;
      width: 1px;
    `}
  `,
  championsIcon: css`
    height: 91px;
    margin-bottom: auto;
    margin-top: 0;
    max-height: 91px;
    width: 100%;

    ${media.md`
      height: 137px;
      margin-top: 0;
      margin-bottom: 0;
      max-height: 137px;
      width: 100%;
    `}
  `,
  imgWrapper: css`
    align-items: center;
    display: flex;
    height: fit-content;
    justify-content: center;
    margin: 14% 0 10% 0;
    ${media.md`
      margin-top: 0;
      margin-bottom: 0;
      padding: 50px 0;
    `}
  `,
  topWrapper: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 70%;
    justify-content: center;
    width: 100%;
    ${media.xs`
      height: fit-content;
    `}
  `,
};
