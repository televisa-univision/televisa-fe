import React from 'react';
import { shallow } from 'enzyme';

import MainArchive from '../MainArchive';

const yearsAvailable = [2010, 2011];

describe('MainArchive test', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<MainArchive yearsAvailable={yearsAvailable} />);
    expect(wrapper.find('h1')).toHaveLength(1);
  });
});
