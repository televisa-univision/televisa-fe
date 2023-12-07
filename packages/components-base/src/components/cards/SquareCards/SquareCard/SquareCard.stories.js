import { storiesOf } from '@storybook/react';
import {
  LARGE, MEDIUM, SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import { reactionTypes } from '@univision/fe-commons/dist/constants/reactionTypes';
import tudnTheme from '@univision/fe-commons/dist/themes/tudn';
import data from './__mocks__/squareCard.json';
import SquareCard from '.';
import {
  setDimsConfig,
  withTracker,
} from '../../storybookHelpers.stories';

setDimsConfig();
const cardName = 'SquareCard';
// eslint-disable-next-line require-jsdoc
const getRamdonCount = () => Math.floor(Math.random() * 10000);
const theme = tudnTheme();
const reactions = [
  {
    count: getRamdonCount(),
    type: reactionTypes.LOVE,
  }, {
    count: getRamdonCount(),
    type: reactionTypes.DISLIKE,
  }, {
    count: getRamdonCount(),
    type: reactionTypes.LIKE,
  }, {
    count: getRamdonCount(),
    type: reactionTypes.SAD,
  }, {
    count: getRamdonCount(),
    type: reactionTypes.SURPRISED,
  },
];

storiesOf('Cards/TUDN Enhancements/SquareCard/Story', module)
  .add('Story Large', () => {
    return withTracker(SquareCard, data[0], cardName, 'article', LARGE);
  })
  .add('Story Medium', () => {
    return withTracker(SquareCard, data[0], cardName, 'article', MEDIUM);
  })
  .add('Story Small', () => {
    return withTracker(SquareCard, data[0], cardName, 'article', SMALL);
  })
  .add('Story Large dark', () => {
    return withTracker(SquareCard, { ...data[0], isDark: true }, cardName, 'article', LARGE);
  })
  .add('Story Medium dark', () => {
    return withTracker(SquareCard, { ...data[0], isDark: true }, cardName, 'article', MEDIUM);
  })
  .add('Story Small dark', () => {
    return withTracker(SquareCard, { ...data[0], isDark: true }, cardName, 'article', SMALL);
  })
  .add('Story Large with sponsor', () => {
    return withTracker(SquareCard, data[26], cardName, 'article', LARGE);
  })
  .add('Story Medium with sponsor', () => {
    return withTracker(SquareCard, data[26], cardName, 'article', MEDIUM);
  })
  .add('Story Small with sponsor', () => {
    return withTracker(SquareCard, data[26], cardName, 'article', SMALL);
  })
  .add('Story Large dark with sponsor', () => {
    return withTracker(SquareCard, { ...data[26], isDark: true }, cardName, 'article', LARGE);
  })
  .add('Story Medium dark with sponsor', () => {
    return withTracker(SquareCard, { ...data[26], isDark: true }, cardName, 'article', MEDIUM);
  })
  .add('Story Small dark with sponsor', () => {
    return withTracker(SquareCard, { ...data[26], isDark: true }, cardName, 'article', SMALL);
  })
  .add('Breaking News Story Large', () => {
    return withTracker(
      SquareCard,
      {
        ...data[0],
        contentPriority: 'BREAKING_NEWS',
        title: 'Comienza en el Senado histórico juicio político a Donald Trump con disputa sobre sus reglas',
        image: {
          type: 'image',
          uid: '0000016f-c7e2-d5a4-ad6f-cfee750e0000',
          title: 'Donald Trump',
          caption: "President Donald Trump speaks at the American Farm Bureau Federation's convention in Austin, Texas, Sunday, Jan. 19, 2020. (AP Photo/Susan Walsh)",
          credit: 'Susan Walsh/AP',
          renditions: {
            original: {
              href: 'https://uvn-brightspot.s3.amazonaws.com/12/af/46f7d99e4c97b2f378a723fde768/thumbnail-8-ene-premios-lo-nuestro-2.jpg',
              width: 1920,
              height: 1080,
              focusPoint: {
                x: 0.5123452876466369,
                y: 0.62,
              },
            },
          },
        },
      },
      cardName,
      'article',
      LARGE
    );
  })
  .add('Breaking News Story Medium', () => {
    return withTracker(
      SquareCard,
      {
        ...data[0],
        contentPriority: 'BREAKING_NEWS',
        title: 'Comienza en el Senado histórico juicio político a Donald Trump con disputa sobre sus reglas',
        image: {
          type: 'image',
          uid: '0000016f-c7e2-d5a4-ad6f-cfee750e0000',
          title: 'Donald Trump',
          caption: "President Donald Trump speaks at the American Farm Bureau Federation's convention in Austin, Texas, Sunday, Jan. 19, 2020. (AP Photo/Susan Walsh)",
          credit: 'Susan Walsh/AP',
          renditions: {
            original: {
              href: 'https://uvn-brightspot.s3.amazonaws.com/12/af/46f7d99e4c97b2f378a723fde768/thumbnail-8-ene-premios-lo-nuestro-2.jpg',
              width: 1920,
              height: 1080,
              focusPoint: {
                x: 0.5123452876466369,
                y: 0.62,
              },
            },
          },
        },
      },
      cardName,
      'article',
      MEDIUM
    );
  })
  .add('Breaking News Story Small', () => {
    return withTracker(
      SquareCard,
      {
        ...data[0],
        contentPriority: 'BREAKING_NEWS',
        title: 'Comienza en el Senado histórico juicio político a Donald Trump con disputa sobre sus reglas',
        image: {
          type: 'image',
          uid: '0000016f-c7e2-d5a4-ad6f-cfee750e0000',
          title: 'Donald Trump',
          caption: "President Donald Trump speaks at the American Farm Bureau Federation's convention in Austin, Texas, Sunday, Jan. 19, 2020. (AP Photo/Susan Walsh)",
          credit: 'Susan Walsh/AP',
          renditions: {
            original: {
              href: 'https://uvn-brightspot.s3.amazonaws.com/12/af/46f7d99e4c97b2f378a723fde768/thumbnail-8-ene-premios-lo-nuestro-2.jpg',
              width: 1920,
              height: 1080,
              focusPoint: {
                x: 0.5123452876466369,
                y: 0.62,
              },
            },
          },
        },
      },
      cardName,
      'article',
      SMALL
    );
  })
  .add('Shows Large', () => {
    return withTracker(
      SquareCard,
      {
        ...data[0],
        hierarchy: [
          {
            uuid: '00000153-860f-dd44-afd7-f67fc3280012',
            uri: 'https://www.univision.com/shows',
            name: 'shows',
            title: 'Shows',
          },
          {
            uuid: '00000148-12e5-dd17-abec-12ed51010000',
            uri: 'https://www.univision.com/shows/contacto-deportivo-udn',
            name: 'contacto deportivo',
            title: 'Contacto Deportivo',
          },
        ],
      },
      cardName,
      'article',
      LARGE
    );
  })
  .add('Shows Medium', () => {
    return withTracker(
      SquareCard,
      {
        ...data[0],
        hierarchy: [
          {
            uuid: '00000153-860f-dd44-afd7-f67fc3280012',
            uri: 'https://www.univision.com/shows',
            name: 'shows',
            title: 'Shows',
          },
          {
            uuid: '00000148-12e5-dd17-abec-12ed51010000',
            uri: 'https://www.univision.com/shows/contacto-deportivo-udn',
            name: 'contacto deportivo',
            title: 'Contacto Deportivo',
          },
        ],
      },
      cardName,
      'article',
      MEDIUM
    );
  })
  .add('Shows Small', () => {
    return withTracker(
      SquareCard,
      {
        ...data[0],
        hierarchy: [
          {
            uuid: '00000153-860f-dd44-afd7-f67fc3280012',
            uri: 'https://www.univision.com/shows',
            name: 'shows',
            title: 'Shows',
          },
          {
            uuid: '00000148-12e5-dd17-abec-12ed51010000',
            uri: 'https://www.univision.com/shows/contacto-deportivo-udn',
            name: 'contacto deportivo',
            title: 'Contacto Deportivo',
          },
        ],
      },
      cardName,
      'article',
      SMALL
    );
  })
  .add('Story Medium dark with reactions and favorites', () => {
    return withTracker(SquareCard,
      {
        ...data[0],
        isDark: true,
        hasFavorite: true,
        reactions,
      }, cardName, 'article', MEDIUM);
  })
  .add('Story Medium light with reactions and favorites', () => {
    return withTracker(SquareCard,
      {
        ...data[0],
        hasFavorite: true,
        reactions,
      }, cardName, 'article', MEDIUM);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/Opinion', module)
  .add('Opinion Large', () => {
    return withTracker(SquareCard, data[2], cardName, 'article', LARGE);
  })
  .add('Opinion Medium', () => {
    return withTracker(SquareCard, data[2], cardName, 'article', MEDIUM);
  })
  .add('Opinion Small', () => {
    return withTracker(SquareCard, data[2], cardName, 'article', SMALL);
  })
  .add('Opinion Medium with reactions and favorite', () => {
    return withTracker(SquareCard, {
      ...data[2],
      hasFavorite: true,
      reactions,
    }, cardName, 'article', MEDIUM);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/Liveblog', module)
  .add('Liveblog Large', () => {
    return withTracker(SquareCard, data[1], cardName, 'liveblog', LARGE);
  })
  .add('Liveblog Medium', () => {
    return withTracker(SquareCard, data[1], cardName, 'liveblog', MEDIUM);
  })
  .add('Liveblog Small', () => {
    return withTracker(SquareCard, data[1], cardName, 'liveblog', SMALL);
  })
  .add('Liveblog Large with no posts', () => {
    return withTracker(SquareCard, { ...data[1], recentTitledPosts: [], recentPostTitles: [] }, cardName, 'liveblog', LARGE);
  })
  .add('Liveblog Medium with only title posts', () => {
    return withTracker(SquareCard, { ...data[1], recentTitledPosts: [] }, cardName, 'liveblog', MEDIUM);
  })
  .add('Liveblog Medium with reactions and favorites', () => {
    return withTracker(SquareCard, {
      ...data[1],
      hasFavorite: true,
      reactions,
    }, cardName, 'liveblog', MEDIUM);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/Advertising', module)
  .add('Advertisement Large', () => {
    return withTracker(SquareCard, data[3], cardName, 'advertising', LARGE);
  })
  .add('Advertisement Medium', () => {
    return withTracker(SquareCard, data[3], cardName, 'advertising', MEDIUM);
  })
  .add('Advertisement Small', () => {
    return withTracker(SquareCard, data[3], cardName, 'advertising', SMALL);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/SquareVideo', module)
  .add('SquareVideo Large', () => {
    return withTracker(SquareCard, { ...data[5], theme }, cardName, 'video', LARGE);
  })
  .add('SquareVideo Medium', () => {
    return withTracker(SquareCard, { ...data[5], theme }, cardName, 'video', MEDIUM);
  })
  .add('SquareVideo Small', () => {
    return withTracker(SquareCard, { ...data[5], theme }, cardName, 'video', SMALL);
  })
  .add('SquareVideo Medium with reactions and favorites', () => {
    return withTracker(SquareCard,
      {
        ...data[5],
        hasFavorite: true,
        reactions,
        theme,
      }, cardName, 'video', MEDIUM);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/Slideshow', module)
  .add('Slideshow Large', () => {
    return withTracker(SquareCard, { ...data[4], theme }, cardName, 'slideshow', LARGE);
  })
  .add('Slideshow Medium', () => {
    return withTracker(SquareCard, { ...data[4], theme }, cardName, 'slideshow', MEDIUM);
  })
  .add('Slideshow Small', () => {
    return withTracker(SquareCard, { ...data[4], theme }, cardName, 'slideshow', SMALL);
  })
  .add('Slideshow Medium with reactions and favorites', () => {
    return withTracker(SquareCard,
      {
        ...data[4],
        hasFavorite: true,
        reactions,
        theme,
      }, cardName, 'slideshow', MEDIUM);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/InlineVideo', module)
  .add('InlineVideo Large', () => {
    return withTracker(SquareCard, { isInlineVideo: true, ...data[6] }, cardName, 'video', LARGE);
  })
  .add('InlineVideo Medium', () => {
    return withTracker(SquareCard, { isInlineVideo: true, ...data[6] }, cardName, 'video', MEDIUM);
  })
  .add('InlineVideo Small', () => {
    return withTracker(SquareCard, { isInlineVideo: true, ...data[6] }, cardName, 'video', SMALL);
  })
  .add('InlineVideo Large dark mode', () => {
    return withTracker(SquareCard, { isInlineVideo: true, ...data[6], isDark: true }, cardName, 'video', LARGE);
  })
  .add('InlineVideo Medium dark mode', () => {
    return withTracker(SquareCard, { isInlineVideo: true, ...data[6], isDark: true }, cardName, 'video', MEDIUM);
  })
  .add('InlineVideo Small dark mode', () => {
    return withTracker(SquareCard, { isInlineVideo: true, ...data[6], isDark: true }, cardName, 'video', SMALL);
  })
  .add('InlineVideo Medium with reactions and favorite', () => {
    return withTracker(SquareCard, {
      isInlineVideo: true,
      ...data[6],
      hasFavorite: true,
      reactions,
    }, cardName, 'video', MEDIUM);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/Livestream', module)
  .add('Livestream Large', () => {
    return withTracker(SquareCard, data[7], cardName, 'livestream', LARGE);
  })
  .add('Livestream Medium', () => {
    return withTracker(SquareCard, data[7], cardName, 'livestream', MEDIUM);
  })
  .add('Livestream Small', () => {
    return withTracker(SquareCard, data[7], cardName, 'livestream', SMALL);
  })
  .add('Livestream Large dark mode', () => {
    return withTracker(SquareCard, { ...data[7], isDark: true }, cardName, 'livestream', LARGE);
  })
  .add('Livestream Medium dark mode', () => {
    return withTracker(SquareCard, { ...data[7], isDark: true }, cardName, 'livestream', MEDIUM);
  })
  .add('Livestream Small dark mode', () => {
    return withTracker(SquareCard, { ...data[7], isDark: true }, cardName, 'livestream', SMALL);
  })
  .add('Livestream Medium with reactions and favorite', () => {
    return withTracker(SquareCard, {
      ...data[7],
      hasFavorite: true,
      reactions,
    }, cardName, 'livestream', MEDIUM);
  })
  .add('Livestream Medium with no active livestream', () => {
    return withTracker(SquareCard, {
      ...data[7],
      hasFavorite: true,
      active: false,
      reactions,
    }, cardName, 'livestream', MEDIUM);
  })
  .add('Livestream Large no badge', () => {
    const liveStreamData = {
      ...data[7],
      cardLabel: null,
    };
    return withTracker(SquareCard, liveStreamData, cardName, 'livestream', LARGE);
  })
  .add('Livestream Medium no badge', () => {
    const liveStreamData = {
      ...data[7],
      cardLabel: null,
    };
    return withTracker(SquareCard, liveStreamData, cardName, 'livestream', MEDIUM);
  })
  .add('Livestream Small no badge', () => {
    const liveStreamData = {
      ...data[7],
      cardLabel: null,
    };
    return withTracker(SquareCard, liveStreamData, cardName, 'livestream', SMALL);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/JobListing', module)
  .add('Job listing Large', () => {
    return withTracker(SquareCard, data[8], cardName, 'article', LARGE);
  })
  .add('Job listing Medium', () => {
    return withTracker(SquareCard, data[8], cardName, 'article', MEDIUM);
  })
  .add('Job listing Small', () => {
    return withTracker(SquareCard, data[8], cardName, 'article', SMALL);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/Shows', module)
  .add('Show Large', () => {
    return withTracker(SquareCard, { ...data[9], isDark: true }, cardName, 'show', LARGE);
  })
  .add('Show Medium', () => {
    return withTracker(SquareCard, { ...data[9], isDark: true }, cardName, 'show', MEDIUM);
  })
  .add('Show Small', () => {
    return withTracker(SquareCard, { ...data[9], isDark: true }, cardName, 'show', SMALL);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/Soccermatch', module)
  .add('Soccermatch Large', () => {
    return withTracker(SquareCard, { ...data[10], theme }, cardName, 'soccermatch', LARGE);
  })
  .add('Soccermatch Medium', () => {
    return withTracker(SquareCard, { ...data[10], theme }, cardName, 'soccermatch', MEDIUM);
  })
  .add('Soccermatch Small', () => {
    return withTracker(SquareCard, { ...data[10], theme }, cardName, 'soccermatch', SMALL);
  })
  .add('Soccermatch Medium with livestream object', () => {
    return withTracker(SquareCard, { ...data[11], theme }, cardName, 'soccermatch', MEDIUM);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/PodcastEpisode', module)
  .add('Podcast Epiode Medium', () => {
    return withTracker(SquareCard, { ...data[12], theme }, cardName, 'audio', MEDIUM);
  })
  .add('Podcast Episode Small', () => {
    return withTracker(SquareCard, { ...data[12], theme }, cardName, 'audio', SMALL);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/PodcastSeries', module)
  .add('Podcast Series Medium', () => {
    return withTracker(SquareCard, { ...data[13], theme }, cardName, 'podcastseries', MEDIUM);
  })
  .add('Podcas Series Small', () => {
    return withTracker(SquareCard, { ...data[13], theme }, cardName, 'podcastseries', SMALL);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/PersonCard', module)
  .add('Person Large', () => {
    return withTracker(SquareCard, data[14], cardName, 'person', LARGE);
  })
  .add('Person Medium', () => {
    return withTracker(SquareCard, data[14], cardName, 'person', MEDIUM);
  })
  .add('Person Series Small', () => {
    return withTracker(SquareCard, data[14], cardName, 'person', SMALL);
  })
  .add('Person Large isDark', () => {
    return withTracker(SquareCard, { ...data[14], isDark: true }, cardName, 'person', LARGE);
  })
  .add('Person Medium isDark', () => {
    return withTracker(SquareCard, { ...data[14], isDark: true }, cardName, 'person', MEDIUM);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/RadioStation', module)
  .add('Radio station Medium', () => {
    return withTracker(SquareCard, { ...data[15], theme }, cardName, 'radiostation', MEDIUM);
  })
  .add('Radio station Small', () => {
    return withTracker(SquareCard, { ...data[15], theme }, cardName, 'radiostation', SMALL);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/Section', module)
  .add('Section Large', () => {
    return withTracker(SquareCard, { ...data[16], theme }, cardName, 'section', LARGE);
  })
  .add('Section Medium', () => {
    return withTracker(SquareCard, { ...data[16], theme }, cardName, 'section', MEDIUM);
  })
  .add('Section Small', () => {
    return withTracker(SquareCard, { ...data[16], theme }, cardName, 'section', SMALL);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/Promo external link', module)
  .add('Promo Large', () => {
    return withTracker(SquareCard, { ...data[17], theme }, cardName, 'externallink', LARGE);
  })
  .add('Promo Medium', () => {
    return withTracker(SquareCard, { ...data[17], theme }, cardName, 'externallink', MEDIUM);
  })
  .add('Promo Small', () => {
    return withTracker(SquareCard, { ...data[17], theme }, cardName, 'externallink', SMALL);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/Promo external link Content', module)
  .add('Promo Large', () => {
    return withTracker(SquareCard, { ...data[21], theme }, cardName, 'externalcontentpromo', LARGE);
  })
  .add('Promo Medium', () => {
    return withTracker(SquareCard, { ...data[21], theme }, cardName, 'externalcontentpromo', MEDIUM);
  })
  .add('Promo Small', () => {
    return withTracker(SquareCard, { ...data[21], theme }, cardName, 'externalcontentpromo', SMALL);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/HoroscopeCard', module)
  .add('Large', () => {
    return withTracker(SquareCard, { ...data[23], theme }, cardName, 'article', LARGE);
  })
  .add('Medium', () => {
    return withTracker(SquareCard, { ...data[23], theme }, cardName, 'article', MEDIUM);
  })
  .add('Small', () => {
    return withTracker(SquareCard, { ...data[23], theme }, cardName, 'article', SMALL);
  });

storiesOf('Cards/TUDN Enhancements/SquareCard/SquareCardLoading', module)
  .add('Large', () => withTracker(SquareCard, { ...data[23], theme, status: 'loading' }, cardName, 'article', LARGE,))
  .add('Medium', () => withTracker(SquareCard, { ...data[23], theme, status: 'loading' }, cardName, 'article', MEDIUM))
  .add('Small', () => withTracker(SquareCard, { ...data[23], theme, status: 'loading' }, cardName, 'article', SMALL));

storiesOf('Cards/TUDN/SquareCard/SoccerPersonCard', module)
  .add('Large', () => {
    return withTracker(SquareCard, { ...data[25], theme }, cardName, 'soccerperson', LARGE);
  })
  .add('Medium', () => {
    return withTracker(SquareCard, { ...data[25], theme }, cardName, 'soccerperson', MEDIUM);
  })
  .add('Small', () => {
    return withTracker(SquareCard, { ...data[25], theme }, cardName, 'soccerperson', SMALL);
  });
