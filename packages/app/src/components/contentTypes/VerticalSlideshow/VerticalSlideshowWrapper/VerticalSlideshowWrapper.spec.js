/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import LazyLoad from 'react-lazyload';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import features from '@univision/fe-commons/dist/config/features';

import VerticalSlideshow from '.';
import Styles from './VerticalSlideshowWrapper.scss';

/* globals jsdom */

jest.mock('react-lazyload', () => jest.fn(c => c.children));
jest.mock('@univision/fe-components-base/dist/components/ShareBar', () => {
  const ShareBar = ({ onClick }) => <button type="button" onClick={onClick}>test</button>;

  return ShareBar;
});

/** @test {VerticalSlideshow} */
describe('VerticalSlideshowWrapper', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  /**
   * Get slide data by id
   * @param {string} id id
   * @returns {Function}
   */
  const getSlide = id => ({
    caption: 'test',
    content: {
      uid: `${id}123`,
      renditions: {
        original: { href: id },
      },
    },
  });

  const defaultSlide = [
    {
      caption: 'test',
      content: {
        uid: '123',
        credit: 'aaa',
        renditions: {
          original: { href: '123' },
        },
      },
    },
  ];

  const sharingOptions = {
    facebook: { url: 'http://uni.vi/s9sh100K6rz' },
    twitter: { url: 'http://uni.vi/s9sh100K6rz' },
    mail: { body: 'test content http://uni.vi/s9sh100K6rz' },
    whatsapp: { url: 'http://uni.vi/s9sh100K6rz' },
  };

  it('should render without crashing', () => {
    const div = document.createElement('div');
    const slide = getSlide('a');
    delete slide.caption;
    ReactDOM.render(
      <VerticalSlideshow
        sharingOptions={sharingOptions}
        slides={[slide]}
        primaryTag={{ name: 'foo' }}
      />,
      div,
    );
  });

  it('should not render ad after last slide', () => {
    const VCpmnt = (
      <VerticalSlideshow
        sharingOptions={sharingOptions}
        slides={[getSlide('a'), getSlide('b'), getSlide('c'), getSlide('d')]}
        primaryTag={{ name: 'foo' }}
      />
    );
    const wrapper = mount(VCpmnt);
    expect(
      wrapper
        .find('div.main')
        .childAt(3)
        .find(`div.${Styles.slide}`).length,
    ).toBe(1);
  });

  it('tracks ShareBar clicks', () => {
    jest.spyOn(SocialTracker, 'track');
    const wrapper = shallow(
      <VerticalSlideshow
        sharingOptions={sharingOptions}
        slides={[getSlide('a'), getSlide('b'), getSlide('c'), getSlide('d')]}
        primaryTag={{ name: 'foo' }}
      />,
    );
    const slide = wrapper.find('.main > div').first();
    slide.find('ShareBar').simulate('click', 'facebook');
    expect(SocialTracker.track).toBeCalled();
  });

  it('Caption should be with caption and credit', () => {
    const wrapper = shallow(
      <VerticalSlideshow sharingOptions={sharingOptions} slides={defaultSlide} primaryTag={{ name: 'foo' }} />,
    );
    const caption = wrapper.find('Caption');
    expect(caption).toBeDefined();
  });

  it('Should mount vertical slideshow with Televisa Style', () => {
    features.televisa.isTelevisaSite = jest.fn(() => true);
    const wrapper = shallow(
      <VerticalSlideshow sharingOptions={sharingOptions} slides={defaultSlide} primaryTag={{ name: 'foo' }} />,
    );
    const caption = wrapper.find('Caption');
    expect(caption).toBeDefined();
    features.televisa.isTelevisaSite = jest.fn(() => false);
  });

  it('Caption should hidden', () => {
    const slide = { ...getSlide(1), hideCaption: true };
    const wrapper = shallow(
      <VerticalSlideshow sharingOptions={sharingOptions} slides={[slide]} primaryTag={{ name: 'foo' }} />,
    );
    const caption = wrapper.find('Caption');
    expect(caption).toBeDefined();
  });

  it('should render the truncate when device is desktop and the image is vertical', () => {
    const verticalSlide = {
      caption: 'test',
      content: {
        uid: '123',
        credit: 'aaa',
        renditions: {
          original: {
            href: '123',
            width: 400,
            height: 800,
          },
        },
      },
    };
    const wrapper = shallow(
      <VerticalSlideshow device="desktop" sharingOptions={sharingOptions} slides={[verticalSlide]} primaryTag={{ name: 'foo' }} />,
    );
    const truncate = wrapper.find('Truncate');
    expect(truncate).toBeDefined();
  });

  it('should return the correct hash', () => {
    jsdom.reconfigure({
      url: 'https://www.univision.com#bbbb123',
    });

    const VCpmnt = (
      <VerticalSlideshow
        sharingOptions={sharingOptions}
        slides={[getSlide('aaaaa'), getSlide('bbbb'), getSlide('cccc'), getSlide('dddd')]}
        primaryTag={{ name: 'foo' }}
      />
    );
    mount(VCpmnt);
    expect(window.location.hash).toBe('#bbbb123');
  });

  it('should return undefined if slides does not have uid', () => {
    const VCpmnt = (
      <VerticalSlideshow
        sharingOptions={sharingOptions}
        slides={[
          {
            caption: 'test',
            content: {
              credit: 'aaa',
              renditions: {
                original: { href: '123' },
              },
            },
          },
        ]}
        primaryTag={{ name: 'foo' }}
      />
    );
    const wrapper = mount(VCpmnt);
    expect(
      wrapper
        .find('.main')
        .find('div')
        .first()
        .prop('id'),
    ).toBe(undefined);
  });

  it('should set proper size for lazyload height', () => {
    const wrapper = shallow(
      <VerticalSlideshow devie="desktop" sharingOptions={sharingOptions} slides={defaultSlide} primaryTag={{ name: 'foo' }} />,
    );

    expect(wrapper.find(LazyLoad).props().height).toBe(850);
  });

  it('should render only the slides with an associated image', () => {
    const slide = {
      content: { renditions: {} },
    };
    const wrapper = shallow(<VerticalSlideshow device="desktop" sharingOptions={sharingOptions} slides={[slide]} primaryTag={{ name: 'foo' }} />);
    expect(wrapper.find(LazyLoad).length).toBe(0);
  });

  it('should render default image when no content', () => {
    const slide = {
      image: {
        type: 'image',
        uid: '00000170-5acf-d639-a7fb-faefe29e0001',
        title: 'Untitled-3.jpg',
        caption: 'El American Airlines Arena de Miami fue la cita para el segundo día de ensayos de Premio Lo Nuestro donde Chiquis Rivera, Amandititita, Prince Royce, Zion, Willie Colón, Reykon, entre otros, dieron una probadita de lo que será su performance del próximo jueves 20 de febrero en la gran gala.',
        credit: 'Univision',
        renditions: {
          original: {
            href: 'https://uvn-brightspot.s3.amazonaws.com/bc/9a/7e56dc7b4548b1fd4c551342aee3/untitled-3.jpg',
            width: 1920,
            height: 1080,
            focusPoint: {
              x: 0.773469825164887,
              y: 0.34345573799047335,
            },
          },
          'slideshow-mobile-horizontal': {
            href: 'https://uat2.x.univision.com/dims4/default/f7faf5c/2147483647/resize/414x550%3E/quality/75/?url=http%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fbc%2F9a%2F7e56dc7b4548b1fd4c551342aee3%2Fresizes%2F1500%2Funtitled-3.jpg',
            width: 414,
            height: 550,
          },
          'slideshow-4x3-vertical': {
            href: 'https://uat2.x.univision.com/dims4/default/692553c/2147483647/resize/1093x820%3E/quality/75/?url=http%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fbc%2F9a%2F7e56dc7b4548b1fd4c551342aee3%2Fresizes%2F1500%2Funtitled-3.jpg',
            width: 1093,
            height: 820,
          },
          'horizontal-slideshow-loading': {
            href: 'https://uat2.x.univision.com/dims4/default/174ad80/2147483647/resize/150x50%3E/quality/75/?url=http%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fbc%2F9a%2F7e56dc7b4548b1fd4c551342aee3%2Fresizes%2F500%2Funtitled-3.jpg',
            width: 150,
            height: 50,
          },
          '16x9': {
            href: 'https://uat2.x.univision.com/dims4/default/1468e97/2147483647/crop/1499x844%2B0%2B0/resize/1240x698/quality/75/?url=http%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fbc%2F9a%2F7e56dc7b4548b1fd4c551342aee3%2Fresizes%2F1500%2Funtitled-3.jpg',
            width: 1240,
            height: 698,
          },
          '16x9-mobile': {
            href: 'https://uat2.x.univision.com/dims4/default/c0e216a/2147483647/crop/499x281%2B0%2B0/resize/480x270/quality/75/?url=http%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fbc%2F9a%2F7e56dc7b4548b1fd4c551342aee3%2Fresizes%2F500%2Funtitled-3.jpg',
            width: 480,
            height: 270,
          },
          '16x9-tablet': {
            href: 'https://uat2.x.univision.com/dims4/default/403c82b/2147483647/crop/1500x844%2B0%2B0/resize/1024x576%3E/quality/75/?url=http%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fbc%2F9a%2F7e56dc7b4548b1fd4c551342aee3%2Fresizes%2F1500%2Funtitled-3.jpg',
            width: 1024,
            height: 576,
          },
          'slideshow-horizontal': {
            href: 'https://uat2.x.univision.com/dims4/default/6785b07/2147483647/resize/935x645%3E/quality/75/?url=http%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fbc%2F9a%2F7e56dc7b4548b1fd4c551342aee3%2Fresizes%2F1500%2Funtitled-3.jpg',
            width: 935,
            height: 645,
          },
          '16x9-loading': {
            href: 'https://uat2.x.univision.com/dims4/default/d6ba113/2147483647/crop/495x281%2B4%2B0/resize/30x17/quality/75/?url=http%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fbc%2F9a%2F7e56dc7b4548b1fd4c551342aee3%2Fresizes%2F500%2Funtitled-3.jpg',
            width: 30,
            height: 17,
          },
          'slideshow-4x3-vertical-mobile': {
            href: 'https://uat2.x.univision.com/dims4/default/dd7941d/2147483647/resize/420x620%3E/quality/75/?url=http%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fbc%2F9a%2F7e56dc7b4548b1fd4c551342aee3%2Fresizes%2F1500%2Funtitled-3.jpg',
            width: 420,
            height: 620,
          },
        },
      },
      content: null,
    };
    const wrapper = shallow(<VerticalSlideshow device="desktop" sharingOptions={sharingOptions} slides={[slide]} primaryTag={{ name: 'foo' }} />);
    expect(wrapper.find('Picture__item')).toBeDefined();
  });

  it('should return null if the slideshow has no slides', () => {
    const wrapper = shallow(<VerticalSlideshow sharingOptions={sharingOptions} slides={[]} primaryTag={{ name: 'foo' }} />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('should ignore slides with null renditions', () => {
    const slideNullRendition = getSlide('c');
    slideNullRendition.content.renditions = null;
    const slides = [getSlide('a'), getSlide('b'), slideNullRendition];
    const wrapper = shallow(<VerticalSlideshow sharingOptions={sharingOptions} slides={slides} primaryTag={{ name: 'foo' }} />);
    expect(wrapper.find('#a123')).toHaveLength(1);
    expect(wrapper.find('#b123')).toHaveLength(1);
    expect(wrapper.find('#c123')).toHaveLength(0);
  });
});
