import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import {
  MEDIUM,
  LARGE, SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import data from '../__mocks__/squareCard.json';
import SquareLivestream from '.';

const store = configureStore();

describe('SquareLivestream', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <SquareLivestream />,
      div
    );
  });
  it('renders correctly with valid props for livestream video Large', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareLivestream
          {...data[7]}
          size={LARGE}
        />
      </Provider>
    );
    expect(wrapper.find('SquareLivestream')).toHaveLength(1);
    expect(wrapper.find('LiveStream')).toHaveLength(1);
    expect(wrapper.find('SquareLivestream').prop('size')).toBe(LARGE);
    expect(wrapper.find('LiveStream').prop('livestreamId')).toBe('201706141731');
  });
  it('renders correctly with valid props for livestream Medium', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareLivestream
          {...data[7]}
          size={MEDIUM}
        />
      </Provider>
    );
    expect(wrapper.find('SquareLivestream')).toHaveLength(1);
    expect(wrapper.find('LiveStream')).toHaveLength(1);
    expect(wrapper.find('SquareLivestream').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('LiveStream').prop('livestreamId')).toBe('201706141731');
  });
  it('renders correctly with valid props for livestream small', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareLivestream
          {...data[7]}
          size={SMALL}
        />
      </Provider>
    );
    expect(wrapper.find('SquareLivestream')).toHaveLength(1);
    expect(wrapper.find('LiveStream')).toHaveLength(1);
    expect(wrapper.find('SquareLivestream').prop('size')).toBe(SMALL);
    expect(wrapper.find('LiveStream').prop('livestreamId')).toBe('201706141731');
  });
  it('renders correctly with no active livestream', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareLivestream
          {...data[7]}
          size={SMALL}
          active={false}
          cardLabel="EN VIVO"
        />
      </Provider>
    );
    expect(wrapper.find('SquareLivestream')).toHaveLength(1);
    expect(wrapper.find('LiveStream')).toHaveLength(0);
    expect(wrapper.find('SquareLivestream__LivestreamImageLink')).toHaveLength(1);
    expect(wrapper.find('SquareLivestream__Filter')).toHaveLength(1);
  });
  it('renders correctly with livestream active but as secondary content', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareLivestream
          {...data[7]}
          size={SMALL}
          active
          cardLabel="EN VIVO"
          isSecondaryContent
        />
      </Provider>
    );
    expect(wrapper.find('SquareLivestream')).toHaveLength(1);
    expect(wrapper.find('LiveStream')).toHaveLength(0);
    expect(wrapper.find('SquareLivestream__LivestreamImageLink')).toHaveLength(1);
    expect(wrapper.find('SquareLivestream__Filter')).toHaveLength(1);
  });
});
