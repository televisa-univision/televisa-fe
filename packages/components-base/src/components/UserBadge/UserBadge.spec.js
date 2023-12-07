import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import {
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import UserBadge from '.';

describe('UserBadge component tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={Store}><UserBadge /></Provider>, div);
  });
  it('should show default userbadge', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <UserBadge />
      </Provider>
    );
    expect(wrapper.find('Icon')).toHaveLength(1);
  });
  it('should show dark version userbadge', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <UserBadge isDark />
      </Provider>
    );
    expect(wrapper.find('Icon')).toHaveLength(1);
    expect(wrapper.find('Icon').props().fill).toBe(WHITE);
  });
  it('should show logued in userbadge', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <UserBadge isLoggedIn userName="manuela" />
      </Provider>
    );
    expect(wrapper.find('UserBadge__UserLetter')).toHaveLength(1);
    expect(wrapper.find('UserBadge__UserLetter').text()).toBe('m');
  });
  it('should show in dark version userbadge', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <UserBadge isLoggedIn isDark userName="manuela" />
      </Provider>
    );
    expect(wrapper.find('UserBadge__UserLetter')).toHaveStyleRule('background-color', '#ffffff');
  });
  it('should open and close registration, change to close icon and then to userIcon, and dispatch openRegistration', () => {
    const dispatchSpy = jest.spyOn(Store, 'dispatch');
    const wrapper = mount(
      <Provider store={Store}>
        <UserBadge />
      </Provider>
    );
    wrapper.simulate('click');
    expect(wrapper.find('Icon').props().name).toBe('close');
    expect(dispatchSpy).toHaveBeenCalledWith(
      {
        type: 'registration/openRegistration',
      }
    );
    wrapper.simulate('click');
    expect(dispatchSpy).toHaveBeenCalledWith(
      {
        type: 'registration/openRegistration',
      }
    );
    expect(wrapper.find('Icon').props().name).toBe('userIcon');
  });
});
