import styled from 'styled-components';

const ArticleContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  width: 100%;

  a {
    color: ${props => props.theme.primary};
  }
`;

export default ArticleContainer;
