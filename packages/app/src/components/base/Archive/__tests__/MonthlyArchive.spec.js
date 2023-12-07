import React from 'react';
import { shallow } from 'enzyme';

import MonthlyArchive from '../MonthlyArchive';

const contents = [
  {
    title: 'test',
    url: 'test',
  },
];

describe('MonthlyArchive test', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<MonthlyArchive contents={contents} />);
    expect(wrapper.find('h1')).toHaveLength(1);
  });
});
