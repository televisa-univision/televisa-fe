import getSharingValues from './getSlideShareOptions';

jest.mock('@univision/fe-commons/dist/config/features/content', () => ({
  isSpaEnabled: () => true,
  shouldForceSpa: () => false,
}));

const mockSharingOptions = {
  facebook: { url: 'http://uni.vi/s9sh100K6rz' },
  twitter: { url: 'http://uni.vi/s9sh100K6rz' },
  mail: { body: 'test content http://uni.vi/s9sh100K6rz' },
  whatsapp: { url: 'http://uni.vi/s9sh100K6rz' },
};

describe('getSharingValues', () => {
  it('should change the sharing option urls if shortUrl is defined', () => {
    const slideData = {
      caption: 'test',
      image: {
        uid: '123',
      },
      shortUrl: 'http://uni.vi/s9sh100K6tw',
    };
    const response = getSharingValues(mockSharingOptions, slideData);
    expect(response.facebook.url).toEqual(slideData.shortUrl);
    expect(response.twitter.url).toEqual(slideData.shortUrl);
  });
  it('should works if mail is empty', () => {
    mockSharingOptions.mail = {};
    const slideData = {
      caption: 'test',
      image: {
        uid: '123',
      },
      shortUrl: 'http://uni.vi/s9sh100K6tw',
    };
    const response = getSharingValues(mockSharingOptions, slideData);
    expect(response.facebook.url).toEqual(slideData.shortUrl);
    expect(response.twitter.url).toEqual(slideData.shortUrl);
  });

  it('should return empty object without slide data', () => {
    const response = getSharingValues({});
    expect(response).toEqual({});
  });
});
