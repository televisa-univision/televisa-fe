import React from 'react';
import Loadable from 'react-loadable';
import { shallow } from 'enzyme';

import getComponent from './componentFactory';

/** @test {componentFactory} */
describe('componentFactory Spec', () => {
  it('should return the Leagues And Tournaments component', async () => {
    const initialState = {
      component: 'LeaguesAndTournaments',
      props: { showLeagues: 'true', showTournaments: 'true' },
    };
    const wrapper = shallow(<div>{ getComponent(initialState) }</div>);
    await Loadable.preloadAll();
    expect(wrapper.children().dive().find('LeaguesAndTournaments').length).toBe(1);
  });
  it('should return the LotteryWebView component', async () => {
    const initialState = {
      component: 'LotteryWebView',
      props: { market: 'Miami' },
    };
    const wrapper = shallow(<div>{ getComponent(initialState) }</div>);
    await Loadable.preloadAll();
    expect(wrapper.children().dive().find('LotteryWebView').length).toBe(1);
  });
  it('should return error if not component on the list', () => {
    expect(getComponent({})).toBe(null);
  });
});
