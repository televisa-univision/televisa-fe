import brandableType from './types.json';
import Brandable from '.';

describe('Brandable', () => {
  let data = {};
  beforeEach(() => {
    data = {
      brandable: {
        image: 'image',
        title: 'title',
        shortTitle: 'shortTitle',
      },
    };
  });

  it('should have pageData instance even if it does not have valid data', () => {
    expect(new Brandable(null)).toHaveProperty('pageData', expect.any(Object));
  });

  it('should return the Promotable info', () => {
    const brandable = new Brandable(data);
    expect(brandable.image).toBe('image');
    expect(brandable.title).toBe('title');
    expect(brandable.shortTitle).toBe('shortTitle');
  });

  it('should return the Promotable info in bex from sourceStation', () => {
    data.sourceStation = {
      title: 'title',
    };
    data.brandable.title = null;
    const brandable = new Brandable(data);
    expect(brandable.image).toBe('image');
    expect(brandable.title).toBe('title');
    expect(brandable.shortTitle).toBe('shortTitle');
  });

  it('should return the Promotable info in bex for tvStation', () => {
    data.tvStation = {
      title: 'title',
    };
    data.brandable.title = null;
    data.brandable.type = ['tvStation'];
    const brandable = new Brandable(data);
    expect(brandable.image).toBe('image');
    expect(brandable.title).toBe('title');
    expect(brandable.shortTitle).toBe('shortTitle');
  });

  it('should return a valid type for the brandable', () => {
    Object.values(brandableType)
      .forEach((type) => {
        const testData = {
          brandable: {
            [type]: {},
          },
        };
        expect(new Brandable(testData).type).toBe(type);
      });
  });

  it('should return the social networks for a Show', () => {
    data.brandable.show = {
      socialNetworks: {
        facebookUrl: { url: 'facebook' },
        twitterUrl: { url: 'twitter' },
      },
    };
    expect(new Brandable(data).socialNetworks).toEqual([
      { name: 'facebook', href: 'facebook' },
      { name: 'twitter', href: 'twitter' },
    ]);
  });

  it('should return the social networks for a Show in bex', () => {
    data.brandable.show = {
      socialNetworks: [
        { name: 'facebook', href: 'facebook' },
      ],
    };
    expect(new Brandable(data).socialNetworks).toEqual([
      { name: 'facebook', href: 'facebook' },
    ]);
  });

  it('should return the social networks for no Shows', () => {
    data.brandable.radioStation = {
      socialNetworks: [
        { name: 'facebook', href: 'facebook' },
      ],
    };
    expect(new Brandable(data).socialNetworks).toEqual([
      { name: 'facebook', href: 'facebook' },
    ]);
  });

  it('should return the header logo for Shows', () => {
    data.brandable.show = {
      headerLogo: {
        original: {
          href: 'logoShow',
        },
      },
    };
    expect(new Brandable(data).headerLogo).toBe('logoShow');
  });

  it('should return the local market links for footer', () => {
    data.brandable.localMarketFooter = {
      title: 'localtitle',
      links: [{ text: 'name', link: 'href' }],
    };
    expect(new Brandable(data).localMarketFooter.title).toBe('localtitle');
  });

  it('should return the header logo for TV Station', () => {
    data.brandable.tvStation = {
      headerLogo: {
        renditions: {
          original: {
            href: 'logoTv',
          },
        },
      },
    };
    expect(new Brandable(data).headerLogo).toBe('logoTv');
  });

  it('should return the header logo for Radio Station', () => {
    data.brandable.radioStation = {
      alternativeLogo: {
        renditions: {
          original: {
            href: 'logoRadio',
          },
        },
      },
    };
    expect(new Brandable(data).headerLogo).toBe('logoRadio');
  });

  it('should return null header logo for unknown brandbale', () => {
    expect(new Brandable(data).headerLogo).toBe(null);
  });

  it('should return the brandable uri', () => {
    data.brandable.radioStation = {
      uri: '/radio/uri',
    };
    expect(new Brandable(data).uri).toBe('/radio/uri');
  });

  it('should return an array of related stations, if available', () => {
    data.sourceStation = {
      relatedStations: [],
    };
    expect(new Brandable(data).relatedStations.length).toBeDefined();
  });

  it('should handle empty data from API', () => {
    expect(new Brandable({}).type).not.toBeDefined();
  });

  it('should return the source station, if available', () => {
    data.sourceStation = 'test';
    expect(new Brandable(data).sourceStation).toBe('test');
  });

  it('should return the source station image, if available', () => {
    data.sourceStation = {
      image: {
        renditions: {
          original: {
            href: 'test',
          },
        },
      },
    };
    expect(new Brandable(data).sourceStationImage).toBe('test');
  });

  it('should return the local market zip code.', () => {
    data.brandable.tvStation = {
      localMarket: {
        zipCodes: ['001', '002'],
      },
    };
    expect(new Brandable(data).zipCode).toBe('001');
  });

  it('should return the tvStation.', () => {
    data.brandable.tvStation = {
      uri: '/san-francisco/kdtv',
      localMarket: {
        zipCodes: ['001', '002'],
      },
    };
    expect(new Brandable(data).tvStation.uri).toBe('/san-francisco/kdtv');
  });
});
