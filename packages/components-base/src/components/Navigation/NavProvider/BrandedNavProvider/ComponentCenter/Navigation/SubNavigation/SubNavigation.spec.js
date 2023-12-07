import React from 'react';
import { shallow } from 'enzyme';
import SubNavigation from '.';

const linkList = [{
  name: 'title',
  link: '/title',
}, {
  name: 'title 2',
  link: 'title-2',
}];

/**
 * @test {Header}
 */
describe('SubNavigation test', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<SubNavigation linkList={linkList} />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('SubNavigation__MainMenuItem')).toHaveLength(2);
  });
});
