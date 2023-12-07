import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';

import MarketSelectorConnector from './MarketSelectorConnector';

const linksMock = [
  {
    href: '/local/san-francisco-kdtv',
    name: 'Área de la Bahía',
    parent: 'Tu ciudad',
    site: 'univision',
    target: '_self',
  },
];
describe('Progress Connector', () => {
  it('should set scrollDirection to up if none is found', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <MarketSelectorConnector links={linksMock} />
      </Provider>
    );
    expect(wrapper.find('MarketSelector').props().links[0].href).toContain('/local/san-francisco-kdtv');
  });
});
