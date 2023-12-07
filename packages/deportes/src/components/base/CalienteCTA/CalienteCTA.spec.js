import React from 'react';
import { mount } from 'enzyme';

import CalienteCTA from '.';

const props = {
  isBetOpen: true,
  odds: ['100', '120', '130'],
  onClick: jest.fn(),
};

describe('CalienteCTA', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<CalienteCTA />);
    expect(wrapper.find('CalienteCTA__StyledLink')).toHaveLength(1);
  });
  it('should not render bets when bet is closed', () => {
    const wrapper = mount(<CalienteCTA {...props} isBetOpen={false} />);
    expect(wrapper.find('CalienteCTA__BetsWrapper')).toHaveLength(0);
  });
  it('should render bets when bet is open', () => {
    const wrapper = mount(<CalienteCTA {...props} />);
    expect(wrapper.find('CalienteCTA__BetsWrapper')).toHaveLength(1);
  });
  it('should not render bets when bets are empty', () => {
    const wrapper = mount(<CalienteCTA {...props} odds={[]} />);
    expect(wrapper.find('CalienteCTA__BetsWrapper')).toHaveLength(0);
  });
  it('should render in a single row', () => {
    const wrapper = mount(<CalienteCTA {...props} inline />);
    expect(wrapper.find('CalienteCTA__BetsWrapper')).toHaveLength(1);
  });
  it('should render in a single row with closed bets', () => {
    const wrapper = mount(<CalienteCTA {...props} inline isBetOpen={false} />);
    expect(wrapper.find('CalienteCTA__BetsWrapper')).toHaveLength(0);
  });
});
