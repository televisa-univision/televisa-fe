import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';

import SoccerMatch from '.';

const initialState = {
  pageCategory: pageCategories.SOCCER_MATCH_PRE,
  data: {
    type: 'soccermatch',
    title: 'hello',
    description: 'hello - description',
    primaryTopic: 'test topic',
    liveStreamEnabled: true,
    soccerCompetitionSeason: {
      soccerCompetition: {},
    },
    tracking: {
      tealium: {
        data: {
          title: 'title',
        },
      },
    },
    widgets: [
      {
        type: widgetTypes.DEPORTES_GRID_SOCCER_MATCH_OPENING,
        settings: {
          uid: 2,
        },
      },
    ],
  },
  device: 'mobile',
  theme: {
    isDark: true,
  },
};
const store = configureStore(initialState);

/** @test {SoccerMatch} */
describe('SoccerMatch Spec', () => {
  it('should render the SoccerMatchConnector', async () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SoccerMatch pageData={initialState} />
      </Provider>,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders SoccerMatchConnector with the correct props', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SoccerMatch pageData={initialState} />
      </Provider>,
    );

    const props = wrapper.children().props();
    expect(props.pageData.device).toBe(initialState.device);
    expect(props.pageData.theme.isDark).toBe(initialState.theme.isDark);
  });
});
