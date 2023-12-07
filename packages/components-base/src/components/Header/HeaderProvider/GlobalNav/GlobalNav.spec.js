import React from 'react';
import { shallow, mount } from 'enzyme';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';

import GlobalHeaderLink from '../GlobalHeaderLink';
import SectionsButton from '../SectionsButton';

import GlobalNav from '.';

storeHelpers.getSites = jest.fn(() => ({}));
jest.useFakeTimers();

let props;

describe('GlobalNav', () => {
  beforeEach(() => {
    props = {
      toggleSectionMenu: jest.fn(),
      toggleSearch: jest.fn(),
      searchOpen: true,
      activePath: '/shows',
      isDesktop: true,
    };
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.resetAllMocks();
  });

  it('renders all links', () => {
    const wrapper = mount(<GlobalNav {...props} variant="dark" />);
    expect(wrapper.find(GlobalHeaderLink)).toHaveLength(7);
  });

  it('adds active prop to correct link', () => {
    const wrapper = shallow(<GlobalNav {...props} />);
    expect(wrapper.find({ href: '/noticias' }).prop('active')).toBe(false);
    expect(wrapper.find({ active: true })).toHaveLength(1);
    expect(wrapper.find({ href: props.activePath }).prop('active')).toBe(true);
  });

  it('should call link handler and redirect to URL', () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    storeHelpers.getSites = jest.fn(() => ({ univision: 'https://univision.com' }));
    jest.spyOn(storeHelpers, 'getPageId').mockReturnValue('123-456-789');
    const event = {
      target: {
        innerText: 'NOTICIAS',
        getAttribute: jest.fn(() => ('/noticias')),
        offsetParent: {
          getAttribute: jest.fn(() => ('/noticias')),
        },
      },
      preventDefault: jest.fn(),
    };
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = shallow(<GlobalNav {...props} />);
    wrapper.find(GlobalHeaderLink).first().simulate('click', event);
    jest.runOnlyPendingTimers();
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      event: 'navigation_click',
    }));
    trackerSpy.mockRestore();
  });

  it('should call link handler but not redirect if not have url', () => {
    jest.spyOn(storeHelpers, 'getPageId').mockReturnValue('123-456-789');
    const event = {
      target: {
        innerText: 'NOTICIAS',
        getAttribute: jest.fn(),
        offsetParent: {
          getAttribute: jest.fn(),
        },
      },
      preventDefault: jest.fn(),
    };
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = shallow(<GlobalNav {...props} />);
    wrapper.find(GlobalHeaderLink).first().simulate('click', event);
    jest.runOnlyPendingTimers();
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      event: 'navigation_click',
    }));
    trackerSpy.mockRestore();
  });

  it('should call toggleSectionMenu when section button is clicked', () => {
    const wrapper = shallow(<GlobalNav {...props} />);
    wrapper.find(SectionsButton).simulate('click');
    expect(props.toggleSectionMenu).toHaveBeenCalled();
  });

  it('should not call toggleSectionMenu when section button is clicked', () => {
    props.isDesktop = false;
    const wrapper = shallow(<GlobalNav {...props} />);
    expect(wrapper.find(SectionsButton)).toHaveLength(0);
  });
});
