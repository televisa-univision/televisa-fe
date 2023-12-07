import getSquareCardType from './getSquareCardType';

describe('getSquareCardType', () => {
  it('should return article card by default', () => {
    expect(getSquareCardType({})).toBe('articleCard');
  });
  it('should return their corresponding card type', () => {
    expect(getSquareCardType({ type: 'slideshow' })).toBe('slideshowCard');
    expect(getSquareCardType({ type: 'show' })).toBe('showCard');
    expect(getSquareCardType({ type: 'soccermatch' })).toBe('soccermatchCard');
    expect(getSquareCardType({ type: 'audio' })).toBe('radioCard');
    expect(getSquareCardType({ type: 'person' })).toBe('personCard');
    expect(getSquareCardType({ type: 'podcastseries' })).toBe('podcastseriesCard');
    expect(getSquareCardType({ type: 'radiostation' })).toBe('radiostationCard');
    expect(getSquareCardType({ type: 'section' })).toBe('sectionCard');
    expect(getSquareCardType({ type: 'tvstation' })).toBe('sectionCard');
    expect(getSquareCardType({ type: 'externalcontentpromo' })).toBe('externalcontentpromoCard');
    expect(getSquareCardType({ type: 'externallink' })).toBe('externalcontentpromoCard');
    expect(getSquareCardType({ type: 'liveblog' })).toBe('liveblogCard');
    expect(getSquareCardType({ type: 'advertising' })).toBe('advertisingCard');
    expect(getSquareCardType({ type: 'soccerperson' })).toBe('soccerpersonCard');
  });
});

describe('getSquareCardType article cases', () => {
  it('should return article image', () => {
    expect(getSquareCardType({ type: 'article' })).toBe('articleCard');
  });
  it('should return horoscope', () => {
    expect(getSquareCardType({ type: 'article', articleType: 'Horoscope' })).toBe('horoscoposCard');
  });
});

describe('getSquareCardType live stream cases', () => {
  it('should return livestream card type', () => {
    expect(getSquareCardType({ type: 'livestream' })).toBe('livestreamCard');
  });
  it('should return soccermatch card type', () => {
    expect(getSquareCardType({ type: 'livestream', isLiveStreamMatch: true })).toBe('soccermatchCard');
  });
});

describe('getSquareCardType video cases', () => {
  it('should return video preview card type', () => {
    expect(getSquareCardType({ type: 'video' })).toBe('videoCard');
  });
  it('should return inline video card type', () => {
    expect(getSquareCardType({ type: 'video', isInlineVideo: true })).toBe('videoInlineCard');
  });
});
