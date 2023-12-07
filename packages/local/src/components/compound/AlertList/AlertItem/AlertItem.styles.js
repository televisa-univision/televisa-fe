import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { media, numberOfLines } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BLACK,
  BLACK_08,
  BLACK_GREY,
  GREY_BLACK,
  TRANSPARENT,
  VERY_LIGHT_GREY,
  WHITE_GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { MILANO_RED } from '@univision/fe-icons/dist/constants/colors';
import { WEATHER_ALERT_SEVERITIES } from '@univision/fe-commons/dist/constants/weather';
import alertColors from './alertColors';

export default {
  arrow: css`
    margin: 0 16px 0 0;
    min-width: 24px;
  `,
  description: css`
    color: ${BLACK};
    font-size: ${rem('16px')};
    letter-spacing: 0;
    line-height: ${rem('22px')};
    white-space: pre-wrap;
  `,
  dot: ({ severity }) => css`
    margin: -7px 4px 0 4px;
    min-width: 32px;

    > path {
      fill: ${alertColors[severity]};
    }
  `,
  dottedLine: css`
    background: repeating-linear-gradient(to right,${WHITE_GREY} 0,${WHITE_GREY} 5px,${TRANSPARENT} 5px,${TRANSPARENT} 10px);
    height: 2px;
    margin: 20px 0;
  `,
  header: css`
    align-items: center;
    background-color: ${VERY_LIGHT_GREY};
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 ${BLACK_08};
    display: flex;
    height: 58px;
    margin-top: 16px;
    position: relative;
  `,
  title: ({ severity }) => css`
    color: ${severity === WEATHER_ALERT_SEVERITIES.EXTREME ? MILANO_RED : BLACK_GREY};
    font-size: ${rem('14px')};
    letter-spacing: 0;
    line-height: ${rem('18px')};
    margin-right: auto;
    max-height: ${rem('36px')};
    text-align: left;
    ${numberOfLines(2)}

    ${media.sm`
      font-size: ${rem('16px')};
      line-height: ${rem('19px')};
      max-height: ${rem('38px')};
    `}
  `,
  titleContainer: css`
    display: flex;
    margin-right: auto;
  `,
  issueTime: css`
    text-transform: uppercase;
  `,
  info: css`
    color: ${GREY_BLACK};
    font-style: italic;
    text-transform: none;
  `,
};
