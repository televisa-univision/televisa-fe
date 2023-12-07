import React from 'react';
import { shallow } from 'enzyme';

import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import Brandable from '@univision/fe-commons/dist/utils/brandable';
import Styles from './BrandedSubNav.scss';

import BrandedSubNav from '.';
import SectionsButton from '../../SectionsButton';

import * as helpers from '../helpers';

storeHelpers.getDevice = jest.fn(() => 'mobile');
storeHelpers.getPageData = jest.fn();
storeHelpers.getBrandable = jest.fn();

const link = [
  {
    name: 'first link',
    link: '#a',
  },
  {
    name: 'second link',
    link: '#b',
  },
  {
    name: 'third link',
    link: '#c',
  },
  {
    name: 'fourth link',
    link: '#d',
  },
  {
    name: 'fifth link',
    link: '#e',
  },
  {
    name: 'sixth link',
    link: '#f',
  },
  {
    name: 'seventh link',
    link: '#g',
  },
  {
    name: 'eighth link',
    link: '#h',
  },
  {
    name: 'ninth link',
    link: '#i',
  },
  {
    name: 'tenth link',
    link: '#j',
  },
];

const baseData = {
  data: {
    brandable: {
      type: 'show',
      show: {
        headerLogo: {
          original: {
            href: 'logo.svg',
          },
        },
        socialNetworks: {
          facebookUrl: {
            name: 'facebook',
            url: '#facebook',
          },
          googleUrl: {
            name: 'google',
            url: '#google',
          },
        },
      },
    },
    externalWidgets: {
      calReply: {
        code: null,
        href: null,
      },
    },
  },
};

beforeEach(() => {
  storeHelpers.getPageData.mockImplementation(() => (baseData));
  storeHelpers.getBrandable.mockImplementation(() => (new Brandable(baseData.data)));
});

