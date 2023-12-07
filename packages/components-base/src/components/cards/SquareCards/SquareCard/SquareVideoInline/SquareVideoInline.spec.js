import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';

import features from '@univision/fe-commons/dist/config/features';
import data from '../__mocks__/squareCard';
import SquareVideoInline from '.';

const store = configureStore();

describe('SquareVideoInline', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <SquareVideoInline />
      </Provider>,
      div
    );
  });
  it('renders correctly with valid props for large size', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareVideoInline
          {...data[6]}
          size={LARGE}
        />
      </Provider>
    );
    expect(wrapper.find('SquareVideoInline__VideoWrapper')).toHaveLength(1);
    expect(wrapper.find('VideoPlayerComponent')).toHaveLength(1);
    expect(wrapper.find('SquareVideoInline__VideoInlineCardTitle')).toHaveLength(1);
    expect(wrapper.find('SquareVideoInline__LinkStyled')).toHaveLength(1);
    expect(wrapper.find('SquareVideoInline__VideoWrapper').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareVideoInline__LinkStyled').prop('href')).toBe(
      'https://www.univision.com/noticias/edicion-digital/johnson-johnson-suspendera-la-venta-de-su-emblematico-talco-para-bebes-en-eeuu-video'
    );
    expect(wrapper.find('VideoPlayerComponent').prop('widgetData').mcpid).toBe('3862023');
    expect(wrapper.find('SquareVideoInline__VideoInlineCardTitle')).toHaveStyleRule('top', '68%');
  });
  it('renders correctly with valid props for medium size', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareVideoInline
          {...data[6]}
          size={MEDIUM}
        />
      </Provider>
    );
    expect(wrapper.find('SquareVideoInline__VideoWrapper')).toHaveLength(1);
    expect(wrapper.find('VideoPlayerComponent')).toHaveLength(1);
    expect(wrapper.find('SquareVideoInline__VideoInlineCardTitle')).toHaveLength(1);
    expect(wrapper.find('SquareVideoInline__LinkStyled')).toHaveLength(1);
    expect(wrapper.find('SquareVideoInline__VideoWrapper').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareVideoInline__VideoInlineCardTitle')).toHaveStyleRule('top', '71%');
  });
  it('renders correctly with valid props for small size', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareVideoInline
          {...data[6]}
          size={SMALL}
        />
      </Provider>
    );
    expect(wrapper.find('SquareVideoInline__VideoWrapper')).toHaveLength(1);
    expect(wrapper.find('VideoPlayerComponent')).toHaveLength(1);
    expect(wrapper.find('SquareVideoInline__VideoInlineCardTitle')).toHaveLength(1);
    expect(wrapper.find('SquareVideoInline__LinkStyled')).toHaveLength(1);
    expect(wrapper.find('SquareVideoInline__VideoWrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareVideoInline__VideoInlineCardTitle')).toHaveStyleRule('top', '69%');
    expect(wrapper.find('SquareVideoInline__VideoInlineCardTitle')).toHaveStyleRule('color', '#000000');
  });
  it('should update video title and link', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareVideoInline
          {...data[6]}
          size={MEDIUM}
          isDark
        />
      </Provider>
    );
    wrapper
      .find(VideoPlayer)
      .props()
      .onPlaylistItemChange({ link: 'https://test', title: 'Video 2' });
    wrapper.update();

    expect(wrapper.find('Link').last().props().href).toEqual('https://test');
    expect(wrapper.find('Link').last().props().children).toEqual('Video 2');
    expect(wrapper.find('SquareVideoInline__VideoInlineCardTitle')).toHaveStyleRule('color', '#ffffff');
  });

  it('should have isWorldCupMVP', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <Provider store={store}>
        <SquareVideoInline
          {...data[6]}
          size={LARGE}
        />
      </Provider>
    );
    expect(wrapper.find('SquareVideoInline__VideoInlineCardTitle').prop('isWorldCupMVP')).toBe(true);
  });
});
