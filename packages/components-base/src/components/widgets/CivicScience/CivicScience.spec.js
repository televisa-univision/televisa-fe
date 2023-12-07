import React from 'react';
import { shallow, mount } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import CivicScience from '.';

describe('CivicScience', () => {
  beforeEach(() => {
    delete global.window.civicscience;
  });
  it('should return null if there is not a Civic Science widget in the Store', () => {
    const wrapper = shallow(<CivicScience />);
    expect(wrapper.type()).toBe(null);
  });

  it('should return null if there is a invalid Civic Science widget in the Store', () => {
    Store.dispatch(setPageData({
      data: {
        externalWidgets: {
          civicScience: 'INVALID_SCRIPT',
        },
      },
    }));
    const wrapper = shallow(<CivicScience />);
    expect(wrapper.type()).toBe(null);
  });

  it('should render the component if there is a valid Civic Science widget in the Store', () => {
    const loadExternalScript = spyOn(helpers, 'loadExternalScript');
    Store.dispatch(setPageData({
      data: {
        externalWidgets: {
          civicScience: '<script type="text/javascript" src="https://www.civicscience.com/widget/jspoll/?elt=2827b225-3477-7b34-7dea-88a6b5047569&tgtid=baa9bace-d093-7594-014e-f8c8db509e69" defer></script><div id="2827b225-3477-7b34-7dea-88a6b5047569"></div>',
        },
      },
    }));
    const wrapper = mount(<CivicScience />);
    expect(wrapper.type()).not.toBe(null);
    expect(loadExternalScript).toHaveBeenCalled();
  });

  it('should load the script if is not already loaded', () => {
    Store.dispatch(setPageData({
      data: {
        externalWidgets: {
          civicScience: '<script type="text/javascript" src="https://www.civicscience.com/widget/jspoll/?elt=2827b225-3477-7b34-7dea-88a6b5047569&tgtid=baa9bace-d093-7594-014e-f8c8db509e69" defer></script><div id="2827b225-3477-7b34-7dea-88a6b5047569"></div>',
        },
      },
    }));
    helpers.loadExternalScript = jest.fn((params) => {
      global.window.civicscience = {
        widget: jest.fn(() => true),
      };
      params.onLoad();
    });
    const wrapper = mount(<CivicScience />);
    expect(wrapper.instance().is_mounted).toBe(true);
    expect(wrapper.instance().state.loaded).toBe(true);
    expect(global.window.civicscience.widget).toHaveBeenCalled();
  });

  it('should not load the script if is already loaded', () => {
    Store.dispatch(setPageData({
      data: {
        externalWidgets: {
          civicScience: '<script type="text/javascript" src="https://www.civicscience.com/widget/jspoll/?elt=2827b225-3477-7b34-7dea-88a6b5047569&tgtid=baa9bace-d093-7594-014e-f8c8db509e69" defer></script><div id="2827b225-3477-7b34-7dea-88a6b5047569"></div>',
        },
      },
    }));
    global.window.civicscience = {
      widget: jest.fn(() => true),
    };
    helpers.loadExternalScript = jest.fn((params) => {
      params.onLoad();
    });
    mount(<CivicScience />);
    expect(helpers.loadExternalScript).not.toHaveBeenCalled();
    expect(global.window.civicscience.widget).toHaveBeenCalled();
  });

  it('should not update the state if the load of the script failes', () => {
    Store.dispatch(setPageData({
      data: {
        externalWidgets: {
          civicScience: '<script type="text/javascript" src="https://www.civicscience.com/widget/jspoll/?elt=2827b225-3477-7b34-7dea-88a6b5047569&tgtid=baa9bace-d093-7594-014e-f8c8db509e69" defer></script><div id="2827b225-3477-7b34-7dea-88a6b5047569"></div>',
        },
      },
    }));
    helpers.loadExternalScript = jest.fn((params) => {
      global.window.civicscience = null;
      params.onLoad();
    });
    const wrapper = mount(<CivicScience />);
    wrapper.instance().componentDidUpdate();
    expect(wrapper.instance().is_mounted).toBe(true);
    expect(wrapper.instance().state.loaded).toBe(false);
  });

  it('should set is_mounted to false', (done) => {
    Store.dispatch(setPageData({
      data: {
        externalWidgets: {
          civicScience: '<script type="text/javascript" src="https://www.civicscience.com/widget/jspoll/?elt=2827b225-3477-7b34-7dea-88a6b5047569&tgtid=baa9bace-d093-7594-014e-f8c8db509e69" defer></script><div id="2827b225-3477-7b34-7dea-88a6b5047569"></div>',
        },
      },
    }));

    helpers.loadExternalScript = jest.fn(params => setTimeout(params.onLoad, 500));
    const wrapper = mount(<CivicScience />);
    const spyState = jest.spyOn(wrapper.instance(), 'setState');
    wrapper.instance().componentWillUnmount();
    expect(wrapper.instance().is_mounted).toBe(false);
    setTimeout(() => {
      expect(spyState).not.toHaveBeenCalled();
      spyState.mockRestore();
      done();
    }, 1000);
  });
  it('should not set the state to loaded in SSR', () => {
    const oldWindow = global.window;
    delete global.window;
    const wrapper = shallow(<CivicScience />);
    expect(wrapper.state('loaded')).toBe(false);
    global.window = oldWindow;
  });
});
