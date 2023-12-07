import React from 'react';
import { shallow } from 'enzyme';

import StationShare from '.';

/** @test {StationShare} */
describe('StationShare', () => {
  it('renders the StationShare', () => {
    const wrapper = shallow(<StationShare onClose={jest.fn()} />);
    expect(wrapper.find('StationPopup'));
  });

  it('handles close', () => {
    const onClose = jest.fn();
    const wrapper = shallow(<StationShare onClose={onClose} />);
    wrapper.instance().handleClose();
    expect(onClose).toHaveBeenCalledWith('stationShare');
  });

  it('should copy the text', () => {
    const wrapper = shallow(<StationShare onClose={jest.fn()} uri="test.jpg" />);
    document.execCommand = jest.fn();
    document.getSelection = jest.fn(() => ({
      addRange: jest.fn(),
      getRangeAt: jest.fn(() => true),
      rangeCount: 10,
      removeAllRanges: jest.fn(),
    }));
    wrapper.instance().handleCopy();
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('should call onShare', () => {
    const onShare = jest.fn();
    const event = {
      target: {},
    };
    const wrapper = shallow(<StationShare onClose={jest.fn()} uri="test.jpg" onShare={onShare} />);
    document.execCommand = jest.fn();
    document.getSelection = jest.fn(() => ({
      addRange: jest.fn(),
      getRangeAt: jest.fn(() => true),
      rangeCount: 10,
      removeAllRanges: jest.fn(),
    }));
    wrapper.instance().handleCopy(event);
    expect(onShare).toHaveBeenCalledWith(event);
  });

  it('should not remove all ranges on copy if no original range', () => {
    const wrapper = shallow(<StationShare onClose={jest.fn()} uri="test.jpg" />);
    const removeAllRanges = jest.fn();
    document.execCommand = jest.fn();
    document.getSelection = jest.fn(() => ({
      addRange: jest.fn(),
      getRangeAt: jest.fn(() => true),
      rangeCount: 0,
      removeAllRanges,
    }));
    wrapper.instance().handleCopy();
    expect(removeAllRanges).not.toHaveBeenCalled();
  });
});
