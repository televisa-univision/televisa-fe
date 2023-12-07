import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';

import LinksList from './LinksList';

const URL = '/shows/nuestra-belleza-latina';

it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <Provider store={Store}>
      <LinksList />
    </Provider>), div);
});

it('should render without localMarket', () => {
  const fetchLocalMarket = jest.fn();
  mount(
    <Provider store={Store}>
      <LinksList
        uri={URL}
        fetchLocalMarket={fetchLocalMarket}
      />
    </Provider>
  );

  expect(fetchLocalMarket).toHaveBeenCalled();
});

it('should render with localMarket', () => {
  const wrapper = mount(
    <Provider store={Store}>
      <LinksList
        localMarket="KAKW"
        uri={URL}
        links={[{ name: 'Vota', link: '/vota' }]}
      />
    </Provider>
  );

  expect(wrapper.find('LinksList__NavLink a').props().href).toEqual(`${URL}/vota`);
});

it('should render with localMarket from west', () => {
  const wrapper = mount(
    <Provider store={Store}>
      <LinksList
        localMarket="KABE"
        uri={URL}
        links={[{ name: 'Vota', link: '/vota' }]}
      />
    </Provider>
  );

  expect(wrapper.find('LinksList__NavLink a').props().href).toEqual(`${URL}/vota-west`);
});
