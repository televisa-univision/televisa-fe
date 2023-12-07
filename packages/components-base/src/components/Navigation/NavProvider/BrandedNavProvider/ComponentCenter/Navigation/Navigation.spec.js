import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';

import * as pageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import features from '@univision/fe-commons/dist/config/features';

import Navigation from '.';
import LINK_LIST from './VixLinkList';

const store = configureStore();
features.liveblog.liveBlogPerformance = jest.fn(() => true);
/**
 * @test {Header}
 */
describe('Navigation test', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    const links = LINK_LIST.mulher;
    const wrapper = mount(
      <Provider store={store}>
        <Navigation links={links} />
      </Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Navigation__MainMenuItem')).toHaveLength(7);
  });

  it('should update menu active on click', () => {
    const links = LINK_LIST.mulher;
    const wrapper = mount(
      <Provider store={store}>
        <Navigation links={links} uppercase />
      </Provider>
    );
    let menuItem = wrapper.find('Navigation__MainMenuItem').at(1);
    menuItem.simulate('click');
    menuItem = wrapper.find('Navigation__MainMenuItem').at(1);
    let arrowElem = menuItem.find('Navigation__Arrow');
    expect(arrowElem.props('data').name).toBe('arrowUp');
    menuItem.simulate('click');
    menuItem = wrapper.find('Navigation__MainMenuItem').at(1);
    arrowElem = menuItem.find('Navigation__Arrow');
    expect(arrowElem.props('data').name).toBe('arrowDown');
  });

  it('should not render if no links', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Navigation links={null} />
      </Provider>
    );
    expect(wrapper.find('Navigation__MainMenuItem')).toHaveLength(0);
  });

  it('should not render on server', () => {
    const links = LINK_LIST.mulher;
    const wrapper = shallow(
      <Provider store={store}>
        <Navigation links={links} renderOnServer={false} />
      </Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Navigation__MainMenuItem')).toHaveLength(0);
  });

  it('should render on client', () => {
    const links = LINK_LIST.mulher;
    const wrapper = mount(
      <Provider store={store}>
        <Navigation links={links} renderOnServer={false} />
      </Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Navigation__MainMenuItem')).toHaveLength(7);
    expect(wrapper.find('Navigation__Placeholder')).toHaveLength(0);
  });

  it('should render with rebrand', () => {
    jest.spyOn(features.deportes, 'isWorldCupMVP').mockReturnValue(true);
    jest.spyOn(pageSelectors, 'pageUriSelector').mockReturnValue('/empoderamento');

    const links = LINK_LIST.mulher;
    links[0].site = 'mulher';

    const wrapper = mount(
      <Provider store={store}>
        <Navigation links={links} />
      </Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Navigation__MainMenuItem')).toHaveLength(7);
  });

  it('should update menu active on click when worldcupmvp', () => {
    jest.spyOn(features.deportes, 'isWorldCupMVP').mockReturnValue(true);
    const links = LINK_LIST.mulher;
    const wrapper = mount(
      <Provider store={store}>
        <Navigation links={links} uppercase />
      </Provider>
    );
    let menuItem = wrapper.find('Navigation__MainMenuItem').at(1);
    menuItem.simulate('click');
    menuItem = wrapper.find('Navigation__MainMenuItem').at(1);
    let arrowElem = menuItem.find('Navigation__Arrow');
    expect(arrowElem.props('data').name).toBe('arrowUp');
    menuItem.simulate('click');
    menuItem = wrapper.find('Navigation__MainMenuItem').at(1);
    arrowElem = menuItem.find('Navigation__Arrow');
    expect(arrowElem.props('data').name).toBe('arrowDown');
  });

  it('should check if item has live icon', () => {
    const links = [{
      name: 'En vivo',
      link: '/en-vivo',
      icon: {
        name: 'live',
      },
    }];

    const wrapper = mount(
      <Provider store={store}>
        <Navigation links={links} />
      </Provider>
    );

    expect(wrapper.find('LiveIcon')).toHaveLength(1);
  });

  it('should check if item has icon', () => {
    const links = [{
      name: 'Televisa',
      link: '/televisa',
      icon: {
        name: 'televisa',
      },
    }];

    const wrapper = mount(
      <Provider store={store}>
        <Navigation links={links} />
      </Provider>
    );

    expect(wrapper.find('Icon')).toHaveLength(1);
  });

  it('should render with isTelevisaSite', () => {
    const links = [{
      name: 'Televisa',
      link: '/televisa',
      icon: {
        name: 'televisa',
      },
    }];
    const wrapper = mount(
      <Provider store={store}>
        <Navigation links={links} isTelevisaSite />
      </Provider>
    );
    wrapper.find('Navigation__MainMenuItem').simulate('click');
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Navigation__MainMenuItem')).toHaveLength(1);
  });
});
