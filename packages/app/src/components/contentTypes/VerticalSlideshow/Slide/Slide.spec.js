import React from 'react';
import { shallow, mount } from 'enzyme';

// eslint-disable-next-line no-restricted-imports
import Store from '@univision/fe-commons/dist/store/store';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import comScoreManager from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';
import features from '@univision/fe-commons/dist/config/features';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import Slide from '.';
import mockApiData from '../__mocks__/mockSlideshowData.json';

/**
 * Get slide data by id
 * @param {string} id id
 * @returns {Function}
 */
const getSlide = id => ({
  caption: 'test',
  content: {
    type: 'image',
    uid: `${id}123`,
    renditions: {
      original: { href: `${id}.jpg`, width: 1000, height: 600 },
    },
  },
});

const props = {
  slide: mockApiData.data.slides[0],
  depth: 1,
  primaryTag: {},
  slidesLength: 1,
  title: '',
  uid: 'test',
  index: 0,
};

/** @test {Slide} */
describe('Slide', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should render without crashing', () => {
    const wrapper = mount(<Slide {...props} />);
    expect(wrapper.find('.pictureWrapper')).toBeDefined();
  });
  it('should render without crashing when no content', () => {
    const slide = {
      uid: '00000170-5acf-d639-a7fb-faefe29e0001',
      caption: 'El American Airlines Arena de Miami fue la cita para el segundo día de ensayos de Premio Lo Nuestro donde Chiquis Rivera, Amandititita, Prince Royce, Zion, Willie Colón, Reykon, entre otros, dieron una probadita de lo que será su performance del próximo jueves 20 de febrero en la gran gala.',
      credit: 'Univision',
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
      hideCaption: false,
      pollQuestionOverride: null,
      shortUrl: 'http://uni.vi/L8Mu102aert#faefe29e0001',
      longUrl: 'https://www.univision.com/shows/premio-lo-nuestro/foto-a-foto-asi-ha-sido-el-segundo-dia-de-ensayos-premio-lo-nuestro-2020-fotos#faefe29e0001',
    };
    const wrapper = mount(<Slide {...props} slide={slide} />);
    expect(wrapper.find('.pictureWrapper')).toBeDefined();
  });
  it('should render landscape image', () => {
    const slide = getSlide(1);
    const wrapper = mount(<Slide {...props} slide={slide} />);
    expect(wrapper.find('.pictureWrapper')).toBeDefined();
  });
  it('should render portrait image', () => {
    const portraitSlide = {
      caption: 'test',
      content: {
        type: 'image',
        uid: 123,
        renditions: {
          original: {
            href: 'https://cdn1.performance.univision.com/dims4/default/230c854/2147483647/resize/1093x820%3E/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F92%2F1a%2Fa785670f41449f9debd6d4ffb65d%2Fresizes%2F1500%2Ffamosos-que-han-perdido-partes-de-su-cuerpo.jpg',
            width: 600,
            height: 1000,
          },
        },
      },
    };
    const wrapper = mount(<Slide {...props} slide={portraitSlide} />);
    expect(wrapper.find('.pictureWrapper')).toBeDefined();
  });
  it('should trigger change event', () => {
    const primaryTag = { name: 'foo' };
    const trackSpy = jest.spyOn(SlideshowTracker, 'track');
    const beaconSpy = jest.spyOn(comScoreManager, 'beacon');
    const SlideCpmnt = (
      <Slide slidesLength={2} index={3} slide={getSlide('a')} primaryTag={primaryTag} />
    );
    const wrapper = mount(SlideCpmnt);
    const visibilitySensor = wrapper.find('VisibilitySensor');
    visibilitySensor.get(0).props.onChange(true);
    expect(trackSpy).toBeCalledWith(SlideshowTracker.events.change, expect.objectContaining({
      activeSlide: expect.any(Object),
      primaryTag,
    }));
    expect(beaconSpy).toBeCalled();
  });
  it('should not track com score twice for the same slide', () => {
    const primaryTag = { name: 'foo' };
    const beaconSpy = jest.spyOn(comScoreManager, 'beacon');
    // covering the case when flag is in false
    jest.spyOn(features.slideshows.vertical, 'stitchingEnabled').mockReturnValue(false);
    const SlideCpmnt = (
      <Slide slidesLength={2} index={3} slide={getSlide('a')} primaryTag={primaryTag} />
    );
    const wrapper = shallow(SlideCpmnt);
    wrapper.instance().tracked = true;
    const visibilitySensor = wrapper.find('VisibilitySensor');
    visibilitySensor.get(0).props.onChange(true, {}, 1);
    expect(beaconSpy).toBeCalledTimes(0);
  });
  it('should load the image with a cache buster', () => {
    Store.dispatch(setPageData(
      {
        data: {
          addCacheBusterToImageUrls: true,
        },
      },
    ));
    const verticalSlide = {
      caption: 'test',
      content: {
        type: 'image',
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
    const SlideCpmnt = (
      <Slide slidesLength={2} index={3} slide={verticalSlide} primaryTag={{ name: 'foo' }} />
    );
    const wrapper = mount(SlideCpmnt);
    expect(wrapper.find('Picture').prop('overrideImageUrl')).toBeDefined();
  });
});
