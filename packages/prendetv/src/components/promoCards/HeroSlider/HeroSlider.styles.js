/**
 * @module PrendeTV HeroSlider Styles
 */

import { css } from 'styled-components';

import {
  WHITE, GREY_BLACK, BITTERSWEET, BLACK, BLACK_00,
  MONTSERRAT_FONT_FAMILY, ZINDEX_BASE, ZINDEX_BASE_SCREEN,
} from '@univision/fe-utilities/styled/constants';

export default {
  arrow: css`
     cursor: pointer;
     margin: 0 9%;
     position: absolute;
     top: 50%;
     user-select: none;
     width: 20px;
     z-index: ${ZINDEX_BASE_SCREEN};

     &.next {
       right: 0;
     }

     &.prev {
       left: 0;
       transform: rotate(180deg);
     }
   `,
  dot: css`
     background-color: ${WHITE};
     border-radius: 50%;
     display: inline-block;
     height: 8px;
     margin: 0 5px;
     opacity: 0.3;
     transition: background-color 0.6s ease;
     width: 8px;

     &.active {
       height: 11px;
       opacity: 1;
       width: 11px;
     }
   `,
  dotContainer: css`
     background-color: ${GREY_BLACK};
     border-radius: 50px;
     bottom: 0;
     height: 24px;
     left: 0;
     margin: 15px auto;
     position: absolute;
     right: 0;
     text-align: center;
     width: 108px;
     z-index: ${ZINDEX_BASE_SCREEN};
   `,
  gradient: ({ isMobile }) => css`
      background: linear-gradient(90deg, ${BLACK} 0%, ${BLACK_00} 40%, ${BLACK_00} 60%, ${BLACK} 100%);
      height: 100%;
      position: absolute;
      width: 100%;

      ${isMobile && css`
        background: linear-gradient(0deg, ${BLACK} 0%, ${BLACK_00} 35%);
      `}
   `,
  image: css`
     display: block;
     height: 100%;
     object-fit: cover;
     width: 100vw;
   `,
  imageContainer: css`
     height: 100%;
     position: relative;
   `,
  link: css`
     background-color: ${BITTERSWEET};
     border-radius: 4px;
     bottom: 50px;
     color: ${WHITE};
     font-family: ${MONTSERRAT_FONT_FAMILY};
     font-size: 14px;
     font-weight: bold;
     height: 44px;
     left: 0;
     margin: auto;
     position: absolute;
     right: 0;
     width: 138px;
     z-index: ${ZINDEX_BASE_SCREEN};

     &:hover {
      color: ${WHITE};
     }
   `,
  slide: ({ slidePages }) => css`
     min-width: 100%;
     position: relative;

     &.loop{
       left: ${slidePages * 100}%;
     }

     &.videoSlide{
       align-items: center;
       display: flex;
       justify-content: center;

       & .active div:nth-child(1) {
         opacity: 0;
       }
     }
   `,
  sliderContainer: ({ posX, transitionTime, transitionDelay }) => css`
     display: flex;
     margin: auto;
     position: relative;
     transform: translate3d(${posX}%, 0px, 0px);
     transition: transform ${transitionTime}ms ease-in-out;
     transition-delay: ${transitionDelay}ms;
     user-select: none;
   `,
  wrapper: ({ isMobile, activeSlideId, activeTypeVideo }) => css`
     overflow: hidden;
     position: relative;
     z-index: ${ZINDEX_BASE};

     ${activeTypeVideo && css`
        & .imageSlide img {
          visibility: hidden;
        }
     `}

     ${isMobile && css`
      :root{
        #VideoPlayerPIPWrapper div {
          left: 0 !important;
        }
      }
      `}
     ${activeTypeVideo ? css`
        :root{
          #VideoPlayerPIPWrapper>div {
            display: none;
          }
          #VideoPlayerPIPWrapper div#player-${activeSlideId}-wrapper {
            display: block;
          }
        }
     ` : `
        :root{
          #VideoPlayerPIPWrapper div {
            display: none;
          }
        }
     `}
   `,
};
