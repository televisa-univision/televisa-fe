import React from 'react';
import { mount } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import features from '@univision/fe-commons/dist/config/features';

import SoccerLiveEvents from '.';

const events = [
  {
    fixture: null,
    date: '2019-11-27T17:55:00Z',
    elapsedTime: '—',
    status: 'post',
    url: 'https://uat.tudn.com/futbol/uefa-champions-league/valencia-cf-vs-chelsea-uefa-champions-league-2019-11-27',
    channels: [
      'udn',
      'unimas',
    ],
    leagueKey: '5',
    leagueName: 'Champions League',
    stadiumName: 'Mestalla',
    hasLiveStream: true,
    tvAuthenticated: true,
    tudnXtra: false,
    broadcastLanguage: '',
    id: '2027103',
    week: '5',
    totalWeeks: '6',
    round: 'Round',
    teams: {
      away: {
        id: '8',
        url: '/deportes/futbol/chelsea',
        fullName: 'Chelsea',
        abbreviatedName: 'CHE',
        imageURI: 'http://cdn7.uvnimg.com/univision-media/image/upload/v1/prod/sports/teams_logos/8',
        scoreValue: {
          score: 2,
          penalty: null,
          firstLeg: null,
        },
        isWinner: false,
      },
      home: {
        id: '191',
        url: '/deportes/futbol/valencia-cf',
        fullName: 'Valencia CF',
        abbreviatedName: 'VAL',
        imageURI: 'http://cdn7.uvnimg.com/univision-media/image/upload/v1/prod/sports/teams_logos/191',
        scoreValue: {
          score: 2,
          penalty: null,
          firstLeg: null,
        },
        isWinner: false,
      },
    },
    featureEvent: false,
  },
  {
    fixture: null,
    date: '2019-11-27T17:55:00Z',
    elapsedTime: '—',
    status: 'post',
    url: 'https://uat.tudn.com/futbol/uefa-champions-league/valencia-cf-vs-chelsea-uefa-champions-league-2019-11-27',
    channels: [
      'udn',
      'unimas',
    ],
    leagueKey: '5',
    leagueName: 'Champions League',
    stadiumName: 'Mestalla',
    hasLiveStream: true,
    tvAuthenticated: true,
    tudnXtra: false,
    broadcastLanguage: '',
    id: '2027103',
    week: '5',
    totalWeeks: '6',
    round: 'Round',
  },
];
const mockEvent = {
  currentTarget: {
    getAttribute: () => events[0].url,
  },
  preventDefault: () => {},
};

describe('SoccerLiveEvents test', () => {
  beforeEach(() => {
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(false);
  });

  it('should render without crash', () => {
    const wrapper = mount(<SoccerLiveEvents />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('SoccerLiveEvent')).toHaveLength(0);
  });

  it('should render correctly', () => {
    const wrapper = mount(<SoccerLiveEvents events={events} />);
    expect(wrapper.find('SoccerLiveEvent')).toHaveLength(2);
    expect(wrapper.find('SoccerLiveEvent').at(0).props()).toHaveProperty('size', 'medium');
  });

  it('should render correctly on mobile', () => {
    Store.dispatch(setPageData({
      device: 'mobile',
    }));
    const wrapper = mount(<SoccerLiveEvents events={events} />);
    expect(wrapper.find('SoccerLiveEvent')).toHaveLength(2);
    expect(wrapper.find('SoccerLiveEvent').at(0).props()).toHaveProperty('size', 'small');
  });

  it('should call click handler and redirect', () => {
    const locationRedirectSpy = jest.spyOn(helpers, 'locationRedirect');
    const wrapper = mount(<SoccerLiveEvents events={events} />);

    const eventElement = wrapper.find('SoccerLiveEvent').at(0);
    eventElement.props().onPress(mockEvent);
    expect(locationRedirectSpy).toHaveBeenCalledWith('/futbol/uefa-champions-league/valencia-cf-vs-chelsea-uefa-champions-league-2019-11-27');
  });
});
