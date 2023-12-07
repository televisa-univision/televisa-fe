import React from 'react';
import { shallow } from 'enzyme';

import { getRequestParams } from '@univision/fe-commons/dist/store/storeHelpers';
import Features from '@univision/fe-commons/dist/config/features';
import Yotta from './Yotta';

jest.mock('@univision/fe-commons/dist/store/storeHelpers', () => ({
  getRequestParams: jest.fn(() => ({
    yottaa: 'enabled'
  }))
}));

describe('Yotta', () => {
  it('should render null if the feature is not enabled', () => {
    Features.env = jest.fn();
    expect(shallow(<Yotta />).type()).toBe(null);
  });

  it('should render the script if the feature is enabled', () => {
    Features.env = () => ({ yotta: 'test' });
    expect(shallow(<Yotta />).find('script')).toHaveLength(2);
  });

  it('should render the script if the feature is enabled and there is no url param override', () => {
    Features.env = () => ({ yotta: 'test' });
    expect(shallow(<Yotta />).find('script')).toHaveLength(2);
  });

  it('should render null if there is a url param override', () => {
    getRequestParams.mockReturnValueOnce({ yottaa: 'disabled' });
    Features.env = () => ({ yotta: 'test' });
    expect(shallow(<Yotta />).type()).toBe(null);
  });
});
