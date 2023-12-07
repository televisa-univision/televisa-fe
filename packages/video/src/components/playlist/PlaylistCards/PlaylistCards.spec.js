import React from 'react';
import { shallow, mount } from 'enzyme';

import {
  DARK_VARIANT,
} from '@univision/fe-utilities/styled/constants';

import contentsMock from './__mocks__/contentsMock.json';
import PlaylistCards from '.';

let props;

jest.mock('@univision/fe-commons/dist/utils/hooks/useVideoPlaylist', () => ({
  __esModule: true,
  default: () => ({ loading: true, videos: [{ mcpid: 123 }] }),
}));

describe('PlaylistCards test', () => {
  beforeEach(() => {
    props = {
      contents: contentsMock,
      onClick: jest.fn(),
      activeIndex: 1,
      infiniteScroll: true,
    };
    jest.resetAllMocks();
  });

  it('should render as expected', () => {
    const wrapper = shallow(<PlaylistCards {...props} />);

    expect(wrapper.find('PlaylistCards__PlaylistOuterStyled')).toHaveLength(1);
    expect(wrapper.find('PlaylistCards__PlaylistCardStyled')).toHaveLength(props.contents.length);
  });

  it('should render PlaylistPlaceholder if no items are available', () => {
    props.contents = [];
    const wrapper = shallow(<PlaylistCards {...props} />);

    expect(wrapper.find('PlaylistPlaceholder')).toHaveLength(1);
    expect(wrapper.find('PlaylistCards__PlaylistCardStyled')).toHaveLength(0);
  });

  it('should render PlaylistPlaceholder if have loading prop', () => {
    const wrapper = shallow(<PlaylistCards {...props} loading />);

    expect(wrapper.find('PlaylistPlaceholder')).toHaveLength(1);
    expect(wrapper.find('PlaylistCards__PlaylistCardStyled')).toHaveLength(8);
  });

  it('should set active prop item', () => {
    props.activeIndex = 3;
    props.infiniteLimit = 5;
    const wrapper = shallow(<PlaylistCards {...props} />);
    const activeCard = wrapper.findWhere(node => node.prop('isActiveItem'));

    expect(wrapper.find('PlaylistPlaceholder')).toHaveLength(0);
    expect(activeCard).toHaveLength(1);
    expect(wrapper.find('PlaylistCards__PlaylistCardStyled').at(3).prop('isActiveItem')).toBe(true);
  });

  it('should set playlist inner node ref to cards', () => {
    const nodeCurrent = document.createElement('div');
    const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: nodeCurrent });
    const wrapper = shallow(<PlaylistCards {...props} />);
    expect(wrapper.find('PlaylistCards__PlaylistCardStyled')).toBeDefined();
    useRefSpy.mockRestore();
  });

  it('should set layout vertical on mobile by default', () => {
    const wrapper = shallow(<PlaylistCards {...props} />);

    expect(wrapper.find('PlaylistCards__PlaylistCardStyled').at(0).prop('layout')).toBe('vertical');
  });

  it('should set layout vertical when playlist below player', () => {
    const wrapper = shallow(<PlaylistCards {...props} playlistBelowPlayer />);
    expect(wrapper.find('PlaylistCards__PlaylistCardStyled').at(0).prop('layout')).toBe('vertical');
  });

  it('should override layout if passed as prop', () => {
    delete props.contents[0].uid;
    const wrapper = shallow(<PlaylistCards {...props} layout="horizontal" />);
    expect(wrapper.find('PlaylistCards__PlaylistCardStyled').at(0).prop('layout')).toBe('horizontal');
  });

  it('should set layout horizontal on desktop', () => {
    const wrapper = shallow(<PlaylistCards {...props} device="desktop" />);
    expect(wrapper.find('PlaylistCards__PlaylistCardStyled').at(0).prop('layout')).toBe('horizontal');
  });

  it('should render dark variant', () => {
    const darkBg = 'linear-gradient(90deg,rgba(0,0,0,0) 0%,#000000 100%)';
    const wrapper = shallow(<PlaylistCards {...props} variant={DARK_VARIANT} />);

    expect(wrapper.find('PlaylistCards__PlaylistOuterStyled')).toHaveStyleRule('background', darkBg, {
      modifier: ':after',
    });
  });

  it('should render correct number of cards', () => {
    props.infiniteScroll = false;
    const wrapper = mount(<PlaylistCards {...props} playlistBelowPlayer />);
    expect(wrapper.find('PlaylistCards__PlaylistCardStyled')).toHaveLength(8);
  });
});
