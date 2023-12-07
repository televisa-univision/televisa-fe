import React from 'react';
import { shallow } from 'enzyme';

import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';

import Teams from '.';
import data from './__mocks__/teams.json';

const props = standingsExtractor(data);

describe('Teams test', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Teams />);
    expect(wrapper.find('Teams__Wrapper')).toHaveLength(1);
  });
  it('should render all team groups', () => {
    const wrapper = shallow(<Teams {...props} />);
    expect(wrapper.find('Teams__Wrapper')).toHaveLength(1);
  });
});
