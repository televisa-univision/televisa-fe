import React from 'react';
import { shallow } from 'enzyme';
import PopupsProvider from '@univision/fe-components-base/dist/components/Popups/PopupsProvider';
import TudnMvpdWrapper from './index';

describe('TudnMvpdWrapper component', () => {
  it('should render TudnMpvdWRapper', () => {
    const mockWindow = {
      location: {
        href: '#',
      },
    };
    // Use jest.spyOn to mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);

    const wrapper = shallow(<TudnMvpdWrapper />);
    expect(wrapper.exists()).toBe(true);
  });
  it('should return no TudnMvpdWrapper if no valid window', () => {
    let mockWindow;

    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);

    const wrapper = shallow(<TudnMvpdWrapper />);

    expect(wrapper.find(PopupsProvider)).toHaveLength(0);
  });
});
