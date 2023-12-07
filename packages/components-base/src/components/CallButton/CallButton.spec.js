import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import CallButton from '.';

const props = {
  callNumber: '+18005555555',
};
jest.mock('../Link', () => 'mock-link');

/** @test {CallButton} */
describe('Call Button', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    const el = (
      <Provider store={Store}>
        <CallButton {...props} />
      </Provider>
    );
    ReactDOM.render(el, div);
  });

  it('should render Call Button on desktop', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <CallButton {...props} />
      </Provider>
    );
    expect(wrapper.find('CallButton')).toHaveLength(1);
  });

  it('should render Call Button on mobile', () => {
    Store.dispatch(setPageData({
      device: 'mobile',
    }));

    const wrapper = mount(
      <Provider store={Store}>
        <CallButton {...props} />
      </Provider>
    );
    expect(wrapper.find('CallButton')).toHaveLength(1);
  });
});
