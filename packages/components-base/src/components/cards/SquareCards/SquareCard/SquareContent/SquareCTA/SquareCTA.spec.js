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
import { HOROSCOPE } from '@univision/fe-commons/dist/constants/pageCategories';
import SquareCTA from '.';

const props = {
  advertisementBrand: 'Coca-Cola',
  durationString: '2:00',
  isDark: false,
  readTime: 2,
  slideCount: 20,
  updateDate: '2020',
  uri: 'https://www.tudn.com',
};
describe('SquareCTA', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <SquareCTA />,
      div
    );
  });
  it('should render correctly with props for large article card', () => {
    const wrapper = mount(
      <SquareCTA
        size={LARGE}
        type={ARTICLE}
        {...props}
        isDark
      />
    );
    expect(wrapper.find('SquareCTA__PublishedWrapper').prop('size')).toBe(LARGE);
    expect(wrapper.find('Icon').length).toBe(1);
    expect(wrapper.find('Icon').first().prop('name')).toBe('articleCta');
  });
  it('should render correctly with props for medium article card', () => {
    const wrapper = mount(
      <SquareCTA
        size={MEDIUM}
        type={ARTICLE}
        {...props}
      />
    );
    expect(wrapper.find('SquareCTA__PublishedWrapper').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('Icon').length).toBe(1);
    expect(wrapper.find('Icon').first().prop('name')).toBe('articleCta');
  });
  it('should render correctly with props for small article card', () => {
    const wrapper = mount(
      <SquareCTA
        size={SMALL}
        type={ARTICLE}
        {...props}
      />
    );
    expect(wrapper.find('SquareCTA__PublishedWrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('Icon').length).toBe(1);
    expect(wrapper.find('Icon').first().prop('name')).toBe('articleCta');
  });
  it('should not render without readTime', () => {
    const modifiedProps = {
      ...props,
      size: SMALL,
      type: ARTICLE,
      readTime: null,
    };
    const wrapper = mount(<SquareCTA {...modifiedProps} />);
    expect(wrapper.find('SquareCTA__PublishedWrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('Icon').length).toBe(0);
  });
  it('should render correctly with props for small advertising card', () => {
    const wrapper = mount(
      <SquareCTA
        size={SMALL}
        type={ADVERTISING}
        {...props}
      />
    );
    expect(wrapper.find('SquareCTA__PublishedWrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('Icon').length).toBe(0);
    expect(wrapper.find('SquareCTA__PublishedWrapper').text()).toBe('Por: Coca-Cola');
  });
  it('should render correctly with props for small advertising card without advertisementBrand', () => {
    const wrapper = mount(
      <SquareCTA
        size={SMALL}
        type={ADVERTISING}
        {...props}
        advertisementBrand={null}
      />
    );
    expect(wrapper.find('SquareCTA__PublishedWrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('Icon').length).toBe(0);
    expect(wrapper.find('SquareCTA__PublishedWrapper').text()).toBe('Por: Publicidad');
  });
  it('should render correctly with props for large slideshow card', () => {
    const wrapper = mount(
      <SquareCTA
        size={LARGE}
        type={SLIDESHOW}
        {...props}
        isDark
      />
    );
    expect(wrapper.find('SquareCTA__PublishedWrapper').prop('size')).toBe(LARGE);
    expect(wrapper.find('Icon').length).toBe(1);
    expect(wrapper.find('Icon').first().prop('name')).toBe('slideshow');
  });
  it('should render correctly with props for large slideshow card', () => {
    const wrapper = mount(
      <SquareCTA
        size={MEDIUM}
        type={SLIDESHOW}
        {...props}
      />
    );
    expect(wrapper.find('SquareCTA__PublishedWrapper').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('Icon').length).toBe(1);
    expect(wrapper.find('Icon').first().prop('name')).toBe('slideshow');
  });
  it('should render correctly with props for large slideshow card', () => {
    const wrapper = mount(
      <SquareCTA
        size={SMALL}
        type={SLIDESHOW}
        {...props}
      />
    );
    expect(wrapper.find('SquareCTA__PublishedWrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('Icon').length).toBe(1);
    expect(wrapper.find('Icon').first().prop('name')).toBe('slideshow');
  });
  it('should render correctly with props for large video card', () => {
    const wrapper = mount(
      <SquareCTA
        size={LARGE}
        type={VIDEO}
        {...props}
        isDark
      />
    );
    expect(wrapper.find('SquareCTA__PublishedWrapper').prop('size')).toBe(LARGE);
    expect(wrapper.find('Icon').length).toBe(1);
    expect(wrapper.find('Icon').first().prop('name')).toBe('playnocircle');
  });
  it('should render correctly with props for medium video card', () => {
    const wrapper = mount(
      <SquareCTA
        size={MEDIUM}
        type={VIDEO}
        {...props}
      />
    );
    expect(wrapper.find('SquareCTA__PublishedWrapper').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('Icon').length).toBe(1);
    expect(wrapper.find('Icon').first().prop('name')).toBe('playnocircle');
  });
  it('should render correctly with props for small video card', () => {
    const wrapper = mount(
      <SquareCTA
        size={SMALL}
        type={VIDEO}
        {...props}
      />
    );
    expect(wrapper.find('SquareCTA__PublishedWrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('Icon').length).toBe(1);
    expect(wrapper.find('Icon').first().prop('name')).toBe('playnocircle');
  });
  it('should render small horoscope cta', () => {
    const authors = [{
      fullName: 'test',
    }];
    const wrapper = mount(
      <SquareCTA
        size={SMALL}
        type={HOROSCOPE}
        authors={authors}
        {...props}
      />
    );
    expect(wrapper.find('SquareCTA__PublishedWrapper').prop('size')).toBe(SMALL);
  });
  it('should render small horoscope cta', () => {
    const sponsor = {
      name: 'Verdadero',
      leadText: 'Verdadero',
      link: null,
      image: {
        type: 'image',
        uid: '00000174-5b75-dafd-adff-df758c320000',
        title: 'Untitled drawing (5).png',
        caption: null,
        credit: null,
        renditions: {
          original: {
            href: 'https://uvn-brightspot.s3.amazonaws.com/af/03/4e7dc77348828ba7951a63d6708d/untitled-drawing-5.png',
            width: 112,
            height: 99,
          },
        },
      },
    };
    const wrapper = mount(
      <SquareCTA
        size={SMALL}
        type={ARTICLE}
        sponsor={sponsor}
        {...props}
      />
    );
    expect(wrapper.find('SquareCTA__ContentSponsor')).toHaveLength(1);
  });
});
