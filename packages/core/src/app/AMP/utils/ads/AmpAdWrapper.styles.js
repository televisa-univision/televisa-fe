import styled from 'styled-components';
import stripedBackground from '@univision/fe-commons/dist/assets/images/striped-background.svg';

export default styled.div`
  background: url(${stripedBackground});
  background-size: 10px;
  clear: both;
  margin-bottom: 24px;
  padding: 8px 0;
  position: relative;
  text-align: center;

  span {
    color: #9B9B9B;
    display: block;
    font-size: 0.4rem;
    line-height: 0.6875rem;
    padding-bottom: 10px;
    text-transform: uppercase;
  }
`;
