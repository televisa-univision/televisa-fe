import React from 'react';
import ReactDOM from 'react-dom';

import * as useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import RecoveryPassword from '.';

describe('RecoveryPassword', () => {
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
    ReactDOM.render(<RecoveryPassword />, div);
  });

  it('should back to LANDING correctly', () => {
    const fn = jest.fn();
    const wrapper = shallow(<RecoveryPassword navigateToPage={fn} />);
    act(() => {
      wrapper.find('TitleBack').at(0).simulate('click');
    });
    wrapper.update();
    expect(fn).toHaveBeenCalled();
  });

  it('should not crash if function does not exist', () => {
    const wrapper = shallow(<RecoveryPassword />);
    act(() => {
      wrapper.find('TitleBack').at(0).simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('RecoveryPassword__Wrapper')).toHaveLength(1);
  });
});
