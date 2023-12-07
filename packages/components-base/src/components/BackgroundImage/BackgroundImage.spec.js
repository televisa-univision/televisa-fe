import React from 'react';
import { shallow } from 'enzyme';

import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import getRatioImages from '../Picture/getRatioImages';

import BackgroundImage from '.';

jest.mock('../Picture/getRatioImages', () => jest.fn(() => ({
  sm: 'image.jpg',
  md: 'imagemd.jpg',
  lg: 'imagelg.jpg',
})));

const image = {
  type: 'image',
  title: 'Imagen del lugar del tiroteo en Virginia',
  caption: 'Imagen del lugar del tiroteo en Virginia',
  credit: null,
  renditions: {
    original: {
      href: 'http://univision-bs.s3.amazonaws.com/6f/c3/b06507cd4f16962d78e7fe86d211/2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG',
      width: 1000,
      height: 666,
    },
    '16x9-med': {
      href: 'http://qa.univision.psdops.com/dims4/default/dafb400/2147483647/crop/1000x563%2B0%2B35/resize/400x225/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F6f%2Fc3%2Fb06507cd4f16962d78e7fe86d211%2F2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG',
      width: 400,
      height: 225,
    },
    '16x9': {
      href: 'http://qa.univision.psdops.com/dims4/default/ace40e0/2147483647/crop/1000x563%2B0%2B35/resize/1240x698/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F6f%2Fc3%2Fb06507cd4f16962d78e7fe86d211%2F2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG',
      width: 1240,
      height: 698,
    },
    '16x9-mobile': {
      href: 'http://qa.univision.psdops.com/dims4/default/9d2e097/2147483647/crop/1000x563%2B0%2B35/resize/480x270/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F6f%2Fc3%2Fb06507cd4f16962d78e7fe86d211%2F2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG',
      width: 480,
      height: 270,
    },
    '16x9-sm': {
      href: 'http://qa.univision.psdops.com/dims4/default/b468e04/2147483647/crop/1000x561%2B0%2B36/resize/246x138/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F6f%2Fc3%2Fb06507cd4f16962d78e7fe86d211%2F2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG',
      width: 246,
      height: 138,
    },
    '16x9-tablet': {
      href: 'http://qa.univision.psdops.com/dims4/default/4614ebf/2147483647/crop/1000x563%2B0%2B35/resize/1024x576/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F6f%2Fc3%2Fb06507cd4f16962d78e7fe86d211%2F2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG',
      width: 1024,
      height: 576,
    },
    '16x9-extended': {
      href: 'http://qa.univision.psdops.com/dims4/default/bafa900/2147483647/crop/1000x563%2B0%2B35/resize/1440x810/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F6f%2Fc3%2Fb06507cd4f16962d78e7fe86d211%2F2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG',
      width: 1440,
      height: 810,
    },
  },
};

const props = {
  alt: 'A cute cat',
  image,
};

/** @test {BackgroundImage} */
describe('Image Spec', () => {
  let hasKeySpy;

  beforeEach(() => {
    hasKeySpy = jest.spyOn(helpers, 'hasKey').mockReturnValue(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render background image', () => {
    const wrapper = shallow(<BackgroundImage {...props} />);
    expect(wrapper.find('.background').length).toBe(1);
  });

  it('renders a blurred image', () => {
    props.blur = true;
    const wrapper = shallow(<BackgroundImage {...props} />);
    expect(wrapper.find('.blur').length).toBe(1);
  });

  it('renders a dark image', () => {
    props.dark = true;
    const wrapper = shallow(<BackgroundImage {...props} />);
    expect(wrapper.find('.dark').length).toBe(1);
  });

  it('adds custom className prop', () => {
    props.className = 'hi';
    const wrapper = shallow(<BackgroundImage {...props} />);
    expect(wrapper.find('.hi')).toHaveLength(1);
  });

  it('updates device', () => {
    const wrapper = shallow(<BackgroundImage {...props} />);
    expect(wrapper.find('.background').prop('style').backgroundImage).toEqual('url(\'image.jpg\')');

    const wrapper2 = shallow(<BackgroundImage {...props} device="desktop" />);
    expect(wrapper2.find('.background').prop('style').backgroundImage).toEqual('url(\'imagelg.jpg\')');

    const wrapper3 = shallow(<BackgroundImage {...props} device="tablet" />);
    expect(wrapper3.find('.background').prop('style').backgroundImage).toEqual('url(\'imagemd.jpg\')');
  });

  it('only sets backgroundImage if source is available', () => {
    getRatioImages.mockReturnValueOnce({});
    hasKeySpy.mockReturnValue(false);
    const wrapper = shallow(<BackgroundImage {...props} />);
    expect(wrapper.find('.background').prop('style').BackgroundImage).not.toBeDefined();
  });

  it('use overrideImageUrl as image src', () => {
    const wrapper = shallow(<BackgroundImage overrideImageUrl="http://www.test.com/test.jpg" />);
    expect(wrapper.find('.background').html().indexOf('test.jpg')).not.toBe(-1);
  });

  it('use gradient bg when passed', () => {
    const wrapper = shallow(<BackgroundImage gradient />);
    expect(wrapper.find('.backgroundWithGradient').length).toBe(1);
  });
});
