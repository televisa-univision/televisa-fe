import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { UP, DOWN } from '@univision/fe-commons/dist/constants/direction';
import Store from '@univision/fe-commons/dist/store/store';
import { setHeaderConf } from '@univision/fe-commons/dist/store/actions/header/header-actions';

import ProgressConnector from './ProgressConnector';

describe('Progress Connector', () => {
  it('should set scrollDirection to up if none is found', () => {
    const wrapper = mount(<Provider store={Store}><ProgressConnector /></Provider>);
    expect(wrapper.find('Progress').props().scrollDirection).toBe(UP);
  });
  it('should set scrollDirection to up', () => {
    Store.dispatch(setHeaderConf({ scrollDirection: UP }));
    const wrapper = mount(<Provider store={Store}><ProgressConnector /></Provider>);
    expect(wrapper.find('Progress').props().scrollDirection).toBe(UP);
  });
  it('should set scrollDirection to down', () => {
    Store.dispatch(setHeaderConf({ scrollDirection: DOWN }));
    const wrapper = mount(<Provider store={Store}><ProgressConnector /></Provider>);
    expect(wrapper.find('Progress').props().scrollDirection).toBe(DOWN);
  });
});
