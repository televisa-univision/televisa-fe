import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Loadable from 'react-loadable';

import * as subNavTypes from './subNavTypes';
import getSubNav from './getSubNav';

const props = {
  links: [
    { link: '#', name: 'Univision', target: '_self' },
    { link: '#a', name: 'Entertainment', target: '_blank' },
  ],
  variant: 'light',
  theme: {
    primary: 'blue',
  },
  styling: {
    activeLinkIndicatorColor: 'red',
  },
};

describe('getSubNav()', () => {
  it('should render subNav without crashing', async() => {
    const div = document.createElement('div');
    const SubNav = getSubNav();
    ReactDOM.render(<SubNav {...props} />, div);
  });

  it('should return the default sub nav component', () => {
    const SubNav = getSubNav(subNavTypes.DEFAULT);
    expect(SubNav.name).toEqual('DefaultSubNav');
  });

  it('should return the tent-pole sub nav component', () => {
    const SubNav = getSubNav(subNavTypes.TENTPOLE);
    expect(SubNav.name).toEqual('TentpolesSubNav');
  });

  it('should return the branded sub nav component', () => {
    const SubNav = getSubNav(subNavTypes.BRANDED);
    expect(SubNav.name).toEqual('BrandedSubNav');
  });

  it('should return the show sub nav component', async () => {
    const SubNav = getSubNav(subNavTypes.SHOWS);
    const wrapper = mount(<SubNav {...props} />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find('ShowSubNav')).toHaveLength(1);
  });
});
