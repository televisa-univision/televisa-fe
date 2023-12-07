import styled from 'styled-components';

export const AudioProgressBarContainer = styled.div`
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export const RangeInput = styled.input`
  appearance: none;
  background: transparent;
  bottom: -6px;
  cursor: pointer;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 10;

  &:focus {
    border: 0;
    outline: none;
  }

  &::-ms-track {
    background: transparent;
    border-color: transparent;
    color: transparent;
    cursor: pointer;
    width: 100%;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    cursor: pointer;
    height: 16px;
    width: 16px;
  }

  &::-moz-range-thumb {
    border: 0;
    cursor: pointer;
    height: 8px;
    width: 8px;
  }

  &::-ms-thumb {
    cursor: pointer;
    height: 8px;
    width: 8px;
  }
`;
