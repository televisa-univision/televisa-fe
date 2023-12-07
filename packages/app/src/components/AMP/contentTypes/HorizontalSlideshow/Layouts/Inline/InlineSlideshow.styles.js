import styled from 'styled-components';
import { VERY_LIGHT_GREY, GREY } from '@univision/fe-commons/dist/utils/styled/constants';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export const Slideshow = styled.div`
  margin: 10px auto;
`;

export const Slide = styled.div`
  display: table;
  height: 380px;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const SlideBackground = styled.div`
  background-color: ${VERY_LIGHT_GREY};
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 0;
`;

export const ImageContainer = styled.div`
  display: table-cell;
  height: 100%;
  vertical-align: middle;
  width: 100%;

  & > span {
    right: 0;
  }
`;

export const Credit = styled.span`
  background-color: rgba(0, 0, 0, 0.38);
  bottom: 0;
  color: #fff;
  display: inline-block;
  font-size: 11px;
  padding: 0 4px;
  position: absolute;
  right: 0;
  z-index: 1;
`;

export const CaptionContainer = styled.div`
  display: flex;
`;

export const Counter = styled.div`
  font-size: ${rem(11)};
  padding: 10px 10px 0px 10px;
`;

export const Caption = styled.div`
  height: 115px;
  overflow-y: scroll;
  padding-left: 0;

  span, div {
    padding: .5rem 0;
  }

  & > span {
    color: #333;
    font-size: 1rem;
    line-height: 1.25rem;
    display: inline-block;
  }

  & > div {
    color: ${GREY};
  }
`;
