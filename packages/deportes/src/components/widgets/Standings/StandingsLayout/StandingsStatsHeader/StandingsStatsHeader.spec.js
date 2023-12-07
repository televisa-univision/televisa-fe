import React from 'react';
import { shallow } from 'enzyme';

import StandingsStatsHeader from '.';

let stMetadata;
let stMLSWest;
let stMLSEast;
let stGroupMetadata;
let emptyProps;
beforeEach(() => {
  stGroupMetadata = {
    scopingLabel: 'tournament',
    competitionScope: 'group',
  };
  stMetadata = {
    scopingLabel: '',
    competitionScope: 'group',
  };
  stMLSEast = {
    scopingLabel: 'group east',
    competitionScope: 'group',
  };
  stMLSWest = {
    scopingLabel: 'group west',
    competitionScope: 'group',
  };
  emptyProps = {};
});

describe('StandingsStatsHeader tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<StandingsStatsHeader {...stMetadata} />);
    expect(wrapper.find('tr.standingsTop')).toHaveLength(1);
  });
  it('renders as expected with hasRelegation', () => {
    const wrapper = shallow(<StandingsStatsHeader {...stMetadata} hasRelegation />);
    expect(wrapper.find('tr.standingsTop')).toHaveLength(1);
  });
  it('should render group standings header', () => {
    const wrapper = shallow(<StandingsStatsHeader {...stGroupMetadata} />);
    expect(wrapper.find('tr.standingsTop')).toHaveLength(1);
  });
  it('should render empty div if associate array is empty', () => {
    const wrapper = shallow(<StandingsStatsHeader {...emptyProps} />);
    expect(wrapper.find('div').length).toBe(1);
  });
  it('should render without abbreviation for group east', () => {
    global.window.innerWidth = 768;
    const wrapper = shallow(<StandingsStatsHeader {...stMLSEast} />);
    expect(wrapper.find('.teamSizeTop').text()).toBe('Conferencia Este');
  });
  it('should render without abbreviation for group west', () => {
    global.window.innerWidth = 768;
    const wrapper = shallow(<StandingsStatsHeader {...stMLSWest} />);
    expect(wrapper.find('.teamSizeTop').text()).toBe('Conferencia Oeste');
  });
  it('should render with abbreviation for group east', () => {
    global.window.innerWidth = 320;
    const wrapper = shallow(<StandingsStatsHeader {...stMLSEast} isMobile />);
    expect(wrapper.find('.teamSizeTopSmall').text()).toBe('Conf. Este');
  });
  it('should render with abbreviation for group west', () => {
    global.window.innerWidth = 320;
    const wrapper = shallow(<StandingsStatsHeader {...stMLSWest} isMobile />);
    expect(wrapper.find('.teamSizeTopSmall').text()).toBe('Conf. Oeste');
  });
  it('should render group standings header with tooltips', () => {
    const wrapper = shallow(<StandingsStatsHeader {...stGroupMetadata} hasTooltip />);
    expect(wrapper.find('Tooltip')).toHaveLength(9);
  });
});
