import React from 'react';
import { shallow } from 'enzyme';

import * as subNavTypes from '@univision/fe-commons/dist/constants/subNavTypes';

import SubNavProvider from '.';

jest.mock('@univision/shared-components/dist/components/weather/MinMaxTemp', () => () => 'MinMaxTemp');
jest.mock('@univision/shared-components/dist/components/weather/WeatherDate', () => 'mock-widget');

describe('SubNavProvider suite', () => {
  it('should render a Content subnav by default', () => {
    expect(shallow(<SubNavProvider />).find('ContentSubNav')).toHaveLength(1);
    expect(shallow(<SubNavProvider subNavType="test" />).find('ContentSubNav')).toHaveLength(1);
    expect(shallow(<SubNavProvider subNavType={subNavTypes.CONTENT_SUBNAV} />).find('ContentSubNav')).toHaveLength(1);
  });

  it('should render a Section subnav', () => {
    expect(shallow(<SubNavProvider subNavType={subNavTypes.SECTION_SUBNAV} />).find('ContentSubNav')).toHaveLength(0);
  });
});
