import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import ResourceHints from '.';

/**
 * @test {ResourceHints}
 */
describe('Resource Hints test', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ResourceHints />, div);
  });

  it('should render dns-prefetch hint', () => {
    const wrapper = shallow(<ResourceHints />);

    expect(wrapper.find('link').length).toBeGreaterThan(10);
    expect(wrapper.find('link[rel="dns-prefetch"]').first().props()).toEqual(expect.objectContaining({
      href: 'https://www.googletagservices.com',
      rel: 'dns-prefetch',
    }));
  });

  it('should render preconnect hint', () => {
    const wrapper = shallow(<ResourceHints />);

    expect(wrapper.find('link').length).toBeGreaterThan(10);
    expect(wrapper.find('link[rel="preconnect"]').first().props()).toEqual(expect.objectContaining({
      crossOrigin: 'true',
      href: 'https://www.googletagservices.com',
      rel: 'preconnect',
    }));
  });
});
