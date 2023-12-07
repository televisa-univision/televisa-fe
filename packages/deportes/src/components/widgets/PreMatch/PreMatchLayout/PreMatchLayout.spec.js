import React from 'react';
import { shallow } from 'enzyme';

import preMatchExtractor from '@univision/shared-components/dist/extractors/preMatchExtractor';
import data from '../../../../utils/mocks/prematch.json';
import PreMatchLayout from '.';

let top;
let props;
let incomplete;
beforeEach(() => {
  props = preMatchExtractor(data);

  top = [
    {
      id: 't.123',
      teamLogo: 'https://cdn1.uvnimg.com/b6/56/7d3d29fd492faa7c7de2bd4df4d0/104-eb.png',
      players: [
        {
          id: 't.1',
          name: 'Ronaldo Cisneros',
          position: 'forward',
          score: 6,
        },
        {
          id: 't.12',
          name: 'Javier López',
          position: 'forward',
          score: 5,
        },
        {
          id: 't.123',
          name: 'Alan Pulido',
          position: 'forward',
          score: 4,
        },
      ]
    },
    {
      id: 't.123234',
      teamLogo: 'https://cdn3.uvnimg.com/d1/6c/f94687194cb384e7d1940c122d48/logotrigresestrellas.png',
      players: [
        {
          id: 't.1234',
          name: 'Henry Martín',
          position: 'forward',
          score: 6,
        },
        {
          id: 't.123456',
          name: 'Oribe Peralta',
          position: 'forward',
          score: 5,
        },
      ]
    }
  ];
  incomplete = {
    infoCards: {
      official: {
        name: 'Erick Yair Miranda Galindo',
      },
      site: {
        name: 'Estadio Cuauhtémoc',
        capacity: '33,042'
      },
      tournament: {
        name: 'Mexican Primera (Apertura)',
        week: '8'
      }
    }
  };
});

describe('PreMatchLayout tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<PreMatchLayout
      {...props}
      topScorers={top}
      matchCard
      previousCard
    />);
    expect(wrapper.find('div.container')).toHaveLength(1);
  });
  it('should render MatchInfoCards', () => {
    const wrapper = shallow(<PreMatchLayout {...props} matchCard />);
    expect(wrapper.find('MatchInfoCards').length).toBe(1);
  });
  it('should render LatestMatchesCard', () => {
    const wrapper = shallow(<PreMatchLayout {...props} previousCard />);
    expect(wrapper.find('LatestMatchesCard').length).toBe(1);
  });
  it('should render TopScorersCard', () => {
    const wrapper = shallow(<PreMatchLayout {...props} topScorers={top} scorersCard />);
    expect(wrapper.find('TopScorersCard').length).toBe(1);
  });
  it('should not render TopScorersCard', () => {
    const wrapper = shallow(<PreMatchLayout {...incomplete} />);
    expect(wrapper.find('TopScorersCard').length).toBe(0);
  });
});
