import { css } from 'styled-components';

import {
  ZINDEX_ABOVE_NAVIGATION,
  BOULDER_RGB_08,
  GREEN,
  BLACK_20,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  arrow: ({
    position,
    showExplainerUp,
    showArrowRight,
    theme,
  }) => css`
    ${showExplainerUp ? 'border-bottom' : 'border-top'}: 11px solid ${theme?.primary || GREEN};
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    height: 0;
    ${showArrowRight ? 'right' : 'left'}: ${position - 5}%;
    position: absolute;
    ${showExplainerUp ? 'top:' : 'bottom:'} -11px;
    width: 0;
  `,
  buttonWrapper: css`
    display: flex;
    justify-content: flex-end;
    width: 100%;
  `,
  closeIcon: css`
    margin-left: 0;
  `,
  explainerCopy: ({ showExplainerUp }) => css`
    background: ${BOULDER_RGB_08};
    border-radius: 10px;
    box-shadow: 0 ${showExplainerUp ? '7px' : '-7px'} 4px 0 ${BLACK_20};
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 16px;
    position: relative;
    width: 89%;
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 2};
    ${media.sm`
       width: 376px;
    `}
  `,
  externalButtonWrapper: css`
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 2};
    ${media.md`
       max-width: 1280px;
    `}
  `,
  externalWrapper: ({ showExplainerUp }) => css`
    align-items: center;
    display: flex;
    flex-direction: ${showExplainerUp ? 'column' : 'column-reverse'};
    height: calc(100% - 30px);
    justify-content: center;
    width: 100%;
  `,
  imageWrapper: ({ showExplainerUp }) => css`
    display: flex;
    justify-content: flex-end;
    margin: ${showExplainerUp ? '0 auto 11px auto' : '11px auto 0 auto'};
    position: relative;
    width: 89%;
    img {
      width: 100%;
    }
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 2};
    ${media.sm`
      padding: 0;
      max-width: 376px;
    `}
  `,
  innerWrapper: css`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 100px);
    width: 100%;
  `,
  label: css`
    color: ${WHITE};
    font-size: ${rem(12)};
    line-height: ${rem(18)};
  `,
  title: css`
    color: ${WHITE};
    font-size: ${rem(18)};
    line-height: ${rem(28)};
  `,
  textButton: css`
    color: ${WHITE};
    cursor: pointer;
    font-size: ${rem(12)};
    font-weight: 700;
    letter-spacing: 1px;
    line-height: ${rem(16)};
    padding-top: 14px;
    text-align: right;
    text-transform: uppercase;
  `,
  wrapper: css`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: ${ZINDEX_ABOVE_NAVIGATION};
  `,
};
