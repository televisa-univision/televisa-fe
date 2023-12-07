import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as getMatches from '@univision/fe-commons/dist/store/actions/deportes/matches-actions';

import MatchesConnector from './MatchesConnector';

const Store = configureStore();
const props = {
  settings: {
    uid: 'matches-widget',
  },
};

describe('MatchesConnector', () => {
  it('should render without crashing', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <MatchesConnector {...props} />
      </Provider>
    );
    expect(wrapper.find('Matches')).toHaveLength(1);
  });

  it('should call getMatches action', () => {
    const actionSpy = jest.spyOn(getMatches, 'default');
    const wrapper = mount(
      <Provider store={Store}>
        <MatchesConnector {...props} />
      </Provider>
    );
    const instance = wrapper.find('Matches').instance();
    instance.fetchMatches({}, null);
    expect(actionSpy).toHaveBeenCalled();
  });

  it('should set isWorldCup to true if the soccer competition id equals 4', () => {
    const worldCupProps = {
      settings: {
        highlightedCompetitionSeasons: [
          {
            soccerCompetition: {
              id: '4',
            },
          },
        ],
      },
    };
    const wrapper = mount(
      <Provider store={Store}>
        <MatchesConnector {...worldCupProps} />
      </Provider>
    );

    expect(wrapper.find('Matches').prop('isWorldCup')).toBe(true);
  });
});
