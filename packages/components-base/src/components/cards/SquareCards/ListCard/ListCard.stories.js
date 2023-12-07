import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';

import { HORIZONTAL, VERTICAL } from '@univision/fe-commons/dist/constants/layoutTypes';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import prendeTvTheme from '@univision/fe-commons/dist/themes/prendetv';
import widgetFlavor from '@univision/fe-commons/dist/constants/widgetFlavors';
import data from '../SquareCard/__mocks__/squareCard.json';
import { setDimsConfig } from '../../storybookHelpers.stories';

import ListCard from '.';

setDimsConfig();
const store = configureStore();

/**
 * Create Matches widget with API wrapper
 * @param {Object} props - additional props
 * @param {string} layout - list card layout
 * @param {size} size - cards size
 * @returns {JSX}
 */
function makeListCard(props, layout = HORIZONTAL, size = 160) {
  const listCard = <ListCard {...props} layout={layout} />;
  const cardWrapper = layout === VERTICAL
    ? <div style={{ width: size }}>{listCard}</div> : listCard;

  return (
    <Provider store={store}>
      {cardWrapper}
    </Provider>
  );
}

storiesOf('Cards/TUDN Enhancements/ListCard/Article', module)
  .add('Horizontal', () => {
    return makeListCard(data[1]);
  })
  .add('Vertical', () => {
    return makeListCard(data[1], VERTICAL);
  })
  .add('Vertical dynamic size', () => {
    return (
      <>
        {makeListCard(data[1], VERTICAL, 160)}
        <br />
        {makeListCard(data[1], VERTICAL, 200)}
        <br />
        {makeListCard(data[1], VERTICAL, 240)}
      </>
    );
  })
  .add('Horizontal dark', () => {
    return makeListCard({ ...data[1], isDark: true });
  })
  .add('Vertical dark', () => {
    return makeListCard({ ...data[1], isDark: true }, VERTICAL);
  })
  .add('Horizontal text only', () => {
    return makeListCard({ ...data[1], isTextOnly: true });
  })
  .add('Vertical text only', () => {
    return makeListCard({ ...data[1], isTextOnly: true }, VERTICAL);
  })
  .add('Horizontal text only dark', () => {
    return makeListCard({ ...data[1], isDark: true, isTextOnly: true });
  })
  .add('Vertical text only dark', () => {
    return makeListCard({ ...data[1], isDark: true, isTextOnly: true }, VERTICAL);
  })
  .add('Breaking News', () => {
    return makeListCard(
      {
        ...data[1],
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
    );
  })
  .add('Shows', () => {
    return makeListCard(
      {
        ...data[1],
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
    );
  });

storiesOf('Cards/TUDN Enhancements/ListCard/Article with sponsor', module)
  .add('Horizontal with sponsor', () => {
    return makeListCard(data[26]);
  })
  .add('Vertical with sponsor', () => {
    return makeListCard(data[26], VERTICAL);
  })
  .add('Vertical dynamic size with sponsor', () => {
    return (
      <>
        {makeListCard(data[26], VERTICAL, 160)}
        <br />
        {makeListCard(data[26], VERTICAL, 200)}
        <br />
        {makeListCard(data[26], VERTICAL, 240)}
      </>
    );
  })
  .add('Horizontal dark with sponsor', () => {
    return makeListCard({ ...data[26], isDark: true });
  })
  .add('Vertical dark with sponsor', () => {
    return makeListCard({ ...data[26], isDark: true }, VERTICAL);
  })
  .add('Horizontal text only with sponsor', () => {
    return makeListCard({ ...data[26], isTextOnly: true });
  })
  .add('Vertical text only with sponsor', () => {
    return makeListCard({ ...data[26], isTextOnly: true }, VERTICAL);
  })
  .add('Horizontal text only dark with sponsor', () => {
    return makeListCard({ ...data[26], isDark: true, isTextOnly: true });
  })
  .add('Vertical text only dark with sponsor', () => {
    return makeListCard({ ...data[26], isDark: true, isTextOnly: true }, VERTICAL);
  })
  .add('Breaking News with sponsor', () => {
    return makeListCard(
      {
        ...data[26],
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
    );
  })
  .add('Shows with sponsor', () => {
    return makeListCard(
      {
        ...data[26],
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
    );
  });

storiesOf('Cards/TUDN Enhancements/ListCard/Opinion', module)
  .add('Horizontal', () => {
    return makeListCard(data[2]);
  })
  .add('Vertical', () => {
    return makeListCard(data[2], VERTICAL);
  })
  .add('Vertical dynamic size', () => {
    return (
      <>
        {makeListCard(data[2], VERTICAL, 160)}
        <br />
        {makeListCard(data[2], VERTICAL, 200)}
        <br />
        {makeListCard(data[2], VERTICAL, 240)}
      </>
    );
  });

storiesOf('Cards/TUDN Enhancements/ListCard/Liveblog', module)
  .add('Horizontal', () => {
    return makeListCard(data[1]);
  })
  .add('Vertical', () => {
    return makeListCard(data[1], VERTICAL);
  })
  .add('Vertical dynamic size', () => {
    return (
      <>
        {makeListCard(data[1], VERTICAL, 160)}
        <br />
        {makeListCard(data[1], VERTICAL, 200)}
        <br />
        {makeListCard(data[1], VERTICAL, 240)}
      </>
    );
  })
  .add('Horizontal dark', () => {
    return makeListCard({ ...data[1], isDark: true });
  })
  .add('Vertical dark', () => {
    return makeListCard({ ...data[1], isDark: true }, VERTICAL);
  })
  .add('Horizontal text only', () => {
    return makeListCard({ ...data[1], isTextOnly: true });
  })
  .add('Vertical text only', () => {
    return makeListCard({ ...data[1], isTextOnly: true }, VERTICAL);
  })
  .add('Horizontal dark text only', () => {
    return makeListCard({ ...data[1], isDark: true, isTextOnly: true });
  })
  .add('Vertical dark text only', () => {
    return makeListCard({ ...data[1], isDark: true, isTextOnly: true }, VERTICAL);
  });

storiesOf('Cards/TUDN Enhancements/ListCard/Advertising', module)
  .add('Horizontal', () => {
    return makeListCard({ ...data[3], type: 'advertising' });
  })
  .add('Vertical', () => {
    return makeListCard({ ...data[3], type: 'advertising' }, VERTICAL);
  })
  .add('Vertical dynamic size', () => {
    return (
      <>
        {makeListCard(data[3], VERTICAL, 160)}
        <br />
        {makeListCard(data[3], VERTICAL, 200)}
        <br />
        {makeListCard(data[3], VERTICAL, 240)}
      </>
    );
  });

storiesOf('Cards/TUDN Enhancements/ListCard/video', module)
  .add('Horizontal', () => {
    return makeListCard(data[5]);
  })
  .add('Vertical', () => {
    return makeListCard(data[5], VERTICAL);
  })
  .add('Vertical dynamic size', () => {
    return (
      <>
        {makeListCard(data[5], VERTICAL, 160)}
        <br />
        {makeListCard(data[5], VERTICAL, 200)}
        <br />
        {makeListCard(data[5], VERTICAL, 240)}
      </>
    );
  })
  .add('Horizontal dark', () => {
    return makeListCard({ ...data[5], isDark: true });
  })
  .add('Vertical dark', () => {
    return makeListCard({ ...data[5], isDark: true }, VERTICAL);
  })
  .add('Horizontal text only', () => {
    return makeListCard({ ...data[5], isTextOnly: true });
  })
  .add('Vertical text only', () => {
    return makeListCard({ ...data[5], isTextOnly: true }, VERTICAL);
  })
  .add('Horizontal text only dark', () => {
    return makeListCard({ ...data[5], isDark: true, isTextOnly: true });
  })
  .add('Vertical text only dark', () => {
    return makeListCard({ ...data[5], isDark: true, isTextOnly: true }, VERTICAL);
  });

storiesOf('Cards/TUDN Enhancements/ListCard/slideshow', module)
  .add('Horizontal', () => {
    return makeListCard(data[4]);
  })
  .add('Vertical', () => {
    return makeListCard(data[4], VERTICAL);
  })
  .add('Vertical dynamic size', () => {
    return (
      <>
        {makeListCard(data[4], VERTICAL, 160)}
        <br />
        {makeListCard(data[4], VERTICAL, 200)}
        <br />
        {makeListCard(data[4], VERTICAL, 240)}
      </>
    );
  })
  .add('Horizontal dark', () => {
    return makeListCard({ ...data[4], isDark: true });
  })
  .add('Vertical dark', () => {
    return makeListCard({ ...data[4], isDark: true }, VERTICAL);
  })
  .add('Horizontal text only', () => {
    return makeListCard({ ...data[4], isTextOnly: true });
  })
  .add('Vertical text only', () => {
    return makeListCard({ ...data[4], isTextOnly: true }, VERTICAL);
  })
  .add('Horizontal text only dark', () => {
    return makeListCard({ ...data[4], isTextOnly: true, isDark: true });
  })
  .add('Vertical text only dark', () => {
    return makeListCard({ ...data[4], isTextOnly: true, isDark: true }, VERTICAL);
  });

storiesOf('Cards/TUDN Enhancements/ListCard/Livestream', module)
  .add('Livestream Horizontal', () => {
    return makeListCard(data[7]);
  })
  .add('Livestream Vertical', () => {
    return makeListCard(data[7], VERTICAL);
  })
  .add('Vertical dynamic size', () => {
    return (
      <>
        {makeListCard(data[7], VERTICAL, 160)}
        <br />
        {makeListCard(data[7], VERTICAL, 200)}
        <br />
        {makeListCard(data[7], VERTICAL, 240)}
      </>
    );
  });

storiesOf('Cards/TUDN Enhancements/ListCard/Radio', module)
  .add('Radio Horizontal', () => {
    return makeListCard(data[15]);
  })
  .add('Radio Vertical', () => {
    return makeListCard(data[15], VERTICAL);
  })
  .add('Vertical dynamic size', () => {
    return (
      <>
        {makeListCard(data[15], VERTICAL, 160)}
        <br />
        {makeListCard(data[15], VERTICAL, 200)}
        <br />
        {makeListCard(data[15], VERTICAL, 240)}
      </>
    );
  });
storiesOf('Cards/TUDN Enhancements/ListCard/Video Promo Channel', module)
  .add('Default', () => {
    return makeListCard(data[19]);
  });
storiesOf('Cards/TUDN Enhancements/ListCard/External Content Promo', module)
  .add('Default', () => {
    return makeListCard(data[17]);
  });
storiesOf('Cards/TUDN Enhancements/ListCard/Video Promo Channel PRENDE TV', module)
  .add('Default', () => {
    return makeListCard({
      ...data[24],
      flavor: widgetFlavor.FLAVOR_PRENDE_TV,
      isDark: true,
      theme: prendeTvTheme(),
    });
  });

storiesOf('Cards/TUDN Enhancements/ListCard/soccermatch', module)
  .add('Horizontal', () => {
    return makeListCard({ ...data[10] });
  })
  .add('Horizontal dark', () => {
    return makeListCard({ ...data[10], isDark: true });
  })
  .add('Horizontal text only', () => {
    return makeListCard({ ...data[10], isTextOnly: true });
  })
  .add('Vertical text only', () => {
    return makeListCard(
      { ...data[10], isTextOnly: true },
      VERTICAL
    );
  })
  .add('Horizontal text only dark', () => {
    return makeListCard({ ...data[10], isDark: true, isTextOnly: true });
  })
  .add('Vertical text only dark', () => {
    return makeListCard({ ...data[10], isDark: true, isTextOnly: true }, VERTICAL);
  });
