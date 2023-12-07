import React from 'react';
import { shallow } from 'enzyme';
import PopupsProvider from './PopupsProvider';

jest.useFakeTimers();

describe('PopupsProvider', () => {
  it('should register when mounted', (done) => {
    const wrapper = shallow(<PopupsProvider />);
    jest.runAllTimers();
    process.nextTick(() => {
      expect(wrapper.state('popupsReady')).toBe(true);
      done();
    });
  });

  it('should clear timeout on unmount', () => {
    spyOn(global, 'clearTimeout');
    const wrapper = shallow(<PopupsProvider />);
    wrapper.unmount();
    expect(global.clearTimeout).toHaveBeenCalled();
  });
});
