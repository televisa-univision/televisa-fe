import React from 'react';
import { shallow } from 'enzyme';

import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';

import TeamGroup from '.';
import data from '../__mocks__/teams.json';

const teamData = standingsExtractor(data);
const props = teamData.sections[0];

describe('TeamGroup', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<TeamGroup />);
    expect(wrapper.find('TeamGroup__Wrapper')).toHaveLength(1);
  });
  it('should render a team group', () => {
    const wrapper = shallow(<TeamGroup {...props} />);
    expect(wrapper.find('TeamGroup__Wrapper')).toHaveLength(1);
  });
});
