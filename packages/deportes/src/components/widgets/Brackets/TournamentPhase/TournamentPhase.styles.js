import { css } from 'styled-components';
import {
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import stripped from '@univision/fe-commons/dist/assets/images/striped-background.svg';

export default {
  tournamentWrapper: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  `,

  phase: ({
    isActive, isFull, isFinals, desktopHide, hide, isQuarters,
  }) => css`
    display: ${isActive ? 'flex' : 'none'};
    flex-direction: row;
    justify-content: center;
    padding-top: 20px;
    position: relative;
    ${isFull && css`width: 100%;`}
    ${media.sm`
      width: 187px;
      display: ${desktopHide ? 'none' : 'flex'};
      flex-direction: column;
      padding-top: 45px;
    `}
    ${media.lg`
      width: 178px;
       display: flex;
    `}
    ${isFinals && css`
      ${media.lg`
        justify-content: flex-start;
      `}
    `}
    ${hide && css`
      display: none;
    `}
    
    ${isQuarters && css`
      justify-content: flex-start;
      ${media.lg`
        justify-content: center;
      `}
    `}
  `,

  phaseInner: ({ isFull, isPhaseResults }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: ${isFull ? '100%' : '50%'};
    ${isPhaseResults && css` justify-content: flex-start; `}
  `,

  phaseTitle: css`
    display: none;
    font-size: ${rem('14px')};
    position: absolute;
    text-align: center;
    top: 14px;
    width: 100%;
    ${media.sm`
      display: block;
    `}
  `,

  finalsBanner: css`
    align-items: center;
    background: url('https://st1.uvnimg.com/ea/f5/2a526dd54d82a2ddd40f4f5251e1/back-mobile.png');
    color: ${WHITE};
    display: flex;
    font-size: ${rem('14px')};
    height: 36px;
    justify-content: center;
    margin: 0 auto 14px auto;
    text-transform: uppercase;
    width: 96%;
    ${media.sm`
      font-size: ${rem('12px')};
      background: url('https://st1.uvnimg.com/54/93/2b2eb0cc48aaada8bf69f1ace98e/rectangle2.png');
    `}
    ${media.lg`
      margin: 139px auto 14px auto;
    `}
  `,

  cell: css`
    ${media.lg`
      width: 166px;
    `}
  `,

  bracket: ({
    isQuarters, isBracketMobile, isTop, isSemis,
  }) => css`
    background: ${WHITE};
    ${media.lg`
      width: 178px;
    `}
    ${isQuarters && css`
      ${media.sm`
        height: 220px;
        margin-bottom: 78px;
      `}
      ${media.lg`
        height: 220px;
      `}
    `}
    ${isTop && isQuarters && css`
      margin-bottom: 0;
      ${media.lg`
        margin-top: 80px;
      `}
    `}
    ${isBracketMobile && css`
      height: 300px;
    `}
    ${isSemis && css`
      ${media.sm`
        height: 370px;
      `}
    `}
  `,
  finalWrapper: css`
    background: url(${stripped});
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 14px;
    width: auto;
  `,
};
