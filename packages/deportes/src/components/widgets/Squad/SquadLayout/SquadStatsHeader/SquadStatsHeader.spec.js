import React from 'react';
import { shallow } from 'enzyme';

import SquadStatsHeader from '.';

let squadMetadata;
let emptyProps;

describe('SquadStatsHeader tests', () => {
  beforeEach(() => {
    squadMetadata = {
      scopingLabel: 'Squad',
    };
    emptyProps = {};
  });
  it('renders as expected', () => {
    const wrapper = shallow(<SquadStatsHeader {...squadMetadata} />);
    expect(wrapper.find('tr.squadTop')).toHaveLength(1);
  });
  it('should render empty div if array is empty', () => {
    const wrapper = shallow(<SquadStatsHeader {...emptyProps} />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
