import React, { useRef } from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import features from '@univision/fe-commons/dist/config/features';

import contentMock from './__mocks__/contentMock.json';
import PlaylistCard from '.';

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  return {
    ...originReact,
    useRef: jest.fn(),
  };
});

const store = configureStore();

const mockEvent = {
  preventDefault: jest.fn(),
  nativeEvent: {},
};
let props;

helpers.scrollTo = jest.fn();

describe('PlaylistCard', () => {
  beforeEach(() => {
    props = {
      autoScroll: false,
      content: contentMock,
      contentIndex: 1,
      onClick: jest.fn(),
      isActiveItem: false,
      useShortTitle: false,
      widgetContext: { uid: '2', type: 'widget type' },
    };
  });

  it('should renders as expected', () => {
    const wrapper = shallow(<PlaylistCard {...props} />);
    expect(wrapper.find('PlaylistCard__ListCardStyled')).toHaveLength(1);
    expect(wrapper.find('PlaylistCard__ListCardStyled').prop('overlay')).toBeUndefined();
  });

  it('should renders with short title', () => {
    props.useShortTitle = true;
    props.content.shortTitle = 'short title';
    const wrapper = shallow(<PlaylistCard {...props} />);
    expect(wrapper.find('PlaylistCard__ListCardStyled').prop('title')).toEqual(props.content.shortTitle);
  });

  it('should renders with default title', () => {
    props.content.title = 'default title';
    const wrapper = shallow(<PlaylistCard {...props} />);
    expect(wrapper.find('PlaylistCard__ListCardStyled').prop('title')).toEqual(props.content.title);
  });

  it('should passes correct contentIndex in onClick', () => {
    const wrapper = shallow(<PlaylistCard {...props} />);
    wrapper.find('PlaylistCard__WrapperStyled').simulate('click', mockEvent);
    expect(props.onClick).toBeCalledWith(mockEvent.nativeEvent, props.contentIndex);
  });

  it('should not fire onClick if not have a valid function', () => {
    const wrapper = shallow(<PlaylistCard {...props} onClick={undefined} />);
    wrapper.find('PlaylistCard__WrapperStyled').simulate('click', mockEvent);
    expect(props.onClick).not.toBeCalled();
  });

  it('should passes overlay as prop if is an active item', () => {
    props.isActiveItem = true;
    const wrapper = shallow(<PlaylistCard {...props} />);
    const listCard = wrapper.find('PlaylistCard__ListCardStyled');

    expect(listCard.prop('overlay')).toBeDefined();
  });

  it('should passes durationString as prop', () => {
    props.content.durationString = '0:30';
    const wrapper = shallow(<PlaylistCard {...props} />);
    expect(wrapper.find('PlaylistCard__ListCardStyled').prop('durationString')).toBe('0:30');
  });

  it('should scroll to active item into parent playlist element', () => {
    const cardRef = { offsetTop: 30 };
    const nodePlaylistInner = document.createElement('div');

    useRef.mockReturnValue({ current: cardRef });

    props = {
      ...props,
      autoScroll: true,
      isActiveItem: true,
      playlistInnerRef: nodePlaylistInner,
    };
    shallow(<PlaylistCard {...props} />);

    expect(helpers.scrollTo).toHaveBeenCalledWith(nodePlaylistInner, 25, 400);
  });

  it('should scroll to active item into parent playlist with multtab', () => {
    const cardRef = { offsetTop: 30 };
    const nodePlaylistInner = document.createElement('div');

    useRef.mockReturnValue({ current: cardRef });

    props = {
      ...props,
      autoScroll: true,
      isActiveItem: true,
      isMultiTab: true,
      playlistInnerRef: nodePlaylistInner,
    };
    shallow(<PlaylistCard {...props} />);

    expect(helpers.scrollTo).toHaveBeenCalledWith(nodePlaylistInner, 25, 400);
  });

  it('should have isWorldCupMVP overlay', () => {
    props.isActiveItem = true;
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(<Provider store={store}><PlaylistCard {...props} /></Provider>);
    const overlayStyled = wrapper.find('PlaylistCard__OverlayStyled');

    expect(overlayStyled.prop('isWorldCupMVP')).toBe(true);
  });
});
