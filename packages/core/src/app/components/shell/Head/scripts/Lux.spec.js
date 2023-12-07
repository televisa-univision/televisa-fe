import React from 'react';
import { shallow } from 'enzyme';

import Features from '@univision/fe-commons/dist/config/features';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';

import Lux from './Lux';

storeHelpers.isVerticalHome = jest.fn();
storeHelpers.getContentType = jest.fn();

describe('Lux', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render null if the feature tracking lux is not enabled', () => {
    Features.tracking.lux = false;
    expect(shallow(<Lux />).type()).toBe(null);
  });

  it('should render the script if the feature tracking lux is enabled with vertical title', () => {
    Features.tracking.lux = true;
    storeHelpers.isVerticalHome.mockReturnValueOnce(true);
    expect(shallow(<Lux />).find('script')).toHaveLength(2);
  });

  it('should render the script if the feature tracking lux is enabled without vertical title', () => {
    Features.tracking.lux = true;
    storeHelpers.isVerticalHome.mockReturnValueOnce(false);
    storeHelpers.getContentType.mockResolvedValueOnce('section');
    expect(shallow(<Lux />).find('script')).toHaveLength(2);
  });
});
