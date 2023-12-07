import { css } from 'styled-components';
import {
  ASTRONAUT,
  BLACK,
  BLACK_GREY,
  DARKER_GREY,
  GREY_BLACK,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  address: css`
    margin: 8px 0;
    padding-left: 40px;
    position: relative;
  `,
  addressIcon: css`
    left: 8px;
    position: absolute;
    top: 5px;
  `,
  callExpertButton: css`
    margin-top: 24px;

    ${media.sm`
      margin: 40px 0 30px;
    `}
  `,
  company: css`
    color: ${BLACK};
    font-size: ${rem('28px')};
    line-height: ${rem('32px')};
  `,
  companyBioWrapper: css`
    margin-bottom: 24px;
    position: relative;
  `,
  description: css`
    color: ${GREY_BLACK};
    display: block;
    font-size: ${rem('11px')};
    line-height: ${rem('13px')};
    margin: 8px 0 16px;
    text-transform: uppercase;

    ${media.sm`
      margin-bottom: 0;
    `}
  `,
  header: css`
    ${media.sm`
      left: 315px;
      position: absolute;
      top: 30px;
    `}
  `,
  image: css`
    display: block;

    ${media.sm`
      height: 300px;
      max-width: 300px;
      width: 300px;
    `}
  `,
  info: css`
    margin: 24px 0 16px;

    ${media.sm`
      bottom: 0;
      left: 315px;
      margin: 0;
      position: absolute;
    `}
  `,
  lead: css`
    color: ${DARKER_GREY};
    font-size: ${rem('11px')};
    line-height: ${rem('13px')}; 
    text-transform: uppercase;
  `,
  name: css`
    color: ${ASTRONAUT};
    font-size: ${rem('12px')};
    letter-spacing: ${rem('0.75px')};
    line-height: ${rem('14px')};
    text-transform: uppercase;
  `,
  separator: css`
    border: 0;
    border-top: 1px solid ${ASTRONAUT};
    height: 1px;
    margin: 8px 0;
    max-width: 40px;
  `,
  value: css`
    color: ${BLACK_GREY};
    font-size: ${rem('14px')};
    line-height: ${rem('18px')};
  `,
  website: css`
    margin: 16px 0 0;
    padding-left: 40px;
    position: relative;
  `,
  websiteIcon: css`
    left: 9px;
    position: absolute;
    top: 7px;
  `,
};
