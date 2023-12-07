import React from 'react';
import { shallow } from 'enzyme';

import YearlyArchive from '../YearlyArchive';

const numberOfPagesByMonth = {
  january: 1,
};

describe('YearlyArchive test', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<YearlyArchive numberOfPagesByMonth={numberOfPagesByMonth} />);
    expect(wrapper.find('h1')).toHaveLength(1);
  });
});
