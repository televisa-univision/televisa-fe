import styled from 'styled-components';

import {
  BLACK, DARKER_GREY, LIGHT_GREY, THEME_DEFAULT_PRIMARY, WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';

import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export const RelatedArticle = styled.div`
  border-bottom: 1px solid ${LIGHT_GREY};
  color: ${DARKER_GREY};
  margin-bottom: 24px;
  margin-top: 24px;
  padding: 0 10px 20px 0;
`;

export const InnerWrapper = styled.div`
  background: ${WHITE};
  display: flex;
  flex-direction: column-reverse;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 20px 0;

  & > div > h4 {
    position: relative;
    font-size: ${rem(11)};
    font-weight: 400;
    line-height: ${rem(13)};
    text-transform: uppercase;
    margin: 10px 0;
    padding: 0 0 10px 0;
  }

  & > div > h5 {
    color: ${BLACK};
    font-size: ${rem(18)};
    line-height: ${rem(22)};
    a {
      color: ${BLACK};
    }
  }
`;

export const Separator = styled.span`
  border-bottom: 1px solid ${props => props.theme.primaryColor || THEME_DEFAULT_PRIMARY};
  bottom: 0;
  content: '';
  left: 0;
  position: absolute;
  width: 40px;
`;

export const Share = styled.div`
  align-items: center;
  display: flex;
  margin: 10px 0 10px;

  & > span {
    font-size: 12px;
    padding: 3px 0;
    text-transform: uppercase;
  }
`;

export const ShareButtons = styled.div`
  padding-bottom: 6px;

  a,
  a:first-child,
  a:last-child {
    margin: 0;
    padding: 0 10px;
  }
`;
