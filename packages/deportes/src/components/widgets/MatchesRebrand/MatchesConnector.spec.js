import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as getMatches from '@univision/fe-commons/dist/store/actions/deportes/matches-actions';

import MatchesConnector from './MatchesConnector';

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
const props = {
  settings: {
    uid: 'deportes-soccerlive',
  },
};

describe('MatchesConnector', async () => {
  it('should render without crashing', async () => {
    const wrapper = mount(
      <Provider store={Store}>
        <MatchesConnector {...props} />
      </Provider>
    );

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('MatchesRebrand')).toHaveLength(1);
  });

  it('should render without crashing', async () => {
    const wrapper = mount(
      <Provider store={Store}>
        <MatchesConnector {...props} />
      </Provider>
    );

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('MatchesRebrand')).toHaveLength(1);
  });

  it('should call getMatches action', async () => {
    const actionSpy = jest.spyOn(getMatches, 'default');
    const wrapper = mount(
      <Provider store={Store}>
        <MatchesConnector {...props} />
      </Provider>
    );

    await waitForComponentToPaint(wrapper);

    const instance = wrapper.find('MatchesRebrand').instance();
    instance.fetchMatches({}, null);
    expect(actionSpy).toHaveBeenCalled();
  });

  it('should render when no settings was provided', async () => {
    const wrapper = mount(
      <Provider store={Store}>
        <MatchesConnector />
      </Provider>
    );

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('MatchesRebrand')).toHaveLength(1);
  });
});
