import React from 'react';
import { shallow } from 'enzyme';

import ContentCard from '@univision/fe-components-base/dist/components/ContentCard';

import PlaylistContentCard from '.';

jest.mock('@univision/fe-components-base/dist/components/ContentCard', () => jest.fn());

let props;
beforeEach(() => {
  props = {
    content: { uri: '/1', uid: '1' },
    onClick: jest.fn(),
    activeIndex: 1,
    index: 2,
    view: 'horizontal',
  };
});

describe('PlaylistContentCard', () => {
  it('renders as expected', () => {
    props.variant = 'dark';
    const wrapper = shallow(<PlaylistContentCard {...props} />);
    expect(wrapper.find(ContentCard)).toHaveLength(1);
    expect(wrapper.find('WrapperStyled')).toBeDefined();
  });

  it('renders with short title', () => {
    props.useShortTitle = true;
    props.content.shortTitle = 'short title';
    const wrapper = shallow(<PlaylistContentCard {...props} />);
    expect(wrapper.find(ContentCard).prop('title')).toEqual(props.content.shortTitle);
  });

  it('renders with title', () => {
    props.content.title = 'title';
    const wrapper = shallow(<PlaylistContentCard {...props} />);
    expect(wrapper.find(ContentCard).prop('title')).toEqual(props.content.title);
  });

  it('passes correct index in onClick', () => {
    const wrapper = shallow(<PlaylistContentCard {...props} />);
    wrapper.find(ContentCard).prop('onClick')();
    expect(props.onClick).toBeCalledWith(props.index);
  });

  it('passes overlay as prop', () => {
    props.activeIndex = 2;
    const wrapper = shallow(<PlaylistContentCard {...props} />);
    expect(wrapper.find(ContentCard).prop('overlay')).not.toBe(false);
  });

  it('passes duration as prop', () => {
    props.content.duration = 30;
    const wrapper = shallow(<PlaylistContentCard {...props} />);
    expect(wrapper.find(ContentCard).prop('duration')).toBe('0:30');
  });

  it('handles object or string as image', () => {
    props.content.image = 'myimage.jpg';
    props.isCurrentItem = true;

    const wrapper = shallow(<PlaylistContentCard {...props} />);
    expect(wrapper.find(ContentCard).prop('image')).toBe('myimage.jpg');
  });

  it('handles object or string as image', () => {
    props.content.image = 'https://uvnimg.com/myimage.jpg';
    props.isCurrentItem = true;
    const wrapper = shallow(<PlaylistContentCard {...props} />);
    expect(wrapper.find(ContentCard).prop('image')).toEqual({ renditions: { original: { href: props.content.image } } });
    wrapper.setProps({
      content: {
        ...props.content,
        image: {
          foo: 'bar',
        },
      },
    });
    expect(wrapper.find(ContentCard).prop('image')).toEqual({ foo: 'bar' });
  });

  it('should remove uri if exist on content prop', () => {
    props.content.uri = 'test/uri';
    const wrapper = shallow(<PlaylistContentCard {...props} />);
    expect(wrapper.find(ContentCard).prop('uri')).toBe(null);
  });
});
