import * as articleTypes from '@univision/fe-commons/dist/constants/articleTypes';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import univisionTheme from '@univision/fe-commons/dist/themes/univision';

import getCardByContentType from '.';

jest.mock('@univision/shared-components/dist/components/weather/MinMaxTemp', () => () => 'MinMaxTemp');
jest.mock('@univision/shared-components/dist/components/weather/WeatherDate', () => 'mock-widget');
jest.mock('@univision/shared-components/dist/components/weather/Temp', () => 'mock-temp');
jest.mock('@univision/shared-components/dist/components/weather/LocationDate', () => 'mock-location');
jest.mock('@univision/shared-components/dist/components/weather/ForecastRow', () => 'mock-forecastrow');

describe('getCardByContentType', () => {
  beforeEach(() => {
    delete process.env.APP_VERSION;
  });

  const cardTheme = univisionTheme();

  it('should return null if content is invalid', () => {
    expect(getCardByContentType(undefined)).toEqual([null, null]);
  });

  it('should return null if content type is invalid', () => {
    expect(getCardByContentType({ type: null })).toEqual([null, null]);
  });

  it('should return HoroscopeCard data when type === article + Horoscope', () => {
    const content = {
      type: contentTypes.ARTICLE,
      articleType: articleTypes.HOROSCOPE,
      widgetContext: {
        metaData: {
          cardName: 'HoroscopeCard',
        },
      },
    };
    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return PromoCard data when type === externallink', () => {
    const content = {
      type: contentTypes.EXTERNAL_LINK,
      widgetContext: {
        metaData: {
          cardName: 'PromoCard',
        },
      },
    };
    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return PromoCard data when type === internallink', () => {
    const content = {
      type: contentTypes.INTERNAL_LINK,
      widgetContext: {
        metaData: {
          cardName: 'PromoCard',
        },
      },
    };
    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return MatchCard data when type === soccermatch', () => {
    const content = {
      type: contentTypes.SOCCER_MATCH,
      widgetContext: {
        metaData: {
          cardName: 'MatchCard',
        },
      },
    };
    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return RecipeCard data when type === article + Recipe', () => {
    const content = {
      type: contentTypes.ARTICLE,
      articleType: articleTypes.RECIPE,
      widgetContext: {
        metaData: {
          cardName: 'RecipeCard',
        },
      },
    };
    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return JobListingCard data when type === article + job listing', () => {
    const content = {
      type: contentTypes.ARTICLE,
      articleType: articleTypes.JOB_LISTING,
      widgetContext: {
        metaData: {
          cardName: 'JobListingCard',
        },
      },
    };

    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return AskExpertCard data when type === article + ask expert', () => {
    const content = {
      type: contentTypes.ARTICLE,
      articleType: articleTypes.ASK_EXPERT,
      widgetContext: {
        metaData: {
          cardName: 'AskExpertCard',
        },
      },
    };

    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return StoryCard data when type === article', () => {
    const content = {
      type: contentTypes.ARTICLE,
      widgetContext: {
        metaData: {
          cardName: 'StoryCard',
        },
      },
    };

    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return SlideshowCard data when type === slideshow', () => {
    const content = {
      type: contentTypes.SLIDESHOW,
      widgetContext: {
        metaData: {
          cardName: 'SlideshowCard',
        },
      },
    };

    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return EpisodeCard data when type === video + longform', () => {
    const content = {
      type: contentTypes.VIDEO,
      longform: true,
      widgetContext: {
        metaData: {
          cardName: 'EpisodeCard',
        },
      },
    };

    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return VideoInlineCard data when type === video and inline option is specified', () => {
    const content = {
      type: contentTypes.VIDEO,
      widgetContext: {
        metaData: {
          cardName: 'VideoCard instream',
        },
      },
    };

    const [, data] = getCardByContentType(content, { forceVideoInlineCard: true });
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return VideoCard data when type === video', () => {
    const content = {
      type: contentTypes.VIDEO,
      widgetContext: {
        metaData: {
          cardName: 'VideoCard preview',
        },
      },
    };

    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return ShowCard data when type === show', () => {
    const content = {
      type: contentTypes.SHOW,
      widgetContext: {
        metaData: {
          cardName: 'ShowCard',
        },
      },
    };

    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return LivestreamCard data when type === livestream', () => {
    const content = {
      type: contentTypes.LIVE_STREAM,
      widgetContext: {
        metaData: {
          cardName: 'LivestreamCard',
        },
      },
    };

    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return PromoCard data when type === livestream and forcePromoCard is enabled', () => {
    const content = {
      type: contentTypes.LIVE_STREAM,
      widgetContext: {
        metaData: {
          cardName: 'PromoCard',
        },
      },
      cardTheme,
    };
    const options = {
      forcePromoCard: true,
    };

    const [, data] = getCardByContentType(content, options);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return LocalWeatherForecast data when type === localweatherforecast', () => {
    const content = {
      type: contentTypes.LOCAL_WEATHER_FORECAST,
      widgetContext: {
        metaData: {
          cardName: 'LocalWeatherForecast',
        },
      },
    };

    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return PersonaCard data when type === person', () => {
    const content = {
      type: contentTypes.PERSON,
      widgetContext: {
        metaData: {
          cardName: 'PersonCard',
        },
      },
    };

    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return Postcad episode data when type === audio', () => {
    const content = {
      type: contentTypes.PODCAST_EPISODE,
      widgetContext: {
        metaData: {
          cardName: 'PodcastEpisodeCard',
        },
      },
    };

    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return LiveBlogCard data when type === liveblog', () => {
    const content = {
      type: contentTypes.LIVE_BLOG,
      widgetContext: {
        metaData: {
          cardName: 'LiveBlogCard',
        },
      },
    };

    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return RadioCard data when type === radiostation', () => {
    const content = {
      type: contentTypes.RADIO_STATION,
      widgetContext: {
        metaData: {
          cardName: 'RadioCard',
        },
      },
    };

    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });

  it('should return PodcastSerieCard data when type === podcastseries', () => {
    const content = {
      type: contentTypes.PODCAST_SERIES,
      widgetContext: {
        metaData: {
          cardName: 'PodcastSerieCard',
        },
      },
    };

    const [, data] = getCardByContentType(content);
    expect(data).toEqual(
      expect.objectContaining({ ...content, cardTheme })
    );
  });
});
