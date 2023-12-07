import React from 'react';
import { shallow } from 'enzyme';
import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';
import groupstandings from '../../../../../utils/mocks/groupStandings.json';
import mlsStandings from '../../../../../utils/mocks/standingsMLS';
import StandingsStatsBody from '.';

const groupStanding = standingsExtractor(groupstandings);
const mls = standingsExtractor(mlsStandings);
const props = {
  statsArray: groupStanding.sections[0].data,
  isFull: true,
  hasRelegation: false,
  isMobile: true,
  show: 5,
  top: 2,
  showMore: false,
  hasTopTeams: true,
  hasPointsPerGame: false,
  dashedBorder: 2,
};

describe('StandingsStatsBody tests', () => {
  it('returns null if the component has no data', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<StandingsStatsBody />);
    expect(wrapper.getElement()).toBe(null);
  });
  it('renders as expected with props', () => {
    const wrapper = shallow(<StandingsStatsBody {...props} />);
    expect(wrapper.find('StandingsStatsRow')).toHaveLength(4);
  });
  it('renders as expected with MLS props', () => {
    props.statsArray = mls.sections[0].data;
    props.hasPointsPerGame = true;
    const wrapper = shallow(<StandingsStatsBody {...props} />);
    expect(wrapper.find('StandingsStatsRow')).toHaveLength(14);
  });
});
