import React from 'react';
import { shallow } from 'enzyme';
import {
  RUBICON_FILE_URL,
} from '@univision/fe-commons/dist/constants/ads';
import features from '@univision/fe-commons/dist/config/features';
import Scripts from '.';

/**
 * @test {Scripts}
 */
describe('Scripts test', () => {
  it('should include js scripts', () => {
    const wrapper = shallow(<Scripts />);
    expect(wrapper.find('script')).toHaveLength(5);
  });

  it('should exclude ads scripts', () => {
    const wrapper = shallow(<Scripts disableAds />);
    expect(wrapper.find('script')).toHaveLength(2);
  });

  describe('Rubicon Script', () => {
    it('should load Rubicon script', () => {
      const script = `[src="${RUBICON_FILE_URL}"]`;
      const wrapper = shallow(<Scripts />);
      expect(wrapper.find(script)).toHaveLength(1);
    });
  });

  describe('JWP Script', () => {
    it('should load JWP default script', () => {
      const script = '[src="https://ssl.p.jwpcdn.com/player/v/8.24.6/jwplayer.js"]';
      const config = { deploy: { env: 'production' } };
      const wrapper = shallow(<Scripts config={config} />);
      expect(wrapper.find(script)).toHaveLength(1);
    });

    it('should load JWP video 360 script', () => {
      const script = '[src="https://ssl.p.jwpcdn.com/player/v/8.16.3/jwplayer.js"]';
      const config = { deploy: { env: 'production' } };
      features.video.JWPVersion = jest.fn(() => '8.16.3');
      const wrapper = shallow(<Scripts config={config} />);
      expect(wrapper.find(script)).toHaveLength(1);
    });
  });
});
