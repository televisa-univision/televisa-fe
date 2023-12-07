import styled from 'styled-components';
import {
  BLACK, LIGHT_GREY, WHITE, ZINDEX_ABOVE_NAVIGATION,
} from '@univision/fe-commons/dist/utils/styled/constants';

export const Header = styled.header`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 51px;
  justify-content: space-between;
  overflow: hidden;
  padding: 3px;

  & > a {
    display: flex;
    margin: 0 auto;
  }
`;

export const DarkHeader = styled(Header)`
  background-color: ${BLACK};
  position: relative;
  z-index: ${ZINDEX_ABOVE_NAVIGATION};
`;

export const LightHeader = styled(Header)`
  background: ${WHITE};
  border-bottom: 1px solid ${LIGHT_GREY};
`;

// eslint-disable-next-line require-jsdoc
export const CustomHeader = ({ theme }) => {
  return styled(Header)`
    background-color: ${theme.ampHeaderBackgroundColor};
    position: relative;
  `;
};
