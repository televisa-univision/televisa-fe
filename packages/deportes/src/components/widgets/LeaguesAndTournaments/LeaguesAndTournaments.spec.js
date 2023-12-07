import React from 'react';
import { shallow } from 'enzyme';

import leagues from '../../../utils/mocks/competitions.json';
import tournaments from '../../../utils/mocks/tournaments.json';
import LeaguesAndTournaments from '.';

let props;
let props2;
let propsL;
let propsT;
let propsC;
beforeEach(() => {
  props = {
    settings: {
      leagueData: leagues,
      tournamentData: tournaments,
      showTournaments: true,
      showLeagues: true,
      showConfederations: true,
    },
  };
  props2 = {
    settings: {
      showTournaments: true,
      showLeagues: true,
      showConfederations: true,
    },
  };
  propsT = {
    settings: {
      showTournaments: true,
    },
  };
  propsL = {
    settings: {
      showLeagues: true,
    },
  };
  propsC = {
    settings: {
      showConfederations: true,
    },
  };
});

/** @test {LeaguesAndTournaments} */
describe('LeaguesAndTournaments ', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<LeaguesAndTournaments {...props} />);
    expect(wrapper.find('LeagueGrid').length).toBe(3);
  });
  it('should render with fixed data if no data is passed', () => {
    const wrapper = shallow(<LeaguesAndTournaments {...props2} />);
    expect(wrapper.find('LeagueGrid').length).toBe(3);
  });
  it('should render only Leagues', () => {
    const wrapper = shallow(<LeaguesAndTournaments {...propsL} />);
    expect(wrapper.find('LeagueGrid').length).toBe(1);
  });
  it('should render only tournamnets', () => {
    const wrapper = shallow(<LeaguesAndTournaments {...propsT} />);
    expect(wrapper.find('LeagueGrid').length).toBe(1);
  });
  it('should render only Confederations', () => {
    const wrapper = shallow(<LeaguesAndTournaments {...propsC} />);
    expect(wrapper.find('LeagueGrid').length).toBe(1);
  });
});
