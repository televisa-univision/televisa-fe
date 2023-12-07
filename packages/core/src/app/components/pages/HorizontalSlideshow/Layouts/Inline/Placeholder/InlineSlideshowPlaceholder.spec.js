import React from 'react';
import { shallow } from 'enzyme';

import mockData from './mockData.json';
import Placeholder, { PlaceholderAsFunction } from '.';

describe('Inline Slideshow Placeholder', () => {
  it('should render the placeholder', () => {
    const wrapper = shallow(<Placeholder {...mockData} />);
    expect(wrapper.find('h2')).toHaveLength(1);
    expect(wrapper.find('BackgroundImage')).toHaveLength(1);
    expect(wrapper.find('Loading')).toHaveLength(1);
  });
  it('should return the placeholder as a function', () => {
    expect(typeof PlaceholderAsFunction(mockData)).toBe('function');
    expect(PlaceholderAsFunction(mockData)().type).toBe(Placeholder);
  });
});
