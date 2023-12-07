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
  SLIDESHOW, VIDEO,
} from '@univision/fe-commons/dist/constants/contentTypes';
import {
  ADVERTISING,
} from '@univision/shared-components/dist/constants/labelTypes';
import { VIDEO_INLINE_TYPE } from '../../../../constants';
import SquareBadge from '.';

const props = {
  labelProps: {
    text: 'Label',
    type: 'default',
    href: 'url',
  },
};
describe('SquareBadge', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <SquareBadge />,
      div
    );
  });
  it('should render correctly with props for large article card', () => {
    const wrapper = mount(
      <SquareBadge
        size={LARGE}
        type={ARTICLE}
        {...props}
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(ARTICLE);
    expect(wrapper.find('SquareBadge__Badge')).toHaveStyleRule('left', '16px');
  });
  it('should render correctly with props for medium article card', () => {
    const wrapper = mount(
      <SquareBadge
        size={MEDIUM}
        type={ARTICLE}
        {...props}
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(ARTICLE);
    expect(wrapper.find('SquareBadge__Badge')).toHaveStyleRule('left', '16px');
  });
  it('should render correctly with props for small article card', () => {
    const wrapper = mount(
      <SquareBadge
        size={SMALL}
        type={ARTICLE}
        {...props}
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(ARTICLE);
    expect(wrapper.find('SquareBadge__Badge')).toHaveStyleRule('left', '8px');
  });
  it('should render correctly with props for large slideshow card', () => {
    const wrapper = mount(
      <SquareBadge
        size={LARGE}
        type={SLIDESHOW}
        {...props}
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(SLIDESHOW);
    expect(wrapper.find('SquareBadge__Badge')).toHaveStyleRule('left', '16px');
  });
  it('should render correctly with props for medium slideshow card', () => {
    const wrapper = mount(
      <SquareBadge
        size={MEDIUM}
        type={SLIDESHOW}
        {...props}
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(SLIDESHOW);
    expect(wrapper.find('SquareBadge__Badge')).toHaveStyleRule('left', '16px');
  });
  it('should render correctly with props for small slideshow card', () => {
    const wrapper = mount(
      <SquareBadge
        size={SMALL}
        type={SLIDESHOW}
        {...props}
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(SLIDESHOW);
    expect(wrapper.find('SquareBadge__Badge')).toHaveStyleRule('left', '8px');
  });
  it('should render correctly with props for large advertising card', () => {
    const wrapper = mount(
      <SquareBadge
        size={LARGE}
        type={ADVERTISING}
        {...props}
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(ADVERTISING);
    expect(wrapper.find('SquareBadge__Badge')).toHaveStyleRule('left', '16px');
  });
  it('should render correctly with props for medium advertising card', () => {
    const wrapper = mount(
      <SquareBadge
        size={MEDIUM}
        type={ADVERTISING}
        {...props}
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(ADVERTISING);
    expect(wrapper.find('SquareBadge__Badge')).toHaveStyleRule('left', '16px');
  });
  it('should render correctly with props for small advertising card', () => {
    const wrapper = mount(
      <SquareBadge
        size={SMALL}
        type={ADVERTISING}
        {...props}
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(ADVERTISING);
    expect(wrapper.find('SquareBadge__Badge')).toHaveStyleRule('left', '8px');
  });
  it('should render correctly with props for large video card', () => {
    const wrapper = mount(
      <SquareBadge
        size={LARGE}
        type={VIDEO}
        {...props}
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(VIDEO);
  });
  it('should render correctly with props for medium video card', () => {
    const wrapper = mount(
      <SquareBadge
        size={MEDIUM}
        type={VIDEO}
        {...props}
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(VIDEO);
  });
  it('should render correctly with props for small video card', () => {
    const wrapper = mount(
      <SquareBadge
        size={SMALL}
        type={VIDEO}
        {...props}
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(VIDEO);
  });
  it('should render correctly with props for large inline video card', () => {
    const wrapper = mount(
      <SquareBadge
        size={LARGE}
        type={VIDEO_INLINE_TYPE}
        {...props}
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(LARGE);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(VIDEO_INLINE_TYPE);
  });
  it('should render correctly with props for medium inline video card', () => {
    const wrapper = mount(
      <SquareBadge
        size={MEDIUM}
        type={VIDEO_INLINE_TYPE}
        {...props}
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(VIDEO_INLINE_TYPE);
  });
  it('should render correctly with props for small inline video card', () => {
    const wrapper = mount(
      <SquareBadge
        size={SMALL}
        type={VIDEO_INLINE_TYPE}
        {...props}
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(VIDEO_INLINE_TYPE);
  });
  it('should render correctly with props flag mvp', () => {
    const wrapper = mount(
      <SquareBadge
        size={SMALL}
        type={VIDEO_INLINE_TYPE}
        {...props}
        isWorldCupMVP
      />
    );
    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('SquareBadge__Badge').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareBadge__Badge').prop('type')).toBe(VIDEO_INLINE_TYPE);
  });
});