describe('BrandedSubNav', () => {
  it('should return null if there is not data', () => {
    storeHelpers.getDevice.mockImplementation(() => 'mobile');
    storeHelpers.getPageData.mockImplementation(() => (null));
    const wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.type()).toBe(null);
  });

  it('should render SubNav for mobile', () => {
    storeHelpers.getDevice.mockImplementation(() => 'mobile');
    const wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.find('.logoContainer.col-12')).toHaveLength(1);
    expect(wrapper.find('.infoContainer')).toHaveLength(0);
  });

  it('should render SubNav for tablet', () => {
    storeHelpers.getDevice.mockImplementation(() => 'tablet');
    const wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.find('.logoContainer')).toHaveLength(1);
    expect(wrapper.find('.infoContainer')).toHaveLength(1);
  });

  it('should render SubNav for desktop', () => {
    storeHelpers.getDevice.mockImplementation(() => 'desktop');
    const wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.find('.logoContainer')).toHaveLength(1);
    expect(wrapper.find('.infoContainer')).toHaveLength(1);
  });

  it('should render SubNav for desktop with activeLinkColorIndicator', () => {
    const styling = {
      activeLinkColorIndicator: '#FFF',
    };
    storeHelpers.getDevice.mockImplementation(() => 'desktop');
    const wrapper = shallow(<BrandedSubNav links={link} styling={styling} />);
    expect(wrapper.find('.logoContainer')).toHaveLength(1);
    expect(wrapper.find('.infoContainer')).toHaveLength(1);
  });

  it('should render social follow on desktop', () => {
    storeHelpers.getDevice.mockImplementation(() => 'desktop');
    const wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.find('FollowMenu')).toHaveLength(1);
  });

  it('should render social follow on mobile', () => {
    storeHelpers.getDevice.mockImplementation(() => 'mobile');
    const wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.find('FollowMenu')).toHaveLength(1);
  });

  it('should show the calReply without networks', () => {
    const data = Object.assign({}, baseData);
    data.data.brandable.socialNetworks = [];
    data.data.brandable.show = { airTimeText: 'Test' };
    data.data.externalWidgets.calReply.code = 'code';
    data.data.externalWidgets.calReply.href = 'href';
    storeHelpers.getPageData.mockImplementation(() => (data));
    const wrapper = shallow(<BrandedSubNav brandable={data.data.brandable} />);
    expect(wrapper.find('CalReply')).toHaveLength(1);
  });

  it('should render air time info on mobile', () => {
    const data = Object.assign({}, baseData);
    data.data.brandable.show.airTimeText = 'Test';
    storeHelpers.getDevice.mockImplementation(() => 'mobile');
    storeHelpers.getPageData.mockImplementation(() => (data));
    const wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.find('.airTimeLabel')).toHaveLength(1);
  });

  it('should render live stream link on desktop', () => {
    const data = Object.assign({}, baseData);
    data.data.brandable.show.liveLandingPage = { href: '/especiales' };
    data.data.brandable.show.liveTimer = '2018-05-03T16:43:02-04:00';
    storeHelpers.getDevice.mockImplementation(() => 'desktop');
    storeHelpers.getPageData.mockImplementation(() => (data));
    const wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.find(`div.${Styles.liveStream}`)).toHaveLength(1);
  });

  it('should render live stream info on mobile', () => {
    const data = Object.assign({}, baseData);
    data.data.brandable.show.liveLandingPage = { href: '/especiales' };
    data.data.brandable.show.liveTimer = '2018-05-03T16:43:02-04:00';
    storeHelpers.getDevice.mockImplementation(() => 'mobile');
    storeHelpers.getPageData.mockImplementation(() => (data));
    let wrapper = shallow(<BrandedSubNav links={[]} />);
    expect(wrapper.find(`div.${Styles.liveStream}`)).toHaveLength(1);
    data.data.brandable.show.liveLandingPage = { href: '' };
    storeHelpers.getPageData.mockImplementation(() => (data));
    wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.find(`div.${Styles.liveStream}`)).toHaveLength(1);
  });

  it('should render air time info on desktop', () => {
    const data = Object.assign({}, baseData);
    data.data.brandable.show.airTimeText = 'Test';
    storeHelpers.getDevice.mockImplementation(() => 'desktop');
    storeHelpers.getPageData.mockImplementation(() => (data));
    const wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.find('.airTimeLabel')).toHaveLength(1);
  });

  it('should not render logo if there is not logo data', () => {
    const data = Object.assign({}, baseData);
    delete data.data.brandable.show;
    storeHelpers.getDevice.mockImplementation(() => 'mobile');
    storeHelpers.getPageData.mockImplementation(() => (data));
    const wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.find('Logo')).toHaveLength(0);
  });

  it('should render the radioStation logo', () => {
    const data = Object.assign({}, baseData);
    delete data.data.brandable.show;
    data.data.brandable.radioStation = {};
    data.data.brandable.radioStation = {
      alternativeLogo: {
        renditions: {
          original: {
            href: 'logo.svg',
          },
        },
      },
    };
    storeHelpers.getPageData.mockImplementation(() => (data));
    const wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.find('Logo')).toHaveLength(1);
  });

  it('should render nav links', () => {
    const wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.find('nav')).toHaveLength(1);
  });

  it('should open the follow us menu', () => {
    storeHelpers.getDevice.mockImplementation(() => 'mobile');
    const wrapper = shallow(<BrandedSubNav links={link} />);
    wrapper.instance().toggleFollowUs(true);
    expect(wrapper.instance().state.followUsOpen).toBe(true);
  });

  it('should add a backgroundImage to the subnav', () => {
    const wrapper = shallow(<BrandedSubNav links={link} subNavBackground={{ image: 'test.svg' }} />);
    expect(wrapper.find('.wrapper').props().style.backgroundImage).toBe('url(test.svg)');
  });

  it('should add a backgroundColor to the subnav', () => {
    const wrapper = shallow(<BrandedSubNav links={link} subNavBackground={{ color: '#12345', text: 'red' }} />);
    expect(wrapper.find('.wrapper').props().style.backgroundColor).toBe('#12345');
  });

  it('should return null if global.window does not exists', () => {
    const data = Object.assign({}, baseData);
    storeHelpers.getPageData.mockImplementation(() => (data));
    const wrapper = shallow(<BrandedSubNav links={link} />);
    delete global.window;
    wrapper.instance().isLandscape();
    expect(wrapper.instance().isLandscape()).toBe(null);
  });

  it('should track subnav link click', () => {
    global.window = {
      innerWidth: 1400,
      innerHeight: 1200,
      addEventListener: jest.fn(),
    };
    storeHelpers.getDevice.mockImplementation(() => 'desktop');

    const trackSubnavClickSpy = jest.spyOn(helpers, 'trackSubnavClick');
    trackSubnavClickSpy.mockImplementation(() => {});

    const getLinksSpy = jest.spyOn(helpers, 'getLinks');
    getLinksSpy.mockReturnValue({
      visible: [
        ...link.slice(0),
      ],
      hidden: [],
    });

    const wrapper = shallow(<BrandedSubNav links={link} />);
    const subnavLinks = wrapper.find('.subNavLink');

    subnavLinks.forEach(subnavLink => subnavLink.props().onClick());

    expect(getLinksSpy).toHaveBeenCalledTimes(1);
    expect(trackSubnavClickSpy).toHaveBeenCalledTimes(10);
    trackSubnavClickSpy.mockRestore();
    getLinksSpy.mockRestore();
  });

  it('isLandscape should be return the correct value on diferents devices', () => {
    storeHelpers.getDevice.mockImplementation(() => 'desktop');
    global.window = {
      innerWidth: 1400,
      innerHeight: 1200,
      addEventListener: jest.fn(),
    };
    let wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.instance().isLandscape()).toBe(true);
    storeHelpers.getDevice.mockImplementation(() => 'tablet');
    global.window = {
      innerWidth: 1000,
      innerHeight: 1200,
      addEventListener: jest.fn(),
    };
    wrapper = shallow(<BrandedSubNav links={[]} />);
    expect(wrapper.instance().isLandscape()).toBe(false);
  });

  it('should show the calReply component', () => {
    const data = Object.assign({}, baseData);
    data.data.externalWidgets.calReply.code = 'code';
    data.data.externalWidgets.calReply.href = 'href';
    storeHelpers.getPageData.mockImplementation(() => (data));
    let wrapper = shallow(<BrandedSubNav links={[]} />);
    expect(wrapper.find('CalReply')).toHaveLength(1);

    // To cover the mobile branch
    storeHelpers.getPageData.mockImplementation(() => (data));
    storeHelpers.getDevice.mockImplementation(() => 'mobile');
    wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.find('CalReply')).toHaveLength(1);
  });
  it('should show the calReply component in mobile', () => {
    storeHelpers.getDevice.mockImplementation(() => 'mobile');
    const data = Object.assign({}, baseData);
    data.data.tagHierarchy = [
      { name: 'programas', url: 'https://performance.univision.com/temas/programas' },
      { name: 'minuto 45', url: 'https://performance.univision.com/shows/pequenos-gigantes' },
    ];
    storeHelpers.getPageData.mockImplementation(() => (data));
    const wrapper = shallow(<BrandedSubNav links={link} />);
    expect(wrapper.find('CalReply')).toHaveLength(1);
  });

  it('should toggle isSearchOpen when toggleSearchChange is called in mobile', () => {
    const props = {
      renderingOptions: { showSearch: true },
    };
    storeHelpers.getDevice.mockImplementation(() => 'mobile');
    const wrapper = shallow(<BrandedSubNav links={link} {...props} />);
    expect(wrapper.instance().state.isSearchOpen).toBe(false);
    wrapper.instance().toggleSearchChange();
    expect(wrapper.instance().state.isSearchOpen).toBe(true);
  });

  it('should toggle isSearchOpen when toggleSearchChange is called in desktop', () => {
    const props = {
      renderingOptions: { showSearch: true },
    };
    storeHelpers.getDevice.mockImplementation(() => 'desktop');
    const wrapper = shallow(<BrandedSubNav links={link} {...props} />);
    expect(wrapper.instance().state.isSearchOpen).toBe(false);
    wrapper.instance().toggleSearchChange();
    expect(wrapper.instance().state.isSearchOpen).toBe(true);
  });

  it('should call toggleSectionMenu when SectionsButton is clicked', () => {
    storeHelpers.getDevice.mockImplementation(() => 'mobile');
    const props = {
      toggleSectionMenu: jest.fn(),
    };
    const wrapper = shallow(<BrandedSubNav links={link} {...props} />);
    const toggleSectionMenuSpy = jest.spyOn(props, 'toggleSectionMenu');
    wrapper.find(SectionsButton).simulate('click');
    expect(toggleSectionMenuSpy).toHaveBeenCalled();
  });

  it('should render button UniNow if renderingOptions.showUniNow in desktop', () => {
    storeHelpers.getDevice.mockImplementation(() => 'desktop');
    const props = {
      renderingOptions: { showUniNow: true },
    };
    const wrapper = shallow(<BrandedSubNav {...props} />);
    expect(wrapper.find('ButtonUniNow')).toHaveLength(1);
  });

  it('should render button UniNow if renderingOptions.showUniNow in mobile', () => {
    storeHelpers.getDevice.mockImplementation(() => 'mobile');
    const props = {
      renderingOptions: { showUniNow: true },
    };
    const wrapper = shallow(<BrandedSubNav {...props} />);
    expect(wrapper.find('ButtonUniNow')).toHaveLength(1);
  });
});
