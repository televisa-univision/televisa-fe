import React from 'react';
import { shallow } from 'enzyme';
import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';
import groupstandings from '../../../../../utils/mocks/groupStandings.json';
import StandingsMapping from '.';

const groupStanding = standingsExtractor(groupstandings);
const props = {
  data: groupStanding,
};

describe('StandingsMapping tests', () => {
  it('renders as expected with default props', () => {
    const wrapper = shallow(<StandingsMapping />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
  it('renders as expected with props', () => {
    const wrapper = shallow(<StandingsMapping {...props} />);
    expect(wrapper.find('table')).toHaveLength(8);
  });
  it('renders as expected with props for mls league id', () => {
    const wrapper = shallow(<StandingsMapping {...props} leagueId="98" />);
    expect(wrapper.find('table')).toHaveLength(8);
  });
});
