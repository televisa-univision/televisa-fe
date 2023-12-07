import React from 'react';
import { shallow, mount } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Features from '@univision/fe-commons/dist/config/features';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';

import HeaderProvider from '.';
import BrandedHeader from './BrandedHeader';
import menuTypes from '../data/menuTypes.json';

Features.header.hideHeaderFooter = jest.fn();

jest.useFakeTimers();

jest.mock('./SectionTitle', () => 'SectionTitle');

let props;
const pageData = {
  data: {
    type: 'abc',
    uri: '/test',
  },
};

beforeEach(() => {
  props = {
    config: {
      subNavComponent: null,
      showGlobalNav: true,
      renderingOptions: {},
      sectionTitle: 'title',
      sectionUrl: '/default/path',
      pageTitle: 'page',
      links: {
        primary: [{
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
        }],
        secondary: [{
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
        }],
      },
      theme: {
        primary: 'red',
        secondary: 'blue',
      },
    },
  };
  Store.dispatch(setPageData(pageData));
});

describe('GlobalHeaders::HeaderProvider', () => {
  it('gets the correct layout for section pages', () => {
    Store.dispatch(setPageData({ data: { type: 'section' } }));
    props.config.sectionUrl = null;
    const wrapper = shallow(<HeaderProvider {...props} />);
    wrapper.instance().renderSectionTitleHeader = jest.fn();
    wrapper.setProps({ force: 'rerender' });
    expect(wrapper.instance().renderSectionTitleHeader).toBeCalledWith({
      title: props.config.pageTitle,
      sectionUrl: props.config.sectionUrl,
    });
    props.config.pageTitle = null;
    props.config.links.active = { link: 'active/subsection' };
    props.config.subNavComponent = jest.fn();
    wrapper.setProps(props);

    expect(wrapper.instance().renderSectionTitleHeader).toBeCalledWith({
      title: props.config.sectionTitle,
      sectionUrl: props.config.links.active.link,
    });

    props.config.fixedSectionUrl = true;
    wrapper.setProps(props);
    expect(wrapper.instance().renderSectionTitleHeader).toBeCalledWith({
      title: props.config.sectionTitle,
      sectionUrl: props.config.sectionUrl,
    });

    props.config.fixedSectionUrl = false;
    props.config.links.active = null;
    wrapper.setProps(props);

    expect(wrapper.instance().renderSectionTitleHeader).toBeCalledWith({
      title: props.config.sectionTitle,
      sectionUrl: props.config.sectionUrl,
    });
  });

  it('toggleSearch runs as expected', () => {
    const wrapper = shallow(<HeaderProvider {...props} />);
    wrapper.instance().toggleSearchChange();
    expect(wrapper.state('search')).toBe(true);
    wrapper.instance().toggleSearchChange();
    expect(wrapper.state('search')).toBe(false);
  });

  it('should add section open class on desktop', () => {
    const event = {
      target: { innerText: 'MÁS' },
      preventDefault: jest.fn(),
    };
    spyOn(storeHelpers, 'getDevice').and.returnValue('desktop');
    spyOn(global.document.body.classList, 'toggle');
    const wrapper = shallow(<HeaderProvider {...props} />);
    jest.runAllTimers();
    wrapper.instance().toggleSectionMenu(event);
    expect(global.document.body.classList.toggle).toHaveBeenLastCalledWith('sections-open');
  });

  it('should add sections-mobile-open-sticky class on mobile with sticky', () => {
    const event = {
      target: { innerText: 'MÁS' },
      preventDefault: jest.fn(),
    };
    spyOn(storeHelpers, 'getDevice').and.returnValue('mobile');
    spyOn(global.document.body.classList, 'toggle');
    const wrapper = shallow(<HeaderProvider {...props} />);
    wrapper.setState({ isSticky: true });
    wrapper.instance().toggleSectionMenu(event);
    expect(global.document.body.classList.toggle).toHaveBeenLastCalledWith('sections-mobile-open-sticky');
  });

  it('toggleSectionMenu runs also with diferent types', () => {
    const event = {
      target: {
        innerText: 'NOTICIAS',
        getAttribute: jest.fn(),
      },
      preventDefault: jest.fn(),
    };
    const wrapper = shallow(<HeaderProvider {...props} />);
    wrapper.instance().toggleSectionMenu(event, menuTypes.BRANDED_SECTION_MENU);
    expect(wrapper.state('brandedSectionMenu')).toBe(true);
    wrapper.instance().toggleSectionMenu(event, menuTypes.BRANDED_SECTION_MENU);
    expect(wrapper.state('brandedSectionMenu')).toBe(false);
  });

  it('renderSectionTitleHeader runs with default args', () => {
    const wrapper = shallow(<HeaderProvider {...props} />);
    const sectionTitle = shallow(wrapper.instance().renderSectionTitleHeader());
    expect(sectionTitle.prop('links')).toEqual(props.links);
  });

  it('renderHeaderLayout calls renderGlobalNav and renderBrandedHeader when appropriate', () => {
    const customProps = Object.assign({}, props);
    customProps.config.verticalRoot = true;
    const wrapper = shallow(<HeaderProvider {...customProps} />);
    wrapper.instance().data.type = 'section';
    spyOn(wrapper.instance(), 'renderGlobalNav');
    spyOn(wrapper.instance(), 'renderBrandedHeader');
    wrapper.instance().getHeaderLayout();
    expect(wrapper.instance().renderGlobalNav).toBeCalled();
    expect(wrapper.instance().renderBrandedHeader).toBeCalled();
  });

  it('renderHeaderLayout calls renderGlobalNav annd not call renderGlobalNav when appropriate', () => {
    Store.dispatch(setPageData({
      data: {
        uri: '/local/',
      },
    }));
    const customProps = Object.assign({}, props);
    customProps.config.verticalRoot = true;
    const wrapper = shallow(<HeaderProvider {...customProps} />);
    wrapper.instance().data.type = 'section';
    spyOn(wrapper.instance(), 'renderGlobalNav');
    spyOn(wrapper.instance(), 'renderBrandedHeader');
    wrapper.instance().getHeaderLayout();
    expect(wrapper.instance().renderGlobalNav).not.toBeCalled();
    expect(wrapper.instance().renderBrandedHeader).toBeCalled();
  });

  it('renderBrandedHeader returns expected markup', () => {
    Store.dispatch(setPageData({
      pageCategory: pageCategories.ENTERTAINMENT,
      data: {
        type: 'section',
      },
    }));
    const customProps = Object.assign({}, props);
    customProps.config.verticalRoot = true;
    const wrapper = shallow(<HeaderProvider {...customProps} />);
    expect(wrapper.find(BrandedHeader).exists()).toBe(true);
  });

  it('renderBrandedHeader with section title instead of page title', () => {
    Store.dispatch(setPageData({
      pageCategory: pageCategories.ENTERTAINMENT,
      data: {
        type: 'section',
      },
    }));

    const customProps = Object.assign({}, props);
    customProps.config = { ...customProps.config, pageTitle: undefined };
    customProps.config.verticalRoot = true;
    const wrapper = shallow(<HeaderProvider {...customProps} />);
    expect(wrapper.find(BrandedHeader).exists()).toBe(true);
  });

  it('renderBrandedHeader with fallback sectionTitle', () => {
    Store.dispatch(setPageData({
      pageCategory: pageCategories.ENTERTAINMENT,
      data: {
        type: 'section',
      },
    }));
    const customProps = Object.assign({}, props);
    customProps.config.pageTitle = null;
    customProps.config.verticalRoot = true;
    const wrapper = shallow(<HeaderProvider {...customProps} />);
    wrapper.setState({ brandedStickyHeader: true });
    expect(wrapper.find('SectionTitle').props()).toHaveProperty('title', customProps.config.sectionTitle);
  });

  it('should set data to empty object if no page data found in store', () => {
    Store.dispatch(setPageData({ data: null }));
    const wrapper = shallow(<HeaderProvider {...props} />);
    const instance = wrapper.instance();

    expect(instance.data).toEqual({});
  });

  it('should change the brandedStickyHeader state if scrollTop is less than node reference', () => {
    Store.dispatch(setPageData({ data: { type: 'section' } }));
    const customProps = Object.assign({}, props);
    customProps.config.verticalRoot = true;
    const wrapper = mount(<HeaderProvider {...customProps} />);
    wrapper.instance().shouldApplySticky(-10);
    expect(wrapper.state('brandedStickyHeader')).toBe(false);
  });

  it('should change the brandedStickyHeader state if scrollTop is higher than brandedHeader height', () => {
    Store.dispatch(setPageData({ data: { type: 'section' } }));
    const customProps = Object.assign({}, props);
    customProps.config.verticalRoot = true;
    const wrapper = mount(<HeaderProvider {...customProps} />);
    wrapper.instance().shouldApplySticky(200);
    expect(wrapper.state('brandedStickyHeader')).toBe(true);
  });

  it('should not change the brandedStickyHeader state if does not satisfy the parameters', () => {
    const wrapper = shallow(<HeaderProvider {...props} />);
    const instance = wrapper.instance();
    instance.brandedRef.current = null;
    expect(wrapper.instance().shouldApplySticky()).toBe(undefined);
  });

  it('should render without StickyWrapper when "setSticky" config is false', () => {
    const customProps = Object.assign({}, props);
    customProps.config.setSticky = false;
    const wrapper = shallow(<HeaderProvider {...customProps} />);
    expect(wrapper.find('SectionTitle')).toHaveLength(1);
    expect(wrapper.find('StickyWrapper')).toHaveLength(0);
  });

  it('should not render anything if "hideHeaderFooter" param is true', () => {
    Features.header.hideHeaderFooter.mockReturnValueOnce(true);
    const wrapper = shallow(<HeaderProvider {...props} />);
    expect(wrapper.type()).toBe(null);
  });

  it('should render the header if "hideHeaderFooter" param is false', () => {
    Features.header.hideHeaderFooter.mockReturnValueOnce(false);
    const wrapper = shallow(<HeaderProvider {...props} />);
    expect(wrapper.type()).not.toBe(null);
  });

  it('should set the sticky flag', () => {
    props.config.stickyHeaderSettings = {
      className: 'stickyTest',
    };
    const wrapper = shallow(<HeaderProvider {...props} />);
    expect(wrapper.find('.stickyTest')).toHaveLength(0);
    wrapper.instance().onStickyChange(true);
    expect(wrapper.state('isSticky')).toBe(true);
    expect(wrapper.find('.stickyTest')).toHaveLength(1);
  });

  it('should hide the hamburger if sticky changes to true', () => {
    props.config.stickyHeaderSettings = {
      className: 'stickyTest',
    };
    const wrapper = shallow(<HeaderProvider {...props} />);
    wrapper.setState({
      sectionMenu: true,
    });
    wrapper.instance().onStickyChange(true);
    expect(wrapper.state('isSticky')).toBe(true);
    expect(wrapper.state('sectionMenu')).toBeFalsy();
  });
  it('should render a show content header', () => {
    const pageDataWithShow = Object.assign(
      pageData,
      {
        data: {
          show: {
            title: 'Title',
          },
        },
      }
    );
    Store.dispatch(setPageData(pageDataWithShow));
    props.config.subNavComponent = jest.fn();
    const wrapper = shallow(<HeaderProvider {...props} />);
    expect(wrapper.find('GlobalNav')).toHaveLength(1);
  });
  it('should render a show content header without sticky header', () => {
    const pageDataWithShow = Object.assign(
      pageData,
      {
        data: {
          show: {
            title: 'Title',
          },
        },
      }
    );
    Store.dispatch(setPageData(pageDataWithShow));
    props.config.subNavComponent = jest.fn();
    props.config.setSticky = false;
    const wrapper = shallow(<HeaderProvider {...props} />);
    expect(wrapper.find('StickyWrapper')).toHaveLength(0);
  });
  it('should render a show content header without title in SectionTitle', () => {
    const pageDataWithShow = Object.assign(
      pageData,
      {
        data: {
          show: {
            title: 'Title',
          },
        },
        device: 'desktop',
      }
    );
    Store.dispatch(setPageData(pageDataWithShow));
    props.config.subNavComponent = jest.fn();
    const wrapper = shallow(<HeaderProvider {...props} />);
    expect(wrapper.find('SectionTitle').prop('title')).toBe(null);
  });
  it('should clear timeout on unmount', () => {
    spyOn(global, 'clearTimeout');
    const wrapper = shallow(<HeaderProvider {...props} />);
    wrapper.unmount();
    expect(global.clearTimeout).toHaveBeenCalled();
  });

  it('should render LogOutBar if not on soccerMatch', () => {
    storeHelpers.isSoccerMatchPage = jest.fn(() => false);
    const wrapper = shallow(<HeaderProvider {...props} />);
    expect(wrapper.find('LogOutBar')).toHaveLength(1);
  });
});
