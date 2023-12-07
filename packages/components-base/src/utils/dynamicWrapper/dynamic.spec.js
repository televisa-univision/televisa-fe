import dynamic from 'next/dynamic';

import dynamicWrapper from '.';

jest.mock('react-loadable', () => jest.fn(() => {}));
jest.mock('next/dynamic', () => jest.fn((options) => {
  options.loadableGenerated.webpack();
}));

describe('dynamic', () => {
  const defaultOpt = {
    webpack: () => {},
  };
  it('should return same object by default', () => {
    process.env.APP_VERSION = '0';
    const newOptions = dynamicWrapper({ test: 'abc' });
    expect(newOptions.loading).toBeDefined();
  });
  it('should call dynamic if app version is 2', () => {
    process.env.APP_VERSION = '2';
    dynamicWrapper(defaultOpt);
    expect(dynamic).toHaveBeenCalled();
  });
});
