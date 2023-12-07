import React from 'react';
import { shallow } from 'enzyme';

import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import ShortTitle from '.';
import mockData from './__data__/mock.json';

describe('ShortTitle component suite', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ShortTitle {...mockData.rosariotijeras} />);
    expect(wrapper.find('.container')).toBeDefined();
  });

  it('should not render a style prop', () => {
    const data = {
      ...mockData.alpunto,
      backgroundImage: null,
      backgroundColor: null,
    };
    const wrapper = shallow(<ShortTitle {...data} />);
    expect(wrapper.find('.wrapper').prop('style')).toEqual({});
    expect(wrapper.find('.offset')).toHaveLength(1);
  });

  it('should not add offset on video pages', () => {
    const data = {
      ...mockData.alpunto,
      backgroundImage: null,
      backgroundColor: null,
    };
    storeHelpers.getPageData = jest.fn(() => ({ data: { type: 'video' } }));

    const wrapper = shallow(<ShortTitle {...data} />);
    expect(wrapper.find('.offset')).toHaveLength(0);
  });
});
