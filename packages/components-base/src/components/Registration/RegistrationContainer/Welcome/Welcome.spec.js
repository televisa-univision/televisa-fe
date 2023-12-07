import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as hooks from 'react-redux';
import Welcome from '.';

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

describe('Welcome component tests', () => {
  let mockUseSelector;

  beforeEach(() => {
    mockUseSelector = jest.spyOn(hooks, 'useSelector');
  });

  it('renders without crashing', () => {
    mockUseSelector.mockImplementation(callback => callback(mockTheme));
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Welcome /></Provider>, div);
  });
});
