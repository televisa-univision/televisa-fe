import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';

import CompanyBio from '.';
import props from './CompanyBio.mock';

/** @test {CompanyBio} */
describe('Company Bio', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    const el = (
      <Provider store={Store}>
        <CompanyBio />
      </Provider>
    );
    ReactDOM.render(el, div);
  });

  it('should render Company Bio', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <CompanyBio {...props} />
      </Provider>
    );
    expect(wrapper.find('CompanyBio')).toHaveLength(1);
  });
});
