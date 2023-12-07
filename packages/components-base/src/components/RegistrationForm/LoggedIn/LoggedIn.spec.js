import React from 'react';
import ReactDOM from 'react-dom';

import * as useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';

import LoggedIn from '.';

describe('RegistrationForm LoggedIn', () => {
  let useRegistrationThemeSpy;

  const mockTheme = {
    ...useRegistrationTheme.defaultTheme,
  };

  beforeEach(() => {
    useRegistrationThemeSpy = jest.spyOn(useRegistrationTheme, 'default');
    useRegistrationThemeSpy.mockImplementation(() => mockTheme);
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoggedIn />, div);
  });
});
