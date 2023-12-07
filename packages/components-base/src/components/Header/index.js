import React from 'react';

import ThemeProvider from '@univision/fe-commons/dist/components/ThemeProvider/ThemeProviderConnector';

import Navigation from '../Navigation';

/**
 * Header with Profile Connection
 * @returns {JSX}
 */
const Header = () => {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
};

export default Header;
