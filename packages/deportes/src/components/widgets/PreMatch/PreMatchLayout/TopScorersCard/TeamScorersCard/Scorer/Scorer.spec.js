import React from 'react';
import { shallow } from 'enzyme';

import Scorer from '.';

describe('Scorer tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Scorer name="Juan Pérez" position="forward" score={5} />);
    expect(wrapper.find('.container')).toHaveLength(1);
  });
});
