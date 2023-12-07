import React from 'react';
import { shallow } from 'enzyme';

import VideoMetadata from '.';

const metaFull = {
  authors: [],
  description: 'something',
  durationString: '1:02:23',
  image: {
    renditions: { original: {} },
  },
  previewUrl: '1.mp4',
  publishDate: '2018/05/24',
  source: 'Univision',
  supplier: 'Univision',
  title: 'test video',
  uri: 'http://uv.me/ejn',
  vertical: 'test',
};

/** @test {VideoMetadata} */
describe('VideoMetadata Spec', () => {
  it('should render json data', () => {
    const props = {
      page: metaFull,
    };
    const wrapper = shallow(<VideoMetadata {...props} />);
    const testContent = wrapper.find('script[type="application/ld+json"]');

    expect(!!testContent).toBe(true);
  });

  it('should render right metadata', () => {
    const result = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'test video',
      description: 'something',
      thumbnailUrl: [
        'https://st1.uvnimg.com/3e/f3/8c2a63a94fa4af1bc3d3fd5739c1/default-content-image.png'
      ],
      uploadDate: '2018/05/24',
      duration: 'PT1H02M23S',
      embedUrl: 'http://uv.me/ejn/embed',
      publisher: {
        '@type': 'Organization',
        name: 'Univision',
        logo: {
          '@type': 'ImageObject',
          width: 152,
          height: 30,
        },
      },
    };
    const props = {
      page: {
        description: 'something',
        durationString: '1:02:23',
        image: {
          renditions: { original: {} },
        },
        publishDate: '2018/05/24',
        source: 'Univision',
        title: 'test video',
        uri: 'http://uv.me/ejn',
        vertical: 'test',
      },
    };
    const wrapper = shallow(<VideoMetadata {...props} />);
    const testContent = wrapper.find('script[type="application/ld+json"]').get(0).props.dangerouslySetInnerHTML.__html; /* eslint-disable-line no-underscore-dangle */

    expect(JSON.parse(testContent)).toStrictEqual(result);
  });

  it('should render right metadata when livestream', () => {
    const result = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      contentUrl: 'https://anvato-gcdn-oiaqnocss6k3lxvnfcail63uec-us.storage.googleapis.com/us/vod/2168/20/10/15/3932889/3932889_110D3048C1D042E795D9E69C2AA34119_201015_3932889_La_Transmision_Comenzara_12000.mp4',
      name: 'test video',
      description: 'something',
      thumbnailUrl: [
        'https://st1.uvnimg.com/3e/f3/8c2a63a94fa4af1bc3d3fd5739c1/default-content-image.png'
      ],
      uploadDate: '2020-04-02T18:55:07-04:00',
      duration: 'PT1H02M23S',
      publication: {
        '@type': 'BroadcastEvent',
        name: 'test video',
        startDate: '2020-04-02T22:55:07.000Z',
        endDate: '2021-01-01T05:00:00.000Z',
        isLiveBroadcast: true,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Univision',
        logo: {
          '@type': 'ImageObject',
          width: 152,
          height: 30,
        },
      },
    };

    const props = {
      page: {
        ...metaFull,
        type: 'livestream',
        publishDate: '2020-04-02T18:55:07-04:00',
        expirationDate: '2021-01-01T00:00:00-05:00',
        uri: 'http://uv.me/ejn',
      },
    };

    const wrapper = shallow(<VideoMetadata {...props} />);
    const testContent = wrapper.find('script[type="application/ld+json"]').get(0).props.dangerouslySetInnerHTML.__html; /* eslint-disable-line no-underscore-dangle */

    expect(JSON.parse(testContent)).toStrictEqual(result);
  });

  it('should render right metadata when soccer match', () => {
    const result = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      contentUrl: 'https://anvato-gcdn-oiaqnocss6k3lxvnfcail63uec-us.storage.googleapis.com/us/vod/2168/20/02/27/3824166/3824166_60A8D7E3AA6845B48126D120F070FBED_200227_3824166_TUDN_Video_Slate_for_DAI_2_27_20_12000.mp4',
      name: 'test video',
      description: 'something',
      thumbnailUrl: [
        'https://st1.uvnimg.com/3e/f3/8c2a63a94fa4af1bc3d3fd5739c1/default-content-image.png'
      ],
      uploadDate: '2020-04-02T18:55:07-04:00',
      duration: 'PT1H02M23S',

      publication: {
        '@type': 'BroadcastEvent',
        name: 'test video',
        startDate: '2020-04-02T22:55:07.000Z',
        endDate: '2021-01-01T05:00:00.000Z',
        isLiveBroadcast: true,
      },
      publisher: {
        '@type': 'Organization',
        name: 'TUDN.com',
        logo: {
          '@type': 'ImageObject',
          width: 133,
          height: 50,
        },
      },
    };

    const props = {
      page: {
        ...metaFull,
        type: 'soccermatch',
        source: 'TUDN.com',
        streamStartTime: '2020-04-02T18:55:07-04:00',
        streamEndTime: '2021-01-01T00:00:00-05:00',
        publishDate: '2020-04-02T18:55:07-04:00',
      },
    };

    const wrapper = shallow(<VideoMetadata {...props} />);
    const testContent = wrapper.find('script[type="application/ld+json"]').get(0).props.dangerouslySetInnerHTML.__html; /* eslint-disable-line no-underscore-dangle */

    expect(JSON.parse(testContent)).toStrictEqual(result);
  });

  it('should render metadata using backup values', () => {
    const result = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'test',
      description: 'test',
      embedUrl: 'http://uv.me/ejn/embed',
      thumbnailUrl: [
        'https://st1.uvnimg.com/3e/f3/8c2a63a94fa4af1bc3d3fd5739c1/default-content-image.png'
      ],
      uploadDate: '2018/05/24',
      duration: 'PT1M00S',
      publisher: {
        '@type': 'Organization',
        name: 'Univision',
        logo: {
          '@type': 'ImageObject',
          width: 152,
          height: 30,
        },
      },
    };
    const props = {
      page: {
        image: {
          renditions: { original: {} },
        },
        previewUrl: '1.mp4',
        publishDate: '2018/05/24',
        uri: 'http://uv.me/ejn',
        vertical: 'test',
      },
    };
    const wrapper = shallow(<VideoMetadata {...props} />);
    const testContent = wrapper.find('script[type="application/ld+json"]').get(0).props.dangerouslySetInnerHTML.__html; /* eslint-disable-line no-underscore-dangle */

    expect(JSON.parse(testContent)).toStrictEqual(result);
  });

  it('should render removing undefined values', () => {
    const result = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      thumbnailUrl: [
        'https://st1.uvnimg.com/3e/f3/8c2a63a94fa4af1bc3d3fd5739c1/default-content-image.png'
      ],
      uploadDate: '2018/05/24',
      duration: 'PT1M00S',
      embedUrl: 'http://uv.me/ejn/embed',
      publisher: {
        '@type': 'Organization',
        name: 'Univision',
        logo: {
          '@type': 'ImageObject',
          width: 152,
          height: 30,
        },
      },
    };
    const props = {
      page: {
        image: {
          renditions: { original: {} },
        },
        previewUrl: '1.mp4',
        publishDate: '2018/05/24',
        uri: 'http://uv.me/ejn',
      },
    };
    const wrapper = shallow(<VideoMetadata {...props} />);
    const testContent = wrapper.find('script[type="application/ld+json"]').get(0).props.dangerouslySetInnerHTML.__html; /* eslint-disable-line no-underscore-dangle */

    expect(JSON.parse(testContent)).toStrictEqual(result);
  });

  it('should not render complete publication when start date or end date values are missing for livestream', () => {
    const result = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      contentUrl: 'https://anvato-gcdn-oiaqnocss6k3lxvnfcail63uec-us.storage.googleapis.com/us/vod/2168/20/10/15/3932889/3932889_110D3048C1D042E795D9E69C2AA34119_201015_3932889_La_Transmision_Comenzara_12000.mp4',
      name: 'test video',
      description: 'something',
      thumbnailUrl: [
        'https://st1.uvnimg.com/3e/f3/8c2a63a94fa4af1bc3d3fd5739c1/default-content-image.png'
      ],
      duration: 'PT1H02M23S',
      publication: {
        '@type': 'BroadcastEvent',
        isLiveBroadcast: true,
        name: 'test video',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Univision',
        logo: {
          '@type': 'ImageObject',
          width: 152,
          height: 30,
        },
      },
    };

    const props = {
      page: {
        type: 'livestream',
        description: 'something',
        durationString: '1:02:23',
        image: {
          renditions: { original: {} },
        },
        previewUrl: '1.mp4',
        title: 'test video',
        uri: 'http://uv.me/ejn',
        vertical: 'test',
        startStreamTime: undefined,
      },
    };

    const wrapper = shallow(<VideoMetadata {...props} />);
    const testContent = wrapper.find('script[type="application/ld+json"]').get(0).props.dangerouslySetInnerHTML.__html; /* eslint-disable-line no-underscore-dangle */

    expect(JSON.parse(testContent)).toStrictEqual(result);
  });
});
