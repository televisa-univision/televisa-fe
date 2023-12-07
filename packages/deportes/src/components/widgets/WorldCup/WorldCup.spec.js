import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as pageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import WorldCup from '.';
import * as getSchedule from './utils/getSchedule';
import * as getStandings from './utils/getStandings';

/**
 * Helper method to test async useEffect that sets new state
 * @param {JSX} wrapper - wrapper to be updated
 */
const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await Promise.resolve(wrapper);
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();
  });
};

const Store = configureStore();

describe('WorldCup widget', () => {
  let getScheduleSpy;
  let getStandingsSpy;
  beforeEach(() => {
    getScheduleSpy = jest.spyOn(getSchedule, 'default').mockResolvedValue([]);
    getStandingsSpy = jest.spyOn(getStandings, 'default').mockResolvedValue({});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', async () => {
    const wrapper = mount(
      <Provider store={Store}>
        <WorldCup />
      </Provider>
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.uvs-widget')).toHaveLength(1);
    expect(wrapper.find('Schedule')).toHaveLength(1);
    expect(getScheduleSpy).toHaveBeenCalled();
    expect.assertions(3);
  });

  it('should render MX version', async () => {
    jest.spyOn(pageSelectors, 'userLocationSelector').mockReturnValue('MX');
    const wrapper = mount(
      <Provider store={Store}>
        <WorldCup />
      </Provider>
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.uvs-widget')).toHaveLength(1);
    expect(wrapper.find('Schedule')).toHaveLength(1);
    expect(getScheduleSpy).toHaveBeenCalled();
    expect.assertions(3);
  });

  it('should render standings tab', async () => {
    const wrapper = mount(
      <Provider store={Store}>
        <WorldCup />
      </Provider>
    );
    await waitForComponentToPaint(wrapper);
    await act(async () => {
      const tab = wrapper.find('WorldCup__Tab').at(1);
      expect(tab.text()).toBe('Posiciones');
      tab.simulate('click');
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });
    expect(wrapper.find('WorldCup__Tab').at(1).prop('isActive')).toBe(true);
    expect(wrapper.find('.uvs-widget')).toHaveLength(1);
    expect(wrapper.find('Standings')).toHaveLength(1);
    expect(getStandingsSpy).toHaveBeenCalled();
    expect.assertions(5);
  });

  it('should render teams tab', async () => {
    const wrapper = mount(
      <Provider store={Store}>
        <WorldCup />
      </Provider>
    );
    await waitForComponentToPaint(wrapper);
    await act(async () => {
      const tab = wrapper.find('WorldCup__Tab').at(2);
      expect(tab.text()).toBe('Equipos');
      tab.simulate('click');
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });
    expect(wrapper.find('WorldCup__Tab').at(2).prop('isActive')).toBe(true);
    expect(wrapper.find('.uvs-widget')).toHaveLength(1);
    expect(wrapper.find('Teams')).toHaveLength(1);
    expect(getStandingsSpy).toHaveBeenCalled();
    expect.assertions(5);
  });

  it('should track tab clicks', async () => {
    const trackSpy = jest.spyOn(WidgetTracker, 'track').mockImplementation(jest.fn());
    const wrapper = mount(
      <Provider store={Store}>
        <WorldCup />
      </Provider>
    );
    await waitForComponentToPaint(wrapper);
    await act(async () => {
      const tab = wrapper.find('WorldCup__Tab').at(1);
      expect(tab.text()).toBe('Posiciones');
      tab.simulate('click');
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });
    expect(trackSpy).toHaveBeenCalled();
    expect.assertions(2);
  });
});
