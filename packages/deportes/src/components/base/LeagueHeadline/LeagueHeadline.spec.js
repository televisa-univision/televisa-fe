import React from 'react';
import { shallow } from 'enzyme';
import Styles from './LeagueHeadline.scss';

import LeagueHeadline from '.';

let props;
beforeEach(() => {
  props = {
    name: 'Name',
    phase: '8',
  };
});

/** @test {LeagueHeadline} */
describe('LeagueHeadline ', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<LeagueHeadline {...props} showName />);
    expect(wrapper.find(`div.${Styles.container}`).length).toBe(1);
  });
  it('should not show the name', () => {
    const wrapper = shallow(<LeagueHeadline {...props} showName={false} />);
    expect(wrapper.find('span.leagueName').length).toBe(0);
  });
});
