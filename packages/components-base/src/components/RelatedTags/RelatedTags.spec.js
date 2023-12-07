import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import mock from './__mocks__/tagsMock.json';
import RelatedTags from '.';

const { tags } = mock;

/** @test {Related Tags} */
describe('Related Tags', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    tags.push(null);
    ReactDOM.render(<RelatedTags tags={tags} forceColumn />, div);
  });
  it('should render related tags as Links', () => {
    const wrapper = mount(<RelatedTags tags={tags} />);
    expect(wrapper.find('Link').length).toBe(9);
  });
  it('should not render the tags if no content is provided', () => {
    const wrapper = shallow(<RelatedTags />);
    expect(wrapper.find('Link').length).toBe(0);
  });
});
