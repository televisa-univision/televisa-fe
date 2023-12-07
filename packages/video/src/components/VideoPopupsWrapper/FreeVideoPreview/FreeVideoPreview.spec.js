import React from 'react';
import { mount } from 'enzyme';
import * as utils from '@univision/fe-commons/dist/utils/video';
import { CLOSE_POPUP_TIME } from '@univision/fe-commons/dist/constants/video';
import FreeVideoPreview from '.';

describe('FreeVideoPreview Component', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render FreeVideoPreview correctly', () => {
    const wrapper = mount(<FreeVideoPreview />);
    expect(wrapper.find('FreeVideoPreview__MainWrapper')).toHaveLength(1);
  });

  it('should render FreeVideoPreview and call close function', () => {
    jest.useFakeTimers();
    const closeSpy = jest.fn();
    const wrapper = mount(<FreeVideoPreview close={closeSpy} />);
    expect(wrapper.find('FreeVideoPreview__MainWrapper')).toHaveLength(1);
    jest.runTimersToTime(CLOSE_POPUP_TIME);
    expect(closeSpy).toHaveBeenCalledTimes(1);

    // Clear the timeout
    wrapper.unmount();
    expect(window.clearTimeout).toHaveBeenCalled();
  });

  it('should call showMVPDModal on button click', () => {
    const closeSpy = jest.fn();
    utils.showMVPDModal = jest.fn();
    const wrapper = mount(<FreeVideoPreview close={closeSpy} />);
    expect(wrapper.find('FreeVideoPreview__MainWrapper')).toHaveLength(1);
    wrapper.find('Button').simulate('click');
    expect(utils.showMVPDModal).toHaveBeenCalled();
  });
});
