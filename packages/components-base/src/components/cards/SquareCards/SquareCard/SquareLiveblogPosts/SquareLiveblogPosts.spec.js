import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import {
  MEDIUM,
  LARGE, SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import features from '@univision/fe-commons/dist/config/features';

import data from '../__mocks__/squareCard.json';
import SquareLiveblogPosts from '.';

const RECENT_POSTS_MOCK = ['Test', 'Test2', 'Test3'];

describe('SquareLiveblog Posts', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <SquareLiveblogPosts />,
      div
    );
  });
  it('should render correctly for card size large', () => {
    const wrapper = mount(
      <SquareLiveblogPosts
        size={LARGE}
        {...data[1]}
      />
    );
    expect(wrapper.find('SquareLiveblogPosts').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__PostsWrapper').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__Posts').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__Post').length).toBe(3);
    expect(wrapper.find('SquareLiveblogPosts__Bullet').length).toBe(3);
    expect(wrapper.find('SquareLiveblogPosts__PostsOverlay').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareLiveblogPosts').prop('type')).toBe('liveblog');
  });
  it('should render correctly for card size medium', () => {
    const wrapper = mount(
      <SquareLiveblogPosts
        size={MEDIUM}
        {...data[1]}
      />
    );
    expect(wrapper.find('SquareLiveblogPosts').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__PostsWrapper').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__Posts').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__Post').length).toBe(2);
    expect(wrapper.find('SquareLiveblogPosts__Bullet').length).toBe(2);
    expect(wrapper.find('SquareLiveblogPosts__PostsOverlay').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareLiveblogPosts').prop('type')).toBe('liveblog');
  });
  it('should render correctly for card size small', () => {
    const wrapper = mount(
      <SquareLiveblogPosts
        size={SMALL}
        {...data[1]}
      />
    );
    expect(wrapper.find('SquareLiveblogPosts').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__PostsWrapper').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__Posts').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__Post').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__Bullet').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__PostsOverlay').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareLiveblogPosts').prop('type')).toBe('liveblog');
  });
  it('renders correctly with liveblog with titled only posts', () => {
    const props = {
      ...data[1],
      size: MEDIUM,
      recentTitledPosts: [],
      recentPostTitles: RECENT_POSTS_MOCK,
    };
    const wrapper = mount(
      <SquareLiveblogPosts
        {...props}
      />
    );
    expect(wrapper.find('SquareLiveblogPosts')).toHaveLength(1);
    expect(wrapper.find('SquareLiveblogPosts Link').first().prop('href')).toBe('');
    expect(wrapper.find('SquareLiveblogPosts Link span').first().text()).toBe('Test');
  });
  it('renders correctly with liveblog with empty posts', () => {
    const props = {
      ...data[1],
      size: MEDIUM,
      recentTitledPosts: [],
      recentPostTitles: ['', 'Test1'],
    };
    const wrapper = mount(
      <SquareLiveblogPosts
        {...props}
      />
    );
    expect(wrapper.find('SquareLiveblogPosts')).toHaveLength(1);
    expect(wrapper.find('SquareLiveblogPosts Link').first().prop('href')).toBe('');
    expect(wrapper.find('SquareLiveblogPosts Link span').first().text()).toBe('');
  });
  it('should render correctly with is dark prop', () => {
    const wrapper = mount(
      <SquareLiveblogPosts
        size={SMALL}
        isDark
        {...data[1]}
      />
    );
    expect(wrapper.find('SquareLiveblogPosts').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__PostsWrapper').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__Posts').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__Post').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__Bullet').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts__PostsOverlay').length).toBe(1);
    expect(wrapper.find('SquareLiveblogPosts').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareLiveblogPosts').prop('type')).toBe('liveblog');
    expect(wrapper.find('SquareLiveblogPosts').prop('isDark')).toBe(true);
  });
  it('should have isWorldCupMVP and dark', () => {
    const props = {
      ...data[1],
      recentPostTitles: RECENT_POSTS_MOCK,
      isDark: true,
    };
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <SquareLiveblogPosts
        {...props}
      />
    );
    expect(wrapper.find('SquareLiveblogPosts__Bullet').at(0).prop('isWorldCupMVP')).toBe(true);
  });
  it('should have isWorldCupMVP and dark false', () => {
    const props = {
      ...data[1],
      size: MEDIUM,
      recentTitledPosts: [],
      recentPostTitles: RECENT_POSTS_MOCK,
      isDark: false,
    };
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <SquareLiveblogPosts
        {...props}
      />
    );
    expect(wrapper.find('SquareLiveblogPosts__Bullet').at(0).prop('isWorldCupMVP')).toBe(true);
  });
});
