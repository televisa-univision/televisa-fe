import React from 'react';
import { shallow } from 'enzyme';
import StationListWrapper from './StationListWrapper';

describe('StationListWrapper', () => {
  it('should render TopicBar', () => {
    const wrapper = shallow(<StationListWrapper device="mobile" settings={{ title: 'Hello' }} />);
    expect(wrapper.find('TopicBar')).toHaveLength(1);
  });
});
