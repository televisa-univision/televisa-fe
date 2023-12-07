import React from 'react';
import { shallow, mount } from 'enzyme';

import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import features from '@univision/fe-commons/dist/config/features';

import Search from '../../../Search';
import SectionsButton from '../SectionsButton';
import Subnav from '../Subnav';
import FollowMenu from '../../../FollowMenu';

import SectionTitle from '.';
import Styles from './SectionTitle.scss';

const mockData = { data: {} };
features.deportes.isTudn = jest.fn(() => true);
storeHelpers.getPageData = jest.fn(() => mockData);
storeHelpers.getDevice = jest.fn(() => 'mobile');

jest.useFakeTimers();

let props;
beforeEach(() => {
  props = {
    variant: 'light',
    links: {
      primary: [],
    },
    title: 'title',
    logoDesktop: 'logoDesktop.jpg',
    logoMobile: 'logoMobile.jpg',
    toggleSearch: jest.fn(),
    toggleSectionMenu: jest.fn(),
    searchOpen: false,
    renderingOptions: {
      showSearch: true,
      showLinks: true,
    },
    theme: {
      primary: 'blue',
    },
    sectionUrl: '#section',
  };
});

describe('GlobalHeaders::SectionTitle', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<SectionTitle {...props} />);
    jest.runAllTimers();
    expect(wrapper.find('.container')).toHaveLength(1);
    expect(wrapper.find(`.${props.variant}`)).toHaveLength(1);
    expect(wrapper.find(Search)).toHaveLength(1);
    expect(wrapper.find(Subnav)).toHaveLength(1);
  });

  it('renders as expected with long title in desktop', () => {
    storeHelpers.getDevice.mockReturnValueOnce('desktop');
    props.title = 'EN VIVO: El presidente Donald Trump anuncia en prime time a su nominado para juez de la Corte Suprema de justicia de EEUU para sustituir a Anthony Kennedy.';
    const wrapper = shallow(<SectionTitle {...props} />);
    jest.runAllTimers();
    expect(wrapper.find('.container')).toHaveLength(1);
    expect(wrapper.find(`.${props.variant}`)).toHaveLength(1);
    expect(wrapper.find(Search)).toHaveLength(1);
    expect(wrapper.find(Subnav)).toHaveLength(1);
  });

  it('renders as expected with long title in mobile', () => {
    props.title = 'EN VIVO: El presidente Donald Trump anuncia en prime time a su nominado para juez de la Corte Suprema de justicia de EEUU para sustituir a Anthony Kennedy.';
    const wrapper = shallow(<SectionTitle {...props} />);
    jest.runAllTimers();
    expect(wrapper.find('.container')).toHaveLength(1);
    expect(wrapper.find(`.${props.variant}`)).toHaveLength(1);
    expect(wrapper.find(Search)).toHaveLength(1);
    expect(wrapper.find(Subnav)).toHaveLength(1);
  });

  it('renders as expected with long title and open search', () => {
    storeHelpers.getDevice.mockReturnValueOnce('desktop');
    props.title = 'EN VIVO: El presidente Donald Trump anuncia en prime time a su nominado para juez de la Corte Suprema de justicia de EEUU para sustituir a Anthony Kennedy.';
    props.isSearchOpen = true;
    const wrapper = shallow(<SectionTitle {...props} />);
    jest.runAllTimers();
    expect(wrapper.find('.container')).toHaveLength(1);
    expect(wrapper.find(`.${props.variant}`)).toHaveLength(1);
    expect(wrapper.find(Search)).toHaveLength(1);
    expect(wrapper.find(Subnav)).toHaveLength(1);
  });

  it('applies theme to "dark" variant', () => {
    props.variant = 'dark';
    const wrapper = shallow(<SectionTitle {...props} />);
    jest.runAllTimers();
    expect(wrapper.find('.sectionName').at(0).prop('style')).toEqual({ background: '#000000', color: 'blue' });
    expect(wrapper.find('.sectionName').at(1).prop('style')).toEqual({ color: 'blue' });
  });

  it('should change the color of the variant when sectionTitleBg is true', () => {
    props.sectionTitleBg = true;
    const wrapper = shallow(<SectionTitle {...props} />);
    jest.runAllTimers();
    expect(wrapper.find('.sectionName').at(0).prop('style')).toEqual({ background: 'blue', color: '#ffffff' });
    expect(wrapper.find(`.${Styles.theme}`)).toHaveLength(1);
    expect(wrapper.find(`.${Styles.dark}`)).toHaveLength(1);
  });

  it('should change the color of the variant when sectionTitleBg is true', () => {
    props.variant = 'dark';
    props.isSticky = false;
    props.subNavBackground = {
      color: 'green',
    };
    const wrapper = shallow(<SectionTitle {...props} isTudn />);
    jest.runAllTimers();
    expect(wrapper.find('.sectionName').at(1).prop('style')).toEqual({ color: '#ffffff' });
  });

  it('search expands all 12 columns on mobile when open', () => {
    props.isSearchOpen = true;
    const wrapper = shallow(<SectionTitle {...props} logoMap={{ mobile: [] }} />);
    jest.runAllTimers();
    expect(wrapper.find('.searchContainer.col-12')).toHaveLength(1);
    wrapper.setProps({ isSearchOpen: false });
    expect(wrapper.find('.searchContainer.col-3')).toHaveLength(1);
  });

  it('renders correctly based on renderingOptions prop', () => {
    props.renderingOptions = {
      showLinks: false,
      showSearch: false,
    };
    const wrapper = shallow(<SectionTitle {...props} />);
    jest.runAllTimers();
    expect(wrapper.find(Search)).toHaveLength(0);
    expect(wrapper.find(Subnav)).toHaveLength(0);
  });

  it('adds mobile logo in middle column if no title is set', () => {
    props.title = '';
    const wrapper = shallow(<SectionTitle {...props} logoMap={{ mobile: [] }} />);
    jest.runAllTimers();
    expect(wrapper.find('.logoMobile')).toHaveLength(0);
    expect(wrapper.find('.logoMobileNoTitle')).toHaveLength(1);
  });

  it('has no title fragment if no title is set', () => {
    storeHelpers.getDevice.mockReturnValueOnce('desktop');
    props.title = '';
    const wrapper = shallow(<SectionTitle {...props} />);
    jest.runAllTimers();
    expect(wrapper.find('.sectionName')).toHaveLength(0);
  });

  it('check the setAnimation method', () => {
    const sectionName = `<a class="${Styles.sectionName}">DEPORTES MUNDIAL RUSIA 2018 VIDEOS</a>`;
    document.body.innerHTML = sectionName;
    props.title = 'EN VIVO: El presidente Donald Trump anuncia en prime time a su nominado para juez de la Corte Suprema de justicia de EEUU para sustituir a Anthony Kennedy.';
    const wrapper = mount(<SectionTitle {...props} />);
    jest.runAllTimers();
    const instance = wrapper.instance();
    expect(instance.brandingTitle).toBeDefined();
    Object.defineProperty(instance.brandingTitle.current, 'offsetWidth', { value: 200, writable: true });
    Object.defineProperty(instance.wrapperTitle.current, 'offsetWidth', { value: 300, writable: true });
    expect(wrapper.state('animateClass')).toBe('');
    instance.setAnimation();
    jest.runAllTimers();
    expect(wrapper.state('animateClass')).toBe('toAnimate');
  });

  it('should set the theme color in white if there is a subNavBackground as a prop', () => {
    props.subNavBackground = {
      color: 'green',
      text: 'red',
    };
    const wrapper = shallow(<SectionTitle {...props} />);
    expect(wrapper.find('.sectionName').at(1).prop('style')).toEqual({ color: 'red' });
  });

  it('should show the followUsMenu if is set', () => {
    props.showFollowUs = true;
    props.isSearchOpen = false;
    const wrapper = shallow(<SectionTitle {...props} />);
    jest.runAllTimers();
    expect(wrapper.find(FollowMenu)).toHaveLength(1);
  });

  it('should add hideUpper, when custom subnav and is sticky = false', () => {
    props.subNavComponent = 'DEFAULT';
    props.isSticky = false;
    const wrapper = shallow(<SectionTitle {...props} />);
    jest.runAllTimers();
    expect(wrapper.find(`.${Styles.hideUpper}`)).toHaveLength(1);
  });

  it('should render UniNow button if renderingOptions.showUniNow', () => {
    props.renderingOptions = { showUniNow: true };
    const wrapper = shallow(<SectionTitle {...props} />);
    jest.runAllTimers();
    expect(wrapper.find('ButtonUniNow')).toHaveLength(1);
  });

  it('should have logoDesktopNoTitle when is Tudn and not have title', () => {
    props.title = '';
    const wrapper = shallow(<SectionTitle {...props} isTudn />);
    jest.runAllTimers();
    expect(wrapper.find('.logoDesktopNoTitle')).toHaveLength(1);
  });

  it('should have logoDesktop tudn style', () => {
    const wrapper = shallow(<SectionTitle {...props} isTudn />);
    jest.runAllTimers();
    expect(wrapper.find('.logoDesktop.isTudn')).toHaveLength(1);
  });

  it('should update isLoggedIn when handlers are called', () => {
    const wrapper = shallow(<SectionTitle {...props} logoMap={{ mobile: [] }} />);
    jest.runAllTimers();
    expect(wrapper.state().isLoggedIn).toBeFalsy();
    wrapper.instance().onUserLoggedHandler(true);
    expect(wrapper.state().isLoggedIn).toBeTruthy();
    wrapper.instance().onUserLoggedHandler(false);
    expect(wrapper.state().isLoggedIn).toBeFalsy();
  });

  it('should have backgroundColor if not sticky', () => {
    props.styling = {
      backgroundImage: 'http://test.com',
      subNavShadow: 'black',
    };
    props.variant = 'light';

    const wrapper = shallow(<SectionTitle {...props} isTudn isBrandedHeader />);
    jest.runAllTimers();
    expect(wrapper.find('.upper').prop('style')).toEqual({
      background: null,
      backgroundImage: null,
      backgroundSize: 'cover',
    });
  });

  it('should have background image is null if sticky', () => {
    props.styling = {
      backgroundImage: 'http://test.com',
      subNavShadow: 'black',
    };
    props.variant = 'dark';
    props.isSticky = true;

    const wrapper = shallow(<SectionTitle {...props} isTudn />);
    jest.runAllTimers();
    expect(wrapper.find('.upper').prop('style')).toEqual({
      background: '#000000',
      backgroundImage: null,
      backgroundSize: 'cover',
    });
  });

  it('should have no backgroundImage if sticky', () => {
    props.styling = {
      backgroundImage: 'http://test.com',
      subNavShadow: 'black',
    };
    props.isSticky = true;

    const wrapper = shallow(<SectionTitle {...props} isTudn isBrandedHeader />);
    jest.runAllTimers();
    expect(wrapper.find('.upper').prop('style')).toEqual({
      background: null,
      backgroundImage: null,
      backgroundSize: 'cover',
    });
  });

  it('should clear timeout on unmount', () => {
    spyOn(global, 'clearTimeout');
    const wrapper = shallow(<SectionTitle {...props} />);
    wrapper.unmount();
    expect(global.clearTimeout).toHaveBeenCalled();
  });

  it('Should call toggleSectionMenu when sectionButton is clicked', () => {
    const wrapper = shallow(<SectionTitle {...props} />);
    jest.runAllTimers();
    wrapper.find(SectionsButton).simulate('click');
    expect(props.toggleSectionMenu).toHaveBeenCalled();
  });

  it('Should render Section title without theme', () => {
    const wrapper = shallow(<SectionTitle {...props} theme={null} />);
    jest.runAllTimers();
    expect(wrapper.find('.sectionName').at(0).prop('style')).toEqual({ background: null, color: undefined });
  });
});
