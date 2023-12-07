import React from 'react';
import { shallow } from 'enzyme';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import Breadcrumb from '.';
import mockData from './__data__/mock.json';

describe('Breadcrumb suite', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Breadcrumb links={mockData} />);
    expect(wrapper.find('.container')).toBeDefined();
    expect(wrapper.find('.link')).toHaveLength(3);
  });
  it('should not render links if no data is provided', () => {
    const wrapper = shallow(<Breadcrumb />);
    expect(wrapper.find('.link')).toHaveLength(0);
  });
  it('should not render links if invalid data is provided', () => {
    const invalidData = [
      {
        noLink: null,
      },
    ];
    const wrapper = shallow(<Breadcrumb links={invalidData} />);
    expect(wrapper.find('.link')).toHaveLength(0);
  });
  it('should render with the proper variation', () => {
    const wrapper = shallow(<Breadcrumb variant="light" links={mockData} />);
    expect(wrapper.find('.wrapper-light')).toBeDefined();
    expect(wrapper.find('.offset')).toHaveLength(1);
  });

  it('should not render with offset class on video pages', () => {
    storeHelpers.getPageData = jest.fn(() => ({ data: { type: 'video' } }));
    const wrapper = shallow(<Breadcrumb variant="light" links={mockData} />);
    expect(wrapper.find('.offset')).toHaveLength(0);
  });
});
