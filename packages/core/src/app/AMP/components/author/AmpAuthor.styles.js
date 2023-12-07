import styled from 'styled-components';
import {
  BLACK, DARKER_GREY, GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';

import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export const PublishDate = styled.span`
  color: ${GREY};
  display: block;
  font-size: ${rem(11)};
  line-height: 15px;
  text-transform: uppercase;
`;

export const Sponsor = styled.div`
  img {
    margin-bottom: 8px;
    max-height: 28px;
  }
`;

export const By = styled.span`
  display: block;
  font-size: ${rem(14)};
  line-height: ${rem(17)};
  margin-right: 5px;
  text-transform: capitalize;
`;

export const SingleAuthorContainer = styled.span`
  line-height: ${rem(17)};
  &:last-child {
    margin-bottom: 0;
  }

  a > span {
    color: ${BLACK};
    font-size: ${rem(14)};
    line-height: ${rem(17)};
    text-transform: uppercase;
  }
`;

export const AuthorSeparator = styled.span`
  display: inline;
  font-size: ${rem(14)};
  line-height: ${rem(17)};
  margin: 0 5px 0 0;
`;

export const LastAuthorSeparator = styled(AuthorSeparator)`
  margin: 0 5px;
`;

export const AuthorsContainer = styled.div`
  align-items: center;
  display: flex;
  flex: auto;
  margin: 1rem 0;
`;

export const AuthorAvatar = styled.div`
  background-color: ${GREY};
  background-image: url(${props => props.image});
  background-position: center;
  background-size: cover;
  flex-shrink: 0;
  height: 50px;
  margin-right: 1rem;
  width: 50px;
`;

export const Author = styled.span`
  align-items: center;
  color: ${BLACK};
  display: flex;
  flex-direction: row;
  font-size: ${rem(14)};
  line-height: ${rem(17)};
  margin-bottom: 8px;
  min-height: 20px;
  text-transform: uppercase;

  em {
    color: ${DARKER_GREY};
    font-style: normal;
  }
  a {
    padding: 0 10px 0 0;
  }
`;

export const SingleAuthor = styled.div`
  align-items: center;
  color: ${BLACK};
  display: flex;
  flex-direction: row;

  > div {
    margin-top: -5px;
  }
`;

export const MultiAuthor = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  min-height: 20px;
  overflow: auto;
`;

export const AuthorContainer = styled.div`
  display: flex;
  flex: auto;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
`;
