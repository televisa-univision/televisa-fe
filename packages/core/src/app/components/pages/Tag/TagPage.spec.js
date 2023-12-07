import React from 'react';
import { shallow } from 'enzyme';

import mockLayoutApiData from 'server/proxy/api/page/__mocks__/mockTagPageData.json';
import Tag from './TagPage';

let props;
beforeAll(() => {
  props = mockLayoutApiData.data;
});

/** @test {Tag} */
describe('Tag tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Tag page={props} />);
    expect(wrapper.find('div.app-container')).toBeDefined();
  });
  it('renders properly with a title', () => {
    const wrapper = shallow(<Tag page={{ ...props, title: 'Test' }} />);
    expect(wrapper.find('Title')).toHaveLength(1);
  });
  it('renders properly with a primary topic', () => {
    const wrapper = shallow(<Tag page={{ ...props, primaryTopic: 'Primary' }} />);
    expect(wrapper.find('Title')).toHaveLength(1);
  });
});
