import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from 'react-test-renderer';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as pageActions from '@univision/fe-commons/dist/store/actions/page-actions';

import SoccerLiveConnector from './SoccerLiveConnector';
import * as selectSoccerLiveEvenData from './SoccerLiveSelector';

const Store = configureStore();

const props = {
  settings: {
    uid: 'soccer-live',
  },
};

describe('SoccerLiveConnector', () => {
  it('should render without crashing', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <SoccerLiveConnector settings={{}} />
      </Provider>
    );
    expect(wrapper.find('SoccerLive')).toHaveLength(1);
  });
  it('should call getAllEvents selector', () => {
    const selectorSpy = jest.spyOn(selectSoccerLiveEvenData, 'default');
    const wrapper = mount(
      <Provider store={Store}>
        <SoccerLiveConnector {...props} />
      </Provider>
    );
    expect(wrapper.find('SoccerLive')).toHaveLength(1);
    expect(selectorSpy).toHaveBeenCalled();
  });
  it('should compare props when dispatching new data', () => {
    const actionSpy = jest.spyOn(pageActions, 'setWidgetExtraData');
    const wrapper = mount(
      <Provider store={Store}>
        <SoccerLiveConnector {...props} />
      </Provider>
    );
    act(() => {
      Store.dispatch(
        pageActions.setWidgetExtraData(
          props.settings.uid,
          { ready: true },
        )
      );
    });
    wrapper.update();
    expect(actionSpy).toHaveBeenCalled();
  });
});
