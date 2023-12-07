import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import defaultImage from '@univision/fe-commons/dist/assets/images/default-content-image.png';

import Picture, { isImageEqual } from '.';
import * as sizes from './imageSizes';
import aspectRatiosSizes from './aspectRatios';

jest.mock('@univision/fe-commons/dist/assets/images/default-content-image.png', () => jest.fn());
jest.useFakeTimers();
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
    '16x9-loading': {
      href: 'http://qa.univision.psdops.com/dims4/default/9d2e097/2147483647/crop/1000x563%2B0%2B35/resize/480x270/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F6f%2Fc3%2Fb06507cd4f16962d78e7fe86d211%2F2017-06-14t124046z-2096246918-rc1f6f762ed0-rtrmadp-3-virginia-shooting.JPG',
      width: 30,
      height: 17,
    },
  },
};

/**
 * Props for the the image component
 * @type {{alt: string, desktopImage: string, mobileImage: string}}
 */
const imageProps = {
  alt: 'A cute cat',
  className: 'pictureClass',
  image,
  lazyload: true,
};

const verticalImageProps = {
  ...imageProps,
  isVertical: true,
};

const deviceSizeOverrides = {
  md: sizes.X_SMALL,
};

/** @test {Picture} */
describe('Image Spec', () => {
  process.env.APP_VERSION = 2;
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Picture />, div);
  });
  it('should render with fallback image when image prop is null', () => {
    const wrapper = mount(<Picture image={null} />);
    expect(wrapper.find('img')).toHaveLength(1);
  });
  it('should render image as expected', () => {
    const wrapper = mount(<Picture {...imageProps} />);
    expect(wrapper.find('img').length).toBe(1);
  });
  it('should render vertical image as expected', () => {
    const wrapper = mount(<Picture {...verticalImageProps} />);
    expect(wrapper.find('img').length).toBe(1);
  });
  it('should set a custom class correctly to the picture wrapper element', () => {
    const wrapper = mount(<Picture {...imageProps} className="custom" />);
    expect(wrapper.find('Picture__Wrapper').prop('className').trim()).toContain('custom');
  });
  it('should render picture without classname if not custom class was set', () => {
    const wrapper = mount(<Picture {...imageProps} className={null} />);
    expect(wrapper.find('Picture__Wrapper').prop('className').trim()).toBe('');
  });
  it('should override image sizes', () => {
    const wrapper = mount(<Picture {...imageProps} deviceSizeOverrides={deviceSizeOverrides} />);
    const xsmallImage = image.renditions[aspectRatiosSizes['16x9'][sizes.X_SMALL].name].href;
    expect(wrapper.find('picture img').prop('src')).toEqual(xsmallImage);
  });
  it('should use the default image if none is provided', () => {
    const wrapper = mount(<Picture image={undefined} />);
    expect(wrapper.find('img').prop('src')).toEqual(defaultImage);
  });

  it('should pass custom className to rendered element', () => {
    const wrapper = mount(<Picture {...imageProps} overrideImageUrl="test" className="custom" showBackground />);
    expect(wrapper.find('img').prop('className')).toContain('custom');
  });
  it('should not add any custom className if none is passed', () => {
    const wrapper = mount(<Picture {...imageProps} overrideImageUrl="test" className={null} />);
    expect(wrapper.find('Picture__ImageEl').prop('className').trim()).toBe('');
  });
  it('should return an image tag if the source is an svg', () => {
    const wrapper = mount(
      <Picture
        {...{ ...imageProps, lazyload: false }}
        image={{
          type: 'image',
          renditions: {
            original: {
              href: 'test-image.svg',
            },
          },
        }}
      />
    );

    expect(wrapper.find('img').prop('src')).toEqual('test-image.svg');
  });

  it('should return an image tag if the source is an svg with no width or height', () => {
    const wrapper = mount(
      <Picture
        {...{ ...imageProps, lazyload: false }}
        image={{
          type: 'image',
          renditions: {
            original: {
              href: 'test-image.svg',
              width: 0,
              height: 0,
            },
          },
        }}
      />
    );

    expect(wrapper.find('img').prop('src')).toEqual('test-image.svg');
    expect(wrapper.find('img').prop('height')).toEqual('100%');
    expect(wrapper.find('img').prop('width')).toEqual('100%');
  });

  it('should return an image tag if the source is an svg without className', () => {
    const wrapper = mount(
      <Picture
        {...imageProps}
        image={{
          type: 'image',
          renditions: {
            original: {
              href: 'test-image.svg',
            },
          },
        }}
        className={null}
      />
    );

    expect(wrapper.find('Picture__ImageEl').prop('className').trim()).toBe('');
  });
  it('should use the default image if no image for size is found', () => {
    const wrapper = mount(
      <Picture
        {...imageProps}
        image={{
          type: 'image',
          image: {
            type: 'image',
            renditions: { '16x9-mobile': null },
          },
        }}
      />
    );
    expect(wrapper.find('img').prop('src')).toEqual(defaultImage);
  });
  it('should return the override image url', () => {
    const img = shallow(<Picture {...imageProps} overrideImageUrl="test.jpg" />);
    expect(img.find('Picture__ImageEl').prop('src')).toEqual('test.jpg');
  });

  it('should return the override image url with bounds', () => {
    const bounds = {
      height: 1,
      width: 1,
    };
    const img = shallow(<Picture {...imageProps} overrideImageUrl="test.jpg" overrideImageBounds={bounds} />);
    expect(img.find('Picture__ImageEl').prop('src')).toEqual('test.jpg');
    expect(img.find('Picture__ImageEl').prop('height')).toEqual(1);
    expect(img.find('Picture__ImageEl').prop('width')).toEqual(1);
  });

  it('should reset fallback image if override image url is updated', () => {
    const img = mount(<Picture {...imageProps} overrideImageUrl="test.jpg" />);

    img.setProps({ overrideImageUrl: 'test2.jpg' });
    expect(img.find('Picture__ImageEl').prop('src')).toEqual('test2.jpg');
  });

  it('should fallback to image caption as alt when no alt is provided', () => {
    const modifiedImage = {
      ...image,
      title: null,
    };

    let wrapper = shallow(<Picture image={modifiedImage} />);
    expect(wrapper.find('Picture__ImageEl').prop('alt')).toBe(image.caption);

    wrapper = shallow(<Picture image={modifiedImage} overrideImageUrl="test.jpg" />);
    expect(wrapper.find('Picture__ImageEl').prop('alt')).toBe(image.caption);
  });

  it('should fallback to image title as alt when no alt is provided', () => {
    const modifiedImage = {
      ...image,
      caption: null,
    };

    let wrapper = shallow(<Picture image={modifiedImage} />);
    expect(wrapper.find('Picture__ImageEl').prop('alt')).toBe(image.title);

    wrapper = shallow(<Picture image={modifiedImage} overrideImageUrl="test.jpg" />);
    expect(wrapper.find('Picture__ImageEl').prop('alt')).toBe(image.title);
  });

  it('should call onImageError if onError is dispatched for image override url', async () => {
    const onImageError = jest.fn();
    const wrapper = mount(<Picture {...imageProps} overrideImageUrl="test.jpg" onImageError={onImageError} />);
    wrapper.find('img').simulate('error');
    wrapper.update();

    expect(onImageError).toHaveBeenCalled();
  });

  it('should return true if nextProps uid has not changed', () => {
    const received = isImageEqual({ image: { uid: 'test' } }, { image: { uid: 'test' } });

    expect(received).toBe(true);
  });

  it('should return false if nextProps uid has changed', () => {
    const received = isImageEqual({ image: { uid: 'test' } }, { image: { uid: 'test2' } });

    expect(received).toBe(false);
  });

  it('should fallback to image caption as alt when no alt is provided', () => {
    const modifiedImage = {
      ...image,
      title: null,
    };

    let wrapper = shallow(<Picture image={modifiedImage} />);
    expect(wrapper.find('Picture__ImageEl').prop('alt')).toBe(image.caption);

    wrapper = shallow(<Picture image={modifiedImage} overrideImageUrl="test.jpg" />);
    expect(wrapper.find('Picture__ImageEl').prop('alt')).toBe(image.caption);
  });

  it('should show image if is single widget', () => {
    const img = mount(<Picture {...imageProps} isBlurred overrideImageUrl="test.jpg" />);

    img.setProps({ overrideImageUrl: 'test2.jpg' });
    expect(img.find('Picture__ImageEl').prop('src')).toEqual('test2.jpg');
  });
});
