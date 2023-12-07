import React from 'react';
import { shallow } from 'enzyme';
import {
  RUBICON_FILE_URL,
} from '@univision/fe-commons/dist/constants/ads';
import Assets from '.';

describe('Assets', () => {
  it('should include main bundle and js dependencies.', () => {
    const assets = {
      javascript: 'main.js',
      jsDependencies: [
        'vendors.js',
        'icons.js',
      ],
    };
    const wrapper = shallow(<Assets assets={assets} />);
    expect(wrapper.find('script')).toHaveLength(6 + assets.jsDependencies.length);
  });

  it('should include main bundle.', () => {
    const assets = {
      javascript: 'main.js',
      jsDependencies: null,
    };
    const wrapper = shallow(<Assets assets={assets} />);
    expect(wrapper.find('script')).toHaveLength(6);
  });

  describe('Rubicon Script', () => {
    it('should load Rubicon PROD script', () => {
      const script = `[src="${RUBICON_FILE_URL}"]`;
      const wrapper = shallow(<Assets />);
      expect(wrapper.find(script)).toHaveLength(1);
    });
  });
});
