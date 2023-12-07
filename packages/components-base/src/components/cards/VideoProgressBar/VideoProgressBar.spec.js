import React from 'react';
import { shallow } from 'enzyme';

import LocalStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';

import VideoProgressBar from '.';

describe('VideoProgressBar', () => {
  it('should render a null component by default', () => {
    const wrapper = shallow(<VideoProgressBar />);
    expect(wrapper.find('ProgressBar')).toHaveLength(0);
  });
  it('should render a null component if mcpid doesn\'t exists in the videoHistory object', () => {
    const wrapper = shallow(<VideoProgressBar mcpid="0" />);
    expect(wrapper.find('ProgressBar')).toHaveLength(0);
  });
  it('should render a ProgressBar if mcpid exists in the videoHistory object', () => {
    LocalStorage.setMultiObject('videoHistory', '123', {
      currentTime: 25,
      duration: 100,
    });
    const wrapper = shallow(<VideoProgressBar mcpid="123" />);
    expect(wrapper.find('ProgressBar')).toHaveLength(1);
  });
  it('should render a ProgressBar if mcpid exists in the videoHistory object with custom props', () => {
    LocalStorage.setMultiObject('videoHistory', '123', {
      currentTime: 25,
      duration: 100,
    });
    const wrapper = shallow(<VideoProgressBar mcpid="123" className="test" trailColor="#000" strokeColor="#FFF" />);
    expect(wrapper.find('ProgressBar')).toHaveLength(1);
  });
});
