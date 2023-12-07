import React from 'react';
import { shallow } from 'enzyme';

import LatestMatchesCard from '.';

let events;
let emptyProps;
beforeEach(() => {
  events = [
    {
      'event-metadata': {
        'event-key': '963356',
        'start-date-time': '2017-12-03T01:00:00Z',
      },
      team: [
        {
          id: 't.1292',
          'team-metadata': {
            'team-key': '1292',
            alignment: 'home',
            name: {
              full: 'América',
              abbreviation: 'AME',
            },
          },
          'team-stats': {
            score: '1',
          },
          image: 'https://cdn1.uvnimg.com/b6/56/7d3d29fd492faa7c7de2bd4df4d0/104-eb.png',
        },
        {
          id: 't.1294',
          'team-metadata': {
            'team-key': '1294',
            alignment: 'away',
            name: {
              full: 'Tigres',
              abbreviation: 'TIG',
            },
          },
          'team-stats': {
            score: '3',
          },
          image: 'https://cdn3.uvnimg.com/d1/6c/f94687194cb384e7d1940c122d48/logotrigresestrellas.png',
        },
      ],
    },
    {
      'event-metadata': {
        'event-key': '963357',
        'start-date-time': '2017-12-03T01:00:00Z',
      },
      team: [
        {
          id: 't.1292',
          'team-metadata': {
            'team-key': '1292',
            alignment: 'away',
            name: {
              full: 'América',
              abbreviation: 'AME',
            },
          },
          'team-stats': {
            score: '2',
          },
          image: 'https://cdn1.uvnimg.com/b6/56/7d3d29fd492faa7c7de2bd4df4d0/104-eb.png',
        },
        {
          id: 't.1294',
          'team-metadata': {
            'team-key': '1294',
            alignment: 'home',
            name: {
              full: 'Tigres',
              abbreviation: 'TIG',
            },
          },
          'team-stats': {
            score: '3',
          },
          image: 'https://cdn3.uvnimg.com/d1/6c/f94687194cb384e7d1940c122d48/logotrigresestrellas.png',
        },
      ],
    }];
  emptyProps = [];
});

describe('LatestMatchesCard tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<LatestMatchesCard events={events} />);
    expect(wrapper.find('.container')).toHaveLength(1);
  });
  it('should not render EventCard if events array is empty', () => {
    const wrapper = shallow(<LatestMatchesCard events={emptyProps} />);
    expect(wrapper.find('LatestMatch').length).toBe(0);
  });
  it('should render EventCards if events array has content', () => {
    const wrapper = shallow(<LatestMatchesCard events={events} />);
    expect(wrapper.find('LatestMatch').length).toBe(2);
  });
});
