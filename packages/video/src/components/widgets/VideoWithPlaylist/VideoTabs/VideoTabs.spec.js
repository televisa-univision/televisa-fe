import React from 'react';
import { shallow, mount } from 'enzyme';

import {
  TROPICAL_RAIN_FOREST,
  DARK_VARIANT,
} from '@univision/fe-utilities/styled/constants';

import videoWithTabsMock from '../__mocks__/videoWithTabs.json';
import VideoTabs from '.';

const mockEvent = {
  preventDefault: jest.fn(),
  nativeEvent: {},
};
const theme = {
  primary: TROPICAL_RAIN_FOREST,
};
let props;

describe('VideoTabs test', () => {
  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      theme,
      ...videoWithTabsMock.settings,
    };
  });

  it('should renders as expected', () => {
    const wrapper = shallow(
      <VideoTabs {...props} />
    );

    expect(wrapper.find('VideoTabs__WrapperStyled')).toHaveLength(1);
    expect(wrapper.find('VideoTabs__ButtonStyled')).toHaveLength(2);
  });

  it('should renders only valid tabs', () => {
    const wrapper = shallow(
      <VideoTabs {...props} otherTabs={[null]} />
    );

    expect(wrapper.find('VideoTabs__WrapperStyled')).toHaveLength(1);
    expect(wrapper.find('VideoTabs__ButtonStyled')).toHaveLength(1);
  });

  it('should renders active tab style', () => {
    const wrapper = mount(
      <VideoTabs {...props} activeTab={1} />
    );
    const tabFirst = wrapper.find('VideoTabs__ButtonStyled').at(0);
    const tabSecond = wrapper.find('VideoTabs__ButtonStyled').at(1);

    expect(tabFirst).toHaveStyleRule('color', '#808080');
    expect(tabFirst).toHaveStyleRule('border-bottom', '4px solid #F5F5F5');
    expect(tabSecond).toHaveStyleRule('color', '#333333');
    expect(tabSecond).toHaveStyleRule('border-bottom', '4px solid #007350');
  });

  it('should renders light variant by default', () => {
    const wrapper = mount(
      <VideoTabs {...props} />
    );
    const tab = wrapper.find('VideoTabs__ButtonStyled').at(0);

    expect(tab).toHaveStyleRule('color', '#808080');
    expect(tab).toHaveStyleRule('background-color', '#F5F5F5');
  });

  it('should renders dark variant', () => {
    const wrapper = mount(
      <VideoTabs {...props} variant={DARK_VARIANT} />
    );
    const tab = wrapper.find('VideoTabs__ButtonStyled').at(0);

    expect(tab).toHaveStyleRule('color', '#ffffff');
    expect(tab).toHaveStyleRule('background-color', '#181818');
  });

  it('should return callback index on click', () => {
    const wrapper = shallow(
      <VideoTabs {...props} />
    );
    const tabWrapper = wrapper.find('VideoTabs__TabWrappperStyled').at(1);
    const currentTarget = {
      parentNode: {
        getAttribute: jest.fn(() => tabWrapper.prop('data-tab')),
      },
    };

    tabWrapper.children().simulate('click', {
      ...mockEvent,
      currentTarget,
    });

    expect(props.onClick).toHaveBeenCalledWith(mockEvent.nativeEvent, 1);
  });

  it('should return first tab by default on click', () => {
    const wrapper = shallow(
      <VideoTabs {...props} />
    );
    const tabWrapper = wrapper.find('VideoTabs__TabWrappperStyled').at(0);

    tabWrapper.children().simulate('click', mockEvent);

    expect(props.onClick).toHaveBeenCalledWith(mockEvent.nativeEvent, 0);
  });

  it('should return fire on click if is not a valid function', () => {
    const wrapper = shallow(
      <VideoTabs {...props} onClick={null} />
    );
    const tabWrapper = wrapper.find('VideoTabs__TabWrappperStyled').at(0);

    tabWrapper.children().simulate('click', mockEvent);

    expect(props.onClick).not.toHaveBeenCalled();
  });
});
