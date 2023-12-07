import React from 'react';
import { shallow } from 'enzyme';
import SquadStatsRow from '.';

let players;
let playerTracker;

describe('SquadStatsRow tests', () => {
  beforeEach(() => {
    players = {
      dateOfBirth: '2019-03-08',
      height: '174',
      playerUrk: 'https://uat.tudn.com/jugadores/cristiano-ronaldo',
      position: 'defense',
      name: 'Fulanito',
      nationality: 'Mexico',
      number: '1',
      weight: '90',
    };
    playerTracker = jest.fn();
  });
  it('renders as expected', () => {
    const wrapper = shallow(<SquadStatsRow {...players} playerTracker={playerTracker} />);
    expect(wrapper.find('tr.stats')).toHaveLength(1);
  });
  it('renders as expected with Unknown props', () => {
    players.dateOfBirth = 'Unknown';
    players.weight = 'Unknown';
    players.height = 'Unknown';
    players.number = 'Unknown';
    players.nationality = 'Unknown';
    const wrapper = shallow(<SquadStatsRow {...players} playerTracker={playerTracker} />);
    expect(wrapper.find('.number').at(0).text()).toBe('--');
    expect(wrapper.find('tr.stats')).toHaveLength(1);
    expect(wrapper.find('Image')).toHaveLength(1);
  });
});
