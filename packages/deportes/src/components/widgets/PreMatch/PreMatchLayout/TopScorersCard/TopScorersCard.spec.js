import React from 'react';
import { shallow } from 'enzyme';

import TopScorersCard from '.';

let props;
let emptyProps;
beforeEach(() => {
  props = {
    topScorers: [
      {
        id: 't.123',
        teamLogo: 'https://cdn1.uvnimg.com/b6/56/7d3d29fd492faa7c7de2bd4df4d0/104-eb.png',
        players: [
          {
            name: 'John Doe',
            position: 'forward',
            score: 6,
          },
          {
            name: 'John Doe',
            position: 'forward',
            score: 5,
          },
          {
            name: 'John Doe',
            position: 'forward',
            score: 4,
          },
          {
            name: 'John Doe',
            position: 'forward',
            score: 3,
          },
        ]
      },
      {
        id: 't.45123',
        teamLogo: 'https://cdn3.uvnimg.com/d1/6c/f94687194cb384e7d1940c122d48/logotrigresestrellas.png',
        players: [
          {
            name: 'John Doe',
            position: 'forward',
            score: 6,
          },
          {
            name: 'John Doe',
            position: 'forward',
            score: 5,
          },
          {
            name: 'John Doe',
            position: 'forward',
            score: 4,
          },
          {
            name: 'John Doe',
            position: 'forward',
            score: 3,
          },
        ]
      }
    ]
  };
  emptyProps = [];
});

describe('MatchInfoCards tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<TopScorersCard {...props} />);
    expect(wrapper.find('.container')).toHaveLength(1);
  });
  it('should not render TeamScorersCard no teams are available', () => {
    const wrapper = shallow(<TopScorersCard {...emptyProps} />);
    expect(wrapper.find('TeamScorersCard').length).toBe(0);
  });
});
