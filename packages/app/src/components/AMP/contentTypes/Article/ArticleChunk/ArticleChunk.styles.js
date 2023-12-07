import styled from 'styled-components';

export const VideoCaption = styled.div`
    color: #333;
    font-family: Roboto,sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25rem;
    padding: .5rem 1.25rem;
    position: relative;
`;

export const Blockquote = styled.div`
  border-color: ${props => props.theme.primary};
  border-left: 2px solid transparent;
  margin: 24px 0;
  padding-left: 25px;
`;

export const Pullquote = styled.div`
  color: #000000;
  font-size: rem(24px);
  font-weight: 600;
  line-height: rem(29px);
  margin: 24px auto;
  max-width: 720px;
  text-align: left;
`;
