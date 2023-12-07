import React from 'react';
import { shallow } from 'enzyme';

import Styles from './StationMenu.scss';
import StationMenu, { StationMenuComponent } from '.';

/** @test {StationMenu} */
describe('StationMenu', () => {
  it('renders the StationMenu', () => {
    const wrapper = shallow(<StationMenuComponent />);
    expect(wrapper.find(`div.${Styles.menu}`));
  });

  it('should open View Station in new tab', () => {
    const wrapper = shallow(<StationMenuComponent />);
    const firstLink = wrapper.find('Link');
    expect(firstLink.props().useExplicitNavigation).toBeDefined();
    expect(firstLink.props().target).toBe('_blank');
  });

  it('renders the StationMenu Overlay', () => {
    const wrapper = shallow(<StationMenu onClose={jest.fn()} onOpen={jest.fn()} />);
    expect(wrapper.find(`div.${Styles.toggle}`));
  });

  it('calls the outside click event when visible', () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <StationMenuComponent
        onClose={onClose}
        visible
      />
    );
    wrapper.instance().handleClickOutside({ stopPropagation: jest.fn() });
    expect(onClose).toHaveBeenCalled();
  });

  it('does not call the outside click event when visible', () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <StationMenuComponent
        onClose={onClose}
        visible={false}
      />
    );
    wrapper.instance().handleClickOutside({ stopPropagation: jest.fn() });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('handles opening the contact menu on click', () => {
    const onClose = jest.fn();
    const onOpen = jest.fn();
    const wrapper = shallow(
      <StationMenuComponent
        onClose={onClose}
        onOpen={onOpen}
      />
    );
    wrapper.find('button').simulate('click');
    expect(onOpen).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('handles closing the menu on click when visible', () => {
    const onClose = jest.fn();
    const onOpen = jest.fn();
    const wrapper = shallow(
      <StationMenu
        onClose={onClose}
        onOpen={onOpen}
        visible
      />
    );
    wrapper.find('UforiaIcon').simulate('click');
    expect(onOpen).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('handles opening the menu on click when not visible', () => {
    const onClose = jest.fn();
    const onOpen = jest.fn();
    const wrapper = shallow(
      <StationMenu
        onClose={onClose}
        onOpen={onOpen}
        visible={false}
      />
    );
    wrapper.find('UforiaIcon').simulate('click');
    expect(onOpen).toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });
});
