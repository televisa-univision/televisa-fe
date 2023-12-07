import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import {
  ARTICLE,
  SLIDESHOW,
  VIDEO,
  SOCCER_MATCH,
  LIVE_STREAM,
} from '@univision/fe-commons/dist/constants/contentTypes';
import {
  ADVERTISING,
} from '@univision/shared-components/dist/constants/labelTypes';
import features from '@univision/fe-commons/dist/config/features';
import SquareTitle from '.';

const props = {
  title: 'Title',
  uri: 'url',
};
describe('SquareTitle', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <SquareTitle />,
      div
    );
  });
  it('should render correctly with props for large article card', () => {
    const wrapper = mount(
      <SquareTitle
        size={LARGE}
        type={ARTICLE}
        {...props}
      />
    );
    expect(wrapper.find('SquareTitle__TitleWrapper').prop('size')).toBe(LARGE);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').prop('href')).toBe('url');
  });
  it('should render correctly with props for medium article card', () => {
    const wrapper = mount(
      <SquareTitle
        size={MEDIUM}
        type={ARTICLE}
        {...props}
      />
    );
    expect(wrapper.find('SquareTitle__TitleWrapper').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').prop('href')).toBe('url');
  });
  it('should render correctly with props for small article card', () => {
    const wrapper = mount(
      <SquareTitle
        size={SMALL}
        type={ARTICLE}
        {...props}
      />
    );
    expect(wrapper.find('SquareTitle__TitleWrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').prop('href')).toBe('url');
  });
  it('should render correctly with props for medium advertising card', () => {
    const wrapper = mount(
      <SquareTitle
        size={MEDIUM}
        type={ADVERTISING}
        {...props}
        isDark
      />
    );
    expect(wrapper.find('SquareTitle__TitleWrapper').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').prop('href')).toBe('url');
  });
  it('should render correctly with props for small advertising card', () => {
    const wrapper = mount(
      <SquareTitle
        size={SMALL}
        type={ADVERTISING}
        {...props}
      />
    );
    expect(wrapper.find('SquareTitle__TitleWrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').prop('href')).toBe('url');
  });
  it('should render correctly with props for large slideshow card', () => {
    const wrapper = mount(
      <SquareTitle
        size={LARGE}
        type={SLIDESHOW}
        {...props}
      />
    );
    expect(wrapper.find('SquareTitle__TitleWrapper').prop('size')).toBe(LARGE);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').prop('href')).toBe('url');
  });
  it('should render correctly with props for medium slideshow card', () => {
    const wrapper = mount(
      <SquareTitle
        size={MEDIUM}
        type={SLIDESHOW}
        {...props}
      />
    );
    expect(wrapper.find('SquareTitle__TitleWrapper').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').prop('href')).toBe('url');
  });
  it('should render correctly with props for small slideshow card', () => {
    const wrapper = mount(
      <SquareTitle
        size={SMALL}
        type={SLIDESHOW}
        {...props}
      />
    );
    expect(wrapper.find('SquareTitle__TitleWrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').prop('href')).toBe('url');
  });
  it('should render correctly with props for large video card', () => {
    const wrapper = mount(
      <SquareTitle
        size={LARGE}
        type={VIDEO}
        {...props}
      />
    );
    expect(wrapper.find('SquareTitle__TitleWrapper').prop('size')).toBe(LARGE);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').prop('href')).toBe('url');
  });
  it('should render correctly with props for medium video card', () => {
    const wrapper = mount(
      <SquareTitle
        size={MEDIUM}
        type={VIDEO}
        {...props}
      />
    );
    expect(wrapper.find('SquareTitle__TitleWrapper').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').prop('href')).toBe('url');
  });
  it('should render correctly with props for small video card', () => {
    const wrapper = mount(
      <SquareTitle
        size={SMALL}
        type={VIDEO}
        {...props}
      />
    );
    expect(wrapper.find('SquareTitle__TitleWrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').prop('href')).toBe('url');
  });
  it('should render correctly with props for large soccer match card', () => {
    const wrapper = mount(
      <SquareTitle
        size={LARGE}
        type={SOCCER_MATCH}
        {...props}
      />
    );
    expect(wrapper.find('SquareTitle__TitleWrapper').prop('size')).toBe(LARGE);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').prop('href')).toBe('url');
  });
  it('should render correctly with props for large live stream card', () => {
    const wrapper = mount(
      <SquareTitle
        size={LARGE}
        type={LIVE_STREAM}
        showBadge
        {...props}
      />
    );
    expect(wrapper.find('SquareTitle__TitleWrapper').prop('size')).toBe(LARGE);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').prop('href')).toBe('url');
  });
  it('should have isWorldCupMVP', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <SquareTitle
        size={LARGE}
        type={SOCCER_MATCH}
        {...props}
      />
    );
    expect(wrapper.find('SquareTitle__TitleStyled').prop('isWorldCupMVP')).toBe(true);
  });
});
