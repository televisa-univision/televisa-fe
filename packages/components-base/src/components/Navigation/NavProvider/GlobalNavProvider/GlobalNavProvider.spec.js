import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import * as localActions from '@univision/fe-commons/dist/store/actions/local/local-actions';
import configureStore from '@univision/fe-commons/dist/store/configureStore'; // eslint-disable-line

import GlobalNavProvider from '.';

const store = configureStore();

describe('GlobalNavProvider suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const fetchSpy = jest.spyOn(localActions, 'fetchLocalMarketContent');
    const wrapper = mount(<Provider store={store}><GlobalNavProvider /></Provider>);
    expect(wrapper.find('GlobalNav')).toHaveLength(1);
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('should call fetchLocalMarketContent in tudn', () => {
    const fetchSpy = jest.spyOn(localActions, 'fetchLocalMarketContent');
    mount(<Provider store={store}><GlobalNavProvider isTudnSite /></Provider>);
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('should call fetchLocalMarketContent in univision', () => {
    const fetchSpy = jest.spyOn(localActions, 'fetchLocalMarketContent');
    mount(<Provider store={store}><GlobalNavProvider /></Provider>);
    expect(fetchSpy).toHaveBeenCalled();
  });
});
