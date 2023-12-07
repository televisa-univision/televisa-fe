import React from 'react';
import { shallow, mount } from 'enzyme';

import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';

import features from '@univision/fe-commons/dist/config/features';
import SectionsButton from '../SectionsButton';
import Search from '../../../Search';

import BrandedHeader from '.';

storeHelpers.getDevice = jest.fn(() => 'desktop');

const mockData = { data: {} };
features.deportes.isTudn = jest.fn(() => false);
storeHelpers.getPageData = jest.fn(() => mockData);

let props;
beforeEach(() => {
  props = {
    logoUrl: '/logo',
    logoDesktop: '/logoDesktop',
    toggleSectionMenu: jest.fn(),
    toggleSearchChange: jest.fn(),
    isSearchOpen: false,
    theme: {
      primary: 'white',
    },
    networks: [
      {
        name: 'FACEBOOK',
        href: 'https://www.facebook.com/univision',
        text: 'Univision Facebook',
      },
      {
        name: 'TWITTER',
        href: 'https://twitter.com/Univision',
        text: 'Univision Twitter',
      },
      {
        name: 'INSTAGRAM',
        href: 'https://www.instagram.com/univision/',
        text: 'Univision Instagram',
      },
    ],
  };
});

describe('BrandedHeader', () => {
  it('should render with ref', () => {
    const wrapper = mount(<BrandedHeader {...props} />);
    expect(wrapper.instance().child.current).toBeDefined();
  });

  it('renders sectionsButton with correct label', () => {
    const wrapper = shallow(<BrandedHeader {...props} variant="dark" />);
    expect(wrapper.find(SectionsButton).prop('label')).toBe('Secciones');
  });

  it('renders as expected when searchOpen is false', () => {
    props.renderingOptions = { showSearch: true };
    const wrapper = shallow(<BrandedHeader {...props} />);
    expect(wrapper.find(Search).prop('open')).toEqual(false);
  });

  it('renders as expected when searchOpen is true', () => {
    props.renderingOptions = { showSearch: true };
    props.isSearchOpen = true;
    const wrapper = shallow(<BrandedHeader {...props} />);
    expect(wrapper.find(Search).prop('open')).toEqual(true);
  });

  it('should call toggleSectionMenu when is clicked', () => {
    const wrapper = shallow(<BrandedHeader {...props} />);
    wrapper.find(SectionsButton).simulate('click');
    expect(props.toggleSectionMenu).toHaveBeenCalled();
  });

  it('should render button UniNow if renderingOptions.showUniNow', () => {
    props.renderingOptions = { showUniNow: true };
    const wrapper = shallow(<BrandedHeader {...props} />);
    expect(wrapper.find('ButtonUniNow')).toHaveLength(1);
  });
});

describe('BrandedHeader - subnav', () => {
  it('should render Subnav if renderingOptions.showLinks', () => {
    storeHelpers.getDevice.mockReturnValueOnce('mobile');
    props.links = [{
      name: 'En vivo',
      link: '/deportes/en-vivo',
      pageCategory: 'en-vivo',
    }, {
      name: 'Liga MX',
      link: '/deportes/futbol/liga-mx',
      pageCategory: 'liga-mx',
    }];
    props.renderingOptions = { showLinks: true };
    const wrapper = shallow(<BrandedHeader {...props} />);
    expect(wrapper.find('Subnav')).toHaveLength(1);
  });

  it('should render title if prop exists', () => {
    props.showTitleOnBranded = true;
    props.sectionUrl = 'https://www.univision.com';
    props.sectionTitle = 'test';
    const wrapper = shallow(<BrandedHeader {...props} />);
    expect(wrapper.find('Link')).toHaveLength(1);
  });

  it('should render networks if prop exists', () => {
    props.networks = [{
      href: 'https://www.facebook.com/univisionatlanta',
      name: 'FACEBOOK',
      text: '',
    }];
    const wrapper = shallow(<BrandedHeader {...props} />);
    expect(wrapper.find('FollowMenu')).toHaveLength(1);
  });

  it('should have theme background if provided', () => {
    const backgroundTheme = {
      primary: '#fefefe',
      secondary: '#cccccc',
    };
    const wrapper = shallow(<BrandedHeader {...props} backgroundTheme={backgroundTheme} />);
    expect(wrapper.find('.brandedHeader').props().style).toBeDefined();
  });

  it('should have theme background for tudn parent element', () => {
    const backgroundTheme = {
      primary: '#fefefe',
      secondary: '#cccccc',
    };

    const styling = {
      backgroundImage: 'http://image',
    };

    const wrapper = shallow(
      <BrandedHeader
        {...props}
        styling={styling}
        isBrandedHeader
        backgroundTheme={backgroundTheme}
      />
    );
    expect(wrapper.find('.brandedHeader').props().style).toBeDefined();
  });

  it('should have theme transparent background for tudn parent element', () => {
    const backgroundTheme = {
      primary: '#fefefe',
      secondary: '#cccccc',
    };

    const styling = {
      backgroundImage: 'http://image',
    };

    const wrapper = shallow(
      <BrandedHeader
        {...props}
        isTudn
        styling={styling}
        isBrandedHeader
        backgroundTheme={backgroundTheme}
      />
    );
    expect(wrapper.find('.brandedHeader').props().style).toBeDefined();
  });

  it('should have theme background for tudn', () => {
    const backgroundTheme = {};
    const pageData = {
      data: {
        vertical: 'deportes',
      },
    };
    features.deportes.isTudn.mockReturnValueOnce(true);
    storeHelpers.getPageData.mockReturnValueOnce(pageData);

    const wrapper = shallow(<BrandedHeader {...props} backgroundTheme={backgroundTheme} />);
    expect(wrapper.find('.brandedHeader').props().style).toBeDefined();
  });

  it('should not have theme background for tudn parent element', () => {
    const backgroundTheme = {
      primary: '#fefefe',
      secondary: '#cccccc',
    };

    const wrapper = shallow(<BrandedHeader {...props} backgroundTheme={backgroundTheme} />);
    expect(wrapper.props().style).toEqual({});
    expect(wrapper.find('.brandedHeader').props().style).toBeDefined();
  });
});
