import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Loadable from 'react-loadable';

import * as iconTypes from './iconTypes';
import getIcons from './getIcons';

describe('getIcons()', () => {
  it('should render getIcons without crashing', async() => {
    const div = document.createElement('div');
    const Icon = getIcons(iconTypes.IMAGE);
    ReactDOM.render(<Icon />, div);
  });

  it('should return null if no argument is send to the helper', () => {
    const Icon = getIcons();
    expect(Icon).toBeNull();
  });

  it('should return the image component', () => {
    const Icon = getIcons(iconTypes.IMAGE);
    expect(Icon.name).toEqual('Image');
  });

  it('should return the LiveIcon component', async () => {
    const Icon = getIcons(iconTypes.LIVE);
    const wrapper = mount(<Icon />);
    await Loadable.preloadAll();
    wrapper.update();
    expect(wrapper.find('LiveIcon')).toHaveLength(1);
  });
});
