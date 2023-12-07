import React from 'react';
import { shallow } from 'enzyme';

import Section from '.';

jest.mock('@univision/shared-components/dist/components/weather/MinMaxTemp', () => () => 'MinMaxTemp');
jest.mock('@univision/shared-components/dist/components/weather/WeatherDate', () => 'mock-widget');

describe('Section suite', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Section />);
    expect(wrapper.find('ExposedNav')).toHaveLength(1);
  });
});
