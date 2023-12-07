import React from 'react';
import { shallow, mount } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import StandingsStatsRow from '.';

let stat;
beforeEach(() => {
  stat = {
    team: {
      name: {
        abbreviatedName: 'MUN',
        fullName: 'Manchester United',
        imageURI: 'https://cdn3.uvnimg.com/a6/8f/bb85a20a470984c1006fb4aa2551/3-eb.png',
      },
    },
    dg: 9,
    key: 'team-item-1',
    pe: 0,
    pg: 5,
    pj: 6,
    pp: 1,
    pt: 15,
    ppg: 1.89,
    ga: 2,
    gc: 1,
    rankCompare: 1,
  };
});

describe('StandingsStatsRow tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<StandingsStatsRow stats={stat} position={0} />);
    expect(wrapper.find('tr.stats')).toHaveLength(1);
  });
  it('renders as expected with hasRelegation', () => {
    const wrapper = shallow(<StandingsStatsRow stats={stat} position={0} hasRelegation />);
    expect(wrapper.find('tr.stats')).toHaveLength(1);
  });
  it('should use the full name in team', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const wrapper = mount(<StandingsStatsRow stats={stat} position={0} />);
    expect(wrapper.find('.teamDesktop').at(0).text()).toBe('Manchester United');
  });
  it('should use the short name in team', () => {
    Store.dispatch(setPageData({
      device: 'mobile',
    }));
    const wrapper = mount(<StandingsStatsRow stats={stat} position={0} isMobile />);
    expect(wrapper.find('.teamMobile').at(0).text()).toBe('MUN');
  });
  it('should render as expected with points per game', () => {
    Store.dispatch(setPageData({
      device: 'mobile',
    }));
    const wrapper = mount(
      <StandingsStatsRow
        stats={stat}
        position={0}
        isMobile
        hasPointsPerGame
      />
    );
    expect(wrapper.find('.outcome').at(3).text()).toBe('1.89');
  });
});
