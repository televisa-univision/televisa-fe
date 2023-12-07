import styled from 'styled-components';
import {
  BLACK, DARKER_GREY, GREY, GREY_BLACK, LIGHT_GREY, THEME_DEFAULT_PRIMARY, WHITE, WHITE_GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';

import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export const Footer = styled.footer`
  -webkit-font-smoothing: antialiased;
  background: ${props => (props.theme.variant === 'light' ? WHITE : BLACK)};
  border-top: 2px solid ${props => (props.theme.primary || THEME_DEFAULT_PRIMARY)};
  width: 100%;
`;

export const FooterTitle = styled.div`
  color: ${props => (props.theme.variant === 'light' ? DARKER_GREY : WHITE)};
  font-size: ${rem(13)};
  line-height: ${rem(15)};
  margin-bottom: ${rem(11)};
  text-align: center;
  text-transform: uppercase;

  &:not(:first-child) {
    margin-top: 1.25rem;
  }

  & > a {
    line-height: ${rem(15)};
  }
`;

export const FooterImageLink = styled.div`
  display: flex;
  flex: 1 1 50%;
  flex-direction: row;
  justify-content: center;
  padding: 10px 0;
  text-align: left;

  & > a {
    color: ${props => (props.theme.variant === 'light' ? DARKER_GREY : GREY_BLACK)};
    display: flex;
    flex-direction: row;
    font-size: 11px;
    font-weight: 600;
    line-height: 14px;
    margin: 0;
    text-decoration: none;
    text-transform: uppercase;
    &:hover, &:active {
      color: ${GREY};
    }
  }
`;

export const TopContainerWrapper = styled.div`
  padding: 0 10px;
`;

export const TopContainer = styled.div`
    align-items: center;
    border-bottom: 1px solid ${props => (props.theme.variant === 'light' ? LIGHT_GREY : DARKER_GREY)};
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    padding: 1.5rem 10px;
`;

export const SocialNetworkContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 0 1rem;
`;

export const SocialNetworkLink = styled.a`
  align-items: center;
  display: flex;
  flex-grow: 1;
  height: 45px;
  justify-content: center;

  &:not(:last-child) {
    margin-right: 56px;
  }
`;

export const NewsLetterLink = styled.a`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  position: relative;

  & > span {
    color: ${props => (props.theme.variant === 'light' ? GREY_BLACK : WHITE_GREY)};
    font-size: ${rem(11)};
    line-height: ${rem(13)};
    text-transform: uppercase;
  }
  & > svg {
    margin-right: 12px
  }
  &::before {
    border-top: 1px solid ${props => (props.theme.variant === 'light' ? LIGHT_GREY : DARKER_GREY)};
    content: "";
    left: 0;
    position: absolute;
    top: -16px;
    width: 100%;
  }
`;

export const AppsContainer = styled.div`
  border-bottom: 1px solid ${props => (props.theme.variant === 'light' ? LIGHT_GREY : DARKER_GREY)};
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  padding-left: 10px;
  padding-right: 10px;

  & > * {
    flex: 0 1 50%;
  }
`;

export const AboutContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 1.5rem;

  & > div {
  column-count: 2;
  }

  & > div > a {
    color: ${props => (props.theme.variant === 'light' ? DARKER_GREY : WHITE_GREY)};
    display: block;
    font-size: ${rem(13)};
    line-height: ${rem(31)};
    margin: 0;
    text-decoration: none;
  }
`;

export const CopyrightContainer = styled.div`
  background-color: ${props => (props.theme.variant === 'light' ? WHITE : DARKER_GREY)};
  color: ${props => (props.theme.variant === 'light' ? DARKER_GREY : WHITE_GREY)};
  font-size: ${rem(13)};
  line-height: ${rem(31)};
  margin-bottom: 44px;
  padding: .5rem 0;
  text-align: center;
`;
