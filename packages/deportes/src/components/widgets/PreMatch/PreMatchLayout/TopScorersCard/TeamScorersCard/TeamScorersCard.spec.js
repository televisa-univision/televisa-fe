import React from 'react';
import { shallow } from 'enzyme';

import TeamScorersCard from '.';

jest.mock('@univision/fe-components-base/dist/components/Image', () => jest.fn());
let props;
let emptyProps;
beforeEach(() => {
  props = {
    teamLogo: 'https://cdn1.uvnimg.com/b6/56/7d3d29fd492faa7c7de2bd4df4d0/104-eb.png',
    players: [
      {
        id: 'p.1',
        name: 'John Doe',
        position: 'forward',
        score: 6,
      },
      {
        id: 'p.2',
        name: 'John Doe',
        position: 'forward',
        score: 5,
      },
      {
        id: 'p.3',
        name: 'John Doe',
        position: 'forward',
        score: 4,
      },
    ]
  };
  emptyProps = {
    players: []
  };
});

describe('MatchInfoCards tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<TeamScorersCard {...props} />);
    expect(wrapper.find('.container')).toHaveLength(1);
  });
  it('should render no Info card if no players available', () => {
    const wrapper = shallow(<TeamScorersCard {...emptyProps} />);
    expect(wrapper.find('.noInfo').length).toBe(1);
  });
});
