import styled from 'styled-components';
import {
  BLACK, GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';

import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export const Header = styled.div`
  -webkit-font-smoothing: antialiased;
  margin-top: 2rem;
`;

export const Headline = styled.header`
  color: ${BLACK};
  overflow: hidden;
  padding: 0;

  & > h1 {
    font-size: ${rem(28)};
    line-height: ${rem(34)};
  }

  & > div {
    font-size: ${rem(18)};
    line-height: ${rem(26)};
    margin: 0 auto;
    max-width: 100%;

    ul {
      list-style: none;
      margin-top: 1rem;
      padding-left: ${rem(18)};
      text-align: left;
      li {
        line-height: 1.3;
        margin: 5px 0;
        position: relative;
        &:before {
          background: ${BLACK};
          border-radius: 50%;
          content: '';
          display: block;
          height: 4px;
          left: -14px;
          position: absolute;
          top: 10px;
          width: 4px;
        }
      }
    }
  }
`;

export const Body = styled.div`
  -webkit-font-smoothing: antialiased;
  font-family: "Roboto Slab",sans-serif;
  font-size: ${rem(16)};
  font-weight: 400;
  line-height: ${rem(27)};
  margin-top: 1rem;

  h2,
  h3,
  h4,
  h5 {
    font-family: Roboto,sans-serif;
  }

  h2,
  h3,
  h4,
  h5,
  p {
    margin-bottom: 1rem;
  }

  h2 {
    font-size: ${rem(24)};
    line-height: ${rem(41)};
  }

  h3 {
    font-size: ${rem(22)};
    line-height: ${rem(37)};
  }

  h4 {
    font-size: ${rem(20)};
    line-height: ${rem(34)};
  }

  h5 {
    font-size: ${rem(18)};
    line-height: ${rem(31)};
  }
`;

export const TagLabel = styled.a`
  background-color: transparent;
  color: ${props => props.theme.primary};
  display: inline-block;
  font-size: ${rem(13)};
  line-height: ${rem(13)};
  margin-bottom: .5rem;
  padding: 0;
  text-transform: uppercase;
`;

export const OpinionAuthor = styled.div`
  display: flex;
  margin: 1rem 0;
`;

export const OpinionAuthorAvatar = styled.div`
  background-image: url(${props => props.image});
  background-position: 50%;
  background-size: cover;
  height: 60px;
  margin-right: 1rem;
  min-width: 60px;
  width: 60px;
`;

export const OpinionWrapper = styled.div`
  line-height: 1px;
  & > a:first-child {
    color: ${props => props.theme.primary};
    display: inline-block;
    margin-bottom: 0;
    font-size: ${rem(13)};
    line-height: ${rem(16)};
    text-transform: uppercase;
  }

  & > p:last-child {
    color: ${GREY};
    font-size: ${rem(11)};
    line-height: ${rem(13)};
    margin: 0;
    padding: 0;
  }
`;

export const OpinionAuthorLink = styled.a`
  color: ${BLACK};
  display: block;
  font-size: ${rem(11)};
  line-height: ${rem(13)};
  margin-bottom: 8px;
  text-transform: uppercase;
`;

export const Source = styled(OpinionAuthorLink)``;

export const PublishDate = styled.div`
  border-top: 1px solid #d2d2d2;
  color: ${GREY};
  font-size: ${rem(11)};
  margin-bottom: 8px;
  min-height: 20px;
  overflow: auto;
  padding-top: 0.5rem;
`;

export const RecipeWrapper = styled.div`
  & > div:last-child {
    display: none;
  }
`;
