import React from 'react';
import { shallow } from 'enzyme';

import squadExtractor from '@univision/shared-components/dist/extractors/squadExtractor';
import squad from '../../../../../utils/mocks/squad.json';
import SquadTable from '.';

let squadData;

describe('SquadTable tests', () => {
  beforeEach(() => {
    squadData = squadExtractor(squad);
  });
  it('renders as expected', () => {
    const wrapper = shallow(<SquadTable playerList={squadData[0].playerList} />);
    expect(wrapper.find('.table')).toHaveLength(1);
    expect(wrapper.find('SquadStatsHeader')).toHaveLength(1);
    expect(wrapper.find('SquadStatsRow')).toHaveLength(28);
  });
  it('renders as expected with empty props', () => {
    const wrapper = shallow(<SquadTable playerList={[]} />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
