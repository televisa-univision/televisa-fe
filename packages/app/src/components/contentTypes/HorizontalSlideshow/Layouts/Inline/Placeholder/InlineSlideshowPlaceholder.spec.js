import React from 'react';
import { shallow } from 'enzyme';

import mockData from './__mocks__/placeholderMockData.json';
import Placeholder, { PlaceholderAsFunction } from '.';

describe('Inline Slideshow Placeholder', () => {
  it('should render the placeholder', () => {
    const wrapper = shallow(<Placeholder {...mockData} theme={{}} />);
    expect(wrapper.find('h2')).toHaveLength(1);
    expect(wrapper.find('BackgroundImage')).toHaveLength(1);
    expect(wrapper.find('Loading')).toHaveLength(1);
  });
  it('should return the placeholder as a function', () => {
    expect(PlaceholderAsFunction(mockData)).toBeInstanceOf(Function);
    expect(PlaceholderAsFunction(mockData)().type).toBe(Placeholder);
  });
});
