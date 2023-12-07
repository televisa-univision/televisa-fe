import React from 'react';
import { shallow } from 'enzyme';

import Content from '.';

jest.mock('@univision/shared-components/dist/components/weather/MinMaxTemp', () => () => 'MinMaxTemp');
jest.mock('@univision/shared-components/dist/components/weather/WeatherDate', () => 'mock-widget');

describe('Content suite', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Content />);
    expect(wrapper.find('ShortTitle')).toHaveLength(1);
  });
});
