/* eslint-disable require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as hooks from 'react-redux';
import RegistrationMenu from '.';
import { MVPD } from '../RegistrationConfiguration';
import Styles from './RegistrationMenu.styles';

const SubmenuContainer = styled.div`${Styles.submenuContainer}`;

const store = configureStore();

const mockTheme = {
  page: {
    theme: {
      registration: {
        primary: '#000',
        gradient: null,
        welcomeIcon: 'tudn',
      },
    },
  },
};

describe('MenuRegistration component tests', () => {
  let mockUseSelector;

  beforeEach(() => {
    mockUseSelector = jest.spyOn(hooks, 'useSelector');
  });

  it('renders without crashing', () => {
    mockUseSelector.mockImplementation(callback => callback(mockTheme));
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><RegistrationMenu /></Provider>, div);
  });
  it('should back to LANDING correctly', () => {
    let changeIt = 999;
    // eslint-disable-next-line no-return-assign
    const func = val => changeIt = val;
    const wrapper = shallow(<RegistrationMenu setContentToShow={func} />);
    act(() => {
      wrapper.find('SubMenu').at(0).simulate('click');
    });
    wrapper.update();
    expect(changeIt).toBe(MVPD);
  });
  it('should show mvpdProviderIcon', () => {
    const wrapper = shallow(<RegistrationMenu mvpdProviderIcon="tvCox" />);
    expect(wrapper.find('MvpdLogin').prop('iconName')).toBe('tvCox');
  });
  it('should pass undefined when user does not have provider', () => {
    const wrapper = shallow(<RegistrationMenu />);
    expect(wrapper.find('MvpdLogin').prop('iconName')).toBe(undefined);
  });
  it('should have correct style', () => {
    const wrapper = shallow(<SubmenuContainer isLoggedIn />);
    expect(wrapper).toHaveStyleRule('width', '100%');
  });
});
