import React from 'react';
import { mount } from 'enzyme';

import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';

import StandingGroup from '.';
import data from '../__mocks__/standings.json';

const props = standingsExtractor(data);

describe('StandingGroup', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<StandingGroup />);
    expect(wrapper.find('StandingGroup__Wrapper')).toHaveLength(1);
  });
  it('should render component with proper data', () => {
    const wrapper = mount(<StandingGroup {...props.sections[0]} />);
    expect(wrapper.find('StandingGroup__Wrapper')).toHaveLength(1);
    expect(wrapper.find('StandingGroup__ContentRow')).toHaveLength(
      props.sections[0].data.length
    );
  });
});
