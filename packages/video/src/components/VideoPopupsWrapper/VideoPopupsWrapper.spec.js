import React from 'react';
import { mount, shallow } from 'enzyme';
import VideoPopupsWrapper from '.';

describe('VideoPopupsWrapper component', () => {
  beforeEach(() => {
    global.window ??= Object.create(window);
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render VideoPopupsWrapper', () => {
    const wrapper = mount(<VideoPopupsWrapper />);
    expect(wrapper.find('VideoPopupsWrapper')).toHaveLength(1);
  });
  it('should return no VideoPopupsWrapper if no valid window', () => {
    delete global.window;
    const wrapper = shallow(<VideoPopupsWrapper />);
    expect(wrapper.find('VideoPopupsWrapper')).toHaveLength(0);
  });
});
