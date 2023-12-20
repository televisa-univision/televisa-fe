import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import * as spaHelpers from '@univision/fe-commons/dist/utils/helpers/spa';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import Link from '.';

/**
 * Mocked href
 * @type {String}
 */
const href = 'www.google.com';

const originalWindow = { ...global.window };
const windowSpy = jest.spyOn(global, 'window', 'get');
windowSpy.mockImplementation(() => ({
  ...originalWindow,
  location: {
    ...originalWindow.location,
    href: '',
  },
}));
// TODO: all .toBeDefined() test are testing nothing
// because .find always return an object even if not found the element
/** @test {Link} */
describe('Link', () => {
  beforeEach(() => {
    windowSpy.mockRestore();
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Link href={href} />, div);
  });

  it('should render text', () => {
    const wrapper = shallow(<Link href={href}>Hello There</Link>);
    const linkWrapper = shallow(wrapper.prop('children')({}));
    expect(linkWrapper.text()).toBe('Hello There');
  });

  it('should render the href prop', () => {
    const wrapper = shallow(<Link href={href} />);
    const linkWrapper = shallow(wrapper.prop('children')({}));
    expect(linkWrapper.find('a[href="www.google.com"]')).toBeDefined();
  });

  it('should render the href for non multisite and univision link', () => {
    Store.dispatch(setPageData({
      config: {
        deploy: { multiSite: false },
      },
      sites: {
        univision: 'http://local.fe.univision.com',
        tudn: 'http://local.fe.tudn.com',
      },
    }));

    const wrapper = shallow(<Link href="https://www.univision.com/famosos" />);
    const linkWrapper = shallow(wrapper.prop('children')({}));
    expect(linkWrapper.find('a').prop('href')).toBe('http://local.fe.univision.com/famosos');
    expect(linkWrapper.find('a[href="http://local.fe.univision.com/famosos"]')).toHaveLength(1);
  });

  it('should render the href for non multisite and tudn link', () => {
    Store.dispatch(setPageData({
      config: {
        deploy: { multiSite: false },
      },
      sites: {
        univision: 'http://local.fe.univision.com',
        tudn: 'http://local.fe.tudn.com',
      },
    }));

    const wrapper = shallow(<Link href="https://www.tudn.com/futbol" />);
    const linkWrapper = shallow(wrapper.prop('children')({}));
    expect(linkWrapper.find('a').prop('href')).toBe('http://local.fe.tudn.com/futbol');
    expect(linkWrapper.find('a[href="http://local.fe.tudn.com/futbol"]')).toHaveLength(1);
  });

  it('should render the href with site domain and relative link', () => {
    Store.dispatch(setPageData({
      config: {
        deploy: { multiSite: true },
      },
      sites: {
        univision: 'http://local.fe.univision.com',
        tudn: 'http://local.fe.tudn.com',
      },
    }));

    const wrapper = shallow(<Link href="/futbol" site="tudn" />);
    const linkWrapper = shallow(wrapper.prop('children')({}));
    expect(linkWrapper.find('a').prop('href')).toBe('http://local.fe.tudn.com/futbol');
    expect(linkWrapper.find('a[href="http://local.fe.tudn.com/futbol"]')).toHaveLength(1);
  });

  it('should render the href with default domain and relative link', () => {
    Store.dispatch(setPageData({
      config: {
        deploy: { multiSite: true },
      },
      domain: 'http://uat.univision.com',
      sites: {
        univision: 'http://local.fe.univision.com',
        tudn: 'http://local.fe.tudn.com',
      },
    }));

    const wrapper = shallow(<Link href="/noticias" />);
    const linkWrapper = shallow(wrapper.prop('children')({}));
    expect(linkWrapper.find('a').prop('href')).toBe('http://uat.univision.com/noticias');
    expect(linkWrapper.find('a[href="http://uat.univision.com/noticias"]')).toHaveLength(1);
  });

  it('should render the className prop', () => {
    const className = 'menu-link';
    const wrapper = shallow(<Link href={href} className={className} />);
    const linkWrapper = shallow(wrapper.prop('children')({}));
    expect(linkWrapper.find(`.${className}`)).toBeDefined();
  });

  it('should render the active className if activeLink and href match', () => {
    Store.dispatch(setPageData({
      config: {
        deploy: { multiSite: true },
      },
      domain: 'http://uat.univision.com',
      sites: {
        univision: 'http://local.fe.univision.com',
        tudn: 'http://local.fe.tudn.com',
      },
    }));

    const wrapper = shallow(<Link href="/noticias" site="univision" activeLink="https://univision.com/noticias" />);
    const linkWrapper = shallow(wrapper.prop('children')({}));
    expect(linkWrapper.find('.active')).toHaveLength(1);
  });

  it('should let browser navigate for televisa site hub for canal 9', () => {
    Store.dispatch(setPageData({
      site: 'televisa',
      pageCategory: 'televisa',
      parentSite: 'televisa',
      domain: 'http://uat.televisa.com',
    }));
    const wrapper = shallow(<Link href={'https://performance-elnu9ve.televisa.com/home-test-nu9ve/proyecbex-migration-cms-articulo-canal-nu9ve-test-5'} />);
    const instance = wrapper.instance();
    const history = {
      push: jest.fn(fn => fn),
    };
    instance.handleClick({ button: 0, preventDefault: () => { } }, history);
    expect(history.push).not.toHaveBeenCalled();
  });

  it('should let browser navigate for televisa site hub for canal 5', () => {
    Store.dispatch(setPageData({
      site: 'televisa',
      pageCategory: 'televisa',
      parentSite: 'televisa',
      domain: 'http://uat.televisa.com',
    }));
    const wrapper = shallow(<Link href={'https://performance-canal5.televisa.com/show-test-canal-5/bex-migration-pruebas-de-articulo-canal-5-test-1'} />);
    const instance = wrapper.instance();
    const history = {
      push: jest.fn(fn => fn),
    };
    instance.handleClick({ button: 0, preventDefault: () => { } }, history);
    expect(history.push).not.toHaveBeenCalled();
  });

  it('should not let browser navigate for televisa site hub', () => {
    Store.dispatch(setPageData({
      site: 'televisa',
      pageCategory: 'televisa',
      parentSite: 'televisa',
      domain: 'http://uat.televisa.com',
    }));
    const wrapper = shallow(<Link href={'/home'} />);
    const instance = wrapper.instance();
    const history = {
      push: jest.fn(fn => fn),
    };
    instance.handleClick({ button: 0, preventDefault: () => { } }, history);
    expect(history.push).toHaveBeenCalled();
  });

  it('should render the active className if activeLink and href match on televisa site', () => {
    Store.dispatch(setPageData({
      site: 'lasestrellas',
      pageCategory: 'lasestrellas',
      parentSite: 'televisa',
      domain: 'http://uat.lasestrellas.tv',
    }));

    const wrapper = mount(<Link href="/lasestrellas" site="televisa" activeLink="https://performance.lasestrellas.tv" />);
    expect(wrapper.find('a.active')).toHaveLength(1);
  });

  it('should render the target prop', () => {
    const target = '_blank';
    const wrapper = shallow(<Link href={href} target={target} />);
    const linkWrapper = shallow(wrapper.prop('children')({}));
    expect(linkWrapper.find('a[target="_blank"]')).toBeDefined();
  });

  it('should render the className prop', () => {
    // Suppress console errors for this test as we're passing in props that violate the prop types
    /* eslint-disable no-console */
    console.error = jest.fn();
    const className = 'menu-link';
    /* eslint-disable jsx-a11y/anchor-is-valid */
    const wrapper = shallow(<Link href={null} className={className} />);
    expect(wrapper.find('div span')).toBeDefined();
  });

  it('should call history.push in the handleClick method', () => {
    const wrapper = shallow(<Link href={href} />);
    const instance = wrapper.instance();
    const history = {
      push: jest.fn(fn => fn),
    };
    instance.handleClick({ button: 0, preventDefault: () => { } }, history);
    expect(history.push).toHaveBeenCalled();
  });

  it('should call history.push in the handleClick method if url is absolute on univision domain', () => {
    const wrapper = shallow(<Link href="/noticias" />);
    const instance = wrapper.instance();
    const history = {
      push: jest.fn(fn => fn),
    };
    instance.handleClick({
      button: 0,
      preventDefault: () => { },
      target: {
        getAttribute: () => ('https://www.univision.com/noticias'),
      },
    }, history);
    expect(history.push).toBeCalledWith('/noticias', { url: 'https://www.univision.com/noticias' });
  });

  it('should call history.push in the handleClick method if target is _self', () => {
    const wrapper = shallow(<Link href={href} target="_self" />);
    const instance = wrapper.instance();
    const history = {
      push: jest.fn(fn => fn),
    };
    instance.handleClick({ button: 0, preventDefault: () => { } }, history);
    expect(history.push).toHaveBeenCalled();
  });

  it('should not call history.push in the handleClick method if default prevented', () => {
    const wrapper = shallow(<Link href={href} />);
    const instance = wrapper.instance();
    const history = {
      push: jest.fn(fn => fn),
    };
    instance.handleClick({ button: 0, preventDefault: () => { }, defaultPrevented: true }, history);
    expect(history.push).not.toHaveBeenCalled();
  });

  it('should call onClick prop in the handleClick method if it exists', () => {
    const onClick = jest.fn(fn => fn);
    const wrapper = shallow(<Link href={href} onClick={onClick} />);
    const instance = wrapper.instance();
    const history = {
      push: jest.fn(fn => fn),
    };
    instance.handleClick({ button: 0, preventDefault: () => { } }, history);
    expect(onClick).toHaveBeenCalled();
  });

  it('should call handleClick method if context.history is defined', () => {
    spyOn(spaHelpers, 'shouldSkipSpa').and.returnValue(false);
    const wrapper = shallow(<Link href={href} />);
    const linkWrapper = shallow(wrapper.prop('children')({ history: {} }));
    const instance = wrapper.instance();
    instance.handleClick = jest.fn();
    wrapper.update();
    linkWrapper.find('a').simulate('click');
    expect(instance.handleClick).toHaveBeenCalled();
  });

  it('should call handleClick method if context.history is defined', () => {
    spyOn(spaHelpers, 'shouldSkipSpa').and.returnValue(false);
    const wrapper = shallow(<Link href={href} preventFollowClick />);
    const instance = wrapper.instance();
    const preventDefault = jest.fn();
    instance.onSpaClick({ preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });

  it('should avoid following up link if preventFollowClick provided', () => {
    spyOn(storeHelpers, 'isPlayingMedia').and.returnValue(true);
    spyOn(spaHelpers, 'shouldSkipSpa').and.returnValue(true);
    const wrapper = shallow(<Link preventFollowClick href={href} onClick={() => { }} />);
    const instance = wrapper.instance();
    instance.anchorRef.current = {
      dataset: {},
    };
    const preventDefault = jest.fn();
    instance.onClickTargetHandler({ preventDefault });
    expect(preventDefault).toBeCalled();
  });
  it('should set the link target to `_blank` when the pip player is active', () => {
    spyOn(storeHelpers, 'isPlayingMedia').and.returnValue(true);
    spyOn(spaHelpers, 'shouldSkipSpa').and.returnValue(true);
    const wrapper = shallow(<Link href={href} onClick={() => { }} />);
    const instance = wrapper.instance();
    instance.anchorRef.current = {
      dataset: {},
    };
    instance.onClickTargetHandler({});
    expect(instance.anchorRef.current.target).toBe('_blank');
  });
  it('should change the link target from `_self` to `_blank` when the pip player is active', () => {
    spyOn(storeHelpers, 'isPlayingMedia').and.returnValue(true);
    spyOn(spaHelpers, 'shouldSkipSpa').and.returnValue(true);
    const wrapper = shallow(<Link href={href} onClick={() => { }} />);
    const instance = wrapper.instance();
    instance.anchorRef.current = {
      dataset: {},
      target: '_self',
    };
    instance.onClickTargetHandler({});
    expect(instance.anchorRef.current.dataset).toEqual({ targetPip: '_self' });
    expect(instance.anchorRef.current.target).toBe('_blank');
  });
  it('should set lint target to `_black` when the player is open many times', () => {
    spyOn(storeHelpers, 'isPlayingMedia').and.returnValue(true);
    spyOn(spaHelpers, 'shouldSkipSpa').and.returnValue(true);
    const wrapper = shallow(<Link href={href} />);
    const instance = wrapper.instance();
    instance.anchorRef.current = {
      dataset: {
        targetPip: '_top',
      },
      target: '',
    };
    instance.onClickTargetHandler({});
    expect(instance.anchorRef.current.target).toBe('_blank');
  });
  it('should restore the link target when the pip player is closed', () => {
    spyOn(storeHelpers, 'isPlayingMedia').and.returnValue(false);
    spyOn(spaHelpers, 'shouldSkipSpa').and.returnValue(true);
    const wrapper = shallow(<Link href={href} />);
    const instance = wrapper.instance();
    instance.anchorRef.current = {
      dataset: {
        targetPip: '_top',
      },
      target: '_blank',
    };
    instance.onClickTargetHandler({});
    expect(instance.anchorRef.current.dataset).toEqual({ targetPip: '_top' });
    expect(instance.anchorRef.current.target).toBe('_top');
  });
  it('should has an empty link target when the pip player is closed', () => {
    spyOn(storeHelpers, 'isPlayingMedia').and.returnValue(false);
    spyOn(spaHelpers, 'shouldSkipSpa').and.returnValue(true);
    const wrapper = shallow(<Link href={href} />);
    const instance = wrapper.instance();
    instance.anchorRef.current = {
      dataset: {},
    };
    instance.onClickTargetHandler({});
    expect(instance.anchorRef.current.target).toBeUndefined();
  });
  it('should not change the link target if this is already `_blank` and the pip player is closed', () => {
    spyOn(storeHelpers, 'isPlayingMedia').and.returnValue(false);
    spyOn(spaHelpers, 'shouldSkipSpa').and.returnValue(true);
    const wrapper = shallow(<Link href={href} />);
    const instance = wrapper.instance();
    instance.anchorRef.current = {
      dataset: {},
      target: '_blank',
    };
    instance.onClickTargetHandler({});
    expect(instance.anchorRef.current.target).toBe('_blank');
  });
  it('should not call handleClick method if context.history is defined and SPA nav count is greater than the constant.', () => {
    spyOn(storeHelpers, 'getNavigationCount').and.returnValue(100);
    const wrapper = shallow(<Link href={href} />);
    const instance = wrapper.instance();
    instance.onClickTargetHandler = jest.fn();
    const linkWrapper = shallow(wrapper.prop('children')({ history: {} }));
    instance.handleClick = jest.fn();
    wrapper.update();
    linkWrapper.find('a').simulate('click');
    expect(instance.handleClick).not.toHaveBeenCalled();
  });
  it('should call explicit navigation', () => {
    const wrapper = shallow(<Link href={href} onClick={() => { }} useExplicitNavigation />);
    const instance = wrapper.instance();
    instance.anchorRef.current = {
      dataset: {},
    };
    instance.explicitNavigation = jest.fn();
    instance.onClickTargetHandler({});
    expect(instance.explicitNavigation).toHaveBeenCalled();
  });
  it('should not set new href if preventFollowClick', () => {
    const url = 'https://univision.com';
    window.location.href = url;
    const wrapper = shallow(
      <Link
        href={url}
        onClick={() => { }}
        useExplicitNavigation
        preventFollowClick
      />
    );
    const instance = wrapper.instance();
    instance.anchorRef.current = {
      dataset: {},
    };
    instance.explicitNavigation();
    expect(window.location.href).not.toBe('https://univision.com');
  });
  it('should set new href if not preventFollowClick', () => {
    const url = 'https://univision.com';
    window.location.href = url;
    const wrapper = mount(
      <Link
        href={url}
        onClick={() => { }}
        useExplicitNavigation
      />
    );
    const instance = wrapper.instance();
    instance.anchorRef.current = {
      dataset: {},
    };
    instance.explicitNavigation();
    expect(wrapper.find('a').props().href).toBe(url);
  });
  it('should call explicit navigation and change url', () => {
    const wrapper = mount(<Link href={href} onClick={() => { }} useExplicitNavigation />);
    const instance = wrapper.instance();
    const url = '#';
    window.location.href = url;
    instance.anchorRef.current = {
      dataset: {},
    };
    instance.onClickTargetHandler({});
    expect(window.location.href.includes(url)).toBe(true);
  });
  it('should call explicit navigation without href and avoid navigation', () => {
    spyOn(storeHelpers, 'isPlayingMedia').and.returnValue(false);
    const wrapper = mount(<Link href={href} onClick={() => { }} useExplicitNavigation />);
    const instance = wrapper.instance();

    instance.anchorRef.current = {
      dataset: {},
    };

    instance.onClickTargetHandler({});

    expect(wrapper.find('a').props().href).toEqual(href);
  });
  it('should render the seo TUDN params', () => {
    Store.dispatch(setPageData({
      isTudn: true,
      sites: { tudn: 'https://www.tudn.com' },
      domain: 'https://www.tudn.com',
    }));
    const target = '_blank';
    const wrapper = shallow(<Link href={href} target={target} />);
    const linkWrapper = shallow(wrapper.prop('children')({}));
    expect(linkWrapper.find('a[target="_blank"]')).toBeDefined();
    expect(linkWrapper.find('a[rel="alternate"]')).toBeDefined();
    expect(linkWrapper.find('a[hreflang="es-us"]')).toBeDefined();
  });
  it('should remove the event listener when component is unmounted', () => {
    const wrapper = mount(<Link href={href} />);
    const { current } = wrapper.instance().anchorRef;
    spyOn(current, 'removeEventListener');
    const fn = wrapper.instance().onSpaClick;
    wrapper.unmount();
    expect(current.removeEventListener).toHaveBeenCalledWith('click', fn);
  });
  it('should not remove the event listener if the ref is undefined when unmounted', () => {
    const wrapper = mount(<Link href={href} />);
    wrapper.instance().anchorRef.current = null;
    wrapper.unmount();
  });
  it('should append /mx if tudn, userLocation is mexico and worldcup flag is true', () => {
    const wrapper = shallow(<Link href={href} checkUserLocation />);
    const url = 'https://tudn.com/futbol';
    const site = 'tudn';
    wrapper.instance().isTudnSite = true;
    wrapper.instance().userLocation = 'MX';
    wrapper.instance().isWorldCupMVP = true;
    expect(wrapper.instance().withCountryCode(url, site)).toBe('https://tudn.com/mx/futbol');
  });
  it('should not append /mx if userLocation is not mexico', () => {
    const wrapper = shallow(<Link href={href} checkUserLocation />);
    const url = 'https://tudn.com/futbol';
    const site = 'tudn';
    wrapper.instance().isTudnSite = true;
    wrapper.instance().userLocation = 'US';
    wrapper.instance().isWorldCupMVP = true;
    expect(wrapper.instance().withCountryCode(url, site)).toBe('https://tudn.com/futbol');
  });
  it('should not append /mx if worldcup flag is false', () => {
    const wrapper = shallow(<Link href={href} checkUserLocation />);
    const url = 'https://tudn.com/futbol';
    const site = 'tudn';
    wrapper.instance().isTudnSite = true;
    wrapper.instance().userLocation = 'MX';
    wrapper.instance().isWorldCupMVP = false;
    expect(wrapper.instance().withCountryCode(url, site)).toBe('https://tudn.com/futbol');
  });
  it('should not append /mx on non tudn links', () => {
    const wrapper = shallow(<Link href={href} checkUserLocation />);
    const url = 'https://univision.com/test';
    const site = 'univision';
    wrapper.instance().isTudnSite = false;
    wrapper.instance().userLocation = 'MX';
    wrapper.instance().isWorldCupMVP = true;
    expect(wrapper.instance().withCountryCode(url, site)).toBe('https://univision.com/test');
  });
  it('should append /mx for tudn homepage if the user location is mx', () => {
    const wrapper = shallow(<Link href={href} checkUserLocation />);
    const url = '/';
    const site = 'tudn';
    wrapper.instance().isTudnSite = true;
    wrapper.instance().userLocation = 'MX';
    wrapper.instance().isWorldCupMVP = true;
    expect(wrapper.instance().withCountryCode(url, site)).toBe('https://www.tudn.com/mx/');
  });
  it('should not append /mx for tudn in SSR if the page is not geotargeted', () => {
    const wrapper = shallow(<Link href={href} checkUserLocation />);
    const url = 'https://www.tudn.com/test/an-article';
    const site = 'tudn';
    wrapper.instance().isTudnSite = true;
    wrapper.instance().userLocation = 'MX';
    wrapper.instance().isWorldCupMVP = true;
    wrapper.instance().pageUri = 'https://www.tudn.com/test/an-article';
    expect(wrapper.instance().withCountryCode(url, site)).toBe(url);
  });
});
