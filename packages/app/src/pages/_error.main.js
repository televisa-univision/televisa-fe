import React from 'react';
import styled from 'styled-components';

import univisionLogo from '@univision/fe-commons/dist/assets/images/logo-univision-color.svg';
import ErrorLayout from '../components/layout/ErrorLayout';
import Styles from './_error.styles';

const Header = styled.header`${Styles.staticHeader}`;

/**
 * Error page to handle unexpected errors
 * @returns {JSX}
 */
function Error() {
  return (
    <>
      <Header>
        <a href="/">
          <img
            alt="Univision"
            height="28"
            src={univisionLogo}
          />
        </a>
      </Header>
      <ErrorLayout statusCode="500" />
    </>
  );
}

export default Error;
