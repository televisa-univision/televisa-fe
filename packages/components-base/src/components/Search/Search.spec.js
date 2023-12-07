import React from 'react';
import { shallow, mount } from 'enzyme';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import RouterContext from '@univision/fe-commons/dist/components/RouterContext';
import * as spaHelpers from '@univision/fe-commons/dist/utils/helpers/spa';
import Store from '@univision/fe-commons/dist/store/store';

import Search from '.';

let props;

describe('Search widget', () => {
  beforeAll(() => {
    spaHelpers.shouldSkipSpa = jest.fn(() => true);
  });

  beforeEach(() => {
    props = {
      open: false,
      onToggle: jest.fn(),
    };
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('adds wrapper class based on props', () => {
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper.find('.searchOpen')).toHaveLength(0);
    wrapper.setProps({ open: true });
    expect(wrapper.find('.searchOpen')).toHaveLength(1);
  });

  it('should track when is clicked', () => {
    const navigationTrackerSpy = jest.spyOn(NavigationTracker, 'track');
    const wrapper = mount(<Search {...props} />);
    wrapper.find('Button').simulate('click');
    expect(navigationTrackerSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'topnav-header-search icon',
    });
    expect(navigationTrackerSpy).toHaveBeenCalledTimes(1);
    navigationTrackerSpy.mockClear();
  });

  it('should track input when isHamburgerMenu provided', () => {
    const navigationTrackerSpy = jest.spyOn(NavigationTracker, 'track');
    delete props.onToggle;
    props.isHamburgerMenu = true;
    const wrapper = mount(<Search {...props} />);
    wrapper.find('input').simulate('click');
    expect(navigationTrackerSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'hamburger-search bar click',
    });
    expect(navigationTrackerSpy).toHaveBeenCalledTimes(1);
    navigationTrackerSpy.mockClear();
  });

  it('should not track input click when isHamburgetMenu flag is false', () => {
    const navigationTrackerSpy = jest.spyOn(NavigationTracker, 'track');
    const wrapper = mount(<Search {...props} />);
    wrapper.find('input').simulate('click');
    expect(navigationTrackerSpy).not.toBeCalled();
  });

  it('should be able to render the search icon on the left', () => {
    const wrapper = shallow(<Search {...props} />);

    expect(wrapper.find('.iconSpacer')
      .props())
      .toEqual(expect.objectContaining({
        style: { order: 0 },
      }));
    expect(wrapper.find('.searchInput')
      .props())
      .toEqual(expect.objectContaining({
        style: { order: 1 },
      }));
  });

  it('should be able to render the search icon on the right', () => {
    const wrapper = shallow(<Search {...props} searchOnRight />);

    expect(wrapper.find('.iconSpacer')
      .props())
      .toEqual(expect.objectContaining({
        style: { order: 1 },
      }));
    expect(wrapper.find('.searchInput')
      .props())
      .toEqual(expect.objectContaining({
        style: { order: 0 },
      }));
  });

  it('should push to history and dispatch search if SPA and history defined', () => {
    const dispatchSpy = jest.spyOn(Store, 'dispatch');
    const history = { push: jest.fn() };
    const wrapper = mount((
      <RouterContext.Provider value={{ history }}>
        <Search open {...props} />
      </RouterContext.Provider>
    ));

    const queryInput = wrapper.find('input').getNode;
    const formElement = wrapper.find('[data-element-name="SearchForm"]');

    queryInput.value = 'test';
    spaHelpers.shouldSkipSpa.mockReturnValueOnce(false);
    formElement.simulate('submit', { preventDefault () {} });
    expect(history.push).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toBeCalled();

    history.push.mockClear();
    dispatchSpy.mockClear();
    formElement.simulate('submit', { preventDefault () {} });
    expect(history.push).not.toBeCalled();
    expect(dispatchSpy).not.toBeCalled();
  });

  it('should avoid calls if history is not defined', () => {
    const dispatchSpy = jest.spyOn(Store, 'dispatch');
    const wrapper = mount((
      <RouterContext.Provider value={{}}>
        <Search open {...props} />
      </RouterContext.Provider>
    ));
    spaHelpers.shouldSkipSpa.mockReturnValueOnce(true);
    const queryInput = wrapper.find('input').getNode;
    const formElement = wrapper.find('[data-element-name="SearchForm"]');

    queryInput.value = 'test';
    formElement.simulate('submit', { preventDefault () {} });
    expect(dispatchSpy).not.toBeCalled();
  });
});
