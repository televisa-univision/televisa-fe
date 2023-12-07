import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import ResourceHint from './ResourceHint';
import hintsUtils from './utils';

const props = {
  rel: 'dns-prefetch',
  href: 'https://webapp.univision.com/asses/main.js',
  as: 'script'
};

/** @test {ResourceHint} */
describe('Resource Hints Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    console.error = jest.fn(); // eslint-disable-line no-console
    ReactDOM.render(<ResourceHint {...props} />, div);
  });

  it('should render dns-prefetch hint', () => {
    const wrapper = shallow(<ResourceHint {...props} />);
    expect(wrapper.find('link').length).toBe(1);
    expect(wrapper.find('link').prop('rel')).toBe(props.rel);
    expect(wrapper.find('link').prop('href')).toBe(props.href);
    expect(wrapper.find('link').prop('as')).toBeUndefined();
  });

  it('should render preload hint', () => {
    props.rel = 'preload';
    const wrapper = shallow(<ResourceHint {...props} />);
    expect(wrapper.find('link').length).toBe(1);
    expect(wrapper.find('link').prop('rel')).toBe(props.rel);
    expect(wrapper.find('link').prop('href')).toBe(props.href);
    expect(wrapper.find('link').prop('as')).toBe('script');
    expect(wrapper.find('link').prop('crossOrigin')).toBe('true');
  });

  it('should render preload hint', () => {
    props.rel = 'preload';
    const wrapper = shallow(<ResourceHint {...props} />);
    expect(wrapper.find('link').length).toBe(1);
    expect(wrapper.find('link').prop('rel')).toBe(props.rel);
    expect(wrapper.find('link').prop('href')).toBe(props.href);
    expect(wrapper.find('link').prop('as')).toBe('script');
    expect(wrapper.find('link').prop('crossOrigin')).toBe('true');
  });

  it('should render preconnect hint', () => {
    props.rel = 'preconnect';
    const wrapper = shallow(<ResourceHint {...props} />);
    expect(wrapper.find('link').length).toBe(1);
    expect(wrapper.find('link').prop('rel')).toBe(props.rel);
    expect(wrapper.find('link').prop('href')).toBe(props.href);
    expect(wrapper.find('link').prop('as')).toBe('script');
    expect(wrapper.find('link').prop('crossOrigin')).toBe('true');
  });

  it('should render prefetch hint', () => {
    props.rel = 'prefetch';
    const wrapper = shallow(<ResourceHint {...props} />);
    expect(wrapper.find('link').length).toBe(1);
    expect(wrapper.find('link').prop('rel')).toBe(props.rel);
    expect(wrapper.find('link').prop('href')).toBe(props.href);
    expect(wrapper.find('link').prop('as')).toBeUndefined();
  });

  it('should render prerender hint', () => {
    props.rel = 'prerender';
    const wrapper = shallow(<ResourceHint {...props} />);
    expect(wrapper.find('link').length).toBe(1);
    expect(wrapper.find('link').prop('rel')).toBe(props.rel);
    expect(wrapper.find('link').prop('href')).toBe(props.href);
    expect(wrapper.find('link').prop('as')).toBeUndefined();
  });

  it('should render a default hint if rel is unknown', () => {
    props.rel = 'unknown hint';
    const wrapper = shallow(<ResourceHint {...props} />);
    expect(wrapper.find('link').length).toBe(1);
    expect(wrapper.find('link').prop('rel')).toBe(props.rel);
    expect(wrapper.find('link').prop('href')).toBe(props.href);
    expect(wrapper.find('link').prop('as')).toBeUndefined();
  });
});

describe('Resource Hints Utils', () => {
  it('should return null if no hints are passed', () => {
    const hints = hintsUtils.get([]);
    expect(hints).toBe(null);
  });
});
