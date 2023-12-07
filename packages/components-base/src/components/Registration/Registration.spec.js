import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { mount } from 'enzyme';
import * as hooks from 'react-redux';
import Registration from '.';
import { WELCOME } from './RegistrationConfiguration';

const store = configureStore();
let mockUseSelector;

describe('Registration component tests', () => {
  beforeEach(() => {
    mockUseSelector = jest.spyOn(hooks, 'useSelector');
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Registration /></Provider>, div);
  });

  it('should not render RegistrationMenu when is mobile', () => {
    mockUseSelector.mockImplementation(() => 'mobile');
    const wrapper = mount(
      <Provider store={store}>
        <Registration initContent={WELCOME} />
      </Provider>
    );
    expect(wrapper.find('RegistrationMenu')).toHaveLength(0);
  });
});
