import React from 'react';
import { shallow } from 'enzyme';

import ShowSubNav from '.';
import mockData from './__data__/mock.json';

describe('ShowSubNav spec', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ShowSubNav {...mockData.withLinks} />);
    expect(wrapper.find('ShortTitle')).toBeDefined();
    expect(wrapper.find('Breadcrumb')).toBeDefined();
  });
  it('should not render breadcrumb component without links', () => {
    const wrapper = shallow(<ShowSubNav {...mockData.withoutLinks} />);
    expect(wrapper.find('Breadcrumb')).toHaveLength(0);
  });
  it('should render dark variant breadcrumb when type is video', () => {
    const wrapper = shallow(<ShowSubNav pageType="video" variant="dark" links={[0, 1]} />);
    expect(wrapper.find('Breadcrumb').prop('variant')).toBe('dark');
  });

  it('should render light variant breadcrumb when type is article', () => {
    const wrapper = shallow(<ShowSubNav {...mockData.articleType} />);
    expect(wrapper.find('Breadcrumb').prop('variant')).toBe('light');
  });
});
