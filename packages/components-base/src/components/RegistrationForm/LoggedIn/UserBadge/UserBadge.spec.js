import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import * as useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';

import UserBadge from '.';

describe('RegistrationForm > LoggedIn > UserBadge', () => {
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
    ReactDOM.render(<UserBadge />, div);
  });

  it('should render ? when name without letters is sent', () => {
    const wrapper = mount(<UserBadge name="1" />);
    expect(wrapper.find('UserBadge__Letter > div').text()).toBe('?');
  });
});
