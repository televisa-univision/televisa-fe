import React from 'react';
import { shallow } from 'enzyme';

describe('HeadHelmet test', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should render with helmet components by default', () => {
    const HeadHelmet = jest.requireActual('.').default;
    const wrapper = shallow(<HeadHelmet><meta title="test" /></HeadHelmet>);

    expect(wrapper.find('HelmetWrapper')).toHaveLength(1);
    expect(wrapper.find('meta')).toHaveLength(1);
  });

  it('should render with next/head for webapp v2', () => {
    process.env.APP_VERSION = '2';
    const HeadHelmet = jest.requireActual('.').default;
    const wrapper = shallow(<HeadHelmet><meta title="test" /></HeadHelmet>);

    expect(wrapper.find('Head')).toHaveLength(1);
    expect(wrapper.find('meta')).toHaveLength(1);
  });
});
